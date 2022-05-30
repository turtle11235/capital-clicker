import { TICKS_PER_SECOND } from "./constants"

export function formatNumber(number: number) {
  var numberString = number.toFixed(2)
  var startIndex =
    numberString.indexOf(".") > 0
      ? numberString.indexOf(".")
      : numberString.length
  var count = 0
  for (var i = startIndex; i > 0; i--) {
    if (count && count % 3 === 0) {
      numberString =
        numberString.slice(0, i) +
        "," +
        numberString.slice(i, numberString.length)
    }
    count++
  }
  return numberString
}

export function ticksToSeconds(ticks: number) {
  return ticks / TICKS_PER_SECOND
}

export function displayElapsedTime(seconds: number) {
  var minutes = Math.floor(seconds / 60)
  seconds = seconds % 60
  var hours = Math.floor(minutes / 60)
  minutes = minutes % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${seconds < 10 ? "0" : ""}${seconds.toFixed(2)}`
}
