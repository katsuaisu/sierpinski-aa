import { useRef, useState, useCallback, ReactNode } from "react";

interface DraggableWindowProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
}

const DraggableWindow = ({
  children,
  className = "",
  style,
  defaultWidth,
  defaultHeight,
  minWidth = 200,
  minHeight = 150,
  resizable = true,
}: DraggableWindowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState<{ w: number | undefined; h: number | undefined }>({
    w: defaultWidth,
    h: defaultHeight,
  });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });
  const startSize = useRef({ w: 0, h: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
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
    if (dragging) {
      setOffset({
        x: startOffset.current.x + (e.clientX - startPos.current.x),
        y: startOffset.current.y + (e.clientY - startPos.current.y),
      });
    }
  }, [dragging]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  // Resize handlers
  const onResizePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    setResizing(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    const rect = ref.current?.getBoundingClientRect();
    startSize.current = { w: rect?.width || 300, h: rect?.height || 300 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onResizePointerMove = useCallback((e: React.PointerEvent) => {
    if (!resizing) return;
    const newW = Math.max(minWidth, startSize.current.w + (e.clientX - startPos.current.x));
    const newH = Math.max(minHeight, startSize.current.h + (e.clientY - startPos.current.y));
    setSize({ w: newW, h: newH });
  }, [resizing, minWidth, minHeight]);

  const onResizePointerUp = useCallback(() => {
    setResizing(false);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        cursor: dragging ? "grabbing" : undefined,
        width: size.w ? `${size.w}px` : undefined,
        height: size.h ? `${size.h}px` : undefined,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div style={{ cursor: "grab", width: "100%", height: "100%" }}>
        {children}
      </div>
      {/* Resize handle */}
      {resizable && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          style={{
            background: "linear-gradient(135deg, transparent 50%, hsla(0,0%,60%,0.4) 50%)",
            borderRadius: "0 0 12px 0",
          }}
        />
      )}
    </div>
  );
};

export default DraggableWindow;
