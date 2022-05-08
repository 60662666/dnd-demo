import React from "react";

const Counter = ({ value, onInc, onDec }) => {
    const incrementIfOdd = function () {
        if (value % 2 !== 0) {
            onInc()
        }
    }
    const incrementAsync = function () {
        setTimeout(onInc, 1000)
    }
    return (
        <div>
            Clicked: {value} times
            {' '}
            <button onClick={onInc}>+</button>
            {' '}
            <button onClick={onDec}>-</button>
            {' '}
            <button onClick={incrementIfOdd}>Inc if odd</button>
            {' '}
            <button onClick={incrementAsync}>Inc async</button>
        </div>
    )
}
export default Counter