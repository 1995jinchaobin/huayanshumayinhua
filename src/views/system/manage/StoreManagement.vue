<template>
  <div class="storeManagement">
    <div class="note">
      <div class="noteText">
       仓库管理
      </div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
             <!-- <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
              <el-tab-pane label="库存信息" name="first">
                <stockInfo/>
              </el-tab-pane>
              <el-tab-pane label="入库单" name="second">
                <inboundList/>
              </el-tab-pane>
              <el-tab-pane label="出库单" name="third">出库单</el-tab-pane>
            </el-tabs> -->
            <el-tabs v-model="currentView" type="card">
              <el-tab-pane label="库存信息" name="StockInfo"></el-tab-pane>
              <el-tab-pane label="入库" name="InboundList"></el-tab-pane>
              <el-tab-pane label="出库" name="OutboundList"></el-tab-pane>
            </el-tabs>
            <!--:is 的作用：会将div标签转换成 currentView 变量绑定的这个组件-->
            <div :is="currentView" keep-alive></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增入库抽屉
    <div>
      <el-drawer
        :visible.sync="drawer"
        :before-close="closeCheckDrawer">
        <span>我来啦!</span>
      </el-drawer>
    </div> -->
  </div>
</template>

<script>
// import StockInfo from '../../../views/components/content/StockInfo'
// import InboundList from '../../../views/components/content/InboundList'
export default {
  components: {
    // StockInfo,
    // InboundList,
    StockInfo: resolve => {
      require(['../../../views/components/content/StockInfo'], resolve)
    },
    InboundList: resolve => {
      require(['../../../views/components/content/InboundList'], resolve)
    },
    OutboundList: resolve => {
      require(['../../../views/components/content/OutboundList'], resolve)
    }
  },
  data() {
    return {
      currentView: 'StockInfo', //当前组件
      // activeName: 'first',
      drawer:false
    };
  },
  methods: {
    handleClick(tab, event, name) {
      // console.log(tab, event);
      // console.log(name)
    }
    // // 打开新增入库
    // openUpdateDrawer() {
    //   this.drawer = true
    // },
    // // 关闭抽屉清空数据
    // closeCheckDrawer() {
    //   this.drawer = false
    // }
  }
}
</script>

<style>
  /* .storeManagement .title{
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    height: 28px;
    padding-left: 32px;
    padding-top: 18px;
    font-weight: bold;
  } */
  span{outline:none}
  .storeManagement {
    overflow-y: auto;
    overflow-x: hidden;
    width: calc(100%);
    height: calc(100vh - 64px) !important;
  }

  .storeManagement .note {
    height: 64px;
  }
  /* tr.trStyle{
    height: 60px !important;
  } */
  .storeManagement .noteText {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    height: 28px;
    padding-left: 32px;
    padding-top: 18px;
    font-weight: bold;
  }
   .storeManagement .data {
    width: calc(100%);
    min-height: calc(100% - 64px);
    height: auto;
    padding: 24px 24px 24px 24px;
    background-color: #F0F3F7;
  }
  .storeManagement .dataContent {
    width: calc(100% - 48px);
    background-color: #fff;
    border-radius: 2px;
    border-radius: 2px;
    /* padding-bottom: 32px; */
  }
  .storeManagement .searchArea {
    width: calc(100%);
    margin: 0px 24px 0px 0px;
  }
</style>