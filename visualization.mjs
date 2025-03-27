// JavaScript to handle the visualization logic
const sequence1Display = document.getElementById("highlighted-sequence1");
const sequence2Display = document.getElementById("highlighted-sequence2");
const nextStepButton = document.getElementById("next-step");
const resultMessage = document.getElementById("result-message");
const sequence1Input = document.getElementById("sequence1");
const sequence2Input = document.getElementById("sequence2");

let sequence1Index = 0;
let sequence2Index = 0;
let isSequenceFound = false;

/**
 * Fetches the sequences from the input fields.
 * @returns {Object} An object containing sequence1 and sequence2.
 */
function getSequences() {
  return {
    sequence1: sequence1Input.value.trim(),
    sequence2: sequence2Input.value.trim(),
  };
}

/**
 * Resets the visualization and all variables to their initial state.
 */
/**
 * Resets the visualization and all variables to their initial state.
 */
function resetVisualization() {
  console.log("resetVisualization in displayModule");
  sequence1Index = 0;
  sequence2Index = 0;
  isSequenceFound = false;

  // Reset the display to show all characters in black
  const { sequence1, sequence2 } = getSequences();
  sequence1Display.innerHTML = sequence1
    .split("")
    .map((char) => `<span>${char}</span>`) // No additional classes, just black text
    .join("");
  sequence2Display.innerHTML = sequence2
    .split("")
    .map((char) => `<span>${char}</span>`) // No additional classes, just black text
    .join("");

  // Clear the result message
  resultMessage.textContent = "";
}

/**
 * Creates a styled span element for a character.
 * @param {string} char - The character to display.
 * @param {Array<string>} classes - The CSS classes to apply.
 * @returns {string} The HTML string for the styled span element.
 */
function createStyledSpan(char, classes = []) {
  console.log("createStyledSpan in displayModule");
  const span = document.createElement("span");
  span.textContent = char;
  classes.forEach((className) => span.classList.add(className));
  return span.outerHTML;
}

/**
 * Updates the visualization for both sequences.
 */
function updateVisualization() {
  console.log("*********updateVisualization in displayModule");
  const { sequence1, sequence2 } = getSequences();

  // Highlight the characters in sequence1
  sequence1Display.innerHTML = sequence1
    .split("")
    .map((char, i) => {
      if (
        isSequenceFound &&
        i >= sequence1Index - sequence2Index &&
        i < sequence1Index
      ) {
        return createStyledSpan(char, ["highlight-orange"]); // Matching sequence
      } else if (!isSequenceFound && i < sequence1Index - sequence2Index) {
        return createStyledSpan(char, ["highlight-red"]); // Characters before mismatch
      } else if (
        !isSequenceFound &&
        i < sequence1Index &&
        sequence1[i] === sequence2[i - (sequence1Index - sequence2Index)]
      ) {
        return createStyledSpan(char, ["highlight-green"]); // Correct characters
      } else if (!isSequenceFound && i === sequence1Index) {
        if (sequence1[i] === sequence2[sequence2Index]) {
          return createStyledSpan(char, ["highlight-green", "underline"]); // Current correct character
        } else {
          return createStyledSpan(char, ["highlight-red", "underline"]); // Current incorrect character
        }
      }
      return char; // Default black for other characters
    })
    .join("");

  // Highlight the current character in sequence2
  sequence2Display.innerHTML = sequence2
    .split("")
    .map((char, i) => {
      if (i === sequence2Index) {
        return createStyledSpan(char, ["highlight-blue", "underline"]); // Current character in sequence2
      }
      return char;
    })
    .join("");
}
