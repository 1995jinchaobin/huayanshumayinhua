<template>
  <div class="stockInfo">
    <div class="tagSearch">
      <storeManageSearch ref="storeSearch" @searchList="searchList" @daochu="daochu">
          <!-- <el-button plain @daochu="daochuStockInfo">导&nbsp;&nbsp;出</el-button> -->
        <!-- <el-button @click="onSubmit" plain>导&nbsp;&nbsp;出</el-button> -->
      </storeManageSearch>
      <div>
        <el-button plain @click="openUpdateDrawer" class="addStock">新增入库</el-button>
      </div> 
    </div>
    <el-table
      :data="tableData"
      border
      :header-cell-style="headFirst">
      <el-table-column
        align="center"
        prop="customerName"
        label="公司名">
      </el-table-column>
      <el-table-column
        prop="fabricName"
        label="面料规格"
        align="center">
      </el-table-column>
      <el-table-column
        label="半票仓(匹/米)"
        prop
        align="center">
        <el-table-column
          prop="rollNum"
          align="center">
        </el-table-column>
        <el-table-column
          prop="num1"
          align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="num2"
        align="center"
        label="上浆仓(米)">
      </el-table-column>
      <el-table-column
        prop="sizingExpectNum"
        align="center"
        label="上浆预期存量(米)">
      </el-table-column>
      <el-table-column
        prop="num4"
        align="center"
        label="生产流通量(米)">
      </el-table-column>
      <el-table-column
        align="center"
        prop="num3"
        label="成品仓(匹/米)">
      </el-table-column>
      <el-table-column
        label="操作"
        width="280px"
        align="center">
        <template slot-scope="scope">
          <el-button @click="sizingAllocation(scope.row)" size="mini" type="primary">上浆调拨</el-button>
          <el-button size="mini" type="primary" @click="checkStock(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="total > 10">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="changePage"
        :current-page.sync="sreachpage.page">
      </el-pagination>
    </div>
    <!-- 新增入库抽屉 -->
    <div>
      <el-drawer
        :visible.sync="drawer"
        :before-close="closeAddStockDrawer"
        title="新增入库">
        <el-form label-width="120px" :model="addStockParams" :rules="addStockParamsRules" ref="addStockParamsRef">
          <el-form-item label="客户:" prop="fkCustomerId">
            <el-select v-model="addStockParams.fkCustomerId" placeholder="请选择" @change="getUserId">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面料品类:" prop="fkFabricId">
            <el-select v-model="addStockParams.fkFabricId" placeholder="请选择" filterable>
              <div slot="empty" @click="toAddMianliao" class="toAddMianliao">
                添加面料
              </div>
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="半票仓匹数:" prop="rollNum">
            <el-input-number v-model="addStockParams.rollNum" controls-position="right" :min="1" :precision="0"></el-input-number>
          </el-form-item>
          <el-form-item label="半票仓米数:" prop="num">
            <el-input-number v-model="addStockParams.num" controls-position="right" :min="0" :precision="2" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="上传码单(选项):">
            <form id="myForm" enctype="multipart/form-data" name="fileinfo" ref="upBiaodan">
              <div class="searchArea">
                <!-- <span>上传图片</span> -->
                <img :src="lookUrl" alt="#" class="lookUrl" v-show="lookUrl!==''"/>
                <img src="../../../assets/add.png" alt="#">
                <input @change='changeImg' id='imgFile' type='file' class="fileInput"/>
              </div>
            </form>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="saveAddStock">保存</el-button>
          <el-button type="primary" @click="closeAddStockDrawer">取消</el-button>
        </div>
      </el-drawer>
    </div>
    <!-- 上浆调拨抽屉 -->
    <div>
      <el-drawer
        :visible.sync="drawerShangJiang"
        :before-close="closeCheckShangJiang"
        :title="addSizingTitle+':'+'上浆调拨'">
        <el-form label-width="120px" :model="addShangJiangParams" :rules="addShangJiangParamsRules" ref="addShangJiangParamsRef">
          <el-form-item label="上浆匹数:" prop="rollNum">
            <el-input-number v-model="addShangJiangParams.rollNum" controls-position="right" :min="0" :max="shangJiangRollNumMax" :precision="0"></el-input-number>
          </el-form-item>
          <el-form-item label="上浆米数:" prop="num">
            <el-input-number v-model="addShangJiangParams.num" controls-position="right" :min="0" :precision="2" :step="1" :max="shangJiangNumMax"></el-input-number>
          </el-form-item>
          <!-- <el-form-item label="上传码单(选项):">
          </el-form-item>  -->
        </el-form>
        <div class="shangjiangTiaoboBtn">
          <el-button type="primary" @click="saveAddShangJiang">保存</el-button>
          <el-button type="primary" @click="closeCheckShangJiang">取消</el-button>
        </div>
      </el-drawer>
    </div>
    <!-- 编辑入库信息 -->
    <div>
      <el-drawer  title="编辑" :visible.sync="checkVisible" :before-close="closeCheckDrawer">
        <div class="bianjiKucunInfo">
          <!-- <el-divider content-position="left"></el-divider> -->
          <el-form :model="checkInfo" ref="checkInfoRef" label-width="140px" :rules="checkInfoRules">
            <!-- <el-row> -->
              <!-- <el-col :span="12"> -->
            <el-form-item label="公司名:">
              <el-input v-model="checkInfo.customerName" type="text" placeholder="请输入公司名" disabled></el-input>
              <!-- <label>{{detailInfo.id}}</label> -->
            </el-form-item>
            <el-form-item label="面料规格:">
              <el-input v-model="checkInfo.fabricName" type="text" placeholder="请输入面料规格" disabled></el-input>
              <!-- <label>{{detailInfo.id}}</label> -->
            </el-form-item>
            <el-form-item label="半票仓(匹):" prop="rollNum">
              <el-input v-model="checkInfo.rollNum" type="text" placeholder="请输入半票仓(匹)"></el-input>
              <!-- <label>{{detailInfo.id}}</label> -->
            </el-form-item>
            <el-form-item label="半票仓(米):" prop="num1">
              <el-input v-model="checkInfo.num1" type="text" placeholder="请输入半票仓(米)"></el-input>
              <!-- <label>{{detailInfo.id}}</label> -->
            </el-form-item>
            <el-form-item label="上浆仓(米):" prop="num2">
              <el-input v-model="checkInfo.num2" type="text" placeholder="请输入上浆仓(米)"></el-input>
              <!-- <label>{{detailInfo.id}}</label> -->
            </el-form-item>
            <!-- <el-form-item label="上浆预期存量(米):" prop="sizingExpectNum">
              <el-input v-model="checkInfo.sizingExpectNum" type="text" placeholder="请输入上浆预期存量(米)"></el-input>
            </el-form-item>
            <el-form-item label="生产流通量(米):" prop="num4">
              <el-input v-model="checkInfo.num4" type="text" placeholder="请输入生产流通量(米)"></el-input>
            </el-form-item>
            <el-form-item label="成品仓(匹/米)" prop="num3">
              <el-input v-model="checkInfo.num3" type="text" placeholder="请输入成品仓(匹/米)"></el-input>
            </el-form-item> -->
          </el-form>
          <div class="storeManageCheckStockBtn">
            <el-button @click="checkStockInfo" size="mini" type="primary">保存</el-button>
            <el-button size="mini" type="primary" @click="closeCheckDrawer">取消</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import messageUtil from '../../../utils/js/MessageUtil'
