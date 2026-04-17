import DraggableWindow from "./DraggableWindow";

interface Track {
  title: string;
  artist: string;
  duration: string;
  cover: string; // path under /src/assets
}

const TRACKS: Track[] = [
  { title: "Risk It All", artist: "Bruno Mars", duration: "3:34", cover: "riskitall.png" },
  { title: "Landslide", artist: "Fleetwood Mac", duration: "3:19", cover: "landslide.png" },
  { title: "For Good", artist: "Cynthia Erivo & Ariana Grande", duration: "5:38", cover: "forgood.png" },
  { title: "Mystery Of Love (Demo)", artist: "Sufjan Stevens", duration: "4:08", cover: "mol.png" },
  { title: "Duvet (Acoustic)", artist: "boa", duration: "3:42", cover: "duvet.png" },
  { title: "Birds", artist: "Thomas Sanders", duration: "3:12", cover: "birds.png" },
];

interface MusicPlaylistWindowProps {
  onClose: () => void;
}

const MusicPlaylistWindow = ({ onClose }: MusicPlaylistWindowProps) => {
  return (
    <div className="absolute right-28 top-24 z-40 animate-scale-in">
      <DraggableWindow
        className="relative"
        defaultWidth={520}
        defaultHeight={520}
        minWidth={400}
        minHeight={360}
      >
        <div
          className="h-full flex flex-col rounded-xl overflow-hidden"
          style={{
            background: "hsla(0, 0%, 100%, 0.55)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid hsla(0, 0%, 100%, 0.5)",
            boxShadow:
              "0 20px 60px hsla(0, 0%, 0%, 0.18), inset 0 1px 0 hsla(0, 0%, 100%, 0.6)",
          }}
        >
          {/* Title bar */}
          <div className="window-titlebar flex-shrink-0">
            <div
              className="window-dot window-dot-red cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            />
            <div className="window-dot window-dot-yellow" />
            <div className="window-dot window-dot-green" />
            <span
              className="ml-2 text-[11px] font-medium"
              style={{ color: "hsla(0, 0%, 0%, 0.5)" }}
            >
              Music — Playlist
            </span>
          </div>

          {/* Header */}
          <div className="px-5 pt-4 pb-3 flex gap-4 items-start">
            <div
              className="w-24 h-24 rounded-lg flex-shrink-0 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, hsl(340 80% 60%), hsl(280 70% 55%))",
                boxShadow: "0 8px 20px hsla(0, 0%, 0%, 0.15)",
              }}
            >
              <img
                src="/src/assets/coverpicture.png"
                alt="Playlist cover"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2
                className="text-[20px] font-bold leading-tight"
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                  color: "hsla(0, 0%, 0%, 0.9)",
                }}
              >
                for the in-betweens 🕊️
              </h2>
              <p
                className="text-[12px] mt-1"
                style={{
                  color: "hsl(var(--primary))",
                  fontWeight: 600,
                }}
              >
                me ♥
              </p>
              <p className="text-[10px] mt-1" style={{ color: "hsla(0,0%,0%,0.5)" }}>
                Updated just now
              </p>
              <p
                className="text-[11px] mt-2 leading-snug"
                style={{ color: "hsla(0,0%,0%,0.7)" }}
              >
                songs that hold the moments words can't 🎶
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  className="px-4 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5"
                  style={{
                    background: "hsla(0, 0%, 95%, 0.8)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play
                </button>
                <button
                  className="px-4 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5"
                  style={{
                    background: "hsla(0, 0%, 95%, 0.8)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 11.41l-2.04 2.04 2.46 2.46L13.84 21H20v-6.17l-1.96 1.96-3.21-3.38z" />
                  </svg>
                  Shuffle
                </button>
              </div>
            </div>
          </div>

          {/* Track list */}
          <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-3">
            {TRACKS.map((track, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[hsla(0,0%,100%,0.4)] transition-colors"
              >
                <span className="text-[12px] w-3" style={{ color: "hsl(var(--primary))" }}>
                  ★
                </span>
                <div
                  className="w-10 h-10 rounded flex-shrink-0 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, hsla(0,0%,80%,0.6), hsla(0,0%,60%,0.6))",
                  }}
                >
                  <img
                    src={`/src/assets/${track.cover}`}
                    alt={track.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] font-medium truncate"
                    style={{
                      fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                      color: "hsla(0, 0%, 0%, 0.9)",
                    }}
                  >
                    {track.title}
                  </p>
                </div>
                <p
                  className="text-[12px] truncate flex-shrink-0"
                  style={{ color: "hsla(0, 0%, 0%, 0.5)", maxWidth: "140px" }}
                >
                  {track.artist}
                </p>
                <p
                  className="text-[12px] flex-shrink-0 w-10 text-right"
                  style={{ color: "hsla(0, 0%, 0%, 0.4)" }}
                >
                  {track.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DraggableWindow>
    </div>
  );
};

export default MusicPlaylistWindow;
