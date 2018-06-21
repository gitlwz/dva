export default {

    namespace: 'otherRecharge',

    state: {

    },

    subscriptions: {

    },

    effects: {
        *sendrequest({ payload }, { call, put }) {
            // eslint-disable-line
            yield put({ type: 'save' });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state };
        }
    },


};
