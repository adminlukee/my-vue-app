<template>
    <el-header>
        <div class="l-content">
            <el-button size="small" plain @click="handleCollapse">
                <el-icon :size="18">
                    <Menu />
                </el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <!-- 首頁寫死 -->
                <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: curuent.path }" v-if="curuent">{{ curuent.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" :src="getImgSrc('vue.svg')" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>個人中心</el-dropdown-item>
                        <el-dropdown-item>
                            <el-button type="danger" round @click="handleLogout">登出</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import router from '../router';
export default defineComponent({
    setup() {
        const store = useStore();
        let getImgSrc = (data) => {
            //動態的靜態資源引入
            return new URL(`../assets/${data}`, import.meta.url).href;
        };

        let handleCollapse = () => {
            store.commit('updataIsCollapse')
        };
        const clickMenu = (item) => {
            store.commit('selectMenu', item);
        };
        const curuent = computed(() => {
            return store.state.currentMenu
        });

        const handleLogout = () => {
            store.commit('logoutRemove');
            store.commit('clearToken');
            router.push({
                name: 'login'
            })
        };
        return {
            getImgSrc,
            handleCollapse,
            clickMenu,
            curuent,
            handleLogout
        }
    }
})
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;

}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: white;
    }
}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }

    h3 {
        color: #fff;
    }
}

.bread ::v-deep span {
    color: #fff !important;
    cursor: pointer !important;
}
</style>