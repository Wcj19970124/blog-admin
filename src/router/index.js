import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/blog',
    name: 'BlogManage',
    meta: { title: '帖子管理', icon: 'example' },
    children: [
      {
        path: 'type',
        name: 'Type',
        component: () => import('@/views/blog/type/type-list'),
        meta: { title: '分类管理', icon: 'table' }
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('@/views/blog/blog/blog-list'),
        meta: { title: '博客管理', icon: 'table' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/blog/about/about-list'),
        meta: { title: '关于我的', icon: 'table' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/admin',
    name: 'UserManage',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/user/admin/admin-update'),
        meta: { title: '管理员', icon: 'table' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/user/user-list'),
        meta: { title: '用户管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/system',
    name: 'SystemManage',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/system/log/log-list'),
        meta: { title: '日志管理', icon: 'table' }
      },
      {
        path: 'music',
        name: 'Music',
        component: () => import('@/views/system/music/music-list'),
        meta: { title: '音乐管理', icon: 'table' }
      },
      {
        path: 'link',
        name: 'Link',
        component: () => import('@/views/system/link/link-list'),
        meta: { title: '友情链接', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
