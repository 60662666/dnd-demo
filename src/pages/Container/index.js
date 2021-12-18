import React, { useState } from "react";
import { Row, Col, Card } from 'antd'
import { SourceFormItem } from './SourceFormItem'
import { FormItemWrapper } from './FormItemWrapper'
// import TableWrapper from './TableWrapper'

const commonStyle = { height: '100vh', float: 'left', overflowY: 'auto' }

export default function Container() {
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
            rules: []// 校验规则
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
            rules: []// 校验规则
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
            rules: []// 校验规则
        }
    ])
    const [elems, setElems] = useState([])
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
    const moveItem = (dragIndex, hoverIndex) => {
        let cloneItems = [...elems]
        // dragIndex正在拖动的元素索引
        // hoverIndex放置目标的索引
        const newClone = swapArrayItem(cloneItems, dragIndex, hoverIndex)
        setElems(newClone)
    }
    const cloneItem = newFormItem => {
        console.log(newFormItem)
        const cloneItems = [...elems]
        setElems([...cloneItems, newFormItem])
    }
    return (
        <Card>
            <div style={{ ...commonStyle, width: '16vw' }}>
                {
                    sourceItems.map((item, index) => <SourceFormItem key={index} curItem={item} cloneItem={cloneItem} />)
                }
            </div>
            <div style={{ ...commonStyle, width: '68vw' }}>
                <FormItemWrapper wrapperName='form' elems={elems} moveItem={moveItem} />
            </div>
            <div style={{ ...commonStyle, width: '16vw' }}>
                编辑区
            </div>
        </Card>
    )
}