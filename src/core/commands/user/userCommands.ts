import { CommandType } from "../../command";
import registerCommand from "./subCommand/registerCommand";
import loginCommand from "./subCommand/loginCommand";
import { getLoginUser } from "./api/userApi";
import { useUserStore } from "./store/userStore";
import { LOCAL_USER } from "./userConstant";
import logoutCommand from "./subCommand/logoutCommand";

/**
 * 用户命令
 * @author Spike
 */
const userCommand: CommandType = {
  func: "user",
  name: "用户登录|用户注册|退出",
  alias: [],
  params: [
    {
      key: "subCommand",
      desc: "子命令",
      required: true,
    },
  ],
  subCommands: {
    login: loginCommand,
    register: registerCommand,
    logout: logoutCommand,
  },
  options: [],
  async action(options, terminal) {
    const { loginUser } = useUserStore();
    if (loginUser && loginUser.username !== LOCAL_USER.username) {
      let text = `当前用户：${loginUser.username}`;
      if (loginUser.email) {
        text += ` ${loginUser.email}`;
      }
      terminal.writeTextResult(text);
    } else {
      terminal.writeTextErrorResult("未登录，请执行 user login 命令登录");
    }
  },
};

export default [userCommand];
