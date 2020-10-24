<template>
    <!-- <div id="warning">
      
    </div> -->
    <div>

    </div>
</template>

<script>
export default {
   data:{
      
   },
   methods:{

   },
   created(){
    
     this.$get('/machine').then((data)=>{
         //  console.log(data);
         
        })
   }
}
</script>

<style scoped>
#warning{
   position: fixed;
   right: 20px;
   top: 100px;
   width: 50px;
   height: 50px;
   border-radius: 50%;
   background:red;
   text-align: center;
   
}
</style>