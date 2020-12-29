<template>
  <div class="productName">
    <div class="note">
      <div class="noteText">货品名称</div>
    </div>
    <div class="data">
      <div class="dataContent">
        <!-- 货品名称搜索 -->
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input
                  v-model="flawParams.key"
                  placeholder="请输入货品名称"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="clearSearchInfo"
                  >重&nbsp;&nbsp;置</el-button
                >
                <el-button plain @click="getFlawList"
                  >搜&nbsp;&nbsp;索</el-button
                >
                <el-button plain @click="openUpdateDrawer"
                  >新&nbsp;&nbsp;增</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- 货品名称列表 -->
        <div class="dataListArea">
          <el-table :data="flawList" stripe border>
            <el-table-column prop="id" align="center" label="id">
            </el-table-column>
            <el-table-column prop="name" align="center" label="名称">
            </el-table-column>
            <el-table-column prop="note" align="center" label="备注">
            </el-table-column>
            <!-- <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0">存在</span>
                <span v-else>删除</span>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="bianJi(scope.row)" type="primary" size="mini"
                  >编辑</el-button
                >
                <el-button @click="del(scope.row)" type="primary" size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="page" v-if="total > 10">
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="changePage"
              :total="total"
              :current-page.sync="flawParams.page"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增货品名称抽屉 -->
    <div class="add">
      <el-drawer
        :title="title"
        :visible.sync="drawerAdd"
        :before-close="drawerAddClose"
      >
        <el-form
          :model="addFlawParams"
          ref="addFlawParamsRef"
          :rules="addFlawParamsRules"
          label-width="100px"
        >
          <el-form-item label="货品名称:" prop="name">
            <el-input
              v-model="addFlawParams.name"
              type="text"
              placeholder="请输入货品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="note">
            <el-input
              v-model="addFlawParams.note"
              type="text"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="addBottomBtn">
          <el-button @click="postAddFlawForm" type="primary">保存</el-button>
          <el-button @click="drawerAddClose" type="primary">取消</el-button>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import messageUtil from '../../../utils/js/MessageUtil'
export default {
  name: 'Specification',
  data () {
    return {
      flawParams: {
        page: 1,
        rows: 10,
        key: ''
      },
      total: 0,
      flawList: [],
      // 添加货品名称
      addFlawParams: {
        name: '',
        note: ''
      },
      drawerAdd: false,
      title: '',
      addFlawParamsRules: {
        name: [{ required: true, message: '请输入货品名称', trigger: 'blur' }]
      },
      bianJiId: ''
    }
  },
  created () {
    this.getFlawList()
  },
  methods: {
    async getFlawList () {
      const res = await this.$get('/fabric/goods', {
        ...this.flawParams
      })
      if (res.code !== 0) return messageUtil.message.error(res.message)
      this.flawList = res.data.list
      this.total = res.data.total
    },
    changePage (page) {
      this.flawParams.page = page;
      this.getFlawList();
    },
    // 重置
    clearSearchInfo () {
      this.flawParams = {
        page: 1,
        rows: 10,
        key: ''
      }
      this.getFlawList()
    },
    // 搜索
    // getData () { },
    // 新增按钮
    openUpdateDrawer () {
      this.title = '新增货品名称'
      this.drawerAdd = true
    },
    // 关闭新增货品名称窗口
    drawerAddClose () {
      this.$refs.addFlawParamsRef.resetFields()
      this.addFlawParams = {
        name: '',
        note: ''
      }
      this.drawerAdd = false
    },
    // 保存新增货品名称按钮
    postAddFlawForm () {
      this.$refs.addFlawParamsRef.validate(async value => {
        if (!value) return
        if (this.title === '新增货品名称') {
          const res = await this.$post('/fabric/goods', this.addFlawParams)
          messageUtil.message.success(res.message)
        } else {
          const res = await this.$put('/fabric/goods/' + this.bianJiId, this.addFlawParams)
          messageUtil.message.success(res.message)
        }
        this.getFlawList()
        this.drawerAddClose()
      })
    },
    // 编辑
    bianJi (value) {
      this.title = '编辑货品名称'
      this.noteshow = true
      this.addFlawParams.name = value.name
      this.addFlawParams.note = value.note
      this.bianJiId = value.id
      this.drawerAdd = true
    },
    // 删除
    del (value) {
      messageUtil.confirm('确认要删除该货品名称吗？', async a => {
        const res = await this.$deletefn('/fabric/goods/' + value.id, {})
        messageUtil.message.success(res.message)
        this.getFlawList()
      })
    }
  }
}
</script>

<style>
.productName {
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100%);
  height: calc(100vh - 64px) !important;
}
.productName .note {
  height: 64px;
}
.productName .noteText {
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
  height: 28px;
  padding-left: 32px;
  padding-top: 18px;
  font-weight: bold;
}
.productName .data {
  width: calc(100%);
  min-height: calc(100% - 112px);
  height: auto;
  padding: 24px 24px 24px 24px;
  background-color: #f0f3f7;
}
.productName .dataContent {
  width: calc(100% - 48px);
  background-color: #fff;
  border-radius: 2px;
  border-radius: 2px;
  padding-bottom: 32px;
}
.productName .searchArea {
  width: calc(100%);
  margin: 0px 24px 0px 0px;
}

.productName .searchForm {
  padding-top: 24px;
  padding-left: 32px;
}

.productName .dataListArea {
  margin: 0px 24px 24px 24px;
}

.productName .tableData {
  height: 100%;
}
.productName .addBottomBtn {
  display: flex;
  justify-content: center;
}
.productName .addBottomBtn .el-button {
  margin: auto 20px;
}
.productName .page {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
