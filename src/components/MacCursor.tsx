import { forwardRef } from "react";

const MacCursor = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="mac-cursor" style={{ left: -100, top: -100 }}>
      <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1L1 20.5L5.5 16L10 23L13 21.5L8.5 14.5L14.5 14.5L1 1Z"
          fill="white"
          stroke="black"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});

MacCursor.displayName = "MacCursor";
export default MacCursor;
