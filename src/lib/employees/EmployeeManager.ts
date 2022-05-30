import { HIRING_BONUS } from "../constants"
import Game from "../Game"
import Employee from "./Employee"

export default class EmployeeManager {
  game: Game
  root: Employee | null = null
  // click: () => void
  // pay: (amount: number) => void

  minWage = 7.5
  wage = 7.5
  numWorkers = 0
  numManagers = 0

  canFire = false

  businessUnlocked = false
  managersUnlocked = false
  middleManagersUnlocked = false

  constructor(game: Game) {
    this.game = game
  }

  execute = () => {
    this.root?.work()
  }

  hire = () => {
    this.root?.hire()
  }

  fire = () => {}

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

  get canHire() {
    if (this.businessUnlocked) {
      return this.root
        ? this.root.canHire
        : this.game.money > this.wage * HIRING_BONUS
    } else {
      return false
    }
  }
}
