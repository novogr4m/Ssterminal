import { defineStore } from "pinia";
import { getLoginUser, userLogin, userLogout } from "../api/userApi";
import { LOCAL_USER } from "../userConstant";
import UserType = User.UserType;

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
    persist: {
        key: "user-store",
        storage: window.localStorage,

        beforeRestore: (context) => {
            console.log("load userStore data start");
        },
        afterRestore: (context) => {
            console.log("load userStore data end");
        },
    },

    actions: {
        async getAndSetLoginUser() {
            const res: any = await getLoginUser();
            if (res?.code === 0 && res.data) {
                this.loginUser = res.data;
            } else {
                console.error("登录失败");
                //pinia更新的时候会有历史记录，$reset可以将数据重置到最开始时
                this.$reset();
            }
        },
        setLoginUser(user: UserType) {
            this.loginUser = user;
        },


        //用户登录
        async login(username: string, password: string) {
            const res: any = await userLogin(username, password);
            if (res?.code === 0) {
                //登陆成功
                this.setLoginUser(res.data);
            }
            // return res;
            return { code: res?.code, message: res.message ? res.message : null };
        },
        //用户退出登录

        async logout() {
            const res: any = await userLogout();
            if (res?.code == 0) {
                this.setLoginUser(LOCAL_USER);
            }
            return { code: res?.code, message: res.message ? res.message : null };
        },
    },
});
