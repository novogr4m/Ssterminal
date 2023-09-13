declare namespace User {
    /**
     * 用户类型
     */
    interface UserType {
        username: string;
        email?: string;
        createTime?: date;
        updateTime?: date;
        access_token?: string;
        refresh_token?: string;
    }

    interface tokenType{
        access_token?: string,
        refresh_token?:string
    }
}
