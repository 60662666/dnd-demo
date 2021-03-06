import React, { useState, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { Button, Icon, Input, Select, DatePicker } from "antd";
import moment from "moment";
import { FORMITEM, FORMITEMINFIELD } from './../itemTypes'
import './index.less'

const TextArea = Input.TextArea
const Option = Select.Option
// useDrag对应拖动源DragSource
// useDrop对应放置目标DropTarget
export default function MoveableItem({
    item, index, moveItem, focusIndex,
    handleFocus, handleMoveEnterAndLeave, handleDel,
    getFieldDecorator, FormItem
}) {
    // movingItem 拖动源的连接器，连接真实dom与reactdnd系统
    const movingItem = useRef()// {current: null} 生成真实dom赋给ref.current
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: FORMITEMINFIELD,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop(item, monitor) {
            // 获取被拖动的卡片的索引
            const dragIndex = item.index
            // 当前hover的卡片索引
            const hoverIndex = index
            if (dragIndex === hoverIndex) return
            const { top, bottom, left, right } = movingItem.current.getBoundingClientRect()
            const hoverOneThirdWidth = (bottom - top) / 3
            const hoverTwoThirdsWidth = (bottom - top) / 3 * 2
            const hoverOneThirdHeight = (left - right) / 3
            const hoverTwoThirdsHeight = (left - right) / 3 * 2
            const { x, y } = monitor.getClientOffset()
            const hoverClientX = x - left
            const hoverClientY = y - top
            const conditionX = hoverClientX > hoverOneThirdWidth || hoverClientX < hoverTwoThirdsWidth
            const conditionY = hoverClientY > hoverOneThirdHeight || hoverClientY < hoverTwoThirdsHeight
            if (conditionX || conditionY) {
                moveItem(dragIndex, hoverIndex)
                item.index = hoverIndex
            }
        }
    })
    const [{ isDragging }, drag] = useDrag({
        type: FORMITEMINFIELD,
        // item是用于描述拖动源的普通js对象
        item: () => ({ item, index }),
        // collect是用来收集属性的方法，返回一个js对象，并且返回值会合并到你的组件属性中
        // 其中的monitor存放的是一些拖动的状态，当拖动状态发生变化时通知组件重新获取属性并刷新组件
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    })
    drag(movingItem)
    drop(movingItem)
    const isActive = canDrop && isOver;
    const width = `calc(${item.spanSpace / 24 * 100}% - 2px)`
    let curClass = 'movableitem'
    if (focusIndex === index) {
        curClass = curClass + ' focus'
    }
    if (isDragging) {
        curClass = curClass + ' opacity'
    }
    if (isActive) {
        curClass = curClass + ' candrop'
    }
    if (item.isHovered) {
        curClass = curClass + ' ishovered'
    }
    return (
        <div
            ref={movingItem}
            className={curClass}
            onClick={handleFocus(index)}
            style={{ width }}
            onMouseEnter={handleMoveEnterAndLeave(index, 'enter')}
            onMouseLeave={handleMoveEnterAndLeave(index, 'leave')}
        >
            <FormItem
                label={item.label}
                labelCol={{ span: item.labelCol }}
                wrapperCol={{ span: item.wrapperCol }}
            >
                {
                    getFieldDecorator(`${item.itemCode}${index}`, {
                        initialValue: item.type === 'datepicker' ? moment() : item.initialValue,
                        rules: item.rules
                    })(
                        item.type === 'input' ?
                            <Input />
                            : item.type === 'select' ?
                                <Select style={{ width: '100%' }}>
                                    {
                                        item.options.map(child => <Option key={child.code} value={child.code}>{child.value}</Option>)
                                    }
                                </Select>
                                : item.type === 'textarea' ?
                                    <TextArea autoSize={{ minRows: item.minRows, maxRows: item.maxRows }} />
                                    : item.type === 'datepicker' ?
                                        <DatePicker format={item.format} showTime={item.showTime} style={{ width: '100%' }} />
                                        : null
                    )
                }
            </FormItem>
            <div className="mask" />
            {
                item.isHovered &&
                <div className="close-btn" onClick={e => handleDel(e, index)}>
                    <Icon type="close" />
                </div>
            }
        </div >
    )
}