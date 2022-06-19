import Employee from "./Employee"


export default class HiringManager {
  hiringDelayMean: number
  hiringDelaySTD: number
  hiringBonus: number
  firingBonus: number
  hiringQueue = []
  root: Employee

  constructor(root: Employee, mean = 5, std = 1, hireBonus = 2, fireBonus = 2) {
    this.root = root
    this.hiringDelayMean = mean
    this.hiringDelaySTD = std
    this.hiringBonus = hireBonus
    this.firingBonus = fireBonus
  }

  hireOne() {

  }

  hireWorker() {

  }

  hireManager(level = 1) {

  }
}