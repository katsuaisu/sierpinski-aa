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
import pic18 from "@/assets/gallery/pic18.png";
import pic19 from "@/assets/gallery/pic19.png";
import pic20 from "@/assets/gallery/pic20.png";
import pic21 from "@/assets/gallery/pic21.png";
import pic22 from "@/assets/gallery/pic22.png";
import pic23 from "@/assets/gallery/pic23.png";
import pic24 from "@/assets/gallery/pic24.png";
import pic25 from "@/assets/gallery/pic25.png";
import pic26 from "@/assets/gallery/pic26.png";
import pic27 from "@/assets/gallery/pic27.png";
import pic28 from "@/assets/gallery/pic28.png";
import pic29 from "@/assets/gallery/pic29.png";
import pic30 from "@/assets/gallery/pic30.png";

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
  {
    title: "Math 1 Notice of Removals",
    caption: "My teeth were digging into the skin of my arm while taking the FE of Math 1 and I was silently praying that I wouldn’t have to go through the pain, the risks, and the burden of removals. Oh well, at least I passed, no?\n\nI risk it all for the version of me whose life fell apart when she received this email.",
    image: pic18,
  },
  {
    title: "Claw Machine",
    caption: "This was my ADTech 2 final project—a claw machine, dedicated to my late grandmother who always loved to play whenever we’d go to malls.\n\nI risk it all for you, mama. I miss you everyday.",
    image: pic19,
  },
  {
    title: "Creativity",
    caption: "One thing Sir Franel always noticed about me was that I was creative. Amidst all my failures, he always saw the best in me. I even got perfect in all my Math 1 portfolios! :)\n\nI risk it all because I want to see the best in people, the same way it was seen in me.",
    image: pic20,
  },
  {
    title: "CH27_SAQUING_Reign Mckayla_3QAA",
    caption: "A certain teacher once told me this portfolio was too dark. The same teacher still greets me every monday and thursdays and reminds me how much I’ve improved from when she first met me.\n\nI risk it all because you never stopped believing in me, even when I had lost hope in myself.",
    image: pic21,
  },
  {
    title: "Scared",
    caption: "I’ve always been scared. I don’t think this picture shows it well enough, but I can’t remember a moment in grade 8 where I wasn’t scared. I wish, at that time, someone would tell me that even if it won’t all end up okay, I’d end up anew. I’d end up a person who wasn’t afraid of hiding.\n\nI risk it all because I deserve to find my own sunshine.",
    image: pic22,
  },
  {
    title: "Recipe for Me",
    caption: "If I could keep Topaz as a class forever, I could. But then, why would I want to hinder the growth of such talented, loving people? Here’s to the class who made me believe in anything. I love you, topaz. Thank you.\n\nI’d risk it all, and I’d do it all again.",
    image: pic23,
  },
  {
    title: "Biology Group",
    caption: "I’ve known Uno and Ruth for about 3 years, but I’ve only gotten the opportunity to get close to them this school year. If I’m being completely honest, I don’t think I would survive this school year–or even life–without them. \n\nI risk it all because when I look at you, I see the reason why I do.",
    image: pic24,
  },
  {
    title: "YMSAT Awarding",
    caption: "This picture shows me and Uno’s award for the YMSAT Website competition where we won second place. The whole week, I was really anxious because I wanted to be first so badly, and that I was willing to go through any means to do so. He reminded me that win or lose, our hard work would still bear fruit.\n\nI’m always paired with Uno for groupworks. If we ever have a pair activity, we tilt our heads towards each other and laugh in unison. If we ever have a group activity, you’ll find me gravitating towards his chair and scouring for other groupmates. If there’s anyone who understands me, I know it’s him.\n\nIf you’re seeing this: I hate you.\nIf you’re not: Thank you, brother. I love you.\n\nI risk it all because I have a brother to keep going for.",
    image: pic25,
  },
  {
    title: "SAYAWIT Awarding",
    caption: "I got close to Ruth during the second quarter because we were elected co-directors for our class project, Sayawit. I’ve always found her a bit intimidating, but nonetheless, I looked up to her. It was there where I noticed that we share multiple similarities. We have the same struggles, we go to the same exact art conventions, we have the same creative taste, we have the same sentiments, and even the people we like are best friends—which goes to show that even our types are similar.\n\nI’m grateful for Sayawit because it showed me how much I can do—but I’m so much more than thankful that it brought me to you. To many more rants, whether it be about our crushes, acads, or life in general.\n\nI love you, Ruth.\n\nI risk it all because I have a sister to keep going for.",
    image: pic26,
  },
  {
    title: "Haraya",
    caption: "This was after my shift during the fair where I had free time to roam around with my friends. Moments after this, we rode the vikings and I wanted to cry because I was so terrified, even though I’ve been on the ride 2 times prior. After the fair, we didn’t speak much anymore.\n\nYou showed me how to be strong—how to keep going even when I feel so lonely. Even though we don’t talk much anymore, I’m glad that we were there for each other when we needed it. I never told you this, but I'm grateful for all the love you've shown me. It kept me going when I needed it.\n\nI risk it all because you were there for me when I was ready to give up.",
    image: pic27,
  }, {
    title: "GlamWorks Dark Mahogany",
    caption: "Nothing can erase the sharp, clinical scent of ammonia that filled my lungs. Every squeeze of the bright red sludge onto my scalp was a ritual—a slow, gruesome execution against the version of me that existed to the eyes of others only when molded. The power came from a heat that burnt deep inside my soul—an incandescent fire that burnt my throat and flew through my ears whispering that I was finally, violently taking up space. I was fueled by a productive, almost desperate efficiency to shed years of old skin. I didn't wait for my strands of hair to dry. I grabbed a flashlight as its beams cut through the dimness like a blade. I held it close—so close I could feel the residual heat of light against my head. In the center of that artificial glow, the dullness of my past had been incinerated.\n\nTo be born into yourself, you must first perform the sacred, violent ceremony of killing who you were told to be.\n\nYou will never incinerate who I am, no matter how many times I am reprimanded.\n\nI risk it all because I don't want to keep hiding.",
    image: pic28,
  },
  {
    title: "SayAwit",
    caption: "This was my very first class project taking on a leadership role actually. I was really scared because I felt like I would mess up or lead the class into having a bad output. There were so many days where I wished that I shouldn't've stepped up because so much weight was on my shoulders and I didn't think I could bear it. I'm so, so grateful to have such a cooperative, sweet section because they supported and showed so much interest in this project.\n\nThere were so many days where I wanted to run. There were so many days when I wanted to ghost everyone, stop attending practice, and stop leading—but you were there. You all were there, and when you were on stage, I was so grateful that I stayed through everything.\n\nKatulad ng mundong daloy ay paikot-ikot, ang husay at talino'y dapat ipalibot-libot.\n\nThank you, Strontium.\n\nI risk it all because if I ran, I wouldn't have had anyone to risk it all for.",
    image: pic29,
  },
  {
    title: "Paskuhan",
    caption: "title",
    image: pic30,
  },];

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
