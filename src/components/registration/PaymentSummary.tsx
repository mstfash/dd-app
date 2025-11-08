interface PaymentSummaryProps {
  summary: {
    sport: string;
    tournament: string;
    teamName: string;
    playersCount: number;
    fee: string;
  };
}

export default function PaymentSummary({ summary }: PaymentSummaryProps) {
  return (
    <div className="space-y-8">
      <div className="bg-sage-50 rounded-xl p-6">
        <h3 className="text-xl font-display font-bold text-sage-600 mb-4">Registration Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-sage-200">
            <span className="text-sage-600">Sport</span>
            <span className="font-medium text-sage-700">{summary.sport}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-sage-200">
            <span className="text-sage-600">Tournament</span>
            <span className="font-medium text-sage-700">{summary.tournament}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-sage-200">
            <span className="text-sage-600">Team Name</span>
            <span className="font-medium text-sage-700">{summary.teamName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-sage-200">
            <span className="text-sage-600">Players</span>
            <span className="font-medium text-sage-700">{summary.playersCount} players</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-display font-semibold text-sage-600">Total Amount</span>
            <span className="text-xl font-display font-bold text-peach-400">{summary.fee}</span>
          </div>
        </div>
      </div>
    </div>
  );
}