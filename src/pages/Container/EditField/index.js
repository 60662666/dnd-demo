import React, { useContext, useState } from 'react'
import { Row, Col, Input, Tabs, Select, Tooltip } from 'antd'

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
    const { editItem, index, handleEditItem, getFieldDecorator, FormItem } = props
    const formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    }
    const changeItemAttr = (v, code) => {
        let value = ''
        if (typeof v === 'string' || typeof v === 'boolean') {
            value = v
        } else {
            value = v.target.value
        }
        handleEditItem(value, code, index)
    }
    const showRulesModal = () => {
        console.log('打开校验规则对话框')
    }
    const showModifyModal = () => {
        console.log('打开子项对话框')
    }
    const modifyOpts = () => {
        console.log('打开子项对话框')
    }
    return (
        <div style={{ ...style }}>
            <Tabs defaultActiveKey='1' type="card">
                <TabPane tab="基础信息" key="1">

                    <Row>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="主交易码">
                                {getFieldDecorator('mainTransCode', {
                                    rules: [{ required: true, message: '主交易码必须输入！' }],
                                })(
                                    <Input />
                                    // <Select placeholder="Please select a country">
                                    //     <Option value="china">China</Option>
                                    //     <Option value="usa">U.S.A</Option>
                                    // </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="页面名称">
                                {getFieldDecorator('pageName', {
                                    rules: [{ required: true, message: '页面名称必须输入！' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
            <Tabs defaultActiveKey='1' type="card">
                <TabPane tab="当前编辑项" key="1">
                    {
                        // 公共编辑部分
                        editItem ?
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
                                        <label>校验规则</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children' onClick={showRulesModal}>
                                                <Input value={editItem.rules} readOnly placeholder='点击编辑校验规则' />
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
                                                <Tooltip title='标签与输入区空间之和应不超过24'>
                                                    <Input value={editItem.labelCol} onChange={e => changeItemAttr(e, 'labelCol')} />
                                                </Tooltip>
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
                                                <Tooltip title='标签与输入区空间之和应不超过24'>
                                                    <Input value={editItem.wrapperCol} onChange={e => changeItemAttr(e, 'wrapperCol')} />
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                    {
                        editItem && editItem.type === 'textarea' ?
                            <div>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>最小行数</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children'>
                                                <Input value={editItem.autoSize.minRows} onChange={e => changeItemAttr(e, 'autoSize.minRows')} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>最大行数</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children'>
                                                <Input value={editItem.autoSize.maxRows} onChange={e => changeItemAttr(e, 'autoSize.maxRows')} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                    {
                        editItem && editItem.type === 'select' ?
                            <div>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>下拉选项</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children' onClick={showModifyModal}>
                                                <Input value={editItem.options} readOnly />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                    {
                        editItem && editItem.type === 'datepicker' ?
                            <div>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>日期格式</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children'>
                                                <Tooltip title='请输入YYYY-MM-DD、YYYYMMDD、YYYY-MM-DD HH:mm:ss等标准格式'>
                                                    <Input
                                                        value={editItem.format}
                                                        onChange={e => changeItemAttr(e, 'format')}
                                                    />
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='ant-form-item'>
                                    <Col span={7} className='ant-form-item-label'>
                                        <label>是否显示时间</label>
                                    </Col>
                                    <Col span={16} className='ant-form-item-control-wrapper'>
                                        <div className='ant-form-item-control'>
                                            <div className='ant-form-item-children'>
                                                <Select value={editItem.showTime} onChange={e => changeItemAttr(e, 'showTime')} >
                                                    <Option key='yes' value={true}>是</Option>
                                                    <Option key='no' value={false}>否</Option>
                                                </Select>
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
export default EditField