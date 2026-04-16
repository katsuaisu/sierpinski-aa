import { useState } from "react";

const EmailNotification = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="absolute right-4 z-30 animate-slide-in-right"
      style={{ top: "60%" }}
    >
      <div
        className="w-80 rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: "hsla(0, 0%, 100%, 0.7)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid hsla(0, 0%, 100%, 0.5)",
          boxShadow: "0 8px 40px hsla(0, 0%, 0%, 0.12), 0 2px 8px hsla(0, 0%, 0%, 0.06)",
        }}
        onClick={() => setDismissed(true)}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-3 pb-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #007AFF, #5856D6)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span
                className="text-[13px] font-semibold"
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                  color: "hsl(0 0% 10%)",
                }}
              >
                Mail
              </span>
              <span className="text-[11px]" style={{ color: "hsl(0 0% 50%)" }}>
                now
              </span>
            </div>
            <p
              className="text-[12px] font-semibold truncate"
              style={{
                fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                color: "hsl(0 0% 10%)",
              }}
            >
              For You — from someone special
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pb-3 pt-1">
          <p
            className="text-[12px] leading-relaxed"
            style={{
              fontFamily: "'SF Pro Text', -apple-system, sans-serif",
              color: "hsl(0 0% 30%)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            Hey! I hope you enjoyed exploring through everything. Each triangle holds a piece of a story — some happy, some bittersweet. But they're all real, and they all matter. Thank you for being here. 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailNotification;
