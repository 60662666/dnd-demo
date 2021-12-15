import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Button } from 'antd';

import Container from './Container';

export const Detail = props => {
    const history = useHistory()
    const goToHome = () => {
        history.go(-1)
    }
    const btnStyle = { width: 80, background: 'green', color: '#FFF', border: '1px solid #FFF', borderRadius: 4 }
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ background: 'lightYellow', position: 'relative', height: '100vh' }}>
                <Container />
                <div style={{ height: 36, width: 80, position: 'absolute', bottom: 20, right: 20 }}>
                    <Button onClick={goToHome} style={{ ...btnStyle }}>跳转回home</Button>
                </div>
            </div>
        </DndProvider>
    )
}