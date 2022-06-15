import React from "react"
import { Component, ReactNode } from "react"
import { Row } from "react-bootstrap"

type Props = {
  trigger: boolean
  className?: string
  title: String
  children: ReactNode
}

type State = {}

export default class BaseModule extends Component<Props, State> {
  render() {
    if (this.props.trigger) {
      return (
        <div className={this.props.className}>
          <Row>
            <h6>{this.props.title}</h6>
            <hr />
          </Row>

          <Row className="px-md-4">{this.props.children}</Row>
        </div>
      )
    }
    else {
      return <></>
    }
  }
}
