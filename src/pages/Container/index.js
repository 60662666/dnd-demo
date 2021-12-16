import React, { useState } from "react";
import Card from './Card'

const style = { width: 300, height: 600 }

export default function Container() {
    const [cards, setCards] = useState([
        { id: 'card1', text: 'Input' },
        { id: 'card2', text: 'Select' },
        { id: 'card3', text: 'Datepicker' }
    ])
    /**
    * 数组元素交换位置
    * @param {array} arr 数组
    * @param {number} index1 添加项目的位置
    * @param {number} index2 删除项目的位置
    * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
    */
    function swapArrayItem(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    }
    const moveCard = (dragIndex, hoverIndex) => {
        console.log(dragIndex, hoverIndex)
        let cloneCards = [...cards]
        // dragIndex正在拖动的元素索引
        // hoverIndex放置目标的索引
        const newClone = swapArrayItem(cloneCards, dragIndex, hoverIndex)
        setCards(newClone)
    }
    return (
        <div style={style}>
            {
                cards.map((item, index) => <Card key={item.id} id={item.id} text={item.text} index={index} moveCard={moveCard} />)
            }
        </div>
    )
}