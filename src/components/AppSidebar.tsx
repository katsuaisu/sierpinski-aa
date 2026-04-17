import { useState, useEffect, useRef } from "react";
import MusicPlaylistWindow from "./MusicPlaylistWindow";
import EmailWindow from "./EmailWindow";

const MailIconSvg = ({ hasBadge }: { hasBadge?: boolean }) => (
  <div className="relative">
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="mailGrad" x1="28" y1="0" x2="28" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7BD8FF" />
          <stop offset="1" stopColor="#1E90FF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="52" height="52" rx="12" fill="url(#mailGrad)" />
      <path
        d="M12 20 L28 32 L44 20 L44 38 C44 39.1 43.1 40 42 40 L14 40 C12.9 40 12 39.1 12 38 Z"
        fill="white"
      />
      <path d="M12 18 C12 16.9 12.9 16 14 16 L42 16 C43.1 16 44 16.9 44 18 L28 30 Z" fill="white" />
    </svg>
    {hasBadge && (
      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
        1
      </div>
    )}
  </div>
);

const MusicIconSvg = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <defs>
      <linearGradient id="musicGrad" x1="28" y1="0" x2="28" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5E7E" />
        <stop offset="1" stopColor="#FF2D55" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="52" height="52" rx="12" fill="url(#musicGrad)" />
    <path
      d="M36 14 L24 17 V34.5 C23.4 34.2 22.7 34 22 34 C20.3 34 19 35.3 19 37 C19 38.7 20.3 40 22 40 C23.7 40 25 38.7 25 37 V22 L34 19.5 V31.5 C33.4 31.2 32.7 31 32 31 C30.3 31 29 32.3 29 34 C29 35.7 30.3 37 32 37 C33.7 37 35 35.7 35 34 V14 Z"
      fill="white"
    />
  </svg>
);

interface AppSidebarProps {
  introComplete: boolean;
}

const AppSidebar = ({ introComplete }: AppSidebarProps) => {
  const [hasArrived, setHasArrived] = useState(false); // mail exists in inbox
  const [badgeVisible, setBadgeVisible] = useState(false); // unread (1) badge
  const [mailOpen, setMailOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const dingRef = useRef<HTMLAudioElement | null>(null);

  // Trigger the (1) notification + sound after 1 minute
  useEffect(() => {
    if (!introComplete) return;
    const timer = setTimeout(() => {
      setHasArrived(true);
      setBadgeVisible(true);
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const playTone = (freq: number, start: number, dur: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.value = freq;
          osc.type = "sine";
          gain.gain.setValueAtTime(0, ctx.currentTime + start);
          gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + start + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + start);
          osc.stop(ctx.currentTime + start + dur);
        };
        playTone(880, 0, 0.18);
        playTone(1320, 0.12, 0.25);
      } catch {
        // ignore
      }
    }, 60000);
    return () => clearTimeout(timer);
  }, [introComplete]);

  const handleMailClick = () => {
    setMailOpen((v) => !v);
    if (badgeVisible) setBadgeVisible(false);
  };

  if (!introComplete) return null;

  return (
    <>
      {/* Right-side icon column under OPEN BEFORE folder */}
      <div
        className="absolute z-20 flex flex-col items-center gap-4"
        style={{ right: "1.25rem", top: "112px" }}
      >
        {/* Music icon */}
        <button
          onClick={() => setMusicOpen((v) => !v)}
          className="flex flex-col items-center gap-1 group"
          aria-label="Open playlist"
        >
          <div className="transition-transform group-hover:scale-110 drop-shadow-lg">
            <MusicIconSvg />
          </div>
          <span
            className="text-[11px] font-semibold text-center leading-tight max-w-20"
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              color: "hsl(var(--foreground))",
              textShadow: "0 1px 3px hsla(0, 0%, 100%, 0.5)",
            }}
          >
            PLAYLIST
          </span>
        </button>

        {/* Mail icon (always visible; badge after 1 min) */}
        <button
          onClick={handleMailClick}
          className="flex flex-col items-center gap-1 group"
          aria-label="Open mail"
        >
          <div className="transition-transform group-hover:scale-110 drop-shadow-lg">
            <MailIconSvg hasBadge={badgeVisible && !mailOpen} />
          </div>
          <span
            className="text-[11px] font-semibold text-center leading-tight max-w-20"
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              color: "hsl(var(--foreground))",
              textShadow: "0 1px 3px hsla(0, 0%, 100%, 0.5)",
            }}
          >
            MAIL
          </span>
        </button>
      </div>

      {musicOpen && <MusicPlaylistWindow onClose={() => setMusicOpen(false)} />}
      {mailOpen && (
        <EmailWindow onClose={() => setMailOpen(false)} hasMail={hasArrived} />
      )}

      <audio ref={dingRef} src="" style={{ display: "none" }} />
    </>
  );
};

export default AppSidebar;
