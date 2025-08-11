/**
 * Generates a short unique ID for assessment submissions
 * @param length Length of the ID to generate (default: 6)
 * @returns A unique alphanumeric string
 */
export function generateSubmissionId(length = 6): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  // Get current timestamp as part of the ID to ensure uniqueness
  const timestamp = Date.now().toString(36).substring(0, 3);
  result += timestamp;
  
  // Fill the rest with random characters
  const randomLength = Math.max(0, length - timestamp.length);
  for (let i = 0; i < randomLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}
