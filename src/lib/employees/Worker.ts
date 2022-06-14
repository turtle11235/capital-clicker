import { FIRING_MULTIPLIER, WORKER_CLICKS_PER_SECOND } from "../constants"
import { ticksToSeconds } from "../utils"
import Employee from "./Employee"

export default class Worker extends Employee {
  readonly hireOneWorkerCost = NaN
  readonly hireAllWorkersCost = NaN
  readonly numWorkers = 1
  readonly numManagers = 0

  prevWorkTime = 0

  workPeriodHasElapsed = () => {
    const elapsedTimeInSeconds = ticksToSeconds(this.getCounter() - this.prevWorkTime)
    if (elapsedTimeInSeconds >= 1 / WORKER_CLICKS_PER_SECOND) {
      this.prevWorkTime = this.getCounter()
      return true
    }
    else {
      return false
    }
  }

  work = () => {
    if (this.workPeriodHasElapsed()) {
      this.doWork()
    }
  }

  hire = () => {
    return this
  }

  fire(employee?: Employee): Employee {
    if (employee) {
      throw new Error("Worker cannot fire specific employees")
    }

    return this.boss!.fire(this)
  }

  get canHire() {
    return false
  }

  get canFire() {
    return this.getMoney() >= this.wage * FIRING_MULTIPLIER
  }

  get totalWages() {
    return this.wage
  }

  get isFull() {
    return true
  }
}
