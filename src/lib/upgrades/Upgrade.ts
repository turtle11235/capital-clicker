import Game from "../Game"
import UpgradeID from "./UpgradeID"

export type UpgradeProps = {
  game: Game
  getUpgradeCallback: (id: UpgradeID)=>Upgrade
  visible?: boolean
  used?: boolean
  useCount?: number
}

export default abstract class Upgrade {

  abstract id: UpgradeID
  abstract title: string
  abstract pricetag: string
  abstract description: string

  // checks if all requirements to display the upgrade are met
  // once set to true, remains true even if requirements stop being met
  abstract _trigger: () => boolean

  // executes the effects of the upgrade
  abstract execute: () => void

  // checks if all requirements to purchase the upgrade are met
  abstract cost: () => boolean

  getUpgrade: (id: UpgradeID)=>Upgrade

  game: Game
  useCount = 0
  used = false
  visible = false

  constructor({ game, getUpgradeCallback, visible = false, used = false, useCount = 0 }: UpgradeProps) {
    this.game = game
    this.useCount = useCount
    this.used = used
    this.visible = visible
    this.getUpgrade = getUpgradeCallback
  }

  // wrapper code to enforce persistence of visibility
  trigger = () => {
    if (!this.used && !this.visible) {
      this.visible = this._trigger()
    }
    return this.visible
  }

  use = () => {
    this.execute()
    this.used = true
  }

  checkDependencies = (dependencies: UpgradeID[], useCounts?: Map<UpgradeID, number>) => {
    for (const upgradeID of dependencies) {
      const upgrade = this.getUpgrade(upgradeID)
      if (!upgrade.used && !(useCounts && upgrade.useCount === useCounts.get(upgradeID))) {
        return false
      }
    }

    return true
  }
}
