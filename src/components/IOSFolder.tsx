import { useState } from "react";
import { Folder } from "lucide-react";
import DraggableWindow from "./DraggableWindow";

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

const IOSFolder = ({ label, content, position }: IOSFolderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Folder icon */}
      <div
        className={`absolute ${positionClasses[position]} z-20 flex flex-col items-center gap-1 cursor-pointer group`}
        onClick={() => setIsOpen(true)}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{
            background: "hsla(211, 100%, 50%, 0.15)",
            backdropFilter: "blur(20px)",
            border: "1px solid hsla(211, 100%, 50%, 0.25)",
          }}
        >
          <Folder className="w-7 h-7" style={{ color: "hsl(var(--primary))" }} />
        </div>
        <span className="text-[10px] font-semibold text-center leading-tight max-w-16"
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
          <DraggableWindow className="relative z-31 w-80 animate-scale-in">
            <div className="window-chrome">
              <div className="window-titlebar">
                <div className="window-dot window-dot-red" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} style={{ cursor: "pointer" }} />
                <div className="window-dot window-dot-yellow" />
                <div className="window-dot window-dot-green" />
                <span className="ml-2 text-[11px] text-muted-foreground font-medium">{label}</span>
              </div>
              <div className="p-5 max-h-80 overflow-y-auto" style={{ background: "hsl(var(--card))" }}>
                {content}
              </div>
            </div>
          </DraggableWindow>
        </div>
      )}
    </>
  );
};

export default IOSFolder;
