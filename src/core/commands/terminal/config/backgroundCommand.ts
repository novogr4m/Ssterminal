import { CommandType } from "../../../command";
import { useTerminalConfigStore } from "./store/terminalConfigStore";
import request from "@/utils/request";

/**
 * 切换终端背景
 * 
 */
const backgroundCommand: CommandType = {
  func: "background",
  name: "切换终端背景",
  alias: ["bg"],
  params: [
    {
      key: "url",
      desc: "图片地址（不填则随机）",
      required: false,
    },
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    let url = _[0];
    if (_.length > 0) {
      url = _[0];
    }
    const { setBackground } = useTerminalConfigStore();
    if (!url) {
      // 随机获取壁纸
      const res = await request.post("/background/get/random");
      setBackground(res.data);
    }
      //有地图地址
    setBackground(url);
  },
};

export default backgroundCommand;
