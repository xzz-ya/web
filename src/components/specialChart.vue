<template>
  <div class="base-box" >
    <div class="chart-box" >
        <div id="myChart11" class="chart"></div>
        <div id="myChart12" class="chart"></div>
        <div id="myChart13" class="chart"></div>
    </div>
    <div class="info-box">
      <div class="left-box">
        <div class="div-info">专业名称：{{sp_name}}</div>
        <div class="div-info">录取批次：{{enroll_batch}}</div>
        <div class="div-info">专业层次：{{lv1}}</div>
        <div class="div-info">专业学科：{{lv2}}</div>
        <div class="div-info">专业类别：{{lv3}}</div>
      </div>

      <div class="right-box">
        <div class="div-info">考试类别：{{exam_type}}</div>
        <div class="div-info">选科名称：{{sg_name}}</div>
        <div class="div-info">选科信息：{{sg_info}}</div>
        <div class="div-info">专业学制：{{length}}</div>
        <div class="div-info">专业学费：{{tuition}}</div>
      </div>
    </div>
    <el-button type="success" class="but" @click = 'nextPage'>下一页</el-button>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {onMounted, reactive, ref} from "vue";
import emitter from "../utils/eventBus"
import {typeExam} from "@/utils/transtion";

export default {
  name: "SpecialChart",
  setup() {

    let info = ref([])
    let count = 0


    let score_min = ref([0,0,0,0,0])
    let min_rank = ref([0,0,0,0,0])
    let plan_num= ref([0,0,0,0,0])


    let exam_type = ref('')
    let sp_name = ref('')
    let enroll_batch = ref('')
    // let enroll_type = ref('')

    let lv1 = ref('')
    let lv2 = ref('')
    let lv3 = ref('')

    let sg_name = ref('')
    let sg_info = ref('')
    let length = ref('')
    let tuition = ref('')



    let myChart11;
    let myChart12;
    let myChart13;
    onMounted(()=>{
      myChart11 = echarts.init(document.getElementById("myChart11"));
      myChart12 = echarts.init(document.getElementById("myChart12"));
      myChart13= echarts.init(document.getElementById("myChart13"));
    })



    function nextPage(){
      let keyArr = Object.keys(info)
      count = count % keyArr.length
      // 当前页面0,1,2,3
      let keyType = keyArr[count]
      let pageInfo = info[keyType]
      let flag = 0
      for (let item in pageInfo){
        let pageItem = pageInfo[item]
        pageItem = pageItem[Object.keys(pageItem)[0]]
        pageItem = pageItem[Object.keys(pageItem)[0]]
        if(parseInt(item)>2017 && parseInt(item)<2023){
          score_min.value[parseInt(item)-2018] = parseInt(pageItem.score_min)
          min_rank.value[parseInt(item)-2018] = parseInt(pageItem.min_rank)
          plan_num.value[parseInt(item)-2018] = parseInt(pageItem.plan_num)
        }
        if(flag < parseInt(item)){
          exam_type.value = typeExam[pageItem['exam_type']]
          sp_name.value = pageItem['sp_name']
          enroll_batch.value = pageItem['enroll_batch']
          // enroll_type.value = typeExam[pageItem['exam_type']]
          lv1.value = pageItem['lv1']
          lv2.value = pageItem['lv2']
          lv3.value = pageItem['lv3']
          sg_name.value = pageItem['sg_name']
          sg_info.value = pageItem['sg_info']
          length.value = pageItem['length']
          tuition.value = pageItem['tuition']
        }
      }


      myChart11.setOption({
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
            // data: score_min.value
            data:[588,596,594,583,592]
          },
        ]
      });
      myChart12.setOption({
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
            // data: min_rank.value
            data:[53141,51708,53756,60653,57167]
          },
        ]
      });
      myChart13.setOption({
        title: {
          text:'招生人数',
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
            name: "招生人数",
            type: "line",
            // data: plan_num.value
            data:[60,42,42,31,18]
          },
        ]
      });

      window.onresize = function () {
        // 自适应大小
        myChart11.resize();
        myChart12.resize();
        myChart13.resize();
      };
      count += 1
    }


    emitter.on('schoolScore',(data)=>{

      info = reactive(data)
    })

    return{
      nextPage,exam_type,sp_name,enroll_batch,lv1,lv2,lv3,sg_name,sg_info,length,tuition
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
  display: flex;
  flex-direction: row;
}

.left-box{
  width: 50%;
  margin-left: 40px;
  margin-right: 20px;
}
.right-box{
  width: 50%;
  margin-left: 20px;
  margin-right: 40px;
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

.el-button{
  margin: 10px 40px 10px 40px;
}

</style>