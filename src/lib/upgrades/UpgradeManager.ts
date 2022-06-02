import {
  MANAGER_SALARY_MULTIPLIER,
  WORKERS_PER_MANAGER,
  MANAGERS_PER_MANAGER,
} from '../constants'
import Game from '../Game'
import Upgrade from './Upgrade'

export default class UpgradeManager {
  game: Game
  usedUpgrades: Upgrade[]
  upgradesEnabled: boolean
  _upgrades: Upgrade[]

  constructor(game: Game, upgrades = [], usedUpgrades = []) {
    this.game = game
    this._upgrades = upgrades
    this.upgradesEnabled = false
    this.usedUpgrades = usedUpgrades
    this.initUpgrades()
  }

  get upgrades() {
    return this._upgrades.filter(
      (upgrade) => !upgrade.used && upgrade.trigger()
    )
  }

  initUpgrades = () => {
    const u1 = new Upgrade({
      title: 'Work Smarter Not Harder',
      description: 'Begin research into improving the money-making machine',
      trigger: () => {
        const canBuy = this.game.totalMoney >= 0.1
        if (canBuy) this.upgradesEnabled = true
        return canBuy
      },
    })
    this._upgrades.push(u1)

    const u2 = new Upgrade({
      title: 'A Slight Improvement',
      pricetag: '($1.00)',
      description: 'Money machine gives 5 cents per click',
      trigger: () => {
        return u1.used && this.game.totalMoney >= 0.15
      },
      effect: () => {
        this.game.spendMoney(1)
        this.game.setUserClickVal(0.05)
      },
      cost: () => {
        return this.game.money >= 1
      },
    })
    this._upgrades.push(u2)

    const u3 = new Upgrade({
      title: 'Improved Clicking Technique',
      pricetag: '($4.00)',
      description: 'Money machine gives 10 cents per click',
      trigger: () => {
        return u2.used && this.game.totalMoney >= 2
      },
      effect: () => {
        this.game.spendMoney(4)
        this.game.setUserClickVal(0.1)
      },
      cost: () => {
        return this.game.money >= 4
      },
    })
    this._upgrades.push(u3)

    const u4 = new Upgrade({
      title: 'Lubricated Button',
      pricetag: '($10.00)',
      description: 'Money machine gives 25 cents per click',
      trigger: () => {
        return u3.used && this.game.totalMoney >= 10
      },
      effect: () => {
        this.game.spendMoney(10)
        this.game.setUserClickVal(0.25)
      },
      cost: () => {
        return this.game.money >= 10
      },
    })
    this._upgrades.push(u4)

    const u5 = new Upgrade({
      title: 'Local Business License',
      pricetag: '($10.00)',
      description: 'Why click when you can pay someone to click for you?',
      trigger: () => {
        return u1.used && this.game.totalMoney >= 10
      },
      effect: () => {
        this.game.spendMoney(10)
        this.game.unlockBusiness()
      },
      cost: () => {
        return this.game.money >= 10
      },
    })
    this._upgrades.push(u5)

    const u6 = new Upgrade({
      title: 'Company Rollout',
      pricetag: '($25.00)',
      description: 'Worker machines give 5 cents per click',
      trigger: () => {
        return u5.used && u2.used && this.game.totalMoney >= 25
      },
      effect: () => {
        this.game.spendMoney(25)
        this.game.setWorkerClickVal(0.05)
      },
      cost: () => {
        return this.game.money >= 25
      },
    })
    this._upgrades.push(u6)

    const u7 = new Upgrade({
      title: 'Hardware Optimization',
      pricetag: '($25.00)',
      description: 'Money machine gives 50 cents per click',
      trigger: () => {
        return u4.used && this.game.totalMoney >= 25
      },
      effect: () => {
        this.game.spendMoney(25)
        this.game.setUserClickVal(0.5)
      },
      cost: () => {
        return this.game.money >= 25
      },
    })
    this._upgrades.push(u7)

    const u8 = new Upgrade({
      title: 'Company Rollout 2',
      pricetag: '($50.00)',
      description: 'Worker machines give 10 cents per click',
      trigger: () => {
        return u6.used && u3.used && this.game.totalMoney >= 50
      },
      effect: () => {
        this.game.spendMoney(50)
        this.game.setWorkerClickVal(0.1)
      },
      cost: () => {
        return this.game.money >= 50
      },
    })
    this._upgrades.push(u8)

    const u9 = new Upgrade({
      title: 'Company Rollout 3',
      pricetag: '($100.00)',
      description: 'Worker machines give 25 cents per click',
      trigger: () => {
        return u4.used && u8.used && this.game.totalMoney >= 100
      },
      effect: () => {
        this.game.spendMoney(100)
        this.game.setWorkerClickVal(0.25)
      },
      cost: () => {
        return this.game.money >= 100
      },
    })
    this._upgrades.push(u9)

    const u10 = new Upgrade({
      title: 'Beginner Business Techniques',
      pricetag: '($100.00)',
      description: `Managers make ${MANAGER_SALARY_MULTIPLIER}x workers' wages and oversee up to ${WORKERS_PER_MANAGER} workers`,
      trigger: () => {
        return (
          u5.used &&
          this.game.numWorkers >= WORKERS_PER_MANAGER &&
          this.game.totalMoney >= 100
        )
      },
      effect: () => {
        this.game.spendMoney(100)
        this.game.unlockManagers()
      },
      cost: () => {
        return this.game.money >= 100
      },
    })
    this._upgrades.push(u10)

    const u11 = new Upgrade({
      title: 'Middle Management',
      pricetag: '($200.00)',
      description: `Middle-managers make ${MANAGER_SALARY_MULTIPLIER}x their subordinates' wages and oversee up to ${MANAGERS_PER_MANAGER} managers`,
      trigger: () => {
        return (
          u10.used &&
          this.game.numWorkers >= WORKERS_PER_MANAGER * MANAGERS_PER_MANAGER &&
          this.game.totalMoney >= 200
        )
      },
      effect: () => {
        this.game.spendMoney(200)
        this.game.unlockMiddleManagers()
      },
      cost: () => {
        return this.game.money >= 200
      },
    })
    this._upgrades.push(u11)

    const u12 = new Upgrade({
      title: 'Friends and Family Investment',
      description: '$200 - This counts as your birthday present too...',
      trigger: () => {
        return u5.used && this.game.totalMoney >= 50
      },
      effect: () => {
        this.game.receiveMoney(200)
      },
    })
    this._upgrades.push(u12)

    const u13 = new Upgrade({
      title: 'Company Rollout 3',
      pricetag: '($150)',
      description: 'Worker machines give 50 cents per click',
      trigger: () => {
        return u7.used && u9.used && this.game.totalMoney >= 150
      },
      effect: () => {
        this.game.spendMoney(150)
        this.game.setWorkerClickVal(0.5)
      },
      cost: () => {
        return this.game.money >= 150
      },
    })
    this._upgrades.push(u13)

    const u14 = new Upgrade({
      title: 'Hardware Optimization',
      pricetag: '($50.00)',
      description: 'Money machine gives $1 per click',
      trigger: () => {
        return u7.used && this.game.totalMoney >= 50
      },
      effect: () => {
        this.game.spendMoney(50)
        this.game.setUserClickVal(1)
      },
      cost: () => {
        return this.game.money >= 50
      },
    })
    this._upgrades.push(u14)

    const u15 = new Upgrade({
      title: 'Company Rollout 4',
      pricetag: '($250)',
      description: 'Worker machines give $1 per click',
      trigger: () => {
        return u13.used && u14.used && this.game.totalMoney >= 250
      },
      effect: () => {
        this.game.spendMoney(250)
        this.game.setWorkerClickVal(1)
      },
      cost: () => {
        return this.game.money >= 250
      },
    })
    this._upgrades.push(u15)
  }
}
