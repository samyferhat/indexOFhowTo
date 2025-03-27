export const DisplayModule = {
  sequence1Display: document.getElementById("highlighted-sequence1"),
  sequence2Display: document.getElementById("highlighted-sequence2"),
  resultMessage: document.getElementById("result-message"),

  /**
   * Creates a styled span element for a character.
   * @param {string} char - The character to display.
   * @param {Array<string>} classes - The CSS classes to apply.
   * @returns {string} The HTML string for the styled span element.
   */
  createStyledSpan(char, classes = []) {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add(...classes); // Spread the classes array directly
    return span.outerHTML;
  },

  /**
   * Determines the appropriate CSS classes for a character in sequence1.
   * @param {number} i - The current index in sequence1.
   * @param {string} char - The character in sequence1.
   * @param {number} sequence1Index - The current index in sequence1.
   * @param {number} sequence2Index - The current index in sequence2.
   * @param {boolean} isSequenceFound - Whether the sequence has been found.
   * @param {string} sequence2 - The second sequence.
   * @returns {Array<string>} The CSS classes to apply.
   */
  getSequence1Classes(
    i,
    char,
    sequence1Index,
    sequence2Index,
    isSequenceFound,
    sequence2
  ) {
    if (
      isSequenceFound &&
      i >= sequence1Index - sequence2Index &&
      i < sequence1Index
    ) {
      return ["highlight-orange"]; // Matching sequence
    }
    if (!isSequenceFound && i < sequence1Index - sequence2Index) {
      return ["highlight-red"]; // Characters before mismatch
    }
    if (
      !isSequenceFound &&
      i < sequence1Index &&
      char === sequence2[i - (sequence1Index - sequence2Index)]
    ) {
      return ["highlight-green"]; // Correct characters
    }
    if (!isSequenceFound && i === sequence1Index) {
      console.log("sequence1Index: ", sequence1Index);
      return char === sequence2[sequence2Index]
        ? ["highlight-green", "underline"] // Current correct character
        : ["highlight-red", "underline"]; // Current incorrect character
    }
    return []; // Default black for other characters
  },

  /**
   * Updates the visualization for sequence1.
   * @param {string} sequence1 - The first sequence.
   * @param {number} sequence1Index - The current index in sequence1.
   * @param {number} sequence2Index - The current index in sequence2.
   * @param {boolean} isSequenceFound - Whether the sequence has been found.
   * @param {string} sequence2 - The second sequence.
   */
  updateSequence1Display(
    sequence1,
    sequence1Index,
    sequence2Index,
    isSequenceFound,
    sequence2
  ) {
    console.log("updateSequence1Display in displayModule");
    this.sequence1Display.innerHTML = sequence1
      .split("")
      .map((char, i) => {
        const classes = this.getSequence1Classes(
          i,
          char,
          sequence1Index,
          sequence2Index,
          isSequenceFound,
          sequence2
        );
        return this.createStyledSpan(char, classes);
      })
      .join("");
  },

  /**
   * Updates the visualization for sequence2.
   * @param {string} sequence2 - The second sequence.
   * @param {number} sequence2Index - The current index in sequence2.
   */
  updateSequence2Display(sequence2, sequence2Index) {
    this.sequence2Display.innerHTML = sequence2
      .split("")
      .map((char, i) => {
        const classes =
          i === sequence2Index ? ["highlight-blue", "underline"] : [];
        return this.createStyledSpan(char, classes);
      })
      .join("");
  },

  /**
   * Updates the result message.
   * @param {string} message - The message to display.
   */
  updateResultMessage(message) {
    this.resultMessage.textContent = message;
  },

  /**
   * Clears the displays and resets the result message.
   */
  clearDisplays() {
    this.sequence1Display.innerHTML = "";
    this.sequence2Display.innerHTML = "";
    this.resultMessage.textContent = "";
  },
};
