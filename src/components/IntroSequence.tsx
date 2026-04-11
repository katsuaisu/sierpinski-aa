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

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<
    "typing" | "selecting" | "dissolving" | "retyping" | "dragging" | "done"
  >("typing");
  const [isSelected, setIsSelected] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

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
    const model = modelRef.current;
    if (!cursor || !textEl || !container || !model) return;

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

      // Move cursor to center for typing title
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

      // Keep title visible permanently
      setTitleVisible(true);
      setDisplayText("");

      // Phase 6: Cursor moves offscreen right to "grab" the model
      setPhase("dragging");
      await new Promise<void>((resolve) => {
        tl.to(cursor, {
          left: container.clientWidth + 50,
          top: container.clientHeight / 2,
          duration: 0.6,
          ease: "power2.in",
          onComplete: resolve,
        });
      });

      // Show model offscreen right, positioned next to cursor
      setShowModel(true);
      gsap.set(model, {
        left: container.clientWidth + 60,
        top: "10%",
        width: "70%",
        height: "70%",
        opacity: 1,
      });

      await new Promise((r) => setTimeout(r, 200));

      // Cursor "grabs" and drags model into center
      const targetLeft = container.clientWidth * 0.2;
      const targetTop = container.clientHeight * 0.1;

      await new Promise<void>((resolve) => {
        tl.to(
          [cursor, model],
          {
            left: (i: number) =>
              i === 0 ? targetLeft + 20 : targetLeft,
            duration: 1.2,
            ease: "power3.out",
            onComplete: resolve,
          }
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

      // Scale model to fill viewport
      await new Promise<void>((resolve) => {
        tl.to(model, {
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: resolve,
        });
      });

      await new Promise((r) => setTimeout(r, 200));
      onComplete();
    };

    // Start cursor offscreen left
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

      {/* Typed text (placeholder then title) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
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

      {/* Persistent title after typing */}
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

      {/* Draggable 3D model */}
      <div
        ref={modelRef}
        className="absolute"
        style={{ opacity: showModel ? 1 : 0 }}
      >
        {showModel && (
          <Canvas
            camera={{ position: [6, 3, 6], fov: 45 }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-5, 5, -5]} intensity={0.4} />
            <SierpinskiTetrahedron
              onClickFace={() => {}}
              level={4}
            />
            <OrbitControls enabled={false} />
            <Environment preset="studio" />
          </Canvas>
        )}
      </div>
    </div>
  );
};

export default IntroSequence;
