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
      redirect: '/orderManage',
      component: resolve => (require(['@/views/system/home/Home'],resolve)),
      children:[
        //订单管理
        {
          path:'/orderManage',
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
        // 瑕疵管理
        {
          path:'/flaw',
          name: 'Flaw',
          component: resolve => require(['@/views/system/manage/Flaw'],resolve)
        },
        //机型管理
        {
          path:'/machineManage',
          name: 'MachineManage',
          component: resolve => require(['@/views/system/manage/MachineManage'],resolve)
        },
        //机器管理
        {
          path:'/machineChild',
          name: 'MachineChild',
          component: resolve => require(['@/views/system/manage/Machine'],resolve)
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
          path:'/warnMessage',
          name:'warnMessage',
          component: resolve => require(['@/views/System/manage/WarnMessage'],resolve)
        },
        {
          path:'/adminRecord',
          name:'AdminRecord',
          component: resolve => require(['@/views/System/manage/AdminRecord'],resolve)
        },
        //浆料管理
        {
          path:'/slurry',
          name:'Slurry',
          component: resolve => require(['@/views/System/manage/Slurry'],resolve)
        },
        //货品名称
        {
          path:'/productName',
          name:'ProductName',
          component: resolve => require(['@/views/System/manage/ProductName'],resolve)
        },
        //规格型号
        {
          path:'/specification',
          name:'Specification',
          component: resolve => require(['@/views/System/manage/Specification'],resolve)
        },
        //测试
        {
          path:'/ceshi',
          name:'ceshi',
          component: resolve => require(['@/views/System/manage/ceshi'],resolve)
        }
      ]
    },
  ],
  mode:'history'
})
