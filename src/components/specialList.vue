<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>开设以下专业</span>
      </div>
    </template>
    <div class="items">
      <span v-for="(item,index) in schoolSpecialList[0]" :key="index" class="box-list">
        {{item}} </span>
    </div>
  </el-card>
</template>

<script>
import { onBeforeUpdate,  ref} from "vue";
import emitter from "../utils/eventBus"
export default {
  name: "infoPage",
  setup(){
    let schoolSpecialList = ref([])
    onBeforeUpdate(()=>{
      emitter.on('schoolSpecial' ,(data) => {
        schoolSpecialList.value.push(data)
      })
    })

    return {schoolSpecialList }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
}


.items{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}


.box-card {
  /*width: 480px;*/
}
.box-list {
  /*background: gray;*/
  margin: 5px 5px 5px 5px;
  border:1px solid #a5b6c8;background:#eef3f7;
  padding: 5px 5px 5px 5px;
  border-radius: 2px;
}
</style>