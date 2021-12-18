import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'
import myContextContext from './../createContext'
import MoveableItem from './../MoveableItem'
import { FORMITEM } from './../itemTypes'

const style = {
    minHeight: 'calc(50vh - 92px)',
    overflowY: 'auto',
    margin: '10px',
    color: 'white',
    padding: '10px',
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
        return '#9C9C9C';
    }
}

export const FormItemWrapper = ({ wrapperName, moveItem }) => {
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
    const backgroundColor = selectBackgroundColor(isActive, canDrop)
    const elems = useContext(myContextContext)
    return (
        <div ref={drop} style={{ ...style, backgroundColor }}>
            {
                elems && elems.length ?
                    elems.map((item, index) => <MoveableItem item={{ ...item }} key={index} index={index} moveItem={moveItem} />)
                    :
                    isActive ? '松开鼠标以放置' : '拖拽表单元素到此区域'
            }
        </div>
    )
}