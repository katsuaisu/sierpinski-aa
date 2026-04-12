import { useRef, useState } from "react";
import IntroSequence from "@/components/IntroSequence";
import SceneWindow from "@/components/SceneWindow";
import LyricsPanel from "@/components/LyricsPanel";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(false);
  const [lyricsVisible, setLyricsVisible] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-screen h-screen dot-grid-bg overflow-hidden">
      {/* 3D Sierpinski - always mounted, starts off-screen right */}
      <div
        ref={sceneRef}
        className="absolute inset-0 transition-none"
        style={{
          transform: sceneVisible ? "translateX(0)" : "translateX(110%)",
          opacity: sceneVisible ? 1 : 0,
        }}
      >
        <SceneWindow />
      </div>

      {/* Lyrics panel - always mounted, starts off-screen right */}
      <div
        ref={lyricsRef}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 transition-none"
        style={{
          transform: lyricsVisible
            ? "translateX(0) translateY(-50%)"
            : "translateX(calc(100vw + 320px)) translateY(-50%)",
          opacity: lyricsVisible ? 1 : 0,
        }}
      >
        <LyricsPanel embedded />
      </div>

      {/* Title - shown after intro types it */}
      {sceneVisible && (
        <h1
          className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-4xl font-bold tracking-tight text-foreground z-10 animate-fade-in"
          style={{
            top: "8%",
            fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
          }}
        >
          4Q-AA: Sierpinski's Triangle
        </h1>
      )}

      {/* Now playing badge */}
      {introComplete && (
        <div className="absolute bottom-6 left-6 glass rounded-full px-4 py-2 flex items-center gap-2 z-10 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground font-medium">
            Now Playing — Fractal Dreams
          </span>
        </div>
      )}

      {/* Intro overlay */}
      {!introComplete && (
        <IntroSequence
          sceneRef={sceneRef}
          lyricsRef={lyricsRef}
          onShowScene={() => setSceneVisible(true)}
          onShowLyrics={() => setLyricsVisible(true)}
          onComplete={() => setIntroComplete(true)}
        />
      )}
    </div>
  );
};

export default Index;
