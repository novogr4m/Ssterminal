import request from "@/utils/request";

export const getHotVideo = async (pageNum: number,pageSize:number) => {
    return await request.post('/video/hot', { pageNum ,pageSize});
}