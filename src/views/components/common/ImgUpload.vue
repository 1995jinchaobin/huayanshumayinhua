<template>
  <div class="imgupload">
    <!-- action 图片上传的数据库地址 on-remove 图片移除  list-type 图片显示效果  headers 设置上传的请求头部   on-success 文件上传成功的钩子函数-->
    <el-upload
      :limit="1"
      :selectCount=1
      :action="$imgUrl+'/file'"
      :before-upload="beforeAlbumUpload"
      :file-list="[]"
      :on-remove="handleRemove"
      list-type="picture"
      :headers="headerAuthorization"
      :on-progress="ceshi"
      :on-success="headerSuccess"
      :show-file-list="showList">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <!-- <el-upload
      :limit="1"
      :selectCount=1
      action="#"
      ref="upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :http-request="httpRequest"
      :on-exceed='handlexceed'
      :file-list="fileList"
      multiple
      :on-success="handSuccess"
      :on-change="handleChange"
      :data="getUploadList">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload> -->
  </div>
</template>

<script>
import messageUtil from '../../../utils/js/MessageUtil'
import defaultMethod from '../../../utils/js/CookieUtil';
export default {
  data () {
    return {
      headerAuthorization: {
        // 给图片的上传路径添加保存在sessionStorage的token
        token: defaultMethod.getItem('token')
      },
      showList:false
    }
  },
  methods: {
    ceshi(a) {console.log(a)},
    // 图片上传成功
    headerSuccess (res) {
      console.log(res)
      if (res.code !==0) {
        this.showList = false
        return messageUtil.message.error(res.message)
      }
      messageUtil.message.success(res.message)
      this.showList = true
      this.$emit('imgPath', res)
      // this.$post('/pic').then((data)=>{
      //   console.log(data)
      //   this.userList = data.data.list;
      // })
    },
    // 文件上传限制
    beforeAlbumUpload (file) {
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 图片移出
    handleRemove (file) {
      this.$emit('delImgPath')
    }
  }
}
</script>

<style>
</style>