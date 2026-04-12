import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import SierpinskiTetrahedron from "./SierpinskiTetrahedron";
import IOSModal from "./IOSModal";

import pic1 from "@/assets/gallery/pic1.png";
import pic2 from "@/assets/gallery/pic2.png";
import pic3 from "@/assets/gallery/pic3.png";
import pic4 from "@/assets/gallery/pic4.png";
import pic5 from "@/assets/gallery/pic5.png";
import pic6 from "@/assets/gallery/pic6.png";
import pic7 from "@/assets/gallery/pic7.png";
import pic8 from "@/assets/gallery/pic8.png";
import pic9 from "@/assets/gallery/pic9.png";
import pic10 from "@/assets/gallery/pic10.png";
import pic11 from "@/assets/gallery/pic11.png";
import pic12 from "@/assets/gallery/pic12.png";
import pic13 from "@/assets/gallery/pic13.png";
import pic14 from "@/assets/gallery/pic14.png";
import pic15 from "@/assets/gallery/pic15.png";
import pic16 from "@/assets/gallery/pic16.png";
import pic17 from "@/assets/gallery/pic17.png";

const GALLERY_ITEMS = [
  {
    title: "So, who do I really risk this all for?",
    caption: "All the work I've done I dedicate all to myself. This risk is for you, Rei.",
    image: pic1,
  },
  {
    title: "Grade 7 Orientation — 'Pisay Is Your Canon Event'",
    caption: "One of the first orientations in my first year in Pisay with Sav and Apryl. Every year after this, we've made it a tradition to sit together during the first few days to recreate this picture.\n\nI risk it all for the sake of knowing that I will make relationships as eternal as ours.",
    image: pic2,
  },
  {
    title: "7-Topaz Girls",
    caption: "I've never been so lucky to be surrounded by girls as wonderful as them.\n\nI risk it all because you all have reminded me that in the midst of my loneliness, I will find your light.",
    image: pic3,
  },
  {
    title: "Grade 7 — Me & Sav",
    caption: "I was (and probably still am) a weird kid. I remember multiple times where I've practiced my contortion on Sav and even going as far as to ride on her back like a horse.\n\nI risk it all because you've shown me that you'd love any side of me, egregious or not.",
    image: pic4,
  },
  {
    title: "The Origin of My GMail PFP",
    caption: "Mathea had bought us a flag to accurately represent our section, verbatim. I did a whole bit where I pretended to be 'superman', with the flag as my cape and the electric fan as the wind blowing behind my back.\n\nI risk it all to keep mundane moments.",
    image: pic5,
  },
  {
    title: "The Flood In My Car",
    caption: "It was the same day as card-giving where I had to endure the millionth PTC my mother had attended. There was no electricity in my house so we opted to go out and enjoy the aircon in the car until I noticed that it was flooding. It was a laughing moment for both of us and my mom let me stay home the next day. If we hadn't gone to PTC, we both wouldn't have been tired and I would have gone to school the day after.\n\nI risk it all because I never want to experience this joyous moment again.",
    image: pic6,
  },
  {
    title: "Paskorus",
    caption: "Me and Jacob were squishing Mav's cheeks for good luck in our performance minutes after this occurred. Prior to this, we had taken our Math MQE and I felt so alone with my anxieties as I had been so sure I had failed, again.\n\nI risk it all for moments where I don't feel as alone as I think I am.",
    image: pic7,
  },
  {
    title: "Locking Sav In a Room",
    caption: "This was during the heat index, where 7-Topaz had been relocated to cloud B. Me, Raenn, and Apryl were locking Sav in the room behind ours for fun. I look back on this picture a lot because it was what kept me going during the last few days of SY 2023-2024.\n\nI risk it all because I didn't think I'd be here to have something to risk in the first place.",
    image: pic8,
  },
  {
    title: "Friendship",
    caption: "It was the last day of Grade 7 before periodicals came and we were waiting for our next class. Me, Sav, and Apryl took a picture to commemorate the moment. It makes me feel emotional to see how much we've grown from before.\n\nI risk it all because I know you'd want me to keep going.",
    image: pic9,
  },
  {
    title: "Silly!",
    caption: "This picture was taken at 4am, after I had cried for 3 hours. During this time, I was shutting a lot of people out because I never wanted them to see how sad I was, what I'd do when I was sad.\n\nI risk it all because I know how it feels to give up on everything—and I know now to look forward to better days.",
    image: pic10,
  },
  {
    title: "Q3 Grade 7",
    caption: "This was during one of many study periods which we'd spend doing anything but studying. Moments after, they locked me in a very big lalagyanan and drove me around the room. It was really fun.\n\nI risk it all because even during my worst moments, you always found a way to cheer me up.",
    image: pic11,
  },
  {
    title: "Pre-Soiree",
    caption: "Moments before this, I had received an EMail that I would be taking the Math 1 removals. Even though I was devastated, I let myself have one more night to relief—without ever knowing if it would be the last time I'd see some of my friends.\n\nI risk it all so that I would have certainty that I would find my way back to the reasons why I risk it all in the first place.",
    image: pic12,
  },
  {
    title: "Science Alive",
    caption: "I was stuffed in a tight costume and was forced to perform a 10 second cringe dance. I hated every moment I was in that costume.\n\nI risk it all, even during moments I'd rather not live through again.",
    image: pic13,
  },
  {
    title: "Rollercoaster",
    caption: "This picture probably means the most to me more than anything. It was my final Math portfolio in Grade 7. This holds more sentimental value to me because I had been able to power through everything despite my brother and mother having chickenpox, my dad and my brother living in a different house than me and my mom, and I was facing the risks of removals.\n\nI risk it all because I've proved that I can.",
    image: pic14,
  },
  {
    title: "My Champaca",
    caption: "I'm not here in this picture. In fact, I think I was the only one who wasn't there. A lot of people in this picture were going through so many things and I was trying my best to help them at the time. I'm glad that I was able to get them through their problems as they did with me.\n\nI risk it all because I know that's what I would've wanted them to do.",
    image: pic15,
  },
  {
    title: "Grade 7 Guitar Practice",
    caption: "This is me and Raya practicing guitar for our Paskorus performance. I never told her this, but I'm really grateful for all her help. Whether it be small actions, such as helping me carry my 5kg guitar up and down the halls, or feeding me her food because she found out that I haven't eaten in 2 days—it felt nice having someone look after you.\n\nI risk it all because I carry the kindness you have given me.",
    image: pic16,
  },
  {
    title: "My Mom's Car at Night",
    caption: "This was after my first org meeting for Solace. Even though my mom heavily disapproved of my multiple sidequests, she still made an effort to pick me up even if it was very…very late.\n\nI risk it all because I never wanted to disappoint you.",
    image: pic17,
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
