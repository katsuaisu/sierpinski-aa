import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import SierpinskiTetrahedron from "./SierpinskiTetrahedron";
import IOSModal from "./IOSModal";

import img1 from "@/assets/gallery/img1.jpg";
import img2 from "@/assets/gallery/img2.jpg";
import img3 from "@/assets/gallery/img3.jpg";
import img4 from "@/assets/gallery/img4.jpg";
import img5 from "@/assets/gallery/img5.jpg";

const GALLERY_ITEMS = [
  { title: "Vertex Alpha", caption: "The origin point where recursion begins.", image: img1 },
  { title: "Fractal Edge", caption: "The boundary between void and form.", image: img2 },
  { title: "Recursive Depth", caption: "Level 4: 256 tetrahedra in harmony.", image: img3 },
  { title: "Geometric Harmony", caption: "Mathematics rendered as art.", image: img4 },
  { title: "Infinite Descent", caption: "Zoom in and find the same pattern.", image: img5 },
];

const SceneWindow = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", caption: "", image: "" });

  const handleClickFace = (id: number, _position: THREE.Vector3) => {
    const item = GALLERY_ITEMS[id % GALLERY_ITEMS.length];
    setModalContent(item);
    setModalOpen(true);
  };

  return (
    <>
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [6, 3, 6], fov: 45 }}
          style={{ background: "transparent" }}
          onPointerMissed={() => setModalOpen(false)}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-5, 5, -5]} intensity={0.4} />
          <SierpinskiTetrahedron onClickFace={handleClickFace} level={4} />
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
        image={modalContent.image}
      />
    </>
  );
};

export default SceneWindow;
