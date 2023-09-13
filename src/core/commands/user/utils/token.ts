export const SET_ACCESS_TOKEN=(token:string) => {
    localStorage.setItem('ACCESS_TOKEN', token);
}

export const RM_ACCESS_TOKEN = () => {
    localStorage.removeItem('ACCESS_TOKEN');
}

export const SET_REFRESH_TOKEN = (token: string) => {
    localStorage.setItem('REFRESH_TOKEN', token);
}

export const RM_REFRESH_TOKEN = () => {
    localStorage.removeItem('REFRESH_TOKEN');
}
