import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      name:'login',
      component: resolve => (require(['@/views/system/login/Login'],resolve)),
    },
    {
      path:'/home',
      name:'home',
      component: resolve => (require(['@/views/system/home/Home'],resolve)),
      children:[
        //订单管理
        {
          path:'/',
          name: 'OrderManage',
          component: resolve => require(['@/views/system/manage/OrderManage'],resolve)
        },
        //员工管理
        {
          path:'/userManage',
          name: 'UserManage',
          component: resolve => require(['@/views/system/manage/UserManage'],resolve)
        },
        //客户管理
        {
          path:'/customerManage',
          name: 'CustomerManage',
          component: resolve => require(['@/views/system/manage/CustomerManage'],resolve)
        },
        //面料管理
        {
          path:'/fabricManage',
          name: 'FabricManage',
          component: resolve => require(['@/views/system/manage/FabricManage'],resolve)
        },
        //机器管理
        {
          path:'/machineManage',
          name: 'MachineManage',
          component: resolve => require(['@/views/system/manage/MachineManage'],resolve)
        },
        // ip设定
        {
          path:'/setIp',
          name:'SetIp',
          component: resolve => require(['@/views/system/manage/setIp'],resolve)
        },
        //配置方案管理
        {
          path:'/configuration',
          name: 'configuration',
          component: resolve => require(['@/views/system/manage/Configuration'],resolve)
        },
        // 数据统计
        {
          path:'/statistics',
          name:'Statistics',
          component: resolve => require(['@/views/System/manage/Statistics'],resolve)
        },
        // 仓库管理
        {
          path:'/storeManagement',
          name:'StoreManagement',
          component: resolve => require(['@/views/system/manage/StoreManagement'],resolve)
        },
        {
          path:'/websocket',
          name:'Websocket',
          component: resolve => require(['@/views/System/manage/Websocket'],resolve)
        },
        {
          path:'/ceshi',
          name:'ceshi',
          component: resolve => require(['@/views/System/manage/ceshi'],resolve)
        },
        {
          path:'/url',
          name:'url',
          component: resolve => require(['@/views/components/own/OwnHome'],resolve)
        }
        // {
        //   path:'/storage',
        //   name:'Storage',
        //   component: resolve => require(['@/views/storage/Storage'],resolve)
        // }
      ]
    },
    // {
    //   path:'/Knowledge',
    //   name:'Knowledge',
    //   component: resolve => (require(['@/views/components/own/OwnHome'],resolve))
    // },
    // {
    //   path:'/Addpicture',
    //   name:'AddPicture',
    //   component: resolve => (require(['@/views/components/own/OwnAddPicture'],resolve))
    // },
    // {
    //   path:"/History",
    //   name:'History',
    //   component: resolve => (require(['@/views/components/own/OwnHistory'],resolve))
    // },
    // {
    //   path:'/picLogin',
    //   name:'picLogin',
    //   component: resolve => (require(['@/views/components/own/OwnLogin'],resolve))
    // }
  ],
  mode:'history'
})
