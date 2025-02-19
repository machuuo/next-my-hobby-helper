export function formatDate(date: Date): string {
  const dateFormat = new Date(date);

  const year = dateFormat.getFullYear();
  // 월은 0부터 시작하므로 1을 더하고, 두 자리 숫자로 맞춤
  const month = (dateFormat.getMonth() + 1).toString().padStart(2, "0");
  const day = dateFormat.getDate().toString().padStart(2, "0");
  const hours = dateFormat.getHours().toString().padStart(2, "0");
  const minutes = dateFormat.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
