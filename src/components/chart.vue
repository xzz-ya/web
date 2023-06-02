<template>
  <div class="base-box">
    <div class="chart-box">
      <div id="myChart1" class="chart"></div>
      <div id="myChart2" class="chart"></div>
      <div id="myChart3" class="chart"></div>
    </div>
    <div class="info-box">
      <div class="div-info">考试类别：{{examName}}</div>
      <div class="div-info">录取批次：{{enroll_batch}}</div>
      <div class="div-info">录取类别：{{enroll_type}}</div>
      <div class="div-info">选科名称：{{sg_name}}</div>
      <div class="div-info">选科信息：{{sg_info}}</div>
      <el-button type="success" class="but" @click = 'nextPage'>下一页</el-button>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {onMounted, reactive, ref} from "vue";
import emitter from "../utils/eventBus"
import {typeExam} from "@/utils/transtion";

export default {
  name: "chartPage",
  setup() {

    let info = reactive({})
    let count = 0

    let score_min = ref([0,0,0,0,0])
    let min_rank = ref([0,0,0,0,0])
    let provide_line = ref([0,0,0,0,0])


    let examName = ref("")
    let enroll_batch = ref("")
    let enroll_type = ref("")
    let sg_name = ref("")
    let sg_info = ref("")

    let myChart1;
    let myChart2;
    let myChart3;
    onMounted(()=>{
      myChart1 = echarts.init(document.getElementById("myChart1"));
      myChart2 = echarts.init(document.getElementById("myChart2"));
      myChart3= echarts.init(document.getElementById("myChart3"));
    })

    function nextPage(){
      let eKey = Object.keys(info)
      count = count % eKey.length
      let keyType = eKey[count]
      examName.value = typeExam[keyType]
      let flag = 0
      for (let keyYear in info[keyType]){
        let data = info[keyType][keyYear]
        if(parseInt(keyYear)>2017 && parseInt(keyYear)<2023){
          score_min.value[parseInt(keyYear)-2018] = parseInt(data.score_min)
          min_rank.value[parseInt(keyYear)-2018] = parseInt(data.min_rank)
          provide_line.value[parseInt(keyYear)-2018] = parseInt(data.provide_line)
        }

        if(flag < parseInt(keyYear)){
          flag = parseInt(keyYear)
          enroll_batch.value = data.enroll_batch
          enroll_type.value = data.enroll_type
          sg_name.value = data.sg_name
          sg_info.value = data.sg_info
        }
      }


      myChart1.setOption({
        title: {
          text:'最低录取分数',
          left: 'center',
          top: '10px',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }

        },
        xAxis: {
          data: ["2018","2019","2020","2021","2022"]
        },
        yAxis:{},
        series: [
          {
            name: "最低分",
            type: "line",
            data: score_min.value
          },
        ]
      });
      myChart2.setOption({
        title: {
          text:'最低录取排名',
          left: 'center',
          top: '10px',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        xAxis: {
          data: ["2018","2019","2020","2021","2022"]
        },
        yAxis:{},
        series: [
          {
            name: "最低排名",
            type: "line",
            data: min_rank.value
          },
        ]
      });
      myChart3.setOption({
        title: {
          text:'省分数线',
          left: 'center',
          top: '10px',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        xAxis: {
          data: ["2018","2019","2020","2021","2022"]
        },
        yAxis:{},
        series: [
          {
            name: "省分数线",
            type: "line",
            data: provide_line.value
          },
        ]
      });
      window.onresize = function () { // 自适应大小
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
      };
      count += 1
    }


    emitter.on('schoolScore',(data)=>{
      info = reactive(data)
    })

    return{
      nextPage,info,enroll_batch,enroll_type,examName,sg_name,sg_info
    }
  }
}
</script>

<style scoped>
.base-box{
  display: flex;
  flex-direction:column;
  height: 100%;
  width: 100%;
}
.chart{
  width: 400px;
  height: 300px;
}

.chart-box{
  display: flex;
  flex-direction: row;
  height: 50%;
  width: 100%;
}
.info-box{
  margin-top: 20px;

}


.div-info{
  display: flex;
  border:1px solid #96c2f1;
  background:#f0fbeb;
  border-radius: 2px;
  justify-content: flex-start;
  margin-top: 10px;
  padding-left: 10px;

}

.but{
  margin-top: 10px;
}

</style>