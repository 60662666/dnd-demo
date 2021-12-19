import React, { useContext, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Radio } from 'antd'
// import myContextContext from './../createContext'
import MoveableItem from './../MoveableItem'
import { FORMITEM } from './../itemTypes'

const style = {
    position: 'relative',
    minHeight: 'calc(50vh - 92px)',
    overflowY: 'auto',
    marginTop: '10px',
    color: 'white',
    padding: '10px',
    paddingTop: '40px',
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

export const FormItemWrapper = ({ wrapperName, elems, moveItem, layout, changeLayout, focusIndex, handleFocus }) => {
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
    // const elems = useContext(myContextContext)
    return (
        <div ref={drop} style={{ ...style, backgroundColor }}>
            {
                elems && elems.length ?
                    <div style={{ position: 'absolute', height: 22, width: 'calc(100% - 10px)', top: 4 }}>
                        <label>切换整体布局：</label>
                        <Radio.Group onChange={changeLayout} value={layout}>
                            <Radio value={8}>三栏布局</Radio>
                            <Radio value={12}>两栏布局</Radio>
                        </Radio.Group>
                    </div>
                    : null
            }
            {
                elems && elems.length ?
                    elems.map((item, index) => <MoveableItem
                        item={{ ...item }}
                        key={index}
                        index={index}// 当前项在数组中的索引
                        moveItem={moveItem}// function 两个项目互换位置的方法
                        focusIndex={focusIndex}// 当前高亮/编辑的表单项
                        handleFocus={handleFocus}// function 处理高亮/编辑态的方法
                    />)
                    :
                    isActive ? '松开鼠标以放置' : '拖拽表单元素到此区域'
            }
        </div>
    )
}