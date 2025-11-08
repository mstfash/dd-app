import { LogIn, LogOut, Users } from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerInfo } from '../hooks/usePlayerInfo';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { playerInfo } = usePlayerInfo();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('playerInfo');
    localStorage.removeItem('applicationData');
    // Reload the page to reset the app state
    window.location.reload();
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen bg-sage-400 overflow-hidden"
    >
      <div className="absolute top-4 right-4 z-50">
        {playerInfo ? (
          <div className="flex flex-row items-center gap-4">
            <button
              onClick={() => navigate('/team')}
              className="flex items-center gap-2 px-6 py-3 bg-peach-400/80 hover:bg-peach-400 backdrop-blur-sm text-white rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Users className="w-5 h-5" />
              <span className="font-display">My Team</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-display">Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/team')}
            className="flex items-center gap-2 px-6 py-3 bg-peach-400/80 hover:bg-peach-400 backdrop-blur-sm text-white rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <LogIn className="w-5 h-5" />
            <span className="font-display">Team Login</span>
          </button>
        )}
      </div>

      {/* Decorative Pattern */}
      {/* <div className="absolute inset-[-50%] grid grid-cols-4 opacity-5 animate-rotate-bg">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i}>
            <img src="/Stars-1.svg" className="w-full h-full object-cover" />
          </div>
        ))}
      </div> */}
      {/* Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/main-video.MP4"
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-70 [&::-webkit-media-controls]:!hidden"
          controls={false}
          playsInline
        />
        {/* <div
          className="absolute inset-0 md:fixed"
          style={{
            backgroundImage: `url(${BACKGROUND_GIF})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.9) brightness(0.8)',
            opacity: 0.7,
          }}
        /> */}
        {/* Gradient Overlay */}
        {/* <div
          className="absolute inset-0 bg-gradient-to-b from-sage-600/70 via-transparent to-sage-600/70"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center min-h-screen text-center px-4 [perspective:1000px] pb-32 pt-24">
        <div className="mb-8">
          {/* Tournament Logo */}
          <div className="w-full max-w-[400px] md:max-w-[500px] mx-auto mb-12">
            <img
              src="https://i.ibb.co/RkxjQ1WG/zed4-09.png"
              alt="Tournament Logo"
              className="w-full h-auto object-contain animate-scale transition-all duration-700 ease-in-out filter drop-shadow-[0_0_30px_rgba(232,164,79,0.5)] transform-gpu"
            />
          </div>
          {/* Partner Logos */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto px-4">
            <div className="w-full max-w-[200px] md:max-w-[300px]">
              <img
                src="https://i.ibb.co/v47jnFjp/ZED-Ramadan.png"
                alt="ZED Logo"
                className="w-full h-auto object-contain animate-scale hover:rotate-6 transition-all duration-700 ease-in-out filter drop-shadow-[0_0_30px_rgba(232,164,79,0.5)] transform-gpu"
              />
            </div>
            <div className="w-full max-w-[200px] md:max-w-[300px]">
              <img
                src="https://i.ibb.co/NGQTrmc/ORA.png"
                alt="ORA Logo"
                className="w-full h-auto object-contain animate-scale hover:-rotate-6 transition-all duration-700 ease-in-out filter drop-shadow-[0_0_30px_rgba(232,164,79,0.5)] transform-gpu"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl mt-8 md:mt-12 text-peach-200 font-display max-w-3xl mx-auto px-4 leading-relaxed">
          Join the biggest Ramadan tournament at ZED El Sheikh Zayed
        </h2>

        <a
          href="/league"
          className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto z-50 bg-gradient-to-r from-peach-400 to-sage-500 text-white font-display py-6 px-16 text-2xl md:text-3xl mt-12 transition-all duration-500 ease-in-out transform hover:scale-105 hover:rotate-1 shadow-[0_0_30px_rgba(232,164,79,0.3)] hover:shadow-[0_0_50px_rgba(232,164,79,0.5)] animate-pulse md:rounded-full translate-y-1/2 md:translate-y-0 uppercase tracking-wider"
        >
          View Live Scores
        </a>
      </div>

      {/* Scroll indicator - Centered on both mobile and desktop */}
      <div className="absolute left-0 right-0 bottom-10 md:bottom-8 flex justify-center items-center z-40">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2 backdrop-blur-sm animate-bounce">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  );
}
