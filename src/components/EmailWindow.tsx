import DraggableWindow from "./DraggableWindow";

interface EmailWindowProps {
  onClose: () => void;
}

const EmailWindow = ({ onClose }: EmailWindowProps) => {
  return (
    <div className="absolute right-28 top-24 z-40 animate-scale-in">
      <DraggableWindow
        className="relative"
        defaultWidth={480}
        defaultHeight={520}
        minWidth={360}
        minHeight={300}
      >
        <div className="window-chrome h-full flex flex-col">
          {/* Title bar */}
          <div className="window-titlebar flex-shrink-0">
            <div
              className="window-dot window-dot-red cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            />
            <div className="window-dot window-dot-yellow" />
            <div className="window-dot window-dot-green" />
            <span className="ml-2 text-[11px] font-medium" style={{ color: "hsla(0, 0%, 0%, 0.5)" }}>
              Mail — For You
            </span>
          </div>

          {/* Mail toolbar */}
          <div
            className="flex items-center gap-1 px-3 py-1.5 border-b"
            style={{
              borderColor: "hsla(0, 0%, 0%, 0.08)",
              background: "hsla(0, 0%, 97%, 0.6)",
            }}
          >
            <span className="text-[10px] px-2 py-0.5 rounded" style={{ color: "hsla(0, 0%, 0%, 0.4)" }}>
              📥 Inbox
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded"
              style={{
                background: "hsl(211 100% 50% / 0.1)",
                color: "hsl(211 100% 50%)",
              }}
            >
              ⭐ For You
            </span>
          </div>

          {/* Email header */}
          <div
            className="px-4 py-3 border-b"
            style={{
              borderColor: "hsla(0, 0%, 0%, 0.06)",
              background: "hsla(0, 0%, 100%, 0.5)",
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className="text-[13px] font-semibold"
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                  color: "hsl(0 0% 10%)",
                }}
              >
                To My Evocations
              </span>
              <span className="text-[10px]" style={{ color: "hsl(0 0% 50%)" }}>
                just now
              </span>
            </div>
            <p className="text-[11px]" style={{ color: "hsl(0 0% 50%)" }}>
              To: You &lt;rmvsaquing@gmail.com&gt;
            </p>
          </div>

          {/* Email body */}
          <div className="flex-1 overflow-y-auto px-5 py-4" style={{ background: "hsl(var(--card))" }}>
            <div
              className="text-[12px] leading-[1.8] space-y-4"
              style={{
                fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                color: "hsl(0 0% 20%)",
              }}
            >
              <p>
                Not a lot of people know this, but I am, in fact, extremely scared. I'm scared that one day, I will wake up, go to school, do everything I need to do, then go to sleep and let the egregious cycle repeat itself with no reason to.
              </p>
              <p>
                Everyday, I'm afraid to lose my reasons why I wake up in the morning and face all the problems I need to face.
              </p>
              <p>Everyday, I'm afraid to lose you.</p>
              <p>
                Time does not wait for us to be ready, it waits for us to make the decision to do everything scared.
              </p>
              <p>
                It very well may be that one day— I will never remember you, or let you cross my mind in this lifetime. Even so, I think it is an understatement to say that so much of me is made of what I learned from you, and I will carry you with me like a handprint on my heart.
              </p>
              <p>
                Maybe in a few years, I'll look back at you and think back on what I could've done right in those moments to avoid them, or how to make it last longer. But, tonight, as I'm cramming this letter to you—I am free. I am free of regret, rue, and remorse.
              </p>
              <p>
                Tonight, I look back at you and see pieces of me strung together in one triangle. Pieces of me that's irrevocably altered me as a person in ways that I do not understand yet. Words have never come close as to how much I want to cherish you, and they still don't. But maybe this comes close.
              </p>
              <p>Time is running out. I have countless more errands to run.</p>
              <p>
                Thank you, for being the reason why I go through my "egregious cycle" in the first place.
              </p>
              <p>Thank you for being the reason why I risk it all.</p>
              <p style={{ marginTop: "24px" }}>
                Sincerely,
                <br />
                me
              </p>
            </div>
          </div>
        </div>
      </DraggableWindow>
    </div>
  );
};

export default EmailWindow;
