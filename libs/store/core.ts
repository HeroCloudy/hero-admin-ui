import { ActionContext } from 'vuex'

interface TagInfo {
  fullPath: string;
  meta: any;
  name?: string;
  params?: string;
  path: string;
  query?: string;
  title: string;
}

export interface CoreDefine {
  testStr: string;
  tagsViewList: TagInfo[];
}

const TAGS_VIEW = 'TAGS_VIEW'

const core = {
  namespaced: true,
  state: {
    testStr: 'Hello world',
    tagsViewList: JSON.parse(sessionStorage.getItem(TAGS_VIEW) || '[]') || []
  },
  mutations: {
    setStr (state: CoreDefine, str: string) {
      state.testStr = str
    },
    addTagsViewList (state: CoreDefine, tag: TagInfo) {
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        sessionStorage.setItem(TAGS_VIEW, JSON.stringify(state.tagsViewList))
      }
    },
    removeTagsView (state: CoreDefine, payload: { type: 'other' | 'index', index: number}) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      }
      sessionStorage.setItem(TAGS_VIEW, JSON.stringify(state.tagsViewList))
    }
  },
  actions: {
    setStr (context: ActionContext<CoreDefine, any>, str: string) {
      context.commit('setStr', str)
    }
  },
  getters: {
    str: (state: CoreDefine) => state.testStr,
    tagsViewList: (state: CoreDefine) => state.tagsViewList
  }
}
export default core
