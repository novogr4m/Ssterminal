import { CommandType } from "../../command";

/** 
*   全屏命令
*   @author Spike
*   @date 2023-07-25
*/

const fullScreenCommand: CommandType = {
    func: 'fullscreen',
    name: '页面全屏',
    alias: ['fl'],
    params: [],
    options: [],
    action(): void{
        //document.fullscreenElement返回当前页面是否是全屏状态
        let isFull = document.fullscreenElement;
        if (!isFull) {
            //不是则全屏
            document.documentElement.requestFullscreen();
            console.log(document.documentElement);
            
        } else {
            //已是状态输入命令则退出全屏
            document.exitFullscreen();
        }
    }
}

export default fullScreenCommand;