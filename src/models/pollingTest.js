import PubSub from "pubsub-js";

export default {

    namespace: 'pollingTest',

    state: {
        
    },

    subscriptions: {
        
        tianjia({dispatch}){

            //建立一个名为  tianjia (Array or string) 的轮询  建立轮询可以写在任何地方
            PubSub.publish('Polling.addsubscribe',["tianjia"])


            //接受名为添加的轮询
            return PubSub.subscribe("tianjia",()=>{
                //dispatch请求
                dispatch({
                    type:"sendrequest"
                })

                //或者

                /*
                //直接在这里发送请求  在回调里dispatch
                    sendrequest(data,()=>{
                        dispatch({
                            type:"save"
                        })
                    })
                */
            })
        }
    },

    effects: {
        *sendrequest({ payload }, { call, put }) {
            // eslint-disable-line
            yield put({ type: 'save' });
        },
    },

    reducers: {
        save(state,action){
            console.log("*******回调")
            return { ...state};
        }
    },

    
};
