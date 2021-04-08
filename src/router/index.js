import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import("@/views/layout/index.vue"),
    meta: {
      title: "底层layout"
    },
    children: [
      {
        path: "404",
        name: "404",
        hidden: true,
        meta: {
          title: "迷路了*。*",
        },
        component: () => import("@/views/error/index.vue"),
      },
      {
        path: `http://10.251.253.71/`,
        name: "http://10.251.253.71/",
        hidden: false,
        meta: {
          title: "官方网站",
          icon: "s-home",
        },
      },
      {
        path: "course",
        name: "Course",
        hidden: false,
        meta: {
          title: "课程管理",
          icon: "s-order",
        },
        component: () => import("@/views/course/index.vue"),
        children: [
          {
            path: "term",
            name: "学期管理",
            hidden: false,
            meta: {
              title: "学期管理",
              icon: "date",
            },
            component: () => import("@/views/course/term/index.vue"),
          },
          {
            path: "coursename",
            name: "课程管理",
            hidden: false,
            meta: {
              title: "课程列表",
              icon: "notebook-2",
            },
            component: () => import("@/views/course/course_name/index.vue"),
          },
        ],
      }, {
        path: "user",
        name: "User",
        hidden: false,
        meta: {
          title: "用户管理",
          icon: "s-custom",
        },
        component: () => import("@/views/user/index.vue"),
        children: [
          {
            path: "teacher",
            name: "教师管理",
            hidden: false,
            meta: {
              title: "教师管理",
              icon: "user-solid",
            },
            component: () => import("@/views/user/teacher/user.vue"),
          },
          {
            path: "student",
            name: "学生管理",
            hidden: false,
            meta: {
              title: "学生管理",
              icon: "user",
            },
            component: () => import("@/views/user/student/user.vue"),
          },
        ],
      }, {
        path: "system",
        name: "system",
        hidden: false,
        meta: {
          title: "服务器状态",
          icon: "cloudy",
        },
        component: () => import("@/views/system/state.vue"),
      },],
  },

  {
    path: '*',
    redirect: '/layout/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

export default router
