import {
  HIRING_BONUS,
  MANAGERS_PER_MANAGER,
  TRAINING_OVERHEAD,
  WORKER_SECONDS_PER_PAYDAY,
} from "../constants"
import Executable from "../Executable"
import Game from "../Game"
import { ticksToSeconds } from "../utils"
import Employee from "./Employee"
import EmployeeFactory from "./EmployeeFactory"

export default class EmployeeManager implements Executable {
  game: Game
  root: Employee

  minWage = 10
  wage = 10

  prevPayTime = 0
  maxManagerLevel = 1

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
      counterCallback: () => game.counter,
      hireMultiplierCallback: () => {
        return HIRING_BONUS * Math.pow(TRAINING_OVERHEAD, this.root ? this.root.level - 1 : 0)
      },
      boss: null,
      employees: [],
    })
  }

  execute = () => {
    this.root.work()
    if (this.payPeriodHasElapsed()) {
      for (const employee of this.root.employees) {
        employee.pay()
      }
      console.log("PAYDAY", this.root)
    }
  }

  payPeriodHasElapsed = () => {
    if (ticksToSeconds(this.game.counter) % WORKER_SECONDS_PER_PAYDAY === 0) {
      return true
    }
    else {
      return false
    }
  }

  hire = () => {
    if (this.canHire) {
      if (this.root.isFull && !this.root.canHire) {
        const oldRoot = this.root
        const props = {
          ...this.root.props,
          ...{ level: this.root.level + 1, employees: [this.root] },
        }
        this.root = EmployeeFactory.createEmployee(props)
        oldRoot.boss = this.root
        this.spend(oldRoot, oldRoot.hireThisCost)
      }

      if (this.root.canHire) {
        this.root.hire()
      }
      else {
        console.log("Failed to hire new employee")
      }

      console.log(this.root)
    }
  }

  fire = () => {
    this.root.fire()
    console.log(this.root)
  }

  spend = (employee: Employee, amount: number) => {
    console.log(this.root, employee)
    if (this.root && this.root !== employee) {
      this.game.spendMoney(amount)
    }
  }

  unlockBusiness() {
    this.businessUnlocked = true
  }

  upgradeManagers() {
    this.maxManagerLevel++
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
      if the root is full, the cost will include the cost of hiring 2 managers
      at the level of the root (including hiring bonus)
    */
    const cost = this.root.hireOneWorkerCost
    if (this.root.isFull && !this.root.canHire) {
      return cost + this.root.wage * HIRING_BONUS * 2
    }
    else {
      return cost
    }
  }

  get hireAllCost() {
    /*
      if the root is full, the cost will include the cost of hiring a manager
      at the level of the root and all of its sub-managers (minus the one that
      already exists)
    */
    const cost = this.root.hireAllWorkersCost
    if (this.root.isFull) {
      const newBossCost = this.root.wage * HIRING_BONUS
      const subManagersCost
        = this.root.employees[0].wage * (MANAGERS_PER_MANAGER - 1) * HIRING_BONUS
      return cost + newBossCost + subManagersCost
    }
    else {
      return cost
    }
  }

  get canHire() {

    if (this.root.canHire) {
      return true
    }
    else if (this.game.money >= this.hireOneCost) {
      return this.root.level < this.maxManagerLevel
    }
    else {
      return false
    }
  }

  get canFire() {
    return this.root.canFire
  }
}