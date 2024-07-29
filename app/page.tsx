"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/mechanic-removebg-preview.png";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  const words = ["Fast", "Reliable", "Easy"];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = 150; // Speed of typing (ms per character)
  const erasingSpeed = 100; // Speed of erasing (ms per character)
  const pauseDuration = 1000; // Pause duration between texts (ms)

  useEffect(() => {
    let timer: number;
    if (isDeleting) {
      if (charIndex > 0) {
        timer = window.setTimeout(() => {
          setText((prev) => prev.substring(0, prev.length - 1));
          setCharIndex((prev) => prev - 1);
        }, erasingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setCharIndex(0);
      }
    } else {
      if (charIndex < words[currentWordIndex].length) {
        timer = window.setTimeout(() => {
          setText((prev) => prev + words[currentWordIndex].charAt(charIndex));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timer = window.setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, charIndex, currentWordIndex, words]);


  return (
    <>
      <div className="hero-section grid grid-cols-3 h-[700px] w-[1800px] justify-between px-10 items-center mx-auto bg-[#212121]">
        <div className="catch-line col-span-2 text-white space-y-4">
          <h1 className="text-7xl text-[#cfcfcf]">Door-to-Door Vehicle Care</h1>
          <div className="relative">
            <span className="absolute text-4xl text-[#cfcfcf] whitespace-nowrap  pr-2 overflow-hidden inline-block text-6xl bg" style={{ width: '12ch' }}>
              {text}
            </span>
          </div>
          <button className="absolute left-[850px] mt-4 px-4 py-2 bg-[#3C2607] text-[#cfcfcf] rounded transition-transform transform hover:scale-105">
            Check out now
          </button>
        </div>
        <div className="col-span-1 text-right">
          <Image src={logo} alt="Mechanic" />
        </div>
      </div>
      <div className="why-choose-us w-full h-[700px] bg-[#3D3832] p-10 flex flex-col justify-center items-center ">
        <h1 className="text-[#cfcfcf] font-medium text-5xl">
          Why To Choose Us ?
        </h1>
        <div className="reason mt-20 flex gap-40">
          <div className="reason1 w-[413px] h-[443px] bg-[#2E1A05]"></div>
          <div className="reason2 w-[413px] h-[443px] bg-[#2E1A05]"></div>
        </div>
      </div>
      <div className="h-[60rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            Join the waitlist
          </h1>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Welcome to Automive! We are excited to announce that we are
            launching our services in Pune. By collaborating with local
            garages, we aim to provide convenient and reliable vehicle care
            solutions right at your doorstep. Our mission is to make vehicle
            maintenance hassle-free and accessible for everyone, ensuring your
            car receives top-notch care with ease and efficiency.
          </p>
          <input
            type="text"
            placeholder="hi@automive.com"
            className="rounded-lg border text-white p-5 border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-neutral-700"
          />
        </div>
        <BackgroundBeams />
      </div>
    </>
  );
}
