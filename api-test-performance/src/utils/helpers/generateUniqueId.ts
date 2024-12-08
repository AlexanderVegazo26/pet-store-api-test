export function generateUniqueIntId(): number {
  return parseInt(
    `${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(0, 16)
  );
}
