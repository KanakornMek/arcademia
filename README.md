# 🎮 Arcademia

Arcademia is an interactive educational platform that transforms traditional learning into an arcade-style experience. Built with **Next.js**, it features math battle games where students can level up by solving problems, fighting monsters, and progressing through lessons in a gamified format.

---

## 🚀 Features

- **Boss Battles & Fights**: Answer math questions to defeat monsters and bosses.
- **Health & XP System**: Track your health, gain experience, and earn coins.
- **Lesson Progression**: Move through structured lessons and quizzes.
- **NES-style UI**: Retro-inspired visuals using [NES.css](https://nostalgic-css.github.io/NES.css/).

---

## 🧩 Game Aspects

### 🔢 Fight Addition

- Engage in fast-paced math battles against smaller monsters.
- Players lose hearts for incorrect answers.
- Each correct answer progresses the game and grants rewards.
- At the end of the fight sequence, an experience/reward screen appears (`ExpGained`).

### 👹 Boss Addition

- Face off against a large boss with a full health bar.
- Each correct answer deals 25% damage to the boss.
- Incorrect answers reduce your hearts.
- The boss is defeated after 4 correct answers — or the player loses when out of hearts or out of questions.

### 🧠 Learning & Progression

- Players earn:
  - `EXP` (experience points)
  - `Coins`
  - Stat boosts like `{ math: +5 }`
- These are displayed clearly at the end of battles using the `ExpGained` component.

- The game uses visual feedback for:
  - Correct answers (boss hit, animations)
  - Wrong answers (heart loss, red flash)
  - Game Over state

---
