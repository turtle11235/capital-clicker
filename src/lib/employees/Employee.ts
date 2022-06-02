import { FIRING_MULTIPLIER, MANAGER_SALARY_MULTIPLIER } from "../constants"

export type Props = {
  level: number
  moneyCallback: () => number
  baseWageCallback: () => number
  payCallback: (employee: Employee, amount: number) => void
  workCallback: () => void
  boss: Employee | null
  employees: Employee[]
}

export default abstract class Employee {
  props: Props
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
  doWork: () => void

  constructor(props: Props) {
    this.props = props
    this.level = props.level
    this.getMoney = props.moneyCallback
    this.getBaseWage = props.baseWageCallback
    this.doWork = props.workCallback
    this.boss = props.boss
    this.employees = props.employees
  }

  abstract work(): void

  abstract hire(): Employee

  abstract fire(): Employee

  pay = () => {
    this.props.payCallback(this, this.wage)
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
