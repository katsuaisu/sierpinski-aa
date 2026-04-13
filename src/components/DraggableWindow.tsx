import { useRef, useState, useCallback, ReactNode } from "react";

interface DraggableWindowProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DraggableWindow = ({ children, className = "", style }: DraggableWindowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Only drag from titlebar area (first 36px)
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const localY = e.clientY - rect.top;
    if (localY > 36) return;

    setDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { ...offset };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [offset]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    setOffset({
      x: startOffset.current.x + (e.clientX - startPos.current.x),
      y: startOffset.current.y + (e.clientY - startPos.current.y),
    });
  }, [dragging]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        cursor: dragging ? "grabbing" : undefined,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div style={{ cursor: "grab" }}>
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
