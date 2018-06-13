import PubSub from "pubsub-js";
let Polling = {
    pollingFun:[],
    time:2000,

    init(){
        Polling.interval();
        PubSub.subscribe('Polling.addsubscribe',(name,params)=>Polling.addsubscribe(params));
        PubSub.subscribe('Polling.delsubscribe',(name,params)=>Polling.delsubscribe(params));
    },
    interval(){
        setInterval(()=>{
            Polling.pollingFun.forEach((name)=>{
                PubSub.publish(name);
            })
        },Polling.time)
    },

    addsubscribe(names){
        let _name = [];
        if(Object.prototype.toString.call(names) === `[object Array]`){
            _name = [...names];
        }else{
            _name = [names];
        }
        _name.forEach((__name)=>{
            PubSub.publish(__name);
        })
        Polling.pollingFun.push(..._name);
    },

    delsubscribe(names){
        let _name = []
        if(Object.prototype.toString.call(names) === `[object Array]`){
            _name = [...names];
        }else{
            _name = [names];
        }
        for (let index = Polling.pollingFun.length; index >= 0; index--) {
            if(_name.includes(Polling.pollingFun[index])){
                Polling.pollingFun.splice(index,1);
            }
        }
    }
}
Polling.init()