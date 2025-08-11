/**
 * Generates a short unique ID for assessment submissions
 * @param length Length of the ID to generate (default: 8)
 * @returns A unique alphanumeric string
 */
export function generateSubmissionId(length = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  // Use a mix of random characters and timestamp-derived values for better uniqueness
  
  // First add 2 random characters
  for (let i = 0; i < 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  // Add a timestamp-derived component (middle 2 chars, more likely to change frequently)
  const timestamp = Date.now().toString(36);
  const middleIndex = Math.floor(timestamp.length / 2);
  result += timestamp.substring(middleIndex, middleIndex + 2);
  
  // Fill the rest with random characters
  const remainingLength = Math.max(0, length - result.length);
  for (let i = 0; i < remainingLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}
