import Game from "./Game";
import Upgrade from "./Upgrade";

export default class UpgradeManager {
    game: Game
    usedUpgrades: Upgrade[]
    upgrades: Upgrade[]
    
    constructor(game: Game, upgrades=[], usedUpgrades=[]){
        this.game = game
        this.upgrades = upgrades
        this.usedUpgrades = usedUpgrades
        this.initUpgrades()
    }

    initUpgrades = ()=>{
        
    }
}