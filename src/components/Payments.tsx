import { useState } from 'react';
import { CreditCard, Calendar, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo data - in production this would come from your backend
  const demoPaymentDetails = {
    teamName: "Golden Eagles",
    tournament: "Men's Football Tournament",
    amount: 10000,
    currency: "EGP"
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    // Validate card number (demo: accept only if ends with 4242)
    if (!cardNumber.replace(/\s+/g, '').endsWith('4242')) {
      setError('Invalid card number. For demo, use a card number ending in 4242');
      setIsProcessing(false);
      return;
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowSuccess(true);

    // Redirect after success
    setTimeout(() => {
      navigate('/team');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Your tournament registration is now complete.</p>
            <p className="text-sm text-gray-500">Redirecting to team dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 bg-sage-600">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Complete Payment</h1>
            <p className="text-sage-100">Secure payment for tournament registration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
            {/* Payment Summary */}
            <div className="order-2 md:order-1 sticky top-0 md:static">
              <div className="bg-sage-50 rounded-xl p-6">
                <h2 className="text-xl font-display font-semibold text-sage-600 mb-4">Payment Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sage-600">
                    <span>Team Name</span>
                    <span className="font-medium">{demoPaymentDetails.teamName}</span>
                  </div>
                  <div className="flex justify-between text-sage-600">
                    <span>Tournament</span>
                    <span className="font-medium">{demoPaymentDetails.tournament}</span>
                  </div>
                  <div className="h-px bg-sage-200 my-4" />
                  <div className="flex justify-between text-lg font-display font-semibold text-sage-600">
                    <span>Total Amount</span>
                    <span>{demoPaymentDetails.amount.toLocaleString()} {demoPaymentDetails.currency}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-peach-100 rounded-lg">
                <p className="text-sm text-peach-600">
                  <span className="font-semibold">Demo Mode:</span> Use any card number ending in 4242
                </p>
              </div>
            </div>

            {/* Payment Form */}
            <div className="order-1 md:order-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-sage-600 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19} 
                      inputMode="numeric"
                      className="w-full pl-10 pr-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 text-base md:text-lg"
                      placeholder="4242 4242 4242 4242"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-600 mb-2">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" />
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        maxLength={5}
                        className="w-full pl-10 pr-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sage-600 mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" />
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        maxLength={3}
                        className="w-full pl-10 pr-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-600 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400"
                    placeholder="Name on card"
                    required
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-peach-400 text-white rounded-xl hover:bg-peach-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-display text-lg tracking-wide flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Pay {demoPaymentDetails.amount.toLocaleString()} {demoPaymentDetails.currency}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}