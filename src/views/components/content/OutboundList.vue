<template>
  <div class="outboundList">
    <storeManageSearch/>
    <el-table
      :data="chukuList"
      style="width: 100%"
      border
      stripe
      :header-cell-style="headFirst">
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
        label="操作"
        width="280px"
        align="center">
        <!-- <template slot-scope="scope"> -->
          <!-- <el-button @click="sizingAllocation(scope.row)" size="mini" type="primary">上浆调拨</el-button>
          <el-button size="mini" type="primary" @click="checkStock(scope.row)">编辑</el-button> -->
        <!-- </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import StoreManageSearch from '../common/StoreManageSearch'
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
      }
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
</style>