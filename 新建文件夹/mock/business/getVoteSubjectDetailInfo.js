// 接口描述:获取投票主题详情接口
// 接口详细地址:/web/getVoteSubjectDetailInfo
// 参数:主题id【必填】：subjectId
const getVoteSubjectDetailInfo= {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': {
    'voteSubjectMap': [
      {
        'TPXZ': '',
        'XXLX': '',
        'FLMC': '红城社区',
        'XXNR': '增加社区市民锻炼器械',
        'DXFS': '单选',
        'CJSJ': '',
        'CJR': '',
        'MS': '您认为社区目前最应该改善哪方面工作',
        'ZT': '您认为社区目前最应该改善哪方面工作?'
      }
    ]
  }
};
module.exports = getVoteSubjectDetailInfo;
