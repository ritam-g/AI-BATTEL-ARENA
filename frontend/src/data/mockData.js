export const mockData = {
  problem: "Write a factorial function in JavaScript",
  models: [
    {
      id: "mistral",
      name: "Mistral Large",
      solution: `function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

// Example usage:
console.log(factorial(5)); // 120`,
      score: 8.5,
      reasoning: "Simple and clean implementation of the recursion pattern. However, it lacks iterative optimization and edge-case handling for negative numbers or very large inputs."
    },
    {
      id: "cohere",
      name: "Cohere Command R+",
      solution: `/**
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
      score: 9.2,
      reasoning: "Excellent iterative implementation with built-in BigInt support for large results and proper validation of negative inputs. Better performance for deep recursions."
    }
  ],
  winner: "cohere"
};
