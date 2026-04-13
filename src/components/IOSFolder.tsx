import { useState } from "react";

interface IOSFolderProps {
  label: string;
  content: React.ReactNode;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const positionClasses: Record<string, string> = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
};

const MacFolderIcon = () => (
  <svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Back flap */}
    <path
      d="M4 8C4 5.79086 5.79086 4 8 4H20L24 10H48C50.2091 10 52 11.7909 52 14V14H4V8Z"
      fill="url(#folderTab)"
    />
    {/* Main body */}
    <rect x="2" y="12" width="52" height="34" rx="4" fill="url(#folderBody)" />
    {/* Shine line */}
    <rect x="6" y="14" width="44" height="2" rx="1" fill="rgba(255,255,255,0.45)" />
    <defs>
      <linearGradient id="folderTab" x1="28" y1="4" x2="28" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5AC8FA" />
        <stop offset="1" stopColor="#34AADC" />
      </linearGradient>
      <linearGradient id="folderBody" x1="28" y1="12" x2="28" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5AC8FA" />
        <stop offset="0.5" stopColor="#34AADC" />
        <stop offset="1" stopColor="#007AFF" />
      </linearGradient>
    </defs>
  </svg>
);

const IOSFolder = ({ label, content, position }: IOSFolderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Folder icon */}
      <div
        className={`absolute ${positionClasses[position]} z-20 flex flex-col items-center gap-1 cursor-pointer group`}
        onClick={() => setIsOpen(true)}
      >
        <div className="transition-transform group-hover:scale-110 drop-shadow-lg">
          <MacFolderIcon />
        </div>
        <span
          className="text-[11px] font-semibold text-center leading-tight max-w-20"
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            color: "hsl(var(--foreground))",
            textShadow: "0 1px 3px hsla(0, 0%, 100%, 0.5)",
          }}
        >
          {label}
        </span>
      </div>

      {/* Opened folder window */}
      {isOpen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative z-40 w-80 animate-scale-in">
            <div className="window-chrome">
              <div className="window-titlebar">
                <div
                  className="window-dot window-dot-red"
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                  style={{ cursor: "pointer" }}
                />
                <div className="window-dot window-dot-yellow" />
                <div className="window-dot window-dot-green" />
                <span className="ml-2 text-[11px] text-muted-foreground font-medium">{label}</span>
              </div>
              <div className="p-5 max-h-80 overflow-y-auto" style={{ background: "hsl(var(--card))" }}>
                {content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IOSFolder;
