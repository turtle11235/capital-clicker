import { HIRING_BONUS, WORKERS_PER_MANAGER } from "../constants"
import { sum } from "../utils"
import Employee from "./Employee"
import Manager from "./Manager"
import Worker from "./Worker"

export default class BaseManager extends Manager {
  hire(): Employee {
    var employeeProps = {
      ...this.props,
      ...{ level: this.level - 1, boss: this, employees: [] },
    }
    var employee = new Worker(employeeProps)
    this.employees.push(employee)
    return employee
  }

  fire(): Employee {
    return this.employees.pop()!
  }

  get canHire() {
    var hasSpace = this.employees.length < WORKERS_PER_MANAGER
    var hasFunds = this.getMoney() >= this.hireOneCost
    return hasSpace && hasFunds
  }

  get totalWages() {
    return (
      this.wage + sum(this.employees.map((employee) => employee.totalWages))
    )
  }

  get hireOneCost(): number {
    return this.getBaseWage() * HIRING_BONUS
  }

  get hireAllCost() {
    return this.hireOneCost * (WORKERS_PER_MANAGER - this.employees.length)
  }
}
