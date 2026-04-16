import { useEffect, useRef, useState } from "react";
import riskItAll from "../assets/riskitall.png";

// Timed lyrics: [startSeconds, text]
// Approximate timestamps for "Risk It All" by Bruno Mars (~3:24 = 204s)
const TIMED_LYRICS: [number, string][] = [
  [0, ""],
  [12, "For just the chance to win your heart"],
  [16, "You could set the bar beyond the stars"],
  [20, "I'll do anything, anything you ask me to"],
  [26, ""],
  [28, "Say you want the moon"],
  [31, "Watch me learn to fly"],
  [34, "Ain't no mountain you could point to"],
  [38, "I wouldn't climb"],
  [41, ""],
  [43, "It's crazy, but it's true"],
  [47, "There's nothing I won't do"],
  [51, "I'd risk it all for you"],
  [57, ""],
  [60, "To hold your hand and call you mine"],
  [64, "I'm tryna be your man, 'til the end of time"],
  [69, "Oh, I'll do anything, anything you ask me to"],
  [75, ""],
  [77, "I would run through a fire"],
  [80, "Just to be by your side"],
  [83, "If your heart's on the line"],
  [86, "You could take mine"],
  [89, ""],
  [91, "It's crazy, but it's true"],
  [95, "There's nothing I won't do"],
  [99, "I'd risk it all for you"],
  [105, ""],
  [118, "I would swim across the sea just to show you"],
  [123, "Sacrifice my life just to hold you"],
  [128, "I could go on and on"],
  [132, "To prove that you belong here in my arms"],
  [138, ""],
  [140, "Say you want the moon"],
  [143, "Watch me learn to fly"],
  [146, "Ain't no mountain you could point to"],
  [150, "I wouldn't climb"],
  [153, ""],
  [155, "It's crazy, but it's true"],
  [159, "There's nothing I won't do"],
  [163, "I'd risk it all for you"],
  [169, "It's crazy, but it's true"],
  [173, "There's nothing I won't do"],
  [177, "I'd risk it all for you"],
  [183, ""],
];

const TOTAL_DURATION = 204; // 3:24

interface MusicLyricsWindowProps {
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const MusicLyricsWindow = ({ audioRef }: MusicLyricsWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [currentLine, setCurrentLine] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const t = audio.currentTime;
      setCurrentTime(t);
      setProgress((t / (audio.duration || TOTAL_DURATION)) * 100);

      // Find current lyric line
      let idx = -1;
      for (let i = TIMED_LYRICS.length - 1; i >= 0; i--) {
        if (t >= TIMED_LYRICS[i][0]) {
          idx = i;
          break;
        }
      }
      setCurrentLine(idx);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, [audioRef]);

  // Auto-scroll to current line
  useEffect(() => {
    if (currentLine < 0) return;
    const el = lineRefs.current[currentLine];
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentLine]);

  const duration = audioRef?.current?.duration || TOTAL_DURATION;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-full flex flex-col rounded-xl overflow-hidden" style={{
        background: "hsla(0, 0%, 100%, 0.45)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1px solid hsla(0, 0%, 100%, 0.5)",
        boxShadow: "0 8px 32px hsla(0, 0%, 0%, 0.1), inset 0 1px 0 hsla(0, 0%, 100%, 0.6)",
      }}>
        <div className="window-titlebar flex-shrink-0">
          <div className="window-dot window-dot-red" />
          <div className="window-dot window-dot-yellow" />
          <div className="window-dot window-dot-green" />
          <span className="ml-2 text-[11px] font-medium" style={{ color: "hsla(0, 0%, 0%, 0.5)" }}>
            Apple Music
          </span>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Left side: Album art + controls */}
          <div className="w-36 flex-shrink-0 flex flex-col border-r" style={{ borderColor: "hsla(0, 0%, 0%, 0.08)" }}>
            <div className="p-2">
              <div className="w-full aspect-square rounded-lg overflow-hidden" style={{
                background: "linear-gradient(135deg, hsl(350 80% 55%), hsl(20 90% 55%))",
              }}>
                <img src={riskItAll} alt="Risk It All" className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            </div>

            <div className="px-2 pb-1">
              <p className="text-[11px] font-semibold truncate" style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                color: "hsla(0, 0%, 0%, 0.85)",
              }}>Risk It All</p>
              <p className="text-[10px] truncate" style={{ color: "hsla(0, 0%, 0%, 0.45)" }}>Bruno Mars</p>
            </div>

            {/* Progress bar - synced */}
            <div className="px-2 pb-1">
              <div className="w-full h-[2px] rounded-full" style={{ background: "hsla(0, 0%, 0%, 0.1)" }}>
                <div className="h-full rounded-full transition-all duration-300" style={{
                  background: "hsl(var(--primary))",
                  width: `${progress}%`,
                }} />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[8px]" style={{ color: "hsla(0, 0%, 0%, 0.4)" }}>
                  {formatTime(currentTime)}
                </span>
                <span className="text-[8px]" style={{ color: "hsla(0, 0%, 0%, 0.4)" }}>
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="px-2 pb-2 flex items-center justify-center gap-3">
              <button style={{ color: "hsla(0, 0%, 0%, 0.4)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 20L9 12l10-8v16zM7 19H5V5h2v14z"/></svg>
              </button>
              <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "hsla(0, 0%, 0%, 0.8)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              </button>
              <button style={{ color: "hsla(0, 0%, 0%, 0.4)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4l10 8-10 8V4zm12-1h2v18h-2V3z"/></svg>
              </button>
            </div>

            {/* Sound bars */}
            <div className="px-2 pb-2 flex items-end justify-center gap-[2px] h-4">
              {[0, 0.15, 0.3, 0.45, 0.6].map((delay, i) => (
                <div key={i} className="w-[2px] rounded-full" style={{
                  background: "hsl(var(--primary))",
                  animation: "soundbar 0.6s ease-in-out infinite alternate",
                  animationDelay: `${delay}s`,
                  height: "2px",
                }} />
              ))}
            </div>
          </div>

          {/* Right side: Lyrics */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div ref={scrollRef} className="h-full overflow-y-auto px-4 py-3" style={{ scrollbarWidth: "none" }}>
              <div className="py-[40%]">
                {TIMED_LYRICS.map(([, text], i) => (
                  <p
                    key={i}
                    ref={(el) => { lineRefs.current[i] = el; }}
                    className={`text-[13px] font-bold mb-2 transition-all duration-500 ${text === "" ? "h-4" : ""}`}
                    style={{
                      fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                      color: i === currentLine
                        ? "hsla(0, 0%, 0%, 1)"
                        : "hsla(0, 0%, 0%, 0.3)",
                      transform: i === currentLine ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "left center",
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicLyricsWindow;
