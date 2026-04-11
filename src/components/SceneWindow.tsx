import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import SierpinskiTetrahedron from "./SierpinskiTetrahedron";
import IOSModal from "./IOSModal";

const GALLERY_ITEMS = [
  { title: "Vertex Alpha", caption: "The origin point where recursion begins." },
  { title: "Fractal Edge", caption: "The boundary between void and form." },
  { title: "Recursive Depth", caption: "Level 3: 64 tetrahedra in harmony." },
  { title: "Geometric Harmony", caption: "Mathematics rendered as art." },
  { title: "Infinite Descent", caption: "Zoom in and find the same pattern." },
];

const SceneWindow = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", caption: "" });
  const [modalPos, setModalPos] = useState({ x: 0, y: 0 });

  const handleClickFace = (id: number, _position: THREE.Vector3) => {
    const item = GALLERY_ITEMS[id % GALLERY_ITEMS.length];
    setModalContent(item);
    setModalOpen(true);
  };

  return (
    <>
      {/* Full area 3D canvas - no window chrome */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [6, 3, 6], fov: 45 }}
          style={{ background: "transparent" }}
          onPointerMissed={() => setModalOpen(false)}
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
          />
          <Environment preset="studio" />
        </Canvas>
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
