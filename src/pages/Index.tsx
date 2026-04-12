import { useRef, useState } from "react";
import IntroSequence from "@/components/IntroSequence";
import SceneWindow from "@/components/SceneWindow";
import LyricsPanel from "@/components/LyricsPanel";
import NowPlayingWindow from "@/components/NowPlayingWindow";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(false);
  const [lyricsVisible, setLyricsVisible] = useState(false);
  const [nowPlayingVisible, setNowPlayingVisible] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const nowPlayingRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-screen h-screen dot-grid-bg overflow-hidden">
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

      {/* 3D Sierpinski - always mounted */}
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

      {/* Lyrics panel - always mounted */}
      <div
        ref={lyricsRef}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10"
        style={{
          transform: lyricsVisible
            ? "translateY(-50%)"
            : "translateX(calc(100vw + 320px)) translateY(-50%)",
          opacity: lyricsVisible ? 1 : 0,
        }}
      >
        <LyricsPanel embedded />
      </div>

      {/* Now Playing window - always mounted */}
      <div
        ref={nowPlayingRef}
        className="absolute bottom-6 left-6 z-10"
        style={{
          transform: nowPlayingVisible ? undefined : "translateX(calc(100vw + 400px))",
          opacity: nowPlayingVisible ? 1 : 0,
        }}
      >
        <NowPlayingWindow />
      </div>

      {/* Intro overlay */}
      {!introComplete && (
        <IntroSequence
          sceneRef={sceneRef}
          lyricsRef={lyricsRef}
          nowPlayingRef={nowPlayingRef}
          onShowScene={() => setSceneVisible(true)}
          onShowLyrics={() => setLyricsVisible(true)}
          onShowNowPlaying={() => setNowPlayingVisible(true)}
          onComplete={() => setIntroComplete(true)}
        />
      )}
    </div>
  );
};

export default Index;
