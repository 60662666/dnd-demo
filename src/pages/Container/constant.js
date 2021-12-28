export const SOURCE_ITEMS = [
    {
        type: 'input',
        name: '单行文本',
        itemCode: 'defaultCode',// 表单项唯一的名称，必输
        initialValue: '',// 表单项默认值
        label: '默认字段名',// 标签名称，必输
        labelCol: 6,// 标签占用格数
        wrapperCol: 18,// 输入框占用格数
        rules: [],// 校验规则
        spanSpace: 8, //该表单项本身所占空间
        isHovered: false,
    },
    {
        type: 'textarea',
        name: '多行文本',
        itemCode: 'defaultCode',// 表单项唯一的名称，必输
        initialValue: '',// 表单项默认值
        label: '默认字段名',// 标签名称，必输
        labelCol: 6,// 标签占用格数
        wrapperCol: 18,// 输入框占用格数
        autoSize: { minRows: 1, maxRows: 1 },
        rules: [],// 校验规则
        spanSpace: 8, //该表单项本身所占空间
        isHovered: false,
    },
    {
        type: 'select',
        name: '下拉选择框',
        itemCode: 'defaultCode',// 表单项唯一的名称，必输
        initialValue: '',// 表单项默认值
        options: [],// 下拉框的Option
        label: '默认字段名',// 标签名称，必输
        labelCol: 6,// 标签占用格数
        wrapperCol: 18,// 输入框占用格数
        rules: [],// 校验规则
        spanSpace: 8, //该表单项本身所占空间
        isHovered: false,
    },
    {
        type: 'datepicker',
        name: '日期选择器',
        itemCode: 'defaultCode',// 表单项唯一的名称，必输
        initialValue: null,// 表单项默认值
        format: 'YYYY-MM-DD',//datePicker专有项，日期格式
        label: '默认字段名',// 标签名称，必输
        showTime: false,
        labelCol: 6,// 标签占用格数
        wrapperCol: 18,// 输入框占用格数
        rules: [],// 校验规则
        spanSpace: 8, //该表单项本身所占空间
        isHovered: false,
    }
]