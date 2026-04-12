import { useEffect, useRef } from "react";

const LINES = [
  "For just a moment in the light",
  "You set the world beyond my sight",
  "I'd chase the horizon if you asked me to",
  "Say you want the stars, I'll build a ladder high",
  "No peak too steep, no ocean too wide",
  "It's wild, but it's real",
  "There's nothing I can't feel",
  "",
  "Through every storm I'd find my way",
  "A thousand miles won't make me stay",
  "The gravity of you pulls me through",
  "Every constellation points to you",
  "I'd rewrite the sky in shades of blue",
  "It's bold, it's bright",
  "I'd cross into the night",
  "",
  "With open arms I face the unknown",
  "Each step I take leads me back home",
  "The universe conspires when hearts align",
  "A fractal pattern, perfectly designed",
  "In every triangle, your reflection shines",
  "It's math, it's art",
  "You've been there from the start",
];

interface LyricsPanelProps {
  embedded?: boolean;
}

const LyricsPanel = ({ embedded }: LyricsPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animFrame: number;
    let scrollPos = 0;

    const scroll = () => {
      scrollPos += 0.4;
      if (scrollPos >= el.scrollHeight - el.clientHeight) {
        scrollPos = 0;
      }
      el.scrollTop = scrollPos;
      animFrame = requestAnimationFrame(scroll);
    };

    animFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const content = (
    <div className="window-chrome">
      <div className="window-titlebar">
        <div className="window-dot window-dot-red" />
        <div className="window-dot window-dot-yellow" />
        <div className="window-dot window-dot-green" />
        <span className="ml-2 text-[11px] text-muted-foreground font-medium">
          Lyrics
        </span>
      </div>
      <div
        className="h-[50vh] overflow-hidden lyrics-container"
        style={{ background: "hsl(var(--card))" }}
      >
        <div ref={scrollRef} className="h-full overflow-hidden px-5 py-4">
          <div className="py-[20vh]">
            {LINES.map((line, i) => (
              <p
                key={i}
                className={`text-sm md:text-base font-semibold mb-3 ${
                  line === "" ? "h-6" : ""
                }`}
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
                className={`text-sm md:text-base font-semibold mb-3 ${
                  line === "" ? "h-6" : ""
                }`}
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
  );

  if (embedded) {
    return <div className="w-72 md:w-80">{content}</div>;
  }

  return (
    <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 w-72 md:w-80">
      {content}
    </div>
  );
};

export default LyricsPanel;
