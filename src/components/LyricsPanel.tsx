import { useEffect, useRef } from "react";

// Original placeholder poetry (not copyrighted lyrics)
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

const LyricsPanel = () => {
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

  return (
    <div
      className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-64 md:w-80 h-[60vh] overflow-hidden lyrics-container z-10"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        ref={scrollRef}
        className="h-full overflow-hidden"
        style={{
          transform: "rotateY(25deg)",
          transformOrigin: "left center",
        }}
      >
        <div className="py-[30vh]">
          {LINES.map((line, i) => (
            <p
              key={i}
              className={`text-lg md:text-xl font-bold mb-4 transition-all ${
                line === "" ? "h-8" : ""
              }`}
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                color: "hsl(0 0% 15%)",
                textShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              {line}
            </p>
          ))}
          {/* Repeat for seamless loop */}
          {LINES.map((line, i) => (
            <p
              key={`repeat-${i}`}
              className={`text-lg md:text-xl font-bold mb-4 ${
                line === "" ? "h-8" : ""
              }`}
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                color: "hsl(0 0% 15%)",
                textShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LyricsPanel;
