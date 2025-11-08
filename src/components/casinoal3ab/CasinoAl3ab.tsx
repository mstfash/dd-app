import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Upload,
  X,
  XCircle,
  Search,
  Languages,
} from 'lucide-react';
import * as QRCodeGenerator from 'qrcode';
import { supabase } from '../../lib/supabase';

interface RegistrationFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalNumber: string;
  nationalIdFile?: File;
}
const time = '2025-03-11T12:10:00';
export default function CasinoAl3ab() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    nationalNumber: '',
  });
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [verificationUrl, setVerificationUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);
  const [countdown, setCountdown] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // useEffect(() => {
  //   const startDate = isTestMode
  //     ? new Date(Date.now() + 2000) // 2 seconds from now for testing
  //     : new Date(time); // March 10, 2025, 8:00 PM
  //   const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

  //   const updateCountdown = () => {
  //     const now = new Date();
  //     let targetDate = startDate;
  //     let countdownLabel = 'Registration opens in:';

  //     if (now >= startDate && now < endDate) {
  //       targetDate = endDate;
  //       countdownLabel = 'Registration closes in:';
  //     }

  //     const diff = targetDate.getTime() - now.getTime();

  //     if (diff > 0) {
  //       const hours = Math.floor(diff / (1000 * 60 * 60));
  //       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  //       setCountdown({
  //         hours: hours.toString().padStart(2, '0'),
  //         minutes: minutes.toString().padStart(2, '0'),
  //         seconds: seconds.toString().padStart(2, '0'),
  //       });

  //       // Update DOM elements
  //       document.getElementById('countdown-hours')!.textContent = hours
  //         .toString()
  //         .padStart(2, '0');
  //       document.getElementById('countdown-minutes')!.textContent = minutes
  //         .toString()
  //         .padStart(2, '0');
  //       document.getElementById('countdown-seconds')!.textContent = seconds
  //         .toString()
  //         .padStart(2, '0');
  //     }
  //   };

  //   // Update immediately and then every second
  //   updateCountdown();
  //   const interval = setInterval(updateCountdown, 1000);

  //   return () => clearInterval(interval);
  // }, [isTestMode]);

  const validateForm = () => {
    const newErrors: Partial<RegistrationFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^(\+20|0)?1[0125][0-9]{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Egyptian phone number';
    }

    if (!formData.nationalNumber) {
      newErrors.nationalNumber = 'National number is required';
    } else if (!/^\d{14}$/.test(formData.nationalNumber)) {
      newErrors.nationalNumber = 'National number must be exactly 14 digits';
    }

    if (!selectedFile) {
      newErrors.nationalIdFile = 'National ID copy is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          nationalIdFile: 'File size must be less than 5MB',
        }));
        return;
      }
      setSelectedFile(file);
      setErrors((prev) => ({ ...prev, nationalIdFile: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setError(null);

    try {
      // Upload national ID file to Supabase Storage
      let nationalIdUrl = '';
      setError(null);

      // Check if email already exists
      const { data: existingUser } = await supabase
        .from('casino_players')
        .select('id, email, national_number')
        .eq('email', formData.email)
        .or(`national_number.eq.${formData.nationalNumber}`)
        .single();

      if (existingUser) {
        if (existingUser.email === formData.email) {
          setError('This email is already registered');
        } else if (existingUser.national_number === formData.nationalNumber) {
          setError('This national number is already registered');
        }
        return;
      }

      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('national-ids')
          .upload(fileName, selectedFile);

        if (uploadError) throw new Error('Failed to upload national ID');

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('national-ids').getPublicUrl(fileName);

        nationalIdUrl = publicUrl;
      }

      // Insert player record
      const { data: player, error: insertError } = await supabase
        .from('casino_players')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          national_number: formData.nationalNumber,
          national_id_url: nationalIdUrl,
        })
        .select()
        .single();

      if (insertError) throw new Error('Failed to register player');

      // Generate verification URL
      const verificationUrl = `${window.location.origin}/casinoelal3ab/verify/${player?.id}`;
      setVerificationUrl(verificationUrl);

      // Generate QR code data URL
      const qrDataUrl = await QRCodeGenerator.toDataURL(verificationUrl, {
        width: 200,
        margin: 1,
        errorCorrectionLevel: 'M',
      });

      setQrCodeUrl(qrDataUrl);

      // Send confirmation email
      try {
        const { data: functionData, error: functionError } =
          await supabase.functions.invoke('send-confirmation', {
            body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              qrCodeUrl: qrDataUrl,
              verificationUrl,
            }),
          });

        if (functionError) {
          console.error('Failed to send confirmation email:', functionError);
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }

      // Show success state
      navigate('/casinoelal3ab/success');
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error && error.message.includes('duplicate key')) {
        if (error.message.includes('casino_players_email_key')) {
          setError('This email is already registered');
        } else if (
          error.message.includes('casino_players_national_number_key')
        ) {
          setError('This national number is already registered');
        } else {
          setError('This registration already exists');
        }
      } else {
        setError(
          error instanceof Error
            ? error.message
            : 'Registration failed. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadQRCode = useCallback(() => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl; // Now using the data URL directly
      link.download = `casino-al3ab-qr-${formData.fullName
        .replace(/\s+/g, '-')
        .toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [qrCodeUrl, formData.fullName]);

  const startDate = new Date(time);
  const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
  const isTimeUp = true;

  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo and Title */}
        <div className="text-center mb-12">
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
          <div className="bg-sage-200/80 backdrop-blur-sm border border-sage-300 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              {!isTimeUp && (
                <p className="text-sage-700 font-display text-xl">
                  Limited Time Registration
                </p>
              )}
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={() => setIsTestMode(!isTestMode)}
                  className="px-3 py-1 text-sm bg-sage-600 text-white rounded-full hover:bg-sage-500 transition-colors"
                >
                  {isTestMode ? 'Disable Test Mode' : 'Enable Test Mode'}
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {['Hours', 'Minutes', 'Seconds'].map((unit) => (
                <div key={unit} className="text-center">
                  <div className="bg-sage-300/80 backdrop-blur-sm rounded-lg p-4 border border-sage-400 shadow-lg">
                    <div
                      className="text-4xl md:text-5xl font-display font-bold text-sage-700 mb-2"
                      // id={`countdown-${unit.toLowerCase()}`}
                    >
                      00
                    </div>
                    <div className="text-sm font-medium text-sage-600">
                      {unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sage-700 mt-6 font-medium bg-sage-300/80 rounded-lg py-2 px-4 inline-block mx-auto">
              {isTimeUp
                ? 'Registration is closed'
                : 'Registration opens on March 11, 2025 at 1:00 AM for 24 hours only'}
            </p>
          </div>
          {isTimeUp ? null : (
            <p className="text-sage-500 text-lg">
              Join us for an unforgettable night of games and entertainment
            </p>
          )}
        </div>

        {/* Event Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-8 h-8 text-peach-400" />
              <div>
                <h3 className="font-display font-medium text-sage-600">Date</h3>
                <p className="text-sage-500">Thursday, 13th March 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-peach-400" />
              <div>
                <h3 className="font-display font-medium text-sage-600">Time</h3>
                <p className="text-sage-500">9:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-peach-400" />
              <div>
                <h3 className="font-display font-medium text-sage-600">
                  Location
                </h3>
                <p className="text-sage-500">Zed ElSheikh Zayed, Gate 3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Box */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-display font-bold text-sage-600 mb-4">
              Already registered?
            </h3>
            <p className="text-sage-500 mb-6">
              Check your registration status or download your QR code
            </p>
            <button
              onClick={() => navigate('/casinoelal3ab/verify')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-peach-400 text-white rounded-xl hover:bg-peach-300 transition-all transform hover:scale-105"
            >
              <Search className="w-5 h-5" />
              Verify Registration
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 flex flex-col gap-3">
          <div dir="rtl">
            <div className="flex items-center mb-4">
              <span className="text-3xl ml-2">📢</span>
              <h1 className="text-xl font-bold text-gray-800">
                تحديث هام: تسجيل كازينو الألعاب
              </h1>
            </div>

            {/* Thank you message */}
            <p className="mb-4 text-gray-800 text-lg">
              شكرًا لتسجيلك لحضور الحدث كازينو الألعاب لايف في ZED الشيخ زايد!
            </p>

            {/* Registration status */}
            <p className="mb-6 text-gray-700">
              نظرًا للإقبال الكبير، تم إغلاق باب التسجيل. سيتم إرسال عدد محدود
              من دعوات QR Code خلال الـ 24 ساعة القادمة إلى المسجلين الأوائل
              فقط.
            </p>

            {/* Important notes section */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl ml-2">❤️</span>
                <h2 className="text-lg font-semibold text-gray-800">
                  يرجى ملاحظة التالي:
                </h2>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-2xl text-green-600 ml-2 mt-1">✅</span>
                  <p className="text-gray-700">
                    سيتم إرسال رموز QR فقط عبر Ticketsmarche.
                  </p>
                </li>

                <li className="flex items-start">
                  <span className="text-2xl text-yellow-500 ml-2 mt-1">⚠️</span>
                  <p className="text-gray-700">
                    فقط رموز QR المرسلة عبر واتساب من Ticketsmarche صالحة. اي
                    رمز QR ظهر على الموقع بعد التسجيل غير مُعتمد ولن يسمح
                    بالدخول إلى الحدث، لأنه قيد التحقق كما هو مذكور.
                  </p>
                </li>

                <li className="flex items-start">
                  <span className="text-2xl text-red-600 ml-2 mt-1">❌</span>
                  <p className="text-gray-700">
                    تجاهل أي رسائل من مصادر غير رسمية أو منصات خارجية.
                  </p>
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-8">
              <p className="text-gray-700">
                نقدر تفهمك وسنوافيك بأي تحديثات قريبًا.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        {!isTimeUp && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-bold text-sage-600 mb-6">
              Registration Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-sage-600 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className={`w-full p-3 border-2 ${
                    errors.fullName ? 'border-red-300' : 'border-sage-200'
                  } rounded-xl focus:ring-2 focus:ring-peach-400`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-600 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={`w-full p-3 border-2 ${
                    errors.email ? 'border-red-300' : 'border-sage-200'
                  } rounded-xl focus:ring-2 focus:ring-peach-400`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-600 mb-2">
                  Phone Number *
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
                  className={`w-full p-3 border-2 ${
                    errors.phoneNumber ? 'border-red-300' : 'border-sage-200'
                  } rounded-xl focus:ring-2 focus:ring-peach-400`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-600 mb-2">
                  National Number *
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
                  className={`w-full p-3 border-2 ${
                    errors.nationalNumber ? 'border-red-300' : 'border-sage-200'
                  } rounded-xl focus:ring-2 focus:ring-peach-400`}
                  placeholder="Enter your 14-digit national number"
                  maxLength={14}
                  pattern="\d*"
                  inputMode="numeric"
                />
                {errors.nationalNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.nationalNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-600 mb-2">
                  National ID Copy *
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-6 text-center ${
                    selectedFile
                      ? 'border-peach-400 bg-peach-50'
                      : 'border-sage-200 hover:border-sage-300'
                  }`}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <Upload
                      className={`w-8 h-8 mx-auto ${
                        selectedFile ? 'text-peach-400' : 'text-sage-400'
                      }`}
                    />
                    {selectedFile ? (
                      <>
                        <p className="text-sm text-sage-600">
                          {selectedFile.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1 mx-auto"
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-sage-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-sage-500">
                          Supported formats: JPG, PNG, PDF (max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {errors.nationalIdFile && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.nationalIdFile}
                  </p>
                )}
              </div>

              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errors.submit}</span>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-peach-400 text-white rounded-xl hover:bg-peach-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-display text-lg tracking-wide flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Register Now'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
