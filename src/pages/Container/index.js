import React, { useEffect, useState } from "react";
import { Row, Col, Card } from 'antd'
import { SourceFormItem } from './SourceFormItem'
import { FormItemWrapper } from './FormItemWrapper'
// import myContextContext from './createContext'

// import TableWrapper from './TableWrapper'

const commonStyle = { height: '100vh', overflowY: 'auto' }

export default function Container() {
    // 数据区start
    const [sourceItems, setSourceItems] = useState([
        {
            type: 'input',
            name: 'Input',
            itemCode: '',// 表单项唯一的名称，必输
            initialValue: '',// 表单项默认值
            colon: true,// 是否显示label后面的冒号
            label: '默认字段名',// 标签名称，必输
            labelAlign: 'right',// 标签文本对齐方式
            labelCol: { span: 6 },// 标签占用格数
            wrapperCol: { span: 18 },// 输入框占用格数
            rules: [],// 校验规则
            spanSpace: 8, //该表单项本身所占空间
        },
        {
            type: 'textarea',
            name: 'TextArea',
            itemCode: '',// 表单项唯一的名称，必输
            initialValue: '',// 表单项默认值
            colon: true,// 是否显示label后面的冒号
            label: '默认字段名',// 标签名称，必输
            labelAlign: 'right',// 标签文本对齐方式
            labelCol: { span: 6 },// 标签占用格数
            wrapperCol: { span: 18 },// 输入框占用格数
            autoSize: { minRows: 1, maxRows: 2 },
            rules: [],// 校验规则
            spanSpace: 8 //该表单项本身所占空间
        },
        {
            type: 'select',
            name: 'Select',
            itemCode: '',// 表单项唯一的名称，必输
            initialValue: '',// 表单项默认值
            options: [],// 下拉框的Option
            colon: true,// 是否显示label后面的冒号
            label: '默认字段名',// 标签名称，必输
            labelAlign: 'right',// 标签文本对齐方式
            labelCol: { span: 6 },// 标签占用格数
            wrapperCol: { span: 18 },// 输入框占用格数
            rules: [],// 校验规则
            spanSpace: 8 //该表单项本身所占空间
        },
        {
            type: 'datepicker',
            name: 'Datepicker',
            itemCode: '',// 表单项唯一的名称，必输
            initialValue: null,// 表单项默认值
            colon: true,// 是否显示label后面的冒号
            label: '默认字段名',// 标签名称，必输
            labelAlign: 'right',// 标签文本对齐方式
            labelCol: { span: 6 },// 标签占用格数
            wrapperCol: { span: 18 },// 输入框占用格数
            rules: [],// 校验规则
            spanSpace: 8 //该表单项本身所占空间
        }
    ])
    const [elems, setElems] = useState([])
    const [layout, setLayout] = useState(0)
    const [focusIndex, setFocus] = useState(undefined)
    // 数据区end

    // 方法区start
    const changeLayout = v => {
        const value = v.target.value
        setLayout(() => value)
        setElems((prevItems) => {
            if (prevItems && prevItems.length) {
                prevItems.forEach(item => {
                    item.spanSpace = value
                })
            }
            return prevItems
        })
        setSourceItems((prevItems) => {
            prevItems.forEach(item => {
                item.spanSpace = value
            })
            return prevItems
        })
    }
    /**
    * 数组元素交换位置
    * @param {array} arr 数组
    * @param {number} index1 添加项目的位置
    * @param {number} index2 删除项目的位置
    * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
    */
    const swapArrayItem = (arr, index1, index2) => {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0]
        return arr
    }
    // useEffect(() => {
    //     setLayout(layout => layout)
    // }, [layout])
    const moveItem = (dragIndex, targetIndex) => {
        let cloneItems = [...elems]
        // dragIndex正在拖动的元素索引
        // targetIndex放置目标的索引
        const newClone = swapArrayItem(cloneItems, dragIndex, targetIndex)
        if(focusIndex === dragIndex){
            setFocus(targetIndex)
        }else if(focusIndex === targetIndex){
            setFocus(dragIndex)
        }
        setElems(newClone)
    }
    const cloneItem = newFormItem => {
        setElems(prevItems => {
            return [...prevItems, newFormItem]
        })
    }
    const handleFocus = v => () => {
        setFocus(v)
    }
    // 方法区end

    return (
        <Row>
            <Col span={4} style={commonStyle}>
                {
                    sourceItems.map((item, index) => <SourceFormItem key={index} curItem={item} cloneItem={cloneItem} />)
                }
            </Col>
            <Col span={16} style={commonStyle}>
                {/* <myContextContext.Provider value={elems}> */}
                <FormItemWrapper
                    wrapperName='form'
                    elems={elems}
                    moveItem={moveItem}
                    layout={layout}
                    changeLayout={changeLayout}
                    focusIndex={focusIndex}
                    handleFocus={handleFocus}
                />
                {/* </myContextContext.Provider> */}
            </Col>
            <Col span={4} style={commonStyle}>
                编辑区
            </Col>
        </Row>
    )
}