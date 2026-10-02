// const nextJest = require("next/jest")();

// const createJestConfig = nextJest;

// const customJestConfig = {
//   testEnvironment: "node",
// };

// module.exports = createJestConfig(customJestConfig);



const nextJest = require("next/jest");

// 1. Beri tahu Next.js lokasi root project kamu
const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "node",
  // 2. Ajarkan Jest bahwa simbol '@/' merujuk ke folder utama
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(customJestConfig);