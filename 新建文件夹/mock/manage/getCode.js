const getCode = {
      'code':
      'idt-oApp-5000',
      'message':
      '操作成功',
      'data': {
            'image': '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',
            'key': '1505797437302'
      }
};
module.exports = getCode;
