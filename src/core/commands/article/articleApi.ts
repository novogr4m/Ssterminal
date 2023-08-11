import request from "../../../utils/request";

//获取掘金文章的请求
export const getRandomArticle = async (size: number) => {
    return await request.post("/juejin/article/random", {size});
}
