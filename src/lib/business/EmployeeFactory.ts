import Employee from "./employee/Employee"
import MiddleManager from "./employee/MiddleManager"
import LowerManager from "./employee/LowerManager"
import Worker from "./employee/Worker"

export type EmployeeProps = {
  level: number
  moneyCallback: () => number
  baseWageCallback: () => number
  spendCallBack: (employee: Employee, amount: number) => void
  workCallback: () => void
  counterCallback: () => number
  hireMultiplierCallback: () => number
  boss: Employee | null
  employees: Employee[]
}

export default class EmployeeFactory {
  static createEmployee(
    props: EmployeeProps
  ): MiddleManager | LowerManager | Worker {
    switch (props.level) {
    case 0:
      return new Worker(props)
    case 1:
      return new LowerManager(props)
    default:
      return new MiddleManager(props)
    }
  }
}
