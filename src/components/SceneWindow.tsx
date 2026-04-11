import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import SierpinskiTetrahedron from "./SierpinskiTetrahedron";
import IOSModal from "./IOSModal";

const GALLERY_ITEMS = [
  { title: "Vertex Alpha", caption: "The origin point where recursion begins. Each iteration creates four smaller copies of itself." },
  { title: "Fractal Edge", caption: "The boundary between void and form. Self-similarity at every scale." },
  { title: "Recursive Depth", caption: "Level 3 recursion: 64 tetrahedra, each a perfect echo of the whole." },
  { title: "Geometric Harmony", caption: "Mathematics as art — the Sierpinski gasket in three dimensions." },
  { title: "Infinite Descent", caption: "Zoom in forever and find the same pattern. A fixed point of transformation." },
];

const SceneWindow = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", caption: "" });

  const handleClickFace = (id: number, _position: THREE.Vector3) => {
    const item = GALLERY_ITEMS[id % GALLERY_ITEMS.length];
    setModalContent(item);
    setModalOpen(true);
  };

  return (
    <>
      <div className="window-chrome bg-card animate-scale-in" style={{ width: "min(700px, 85vw)", height: "min(500px, 60vh)" }}>
        {/* Title bar */}
        <div className="window-titlebar">
          <div className="window-dot window-dot-red" />
          <div className="window-dot window-dot-yellow" />
          <div className="window-dot window-dot-green" />
          <span className="ml-3 text-xs text-muted-foreground font-medium">
            4Q-AA — Sierpinski Viewer
          </span>
        </div>

        {/* 3D Canvas */}
        <div className="w-full" style={{ height: "calc(100% - 36px)" }}>
          <Canvas
            camera={{ position: [5, 3, 5], fov: 45 }}
            style={{ background: "hsl(0 0% 97%)" }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-5, 5, -5]} intensity={0.4} />
            <SierpinskiTetrahedron onClickFace={handleClickFace} level={3} />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={4}
              maxDistance={15}
              autoRotate={false}
            />
            <Environment preset="studio" />
          </Canvas>
        </div>
      </div>

      <IOSModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        caption={modalContent.caption}
      />
    </>
  );
};

export default SceneWindow;
