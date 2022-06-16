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

  getUpgradeByID = (id: UpgradeID, params?: UpgradeProps) => {
    if (this._upgrades.has(id)) {
      return this._upgrades.get(id)!
    }

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

    this._upgrades = new Map<UpgradeID, Upgrade>([
      [UpgradeID.UPGRADE_MODULE, this.getUpgradeByID(UpgradeID.UPGRADE_MODULE, params[UpgradeID.UPGRADE_MODULE])],
      [UpgradeID.MONEY_MACHINE, this.getUpgradeByID(UpgradeID.MONEY_MACHINE, params[UpgradeID.MONEY_MACHINE])],
      [UpgradeID.BUSINESS_MODULE, this.getUpgradeByID(UpgradeID.BUSINESS_MODULE, params[UpgradeID.BUSINESS_MODULE])],
      [UpgradeID.WORKER_MACHINES, this.getUpgradeByID(UpgradeID.WORKER_MACHINES, params[UpgradeID.WORKER_MACHINES])],
      [UpgradeID.LOWER_MANAGERS, this.getUpgradeByID(UpgradeID.LOWER_MANAGERS, params[UpgradeID.LOWER_MANAGERS])],
      [UpgradeID.MIDDLE_MANAGERS, this.getUpgradeByID(UpgradeID.MIDDLE_MANAGERS, params[UpgradeID.MIDDLE_MANAGERS])],
      [UpgradeID.FRIENDS_AND_FAM, this.getUpgradeByID(UpgradeID.FRIENDS_AND_FAM, params[UpgradeID.FRIENDS_AND_FAM])],
      [UpgradeID.MARKETING_MODULE, this.getUpgradeByID(UpgradeID.MARKETING_MODULE, params[UpgradeID.MARKETING_MODULE])],
      [UpgradeID.MARKETING_BUDGET, this.getUpgradeByID(UpgradeID.MARKETING_BUDGET, params[UpgradeID.MARKETING_BUDGET])]
    ])
  }
}