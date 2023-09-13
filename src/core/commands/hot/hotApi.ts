import request from "@/utils/request";

/**
 * 获取音乐热榜
 */
export const listHotMusics = async () => {
  return await request.post("/music/hot", {});
};
