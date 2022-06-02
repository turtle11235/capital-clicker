import Employee from "./Employee"
import MiddleManager from "./MiddleManager"
import LowerManager from "./LowerManager"
import Worker from "./Worker"

export type EmployeeProps = {
  level: number
  moneyCallback: () => number
  baseWageCallback: () => number
  spendCallBack: (employee: Employee, amount: number) => void
  workCallback: () => void
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
