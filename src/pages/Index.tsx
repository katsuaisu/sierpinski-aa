import { useRef, useState, useEffect } from "react";
import IntroSequence from "@/components/IntroSequence";
import SceneWindow from "@/components/SceneWindow";
import MusicLyricsWindow from "@/components/MusicLyricsWindow";
import DraggableWindow from "@/components/DraggableWindow";
import IOSFolder from "@/components/IOSFolder";
import riskItAllAudio from "../../riskitall.mp3";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(false);
  const [musicVisible, setMusicVisible] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    audioEl.preload = "auto";
    audioEl.load();

    const attemptPlay = () => {
      audioEl.currentTime = 0;
      audioEl.muted = true;
      audioEl
        .play()
        .then(() => { audioEl.muted = false; })
        .catch(() => { audioEl.muted = false; });
    };

    const handleInteraction = () => {
      if (audioEl.paused || audioEl.muted) {
        audioEl.muted = false;
        audioEl.play().catch(() => {});
      }
    };

    attemptPlay();
    audioEl.addEventListener("loadeddata", attemptPlay, { once: true });
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("mousedown", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      audioEl.removeEventListener("loadeddata", attemptPlay);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen dot-grid-bg overflow-hidden">
      <audio
        ref={audioRef}
        src={riskItAllAudio}
        autoPlay
        playsInline
        loop
        preload="auto"
        style={{ display: "none" }}
      />

      {/* Glassmorphism title */}
      {sceneVisible && (
        <div className="absolute left-1/2 -translate-x-1/2 z-10 animate-fade-in" style={{ top: "5%" }}>
          <div
            className="px-8 py-3 rounded-2xl"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid hsla(0, 0%, 100%, 0.4)",
              boxShadow: "0 8px 32px hsla(0, 0%, 0%, 0.08), inset 0 1px 0 hsla(0, 0%, 100%, 0.6)",
            }}
          >
            <h1
              className="text-2xl md:text-4xl font-bold tracking-tight"
              style={{
                fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
                color: "hsl(var(--foreground))",
              }}
            >
              4Q-AA: Sierpinski's Triangle
            </h1>
          </div>
        </div>
      )}

      {/* 3D Sierpinski */}
      <div
        ref={sceneRef}
        className="absolute inset-0"
        style={{
          transform: sceneVisible ? undefined : "translateX(110%)",
          opacity: sceneVisible ? 1 : 0,
        }}
      >
        <SceneWindow />
      </div>

      {/* Combined Music + Lyrics window */}
      <div
        ref={musicRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
        style={{
          transform: musicVisible
            ? "translateY(-50%)"
            : "translateX(calc(100vw + 500px)) translateY(-50%)",
          opacity: musicVisible ? 1 : 0,
        }}
      >
        <DraggableWindow className="relative" defaultWidth={480} defaultHeight={420} minWidth={350} minHeight={300}>
          <MusicLyricsWindow />
        </DraggableWindow>
      </div>

      {/* iOS Folders */}
      {introComplete && (
        <>
          <IOSFolder
            label="OPEN BEFORE"
            position="top-left"
            content={
              <div className="space-y-3">
                <h3 className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))", fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}>
                  Welcome! 👋
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Here's how to navigate this experience:
                </p>
                <ul className="text-xs space-y-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <li>🖱️ <strong>Rotate</strong> the 3D model by clicking and dragging</li>
                  <li>🔍 <strong>Zoom</strong> in/out with your scroll wheel</li>
                  <li>🔺 <strong>Click</strong> on any triangle face to see its story</li>
                  <li>🪟 <strong>Drag</strong> any window by its title bar to rearrange</li>
                  <li>↔️ <strong>Resize</strong> any window from the bottom-right corner</li>
                  <li>🎵 Music plays automatically — click anywhere if it doesn't start</li>
                </ul>
                <p className="text-xs italic" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Take your time exploring each triangle. Every face has a story.
                </p>
              </div>
            }
          />
          <IOSFolder
            label="OPEN AFTER"
            position="top-right"
            content={
              <div className="space-y-3">
                <h3 className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))", fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}>
                  Thank you for exploring 💙
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  If you've made it this far, thank you for taking the time to go through everything. Each triangle represents a moment, a memory, a risk worth taking.
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  The Sierpinski triangle is a fractal — infinite in its complexity, yet built from the simplest of shapes. Much like life, every small moment builds into something beautiful.
                </p>
                <p className="text-xs leading-relaxed italic" style={{ color: "hsl(var(--muted-foreground))" }}>
                  "It's crazy, but it's true — there's nothing I won't do. I'd risk it all for you."
                </p>
              </div>
            }
          />
        </>
      )}

      {/* Intro overlay */}
      {!introComplete && (
        <IntroSequence
          sceneRef={sceneRef}
          musicRef={musicRef}
          onShowScene={() => setSceneVisible(true)}
          onShowMusic={() => setMusicVisible(true)}
          onComplete={() => setIntroComplete(true)}
        />
      )}
    </div>
  );
};

export default Index;
