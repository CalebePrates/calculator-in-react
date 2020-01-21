import React, { Component } from 'react';
import './calculator.css';
import Button from '../components/button'
import Display from '../components/display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class calculator extends Component{
    state = {
        ...initialState
    }

    clearMemory(){
        this.setState({ ...initialState })
    }
    
    setOperation(operation){
        if (this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e){
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(number){
        if (number == '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + number
        this.setState({ displayValue, clearDisplay: false })

        if (number !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={() => this.clearMemory()} triple/>
                <Button label="/" click={() => this.setOperation('/')} operation/>
                <Button label="7" click={() => this.addDigit(7)}/>
                <Button label="8" click={() => this.addDigit(8)}/>
                <Button label="9" click={() => this.addDigit(9)}/>
                <Button label="*" click={() => this.setOperation('*')} operation/>
                <Button label="4" click={() => this.addDigit(4)}/>
                <Button label="5" click={() => this.addDigit(5)}/>
                <Button label="6" click={() => this.addDigit(6)}/>
                <Button label="-" click={() => this.setOperation('-')} operation/>
                <Button label="1" click={() => this.addDigit(1)}/>
                <Button label="2" click={() => this.addDigit(2)}/>
                <Button label="3" click={() => this.addDigit(3)}/>
                <Button label="+" click={() => this.setOperation('+')} operation/>
                <Button label="0" click={() => this.addDigit(0)} double/>
                <Button label="." click={() => this.addDigit('.')}/>
                <Button label="=" click={() => this.setOperation('=')} operation/>
            </div>
        )
    }
}