// 接口描述:获取事项的详细信息,包括事项办理流程
// 接口详细地址:/webAdmin/getSxInfo
// 参数:主题id：uuid
const getSXInfo= {
    'code': 'idt-oApp-5000',
    'message': '操作成功',
    'data': {
        'UUID': '5b1b9d9498f711e797369d7856db606a',
        '办件流水号': '201709060001',
        '许可类型': '行政许可',
        '事项名称': '企业核准登录',
        '分项名称': '企业核准登录',
        '办理主体':'工商行政管理局',
        '承诺办结时间':'1506516642039',
        '受理时间':'1506516642039',
        'flowlist': [
            { UUID: 'dddd', HJMC: '申请', BLR: '张三' , BLYJ: '同意',BLSJ:'1506516642039'},
            { UUID: 'sssasas', HJMC: '受理', BLR: '张三' , BLYJ: '同意',BLSJ:'1506516642039'},
            { UUID: 'sssasas', HJMC: '审批', BLR: '张三' , BLYJ: '同意',BLSJ:'1506516642039'}
        ],
        'bljglist':[
            {LX:'证照',MC:'卫生许可证','UUID':'32341234123'},
            {LX:'文书',MC:'卫生许可受理通知书','UUID':'32341234123'},
        ]
    }
};
module.exports = getSXInfo;
    