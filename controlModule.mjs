import { DisplayModule } from "./displayModule.mjs";

export const ControlModule = {
  sequence1Input: document.getElementById("sequence1"),
  sequence2Input: document.getElementById("sequence2"),
  nextStepButton: document.getElementById("next-step"),

  sequence1Index: 0,
  sequence2Index: 0,
  isSequenceFound: false,

  /**
   * Fetches the sequences from the input fields.
   * @returns {Object} An object containing sequence1 and sequence2.
   */
  getSequences() {
    console.log("getSequences in controlModule");
    return {
      sequence1: this.sequence1Input.value.trim(),
      sequence2: this.sequence2Input.value.trim(),
    };
  },

  /**
   * Resets the visualization and all variables to their initial state.
   */
  resetVisualization() {
    console.log("resetVisualization in controlModule");
    this.sequence1Index = -1;
    this.sequence2Index = -1;
    this.isSequenceFound = false;
    DisplayModule.clearDisplays();
    this.updateVisualization(); // Reinitialize the visualization
  },

  /**
   * Updates the visualization for both sequences.
   */
  updateVisualization() {
    console.log("updateVisualization in controlModule");
    const { sequence1, sequence2 } = this.getSequences();
    DisplayModule.updateSequence1Display(
      sequence1,
      this.sequence1Index,
      this.sequence2Index,
      this.isSequenceFound,
      sequence2
    );
    DisplayModule.updateSequence2Display(sequence2, this.sequence2Index);
  },

  /**
   * Handles the next step in the sequence matching process.
   */
  handleNextStep() {
    console.log("handleNextStep in controlModule");
    if (this.isSequenceFound) {
      console.log("Sequence found");
      return; // Stop the process if the sequence is already found
    }

    const { sequence1, sequence2 } = this.getSequences();

    if (this.sequence1Index < sequence1.length) {
      if (sequence1[this.sequence1Index] === sequence2[this.sequence2Index]) {
        // Characters match, move to the next character in both sequences
        this.sequence1Index++;
        this.sequence2Index++;

        if (this.sequence2Index === sequence2.length) {
          this.isSequenceFound = true; // Mark the sequence as found
          DisplayModule.updateResultMessage(
            `Sequence found at index ${
              this.sequence1Index - this.sequence2Index
            }!`
          );
          this.updateVisualization();
          return;
        }
      } else {
        if (this.sequence2Index != 0) {
          // reset sequence2 and go back to the beginning of sequence1
          this.sequence2Index = 0; // Reset sequence2 to the beginning
        } else {
          this.sequence1Index++;
        }
      }
      this.updateVisualization();
    } else {
      DisplayModule.updateResultMessage("Search complete! Sequence not found.");
    }
  },

  /**
   * Initializes the control module.
   */
  initialize() {
    console.log("initialize in controlModule");
    this.sequence1Input.addEventListener("input", () =>
      this.resetVisualization()
    );
    this.sequence2Input.addEventListener("input", () =>
      this.resetVisualization()
    );
    this.nextStepButton.addEventListener("click", () => this.handleNextStep());
    this.updateVisualization();
  },
};
