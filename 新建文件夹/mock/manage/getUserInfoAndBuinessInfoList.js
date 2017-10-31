// 接口描述:获取用户和企业列表接口
// 接口详细地址:/webAdmin/getUserInfoAndBuinessInfoList
// 参数: 账号查询条件:lmid、账户状态查询条件:zhzt、企业类型查询条件：ntype
// 、页码:nowPage、显示行数:pageSize
const getUserInfoAndBuinessInfoList = {
  "code": "idt-oApp-5000",
  "message": "操作成功",
  "data": {
    "nextPage": 2,
    "totalRows": 50,
    "DataList": [
      {
        "NAME": "lxd222222",
        "INSERT_DATE": 1505459774000,
        "NTYPE": "电商",
        "ODY": 1,
        "UUID": "fd5d3b0299e711e7b4f74d03100ba767",
        "NC": "商家lv",
        "ZHZT": "已开通"
      }
    ],
    "previousPage": 1,
    "totalPages": 4
  }
};
module.exports = getUserInfoAndBuinessInfoList;
// 注：可根据具体的【账号查询条件】、【账户状态查询条件】、【企业类型查询条件】c查询想要的结果,不根据条件查询默认查询所有
