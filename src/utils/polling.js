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
                PubSub.publish(name.name,name.payload);
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
            PubSub.publish(__name.name,__name.payload);
        })
        let _arr = Polling.pollingFun.filter((item)=>{ return !_name.find(ele=>ele.name === item.name) })
        _arr.push(..._name);
        Polling.pollingFun = _arr;
    },

    delsubscribe(names){
        let _name = []
        if(Object.prototype.toString.call(names) === `[object Array]`){
            _name = [...names];
        }else{
            _name = [names];
        }
        for (let index = Polling.pollingFun.length-1; index >= 0; index--) {
            if(_name.find(ele=>ele === Polling.pollingFun[index].name)){
                Polling.pollingFun.splice(index,1);
            }
        }
    }
}
Polling.init()