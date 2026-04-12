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
          {/* Album art - will be riskitall.png */}
          <div
            className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(350 80% 55%), hsl(20 90% 55%))",
            }}
          >
            <img
              src="/riskitall.png"
              alt="Risk It All"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Track info */}
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

          {/* Playback indicator */}
          <div className="flex items-end gap-[2px] h-4">
            <div className="soundbar-bar" style={{ animationDelay: "0s" }} />
            <div className="soundbar-bar" style={{ animationDelay: "0.15s" }} />
            <div className="soundbar-bar" style={{ animationDelay: "0.3s" }} />
            <div className="soundbar-bar" style={{ animationDelay: "0.45s" }} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-3" style={{ background: "hsl(var(--card))" }}>
          <div className="w-full h-[3px] rounded-full" style={{ background: "hsl(var(--muted))" }}>
            <div className="h-full rounded-full bg-primary progress-bar" />
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
