
// This file contains helper functions for AI text generation

/**
 * Generate an AI response based on the selected text
 * @param text The selected text to generate a response for
 * @returns A promise that resolves to the generated response
 */
export async function generateResponse(text: string): Promise<string> {
  // In a real implementation, this would make an API call to an AI service
  console.log("Generating response for:", text);
  
  // Simulate a delay to mimic API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!text.trim()) {
        resolve("Please select some text to generate a response.");
        return;
      }
      
      // Simple mock responses based on content
      if (text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi")) {
        resolve("Hello! How can I assist you today?");
      } else if (text.toLowerCase().includes("help")) {
        resolve("I'm here to help! Please let me know what you need assistance with.");
      } else if (text.length < 5) {
        resolve("Please provide more context for me to generate a helpful response.");
      } else {
        resolve(`Here's a response to your selected text: "${text}". I've analyzed the content and can provide further information or suggestions if needed.`);
      }
    }, 800); // Simulate API delay
  });
}

/**
 * Gets the selected text in the document
 * @returns The selected text or an empty string
 */
export function getSelectedText(): string {
  const selection = window.getSelection();
  return selection ? selection.toString() : '';
}

/**
 * Calculates the position for the floating button based on text selection
 * @returns Position coordinates or null if no valid selection
 */
export function getSelectionPosition(): { x: number; y: number } | null {
  const selection = window.getSelection();
  
  if (!selection || selection.rangeCount === 0 || selection.toString().trim() === '') {
    return null;
  }
  
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  
  // Position the button at the end of the selection with some spacing
  // Add horizontal and vertical offset to prevent overlapping with text
  return {
    x: rect.right + 10, // Add 10px horizontal spacing
    y: rect.bottom + 10 // Add 10px vertical spacing
  };
}

/**
 * Generate AI action options based on the selected text
 * @param text The selected text
 * @returns An array of action options
 */
export function generateActionOptions(text: string): string[] {
  // In a real implementation, this might analyze the text and return relevant actions
  const defaultOptions = [
    "Generate answer",
    "Explain this",
    "Summarize",
    "Translate"
  ];
  
  // Simple logic to add context-specific options
  if (text.length > 100) {
    defaultOptions.push("Shorten");
  }
  
  if (text.match(/\d+/)) {
    defaultOptions.push("Calculate");
  }
  
  return defaultOptions;
}
