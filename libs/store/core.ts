import { ActionContext } from 'vuex'

interface CoreDefine {
  testStr: string;
}

const core = {
  namespaced: true,
  state: {
    testStr: 'Hello world'
  },
  mutations: {
    setStr (state: CoreDefine, str: string) {
      state.testStr = str
    }
  },
  actions: {
    setStr (context: ActionContext<CoreDefine, any>, str: string) {
      context.commit('setStr', str)
    }
  },
  getters: {
    str: (state: CoreDefine) => state.testStr
  }
}
export default core
