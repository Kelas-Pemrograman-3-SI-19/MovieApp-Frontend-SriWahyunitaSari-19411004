
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('src/pages/admin/Index.vue') },
      { path: '/inputbarang', name: 'inputBarang', component: () => import('src/pages/admin/InputBarang.vue') },
      { path: 'datauser', name: 'dataUser', component: () => import('src/pages/admin/DataUser.vue') },
      { path: 'datadvd', name: 'dataDVD', component: () => import('src/pages/admin/DataDVD.vue') },
      { path: 'formedit/:id', name: 'formEditDVD', component: () => import('src/pages/admin/FormEdit.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'homeUser', component: () => import('src/pages/user/Index.vue') },
      { path: '/myorder', name: 'myOrder', component: () => import('src/pages/user/MyOrder.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/guest/Login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/guest/Register.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
