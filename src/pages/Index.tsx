import { useState } from "react";
import IntroSequence from "@/components/IntroSequence";
import SceneWindow from "@/components/SceneWindow";
import LyricsPanel from "@/components/LyricsPanel";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="relative w-screen h-screen dot-grid-bg overflow-hidden">
      {!introComplete && (
        <IntroSequence onComplete={() => setIntroComplete(true)} />
      )}

      {introComplete && (
        <div className="relative w-full h-full animate-fade-in">
          {/* Lyrics panel - left side */}
          <LyricsPanel />

          {/* 3D Sierpinski - fills viewport */}
          <SceneWindow />

          {/* Now playing badge */}
          <div className="absolute bottom-6 left-6 glass rounded-full px-4 py-2 flex items-center gap-2 z-10">
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
