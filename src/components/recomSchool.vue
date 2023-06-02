<template>
<!--    <div class="card bak">-->
<!--      <el-card class="box-card scroller">-->
<!--        <template #header >-->
<!--          <div class="card-header">-->
<!--            <span>为您查询到合适的学校</span>-->
<!--          </div>-->
<!--        </template>-->
<!--        <div class="items">-->
<!--          <h4>此分段学校近年平均成绩高您10-30分，可以冲击</h4>-->
<!--          <div v-for="(item,index) in info[0]" :key="index" class="text item">-->
<!--            <div v-for="(key,value) in item" :key="key" class="part">-->
<!--              <span>{{value}}</span>-->
<!--              <span>{{parseInt(key)}}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <h4>此分段学校近年平均成绩在您±10分，比较合适</h4>-->
<!--          <div v-for="(item,index) in info[1]" :key="index" class="text item">-->
<!--            <div v-for="(key,value) in item" :key="key" class="part">-->
<!--              <span>{{value}}</span>-->
<!--              <span>{{parseInt(key)}}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <h4>此分段学校近年平均成绩低您10-30分，比较稳定</h4>-->
<!--          <div v-for="(item,index) in info[2]" :key="index" class="text item">-->
<!--            <div v-for="(key,value) in item" :key="key" class="part">-->
<!--              <span>{{value}}</span>-->
<!--              <span>{{parseInt(key)}}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-card>-->
<!--    </div>-->
  <div class="collapse case-content">
    <el-collapse>
      <el-collapse-item name="1">
        <template #title>
          <h2>此分段学校近年平均成绩高您10-30分，可以冲击</h2>
        </template>
        <div v-for="(item,index) in info[0]" :key="index" class="text item">
          <div v-for="(key,value) in item" :key="key" class="part">
            <span>{{value}}</span>
            <span>{{parseInt(key)}}</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <h2>此分段学校近年平均成绩在您±10分内，比较合适</h2>
        </template>
        <div v-for="(item,index) in info[1]" :key="index" class="text item">
          <div v-for="(key,value) in item" :key="key" class="part">
            <span>{{value}}</span>
            <span>{{parseInt(key)}}</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          <h2>此分段学校近年平均成绩低您10-30分，比较稳定</h2>
        </template>
        <div v-for="(item,index) in info[2]" :key="index" class="text item">
          <div v-for="(key,value) in item" :key="key" class="part">
            <span>{{value}}</span>
            <span>{{parseInt(key)}}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
import {reactive} from "vue";

export default {
  name: "RecommendSchool",

  setup(){
    let a = JSON.parse(localStorage.getItem("schoolList"))
    let info = reactive(a)
    return {
      info,
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/scroll.css";
@import "@/assets/css/shadow.css";

.bak{
  background: url("../assets/image/jbti1.gif") no-repeat;
  background-size: cover;
}
.card{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  margin-top: 10px;

}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px
}
.items{
  display: flex;
  flex-direction: column;
}

.collapse{
  width: 70vw;

  margin: 30px auto 0 auto ;

}

h2{
  margin-left: 15px;
  margin-right: 15px;
}
.text {
  font-size: 14px;
}

.item {
  display: flex;
  /*margin-bottom: 7px;*/
  margin-left: 15px;
  margin-right: 15px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom:1px solid #cceff5;
  font-size: 20px;
}

.box-card {
  width: 600px;
  height: 95vh;
  overflow: auto;
  margin-bottom: 10px;
}

.part {
  display: flex;
  margin-bottom: 7px;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  width: 100%;
}
</style>