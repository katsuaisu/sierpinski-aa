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
      <div className="window-chrome h-full flex flex-col">
        <div className="window-titlebar flex-shrink-0">
          <div className="window-dot window-dot-red" />
          <div className="window-dot window-dot-yellow" />
          <div className="window-dot window-dot-green" />
          <span className="ml-2 text-[11px] text-muted-foreground font-medium">
            Apple Music
          </span>
        </div>

        <div className="flex flex-1 min-h-0" style={{ background: "hsl(var(--card))" }}>
          {/* Left side: Album art + controls */}
          <div className="w-48 flex-shrink-0 flex flex-col border-r" style={{ borderColor: "hsl(var(--border))" }}>
            {/* Album art */}
            <div className="p-3">
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
            <div className="px-3 pb-2">
              <p className="text-sm font-semibold truncate" style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                color: "hsl(var(--foreground))",
              }}>
                Risk It All
              </p>
              <p className="text-xs text-muted-foreground truncate">Bruno Mars</p>
            </div>

            {/* Progress bar */}
            <div className="px-3 pb-2">
              <div className="w-full h-[3px] rounded-full" style={{ background: "hsl(var(--muted))" }}>
                <div className="h-full rounded-full progress-bar" style={{ background: "hsl(var(--primary))" }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-muted-foreground">1:12</span>
                <span className="text-[9px] text-muted-foreground">3:24</span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="px-3 pb-3 flex items-center justify-center gap-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 20L9 12l10-8v16zM7 19H5V5h2v14z"/></svg>
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--foreground))" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="hsl(var(--background))">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4l10 8-10 8V4zm12-1h2v18h-2V3z"/></svg>
              </button>
            </div>

            {/* Sound bars */}
            <div className="px-3 pb-3 flex items-end justify-center gap-[2px] h-6">
              {[0, 0.15, 0.3, 0.45, 0.6].map((delay, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    background: "hsl(var(--primary))",
                    animation: "soundbar 0.6s ease-in-out infinite alternate",
                    animationDelay: `${delay}s`,
                    height: "3px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right side: Lyrics */}
          <div className="flex-1 min-w-0 overflow-hidden lyrics-container">
            <div ref={scrollRef} className="h-full overflow-hidden px-5 py-4">
              <div className="py-[15vh]">
                {LINES.map((line, i) => (
                  <p
                    key={i}
                    className={`text-base md:text-lg font-bold mb-3 ${line === "" ? "h-6" : ""}`}
                    style={{
                      fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {line}
                  </p>
                ))}
                {LINES.map((line, i) => (
                  <p
                    key={`repeat-${i}`}
                    className={`text-base md:text-lg font-bold mb-3 ${line === "" ? "h-6" : ""}`}
                    style={{
                      fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                      color: "hsl(var(--foreground))",
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
