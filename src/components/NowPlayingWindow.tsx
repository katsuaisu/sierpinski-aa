import riskItAll from "../assets/riskitall.png";

const NowPlayingWindow = () => {
  return (
    <div className="w-72">
      <div className="window-chrome">
        <div className="window-titlebar">
          <div className="window-dot window-dot-red" />
          <div className="window-dot window-dot-yellow" />
          <div className="window-dot window-dot-green" />
          <span className="ml-2 text-[11px] text-muted-foreground font-medium">
            Apple Music
          </span>
        </div>
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{ background: "hsl(var(--card))" }}
        >
          <div
            className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(350 80% 55%), hsl(20 90% 55%))",
            }}
          >
            <img
              src={riskItAll}
              alt="Risk It All"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold truncate"
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                color: "hsl(var(--foreground))",
              }}
            >
              Risk It All
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Bruno Mars
            </p>
          </div>

          <div className="flex items-end gap-[2px] h-4">
            {[0, 0.15, 0.3, 0.45].map((delay, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full"
                style={{
                  background: "hsl(var(--primary))",
                  animation: "soundbar 0.6s ease-in-out infinite alternate",
                  animationDelay: `${delay}s`,
                  height: "3px",
                }}
              />
            ))}
          </div>
        </div>

        <div className="px-4 pb-3" style={{ background: "hsl(var(--card))" }}>
          <div className="w-full h-[3px] rounded-full" style={{ background: "hsl(var(--muted))" }}>
            <div className="h-full rounded-full progress-bar" style={{ background: "hsl(var(--primary))" }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">1:12</span>
            <span className="text-[10px] text-muted-foreground">3:24</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingWindow;
