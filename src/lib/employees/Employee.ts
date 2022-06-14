import { MANAGER_SALARY_MULTIPLIER } from "../constants"
import { EmployeeProps } from "./EmployeeFactory"

export default abstract class Employee {
  props: EmployeeProps
  boss: Employee | null
  employees: Employee[]

  abstract get hireOneWorkerCost(): number
  abstract get hireAllWorkersCost(): number
  abstract get canHire(): boolean
  abstract get canFire(): boolean
  abstract get totalWages(): number
  abstract get numWorkers(): number
  abstract get numManagers(): number
  abstract get isFull(): boolean
  abstract get name(): string

  level: number
  getMoney: () => number
  getBaseWage: () => number
  spendMoney: (employee: Employee, amount: number) => void
  doWork: () => void
  getCounter: () => number
  getHiringMultiplier: () => number

  constructor(props: EmployeeProps) {
    this.props = props
    this.level = props.level
    this.getMoney = props.moneyCallback
    this.getBaseWage = props.baseWageCallback
    this.spendMoney = props.spendCallBack
    this.doWork = props.workCallback
    this.getCounter = props.counterCallback
    this.getHiringMultiplier = props.hireMultiplierCallback
    this.boss = props.boss
    this.employees = props.employees

    this.spendMoney(this, this.hireThisCost)
  }

  abstract work(): void

  quit: () => Employee = () => {
    return this.boss!.fire(this)
  }

  abstract hire(): Employee

  abstract fire(employee?: Employee): Employee

  pay = () => {
    if (this.getMoney() < this.wage) {
      this.quit()
    }
    else {
      this.spendMoney(this, this.wage)
      for (const subordinate of this.employees) {
        subordinate.pay()
      }
    }
  }

  get wage() {
    return this.getBaseWage() * Math.pow(MANAGER_SALARY_MULTIPLIER, this.level)
  }

  get hireThisCost() {
    return this.getBaseWage() * this.getHiringMultiplier()
  }
}
