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
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setDisplayTitle("");
      setDisplayCaption("");
      setShowContent(false);
      return;
    }

    setShowContent(true);

    // Typewriter for title
    let i = 0;
    const titleInterval = setInterval(() => {
      setDisplayTitle(title.slice(0, i + 1));
      i++;
      if (i >= title.length) {
        clearInterval(titleInterval);
        // Typewriter for caption
        let j = 0;
        const captionInterval = setInterval(() => {
          setDisplayCaption(caption.slice(0, j + 1));
          j++;
          if (j >= caption.length) {
            clearInterval(captionInterval);
          }
        }, 30);
      }
    }, 50);

    return () => clearInterval(titleInterval);
  }, [isOpen, title, caption]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        style={{ opacity: showContent ? 1 : 0 }}
      />

      {/* Modal */}
      <div
        className={`ios-modal relative z-50 w-full max-w-md p-6 transition-all duration-300 ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="mt-2">
          <h3
            className="text-xl font-semibold tracking-tight text-foreground mb-3"
            style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}
          >
            {displayTitle}
            {displayTitle.length < title.length && (
              <span className="cursor-blink" />
            )}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {displayCaption}
            {displayCaption.length > 0 && displayCaption.length < caption.length && (
              <span className="cursor-blink" />
            )}
          </p>
        </div>

        {/* iOS-style button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default IOSModal;
