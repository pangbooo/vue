/*
    作者：李文达Leo
    手机：15040481637
    时间：2017年8月2日
    模块：文章管理
*/

// initial state
// shape: [{ id, quantity }]
const state = {
  star: {
    uuid: '',
    // main
    wzbt: '',
    wzbtlength: 0,
    nrbtchecked: false, // 内容标题checked
    dbtchecked: false, // 短标题checked
    fbtchecked: false, // 副容标题checked
    ytchecked: false, // 引题checked
    nrbt: '在此编辑文章内容star',
    dbt: '',
    fbt: '',
    yt: '',
    zz: '', // 作者、编辑、来源
    bj: '',
    ly: '',
    tzdzchecked: false, // 跳转地址
    tzdz: '',
    btt: '', // 标题图
    bq: '', // 标签、关键字
    gjzchecked: false,
    gjz: '',
    zynrchecked: false, // 摘要内容
    zynr: '',
    btspchecked: false, // 视频选择
    btsp: '',
    dqfj: 0, // 当前附件、附件列表
    fjlb: [],
    sfxs: true,
    // 基本属性
    isjbsx: true, // 是否是基本属性
    fbsj: '', // 发布时间
    xxsj: '', // 下线时间
    zyx: 10, // 重要性数值
    zdchecked: false, // 置顶checkbox是否选中
    ttchecked: false, // 头条checkbox是否选中
    zdks: '', // 置顶开始时间
    zdjs: '', // 置顶结束时间
    ttks: '', // 头条开始时间
    ttjs: '', // 头条结束时间
    djcs: 0, // 点击次数
    dqlm: '', // 当前栏目
    dqlmuuid: '',
    wztd: [], // 文章投递
    // 其他设置
    isjzpl: false, // 禁止评论checkbox
    isjzkb: false, // 禁止拷贝checkbox
    issfjm: false, // 禁止加密checkbox
    ipxz: 0, // ip限制
    ipxzoptions: [],
    isfwkz: false, // 访问控制checkbox
    fwcy: [], // 访问成员
    xgwz: '', // 相关文章

    fuzhi: false,
    fuzhiArr: [],
    jianqie: false,
    jianqieArr: [],
    isAddArticle: false
  },
  end: {
    uuid: '',
    // main
    wzbt: '',
    wzbtlength: 0,
    nrbtchecked: false, // 内容标题checked
    dbtchecked: false, // 短标题checked
    fbtchecked: false, // 副容标题checked
    ytchecked: false, // 引题checked
    nrbt: '',
    wznr: '在此编辑文章内容',
    dbt: '',
    fbt: '',
    yt: '',
    zz: '', // 作者、编辑、来源
    bj: '',
    ly: '',
    tzdzchecked: false, // 跳转地址
    tzdz: '',
    btt: '', // 标题图
    bq: '', // 标签、关键字
    gjzchecked: false,
    gjz: '',
    zynrchecked: false, // 摘要内容
    zynr: '',
    btspchecked: false, // 视频选择
    btsp: '',
    dqfj: 0, // 当前附件、附件列表
    fjlb: [],
    sfxs: true,
    // 基本属性
    isjbsx: true, // 是否是基本属性
    fbsj: '', // 发布时间
    xxsj: '', // 下线时间
    zyx: 10, // 重要性数值
    zdchecked: false, // 置顶checkbox是否选中
    ttchecked: false, // 头条checkbox是否选中
    zdks: '', // 置顶开始时间
    zdjs: '', // 置顶结束时间
    ttks: '', // 头条开始时间
    ttjs: '', // 头条结束时间
    djcs: 20, // 点击次数
    dqlm: '图片新闻', // 当前栏目
    dqlmuuid: '',
    wztd: [{
            'key': '1',
            'value': '当前站点>>政务公开',
            'checked': true
        }, {
            'key': '2',
            'value': '当前站点>>电子政务',
            'checked': true
        }], // 文章投递
    // 其他设置
    isjzpl: false, // 禁止评论checkbox
    isjzkb: false, // 禁止拷贝checkbox
    issfjm: false, // 禁止加密checkbox
    ipxz: 0, // ip限制
    ipxzoptions: [{
            'value': 0,
            'text': '任意ip'
        }, {
            'value': 1,
            'text': '管理员ip'
        }],
    isfwkz: false, // 访问控制checkbox
    fwcy: [], // 访问成员
    xgwz: '', // 相关文章

    fuzhi: false,
    fuzhiArr: [],
    jianqie: false,
    jianqieArr: [],
    isAddArticle: false
  }
};

