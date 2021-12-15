import React, { useState, useRef } from "react";
import { useDrag } from 'react-dnd'
import { CARD } from './itemTypes'
import './index.less'

export default function Container({ id, text, index }) {
    // cardRef 拖动源的连接器，连接真实dom与reactdnd系统
    const cardRef = useRef()// {current: null} 生成真实dom赋给ref.current
    const [{isDragging}, drag] = useDrag({
        type: CARD,
        // item是用于描述拖动源的普通js对象
        item: () => ({id, text, index}),
        // collect是用来收集属性的方法，返回一个js对象，并且返回值会合并到你的组件属性中
        // 其中的monitor存放的是一些拖动的状态，当拖动状态发生变化时通知组件重新获取属性并刷新组件
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })
    drag(cardRef)
    return (
        <div ref={cardRef} className={isDragging ? 'card opacity' : 'card'}>{text}</div>
    )
}