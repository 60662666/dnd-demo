import React, { useState, useRef, useEffect } from "react";
import { Input, Select, DatePicker, message } from "antd";
import { useDrag, useDrop } from 'react-dnd'
import { FORMITEM } from '../itemTypes'
import './index.less'

const TextArea = Input.TextArea

const style = {
    textAlign: 'center',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '.5rem',
    margin: '1.5rem .5rem 0',
}

export const SourceFormItem = ({ curItem, cloneItem }) => {
    const { name } = curItem
    const [{ opacity }, drag] = useDrag(() => ({
        type: FORMITEM,
        item: { name },
        end(item, monitor) {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                const isDropAllowed = dropResult.wrapperName === 'form' ||
                    dropResult.wrapperName === dropResult.dropEffect
                if (isDropAllowed) {
                    const isCopyAction = dropResult.dropEffect === 'move'
                    if (isCopyAction) {
                        cloneItem(curItem)
                    }
                }
                else {
                    message.error(`该元素不可放置到该区域`)
                }
            }
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }), [name])
    const items = {
        input: <Input />,
        select: <Select style={{ width: '100%' }} />,
        textarea: <TextArea autosize={false} />,
        datepicker: <DatePicker style={{ width: '100%' }} />,
    }
    return (<div ref={drag} style={{ ...style, opacity }}>
        {name}
    </div>)
};
