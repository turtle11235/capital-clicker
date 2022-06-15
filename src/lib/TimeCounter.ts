import { ticksToSeconds } from "./utils"


export default class TimeCounter {
  startTime: number
  periodInSec: number
  getCounter: () => number

  constructor(getCounter: () => number, period: number) {
    this.startTime = getCounter()
    this.getCounter = getCounter
    this.periodInSec = period
  }

  get hasElapsed() {
    if (ticksToSeconds(this.getCounter() - this.startTime) % this.periodInSec === 0) {
      return true
    }
    else {
      return false
    }
  }
}