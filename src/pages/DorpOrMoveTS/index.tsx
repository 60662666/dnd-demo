
import React from 'react'
import { render } from 'react-dom'
import Example from './example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export function DropOrMoveTS() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Example />
            </DndProvider>
        </div>
    )
}
