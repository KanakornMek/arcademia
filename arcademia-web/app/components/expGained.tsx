"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";

type Stats = {
  science: number;
  code: number;
  math: number;
  english: number;
};

export default function ExpGained({
  Exp,
  Coins,
  statGain,
  isWon
}: {
  Exp: number;
  Coins: number;
  statGain: Partial<Stats>;
  isWon: boolean;
}) {
  const { exp, setExp, stats, setStats, coins, setCoins } = useUser();
  const [added, setAdded] = useState(false);
  const [previousExp, setPreviousExp] = useState(exp);
  const [previousCoins, setPreviousCoins] = useState(coins);
  const [previousStats, setPreviousStats] = useState(stats);

  const router = useRouter();

  useEffect(() => {
    if (!added) {
      setPreviousExp(exp);
      setPreviousCoins(coins);
      setPreviousStats({ ...stats }); // ✅ Take a snapshot before updating

      setExp(exp + Exp);
      setCoins(coins + Coins);
      setStats((prev) => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(statGain).map(([key, val]) => [
            key,
            (prev[key as keyof Stats] || 0) + (val || 0),
          ])
        ),
      }));

      setAdded(true);
    }
  }, [
    added,
    exp,
    coins,
    stats,
    setExp,
    setCoins,
    setStats,
    Exp,
    Coins,
    statGain,
  ]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-2xl font-bold gap-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/background/wood.png')" }} // ✅ adjust path as needed
    >
      <span className={isWon?'!text-5xl text-green-500':'!text-5xl text-red-500'}>{isWon?'You Won!':'You Lost'}</span>
      <div className="nes-container is-rounded bg-white bg-opacity-80 p-8 rounded-xl text-center shadow-md w-9/10">
        <p>
          You gained <br/><span className="text-green-500">{Exp} EXP</span> {' '}
          <span className="text-yellow-400">{Coins} <i className="nes-icon coin"/></span>!
        </p>
        <p className="text-xl">Your new total EXP: {previousExp + Exp}</p>
        <p className="text-xl">Your new total Coins: {previousCoins + Coins}</p>

        {Object.entries(statGain).map(([key, val]) =>
          val ? (
            <p className="" key={key}>
              <span className="capitalize">{key}</span> +{val}
            </p>
          ) : null
        )}

        {/* 🚀 NES Button to continue */}
        <button
          className="nes-btn is-primary mt-6"
          onClick={() => router.push("/quest")}
        >
          Continue to Quest
        </button>
      </div>
    </div>
  );
}
