import Upgrade from "./upgrades/Upgrade"

export type AppState = {
  money: number
  socialCapital: number
  marketingBudget: number
  maxMarketingBudget: number
  upgrades: Upgrade[]
  minWage: number
  wage: number
  hireOneCost: number
  numWorkers: number
  numManagers: number
  canHire: boolean
  canFire: boolean
  elapsedTime: string
  time: string
  day: number
}

export const defaultAppState: AppState = {
  money: 0,
  socialCapital: 0,
  marketingBudget: 0,
  maxMarketingBudget: 0,
  upgrades: [],
  minWage: 0,
  wage: 0,
  hireOneCost: 0,
  numWorkers: 0,
  numManagers: 0,
  canHire: false,
  canFire: false,
  elapsedTime: "0:0:0",
  time: "0:0:0",
  day: 0,
}