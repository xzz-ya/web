<template>
  <div class="box">
    <div class="up">
      <chat-page  @sendType = 'getType' @drawerType = 'getDrawer'></chat-page>
    </div>
    <div class="down scroller">
      <special-list v-show="showType === 2"></special-list>
      <chart-page  v-show="showType === 3"></chart-page>
      <special-chart  v-show="showType === 4"></special-chart>
    </div>


    <div class="drawer-style">
      <el-drawer v-model="drawer" :with-header="false">
        <div class="scroller">
          <info-page></info-page>
        </div>
      </el-drawer>
    </div>



  </div>
</template>

<script>
import chatPage from "@/components/chat";
import infoPage from '@/components/info';
import chartPage from '@/components/chart'
import SpecialList from "@/components/specialList";
import SpecialChart from "@/components/specialChart";
import {ref} from "vue";


export default {
  name: "homePage",
  components: { SpecialChart, SpecialList, chatPage,infoPage,chartPage},
  setup(){
    let showType = ref(0);

    const drawer = ref(false)
    let getType = (n) => {
      showType.value = n;
    }

    let getDrawer = (n) => {
      drawer.value = n;
    }

    return {getType, getDrawer, showType,drawer}

  }
}
</script>

<style scoped>
@import "../assets/css/scroll.css";
.drawer-style >>> .el-drawer{
  padding: 0px 0px 0px 0px !important;
}

.box{

  position: relative;

  -webkit-box-shadow: 0 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset;

  -moz-box-shadow: 0 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset;

  box-shadow: 0 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset;

  -o-box-shadow:0 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset;
      display: flex;
      height: 98vh;
      flex-direction:column;
  }

.up{
  border-bottom: 1px solid #ccc;
}
.down{
  overflow: auto;
}
</style>