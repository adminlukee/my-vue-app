<template>
    <el-form :model="loginForm" class="login-container">
        <h3>系统登录</h3>
        <el-form-item>
            <el-input type="input" placeholder="请输入账号" v-model="loginForm.username">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login"> 登录 </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
    setup() {
        const {proxy} = getCurrentInstance();
        const store =useStore();
        const router =useRouter();
        const loginForm = reactive({
            username: "admin",
            password: "admin"
        });
        const login = async () => {
            // 登錄返回菜單
            const res = await proxy.$api.getMenu(loginForm);
            store.commit('setMenu',res.menu);
            store.commit('addMenu',router);
            store.commit('setToken',res.token);
            router.push({
                name:"home"
            });
        };
        return {
            loginForm,
            login
        }
    }
})
</script>

<style lang="scss" scoped>
.login-container {
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    h3 {
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }

    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>