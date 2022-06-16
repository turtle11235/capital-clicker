import Game from "../Game"
import Upgrade, { UpgradeProps } from "./Upgrade"
import UpgradeID from "./UpgradeID"
import { BusinessModuleUpgrade, FriendsFamilyUpgrade, LowerManagersUpgrade, MarketingBudgetUpgrades, MarketingModuleUpgrade, MiddleManagerUpgrades, MoneyMachineUpgrades, UpgradeModuleUpgrade, WorkerMachineUpgrades } from "./upgrades"

export default class UpgradeManager {
  game: Game
  upgradesEnabled: boolean
  _upgrades: Map<UpgradeID, Upgrade> = new Map()

  constructor(game: Game, upgradeParams?: {[key: string]: UpgradeProps}) {
    this.game = game
    this.upgradesEnabled = false
    this.initUpgrades(upgradeParams)
  }

  get upgrades() {
    const visibleUpgrades = []
    for (const [_, upgrade] of this._upgrades) {
      if (!upgrade.used && upgrade.trigger()) {
        visibleUpgrades.push(upgrade)
      }
    }

    return visibleUpgrades
  }

  getUpgradeByID = (id: UpgradeID) => {
    if (this._upgrades.has(id)) {
      return this._upgrades.get(id)!
    }
    else {
      throw new Error(`Unknown upgrade with id: ${id}`)
    }
  }

  createUpgrade = (id: UpgradeID, params: UpgradeProps) => {
    if (!params) {
      params = {
        game: this.game,
        getUpgradeCallback: this.getUpgradeByID,
        visible: false,
        used: false,
        useCount: 0
      }
    }

    switch (id) {
    case UpgradeID.UPGRADE_MODULE:
      return new UpgradeModuleUpgrade(params)
    case UpgradeID.MONEY_MACHINE:
      return new MoneyMachineUpgrades(params)
    case UpgradeID.BUSINESS_MODULE:
      return new BusinessModuleUpgrade(params)
    case UpgradeID.WORKER_MACHINES:
      return new WorkerMachineUpgrades(params)
    case UpgradeID.LOWER_MANAGERS:
      return new LowerManagersUpgrade(params)
    case UpgradeID.MIDDLE_MANAGERS:
      return new MiddleManagerUpgrades(params)
    case UpgradeID.FRIENDS_AND_FAM:
      return new FriendsFamilyUpgrade(params)
    case UpgradeID.MARKETING_MODULE:
      return new MarketingModuleUpgrade(params)
    case UpgradeID.MARKETING_BUDGET:
      return new MarketingBudgetUpgrades(params)
    default:
      throw new Error(`Unknown upgrade id: ${id}`)
    }
  }

  initUpgrades = (params?: {[key: string]: UpgradeProps}) => {
    if (!params) {
      params = {}
    }

    this._upgrades = new Map<UpgradeID, Upgrade>()
    for (let id of Object.values(UpgradeID)) {
      if (typeof id != "string") {
        id = id as UpgradeID
        this._upgrades.set(id, this.createUpgrade(id, params[id]))
      }
    }
  }
}