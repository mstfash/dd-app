import { useMemo } from 'react';
import { Discount, Plan } from '../containers/Pricing/PricingPlans';
import useLeaguesState from './useLeaguesState';
import usePlayerInfo from './usePlayerInfo';
import { useQuery } from '@apollo/client';
import { FETCH_PAYMENTS } from '../utils/queries';
import { Payment } from '../utils/types';

export default function usePaymentState(
  compName: string | undefined,
  selectedPlan: Plan | undefined,
  discountData: Discount | undefined
) {
  const { notInCurrentSeason, currentParticipation, currentCompetition } =
    useLeaguesState(compName);
  const playerInfo = usePlayerInfo();
  const { payments: playerPayments } = usePayments({
    player: { id: { equals: playerInfo?.id } },
  });
  const { payments: participationPayments } = usePayments({
    participation: { id: { equals: currentParticipation?.id } },
  });

  const isMatchFees = useMemo(() => {
    return selectedPlan?.name.toLowerCase().includes('match fees');
  }, [selectedPlan]);

  const alreadyPaid = useMemo(() => {
    return playerPayments?.some((payment: Payment) => {
      return (
        payment.participation.id === currentParticipation?.id &&
        !isMatchFees &&
        payment.success &&
        !payment.pending
      );
    });
  }, [currentParticipation, isMatchFees, playerPayments]);

  // const teamRegistrationPlan = useMemo(() => {
  //   return participationPayments?.find((payment: Payment) => {
  //     return payment.plan?.name.toLowerCase().includes('team registration');
  //   });
  // }, [participationPayments]);

  const matchPlansCount = useMemo(() => {
    return participationPayments?.filter((payment: Payment) => {
      return (
        payment.success &&
        payment.plan?.name.toLowerCase().includes('match fees') &&
        !payment.pending
      );
    }).length;
  }, [participationPayments]);

  const amountToPay = useMemo(() => {
    let amount = 0;
    if (!selectedPlan) return amount;
    amount = selectedPlan.amount * selectedPlan.count;

    if (discountData) {
      amount =
        discountData.type === 'Percentage'
          ? amount - (amount * Number(discountData.amount)) / 100
          : amount - Number(discountData.amount);
    }
    return amount;
  }, [discountData, selectedPlan]);

  const confirmation = useMemo(() => {
    if (!selectedPlan) return '';
    return `You are about to buy ${
      selectedPlan?.name
    } plan for ${amountToPay} ${selectedPlan?.currency} ${
      isMatchFees
        ? '(' +
          selectedPlan?.amount * selectedPlan.count +
          ' match fees payment for ' +
          selectedPlan.count +
          ' matches'
        : ''
    }, regarding ${currentParticipation?.name}.`;
  }, [currentParticipation, selectedPlan, amountToPay, isMatchFees]);

  let error: string | undefined;

  if (!currentParticipation) {
    error = 'Participation is not found';
  }
  if (!currentCompetition?.isOpenForPayment) {
    error = 'This competition is not open for payment';
  }

  if (!selectedPlan) {
    error = 'Please select a plan';
  }
  if (notInCurrentSeason) {
    error = `You are not a member of any team in the current season in ${compName}`;
  }

  // if (
  //   playerInfo?.id === currentParticipation?.teamAdmin.id &&
  //   selectedPlan?.name.toLowerCase().includes('player')
  // ) {
  //   error =
  //     'You are a team admin. You cannot buy player plan. You need to buy team plan';
  // }

  // if (
  //   !teamRegistrationPlan &&
  //   playerInfo?.id !== currentParticipation?.teamAdmin.id
  // ) {
  //   error = 'You need to buy team registration plan first';
  // }

  // if (
  //   teamRegistrationPlan &&
  //   teamRegistrationPlan?.plan?.planName !== selectedPlan?.planName &&
  //   playerInfo?.id !== currentParticipation?.teamAdmin.id
  // ) {
  //   error = `Your team is on ${teamRegistrationPlan?.plan?.planName} plan. You need to buy ${teamRegistrationPlan?.plan?.planName} plan`;
  // }

  // if (
  //   playerInfo?.id !== currentParticipation?.teamAdmin.id &&
  //   selectedPlan?.name.toLowerCase().includes('team')
  // ) {
  //   error = 'You are not a team admin. You need to buy player plan';
  // }

  // if (selectedPlan?.name.toLowerCase().includes('player') && alreadyPaid) {
  //   error = 'You have already paid for this plan.';
  // }
  if (discountData) {
    if (discountData.maxDiscountUsage <= 0) {
      error = 'Discount code has been used up';
    }
    if (discountData.paymentPlans?.length) {
      const foundPlan = discountData.paymentPlans.find(
        (plan) => plan.id === selectedPlan?.id
      );
      if (!foundPlan) {
        error = 'Discount code is not applicable to the selected plan';
      }
    }
  }

  if (!playerInfo || !playerInfo.id) {
    error = 'You are not logged in';
  }

  return {
    error,
    playerInfo,
    confirmation,
    selectedPlan,
    currentParticipation,
    alreadyPaid,
    matchPlansCount,
    amountToPay,
  };
}

export function usePayments(where: any) {
  const { data: payments, loading } = useQuery(FETCH_PAYMENTS, {
    variables: {
      where: where,
    },
  });
  return {
    payments: useMemo(() => {
      return payments?.payments || null;
    }, [payments]),
    loading,
  };
}
