import { WORKER_CLICKS_PER_SECOND } from "../constants"
import Employee from "./Employee"

export default class Worker extends Employee {
  readonly hireOneCost = NaN
  readonly hireAllCost = NaN
  readonly numWorkers = 1
  readonly numManagers = 0

  prevWorkTime = 0

  workPeriodHasElapsed = () => {
    let elapsedTimeInSeconds = (Date.now() - this.prevWorkTime) / 1000
    if (elapsedTimeInSeconds >= 1 / WORKER_CLICKS_PER_SECOND) {
      this.prevWorkTime = Date.now()
      return true
    } else return false
  }

  work = () => {
    if (this.workPeriodHasElapsed()) {
      this.doWork()
    }
  }

  hire = () => {
    return this
  }

  fire = () => {
    return this
  }

  get canHire() {
    return false
  }

  get totalWages() {
    return this.wage
  }

  get isFull() {
    return true
  }
}
