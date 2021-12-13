import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

export const Home = props => {
    const history = useHistory()
    const initialValue = 0
    const [value, setValue] = useState(initialValue)
    const goToDetail = () => {
        history.push('/detail')
    }
    const plus = () => {
        setValue(value + 1)
    }
    const minus = () => {
        setValue(() => value - 1)
    }
    const btnStyle = { width: 80, background: 'green', color: '#FFF', border: '1px solid #FFF', borderRadius: 4 }
    return (
        <div>
            <div style={{ height: 100, padding: 20, background: 'lightYellow' }}>
                <Button onClick={goToDetail} style={{ ...btnStyle }}>跳转到detail</Button>
            </div>
            <div style={{ height: 100, padding: 20, background: 'lightPink' }}>
                <div>计数：{value}</div>
                <Button onClick={plus} style={{ ...btnStyle }}>+</Button>
                <Button onClick={minus} style={{ ...btnStyle }}>-</Button>
            </div>
        </div>
    )
}