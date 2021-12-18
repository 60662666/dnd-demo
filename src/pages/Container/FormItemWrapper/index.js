import React from 'react'
import { useDrop } from 'react-dnd'
import MoveableItem from './../MoveableItem'
import { FORMITEM } from './../itemTypes'

const style = {
    minHeight: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
};
function selectBackgroundColor(isActive, canDrop) {
    if (isActive) {
        return 'darkgreen';
    }
    else if (canDrop) {
        return 'darkkhaki';
    }
    else {
        return '#222';
    }
}

export const FormItemWrapper = ({ wrapperName, elem, moveItem }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: FORMITEM,
        drop: () => ({
            name: `${wrapperName} 放置区域`,
            wrapperName,
        }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [wrapperName]);
    const isActive = canDrop && isOver;
    const backgroundColor = selectBackgroundColor(isActive, canDrop);
    return (
        <div ref={drop} style={{ ...style, backgroundColor }}>
            {
                elem && elem.length ?
                    elem.map((item, index) => <MoveableItem props={{ ...item }} key={index} moveItem={moveItem} />)
                    :
                    isActive ? '松开鼠标以放置' : '拖拽表单元素到此区域'
            }
        </div>
    )
}