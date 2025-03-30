"use client";

import React, { useState } from "react";
import HitEffect from "./HitEffect"; // Import the new component

type Stats = {
  science: number;
  code: number;
  math: number;
  english: number;
};

type FightAdditionProps = {
  question: string;
  answer: number;
  onNext: ({ earnedExp, earnedCoins, earnedStats }: {
    earnedExp: number;
    earnedCoins: number;
    earnedStats: Partial<Stats>;
  }) => void;
  monsterImgSrc: string;
  hearts: number;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
};

export default function FightAddition({
  question,
  answer,
  onNext,
  monsterImgSrc,
  hearts,
  setHearts,
}: FightAdditionProps) {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHitEffect, setShowHitEffect] = useState(false); // Trigger for hit effect

  const handleButtonClick = (value: string) => {
    if (!isCorrect && !gameOver) {
      setInput((prev) => prev + value);
    }
  };

  const handleClear = () => {
    if (!isCorrect && !gameOver) {
      setInput("");
    }
  };

  const handleSubmit = () => {
    if (parseInt(input) === answer) {
      setIsCorrect(true);
      setTimeout(onNext, 1000);
    } else {
      const remaining = hearts - 1;
      setHearts(remaining);
      setInput("");

      // Trigger hit effect
      setShowHitEffect(true);

      if (remaining <= 0) {
        setGameOver(true);
      }
    }
  };

  const renderHearts = () => (
    <div className="flex absolute right-15 space-x-3 mb-2 mt-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <i
          key={i}
          className={`nes-icon is-medium ${
            i < hearts ? "heart" : "heart is-empty"
          }`}
        ></i>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-no-repeat bg-center bg-cover p-6"
      style={{
        backgroundImage: "url('/assets/background/fight/Autumn2.png')",
        backgroundSize: "250% 175%",
      }}
    >
      {/* Hit Effect Overlay */}
      <HitEffect trigger={showHitEffect} onEnd={() => setShowHitEffect(false)} />

      {/* 🟡 Top Status */}
      <div className="mt-4 mb-2 text-center h-8">
        {isCorrect && (
          <p className="text-[#fff275] font-bold text-xl animate-bounce">
            Monster Defeated!
          </p>
        )}
        {gameOver && (
          <p className="text-red-400 font-bold text-xl">💀 Game Over 💀</p>
        )}
      </div>
      {renderHearts()}
      {/* ❓ Question + ❤️ Hearts */}
      <div className="bg-[#e5d9c4] nes-container is-rounded px-4 py-0 shadow-md max-w-md text-center">
        <span className="text-black font-bold text-2xl leading-none inline-block mt-2 mb-2">
          {question}
        </span>
      </div>

      {/* 👾 Monster */}
      <img
        src={monsterImgSrc}
        alt="monster"
        className="w-64 h-64 object-contain mb-2"
      />

      {/* 📦 Battle Box UI */}
      <div className="bg-[#e5d9c4] border-4 border-[#000000] rounded-xl p-4 shadow-xl w-full max-w-md">
        {/* 🧠 Input */}
        <input
          type="text"
          readOnly
          className="text-center w-full bg-white p-3 rounded text-[#000000] mb-6 font-mono text-lg"
          value={input}
          placeholder="Your answer"
        />

        {/* 🔢 Numpad */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleButtonClick(num.toString())}
              className="nes-btn is-dark"
              disabled={gameOver || isCorrect}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => handleButtonClick("0")}
            className="nes-btn is-dark"
            disabled={gameOver || isCorrect}
          >
            0
          </button>

          <button
            onClick={handleClear}
            className="nes-btn is-error"
            disabled={gameOver || isCorrect}
          >
            CLR
          </button>

          <button
            onClick={handleSubmit}
            className="nes-btn is-success"
            disabled={gameOver || isCorrect}
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
}
