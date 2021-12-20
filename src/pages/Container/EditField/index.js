import React, { useContext, useState } from 'react'
import { Form, Row, Col, Input, Tabs } from 'antd'

const { TabPane } = Tabs

const style = {
    position: 'relative',
    minHeight: 'calc(50vh - 92px)',
    overflowY: 'auto',
    marginTop: '10px',
    padding: '10px',
    paddingTop: '10px',
    fontSize: '1rem',
    lineHeight: 'normal',
}

const EditField = props => {
    const { getFieldDecorator, validateFields } = props.form
    const { editItem, index, handleEditItem } = props
    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }
    const formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    }
    const changeItemAttr = (v, code) => {
        let value = ''
        if (typeof v === 'string') {
            value = v
        } else {
            value = v.target.value
        }
        handleEditItem(value, code, index)
    }
    return (
        <div style={{ ...style }}>
            <Tabs defaultActiveKey='1' type="card">
                <TabPane tab="基础信息" key="1">
                    <Form {...formItemLayout} onSubmit={handleSubmit}>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="主交易码">
                                    {getFieldDecorator('mainTransCode', {
                                        rules: [{ required: true, message: '主交易码必须输入！' }],
                                    })(
                                        <Input />
                                        // <Select placeholder="Please select a country">
                                        //     <Option value="china">China</Option>
                                        //     <Option value="usa">U.S.A</Option>
                                        // </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="页面名称">
                                    {getFieldDecorator('pageName', {
                                        rules: [{ required: true, message: '页面名称必须输入！' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
            </Tabs>
            <Tabs defaultActiveKey='1' type="card">
                <TabPane tab="当前编辑项" key="1">
                    {
                        editItem && editItem.type === 'input' ?
                            <div>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>字段值</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children'>
                                                <Input value={editItem.itemCode} onChange={e => changeItemAttr(e, 'itemCode')} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>字段中文名</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children'>
                                                <Input value={editItem.label} onChange={e => changeItemAttr(e, 'label')} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>初始值</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children'>
                                                <Input value={editItem.initialValue} onChange={e => changeItemAttr(e, 'initialValue')} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>标签空间</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children'>
                                                <Input value={editItem.labelCol} onChange={e => changeItemAttr(e, 'labelCol')} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>输入区空间</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children'>
                                                <Input value={editItem.wrapperCol} onChange={e => changeItemAttr(e, 'wrapperCol')} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Form.create()(EditField)