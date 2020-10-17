<template>
　　<div>
<!-- 　　　　<Row>
　　　　　　<Col :sm="24" :md="24" lg:="24"> -->

　　　　　　　　<form id="myForm" enctype="multipart/form-data" name="fileinfo" action="" target="uploadFrame"> 
 <!-- //这里设置目标为iframe的name,这样提交表单数据的时候就不会刷新页面 -->
　　　　　　　　　　<div class="img-file">
　　　　　　　　　　　　<label>请选择上传的文件:</label>
　　　　　　　　　　　　<input @change='changeImg' id='imgFile' type='file'/>
　　　　　　　　　　　　<!-- <input id="submit" type="submit" value="确认上传" /> -->
　　　　　　　　　　</div>
　　　　　　　　</form>
　　　　　　　　<iframe id="uploadFrame" name="uploadFrame" style="display:none;"></iframe>  
<!-- //解决form表单提交数据刷新问题 -->

　　　　　　　　<!-- 展示服务器返回的图片 -->
<!-- 　　　　　　　　<div class="box1">
　　　　　　　　　　<div class="imgbox">
　　　　　　　　　　　　<img class="auto-img" :src='srcs' :id='ids'/>
　　　　　　　　　　</div>
　　　　　　　　　　<div class="texts" :dates="dates">{{dates}}</div>
　　　　　　　　</div> -->
<!-- 　　　　　　</Col>
　　　　</Row> -->
<div id="printArea">123123</div>
<button  v-print="'#printArea'">打印</button>
<!-- 上传 -->
<form method="post" enctype="multipart/form-data" id="myform">
      <input type="file" name="file" @change="change"/>
      <!-- <input type="file" name="file"/> -->
      <img :src="url" alt="#">
      <button @click.prevent="tijiao">提交</button>
    </form>
    <!-- 图片上传 -->
    <div>
        <div>
            <div></div>
            <div>本地上传</div>
            <input type="file"  class="fileInput" ref="file" id="file" placeholder=""  @change="chooseFile" accept="image/*"/>
        </div>
    </div>
　　</div>
</template>

