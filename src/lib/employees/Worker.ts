import Employee from "./Employee"

export default class Worker extends Employee {
  readonly hireOneCost = NaN
  readonly hireAllCost = NaN

  work = () => {
    this.doWork()
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
}
