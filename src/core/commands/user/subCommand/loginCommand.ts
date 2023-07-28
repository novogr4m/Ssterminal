import { CommandType } from "../../../command";
import { userLogin } from "../api/userApi";
import { useUserStore } from "../store/userStore";

/**
 * 用户登录命令
 * @author Spike
 * @date 2023-07-27
 */
const loginCommand: CommandType = {
    func: "login",
    name: "用户登录",
    alias: ["log"],
    options: [
        {
            key: "username",
            desc: "用户名",
            alias: ["u"],
            type: "string",
            required: true,
        },
        {
            key: "password",
            desc: "密码",
            alias: ["p"],
            type: "string",
            required: true,
        },
    ],
     async action(options, terminal) {
        const { login } = useUserStore();
        const { username, password } = options;
        //检查是否有输入
        if (!username) {
            terminal.writeTextErrorResult("请输入用户名");
            return;
        }
        if (!password) {
            terminal.writeTextErrorResult("请输入密码");
            return;
        }
        //调用store的登录方法
        const res: any =await login(username, password);
             
        if (res?.code==0) {
            terminal.writeTextSuccessResult("登录成功");
        } else {
            terminal.writeTextErrorResult(res?.message ?? "登录失败");
        }
    },
};


export default loginCommand;
