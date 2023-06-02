<template>
  <div class="box case-content">
    <h4 class="text"> 选择您的生源地 </h4>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="proValue" class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="go">Go</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div>
    <div class="box case-content">
      <h4 class="text"> 选择您所需要查询的信息 </h4>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="pro_ss" class="m-2" placeholder="请输入您的生源地" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-select v-model="pro_tar" class="m-2" placeholder="请输入您的目标省份" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-select v-model="exam_type" class="m-2" placeholder="请输入您的考试类型" size="large">
            <el-option
                v-for="item in exam"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-input v-model.number="score" style="width: 200px;height: 40px" class="w-50 m-2" placeholder="请输入您的分数" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="que_school">Go</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router/dist/vue-router";
import {ref} from "vue";
import {options,exam} from "@/utils/transtion"
import {getSchool} from "@/api/api";
import emitter from "@/utils/eventBus";

export default {
  name: "loginIndex",
  setup() {
    let proValue = ref('')
    let pro_ss = ref('33')
    let pro_tar = ref('33')
    let exam_type = ref('3')
    let score = ref(550)
    let show = ref(false);

    const $router = useRouter();
    //点击方法
    function go(){
      localStorage.setItem("province",proValue.value)
      $router.push({
        path:'/home',
      })
    }

    function que_school(){
      getSchool(pro_ss.value,pro_tar.value,exam_type.value,score.value).then(
          response =>{
             let message = response.data.ans
             localStorage.setItem("schoolList",JSON.stringify(message))
             emitter.emit('schoolList',message)
          }
      )
      $router.push({
        path:'/schoolList',
      })
    }

    return {options,exam,proValue,go,que_school,pro_ss,pro_tar,score,show,exam_type}
  }
}
</script>



<style scoped>
@import "@/assets/css/shadow.css";

.text{
    padding-top: 20px;
    font-size: 20px;
  }
  .box {

    width: 60%;

    margin: 10px auto;

    padding-bottom: 30px;

    background-color: #fff;

    font-size: 20px;

    line-height: 50px;

    text-align: center;

  }

</style>