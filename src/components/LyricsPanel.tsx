import { useEffect, useRef } from "react";

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
                className={`text-sm md:text-base font-semibold mb-3 ${line === "" ? "h-6" : ""}`}
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
                className={`text-sm md:text-base font-semibold mb-3 ${line === "" ? "h-6" : ""}`}
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
