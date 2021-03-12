import router from './router'
import getPageTitle from '@/utils/page'

const whiteList = ['Login', 'init']
router.beforeEach(async (to, from, next) => {
    const token = localStorage['token']
    // 在白名单中的判断情况
    //修改网页标签名称
    document.title = getPageTitle(to.meta.title)
    if (whiteList.indexOf(to.name) > -1) {
        next();
    } else {
        // 不在白名单中并且已经登陆的时候
        if (token) {
            next();
        }
        // 不在白名单中并且未登陆的时候
        if (!token) {
            next({
                name: "Login",
                query: {
                    redirect: document.location.hash
                }
            })
        }
    }
})