<template>
  
  <div class="ceshi">
    <div>
      <div v-for="(item,index) in list" :key="index">
        <span>{{item.data}}</span>
        <span>{{item.time}}</span>
        <div class="item2">
          <div v-for="(item2,index2) in item.obj" :key="index2">
          <span>{{item2.a}}</span>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return{
      list:[
        {data:123,time:'a123',obj:[
          {a:'asd',b:'afasd',c:'1234'},
          {a:'1asd',b:'afasd',c:'1234'},
          {a:'2asd',b:'afasd',c:'1234'},
          {a:'3asd',b:'afasd',c:'1234'},
          {a:'4asd',b:'afasd',c:'1234'}
        ]},
         {data:1243,time:'b124123',obj:[
          {a:'asd',b:'afa123sd',c:'1234'},
          {a:'asd',b:'afa123sd',c:'1234'},
          {a:'asd',b:'af2asd',c:'1234'},
          {a:'asd',b:'af41asd',c:'1234'},
          {a:'asd',b:'afa4sd',c:'1234'}
        ]},
         {data:112323,time:'c123',obj:[
          {a:'a4sd',b:'afasd',c:'1234'},
          {a:'asd',b:'afasd',c:'1234'},
          {a:'asd',b:'afasd',c:'1234'},
          {a:'asd',b:'afasd',c:'1234'},
          {a:'asd',b:'afasd',c:'1234'}
        ]}
      ]
    }
  }
}
</script>

<style>
.item2{
  display: flex;
}
</style>