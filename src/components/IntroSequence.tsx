import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import MacCursor from "./MacCursor";

interface IntroSequenceProps {
  onComplete: () => void;
}

const PLACEHOLDER_TEXT = "Loading experience...";
const MAIN_TITLE = "4Q-AA: Sierpinski's Triangle";

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "selecting" | "dissolving" | "retyping" | "done">("typing");
  const [isSelected, setIsSelected] = useState(false);

  const typeText = useCallback((text: string, delay: number): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, 70);
    });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const textEl = textRef.current;
    const container = containerRef.current;
    if (!cursor || !textEl || !container) return;

    const tl = gsap.timeline();

    const run = async () => {
      // Phase 1: Type placeholder
      await typeText(PLACEHOLDER_TEXT, 70);
      await new Promise(r => setTimeout(r, 400));

      // Phase 2: Move cursor to text
      const rect = textEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setPhase("selecting");
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: rect.right - containerRect.left + 5,
          top: rect.top - containerRect.top + rect.height / 2 - 5,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: resolve,
        });
      });

      // Phase 3: Select text
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: rect.left - containerRect.left - 5,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setIsSelected(true);
            resolve();
          },
        });
      });

      await new Promise(r => setTimeout(r, 300));

      // Phase 4: Dissolve
      setPhase("dissolving");
      await new Promise(r => setTimeout(r, 600));

      setDisplayText("");
      setIsSelected(false);
      setPhase("retyping");

      // Move cursor to center
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: container.clientWidth / 2 - 100,
          top: container.clientHeight / 2 - 12,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: resolve,
        });
      });

      // Phase 5: Type main title
      await typeText(MAIN_TITLE, 60);
      await new Promise(r => setTimeout(r, 800));

      // Phase 6: Cursor exits
      setPhase("done");
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: container.clientWidth + 50,
          top: container.clientHeight / 2,
          duration: 0.8,
          ease: "power2.in",
          onComplete: resolve,
        });
      });

      await new Promise(r => setTimeout(r, 300));
      onComplete();
    };

    // Start cursor offscreen
    gsap.set(cursor, { left: -30, top: container.clientHeight / 2 });

    // Animate cursor in
    tl.to(cursor, {
      left: container.clientWidth / 2 + 80,
      top: container.clientHeight / 2 - 5,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => run(),
    });

    return () => { tl.kill(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center dot-grid-bg"
      style={{ background: "hsl(0 0% 97%)" }}
    >
      <MacCursor ref={cursorRef} />
      <div
        ref={textRef}
        className={`text-2xl md:text-4xl font-bold tracking-tight transition-all duration-500 ${
          phase === "dissolving" ? "opacity-0 scale-95 blur-sm" : "opacity-100"
        }`}
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          color: "hsl(0 0% 10%)",
        }}
      >
        <span className={isSelected ? "text-selection px-1" : ""}>
          {displayText}
        </span>
        {(phase === "typing" || phase === "retyping") && displayText.length > 0 && (
          <span className="cursor-blink" />
        )}
      </div>
    </div>
  );
};

export default IntroSequence;
