import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface IOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  caption: string;
  image?: string;
}

const IOSModal = ({ isOpen, onClose, title, caption, image }: IOSModalProps) => {
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayCaption, setDisplayCaption] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setDisplayTitle("");
      setDisplayCaption("");
      return;
    }

    let i = 0;
    const titleInterval = setInterval(() => {
      setDisplayTitle(title.slice(0, i + 1));
      i++;
      if (i >= title.length) {
        clearInterval(titleInterval);
        let j = 0;
        const captionInterval = setInterval(() => {
          setDisplayCaption(caption.slice(0, j + 1));
          j++;
          if (j >= caption.length) clearInterval(captionInterval);
        }, 25);
      }
    }, 40);

    return () => clearInterval(titleInterval);
  }, [isOpen, title, caption]);

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-6 right-6 z-40 w-72 animate-scale-in">
      <div className="window-chrome">
        <div className="window-titlebar">
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

        {/* Image */}
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover"
            loading="lazy"
            width={288}
            height={160}
          />
        )}

        {/* Content */}
        <div className="p-4" style={{ background: "hsl(var(--card))" }}>
          <h3
            className="text-sm font-semibold tracking-tight mb-1"
            style={{
              fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
              color: "hsl(var(--foreground))",
            }}
          >
            {displayTitle}
            {displayTitle.length < title.length && <span className="cursor-blink" />}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {displayCaption}
            {displayCaption.length > 0 && displayCaption.length < caption.length && (
              <span className="cursor-blink" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IOSModal;
