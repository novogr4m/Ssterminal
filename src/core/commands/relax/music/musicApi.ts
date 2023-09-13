import request from "@/utils/request";
/**
 * 搜索单条音乐
 * @param keywords
 */
export const getSingleMusic = async (keywords: string) => {
  if (!keywords) {
    return null;
  }
  return await request.post("/music/get", { keywords });
};
