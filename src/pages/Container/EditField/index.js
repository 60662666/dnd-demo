import React, { useContext, useState } from 'react'

const style = {
    position: 'relative',
    minHeight: 'calc(50vh - 92px)',
    overflowY: 'auto',
    marginTop: '10px',
    padding: '10px',
    paddingTop: '40px',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
}

export const EditField = ({ editItem, index }) => {
    return (
        <div style={{ ...style }}>
            基础信息
            查询交易码：<br />
            当前编辑项类型：<br />
            {
                editItem ? editItem.type : null
            }
            <br />
            当前编辑项索引：{index}
        </div>
    )
}