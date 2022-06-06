import {
  HIRING_BONUS,
  MANAGERS_PER_MANAGER,
  MANAGER_SALARY_MULTIPLIER,
  WORKERS_PER_MANAGER,
} from '../constants'
import { sum } from '../utils'
import Employee from './Employee'
import EmployeeFactory from './EmployeeFactory'
import Manager from './Manager'

export default class MiddleManager extends Manager {
  hire(): Employee {
    for (const employee of this.employees) {
      if (employee.canHire) {
        return employee.hire()
      }
    }

    if (!this.isFull) {
      const employeeProps = {
        ...this.props,
        ...{ level: this.level - 1, boss: this, employees: [] },
      }
      const employee = EmployeeFactory.createEmployee(employeeProps)
      this.employees.push(employee)
      this.spendMoney(employee, employee.wage * HIRING_BONUS)
      employee.hire()
      return employee
    }
    else {
      throw new Error('out of bounds error, manager has too many employees')
    }
  }

  get canHire(): boolean {
    if (this.isFull) {
      return this.employees.some((employee) => employee.canHire)
    }
    else {
      return this.getMoney() >= this.hireOneCost
    }
  }

  get numWorkers() {
    return sum(this.employees.map((employee) => employee.numWorkers))
  }

  get numManagers() {
    return sum(this.employees.map((employee) => employee.numManagers)) + 1
  }

  get isFull() {
    return this.employees.length >= MANAGERS_PER_MANAGER
  }

  get totalWages() {
    return (
      sum(this.employees.map((employee) => employee.totalWages)) + this.wage
    )
  }

  get hireOneCost() {
    const hirable = this.employees.filter((employee) => employee.canHire)
    if (hirable.length > 0) {
      const hiringCosts = hirable.map((employee) => employee.hireOneCost)
      return Math.min(...hiringCosts)
    }
    else {
      /*
        Calculating the hiring cost:

        b = base wage
        m = manager salary multiplier
        h = hiring bonus
        l = level

        hiring cost = (b * (m^0) * h) + (b * (m^1) * h) + ... + (b * (m^l) * h)
      */
      let summedCosts = 0
      for (let i = 0; i < this.level; i++) {
        const salaryMultiplier = Math.pow(MANAGER_SALARY_MULTIPLIER, i)
        const cost = this.getBaseWage() * salaryMultiplier * HIRING_BONUS
        summedCosts += cost
      }
      return summedCosts
    }
  }

  get hireAllCost() {
    let summedTotalCosts = 0
    let currLevelEmployeeCount = MANAGERS_PER_MANAGER
    for (let currLevel = this.level - 1; currLevel >= 0; currLevel--) {
      const salaryMultiplier = Math.pow(MANAGER_SALARY_MULTIPLIER, currLevel)
      const costOfOne = this.getBaseWage() * salaryMultiplier * HIRING_BONUS
      const costOfLevel = costOfOne * currLevelEmployeeCount
      summedTotalCosts += costOfLevel
      if (currLevel > 1) {
        currLevelEmployeeCount *= MANAGERS_PER_MANAGER
      }
      else {
        currLevelEmployeeCount *= WORKERS_PER_MANAGER
      }
    }

    const currentCost = (this.totalWages + this.wage) * HIRING_BONUS
    return summedTotalCosts - currentCost
  }
}
