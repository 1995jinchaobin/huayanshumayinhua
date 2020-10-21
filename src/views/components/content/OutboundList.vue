<template>
  <div class="outboundList">
    <div class="tagSearchHebing">
      <storeManageSearch @searchList="searchList"></storeManageSearch>
      <div>
        <el-button @click="hebingDayin">合并打印</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
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
      <el-drawer  :title="'客户名:'+mingXiInfo.customerName " :visible.sync="mingXiVisible" :before-close="closeMingXiDrawer" size="50%">
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
              <div style="font-size: 22px;text-align: center;letter-spacing: 10px;line-height: 160%;">绍兴华燕数码印花有限公司</div>
              <div style="font-size: 28px;text-align: center;letter-spacing: 10px;line-height: 160%;">出库单</div>
              <div class="kehuNameOut">
                <div class="kuhuNameOut">客户名称: {{kehuName}}</div>
                <div class="kuhuNameOut">日期: {{timeData}}</div>
              </div>
              <div class="tbodyDayin">
                <!-- <table aligh="center" height="40" border="" width="100%" cellspacing="0" cellpadding="">
                  <tr>
                    <th>订单号</th>
                    <th width="80">面料规格</th>
                    <th>花号</th>
                    <th width="80">加工、经销</th>
                    <th width="60">匹数</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>米数</th>
                    <th>备注</th>
                  </tr>
                  <tr>
                    <td>1</td>
                  </tr>
                </table> -->
                <!-- <el-table
                  :data="tableDayin"
                  border
                  style="width: 100%"
                  :header-row-style="hideSixTh">
                  <el-table-column
                    prop="orderNo"
                    label="订单号"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="fabricName"
                    label="面料规格"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="fabricName"
                    label="花号"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="origin"
                    label="加工/经销"
                    >
                  </el-table-column>
                  <el-table-column
                    label="匹数"
                    >
                    <template slot-scope="scope">
                      <span v-if="scope.row.finishRollNum===null">{{scope.row.rollNum}}</span>
                      <span v-else>{{scope.row.rollNum-scope.row.finishRollNum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <el-table-column>
                    <template slot-scope="scope">
                      <el-table
                        :data="scope.row.inventoryOutDetails"
                        border
                        style="width: 100%"
                        :header-row-style="hideSixTh">
                        <el-table-column
                          prop="num"
                          >
                        </el-table-column>
                      </el-table>
                    </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="totalNum"
                    label="米数"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="note"
                    label="备注">
                  </el-table-column>
                </el-table> -->
                <div class="titleThDayin">
                  <div class="n1 flexCenter borderR">订单号</div>
                  <div class="n2 flexCenter borderR">面料规格</div>
                  <div class="n3 flexCenter borderR">花号</div>
                  <div class="n4 flexCenter borderR">加工/经销</div>
                  <div class="n5 flexCenter borderR">匹数</div>
                  <div class="n6 flexCenter borderR">1</div>
                  <div class="n6 flexCenter borderR">2</div>
                  <div class="n6 flexCenter borderR">3</div>
                  <div class="n6 flexCenter borderR">4</div>
                  <div class="n6 flexCenter borderR">5</div>
                  <div class="n6 flexCenter borderR">6</div>
                  <div class="n6 flexCenter borderR">7</div>
                  <div class="n6 flexCenter borderR">8</div>
                  <div class="n6 flexCenter borderR">9</div>
                  <div class="n7 flexCenter borderR">米数</div>
                  <div class="n10 flexCenter borderR">下单日期</div>
                  <div class="n8 flexCenter">备注</div>
                </div>
                <div>
                  <div v-for="(item,index) in tableDayin" :key="index" class="dayin">
                    <div class="n1 flexCenter borderTR">{{item.orderNo}}</div>
                    <div class="n2 flexCenter borderTR">{{item.fabricName}}</div>
                    <div class="n3 flexCenter borderTR">
                      <div v-for="(item3,index3) in item.flowerNum" :key="index3">
                        {{item3+';'}}
                      </div>
                    </div>
                    <div class="n4 flexCenter borderTR">{{item.origin}}</div>
                    <div v-if="item.finishRollNum ===null" class="n5">{{item.rollNum}}</div>
                    <div v-else class="n5 flexCenter borderTR">{{item.rollNum-item.finishRollNum}}</div>
                    <div class="dayinChildren">
                      <div v-for="(item2,index2) in item.nums" :key="index2" class="n9 flexCenter borderTR">
                        <div :class="item2.status===1?'hui':''">{{item2.num}}</div>
                      </div>
                    </div>
                    <div class="n7 flexCenter borderTR">{{item.totalNum}}</div>
                    <div class="n10 flexCenter borderTR">{{item.createTime}}</div>
                    <div class="n8 flexCenter borderT">{{item.note}}</div>
                  </div>
                </div>
              </div>
              <div class="botH4First">
                <h4>注：如有质量问题7天内调换，一经开剪，我公司概不负责。谢谢合作！</h4>
              </div>
              <div class="botH4two">
                <h4 class="h4width">制单：</h4>
                <h4 class="h4width">日期：</h4>
                <h4 class="h4width">业务员：</h4>
              </div>
            </div>
            <div class="bottomDayin">
              <div class="wenzi">
                <span>打印机为针式打印机特点规格，高总提供</span>
                <el-button v-print="'#printChuKuArea'" plain>打印</el-button>
              </div>
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
import messageUtil from '../../../utils/js/MessageUtil'
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
      addnum:0,
      // 客户名称
      kehuName:'',
      tableDayin:[]
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
      // if(rowIndex===0&&columnIndex===0){
      //   return {opacity: '0',border:'1px'}
      // }
      return
    },
     // 页码切换
    changePage(page) {
      this.chukuParams.page = page
      this.getChukuList()
    },
    // 触发搜索
    searchList(value){
      console.log(value)
      this.chukuParams = value
      this.getChukuList()
    },
    // 明细按钮
    mingXi(value) {
      console.log(value)
      this.mingXiInfo = value
      // const mingxiParams = {
      //   id:value.id
      // }
      // this.$get('/inventory/out/detail/list',{
      //     ...mingxiParams
      //   }).then(res => {
      //     console.log(res)
      //   })
      // this.customerName = value.customerName
      this.mingXiVisible = true
    },
    // 打印按钮
    daYin(a) {
      console.log(a)
      this.timeData = format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      this.kehuName = a.customerName
      this.tableDayin = []
      const orderParams = {
       id:a.fkOrderId
      }
      this.$get('/order/print/'+a.fkOrderId,{
        ...orderParams
      }).then(data=>{
        a.flowerNum = data.data.flowerNums,
        a.origin = data.data.origin
        const params = {
          id:a.id
        }
        this.$get('/inventory/out/detail/list',{
          ...params
        }).then(res => {
          console.log(res.data)
          a.nums = res.data
          let totalNum = 0
          for (let objs of a.nums) {
            console.log(objs)
            totalNum+=objs.num
          }
          a.totalNum = totalNum
          const numsLength = 9 - a.nums.length % 9
          console.log(numsLength)
          for (let ab = 0;ab<numsLength;ab++){
            a.nums.push({num:''})
          }
          console.log(a)
          this.tableDayin.push(a)
          this.chukKuDialogVisible = true
        })
      })
    },
    // 隐藏打印第6列表头
    // hideSixTh({row, rowIndex}) {
    //   if (rowIndex === 5) {
    //       return {background: '#edf6fb'}
    //   }
    //   return
    // },
    // 关闭明细抽屉
    closeMingXiDrawer () {
      this.mingXiInfo = {}
      
      this.mingXiVisible = false
    },
    // 表格前选中
    handleSelectionChange(rows){
      console.log(rows)
      const length = rows.length
      if (length>1) {
        console.log(rows[length-1].customerName)
        if(rows[length-1].customerName!==rows[length-2].customerName){
          this.$refs.multipleTable.toggleRowSelection(rows[length-1])
          this.tableDayin = rows.pop()
          return messageUtil.message.error('请选择同一个客户')
        } else {
          this.tableDayin = rows
        }
      } else if(length ===1){
        this.tableDayin = rows
      } else {
        this.tableDayin = []
      }
    },
    // 合并打印
    hebingDayin(){
      this.addnum = 0
      console.log(this.tableDayin)
      const hebingLength = this.tableDayin.length
      if(hebingLength>0){
        this.timeData = format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        this.kehuName = this.tableDayin[0].customerName
        for (let timeS=0;timeS<hebingLength;timeS++){
          const orderParams = {
            id:this.tableDayin[timeS].fkOrderId
          }
          this.$get('/order/print/'+this.tableDayin[timeS].fkOrderId,{
            ...orderParams
          }).then(data=>{
            this.tableDayin[timeS].flowerNum = data.data.flowerNums,
            this.tableDayin[timeS].origin = data.data.origin
            const params = {
              id:this.tableDayin[timeS].id
            }
            this.$get('/inventory/out/detail/list',{
              ...params
            }).then(res=>{
              // console.log(res)
              this.tableDayin[timeS].nums = res.data
              let totalNum = 0
              for (let obj of this.tableDayin[timeS].nums) {
                console.log(obj)
                totalNum+=obj.num
              }
              this.tableDayin[timeS].totalNum = totalNum
              const numsLength = 9 - this.tableDayin[timeS].nums.length % 9
              for (let abc = 0;abc<numsLength;abc++){
                this.tableDayin[timeS].nums.push({num:''})
              }
              this.addnum+=1
              // console.log(this.addnum)
              // console.log(hebingLength)
              if (this.addnum===hebingLength){
                this.chukKuDialogVisible = true
              }
            })
          })
        }
      }else{
        return messageUtil.message.info('请选择打印列表')
      }
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
.kuhuNameOut{
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  line-height: 160%;
}
.outboundList .pagination{
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.kehuNameOut{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.titleThDayin,.dayin{
  display: flex;
  text-align: center;
}
.dayinChildren{
  width: 36%;
  display: flex;
  flex-wrap: wrap;
}
.tbodyDayin{
  border: 1px solid #ccc;
}
.flexCenter{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* border: 0.4px solid #ccc; */
  box-sizing: border-box;
  min-height: 30px;
}
.borderR{
  border-right:1px solid #ccc;
}
.borderB{
  border-bottom:1px solid #ccc;
}
.borderTR{
  border-top:1px solid #ccc;
  border-right:1px solid #ccc;
}
.borderT{
  border-top:1px solid #ccc;
}
.n1{
  width: 10%;
  /* background-color: red; */
  /* border-top:none;
  border-bottom: none; */
}
.n2{
  width: 10%;
}
.n3{
  width: 9%;
}
.n4{
  width: 6%;
}
.n5{
  width: 4%;
}
.n6{
  width: 4%;
}
.n7{
  width: 5%;
}
.n8{
  width: 10%;
}
.n9{
  width: 11.111%;
}
.n10{
  width: 10%;
}
.hui{
  background-color: #ccc;
}
.outboundList .el-table__header-wrapper th:first-child .cell .el-checkbox{
  display: none;
}
.botH4First{
  margin-top: 15px;
}
.botH4two{
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
.h4width{
  width: 220px;
}
.bottomDayin{
  width: 100%;
  height: 80px;
  background-color: #eee;
  display: flex;
  align-items: center;
}
.bottomDayin .wenzi{
  margin: auto 300px;
}
.wenzi .el-button{
  margin-left: 10px;
}
.outboundList .tagSearchHebing{
  display: flex;
}
</style>