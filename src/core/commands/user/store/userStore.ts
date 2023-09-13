import { defineStore } from "pinia";
import { getLoginUser, userLogin, userLogout } from "../api/userApi";
import { LOCAL_USER } from "../userConstant";
import UserType = User.UserType;
import tokenType = User.tokenType;
import { SET_ACCESS_TOKEN,SET_REFRESH_TOKEN,RM_ACCESS_TOKEN,RM_REFRESH_TOKEN } from "../utils/token";
/**
 * 用户系统
 */
export const useUserStore = defineStore("user", {
    state: () => ({
        loginUser: {
            ...LOCAL_USER,
        },
    }),
    getters: {},
    // 持久化
    //persist对象可以配置一下属性：
    persist: {
        key: "user-store",
        storage: window.localStorage,
    },

    actions: {
        async getAndSetLoginUser() {
            const token:tokenType = {
                access_token: localStorage.getItem('ACCESS_TOKEN'),
                refresh_token: localStorage.getItem('REFRESH_TOKEN')
            }
            
            const res: any = await getLoginUser(token);
            if (res?.code === 200 && res.data) {
                this.loginUser = res.data;  //设置当前用户
            } else {
                console.error("登录失败");
                //pinia更新的时候会有历史记录，$reset可以将数据重置到最开始时
                this.$reset();
            }
        },

        
        setLoginUser(user: UserType) {
            this.loginUser = user;
            SET_ACCESS_TOKEN(user.access_token || '');
            SET_REFRESH_TOKEN(user.refresh_token ||'');
        },

        //用户登录
        async login(username: string, password: string) {
            const res: any = await userLogin(username, password);
            // console.log(res);
            if (res?.code === 200) {
                //登陆成功，设置用户信息                
                this.setLoginUser(res.data);
            }
            return { code: res?.code, message: res.message ? res.message : null };
        },

        
        //用户退出登录
        async logout() {
            const res: any = await userLogout();
            if (res?.code == 200) {
                this.loginUser = LOCAL_USER;
                RM_ACCESS_TOKEN();
                RM_REFRESH_TOKEN();
            }
            return { code: res?.code, message: res.message ? res.message : null };
        },
    },
});
