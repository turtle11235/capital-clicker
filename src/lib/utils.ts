import { TICKS_PER_SECOND } from "./constants"

export function formatNumber(number: number) {
  const isNegative = number < 0
  if (isNegative) {
    number = number * -1
  }
  let numberString = number.toFixed(2)
  const startIndex
    = numberString.indexOf(".") > 0 ? numberString.indexOf(".") : numberString.length
  let count = 0
  for (let i = startIndex; i > 0; i--) {
    if (count && count % 3 === 0) {
      numberString
        = numberString.slice(0, i)
        + ","
        + numberString.slice(i, numberString.length)
    }
    count++
  }
  if (isNegative) {
    numberString = "-" + numberString
  }
  return numberString
}

export function ticksToSeconds(ticks: number) {
  return ticks / TICKS_PER_SECOND
}

export function displayElapsedTime(seconds: number) {
  let minutes = Math.floor(seconds / 60)
  seconds = seconds % 60
  const hours = Math.floor(minutes / 60)
  minutes = minutes % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${seconds < 10 ? "0" : ""}${seconds.toFixed(2)}`
}

export function sum(...numbers: number[] | number[][]): number {
  if (typeof numbers[0] === "number") {
    return (numbers as number[]).reduce((a, b) => a + b, 0)
  }
  else {
    return numbers[0].reduce((a, b) => a + b, 0)
  }
}

export function randomValue(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)]
}
