import { useEffect, useRef, useState, useCallback, RefObject } from "react";
import gsap from "gsap";
import MacCursor from "./MacCursor";

interface IntroSequenceProps {
  sceneRef: RefObject<HTMLDivElement>;
  musicRef: RefObject<HTMLDivElement>;
  onShowScene: () => void;
  onShowMusic: () => void;
  onComplete: () => void;
}

const PLACEHOLDER_TEXT = "Loading experience...";
const MAIN_TITLE = "4Q-AA: Sierpinski's Triangle";

const IntroSequence = ({
  sceneRef,
  musicRef,
  onShowScene,
  onShowMusic,
  onComplete,
}: IntroSequenceProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<
    "typing" | "selecting" | "dissolving" | "retyping" | "dragging" | "done"
  >("typing");
  const [isSelected, setIsSelected] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const hasRun = useRef(false);

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
    if (hasRun.current) return;
    hasRun.current = true;

    const cursor = cursorRef.current;
    const textEl = textRef.current;
    const container = containerRef.current;
    const bg = bgRef.current;
    if (!cursor || !textEl || !container || !bg) return;

    const tl = gsap.timeline();
    const w = container.clientWidth;
    const h = container.clientHeight;

    const run = async () => {
      await typeText(PLACEHOLDER_TEXT);
      await new Promise<void>((r) => setTimeout(r, 400));

      const rect = textEl.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();

      setPhase("selecting");
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: rect.right - cRect.left + 5,
          top: rect.top - cRect.top + rect.height / 2 - 5,
          duration: 0.6, ease: "power2.inOut", onComplete: resolve,
        });
      });

      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: rect.left - cRect.left - 5,
          duration: 0.5, ease: "power2.inOut",
          onComplete: () => { setIsSelected(true); resolve(); },
        });
      });

      await new Promise<void>((r) => setTimeout(r, 300));

      setPhase("dissolving");
      await new Promise<void>((r) => setTimeout(r, 600));
      setDisplayText("");
      setIsSelected(false);
      setPhase("retyping");

      await new Promise<void>((resolve) => {
        tl.to(cursor, { left: w / 2 - 100, top: h / 2 - 40, duration: 0.4, ease: "power2.inOut", onComplete: resolve });
      });

      await typeText(MAIN_TITLE);
      await new Promise<void>((r) => setTimeout(r, 600));
      setTitleVisible(true);
      setDisplayText("");

      tl.to(bg, { opacity: 0, duration: 0.6, ease: "power2.out" });
      setPhase("dragging");

      // Drag 1: 3D Model
      const sceneEl = sceneRef.current;
      if (sceneEl) {
        gsap.set(sceneEl, { x: w, opacity: 0 });
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve(undefined)));
        onShowScene();

        await new Promise<void>((resolve) => {
          tl.to(cursor, { left: w + 30, top: h * 0.4, duration: 0.4, ease: "power2.in", onComplete: resolve });
        });
        await new Promise<void>((resolve) => {
          tl.to(cursor, { left: w * 0.55, top: h * 0.45, duration: 1.0, ease: "power3.out" });
          tl.to(sceneEl, { x: 0, opacity: 1, duration: 1.0, ease: "power3.out", onComplete: resolve }, "<");
        });
      }

      await new Promise<void>((r) => setTimeout(r, 150));

      // Drag 2: Music + Lyrics window
      const musicEl = musicRef.current;
      if (musicEl) {
        gsap.set(musicEl, { x: w + 500, opacity: 0 });
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve(undefined)));
        onShowMusic();

        await new Promise<void>((resolve) => {
          tl.to(cursor, { left: w + 30, top: h * 0.35, duration: 0.35, ease: "power2.in", onComplete: resolve });
        });
        await new Promise<void>((resolve) => {
          tl.to(cursor, { left: 80, top: h * 0.45, duration: 0.9, ease: "power3.out" });
          tl.to(musicEl, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", onComplete: resolve }, "<");
        });
      }

      await new Promise<void>((r) => setTimeout(r, 200));

      // Cursor exits upward
      await new Promise<void>((resolve) => {
        tl.to(cursor, { top: -40, duration: 0.4, ease: "power2.in", onComplete: resolve });
      });

      await new Promise<void>((r) => setTimeout(r, 300));
      onComplete();
    };

    gsap.set(cursor, { left: -30, top: h / 2 });
    tl.to(cursor, {
      left: w / 2 + 80, top: h / 2 - 5, duration: 0.8, ease: "power2.out",
      onComplete: () => run(),
    });

    return () => { tl.kill(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <div ref={bgRef} className="absolute inset-0 dot-grid-bg" style={{ background: "hsl(0 0% 97%)" }} />
      <MacCursor ref={cursorRef} />
      {!titleVisible && (
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ top: phase === "retyping" ? "-10%" : "0" }}>
          <div
            ref={textRef}
            className={`text-2xl md:text-4xl font-bold tracking-tight transition-all duration-500 ${phase === "dissolving" ? "opacity-0 scale-95 blur-sm" : "opacity-100"}`}
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", color: "hsl(0 0% 10%)" }}
          >
            <span className={isSelected ? "text-selection px-1" : ""}>{displayText}</span>
            {(phase === "typing" || phase === "retyping") && displayText.length > 0 && <span className="cursor-blink" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroSequence;
