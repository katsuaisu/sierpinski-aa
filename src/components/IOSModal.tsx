import { X } from "lucide-react";
import DraggableWindow from "./DraggableWindow";

interface IOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  caption: string;
  image?: string;
}

const IOSModal = ({ isOpen, onClose, title, caption, image }: IOSModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-6 right-6 z-40 animate-scale-in">
      <DraggableWindow className="relative" defaultWidth={320} minWidth={250} minHeight={200}>
        <div className="window-chrome h-full flex flex-col">
          <div className="window-titlebar flex-shrink-0">
            <div className="window-dot window-dot-red" />
            <div className="window-dot window-dot-yellow" />
            <div className="window-dot window-dot-green" />
            <span className="ml-2 text-[11px] text-muted-foreground font-medium">
              Description
            </span>
            <button
              onClick={onClose}
              className="ml-auto w-5 h-5 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>

          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-contain max-h-96 flex-shrink-0"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}

          <div className="p-4 flex-1 overflow-y-auto" style={{ background: "hsl(var(--card))" }}>
            <h3
              className="text-sm font-semibold tracking-tight mb-2"
              style={{
                fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
                color: "hsl(var(--foreground))",
              }}
            >
              {title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {caption}
            </p>
          </div>
        </div>
      </DraggableWindow>
    </div>
  );
};

export default IOSModal;
