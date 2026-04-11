import { useState } from "react";
import IntroSequence from "@/components/IntroSequence";
import SceneWindow from "@/components/SceneWindow";
import LyricsPanel from "@/components/LyricsPanel";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="relative min-h-screen dot-grid-bg overflow-hidden">
      {/* Intro animation */}
      {!introComplete && (
        <IntroSequence onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main content - fades in after intro */}
      {introComplete && (
        <div className="min-h-screen flex items-center justify-center animate-fade-in">
          {/* Lyrics panel */}
          <LyricsPanel />

          {/* Title + 3D window */}
          <div className="flex flex-col items-center gap-6 z-10">
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-center"
              style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}
            >
              4Q-AA: Sierpinski's Triangle
            </h1>
            <p className="text-muted-foreground text-sm mb-2">
              Click any face to explore • Drag to rotate
            </p>
            <SceneWindow />
          </div>

          {/* Now playing badge */}
          <div className="absolute bottom-6 right-6 glass rounded-full px-4 py-2 flex items-center gap-2 z-10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">
              Now Playing — Fractal Dreams
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
