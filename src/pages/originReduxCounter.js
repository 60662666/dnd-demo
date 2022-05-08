import React, { useEffect, useState } from "react";
import { createStore } from 'redux'
import Counter from './components/Counter'
import counter from './../reducers'

const store = createStore(counter)

const CounterWrapper = () => {
    const [countRes,setCountRes] = useState(store.getState())
    useEffect(()=>{
        let unsubscribe = store.subscribe(()=>{
            setCountRes(store.getState())
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    return <div>
        <div>Clicked: {store.getState()} times</div>
        <Counter
            value={countRes}
            onInc={() => store.dispatch({ type: 'INC' })}
            onDec={() => store.dispatch({ type: 'DEC' })}
        />
    </div>
}

export default CounterWrapper