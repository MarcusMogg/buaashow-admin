import service from '@/utils/request'

export const getAll = () => {
    return service({
        url: "/coursename",
        method: 'get'
    })
}

export const add = (data) => {
    return service({
        url: `/coursename`,
        method: 'post',
        data: {
            name: data.name,
        }
    })
}

export const deleteCourse = (data) => {
    return service({
        url: `/coursename`,
        method: 'delete',
        data: {
            id: data.id,
        }
    })
}

export const upName = (data) => {
    return service({
        url: `/coursename/name`,
        method: 'post',
        data: {
            id: data.id,
            name: data.name,
        }
    })
}

export const upInfo = (data) => {
    return service({
        url: `/coursename/info`,
        method: 'post',
        data: {
            id: data.id,
            info: data.info,
        }
    })
}

export const upThumb = (data) => {
    return service({
        url: `/coursename/thumb`,
        method: 'post',
        data: {
            id: data.id,
            thumb: data.thumb,
        }
    })
}