import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import gsap from "gsap";
import MacCursor from "./MacCursor";
import SierpinskiTetrahedron from "./SierpinskiTetrahedron";

interface IntroSequenceProps {
  onComplete: () => void;
}

const PLACEHOLDER_TEXT = "Loading experience...";
const MAIN_TITLE = "4Q-AA: Sierpinski's Triangle";

/* ─── Lyrics window content (same lines as LyricsPanel) ─── */
const LYRICS_LINES = [
  "For just a moment in the light",
  "You set the world beyond my sight",
  "I'd chase the horizon if you asked me to",
  "Say you want the stars, I'll build a ladder high",
  "No peak too steep, no ocean too wide",
  "It's wild, but it's real",
  "There's nothing I can't feel",
];

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<
    "typing" | "selecting" | "dissolving" | "retyping" | "dragging" | "done"
  >("typing");
  const [isSelected, setIsSelected] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [showScene, setShowScene] = useState(false);

  const typeText = useCallback((text: string, _delay: number): Promise<void> => {
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
    const lyrics = lyricsRef.current;
    if (!cursor || !textEl || !container || !lyrics) return;

    const tl = gsap.timeline();

    const run = async () => {
      // Phase 1: Type placeholder
      await typeText(PLACEHOLDER_TEXT, 70);
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
      await typeText(MAIN_TITLE, 60);
      await new Promise((r) => setTimeout(r, 600));

      setTitleVisible(true);
      setDisplayText("");

      // Show 3D scene in background
      setShowScene(true);

      // Phase 6: Cursor exits right to "grab" the lyrics window
      setPhase("dragging");
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: container.clientWidth + 50,
          top: container.clientHeight * 0.3,
          duration: 0.6,
          ease: "power2.in",
          onComplete: resolve,
        });
      });

      // Show lyrics window offscreen right
      setShowLyrics(true);
      gsap.set(lyrics, {
        right: -320,
        top: "15%",
        opacity: 1,
      });

      await new Promise((r) => setTimeout(r, 200));

      // Cursor drags lyrics window to left side
      const targetRight = container.clientWidth - 320;

      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: 40,
          duration: 1.2,
          ease: "power3.out",
        });
        tl.to(
          lyrics,
          {
            right: targetRight,
            duration: 1.2,
            ease: "power3.out",
            onComplete: resolve,
          },
          "<"
        );
      });

      await new Promise((r) => setTimeout(r, 300));

      // Cursor releases and exits upward
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
      className="fixed inset-0 z-50 dot-grid-bg overflow-hidden"
      style={{ background: "hsl(0 0% 97%)" }}
    >
      <MacCursor ref={cursorRef} />

      {/* Typed text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: phase === "retyping" || titleVisible ? "-10%" : "0" }}
      >
        <div
          ref={textRef}
          className={`text-2xl md:text-4xl font-bold tracking-tight transition-all duration-500 ${
            phase === "dissolving"
              ? "opacity-0 scale-95 blur-sm"
              : "opacity-100"
          }`}
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
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

      {/* Persistent title */}
      {titleVisible && (
        <h1
          className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-4xl font-bold tracking-tight text-foreground z-10"
          style={{
            top: "8%",
            fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
          }}
        >
          {MAIN_TITLE}
        </h1>
      )}

      {/* 3D scene background */}
      {showScene && (
        <div className="absolute inset-0 animate-fade-in">
          <Canvas
            camera={{ position: [6, 3, 6], fov: 45 }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-5, 5, -5]} intensity={0.4} />
            <SierpinskiTetrahedron onClickFace={() => {}} level={4} />
            <OrbitControls enabled={false} />
            <Environment preset="studio" />
          </Canvas>
        </div>
      )}

      {/* Lyrics window being dragged in */}
      <div
        ref={lyricsRef}
        className="absolute w-72"
        style={{ opacity: showLyrics ? 1 : 0 }}
      >
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
            className="h-[50vh] overflow-hidden px-5 py-4"
            style={{ background: "hsl(var(--card))" }}
          >
            <div>
              {LYRICS_LINES.map((line, i) => (
                <p
                  key={i}
                  className="text-sm font-semibold mb-3"
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
  );
};

export default IntroSequence;
