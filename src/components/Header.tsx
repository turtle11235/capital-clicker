import React from "react"
import { Row, Col } from "react-bootstrap"

type Props = {
  elapsedTime: string
  day: number
  time: string
  money: string
}

export default function Header({ elapsedTime, day, time, money }: Props) {
  return (
    <>
      <Row className="">
        <Col className="text-right">
          <h6 className="text-right">
            Elapsed time: <span className="mono-number">{elapsedTime}</span>
          </h6>
        </Col>
        <Col>
          <h5>Capitalist Clicker Co</h5>
        </Col>
        <Col>
          <h6 className="text-right">
            Day {day}: <span className="mono-number">{time}</span>
          </h6>
        </Col>
      </Row>
      <Row className="text-center">
        <Col className="text-center">
          <h1 className="display-1 mono-number">${money}</h1>
        </Col>
      </Row>
    </>
  )
}