// getters
const getters = {
  getuuid: state => state.end.uuid,
  getwzbt: state => state.end.wzbt,
  getwzbtlength: state => state.end.wzbtlength,
  getnrbtchecked: state => state.end.nrbtchecked,
  getdbtchecked: state => state.end.dbtchecked,
  getfbtchecked: state => state.end.fbtchecked,
  getytchecked: state => state.end.ytchecked,
  getnrbt: state => state.end.nrbt,
  getdbt: state => state.end.dbt,
  getfbt: state => state.end.fbt,
  getyt: state => state.end.yt,
  getzz: state => state.end.zz,
  getbj: state => state.end.bj,
  getly: state => state.end.ly,
  gettzdzchecked: state => state.end.tzdzchecked,
  gettzdz: state => state.end.tzdz,
  getbtt: state => state.end.btt,
  getbq: state => state.end.bq,
  getgjzchecked: state => state.end.gjzchecked,
  getgjz: state => state.end.gjz,
  getzynrchecked: state => state.end.zynrchecked,
  getzynr: state => state.end.zynr,
  getbtspchecked: state => state.end.btspchecked,
  getbtsp: state => state.end.btsp,
  getdqfj: state => state.end.dqfj,
  getfjlb: state => state.end.fjlb,
  getsfxs: state => state.end.sfxs,
  getisjbsx: state => state.end.isjbsx,
  getfbsj: state => state.end.fbsj,
  getxxsj: state => state.end.xxsj,
  getzyx: state => state.end.zyx,
  getzdchecked: state => state.end.zdchecked,
  getttchecked: state => state.end.ttchecked,
  getzdks: state => state.end.zdks,
  getzdjs: state => state.end.zdjs,
  getttks: state => state.end.ttks,
  getttjs: state => state.end.ttjs,
  getdjcs: state => state.end.djcs,
  getdqlm: state => state.end.dqlm,
  getwztd: state => state.end.wztd,
  getisjzpl: state => state.end.isjzpl,
  getisjzkb: state => state.end.isjzkb,
  getissfjm: state => state.end.issfjm,
  getipxz: state => state.end.ipxz,
  getipxzoptions: state => state.end.ipxzoptions,
  getisfwkz: state => state.end.isfwkz,
  getfwcy: state => state.end.fwcy,
  getxgwz: state => state.end.xgwz,
  getfuzhi: state => state.end.fuzhi,
  getfuzhiArr: state => state.end.fuzhiArr,
  getjianqie: state => state.end.jianqie,
  getjianqieArr: state => state.end.jianqieArr,
  getisAddArticle: state => state.end.isAddArticle
};

// actions
const actions = {
};

// mutations
const mutations = {
  setuuid(state, object) {
    state.end.uuid = object;
  },
  setwzbt(state, object) {
    state.end.wzbt = object;
  },
  setwzbtlength(state, object) {
    state.end.wzbtlength = object;
  },
  setnrbtchecked(state, object) {
    state.end.nrbtchecked = object;
  },
  setdbtchecked(state, object) {
    state.end.dbtchecked = object;
  },
  setfbtchecked(state, object) {
    state.end.fbtchecked = object;
  },
  setytchecked(state, object) {
    state.end.ytchecked = object;
  },
  setnrbt(state, object) {
    state.end.nrbt = object;
  },
  setwznr(state, object) {
    state.end.wznr = object;
  },
  setdqlmuuid(state, object) {
    state.end.dqlmuuid = object;
  },
  setdbt(state, object) {
    state.end.dbt = object;
  },
  setfbt(state, object) {
    state.end.fbt = object;
  },
  setyt(state, object) {
    state.end.yt = object;
  },
  setzz(state, object) {
    state.end.zz = object;
  },
  setbj(state, object) {
    state.end.bj = object;
  },
  setly(state, object) {
    state.end.ly = object;
  },
  settzdzchecked(state, object) {
    state.end.tzdzchecked = object;
  },
  settzdz(state, object) {
    state.end.tzdz = object;
  },
  setbtt(state, object) {
    state.end.btt = object;
  },
  setbq(state, object) {
    state.end.bq = object;
  },
  setgjzchecked(state, object) {
    state.end.gjzchecked = object;
  },
  setgjz(state, object) {
    state.end.gjz = object;
  },
  setzynrchecked(state, object) {
    state.end.zynrchecked = object;
  },
  setzynr(state, object) {
    state.end.zynr = object;
  },
  setbtspchecked(state, object) {
    state.end.btspchecked = object;
  },
  setbtsp(state, object) {
    state.end.btsp = object;
  },
  setdqfj(state, object) {
    state.end.dqfj = object;
  },
  setfjlb(state, object) {
    state.end.fjlb = object;
  },
  setsfxs(state, object) {
    state.end.sfxs = object;
  },
  setisjbsx(state, object) {
    state.end.isjbsx = object;
  },
  setfbsj(state, object) {
    state.end.fbsj = object;
  },
  setxxsj(state, object) {
    state.end.xxsj = object;
  },
  setzyx(state, object) {
    state.end.zyx = object;
  },
  setzdchecked(state, object) {
    state.end.zdchecked = object;
  },
  setttchecked(state, object) {
    state.end.ttchecked = object;
  },
  setzdks(state, object) {
    state.end.zdks = object;
  },
  setzdjs(state, object) {
    state.end.zdjs = object;
  },
  setttks(state, object) {
    state.end.ttks = object;
  },
  setttjs(state, object) {
    state.end.ttjs = object;
  },
  setdjcs(state, object) {
    state.end.djcs = object;
  },
  setdqlm(state, object) {
    state.end.dqlm = object;
  },
  setwztd(state, object) {
    state.end.wztd = object;
  },
  setisjzpl(state, object) {
    state.end.isjzpl = object;
  },
  setisjzkb(state, object) {
    state.end.isjzkb = object;
  },
  setissfjm(state, object) {
    state.end.issfjm = object;
  },
  setipxz(state, object) {
    state.end.ipxz = object;
  },
  setipxzoptions(state, object) {
    state.end.ipxzoptions = object;
  },
  setisfwkz(state, object) {
    state.end.isfwkz = object;
  },
  setfwcy(state, object) {
    state.end.fwcy = object;
  },
  setxgwz(state, object) {
    state.end.xgwz = object;
  },
  setfuzhi(state, object) {
    state.end.fuzhi = object;
  },
  setfuzhiArr(state, object) {
    state.end.fuzhiArr = object;
  },
  setjianqie(state, object) {
    state.end.jianqie = object;
  },
  setjianqieArr(state, object) {
    state.end.jianqieArr = object;
  },
  setisAddArticle(state, object) {
    state.end.isAddArticle = object;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
