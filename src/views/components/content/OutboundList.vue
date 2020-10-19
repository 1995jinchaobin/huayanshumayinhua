<template>
  <div class="outboundList">
    <storeManageSearch/>
    <el-table
      :data="chukuList"
      style="width: 100%"
      border
      stripe
      :header-cell-style="headFirst"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="customerName"
        label="客户名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fabricName"
        align="center"
        label="品名">
      </el-table-column>
      <el-table-column
        label="数量(匹/米)"
        prop
        align="center">
        <el-table-column
          prop="rollNum"
          align="center">
        </el-table-column>
        <el-table-column
          prop="num"
          align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="statusName"
        label="状态"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        width="280px"
        align="center">
        <template slot-scope="scope">
          <el-button @click="mingXi(scope.row)" size="mini" type="primary">明细</el-button>
          <el-button size="mini" type="primary" @click="daYin(scope.row)">打印</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <div class="pagination" v-if="total > 10">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="changePage"
        :current-page.sync="chukuParams.page">
      </el-pagination>
    </div>
    <!-- 明细抽屉 -->
    <div class="mingXi">
      <el-drawer  :title="'明细:'+mingXiInfo.customerName " :visible.sync="mingXiVisible" :before-close="closeMingXiDrawer" size="50%">
        <div class="mingXiInfo">
          <el-form label-width="120px" :model="mingXiInfo">
            <el-form-item label="创建时间:">
              <span>{{mingXiInfo.createTime}}</span>
            </el-form-item>
            <el-form-item label="创建人:">
              <span>{{mingXiInfo.createByName}}</span>
            </el-form-item>
            <el-form-item label="订单号:">
              <span>{{mingXiInfo.orderNo}}</span>
            </el-form-item>
            <el-form-item label="客户名称:">
              <span>{{mingXiInfo.customerName}}</span>
            </el-form-item>
            <el-form-item label="面料名称:">
              <span>{{mingXiInfo.fabricName }}</span>
            </el-form-item>
            <el-form-item label="出库米数(米):">
              <span>{{mingXiInfo.num}}</span>
            </el-form-item>
            <el-form-item label="已出库米数(米):">
              <span>{{mingXiInfo.finishNum}}</span>
            </el-form-item>
            <el-form-item label="出库匹数(匹):">
              <span>{{mingXiInfo.rollNum}}</span>
            </el-form-item>
            <el-form-item label="已出库匹数(匹):">
              <span>{{mingXiInfo.finishRollNum}}</span>
            </el-form-item>
            <el-form-item label="打印状态:">
              <span>{{mingXiInfo.isPrint}}</span>
            </el-form-item>
            <el-form-item label="出库状态:">
              <span>{{mingXiInfo.isPrint}}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{mingXiInfo.note}}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>
    <!-- 出库单打印 -->
    <div class="chuKuDialog" v-if="chukKuDialogVisible==true">
      <el-dialog
        title=""
        :visible.sync="chukKuDialogVisible"
        fullscreen>
        <el-row>
          <el-col :span="22" :offset="1">
            <div id="printChuKuArea">
              <table cellspacing="0" cellpadding="0" style="font-size: 16px;border: 1px solid #000;overflow: hidden;border-collapse: collapse;margin: 0 auto;width: 90%;">
                <thead>
                  <tr>
                    <th colspan="8">
                      <div style="font-size: 22px;text-align: center;letter-spacing: 10px;line-height: 160%;">绍兴华燕数码印花有限公司</div>
                      <div style="font-size: 28px;text-align: center;letter-spacing: 10px;line-height: 160%;">出库单</div>
                      <div class="kehuName">
                        <div style="font-size: 20px;font-weight:500;text-align: center;letter-spacing: 2px;line-height: 160%;">客户名称: {{kehuName}}</div>
                        <div style="font-size: 20px;font-weight:500;text-align: center;letter-spacing: 2px;line-height: 160%;">日期: {{timeData}}</div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr>
                    <td width="12%">订单号：</td>
                    <td width="15%">{{detailInfo.salesMan.name}}</td>
                    <td width="12%">下单时间：</td>
                    <td width="19%">{{detailInfo.createTime}}</td>
                    <td width="12%">面料来源：</td>
                    <td colspan="3"  width="30%">{{detailInfo.origin}}</td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import StoreManageSearch from '../common/StoreManageSearch'
import format from '../../../utils/js/format'
export default {
  components: {
    StoreManageSearch
  },
  data () {
    return {
      chukuParams: {
        page: 1,
        rows: 10,
        customerName: '',
        name: ''
      },
      chukuList: [],
      total: 0,
      files: [],
      sub:{
        file:[],
        type:3
      },
      // 明细抽屉
      mingXiVisible:false,
      mingXiInfo:{},
      // 出库单打印
      chukKuDialogVisible:false,
      // 打印时间
      timeData:'',
      // 客户名称
      kehuName:''
    }
  },
  methods: {
    // 获取出库列表
    getChukuList () {
      this.$get('/inventory/out/list',{
        ...this.chukuParams
      }).then((data)=>{
        console.log(data.data.list)
        console.log(data)
        this.chukuList = data.data.list
        // this.tableData = data.data.list
        this.total = data.data.total
        // console.log(this.total)
      })
    },
    headFirst({row, colunm, rowIndex, columnIndex}) {
      if (rowIndex === 1) {
      //这里为了是将第二列的表头隐藏，就形成了合并表头的效果
          return {display: 'none'}
      }
      return
    },
     // 页码切换
    changePage(page) {
      this.chukuParams.page = page;
      this.getRukuList();
    },
    // 明细按钮
    mingXi(value) {
      console.log(value)
      this.mingXiInfo = value
      // this.customerName = value.customerName
      this.mingXiVisible = true
    },
    // 打印按钮
    daYin(a) {
      console.log(a)
      this.timeData = format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      this.kehuName = a.customerName
      this.chukKuDialogVisible = true
    },
    // 关闭明细抽屉
    closeMingXiDrawer () {
      this.mingXiInfo = {}
      
      this.mingXiVisible = false
    },
    // 表格前选中
    handleSelectionChange(a){
      console.log(a)
    }
  },
  created () {
    this.getChukuList()
  }
}
</script>

<style>
.outboundList{
  padding: 10px;
}
.outboundList .pagination{
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.outboundList .kehuName{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
</style>