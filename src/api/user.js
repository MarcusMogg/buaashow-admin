import service from '@/utils/request'
const querystring = require('querystring');
export const login = (data) => {
    return service({
        url: "/user/login",
        method: 'post',
        data: data
    })
}

export const createTeacher = (data) => {
    return service({
        url: "/user/teacher",
        method: 'post',
        data: data
    })
}

export const infoList = (page, account, tp) => {
    return service({
        url: "/user/infolist?" + querystring.stringify({
            page: page,
            account: account,
            type: tp,
        }),
        method: 'get',
    })
}

export const del = (data) => {
    return service({
        url: `/user/del/${data}`,
        method: 'delete',
    })
}

export const testAdmin = () => {
    return service({
        url: `/test/admin`,
        method: 'post',
    })
}

export const resetPassword = (account) => {
    return service({
        url: `/user/reset/${account}`,
        method: 'post',
    })
}