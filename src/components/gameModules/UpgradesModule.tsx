import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Upgrade from "../../lib/upgrades/Upgrade";
import BaseModule from "./BaseModule";

type Props = {
    trigger: boolean,
    upgrades: Upgrade[]
}

export default class UpgradesModule extends Component<Props>{
    render(){
        return (
            <BaseModule
                title="Research and Development"    
                trigger={this.props.trigger}
            >
                {this.props.upgrades.map((upgrade)=>{
                    return (
                        <Button
                            key={upgrade.id}
                            variant="outline-dark"
                            onClick={()=>{
                                upgrade.effect()
                            }}
                            disabled={!upgrade.cost()}
                        >
                            <strong>{upgrade.title} {upgrade.pricetag}</strong>
                            <br/>
                            {upgrade.description}
                        </Button>
                    )
                })}           
            </BaseModule>
        )
    }
}