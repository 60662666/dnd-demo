import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { CARD } from './itemTypes'
import './index.less'
// useDrag对应拖动源DragSource
// useDrop对应放置目标DropTarget
export default function Container({ id, text, index, moveCard }) {
    // cardRef 拖动源的连接器，连接真实dom与reactdnd系统
    const cardRef = useRef()// {current: null} 生成真实dom赋给ref.current
    const [,drop] = useDrop({
        accept: CARD,
        collect: () => ({}),
        hover(item, monitor) {
            // 获取被拖动的卡片的索引
            const dragIndex = item.index
            // 当前hover的卡片索引
            const hoverIndex = index
            if(dragIndex === hoverIndex) return
            const { top, bottom } = cardRef.current.getBoundingClientRect()
            const hoverEleHalfHeight = (bottom - top)/3
            const { y } = monitor.getClientOffset()
            const hoverClientY = y - top
            if(dragIndex < hoverIndex && hoverClientY > hoverEleHalfHeight || dragIndex > hoverIndex && hoverClientY < hoverEleHalfHeight){
                moveCard(dragIndex, hoverIndex)
                item.index = hoverIndex
            }
        }
    })
    const [{isDragging}, drag] = useDrag({
        type: CARD,
        // item是用于描述拖动源的普通js对象
        item: () => ({id, text, index}),
        // collect是用来收集属性的方法，返回一个js对象，并且返回值会合并到你的组件属性中
        // 其中的monitor存放的是一些拖动的状态，当拖动状态发生变化时通知组件重新获取属性并刷新组件
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    })
    drag(cardRef)
    drop(cardRef)
    return (
        <div ref={cardRef} className={isDragging ? 'card opacity' : 'card'}>{text}</div>
    )
}