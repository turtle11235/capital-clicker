import {
  HIRING_BONUS,
  MANAGERS_PER_MANAGER,
  WORKERS_PER_MANAGER,
} from "../constants"
import Game from "../Game"
import Employee from "./Employee"
import EmployeeFactory from "./EmployeeFactory"

export default class EmployeeManager {
  game: Game
  root: Employee

  minWage = 7.5
  wage = 7.5

  canFire = false

  businessUnlocked = false
  managersUnlocked = false
  middleManagersUnlocked = false

  constructor(game: Game) {
    this.game = game
    this.root = EmployeeFactory.createEmployee({
      level: 1,
      moneyCallback: () => game.money,
      baseWageCallback: () => this.minWage,
      spendCallBack: this.spend,
      workCallback: () => {
        this.game.workerClick()
      },
      boss: null,
      employees: [],
    })
  }

  execute = () => {
    this.root.work()
  }

  hire = () => {
    console.log("can hire:", this.canHire)
    console.log("root can hire:", this.root.canHire)
    if (this.canHire) {
      if (this.root.isFull) {
        var props = {
          ...this.root.props,
          ...{ level: this.root.level + 1, employees: [this.root] },
        }
        this.root = EmployeeFactory.createEmployee(props)
        this.game.spendMoney(this.root.wage * HIRING_BONUS)
      }
      if (this.root.canHire) {
        this.root.hire()
      } else {
        console.log("Failed to hire new employee")
      }
    }
  }

  fire = () => {}

  spend = (employee: Employee, amount: number) => {
    console.log("Employee spending money:", employee)
    console.log("amount", amount)
    if (this.root !== employee) {
      this.game.spendMoney(amount)
    }
  }

  getNumWorkers() {
    return this.numWorkers
  }

  getNumManagers() {
    return this.numManagers
  }

  unlockBusiness() {
    this.businessUnlocked = true
  }

  unlockManagers() {
    this.managersUnlocked = true
  }

  unlockMiddleManagers() {
    this.middleManagersUnlocked = true
  }

  get numWorkers() {
    return this.root.numWorkers
  }

  get numManagers() {
    return this.root.numManagers - 1
  }

  get hireOneCost() {
    /*
      if the root is full, the cost will include the cost of hiring a manager
      at the level of the root (including hiring bonus)
    */
    let cost = this.root.hireOneCost
    if (this.root.isFull) {
      return cost + this.root.wage * HIRING_BONUS
    } else {
      return cost
    }
  }

  get hireAllCost() {
    /*
      if the root is full, the cost will include the cost of hiring a manager
      at the level of the root and all of its sub-managers (minus the one that
      already exists)
    */
    let cost = this.root.hireAllCost
    if (this.root.isFull) {
      var newBossCost = this.root.wage * HIRING_BONUS
      var subManagersCost =
        this.root.employees[0].wage * (MANAGERS_PER_MANAGER - 1) * HIRING_BONUS
      return cost + newBossCost + subManagersCost
    } else {
      return cost
    }
  }

  get canHire() {
    if (
      this.middleManagersUnlocked ||
      (this.managersUnlocked && this.root.numManagers < MANAGERS_PER_MANAGER) ||
      (this.businessUnlocked && this.root.numWorkers < WORKERS_PER_MANAGER)
    ) {
      return this.root.canHire || this.game.money >= this.hireOneCost
    } else {
      return false
    }
  }
}
