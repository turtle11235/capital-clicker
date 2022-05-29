import React from "react"
import { Component } from "react"
import { Row, Col, Button } from "react-bootstrap"
import BaseModule from "./BaseModule"


type Props = {
    trigger: boolean,
    className?: string,
    minWage: string,
    fireWorker: ()=>void,
    hireWorker: ()=>void,
    canFire: boolean,
    canHire: boolean,
    numWorkers: Number,
    numManagers: Number
}

type State = {

}

export default class BusinessModule extends Component<Props, State> {

    render(){
        return (
            <BaseModule
                title="Business"
                className={this.props.className}
                trigger={this.props.trigger}
            >
                <Row className="text-left">
                    <Col className="w-100 text-left">
                        <>Minimum wage: ${this.props.minWage}/hr</>
                    </Col>
                </Row>

                <Row className="">
                    <Col md="auto" className="p-1">
                        <Button
                            className="btn-danger"
                            onClick={this.props.fireWorker}
                            disabled={!this.props.canFire}
                        >
                             Fire
                        </Button>
                    </Col>
                    <Col md="auto" className="p-1">
                        <Button
                            className="btn-success"
                            onClick={this.props.hireWorker}
                            disabled={!this.props.canHire}
                        >
                             Hire
                        </Button>
                    </Col>
                    <Col className="">
                        <Row>
                            <>Workers: {this.props.numWorkers}</>
                        </Row>
                        <Row>
                            <Col>
                                <>Managers: {this.props.numManagers}</> 
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
            </BaseModule>
        )
    }
}