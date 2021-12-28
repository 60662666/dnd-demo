import React, { useEffect, useState } from "react";
import { Form, Row, Col, Card, Button, message } from 'antd'
import { SourceFormItem } from './SourceFormItem'
import FormItemWrapper from './FormItemWrapper'
import EditField from './EditField'
import { SOURCE_ITEMS } from './constant'
// import myContextContext from './createContext'

// import TableWrapper from './TableWrapper'

const commonStyle = { height: '100vh', overflowY: 'auto' }
const titleStyle = { fontSize: '1rem', textAlign: 'right' }
const titleTextStyle = { display: 'inline-block', height: 32, lineHeight: '32px' }
const cardStyle = { padding: 10 }

function Container(props) {
    const { getFieldDecorator, validateFields } = props.form
    // 数据区start
    const [sourceItems, setSourceItems] = useState(SOURCE_ITEMS)
    const [elems, setElems] = useState([])
    const [layout, setLayout] = useState(0)
    const [focusIndex, setFocus] = useState(undefined)
    const [editItem, setEditItem] = useState(null)
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
    // 交互中央区域内元素位置
    const moveItem = (dragIndex, targetIndex) => {
        let cloneItems = [...elems]
        // dragIndex正在拖动的元素索引
        // targetIndex放置目标的索引
        const newClone = swapArrayItem(cloneItems, dragIndex, targetIndex)
        if (focusIndex === dragIndex) {
            setFocus(targetIndex)
            setEditItem(prevItem => {
                return newClone[targetIndex]
            })
        } else if (focusIndex === targetIndex) {
            setFocus(dragIndex)
            setEditItem(prevItem => {
                return newClone[dragIndex]
            })
        }
        setElems(newClone)
    }
    // 为中央区域添加元素
    const cloneItem = newFormItem => {
        const deepCloneItem = {}
        for (let key in newFormItem) {
            deepCloneItem[key] = newFormItem[key]
        }
        setElems(prevItems => {
            return [...prevItems, deepCloneItem]
        })
    }
    // 高亮显示当前编辑项目
    const handleFocus = v => () => {
        setFocus(v)
        setEditItem(() => {
            return elems[v]
        })
    }
    // 鼠标移入移出事件
    const handleMoveEnterAndLeave = (index, type) => () => {
        setElems(prevElems => {
            const cloneItems = [...prevElems]
            const isHovered = type === 'enter' ? true : false
            cloneItems[index].isHovered = isHovered
            return cloneItems
        })
    }
    // 删除元素
    const handleDel = (e, index) => {
        e.stopPropagation()
        setElems(prevElems => {
            const cloneItems = [...prevElems]
            if (index === focusIndex) {
                setFocus(undefined)
                setEditItem(prevItems => {
                    return prevItems[index]
                })
            }
            cloneItems.splice(index, 1)
            return cloneItems
        })
    }
    // 改变元素属性，code，initialValue等等
    const handleEditItem = (v, code, index) => {
        const codeType = code.includes('.')
        setElems(prevElems => {
            const cloneItems = [...prevElems]
            if (!codeType) {
                cloneItems[index][code] = v
            } else {
                const code0 = code.split('.')[0]
                const code1 = code.split('.')[1]
                cloneItems[index][[code0]][code1] = v
            }
            return cloneItems
        })
    }
    // 保存这个页面
    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                message.loading('正在保存')
                console.log('Received values of form: ', values);
            }
        })
    }
    // 方法区end
    // useEffect(() => {
    //     if (focusIndex >= 0) {
    //         console.log('大于等于零', focusIndex)
    //     }
    // }, [focusIndex])
    return (
        <Row>
            <Col span={3} style={commonStyle}>
                <Card bodyStyle={cardStyle}>
                    <div style={titleStyle}><span style={titleTextStyle}>表单元素库</span></div>
                </Card>
                {
                    sourceItems.map((item, index) => <SourceFormItem key={index} curItem={item} cloneItem={cloneItem} />)
                }
            </Col>
            <Col span={15} style={commonStyle}>
                <Card bodyStyle={cardStyle}>
                    <div style={titleStyle}>
                        <div style={titleStyle}><span style={titleTextStyle}>页面布局</span></div>
                    </div>
                </Card>
                {/* <myContextContext.Provider value={elems}> */}
                <FormItemWrapper
                    wrapperName='form'
                    elems={elems}
                    moveItem={moveItem}
                    layout={layout}
                    changeLayout={changeLayout}
                    focusIndex={focusIndex}
                    handleFocus={handleFocus}
                    handleMoveEnterAndLeave={handleMoveEnterAndLeave}
                    handleDel={handleDel}
                />
                {/* </myContextContext.Provider> */}
            </Col>
            <Col span={6} style={commonStyle}>
                <Form onSubmit={handleSubmit}>
                    <Card bodyStyle={cardStyle}>
                        <div style={titleStyle}>
                            <span style={{ ...titleTextStyle, marginRight: 10 }}>元素编辑器</span>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </div>
                    </Card>
                    <EditField
                        editItem={editItem} index={focusIndex} handleEditItem={handleEditItem}
                        validateFields={validateFields} getFieldDecorator={getFieldDecorator}
                        FormItem={Form.Item}
                    />
                </Form>
            </Col>
        </Row>
    )
}
export default Form.create()(Container)