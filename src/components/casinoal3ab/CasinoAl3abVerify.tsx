import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Download,
  XCircle,
  Search,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function CasinoAl3abVerify() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    nationalNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationData, setVerificationData] = useState<{
    qrCode: string;
    fullName: string;
    registrationDate: string;
    isVerified: boolean;
  } | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
    }
  }, [userId]);

  const fetchUserDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const { data: player, error } = await supabase
        .from('casino_players')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !player) {
        throw new Error('Registration not found');
      }

      const verificationUrl = `${window.location.origin}/casinoelal3ab/verify/${player.id}?isVerified=${player.is_verified}`;
      console.log({ player });
      setVerificationData({
        qrCode: verificationUrl,
        fullName: player.full_name,
        registrationDate: new Date(player.created_at).toLocaleDateString(),
        isVerified: player.is_verified,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate inputs
      if (!formData.phoneNumber || !formData.nationalNumber) {
        throw new Error('Please fill in all fields');
      }

      if (!/^(\+20|0)?1[0125][0-9]{8}$/.test(formData.phoneNumber)) {
        throw new Error('Please enter a valid Egyptian phone number');
      }

      if (!/^\d{14}$/.test(formData.nationalNumber)) {
        throw new Error('National number must be exactly 14 digits');
      }

      // Query the database
      const { data: player, error: queryError } = await supabase
        .from('casino_players')
        .select('*')
        .eq('phone_number', formData.phoneNumber)
        .eq('national_number', formData.nationalNumber)
        .single();

      if (queryError || !player) {
        throw new Error(
          'Invalid credentials. Please check your phone number and national number.'
        );
      }

      // Generate verification URL and QR code
      const verificationUrl = `${window.location.origin}/casinoelal3ab/verify/${player.id}?isVerified=${player.is_verified}`;

      setVerificationData({
        qrCode: verificationUrl,
        fullName: player.full_name,
        registrationDate: new Date(player.created_at).toLocaleDateString(),
        isVerified: player.is_verified || false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    console.log({ verificationData });
    if (!verificationData) return;

    const canvas = document.querySelector('canvas');
    console.log({ canvas });
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `casino-al3ab-qr-${verificationData.fullName
      .replace(/\s+/g, '-')
      .toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/casinoelal3ab')}
          className="flex items-center gap-2 text-sage-600 hover:text-sage-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Registration
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8 max-w-2xl mx-auto">
              <img
                src="https://i.ibb.co/21Q2VhD5/Asset-7.png"
                alt="ZED Ramadan"
                className="h-12 md:h-16 w-auto object-contain"
              />
              <img
                src="https://i.ibb.co/NGQTrmc/ORA.png"
                alt="ORA"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8 max-w-xl mx-auto">
              <img
                src="https://i.ibb.co/60S26Tp5/01.png"
                alt="Casino Al3ab"
                className="h-20 md:h-32 w-auto object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold text-sage-600 mb-6">
            Verify Registration
          </h1>

          {!verificationData ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-sage-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className="w-full p-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400"
                  placeholder="Enter your registered phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-600 mb-2">
                  National Number
                </label>
                <input
                  type="text"
                  value={formData.nationalNumber}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 14);
                    setFormData((prev) => ({ ...prev, nationalNumber: value }));
                  }}
                  className="w-full p-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400"
                  placeholder="Enter your 14-digit national number"
                  maxLength={14}
                  pattern="\d*"
                  inputMode="numeric"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-peach-400 text-white rounded-xl hover:bg-peach-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Verify Registration
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                {verificationData.isVerified ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-600 mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-medium">Registration Verified</span>
                  </div>
                ) : (
                  <div className="text-amber-600 mb-4">
                    <span className="font-medium text-lg">
                      Pending Verification
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-display font-bold text-sage-600 mb-2">
                  {verificationData.fullName}
                </h2>
                <p className="text-sage-500">
                  Registered on {verificationData.registrationDate}
                </p>
              </div>

              {verificationData.isVerified && (
                <div className="mb-6">
                  <div className="mx-auto mb-4 w-48 h-48">
                    <QRCodeCanvas
                      value={verificationData.qrCode}
                      size={192}
                      level="M"
                      includeMargin={false}
                      className="w-full h-full qr-code"
                    />
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-peach-400 text-white rounded-xl hover:bg-peach-300 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download QR Code
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setVerificationData(null);
                  setFormData({ phoneNumber: '', nationalNumber: '' });
                }}
                className="text-sage-600 hover:text-sage-700"
              >
                Verify Another Registration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
