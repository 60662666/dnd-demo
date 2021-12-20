export const SOURCE_ITEMS = [
    {
        type: 'input',
        name: 'Input',
        itemCode: '',// 表单项唯一的名称，必输
        initialValue: '',// 表单项默认值
        label: '默认字段名',// 标签名称，必输
        labelCol: 6,// 标签占用格数
        wrapperCol: 18,// 输入框占用格数
        rules: [],// 校验规则
        spanSpace: 8, //该表单项本身所占空间
    },
    {
        type: 'textarea',
        name: 'TextArea',
        itemCode: '',// 表单项唯一的名称，必输
        initialValue: '',// 表单项默认值
        label: '默认字段名',// 标签名称，必输
        labelCol: 6,// 标签占用格数
        wrapperCol: 18,// 输入框占用格数
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
        label: '默认字段名',// 标签名称，必输
        labelCol: 6,// 标签占用格数
        wrapperCol: 18,// 输入框占用格数
        rules: [],// 校验规则
        spanSpace: 8 //该表单项本身所占空间
    },
    {
        type: 'datepicker',
        name: 'Datepicker',
        itemCode: '',// 表单项唯一的名称，必输
        initialValue: null,// 表单项默认值
        label: '默认字段名',// 标签名称，必输
        labelCol: 6,// 标签占用格数
        wrapperCol: 18,// 输入框占用格数
        rules: [],// 校验规则
        spanSpace: 8 //该表单项本身所占空间
    }
]