import { HIRING_BONUS, WORKERS_PER_MANAGER } from '../constants'
import { sum } from '../utils'
import Employee from './Employee'
import EmployeeFactory from './EmployeeFactory'
import Manager from './Manager'

export default class LowerManager extends Manager {
  hire(): Employee {
    const employeeProps = {
      ...this.props,
      ...{ level: this.level - 1, boss: this, employees: [] },
    }
    const employee = EmployeeFactory.createEmployee(employeeProps)
    this.employees.push(employee)
    this.spendMoney(employee, employee.wage * HIRING_BONUS)
    return employee
  }

  get canHire() {
    const hasFunds = this.getMoney() >= this.hireOneCost
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

  get hireOneCost(): number {
    return this.getBaseWage() * HIRING_BONUS
  }

  get hireAllCost(): number {
    return this.hireOneCost * (WORKERS_PER_MANAGER - this.employees.length)
  }
}