export const mockData = {
  problem: "Write a factorial function in JavaScript",
  solution_1: `function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

// Example usage:
console.log(factorial(5)); // 120`,
  solution_2: `/**
 * Calculates the factorial of a non-negative integer using an iterative approach.
 * Handles edge cases for negative numbers and uses BigInt for larger results.
 * @param {number} n
 */
function factorial(n) {
  if (n < 0) return null;
  if (n === 0 || n === 1) return 1;
  
  let result = BigInt(1);
  for (let i = 2; i <= n; i++) {
    result *= BigInt(i);
  }
  return Number(result) || result; 
}

// Usage example:
console.log(factorial(20)); // 2432902008176640000`,
  judgeMent: {
    solution_1_score: 8.5,
    solution_2_score: 9.2,
    solution_1_reasoning:
      "Simple and clean recursive logic, but it does not handle invalid input and can run into stack depth issues for larger values.",
    solution_2_reasoning:
      "More robust overall because it validates the input and uses an iterative approach that is safer for larger factorial calculations.",
    winner: "mistral",
  }
};
