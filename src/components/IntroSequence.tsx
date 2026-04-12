import { useEffect, useRef, useState, useCallback, RefObject } from "react";
import gsap from "gsap";
import MacCursor from "./MacCursor";

interface IntroSequenceProps {
  sceneRef: RefObject<HTMLDivElement>;
  lyricsRef: RefObject<HTMLDivElement>;
  onShowScene: () => void;
  onShowLyrics: () => void;
  onComplete: () => void;
}

const PLACEHOLDER_TEXT = "Loading experience...";
const MAIN_TITLE = "4Q-AA: Sierpinski's Triangle";

const IntroSequence = ({
  sceneRef,
  lyricsRef,
  onShowScene,
  onShowLyrics,
  onComplete,
}: IntroSequenceProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<
    "typing" | "selecting" | "dissolving" | "retyping" | "dragging" | "done"
  >("typing");
  const [isSelected, setIsSelected] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  const typeText = useCallback((text: string): Promise<void> => {
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
      await typeText(PLACEHOLDER_TEXT);
      await new Promise((r) => setTimeout(r, 400));

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

      await new Promise((r) => setTimeout(r, 300));

      // Phase 4: Dissolve
      setPhase("dissolving");
      await new Promise((r) => setTimeout(r, 600));

      setDisplayText("");
      setIsSelected(false);
      setPhase("retyping");

      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: container.clientWidth / 2 - 100,
          top: container.clientHeight / 2 - 40,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: resolve,
        });
      });

      // Phase 5: Type main title
      await typeText(MAIN_TITLE);
      await new Promise((r) => setTimeout(r, 600));

      setTitleVisible(true);
      setDisplayText("");

      // Phase 6: Cursor exits right to "grab" the 3D model
      setPhase("dragging");
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: container.clientWidth + 50,
          top: container.clientHeight * 0.4,
          duration: 0.6,
          ease: "power2.in",
          onComplete: resolve,
        });
      });

      // Show the 3D scene (starts off-screen right via CSS)
      onShowScene();

      // Animate the scene container sliding in from right
      const sceneEl = sceneRef.current;
      if (sceneEl) {
        gsap.set(sceneEl, { x: "110%", opacity: 0 });
        await new Promise<void>((resolve) => {
          tl.to(cursor, {
            left: container.clientWidth * 0.5,
            duration: 1.2,
            ease: "power3.out",
          });
          tl.to(
            sceneEl,
            {
              x: "0%",
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              onComplete: resolve,
            },
            "<"
          );
        });
      }

      await new Promise((r) => setTimeout(r, 300));

      // Phase 7: Cursor exits right again to grab lyrics
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: container.clientWidth + 50,
          top: container.clientHeight * 0.3,
          duration: 0.5,
          ease: "power2.in",
          onComplete: resolve,
        });
      });

      // Show lyrics (starts off-screen right via CSS)
      onShowLyrics();

      const lyricsEl = lyricsRef.current;
      if (lyricsEl) {
        gsap.set(lyricsEl, { x: "calc(100vw + 320px)", opacity: 0 });
        await new Promise<void>((resolve) => {
          tl.to(cursor, {
            left: 60,
            duration: 1.0,
            ease: "power3.out",
          });
          tl.to(
            lyricsEl,
            {
              x: "0%",
              opacity: 1,
              duration: 1.0,
              ease: "power3.out",
              onComplete: resolve,
            },
            "<"
          );
        });
      }

      await new Promise((r) => setTimeout(r, 300));

      // Cursor exits upward
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          top: -40,
          duration: 0.5,
          ease: "power2.in",
          onComplete: resolve,
        });
      });

      await new Promise((r) => setTimeout(r, 400));
      onComplete();
    };

    gsap.set(cursor, { left: -30, top: container.clientHeight / 2 });

    tl.to(cursor, {
      left: container.clientWidth / 2 + 80,
      top: container.clientHeight / 2 - 5,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => run(),
    });

    return () => {
      tl.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
      style={{ background: phase === "dragging" || titleVisible ? "transparent" : "hsl(0 0% 97%)" }}
    >
      <MacCursor ref={cursorRef} />

      {/* Typed text */}
      {!titleVisible && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ top: phase === "retyping" ? "-10%" : "0" }}
        >
          <div
            ref={textRef}
            className={`text-2xl md:text-4xl font-bold tracking-tight transition-all duration-500 ${
              phase === "dissolving"
                ? "opacity-0 scale-95 blur-sm"
                : "opacity-100"
            }`}
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              color: "hsl(0 0% 10%)",
            }}
          >
            <span className={isSelected ? "text-selection px-1" : ""}>
              {displayText}
            </span>
            {(phase === "typing" || phase === "retyping") &&
              displayText.length > 0 && <span className="cursor-blink" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroSequence;
