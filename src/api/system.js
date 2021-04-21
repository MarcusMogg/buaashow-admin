import service from '@/utils/request'

export const getSystemState = () => {
    return service({
        url: `/sys/s`,
        method: 'get',
    })
}

export const getCnt = () => {
    return service({
        url: `/sys/i`,
        method: 'get',
    })
}