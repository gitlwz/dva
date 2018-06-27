import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';

//全局模块信息
export default {

  namespace: 'app',
  state: {
    theme: 'dark', //当前主题颜色
    visible: false,
    currtLanguage: 'China',
    imgList: [],

    questionList: [],
    questionParams: {
      email: '',
      problemBody: '',
      problemType: '',
      problemPhoto: ''
    },
    resultFlag: '',
    returnInfo: {}
  },

  effects: {
    //查询轮播图列表
    *findAllSlideshow({ payload }, { call, put }) {
      const { data } = yield call(baseService, api.baseConfig.findAllSlideshow, payload);
      if (data != undefined)
        yield put({
          type: 'save',
          payload: {
            imgList: data
          }
        })
    },

    * findAllQuestions({ payload }, { call, put }) {
      const { data } = yield call(baseService, api.user.findAllQuestions, payload);
      if (data != undefined)
        yield put({
          type: 'save',
          payload: {
            questionList: data
          }
        })
    },

    * customerProblems({ payload }, { call }) {
      yield call(baseService, api.user.customerProblems, payload);
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },
};
