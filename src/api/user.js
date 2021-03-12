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

export const infoList = (page, account) => {
    return service({
        url: "/user/infolist?" + querystring.stringify({
            page: page,
            account: account
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