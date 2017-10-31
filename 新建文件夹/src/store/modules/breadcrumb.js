/**
 * 该文件主要处理后台面包屑变量
 */
const state = {
      breadcrumnb: { bigtitle: '', childtitle: '' }
};
// getters
const getters = {
      breadcrumnb_bigtitle: state => state.breadcrumnb.bigtitle,
      breadcrumnb_childtitle: state => state.breadcrumnb.childtitle
};
// actions
const actions = {
};

// mutations
const mutations = {
      setbreadcrumnb_bigtitle(state, object) {
            state.breadcrumnb.bigtitle = object;
      },
      setbreadcrumnb_childtitle(state, object) {
            state.breadcrumnb.childtitle = object;
      }
};

export default {
  state,
  getters,
  actions,
  mutations
};
