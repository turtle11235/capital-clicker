
type Props = {
    idCounter: number
    id: string
    game: object
    title: string
    pricetag?: string
    description: string
    trigger?: ()=>boolean
    effect?: ()=>void
    cost?: ()=>boolean
}

export default class Upgrade{
    static idCounter = 0
    readonly id: string
    readonly game: object
    readonly title: string
    readonly pricetag: string
    readonly description: string
    used: boolean
    triggered: boolean
    _trigger: ()=>boolean
    _effect: ()=>void
    cost: ()=>boolean
    
    constructor({game, title, description, pricetag="", trigger=()=>{return false}, effect=()=>{}, cost=()=>{return true}}: Props){
        //game: object, title: string, description: string, pricetag="", trigger=()=>{return false}, effect=()=>{}, cost=()=>{return true}
        this.id = Upgrade.createID()

        this.game = game

        this.title = title
        this.pricetag = pricetag
        this.description = description

        this.used = false
        this.triggered = false

        this._trigger = trigger
        this._effect = effect

        this.cost = cost
    }

    static createID = ()=>{
        var id = "upgrade" + Upgrade.idCounter
        Upgrade.idCounter += 1
        return id
    }

    trigger = ()=>{
        if (!this.used && !this.triggered){
            this.triggered = this._trigger()
        }
        return this.triggered
    }

    effect = ()=>{
        this._effect()
        this.used = true
    }
    
}