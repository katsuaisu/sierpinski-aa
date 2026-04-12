import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import SierpinskiTetrahedron from "./SierpinskiTetrahedron";
import IOSModal from "./IOSModal";

import pic1 from "@/assets/gallery/pic1.png";

const GALLERY_ITEMS = [
  {
    title: "So, who do I really risk this all for?",
    caption: "All the work I've done I dedicate all to myself. This risk is for you, Rei.",
    image: pic1,
  },
  {
    title: "Pic 2: Second Tier",
    caption: "A balanced surface where recursion begins to repeat, now visible through the overlay.",
    image: "/gallery/pic2.png",
  },
  {
    title: "Pic 3: Third Layer",
    caption: "Each face reveals a smaller copy of the original form, with its own unique artwork.",
    image: "/gallery/pic3.png",
  },
  {
    title: "Pic 4: Lower Geometry",
    caption: "The depth grows with each subdivision, forming new boundaries and textures.",
    image: "/gallery/pic4.png",
  },
  {
    title: "Pic 5: Base Horizon",
    caption: "The final row of triangles anchors the fractal’s descent, complete with its own picture.",
    image: "/gallery/pic5.png",
  },
];

const SceneWindow = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", caption: "", image: "" });

  const handleClickFace = (id: number, _position: THREE.Vector3) => {
    const item = GALLERY_ITEMS[(id - 1) % GALLERY_ITEMS.length];
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
