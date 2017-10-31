/*
 * @Author: wjm
 * @Date:   2017-09-21 16:54:51
 * @Last Modified by: 孔祥超
 * @Last Modified time: 2017-09-28 20:59:49
 */
const api = [{
    id: 'oApp/getCode',
    apidesc: '',
    para: [{
      name: '',
      desc: '',
      datatype: ''
    }],
    checked: false
  },
  {
    id: 'oApp/login',
    apidesc: '',
    para: [{
      name: '',
      desc: '',
      datatype: ''
    }],
    checked: false
  },
  {
    id: 'oApp/getAllOperate',
    apidesc: '',
    para: [{
      name: '',
      desc: '',
      datatype: ''
    }],
    checked: false
  },
  {
    id: 'webAdmin/deleteUserAccountByUserName',
    apidesc: '删除用户账号接口',
    para: [{
      name: 'userNames',
      desc: '要删除的用户名字符串json【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'webAdmin/getTitlePermission',
    apidesc: '获取栏目权限接口',
    para: [{
      name: 'lmid',
      desc: '栏目id【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'webAdmin/getUserInfoAndBuinessInfoList',
    apidesc: '获取用户和企业列表接口',
    para: [{
      name: 'lmid',
      desc: '账号查询条件',
      datatype: 'string'
    }, {
      name: 'zhzt',
      desc: '账户状态查询条件',
      datatype: 'string'
    }, {
      name: 'ntype',
      desc: '企业类型查询条件',
      datatype: 'string'
    }, {
      name: 'nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: 'pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'webAdmin/tokenWhetherPast',
    apidesc: '验证票据是否过期接口',
    para: [{
      name: '',
      desc: '',
      datatype: ''
    }],
    checked: false
  },
  {
    id: 'webAdmin/updateZhztByUserName',
    apidesc: '企业管理账户状态开通或用户管理账户状态开通接口',
    para: [{
      name: 'status',
      desc: '状态开通和禁用[已开通/已禁用]【必填】',
      datatype: 'string'
    }, {
      name: 'userNames',
      desc: '要删除的用户名字符串json【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'webAdmin/ebGetLmTreeByRole',
    apidesc: '根据角色调整生成栏目树(需要票据)',
    para: [{
      name: 'puuid',
      desc: '父栏目id(根节点可不传)',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'webAdmin/webGetWzListByRole',
    apidesc: '根据角色调整管理栏目下文章(需要票据)',
    para: [{
      name: 'puuid',
      desc: '父栏目id',
      datatype: 'string'
    }, {
      name: 'nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: 'pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'webAdmin/webUpdateBatch',
    apidesc: '批量更新接口',
    responsetype: '',
    para: [{
      name: 'setMap',
      desc: '数据表id:tableid、更新信息{\'字段1(中文)\':\'字段1值\'}',
      datatype: 'string'
    }, {
      name: 'uuids',
      desc: 'uuid json[\'uuid1\',\'uuid2\']',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/webSaveForm',
    apidesc: '数据保存和数据更新接口',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'param',
      desc: '数据信息json',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/webSelectForm',
    apidesc: '数据获取接口',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'uuid',
      desc: '数据uuid',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'webAdmin/saveWZForm',
    apidesc: '数据保存文章接口',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'param',
      desc: '数据信息json',
      datatype: 'string'
    }, {
      name: 'lmids',
      desc: '栏目id',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/commonSort',
    apidesc: '数据保存文章接口',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'param',
      desc: '数据信息json',
      datatype: 'string'
    }, {
      name: 'lmids',
      desc: '栏目id json',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/webCommonDelByIds',
    apidesc: '通用删除方法',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'uuids',
      desc: '要删除的uuid json',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/webCommonFileList',
    apidesc: '获取文件列表',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'uuid',
      desc: '主表id',
      datatype: 'string'
    }, {
      name: 'fieldName',
      desc: '文件fieldName类型',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/webDownload',
    apidesc: '网站附件下载接口(无需登录、出库)',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'uuid',
      desc: 'uuid',
      datatype: 'string'
    }, {
      name: 'isBase64',
      desc: 'isBase64',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/addUserToPost',
    apidesc: '插入人员与岗位对应关系',
    para: [{
      name: 'gwid',
      desc: '岗位id',
      datatype: 'string'
    }, {
      name: 'userids',
      desc: '人员编号',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/deletePostNameInfo',
    apidesc: '删除岗位名称信息接口',
    para: [{
      name: 'xh',
      desc: '要删除的,号隔开的xh主键',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getAllFrontById',
    apidesc: '网站用获取操作列表接口',
    para: [{
      name: 'frontId',
      desc: '操作集节点ID',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getArticle',
    apidesc: '文章浏览接口',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'uuid',
      desc: '数据uuid',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getArticleCommentCountAndAvg',
    apidesc: '获取文章评论总数和获取文章评论平均数接口',
    para: [{
      name: 'wzid',
      desc: '文章id【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getArticleList',
    apidesc: '搜索文章列表',
    para: [{
      name: 'searchKey',
      desc: '搜索文章模糊查询条件【必填】',
      datatype: 'string'
    }, {
      name: 'nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: 'pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'web/getArticleTitleClickList',
    apidesc: '获取文章标题点击率列表',
    para: [{
      name: 'size',
      desc: '条数',
      datatype: 'number'
    }, {
      name: 'qx',
      desc: '权限',
      datatype: 'string'
    }, {
      name: ' puuid ',
      desc: '栏目id ',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getAuditList',
    apidesc: '审核不通过,审核通过 ,未审核列表（文章评论）',
    para: [{
      name: 'sh',
      desc: '审核[0为审核不通过,1为审核过,空为未审核,其他为所有]',
      datatype: 'number'
    }, {
      name: 'lmid',
      desc: '栏目id【必填】',
      datatype: 'string'
    }, {
      name: 'nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: 'pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'web/getBusinessRecommendList',
    apidesc: '商家推荐列表和所有列表接口',
    para: [{
      name: 'ntype',
      desc: '推荐/栏目下所有子文章[默认商家推荐]',
      datatype: 'string'
    }, {
      name: 'lmid',
      desc: '栏目id【必填】',
      datatype: 'string'
    }, {
      name: 'nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: 'pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'web/getChildLmWz',
    apidesc: '获取某栏目下,子栏目下的指定名称子栏目下的推荐文章',
    para: [{
      name: 'lmid',
      desc: '栏目id【必填】',
      datatype: 'string'
    }, {
      name: 'childlmmc',
      desc: '子栏目名称',
      datatype: 'string'
    }, {
      name: 'sftj',
      desc: '是否推荐【默认推荐为：1】',
      datatype: 'number'
    }, {
      name: 'nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: 'pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'web/getDepartmentPersionnelTreeList',
    apidesc: '人员部门人员树列表接口(设置岗位)',
    para: [{
      name: 'lsid',
      desc: '根节点部门Id(不填为全部树)',
      datatype: 'string'
    }, {
      name: 'gwid',
      desc: '要选中的岗位树',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getLmidByWzid',
    apidesc: '根据文章id获取所在栏目id接口',
    para: [{
      name: 'wzid',
      desc: '文章id',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getLmzdyzdList',
    apidesc: '获取栏目自定义字段管理列表接口',
    para: [{
      name: 'lmid',
      desc: '栏目id',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'oApp/login',
    apidesc: '用户登录',
    para: [{
      name: '',
      desc: ' ',
      datatype: ''
    }],
    checked: false
  },
  {
    id: 'web/getOptionVoteResultBySubjectId',
    apidesc: '投票主题所有选项的投票结果接口',
    para: [{
      name: 'subjectId',
      desc: '主题id',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getPostNameInfo',
    apidesc: '获取岗位信息接口',
    para: [{
      name: '',
      desc: '',
      datatype: ''
    }],
    checked: false
  },
  {
    id: 'web/getTitleChildCountList',
    apidesc: '栏目子列表分页接口',
    para: [{
      name: 'puuid',
      desc: '节点id',
      datatype: 'string'
    }, {
      name: 'nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: 'pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'web/getTitleNameLimitList',
    apidesc: '树形栏目名称对应权限列表接口',
    para: [{
      name: 'puuid',
      desc: '节点id【必填】',
      datatype: 'string'
    }, {
      name: 'jsid',
      desc: '岗位id【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getTitleTree',
    apidesc: '获取栏目树接口',
    para: [{
      name: 'puuid',
      desc: '节点id',
      datatype: 'string'
    }, {
      name: 'level',
      desc: '树的层数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'web/getVoteSubjectDetailInfo',
    apidesc: '获取投票主题详情接口',
    para: [{
      name: 'subjectId',
      desc: '主题id【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/insertLimitInfo',
    apidesc: '插入栏目对应权限接口',
    para: [{
      name: 'UUID',
      desc: '主键',
      datatype: 'string'
    }, {
      name: 'LMID',
      desc: '栏目id【必填】',
      datatype: 'string'
    }, {
      name: 'LLQX',
      desc: '浏览权限',
      datatype: 'string'
    }, {
      name: 'TJQX',
      desc: '添加权限',
      datatype: 'string'
    }, {
      name: 'XGQX',
      desc: '修改权限',
      datatype: 'string'
    }, {
      name: 'SCQX',
      desc: '删除权限',
      datatype: 'string'
    }, {
      name: 'ZDQX',
      desc: '置顶权限',
      datatype: 'string'
    }, {
      name: 'SHQX',
      desc: '审核权限',
      datatype: 'string'
    }, {
      name: 'WZTJ',
      desc: '推荐权限',
      datatype: 'string'
    }, {
      name: 'GRQX',
      desc: '个人权限',
      datatype: 'string'
    }, {
      name: 'jsid',
      desc: '岗位id【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/insertLmglInfo',
    apidesc: '快速插入栏目接口',
    para: [{
      name: 'puuid',
      desc: '上层栏目id',
      datatype: 'string'
    }, {
      name: 'lmmcs',
      desc: '栏目名称[,号隔开的字符串]',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/insertOrUpdatePostNameInfo',
    apidesc: '插入岗位名称信息和修改岗位名称信息接口',
    para: [{
      name: 'XH',
      desc: '主键【必填】',
      datatype: 'string'
    }, {
      name: 'MC',
      desc: '岗位名称【必填】',
      datatype: 'string'
    }, {
      name: 'XXMS',
      desc: '信息描述【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/lw',
    apidesc: '网站用获取导航菜单接口',
    para: [{
      name: 'puuid',
      desc: '父主键id',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/pasteTitleAndFieldInfo',
    apidesc: '粘贴接口',
    para: [{
      name: 'lmid',
      desc: '复制的栏目id',
      datatype: 'string'
    }, {
      name: 'puuid',
      desc: '新的栏目的父节点id',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/qyglOrYhglRegister',
    apidesc: '注册接口',
    para: [{
      name: 'yhmc',
      desc: '账户名称',
      datatype: 'string'
    }, {
      name: 'mm',
      desc: '账户密码',
      datatype: 'string'
    }, {
      name: 'manageType',
      desc: '网站使用下的岗位名称',
      datatype: 'string'
    }, {
      name: 'nc',
      desc: '昵称',
      datatype: 'string'
    }, {
      name: 'checkCode',
      desc: '验证码',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/ueditorController',
    apidesc: 'ueditor核心控制类',
    para: [{
      name: 'action',
      desc: '请求地址',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/updateSfxsByUuid',
    apidesc: '文章发布接口',
    para: [{
      name: 'uuid',
      desc: '主键',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/updateWhetherPassByUuid',
    apidesc: '审核不通过和审核通过接口(文章评论)',
    para: [{
      name: 'whetherPassType',
      desc: '通过不通过区分[pass/nopass默认不通过]',
      datatype: 'string'
    }, {
      name: 'uuids',
      desc: '要更新的uuid json【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/updateWhetherRecommendOrUpByUuid',
    apidesc: '文章是否推荐和文章是否置顶和取消推荐接口',
    para: [{
      name: 'sftj',
      desc: '文章推荐',
      datatype: 'string'
    }, {
      name: 'sfzd',
      desc: '文章置顶',
      datatype: 'string'
    }, {
      name: 'cancleRecommend',
      desc: '取消推荐',
      datatype: 'string'
    }, {
      name: 'uuids',
      desc: '要更新的uuid json【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/webDelFile',
    apidesc: '删除附件接口',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'fileId',
      desc: '文件id',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/webGetLMWZList',
    apidesc: '获取栏目文章分页列表（base64图）',
    para: [{
      name: 'puuid',
      desc: '栏目节点id',
      datatype: 'string'
    }, {
      name: 'nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: 'pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'web/webGetParentsLmByWzid',
    apidesc: '获取文章祖辈节点集合',
    para: [{
      name: 'wzid',
      desc: '文章id【必填】',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/webGetSimpleGridList',
    apidesc: '审核不通过和审核通过接口(文章评论)',
    para: [{
      name: 'tableid',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'orderFields',
      desc: '排序中文字段json数组,以-号开头为倒序',
      datatype: 'string'
    }, {
      name: 'searchKeyFields',
      desc: '中文字段名json数组（用于模糊查询searchKey）',
      datatype: 'string'
    }, {
      name: 'filter',
      desc: '过滤的json配置:{\'searchKey\':\'xxxxxx\',\'字段_1\':\'xxxxxx\'}',
      datatype: 'string'
    }, {
      name: 'isPaging',
      desc: '是否分页：默认true',
      datatype: 'boolean'
    }, {
      name: 'nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: 'pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'web/webGetWZLB',
    apidesc: '文章列表分页和文章推荐列表分页',
    para: [{
      name: ' sftj ',
      desc: '是否推荐列表和文章列表区分[默认是文章列表]',
      datatype: 'string'
    }, {
      name: ' LMID',
      desc: '栏目id',
      datatype: 'string'
    }, {
      name: ' nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: ' pageSize',
      desc: '显示行数',
      datatype: 'number'
    }, {
      name: ' filter',
      desc: '过滤的json配置:{\'searchKey\':\'xxxxxx\',\'字段_1\':\'xxxxxx\'}',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/webGetWZPLLB',
    apidesc: '获取文章评论分页列表',
    para: [{
      name: ' WZID',
      desc: '文章id',
      datatype: 'string'
    }, {
      name: ' nowPage',
      desc: '页码',
      datatype: 'number'
    }, {
      name: ' pageSize',
      desc: '显示行数',
      datatype: 'number'
    }],
    checked: false
  },
  {
    id: 'web/webUpload',
    apidesc: '网站附件上传接口(无需登录、入库)',
    para: [{
      name: 'tableId',
      desc: '数据表id',
      datatype: 'string'
    }, {
      name: 'ATTACH_ID',
      desc: 'attachId',
      datatype: 'string'
    }, {
      name: 'UUID',
      desc: 'uuid',
      datatype: 'string'
    }, {
      name: 'FIELDNAME',
      desc: 'fieldName',
      datatype: 'string'
    }, {
      name: 'FILENAME',
      desc: 'fileName',
      datatype: 'string'
    }, {
      name: 'file',
      desc: '上传文件',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getMatterInfo',
    apidesc: '投票主题所有选项的投票结果接口',
    para: [{
      name: 'subjectId',
      desc: '主题id ',
      datatype: 'string'
    }],
    checked: false
  },
  {
    id: 'web/getBMList',
    apidesc: '获取部门列表结果接口',
    para: [{
      name: '',
      desc: '',
      datatype: ''
    }],
    checked: false
  },
  {
    id: 'web/getSpMattersList',
    apidesc: '获取事项列表接口',
    para: [{
      name: '',
      desc: '',
      datatype: ''
    }],
    checked: false
  }
  // -----------以上没错误-------------

];
module.exports = api;
