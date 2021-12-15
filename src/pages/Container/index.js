import React, { useState } from "react";
import Card from './Card'

const style = { width: 300, height: 600 }

export default function Container() {
    const [cards, setCards] = useState([
        { id: 'card1', text: '卡片1' },
        { id: 'card2', text: '卡片2' },
        { id: 'card3', text: '卡片3' }
    ])
    return (
        <div style={style}>
            {
                cards.map((item, index) => <Card key={item.id} id={item.id} text={item.text} index={item.index} />)
            }
        </div>
    )
}