import React from "react"
import { Row, Col } from "react-bootstrap";


type Props = {
    elapsedTime: string,
    day: number,
    time: string,
    money: string
}

export default function Header({elapsedTime, day, time, money}: Props) {
    return (
        <>
        <Row className="">
          <Col className="text-right">
            <h6 className='text-right' style={{'fontFamily': 'Monospaced'}}>Elapsed time: {elapsedTime}</h6>
          </Col>
          <Col>
            <h5>
                Capitalist Clicker Co
            </h5>
          </Col>
          <Col>
            <h6 className='text-right' style={{'fontFamily': 'Monospaced'}}>Day {day}, {time}</h6>
          </Col>
        </Row>
        <Row className="text-center">
          <Col className="text-center">
            <h1 className="display-1" style={{'fontFamily': 'Monospaced'}}>${money}</h1>
          </Col>
        </Row>
        </>
    );
}
