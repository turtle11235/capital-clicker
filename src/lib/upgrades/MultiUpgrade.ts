import Upgrade from "./Upgrade"

type ValueSetList = {[key: string]: string[] | number[]}
type ValueSet = {[key: string]: string | number}

export default abstract class MultiUpgrade extends Upgrade {
  abstract maxUses: number

  title = ""
  pricetag = ""
  description = ""
  values: ValueSetList = {}
  nextVals: ValueSet = {}

  override use = () => {
    this.execute()
    this.useCount++
    if (this.useCount >= this.maxUses) {
      this.used = true
    }
    else {
      this.visible = false
      this.incrementVals()
      this.update()
    }
  }

  incrementVals = () => {
    // updates nextVals to be an object containing the next set of values
    this.nextVals = Object.keys(this.values).reduce((result: ValueSet, key) => {
      result[key] = this.values[key][this.useCount]
      return result
    }, {})
  }

  abstract update: () => void

}