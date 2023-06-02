<template>
  <div class="card">
    <el-card class="box-card">
      <template #header >
        <div class="card-header">
          <span>{{ schoolInfo.学校名称}}</span>
        </div>
      </template>
      <div class="items">
        <div v-for="(key,value) in schoolInfo" :key="key" class="text item">
          <span>{{value}}</span>
          <span>{{key}}</span>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
import { reactive} from "vue";
import emitter from "../utils/eventBus"
export default {
  name: "infoPage",
  setup(){
    let schoolInfo = reactive({})

    emitter.on('schoolInfo' ,(data) => {
      schoolInfo['学校名称'] = data.n.name
      schoolInfo['学校层次'] = data.n.school_level
      schoolInfo['学校类型'] = data.n.school_type
      schoolInfo['学校性质'] = data.n.school_nature

      schoolInfo['所在省份'] = data.n.province_name
      schoolInfo['所在城市'] = data.n.city_name
      schoolInfo['地址'] = data.n.address
      schoolInfo['隶属于'] = data.n.belong_to

      schoolInfo['是否985'] = data.n.is_985 === '1'? '是':'否'
      schoolInfo['是否211'] = data.n.is_211 === '1'? '是':'否'

      schoolInfo['学校官网'] = data.n.school_url
      schoolInfo['学校招新网'] = data.n.school_adm_url
      schoolInfo['学校电话'] = data.n.school_phone
      schoolInfo['学校邮箱'] = data.n.mail

      schoolInfo['软科排名'] = data.n.rank_rk
      schoolInfo['校友会排名'] = data.n.rank_xyh
      schoolInfo['US排名'] = data.n.rank_us

      schoolInfo['博士点'] = data.n.doctor_station
      schoolInfo['硕士点'] = data.n.master_station
      schoolInfo['重点学科'] = data.n.subject_na

      schoolInfo['创校时间'] = data.n.time_creation
      schoolInfo['学校面积'] = data.n.school_area
      schoolInfo['学校简称'] = data.n.short_name

      schoolInfo['信息更新时间'] = data.n.updata_time
    })

    return {schoolInfo }
  }
}
</script>

<style scoped>


  .card{
    display: flex;
    justify-content: space-around;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  .items{
    display: flex;
    flex-direction: column;
  }
  .text {
    font-size: 14px;
  }

  .item {
    display: flex;
    margin-bottom: 7px;
    flex-direction: row;
    justify-content: space-between;
    border-bottom:1px solid #cceff5;
    /*font-size: 20px;*/
  }

  .box-card {
    width: 480px;
  }
</style>