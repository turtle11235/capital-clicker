type Props = {
  title: string
  description: string
  used?: boolean
  triggered?: boolean
  pricetag?: string
  trigger?: () => boolean
  effect?: () => void
  cost?: () => boolean
}

export default class Upgrade {
  static idCounter = 0
  readonly id: string
  readonly title: string
  readonly pricetag: string
  readonly description: string
  used: boolean
  triggered: boolean
  _trigger: () => boolean
  _effect: () => void
  cost: () => boolean

  constructor({
    title,
    description,
    used = false,
    triggered = false,
    pricetag = "",
    trigger = () => {
      return false
    },
    effect = () => {},
    cost = () => {
      return true
    },
  }: Props) {
    this.id = Upgrade.createID()

    this.title = title
    this.pricetag = pricetag
    this.description = description

    this.used = used
    this.triggered = triggered

    this._trigger = trigger
    this._effect = effect

    this.cost = cost
  }

  static createID = () => {
    var id = "upgrade" + Upgrade.idCounter
    Upgrade.idCounter += 1
    return id
  }

  trigger = () => {
    if (!this.used && !this.triggered) {
      this.triggered = this._trigger()
    }
    return this.triggered
  }

  effect = () => {
    this._effect()
    this.used = true
  }
}
