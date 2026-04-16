import { useEffect, useRef } from "react";
import riskItAll from "../assets/riskitall.png";

const LINES = [
  "For just the chance to win your heart",
  "You could set the bar beyond the stars",
  "I'll do anything, anything you ask me to",
  "",
  "Say you want the moon",
  "Watch me learn to fly",
  "Ain't no mountain you could point to",
  "I wouldn't climb",
  "",
  "It's crazy, but it's true",
  "There's nothing I won't do",
  "I'd risk it all for you",
  "",
  "To hold your hand and call you mine",
  "I'm tryna be your man, 'til the end of time",
  "Oh, I'll do anything, anything you ask me to",
  "",
  "I would run through a fire",
  "Just to be by your side",
  "If your heart's on the line",
  "You could take mine",
  "",
  "It's crazy, but it's true",
  "There's nothing I won't do",
  "I'd risk it all for you",
  "",
  "I would swim across the sea just to show you",
  "Sacrifice my life just to hold you",
  "I could go on and on",
  "To prove that you belong here in my arms",
  "",
  "Say you want the moon",
  "Watch me learn to fly",
  "Ain't no mountain you could point to",
  "I wouldn't climb",
  "",
  "It's crazy, but it's true",
  "There's nothing I won't do",
  "I'd risk it all for you",
  "It's crazy, but it's true",
  "There's nothing I won't do",
  "I'd risk it all for you",
];

const MusicLyricsWindow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animFrame: number;
    let scrollPos = 0;

    const startTimeout = window.setTimeout(() => {
      const scroll = () => {
        scrollPos += 0.14;
        if (scrollPos >= el.scrollHeight - el.clientHeight) {
          scrollPos = 0;
        }
        el.scrollTop = scrollPos;
        animFrame = requestAnimationFrame(scroll);
      };
      animFrame = requestAnimationFrame(scroll);
    }, 30000);

    return () => {
      window.clearTimeout(startTimeout);
      cancelAnimationFrame(animFrame);
    };
  }, []);

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
            {/* Album art */}
            <div className="p-2">
              <div className="w-full aspect-square rounded-lg overflow-hidden" style={{
                background: "linear-gradient(135deg, hsl(350 80% 55%), hsl(20 90% 55%))",
              }}>
                <img
                  src={riskItAll}
                  alt="Risk It All"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </div>

            {/* Track info */}
            <div className="px-2 pb-1">
              <p className="text-[11px] font-semibold truncate" style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                color: "hsla(0, 0%, 0%, 0.85)",
              }}>
                Risk It All
              </p>
              <p className="text-[10px] truncate" style={{ color: "hsla(0, 0%, 0%, 0.45)" }}>Bruno Mars</p>
            </div>

            {/* Progress bar */}
            <div className="px-2 pb-1">
              <div className="w-full h-[2px] rounded-full" style={{ background: "hsla(0, 0%, 0%, 0.1)" }}>
                <div className="h-full rounded-full progress-bar" style={{ background: "hsl(var(--primary))" }} />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[8px]" style={{ color: "hsla(0, 0%, 0%, 0.4)" }}>1:12</span>
                <span className="text-[8px]" style={{ color: "hsla(0, 0%, 0%, 0.4)" }}>3:24</span>
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
                <div
                  key={i}
                  className="w-[2px] rounded-full"
                  style={{
                    background: "hsl(var(--primary))",
                    animation: "soundbar 0.6s ease-in-out infinite alternate",
                    animationDelay: `${delay}s`,
                    height: "2px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right side: Lyrics */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div ref={scrollRef} className="h-full overflow-hidden px-4 py-3">
              <div className="py-[10vh]">
                {LINES.map((line, i) => (
                  <p
                    key={i}
                    className={`text-[13px] font-bold mb-2 ${line === "" ? "h-4" : ""}`}
                    style={{
                      fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                      color: "hsla(0, 0%, 0%, 0.75)",
                    }}
                  >
                    {line}
                  </p>
                ))}
                {LINES.map((line, i) => (
                  <p
                    key={`repeat-${i}`}
                    className={`text-[13px] font-bold mb-2 ${line === "" ? "h-4" : ""}`}
                    style={{
                      fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                      color: "hsla(0, 0%, 0%, 0.75)",
                    }}
                  >
                    {line}
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
