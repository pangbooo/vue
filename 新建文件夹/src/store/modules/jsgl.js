// initial state
// shape: [{ id, quantity }]
const state = {
  jsgl: {}
};

// getters
const getters = {
  getjs(state) {
    return state.jsgl;
  }
};

// actions
const actions = {
};

// mutations
const mutations = {
  setjsgl(state, object) {
    state.jsgl[object.UUID] = object;
  },
  deletejsgl(state, object) {
    delete state.jsgl[object.UUID];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
