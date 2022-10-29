<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container class="r-container">
        <common-heager />
        <common-tab />
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CommonAside from '../components/CommonAside.vue'
import CommonHeager from '../components/CommonHeager.vue'
import CommonTab from '../components/CommonTab.vue'


export default defineComponent({
  components: {
    CommonAside,
    CommonHeager,
    CommonTab
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
  height: 100%;
}

.common-layout {
  .lay-container {
    flex-wrap: nowrap;

    .right-main {
      height: calc(100% - 124px) !important;
      padding: 0 20px;
    }
  }

  height: 100%;

  &>.el-container {
    height: 100%;

    &>.el-aside {
      height: 100%;
      background: #545c64;
    }
  }

}
</style>