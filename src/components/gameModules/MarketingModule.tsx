import React from "react"
import { Component } from "react"
import { Row } from "react-bootstrap"
import BaseModule from "./BaseModule"

type Props = {
  trigger: boolean
  className?: string
  // logo: Component
  slogan: string
  socialCapital: number
  maxBudget: number
  budget: number
  setBudget: (val: number) => void
}

type State = {}

export default class MarketingModule extends Component<Props, State> {
  render() {
    return (
      <BaseModule
        title="Marketing"
        className={this.props.className}
        trigger={this.props.trigger}
      >
        <Row>
          {/* <>[logo]</> */}
        </Row>
        <Row>
          {/* <>[{this.props.slogan}]</> */}
        </Row>
        <Row>
          <>Social Capital: {this.props.socialCapital}</>
        </Row>
        <Row>
          <>Budget: {this.props.budget}</>
          <input type="range"
            min={0}
            max={this.props.maxBudget}
            value={this.props.budget}
            onInput={(e) => {
              const slider = e.target as HTMLInputElement
              const newBudget = parseInt(slider.value)
              this.props.setBudget(newBudget)
            }}
          />
        </Row>
      </BaseModule>
    )
  }
}
