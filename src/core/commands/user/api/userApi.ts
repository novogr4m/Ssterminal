import request from "@/utils/request"
/**
 * 用户登录
 * @param username
 * @param password
 */
enum API {
    USERLOGIN_URL = '/user/login',
    USERREGISTER_URL = '/user/register',
    USERLOGOUT_URL = '/user/logout'
}

export const userLogin = (username: string, password: string) => {
    if (!username || !password) {
        return null;
    }
    return request.post(API.USERLOGIN_URL, { username, password });
};

/**
 * 用户注销
 */
export const userLogout = () => {
    return request.post(API.USERLOGOUT_URL);
};

/**
 * 用户注册
 * @param username
 * @param password
 * @param email
 */
export const userRegister = (
    username: string,
    password: string,
    email: string
) => {
    if (!username || !password || !email) {
        return null;
    }
    return request.post(API.USERREGISTER_URL, { username, password, email });
};

/**
 * 获取当前登录用户
 */
export const getLoginUser = async () => {
    return await request.post("/user/current");
};
