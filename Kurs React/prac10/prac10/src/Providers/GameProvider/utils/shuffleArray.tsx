import getRandomInt from "./getRandomInt";

export default function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(i+1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
