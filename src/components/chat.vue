<template>
  <div>
    <div class="header">
      <div class="back" >
        <button @click="back">返回</button>
      </div>
      <div class="tip"> 您当前选择的生源地是:{{ province }} </div>
    </div>
    <div class="que-input">
      <el-input v-model="inputInfo" placeholder="请输入您的问题" clearable />
      <el-button type="success"  @click = 'subMessage'>发送</el-button>
    </div>
    <div class="ans-input">
      <el-input v-model="ans" placeholder="正在为您准备答案" disabled />
      <el-button type="primary"  @click="openDrawer">打开</el-button>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router/dist/vue-router";
import {getAnswer} from "@/api/api";
import {options} from "@/utils/transtion"
import emitter from "../utils/eventBus"


export default {
  name: "chatPage",
  setup(props, {emit}){

    let provinceId = localStorage.getItem("province");
    let province = ref()
    for (let index in options){
      if (provinceId === options[index].value){
        province = options[index].label
      }
    }

    // const {instance} = getCurrentInstance();
    const $router = useRouter();
    //返回上一级
    function back(){
      $router.push({ path:'/'})
    }

    let inputInfo = ref('浙师大隶属于哪里');
    // 获取的答案信息
    let message = reactive({})
    let message_box = ref()
    // 获取到的答案类型
    let ans = ref('')
    //未在知识图谱中查询到您问题的答案，通过链接预测模型进行预测，您问的问题答案可能是：浙江省
    let ans_type = '';
    //控制抽屉状态
    let drawer = ref(false)

    function openDrawer(){
      emit('drawerType',true)
    }


    function subMessage(){

      let question = inputInfo.value;

      getAnswer(question,provinceId).then(
          response => {
            ans_type = response.data.data[0][0];
            if(ans_type === 'school_info' || ans_type === 'school_desc'){
              message = response.data.data[1][0];
              // 学校信息
              ans.value = '为您查询到结果:'+message.n.name
              emitter.emit('schoolInfo',message)
              emit('sendType',1)
              emit('drawerType',true)
            }
            else if(ans_type === 'school_special'){
              // 学校专业
              message = response.data.data[1];
              ans.value ='为您查询到该学校开设专业目录'
              let set = new Set
              for (let item of message){
                set.add(item['nn.name'])
              }
              emitter.emit('schoolSpecial',[...set])
              emit('sendType',2)
            }
            else if(ans_type === 'school_score'){
              // 学校分数
              message = response.data.data[1][0];
              ans.value = '为您查询到该学校录取分数线'
              let messageObj = JSON.parse(message.nn.info.replaceAll(/'/g, '"').replaceAll('None','"无"'))
              emitter.emit('schoolScore',messageObj)
              emit('sendType',3)
            }
            else if(ans_type === 'school_special_score'){
              // 专业分数
              message = response.data.data[1];
              ans.value = '您查询到该学校专业的录取分数线'
              let infoArr = []
              for (let item of message){
                infoArr.push(JSON.parse(item['p.info'].replaceAll(/'/g, '"').replaceAll('None','"无"')))
              }
              emitter.emit('schoolScore',infoArr)
              emit('sendType',4)
            }
            else {
              ans.value = '未查询到结果'
              emit('sendType',0)
            }
          })
    }

    return {
      province,
      inputInfo,
      message,
      message_box,
      ans,
      drawer,
      back,
      subMessage,
      openDrawer,
    }
  }
}
</script>

<style scoped>
  @import "@/assets/css/scroll.css";

  .que-input{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .ans-input{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .el-button{
    margin-left: 15px;
  }

  .header{
    height: 40px;
    display: flex;
    padding-top: 10px;

  }

  .back{
    margin-left: 20px;
  }

  .tip{
    text-align:center;
    flex-grow: 2;
    padding-right: 35px;
  }




</style>