import StoreManageSearch from '../common/StoreManageSearch'
// import { delete } from 'vue/types/umd'
// import { delete } from 'vue/types/umd'
// import ImgUpload from '../common/ImgUpload'
export default {
  components: {
    StoreManageSearch
    // ImgUpload
  },
  data() {
    return {
      dataKey:null,
      drawer:false,
      sreachpage:{
        page:1,
        rows:10,
        customerName:'',
        name:'',
        startTime:'',
        endTime:''
      },
      total:0,
      // 仓库列表
      tableData: [],
      // 新增入库
      addStockParams:{
        // 仓库名
        name:'',
        // 码单地址
        url:'',
        // 半漂仓米数
        num:'',
        // 半漂仓匹数
        rollNum:'',
        // 客户id
        fkCustomerId:'',
        // 面料id
        fkFabricId:''
      },
      // 码单上传
      file:'',
      formData:'',
      lookUrl:'',
      // 客户选择
      userList:[],
      // 面料品类选择
      categoryList:[],
      // 入库验证
      addStockParamsRules:{
        fkCustomerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        fkFabricId: [
          { required: true, message: '请选择面料品类', trigger: 'change' }
        ],
        rollNum: [
          { required: true, message: '请输入半票仓匹数', trigger: 'change' }
        ],
        num: [
          { required: true, message: '请输入半票仓米数', trigger: 'change' }
        ]
      },
      // 上浆调拨抽屉
      drawerShangJiang:false,
      // 标题
      addSizingTitle:'',
      addShangJiangParams:{
        rollNum:'',
        num:'',
        inventoryId:''
      },
      addShangJiangParamsRules:{
        rollNum: [
          { required: true, message: '请输入上浆匹数', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入上浆米数', trigger: 'blur' }
        ]
      },
      shangJiangRollNumMax:'',
      shangJiangNumMax:'',
      // 编辑入库信息
      checkVisible:false,
      checkInfo:{},
      checkInfoRules:{
        rollNum: [
          { required: true, message: '请选择半票仓匹数', trigger: 'change' }
        ],
        num1: [
          { required: true, message: '请选择半票仓米数', trigger: 'change' }
        ],
        num2: [
          { required: true, message: '请输入上浆仓米数', trigger: 'blur' }
        ]
        // sizingExpectNum: [
        //   { required: true, message: '请输入上浆预期存量米数', trigger: 'blur' }
        // ],
        // num4: [
        //   { required: true, message: '请输入生产流通量米数', trigger: 'blur' }
        // ],
        // num3: [
        //   { required: true, message: '请输入成品仓', trigger: 'blur' }
        // ]
      }
    }
  },
  methods:{
    // 获取仓库列表数据
    getData() {
      // console.log(this.sreachpage)
      this.$get('/inventory/list',{
        ...this.sreachpage
      }).then((data)=>{
        // console.log(data.data.list)
        // console.log(data)
        this.tableData = data.data.list
        this.total = data.data.total
        // console.log(this.total)
        // this.page.total = data.data.total;
      })
      // const a = this.axios.get('http://192.168.1.115:9999/inventory/list',{params:this.sreachpage})
      // console.log(a)
    },
    // 搜索
    searchList(value) {
      // console.log(value)
      this.sreachpage = value
      this.getData()
    },
    // 页码切换
    changePage(page) {
        this.sreachpage.page = page;
        this.getData();
      },
    headFirst({row, colunm, rowIndex, columnIndex}) {
      if (rowIndex === 1) {
      //这里为了是将第二列的表头隐藏，就形成了合并表头的效果
          return {display: 'none'}
      }
      return
    },
     // 打开新增入库
    openUpdateDrawer() {
      this.getUserList()
      // this.getCategory()
      this.drawer = true
    },
    // 跳转到面料管理页面
    toAddMianliao () {
      // console.log(this.addStockParams.fkCustomerId)
      // console.log(this.userList)
      if (this.addStockParams.fkCustomerId!==''){
        const index = this.userList.findIndex(item => {
          return item.id === this.addStockParams.fkCustomerId
        })
        // console.log(index)
        const key = this.userList[index].name
        // console.log(key)
        this.$router.push({
          path:'/fabricManage',
          name:'FabricManage',
          params: {  
            addKey: key
          }
        })
      } else{
        this.$router.push({
          path:'/fabricManage',
          name:'FabricManage',
          params: {  
            toKey: '1'
          }
        })
      }
      window.sessionStorage.setItem('defaultActive','/fabricManage')
    },
    // 关闭新增入库清空数据
    closeAddStockDrawer() {
      // console.log('关闭')
      this.$refs.addStockParamsRef.resetFields()
      this.$refs.upBiaodan.reset()
      this.file = ''
      this.formData = ''
      this.lookUrl = ''
      this.drawer = false
    },
    // 获取客户名
    getUserList(){
      this.$get('/customer',{
        page:1,
        rows:99999
      }).then((data)=>{
        // console.log(data)
        this.userList = data.data.list;
      })
    },
    // 选择客户名获取其ID
    getUserId() {
      this.addStockParams.fkFabricId = ''
      // console.log(this.addStockParams.fkCustomerId)
      this.getCategory()
    },
    // 面料品类
    getCategory() {
      // console.log(this.addStockParams.fkCustomerId)
      this.$get('/fabric/select',{
        fkCustomerId:this.addStockParams.fkCustomerId
      }).then((data)=>{
        // console.log(data)
        this.categoryList = data.data;
        // console.log(this.categoryList)
      })
    },
    // 保存新增入库（无码单）
    saveAddStockNo() {
      // this.$refs.addStockParamsRef.validate(value => {
      //   console.log(value)
      //   if (!value) return
      // console.log(this.addStockParams)
      this.$post('/inventory/in/add',this.addStockParams).then((data)=>{
      // console.log(data)
      if (data.code!==0) return messageUtil.message.error(data.message)
      messageUtil.message.success(data.message)
      // this.closeCheckDrawer();
      this.closeAddStockDrawer()
      this.getData();
      })
      // })
    },
    // 保存新增入库
    saveAddStock() {
      this.$refs.addStockParamsRef.validate(value => {
        if (!value) return
        if(this.file!=='') {
        // console.log('有码单图片')
        this.changChuanImg()
        setTimeout(()=>{
          this.saveAddStockNo()
          },500
        )
        // this.saveAddStockNo()
        // console.log('结束')
      } else{
        // console.log('无码单图片')
        this.saveAddStockNo()
      }
      })
    },
    // 上传图片(缓存)
    changeImg(a) {
      // console.log('上传图片')
      // console.log(a.target)
      // const file1 = a.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(a.target.files[0])
      fr.onload = e=> {
        // console.log(e.target.result)
        this.lookUrl = e.target.result
      }
      // 获取图片
      this.file = document.getElementById("imgFile").files[0]
      // console.log(this.file)
      this.formData = new FormData()
      // if (file) {
      this.formData.append('file', this.file);　　
      this.formData.append('type', 3)
        // console.log(formData)
        // console.log(formData.get('type'))
        // console.log(formData.get('file'))
      // }
    },
    // 上传图片
    changChuanImg() {
      axios.post('/file',this.formData).then(res=>{
        // console.log(res)
        // messageUtil.message.success(res.data.message)
        if (res.data.code ===0){
          // console.log(this.drawer)
          // console.log(this.addStockParams)
          this.addStockParams.url = res.data.data
          // console.log(this.addStockParams)
        }
      })
    },
    // 上浆调拨
    sizingAllocation(value) {
      // console.log('上浆调拨')
      // console.log(value)
      this.addSizingTitle = value.customerName
      this.shangJiangRollNumMax = value.rollNum
      this.shangJiangNumMax = value.num1
      this.addShangJiangParams.inventoryId = value.id
      this.drawerShangJiang = true
    },
    // 关闭上浆调拨
    closeCheckShangJiang() {
      // console.log(this.$refs.addShangJiangParamsRef)
      this.$refs.addShangJiangParamsRef.resetFields()
      this.drawerShangJiang = false
    },
    // 保存上浆调拨
    saveAddShangJiang() {
      // console.log(this.addShangJiangParams)
      this.$refs.addShangJiangParamsRef.validate(value => {
        // console.log(value)
        if (!value) return
        // console.log(this.addShangJiangParams)
        this.$post('/inventory/transfer',this.addShangJiangParams).then((data)=>{
        // console.log(data)
        messageUtil.message.success(data.message)
        this.closeCheckShangJiang()
        this.getData()
        })
      })
    },
    // 编辑入库信息按钮
    checkStock(value) {
      // console.log(value)
      this.checkInfo = JSON.parse(JSON.stringify(value))
      this.checkVisible = true
    },
    // 关闭编辑抽屉
    closeCheckDrawer() {
      this.checkVisible = false
    },
    // 保存编辑
    checkStockInfo() {
      // console.log(this.checkInfo)
      const a = {
        id:this.checkInfo.id,
        rollNum:this.checkInfo.rollNum,
        num1:this.checkInfo.num1,
        num2:this.checkInfo.num2,
        // num3:this.checkInfo.num3,
        // num4:this.checkInfo.num4,
        // sizingExpectNum:this.checkInfo.sizingExpectNum
      }
      // console.log(a)
      this.$put('/inventory/'+this.checkInfo.id,a).then((data)=>{
        // console.log(data)
        messageUtil.message.success(data.message)
        this.closeCheckDrawer()
        this.getData()
      })
    },
    // 根据id查找仓储列表
    getDataOfKey () {
      this.$get('/inventory/'+this.dataKey).then((data)=>{
        // console.log(data.data.list)
        // console.log(data.data)
        // this.rukuList = data.data.list
        const a = new Array()
        a[0] = data.data
        // console.log(a)
        // a[0] = data.data
        this.tableData = a
        // this.total = data.data.total
        // console.log(this.total)
        // console.log(this.tableData)
      })
    },
    // 导出库存信息
    daochu(a){
      delete a.page
      delete a.rows
      for (let para in a){
        if (a[para].trim()===''){
          delete a[para]
        }
      }
      let urlAdd = ''
      if(a.customerName){
        urlAdd+='customerName='+ a.customerName
        if(a.name){
          urlAdd+='&name='+ a.name
        }
        if(a.startTime){
          urlAdd+='&startTime='+ a.startTime
          urlAdd+='&endTime='+ a.endTime
        }
      }else{
        urlAdd = ''
        if(a.name){
          urlAdd+='name='+ a.name
          if(a.startTime){
            urlAdd+='&startTime='+ a.startTime
            urlAdd+='&endTime='+ a.endTime
          }
        }else{
          urlAdd = ''
          if(a.startTime){
            urlAdd+='startTime='+ a.startTime
            urlAdd+='&endTime='+ a.endTime
          }
        }
      }
      let url = ''
      if(urlAdd===''){
        url = this.$baseUrl + '/inventory/order/export'
      } else{
        url = this.$baseUrl + '/inventory/order/export?' + urlAdd
      }
      window.open(url)
    }
  },
  created(){
    // console.log(this.$refs)
    // console.log(this.$refs.storeSearch)
    // console.log(this.$route)
    // console.log(this.$route.params)
    if (this.$route.params.key!==undefined){
      this.dataKey = this.$route.params.key
      // console.log(this.$route.params.key)
      this.getDataOfKey()
    } else {
      this.getData()
    }
  },
  mounted() {
    // console.log(this.$refs)
    // console.log(this.$refs.storeSearch)
    this.$refs.storeSearch.getRegionlist()
    // this.$route.query = {}
  }
}
</script>

<style>
.stockInfo{
  padding: 10px;
}
/* .stockInfo .el-table{
  width: 1100px;
} */
.el-table thead.is-group th{
  background-color: #fff;
}
.stockInfo .tagSearch{
  display: flex;
  /* width: 100%; */
  /* height: 60px; */
}
.stockInfo .addStock{
  margin-right: 10px;
}
/* .tagSearch .storeManageSearch{
  flex: 10;
}
.tagSearch div{
  flex: 1;
} */
/* .storeManageSearch{
  width: 800px;
} */
.stockInfo .pagination{
  /* background-color: aqua; */
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.stockInfo .fileInput{
  position: absolute;
  width: 120px;
  height: 140px;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
.stockInfo .searchArea{
  position: absolute;
  width: 120px;
  height: 140px;
  top: 0;
  left: 0;
  /* background-color: #409EFF; */
  text-align: center;
  color: #fff;
  border-radius: 5%;
  cursor: pointer;
  }
  .stockInfo .btn{
    padding-left: 120px;
    position: absolute;
    bottom:40px ;
  }
  .stockInfo .lookUrl{
    width: 100%;
    position: absolute;
  }
  .toAddMianliao{
    padding: 10px;
    cursor: pointer;
  }
  .storeManageCheckStockBtn, .shangjiangTiaoboBtn{
    display: flex;
    justify-content: center;
  }
  .storeManageCheckStockBtn .el-button, .shangjiangTiaoboBtn .el-button{
    margin: auto 30px;
  }
  .bianjiKucunInfo .el-form{
    margin: auto 10px;
  }
</style>