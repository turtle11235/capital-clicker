import Game from "../Game"
import Executable from "../Executable"
import TimeCounter from "../TimeCounter"
import { MARKETING_INTERVAL } from "../constants"


export default class MarketingManager implements Executable {
  game: Game
  socialCapital: number
  rate: number
  budget: number
  maxBudget: number
  slogan: string

  marketingUnlocked = false
  prevMarketingTime = 0
  marketingPeriod: TimeCounter

  constructor(game: Game, socialCapital = 0, rate = 1, budget = 0, maxBudget = 100, slogan = "") {
    this.game = game
    this.socialCapital = socialCapital
    this.rate = rate
    this.budget = budget
    this.maxBudget = maxBudget
    this.slogan = slogan

    this.marketingPeriod = new TimeCounter(() => game.counter, MARKETING_INTERVAL)
  }

  execute = () => {
    if (this.marketingUnlocked && this.marketingPeriod.hasElapsed) {
      if (this.game.money >= this.budget) {
        this.game.spendMoney(this.budget)
        this.socialCapital += this.rate * (this.budget / 100)
        console.log(this.socialCapital)
      }
    }
  }

  getSocialCapital = () => {
    return Math.floor(this.socialCapital)
  }

  setBudget = (budget: number) => {
    if (budget <= this.maxBudget) {
      this.budget = budget
    }
  }

  setMaxBudget = (budget: number) => {
    this.maxBudget = Math.max(this.maxBudget, budget)
  }
}