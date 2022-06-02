import { FIRING_MULTIPLIER, MANAGER_SALARY_MULTIPLIER } from "../constants"
import { EmployeeProps } from "./EmployeeFactory"

export default abstract class Employee {
  props: EmployeeProps
  boss: Employee | null
  employees: Employee[]

  abstract get hireOneCost(): number
  abstract get hireAllCost(): number
  abstract get canHire(): boolean
  abstract get totalWages(): number
  abstract get numWorkers(): number
  abstract get numManagers(): number
  abstract get isFull(): boolean

  level: number
  getMoney: () => number
  getBaseWage: () => number
  spendMoney: (employee: Employee, amount: number) => void
  doWork: () => void

  constructor(props: EmployeeProps) {
    this.props = props
    this.level = props.level
    this.getMoney = props.moneyCallback
    this.getBaseWage = props.baseWageCallback
    this.spendMoney = props.spendCallBack
    this.doWork = props.workCallback
    this.boss = props.boss
    this.employees = props.employees
  }

  abstract work(): void

  abstract hire(): Employee

  abstract fire(): Employee

  pay = () => {
    this.spendMoney(this, this.wage)
    for (var subordinate of this.employees) {
      subordinate.pay()
    }
  }

  get wage() {
    return this.getBaseWage() * Math.pow(MANAGER_SALARY_MULTIPLIER, this.level)
  }

  canFire(): boolean {
    if (this.employees.length === 0) {
      return this.getMoney() > this.wage * FIRING_MULTIPLIER
    } else {
      return this.employees.some((employee) => employee.canFire)
    }
  }
}
