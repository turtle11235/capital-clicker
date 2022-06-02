import { HIRING_BONUS, WORKERS_PER_MANAGER } from "../constants"
import { sum } from "../utils"
import Employee from "./Employee"
import EmployeeFactory from "./EmployeeFactory"
import Manager from "./Manager"

export default class BaseManager extends Manager {
  hire(): Employee {
    var employeeProps = {
      ...this.props,
      ...{ level: this.level - 1, boss: this, employees: [] },
    }
    var employee = EmployeeFactory.createEmployee(employeeProps)
    this.employees.push(employee)
    return employee
  }

  fire(): Employee {
    return this.employees.pop()!
  }

  get canHire() {
    var hasFunds = this.getMoney() >= this.hireOneCost
    return !this.isFull && hasFunds
  }

  get numWorkers() {
    return this.employees.length
  }

  get numManagers() {
    return 1
  }

  get isFull() {
    return this.employees.length >= WORKERS_PER_MANAGER
  }

  get totalWages() {
    return (
      this.wage + sum(this.employees.map((employee) => employee.totalWages))
    )
  }

  get hireOneCost() {
    return this.getBaseWage() * HIRING_BONUS
  }

  get hireAllCost() {
    return this.hireOneCost * (WORKERS_PER_MANAGER - this.employees.length)
  }
}
