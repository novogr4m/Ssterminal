import { CommandType } from "../../../command";
import { useUserStore } from "../store/userStore";

/**
 * 用户注销命令
 * @author Spike
 */
const logoutCommand: CommandType = {
    func: "logout",
    alias: ["out"],
    name: "用户注销",
    options: [],
    async action(options, terminal) {
        const { logout } = useUserStore();
        const res: any = await logout();
        if (res?.code === 200) {
            terminal.writeTextSuccessResult("已退出登录");
        } else {
            terminal.writeTextErrorResult(res?.message ?? "注销失败");
        }
    },
};

export default logoutCommand;
