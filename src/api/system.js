import service from '@/utils/request'

export const getSystemState = () => {
    return service({
        url: `/sys`,
        method: 'get',
    })
}