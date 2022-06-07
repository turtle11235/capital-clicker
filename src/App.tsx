import './App.css'
import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header'
import BusinessModule from './components/gameModules/BusinessModule'
import MarketingModule from './components/gameModules/MarketingModule'
import UpgradesModule from './components/gameModules/UpgradesModule'

import { AppState, defaultAppState } from './lib/AppState'
import Game from './lib/Game'

import { formatNumber } from './lib/utils'

export default class App extends Component<{}, AppState> {
  state: AppState
  game = new Game(this)

  constructor(props: {}) {
    super(props)
    this.state = defaultAppState
  }

  update = (newState: AppState) => {
    this.setState({ ...this.state, ...newState })
  }

  render() {
    return (
      <Container fluid className="text-center">
        <Header
          money={formatNumber(this.state.money)}
          elapsedTime={this.state.elapsedTime}
          day={this.state.day}
          time={this.state.time}
        />
        <Row md="4" className="d-flex justify-content-center">
          <Col className="px-4">
            <MarketingModule
              trigger={true}
              // logo={<></>}
              slogan={'slogan'}
              socialCapital={this.state.socialCapital}
              maxBudget={this.state.maxMarketingBudget}
              budget={this.state.marketingBudget}
              setBudget={this.game.setMarketingBudget}
            />
          </Col>
          <Col className="px-4">
            <Row>
              <Button
                className="py-4 w-50 m-auto"
                variant="secondary"
                onClick={() => {
                  this.game.userClick()
                  // const button = e.target as HTMLButtonElement
                  // button.blur()
                }}
                onMouseDown={(e) => {
                  const button = e.target as HTMLButtonElement
                  button.classList.remove('btn-secondary')
                  button.classList.add('btn-danger')
                }}
                onMouseUp={(e) => {
                  const button = e.target as HTMLButtonElement
                  button.classList.remove('btn-danger')
                  button.classList.add('btn-secondary')
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
              hireOneCost={formatNumber(this.state.hireOneCost)}
              canFire={this.state.canFire}
              canHire={this.state.canHire}
              fireWorker={() => {
                this.game.fireWorker()
              }}
              hireWorker={() => {
                this.game.hireWorker()
              }}
            />
          </Col>
          <Col className="px-4">
            <UpgradesModule
              trigger={this.game.upgradesUnlocked}
              upgrades={this.state.upgrades}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
