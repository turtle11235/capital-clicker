import {
  HIRING_BONUS,
  MANAGERS_PER_MANAGER,
  MANAGER_SALARY_MULTIPLIER,
  WORKERS_PER_MANAGER,
} from "../constants"
import { sum } from "../utils"
import Employee from "./Employee"
import EmployeeFactory from "./EmployeeFactory"
import Manager from "./Manager"

export default class MiddleManager extends Manager {
  hire(): Employee {
    for (let employee of this.employees) {
      if (employee.canHire) {
        return employee.hire()
      }
    }

    if (!this.isFull) {
      var employeeProps = {
        ...this.props,
        ...{ level: this.level - 1, boss: this, employees: [] },
      }
      let employee = EmployeeFactory.createEmployee(employeeProps)
      this.employees.push(employee)
      this.spendMoney(employee, employee.wage * HIRING_BONUS)
      return employee
    } else {
      throw new Error("out of bounds error, manager has too many employees")
    }
  }

  fire(): Employee {
    throw new Error("Method not implemented.")
  }

  get canHire(): boolean {
    if (this.isFull) {
      return this.employees.some((employee) => employee.canHire)
    } else return this.getMoney() >= this.hireOneCost
  }

  get numWorkers() {
    return sum(this.employees.map((employee) => employee.numWorkers))
  }

  get numManagers() {
    return sum(this.employees.map((employee) => employee.numManagers)) + 1
  }

  get isFull() {
    return this.employees.length <= MANAGERS_PER_MANAGER
  }

  get totalWages() {
    return (
      sum(this.employees.map((employee) => employee.totalWages)) + this.wage
    )
  }

  get hireOneCost() {
    var hirable = this.employees.filter((employee) => employee.canHire)
    if (hirable.length > 0) {
      var hiringCosts = hirable.map((employee) => employee.hireOneCost)
      return Math.min(...hiringCosts)
    } else {
      /*
        Calculating the hiring cost:
        b = base wage
        m = manager salary multiplier
        h = hiring bonus
        l = level

        hiring cost = (b * (m^0) * h) + (b * (m^1) * h) + ... + (b * (m^l) * h) 
      */
      var summedCosts = 0
      for (var i = 0; i < this.level; i++) {
        var salaryMultiplier = Math.pow(MANAGER_SALARY_MULTIPLIER, i)
        var cost = this.getBaseWage() * salaryMultiplier * HIRING_BONUS
        summedCosts += cost
      }
      return summedCosts
    }
  }

  get hireAllCost() {
    var summedTotalCosts = 0
    var currLevelEmployeeCount = MANAGERS_PER_MANAGER
    for (var currLevel = this.level - 1; currLevel >= 0; currLevel--) {
      var salaryMultiplier = Math.pow(MANAGER_SALARY_MULTIPLIER, currLevel)
      var costOfOne = this.getBaseWage() * salaryMultiplier * HIRING_BONUS
      var costOfLevel = costOfOne * currLevelEmployeeCount
      summedTotalCosts += costOfLevel
      if (currLevel > 1) {
        currLevelEmployeeCount *= MANAGERS_PER_MANAGER
      } else {
        currLevelEmployeeCount *= WORKERS_PER_MANAGER
      }
    }

    var currentCost = (this.totalWages + this.wage) * HIRING_BONUS
    return summedTotalCosts - currentCost
  }
}
