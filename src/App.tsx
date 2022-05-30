import './App.css';
import React, { Component } from 'react';
import Upgrade from './lib/upgrades/Upgrade';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BusinessModule from './components/gameModules/BusinessModule';
import UpgradesModule from './components/gameModules/UpgradesModule';
import Header from './components/Header';
import { formatNumber } from './lib/utils';
import Game from './lib/Game'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

type State = {
  money: number,
  upgrades: Upgrade[],
  minWage: number,
  wage: number,
  numWorkers: number,
  numManagers: number,
  canHire: boolean,
  canFire: boolean,
  elapsedTime: string,
  time: string,
  day: number
}

export default class App extends Component<{}, State>{
  state: State
  game = new Game(this)

  constructor(props: {}){
    super(props)
    this.state = {
      money: 0,
      upgrades: [],
      minWage: 0,
      wage: 0,
      numWorkers: 0,
      numManagers: 0,
      canHire: false,
      canFire: false,
      elapsedTime: "0:0:0",
      time: "0:0:0",
      day: 0
    }
  }

  update = (newState: State)=>{
    this.setState({...this.state, ...newState})
  }

  render(){
    return (
      <Container fluid className="text-center">
        <Header 
          money={formatNumber(this.state.money)}
          elapsedTime={this.state.elapsedTime}
          day={this.state.day}
          time={this.state.time}
        />
        <Row md='4' className="d-flex justify-content-center">
            <Col className="px-4">
              
            </Col>
            <Col className="px-4">
            <Row>
              <Button 
                  className="py-4 w-50 m-auto"
                  variant="secondary"
                  onClick={(e)=>{
                      this.game.clickButton()
                      const button = e.target as HTMLButtonElement
                      button.blur()
                  }}
                  onMouseDown={(e)=>{
                      const button = e.target as HTMLButtonElement
                      button.classList.remove("btn-secondary")
                      button.classList.add("btn-danger")
                  }}
                  onMouseUp={(e)=>{
                      const button = e.target as HTMLButtonElement
                      button.classList.remove("btn-danger")
                      button.classList.add("btn-secondary")
                  }}
              >
                  Make Money
              </Button>
              </Row>
              <BusinessModule
                trigger={this.game.businessUnlocked}
                numWorkers={this.state.numWorkers}
                numManagers={this.state.numManagers}
                minWage={formatNumber(this.state.minWage)}
                // wage={formatNumber(this.state.wage)}
                canFire={this.state.canFire}
                canHire={this.state.canHire}
                fireWorker={()=>{this.game.fireWorker()}}
                hireWorker={()=>{this.game.hireWorker()}}
                // canHireWorker={this.state.canHireWorker}
                // canHireManager={this.state.canHireManager}
                // hireWorkerHandler={this.game.hireWorker}
                // fireWorkerHandler={this.game.fireWorker}
                // hireManagerHandler={this.game.hireManager}
                // fireManagerHandler={this.game.fireManager}
                // raiseWagesHandler={this.game.raiseWages}
                // lowerWagesHandler={this.game.lowerWages}
                // canLowerWages={this.game.wage > this.game.minWage}
                // managersUnlocked={this.game.managersUnlocked}
              />
            </Col>
            <Col className="px-4">
              <UpgradesModule
                trigger={this.game.upgradesUnlocked}
                upgrades={this.state.upgrades}
                // upgradeHandler={this.game.completeUpgrade}
                // upgradeHandler={()=>{}}
              />
            </Col>
        </Row>
      </Container>
    );
  }
}