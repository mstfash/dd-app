import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PartyPopper,
  Sparkles,
  Link,
  ArrowRight,
  Languages,
} from 'lucide-react';

const translations = {
  en: {
    title: 'Registration Submitted Successfully!',
    subtitle:
      'Thank you for registering for Casino El Al3ab Live Show at ZED El Sheikh Zayed!',
    nextSteps: 'Next Steps',
    important:
      'Important: Your registration does not guarantee entry to the event. Our team will review your submission and get back to you within 24 hours.',
    approval:
      'If your registration is approved, you will receive a confirmation email with a QR code for entry.',
    spam: "Please check your spam/junk folder in case you don't receive the email.",
    login:
      'You can also log in to our website to check if your registration has been approved.',
    closing: 'We look forward to seeing you at the event!',
    verify: 'Verify Registration',
  },
  ar: {
    title: 'تم تقديم التسجيل بنجاح!',
    subtitle: 'شكرًا لتسجيلك في كازينو الألعاب لايف في زد الشيخ زايد!',
    nextSteps: 'الخطوات التالية',
    important:
      'مهم: تسجيلك لا يضمن الحضور للحدث. سيقوم فريقنا بمراجعة طلبك والرد عليك خلال ٢٤ ساعة.',
    approval:
      'في حال تمت الموافقة على تسجيلك، ستتلقى بريدًا إلكترونيًا يحتوي على رمز QR للدخول.',
    spam: 'يُرجى التحقق من صندوق البريد العشوائي (Spam/Junk) إذا لم تجد البريد الإلكتروني.',
    login:
      'يمكنك أيضًا تسجيل الدخول إلى موقعنا للتحقق مما إذا تمت الموافقة على طلبك.',
    closing: 'مستنينك في زد الشيخ زايد!',
    verify: 'التحقق من التسجيل',
  },
};

export default function CasinoAl3abSuccess() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const t = translations[lang];

  useEffect(() => {
    // Add confetti effect
    const confetti = Array.from({ length: 50 }).map((_, i) => {
      const div = document.createElement('div');
      div.className = `absolute w-2 h-2 bg-white rounded-full animate-float`;
      div.style.left = `${Math.random() * 100}%`;
      div.style.top = `${Math.random() * 100}%`;
      div.style.animationDelay = `${Math.random() * 2}s`;
      return div;
    });

    const container = document.getElementById('confetti-container');
    if (container) {
      confetti.forEach((div) => container.appendChild(div));
    }

    return () => {
      confetti.forEach((div) => div.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-900 via-sage-800 to-sage-700 flex items-center justify-center p-4">
      <div
        id="confetti-container"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      <div className="max-w-lg w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
        {/* Animated dice background */}
        <div className="absolute inset-0 bottom-16 -z-10 opacity-5">
          <div className="absolute inset-0 grid grid-cols-6 gap-4 p-4 animate-rotate-bg">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white rounded-full transform rotate-45"
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img
                src="https://i.ibb.co/21Q2VhD5/Asset-7.png"
                alt="ZED Ramadan"
                className="h-12 w-auto object-contain animate-pulse"
              />
              <img
                src="https://i.ibb.co/NGQTrmc/ORA.png"
                alt="ORA"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://i.ibb.co/60S26Tp5/01.png"
                alt="Casino Al3ab"
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>

          <div className="relative mb-6">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="absolute top-0 right-0 p-2 text-white/80 hover:text-white transition-colors"
              title={lang === 'en' ? 'عربي' : 'English'}
            >
              <Languages className="w-6 h-6" />
            </button>
            <PartyPopper className="w-16 h-16 text-white mx-auto mb-4 animate-pulse" />
            <Sparkles
              className="w-8 h-8 text-white/80 absolute top-0 right-1/4 animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </div>

          <h1
            className={`text-3xl font-display font-bold text-white mb-4 ${
              lang === 'ar' ? 'arabic' : ''
            }`}
          >
            {t.title}
          </h1>

          <p
            className={`text-white/90 text-xl mb-8 leading-relaxed ${
              lang === 'ar' ? 'arabic' : ''
            }`}
          >
            {t.subtitle}
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-xl font-display font-bold text-white ${
                  lang === 'ar' ? 'arabic' : ''
                }`}
              >
                {t.nextSteps}
              </h2>
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="p-2.5 bg-white/20 text-white hover:bg-white/30 transition-all duration-300 rounded-full hover:scale-110 border border-white/30 hover:border-white/50 backdrop-blur-sm shadow-lg flex items-center gap-2"
                title={lang === 'en' ? 'عربي' : 'English'}
              >
                <Languages className="w-5 h-5 text-peach-200" />
                <span className="text-sm font-medium">
                  {lang === 'en' ? 'عربي' : 'English'}
                </span>
              </button>
            </div>
            <ul
              className={`space-y-4 ${
                lang === 'ar' ? 'text-right arabic' : 'text-left'
              }`}
            >
              <li className="flex items-start gap-3 text-white/90">
                <span className="mt-1">⚠️</span>
                <span>{t.important}</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="mt-1">✅</span>
                <span>{t.approval}</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="mt-1">📌</span>
                <span>{t.spam}</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="mt-1">🔄</span>
                <span>{t.login}</span>
              </li>
            </ul>
            <p
              className={`text-white/90 mt-4 text-center ${
                lang === 'ar' ? 'arabic' : ''
              }`}
            >
              {t.closing}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/casinoelal3ab/verify')}
              className={`flex items-center gap-2 px-8 py-4 bg-peach-400 text-white rounded-xl hover:bg-peach-300 transition-all duration-300 w-full sm:w-auto justify-center text-lg font-display tracking-wide shadow-[0_0_20px_rgba(232,164,79,0.3)] hover:shadow-[0_0_30px_rgba(232,164,79,0.5)] hover:scale-105 transform ${
                lang === 'ar' ? 'arabic flex-row-reverse' : ''
              }`}
            >
              <Link className="w-5 h-5" />
              {t.verify}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
