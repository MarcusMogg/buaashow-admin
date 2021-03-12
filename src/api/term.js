import service from '@/utils/request'

export const getTerms = () => {
    return service({
        url: "/terms/all",
        method: 'get'
    })
}

export const addTerms = (data) => {
    return service({
        url: "/terms",
        method: 'post',
        data: data,
    })
}

export const deleteTerm = (id) => {
    return service({
        url: `/terms/${id}`,
        method: 'delete',
    })
}