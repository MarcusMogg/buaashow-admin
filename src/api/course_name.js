import service from '@/utils/request'

export const getAll = () => {
    return service({
        url: "/coursename",
        method: 'get'
    })
}

export const add = (data) => {
    return service({
        url: `/coursename/${data}`,
        method: 'post',
    })
}

export const deleteCourse = (name) => {
    return service({
        url: `/coursename/${name}`,
        method: 'delete',
    })
}