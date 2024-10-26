"use client"; 
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Recommendation } from "../type/RecommendationType";

const AutoSlider = ({ recommendations }: { recommendations: Recommendation[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === recommendations.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [recommendations.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${
        currentIndex * 180
      }px)`;
    }
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={sliderRef}
        className="flex transition-transform duration-700 ease-in-out"
      >
        {recommendations.map((rec:Recommendation) => (
          <div
            key={rec.id}
            className="min-w-[180px] mx-2 rounded-xl bg-white shadow-md"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
              alt={rec.title}
              width={180}
              height={270}
              className="rounded-t-xl"
            />
            <div className="p-3">
              <p className="font-semibold text-center text-sm">{rec.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;
