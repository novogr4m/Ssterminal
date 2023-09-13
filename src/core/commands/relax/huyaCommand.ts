import { CommandType } from "../../command";

/**
 *  虎牙直播搜索命令
 *  @author Spike
 *  @date  2023-07-25
 */
const huyaCommand: CommandType = {
    func: "huya",
    name: "虎牙直播",
    alias: [],
    params: [
        {
            key: "word",
            desc: "搜索内容|搜索房间号",
            required:true
        },
    ],
    options: [
        {
            key: "liveNo",
            desc: "以房间号打开",
            alias: ["n"],
            type: "boolean",
            defaultValue:false
        },
        {
            key: "self",
            desc: "是否当前页面打开",
            alias: ["s"],
            type: "boolean",
            defaultValue:false
        },
    ],
    action(options, terminal) {
        const { _,self,liveNo } = options;
        const word = _.length > 0 ? _[0] : '';
        // const liveNo = _.length>0
        //跳转地址
        let targetLink = `https://www.huya.com/search?hsk=${word}`
        if (liveNo) {
            targetLink = `https://www.huya.com/${word}`
        }
        
        if (self) {
            window.location.href = targetLink;
        } else {
            window.open(targetLink);
        }   
    }
}

export default huyaCommand;