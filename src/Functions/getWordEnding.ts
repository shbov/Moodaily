/**
 * Возвращает месяц по его номеру
 * @param number - номер месяца
 * @param words - массив слов
 */
export function getWordEnding(number: number, words: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  const wordIndex =
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)];
  const word = words[wordIndex];

  return `${number} ${word}`;
}
