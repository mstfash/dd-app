export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getDaysInWeek(date: Date): Date[] {
  const result: Date[] = [];
  const startOfWeek = new Date(date);
  
  // Set to the start of the week (Sunday)
  startOfWeek.setDate(date.getDate() - date.getDay());
  
  // Add 7 days to the array
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    result.push(day);
  }
  
  return result;
}