import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface IOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  caption: string;
}

const IOSModal = ({ isOpen, onClose, title, caption }: IOSModalProps) => {
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
    <div
      className="absolute bottom-6 right-6 z-40 ios-modal w-72 p-4 animate-scale-in"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
      >
        <X className="w-3 h-3 text-muted-foreground" />
      </button>

      <h3
        className="text-sm font-semibold tracking-tight text-foreground mb-1 pr-6"
        style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}
      >
        {displayTitle}
        {displayTitle.length < title.length && <span className="cursor-blink" />}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {displayCaption}
        {displayCaption.length > 0 && displayCaption.length < caption.length && <span className="cursor-blink" />}
      </p>
    </div>
  );
};

export default IOSModal;
