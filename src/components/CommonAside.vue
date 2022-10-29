<template>
      <el-aside :width="$store.state.isCollapse ? '180px' : '64px'">
            <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                  :collapse="!$store.state.isCollapse" :collapse-transition="false">
                  <h3 v-show="$store.state.isCollapse">後台管理</h3>
                  <h3 v-show="!$store.state.isCollapse">後台</h3>
                  <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path" @click="clickMenu(item)">
                        <!-- 動態icon -->
                        <component class="icons" :is="item.icon"></component>
                        <span>{{ item.label }}</span>
                  </el-menu-item>
                  <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path">
                        <template #title>
                              <component class="icons" :is="item.icon"></component>
                              <span>{{ item.label }}</span>
                        </template>
                        <el-menu-item-group>
                              <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children"
                                    :key="subIndex" @click="clickMenu(subItem)">
                                    <component class="icons" :is="subItem.icon"></component>
                                    <span>{{ subItem.label }}</span>
                              </el-menu-item> 
                        </el-menu-item-group>
                  </el-sub-menu>

            </el-menu>
      </el-aside>
</template>

<script>
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';
export default {
      setup() {
            const router =useRouter();
            const store =useStore();
            const noChildren = () => {
                  return asyncList.filter((item) => !item.children);
            };

            const hasChildren = () => {
                  return asyncList.filter((item) => item.children);
            };
            //vuex中菜單
            const asyncList = store.state.menu;
            const clickMenu =(item)=>{
                  router.push({
                        name:item.name
                  })
                  store.commit('selectMenu',item);
            };

            return {
                  noChildren,
                  hasChildren,
                  clickMenu
            }
      }
}
</script>

<style lang="scss" scoped>
.el-menu {
      border-right: none;
      h3{
            line-height: 48px;
            color: white;
            text-align: center;
      }
}

.icons {
      width: 18px;
      height: 18px;
}
</style>