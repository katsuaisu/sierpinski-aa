import { useState } from "react";
import DraggableWindow from "./DraggableWindow";

const EmailNotification = () => {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (dismissed) return null;

  if (expanded) {
    return (
      <div className="absolute left-4 top-16 z-40 animate-scale-in">
        <DraggableWindow className="relative" defaultWidth={480} defaultHeight={520} minWidth={360} minHeight={300}>
          <div className="window-chrome h-full flex flex-col">
            {/* Title bar */}
            <div className="window-titlebar flex-shrink-0">
              <div className="window-dot window-dot-red" onClick={(e) => { e.stopPropagation(); setDismissed(true); }} />
              <div className="window-dot window-dot-yellow" onClick={(e) => { e.stopPropagation(); setExpanded(false); }} />
              <div className="window-dot window-dot-green" />
              <span className="ml-2 text-[11px] font-medium" style={{ color: "hsla(0, 0%, 0%, 0.5)" }}>
                Mail — For You
              </span>
            </div>

            {/* Mail toolbar */}
            <div className="flex items-center gap-1 px-3 py-1.5 border-b" style={{
              borderColor: "hsla(0, 0%, 0%, 0.08)",
              background: "hsla(0, 0%, 97%, 0.6)",
            }}>
              <span className="text-[10px] px-2 py-0.5 rounded" style={{ color: "hsla(0, 0%, 0%, 0.4)" }}>
                📥 Inbox
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded" style={{
                background: "hsl(211 100% 50% / 0.1)",
                color: "hsl(211 100% 50%)",
              }}>
                ⭐ For You
              </span>
            </div>

            {/* Email header */}
            <div className="px-4 py-3 border-b" style={{
              borderColor: "hsla(0, 0%, 0%, 0.06)",
              background: "hsla(0, 0%, 100%, 0.5)",
            }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] font-semibold" style={{
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                  color: "hsl(0 0% 10%)",
                }}>
                  For You — from someone special
                </span>
                <span className="text-[10px]" style={{ color: "hsl(0 0% 50%)" }}>
                  just now
                </span>
              </div>
              <p className="text-[11px]" style={{ color: "hsl(0 0% 50%)" }}>
                To: You &lt;you@heart.com&gt;
              </p>
            </div>

            {/* Email body */}
            <div className="flex-1 overflow-y-auto px-5 py-4" style={{ background: "hsl(var(--card))" }}>
              <div className="text-[12px] leading-[1.8] space-y-4" style={{
                fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                color: "hsl(0 0% 20%)",
              }}>
                <p>Hey you,</p>

                <p>
                  I hope you took your time going through everything. I know it's a lot — maybe even a little overwhelming — but every single piece of this was made with you in mind. Every triangle, every lyric, every little detail… it's all for you.
                </p>

                <p>
                  I don't really know how to say everything I want to say, so I figured I'd try to build it instead. Words never felt like enough. They still don't. But maybe this comes close.
                </p>

                <p>
                  Each face of that triangle holds something real — a memory, a feeling, a moment that mattered. Some of them are happy, the kind that make me smile just thinking about them. Some of them are bittersweet, the kind that remind me how much I care. And some of them are just… honest. The messy, complicated, beautiful kind of honest.
                </p>

                <p>
                  I wanted you to see all of it. Not just the easy parts, but the full picture. Because that's what you deserve — the whole truth, even when it's hard to put into words.
                </p>

                <p>
                  You've changed me in ways I'm still figuring out. The way I think, the way I feel, the way I see the world — it's all a little different now, and it's because of you. I don't say that lightly. I mean it with everything I have.
                </p>

                <p>
                  So thank you. For being here. For being you. For making me want to be better, do better, and build something worth giving.
                </p>

                <p>
                  I'd risk it all for you. You already know that.
                </p>

                <p style={{ marginTop: "24px" }}>
                  With everything,<br />
                  — Me 💙
                </p>
              </div>
            </div>
          </div>
        </DraggableWindow>
      </div>
    );
  }

  return (
    <div
      className="absolute left-4 z-30 animate-slide-in-right cursor-pointer"
      style={{ top: "16px" }}
      onClick={() => setExpanded(true)}
    >
      <div
        className="w-80 rounded-2xl overflow-hidden"
        style={{
          background: "hsla(0, 0%, 100%, 0.7)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid hsla(0, 0%, 100%, 0.5)",
          boxShadow: "0 8px 40px hsla(0, 0%, 0%, 0.12), 0 2px 8px hsla(0, 0%, 0%, 0.06)",
        }}
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
              <span className="text-[13px] font-semibold" style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                color: "hsl(0 0% 10%)",
              }}>
                Mail
              </span>
              <span className="text-[11px]" style={{ color: "hsl(0 0% 50%)" }}>now</span>
            </div>
            <p className="text-[12px] font-semibold truncate" style={{
              fontFamily: "'SF Pro Text', -apple-system, sans-serif",
              color: "hsl(0 0% 10%)",
            }}>
              For You — from someone special
            </p>
          </div>
        </div>

        {/* Body preview */}
        <div className="px-4 pb-3 pt-1">
          <p className="text-[12px] leading-relaxed" style={{
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            color: "hsl(0 0% 30%)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}>
            Hey you, I hope you took your time going through everything. Every triangle, every lyric, every little detail… it's all for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailNotification;