<script>
　　import Cookies from 'js-cookie';
　　import axios from 'axios';
　　import qs from 'qs';
　　export default{
　　　　data(){
　　　　　　return{
  url:''
　　　　　　　　//默认图片地址，地址通过动态修改
// 　　　　　　　　srcs: 'http://test.laihaiqiang.com/image/timg.jpg', 
　　　　　　　　// 图片id ，为了避免和标签的id冲突，尽量使用别称，如id1,ida等。
// 　　　　　　　　ids: 0,
　　　　　　　　// 创建时间
// 　　　　　　　　dates: '',

　　　　　　　　//文件
// 　　　　　　　　file: null,
　　　　　　}
　　　　},
// created(){this.ceshi1()},
　　　　methods:{
  chooseFile(){
    console.log(123)
    // axios.post()
  },
  ceshi1(){
    const a = {
      file:'',
      type:3
    }
     this.$post('/file',this.detailInfo).then((data)=>{
       console.log(data)
                // messageUtil.message.success(data.message)
                // this.closeCheckDrawer();
                // this.getData();
              })
  },
  tijiao(){
          console.log(123)
          let fd = new FormData(document.getElementById('myform'))

          console.log(fd)
          this.$post('/file',fd).then((data)=>{
                // messageUtil.message.success(data.message)
                // this.closeCheckDrawer();
                // this.getData();
                console.log(data)
              })
        },
        // 图片预览
        change(a){
          console.log(a)
          console.log(a.target.files[0])
          const file = a.target.files[0]
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.onload = e=> {
            console.log(e)
            this.url = e.target.result
          }
        },
　　　　　　changeImg(a){
  console.log(a)
  console.log(a.target)
// 　　　　　　　　var that = this;  //这里使用一个变量 that来拼接this,这样的话在内部就使用thar,在外部就使用this,这样就不会出现指向丢失问题。
　　　　　　　　var file = document.getElementById("imgFile").files[0]; //获取文件
              console.log(file)
// 　　　　　　　　that.file = file; 　//获取data里面的预设默认file,并把获取到的文件赋给它 
// 　　　　　　　　var ids = this.ids; //获取ata里面的id

　　　　　　　　var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加到FormData里面，这样就可以直接把formData作为参数传递了
　　　　　　　　if (file) {

　　　　　　　　　　formData.append('file', file);　　
                  formData.append('type', 3)
                  console.log(formData)
                  console.log(formData.get('type'))
                  console.log(formData.get('file'))
　　　　　　　　}
axios.post('/file',formData).then((res)=>{console.log(res)})

// 　　　　　　　　let potss = formData;
console.log(formData)
// 　　　　　　　　let urls = 'http://192.168.1.115:9999/file';   //数据接口
// this.$get('/inventory/list',{
//         page:1,rows:10
//       }).then((data)=>{
//         console.log(data)
//       })
// file=%5Bobject%20File%5D&type=3
const aa = {
  file:'%5Bobject%20File%5D',
  type:3
}
　　　　　　　　this.$post('/file', aa,
{
            headers: {
              "Content-Type": "multipart/form-data"
            }}
            )
　　　　　　　　.then(res =>{
　　　　　　　　　　console.log('rehsdddddd===>>>', res);
　　　　　　　　})
// 　　　　　　　　.catch(function(err){
// 　　　　　　　　　　console.log('err=ssss=>>', err);
// 　　　　　　　　})
　　　　　　},
　　　　},
// 　　　　created : function(){
// 　　　　　　var that = this;
// 　　　　　　console.log('1234567890987654321 ==> ', this.file);
// 　　　　　　let postToken = qs.stringify({
// 　　　　　　　access_token : Cookies.get('Admin-Token'),
// 　　　　　　})
// 　　　　　　let api = 'http://.....................................................';
// console.log(postToken)
// 　　　　　　axios.post(api, postToken)
// 　　　　　　.then(function(res){
// 　　　　　　　　console.log('resss===>>>', res);
// 　　　　　　　　console.log('code===>>>', res.data.code);
// 　　　　　　　　console.log('message===>>>', res.data.message);
// 　　　　　　　　console.log('logo图片地址==>>', res.data.data.img_url);
// 　　　　　　　　console.log('logo图片id==>>', res.data.data.id);
// 　　　　　　　　console.log('logo图片创建日期==>>', res.data.data.create_time);

// 　　　　　　　　// 修改图片的路径
// 　　　　　　　　that.srcs = res.data.data.img_url;
// 　　　　　　　　//图片创建时间
// 　　　　　　　　if(res.data.data.create_time == '' || res.data.data.create_time == null){
// 　　　　　　　　　　that.dates = '';
// 　　　　　　　　}else{
// 　　　　　　　　　　that.dates = '添加时间：' + res.data.data.create_time;
// 　　　　　　　　}
// 　　　　　　　　//图片id
// 　　　　　　　　that.ids = res.data.data.id;

// 　　　　　　})
// 　　　　　　.catch(function(err){
// 　　　　　　　　console.log('err=ssss=>>', err);
// 　　　　　　})
// 　　　　}
　　}
</script>

<style scoped>
/* 　　.imgbox{
　　　　width:200px;
　　　　height:200px;
　　　　margin:0 auto;
　　　　border: 1px solid #0f0;
　　}
　　.texts{
　　　　width:100%;
　　　　margin:10px 0 0;
　　　　text-align: center;
　　}
　　.upbox{
　　　　width:100%;
　　　　margin:0 auto;
　　　　text-align: center;
　　}
　　.auto-img{
　　　　display: block;
　　　　width:100%;
　　}
　　.upload{
　　　　margin:30px 0;
　　}
　　.box1{
　　　　width:100%;
　　} */
</style>