<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shafow="hover">
                <div class="user">
                    <img src="../../assets/vue.svg" />
                    <div class="user-info">
                        <p class="name">amy</p>
                        <p class="role">超級管理員</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登錄時間:<span>2022-9-1</span></p>
                    <p>上次登錄底點:<span>深圳</span></p>
                </div>
            </el-card>
            <el-card shafow="hover" style="margin-top: 20px;" height="450px">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px;">
            <div class="num-card">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
                    <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
                    <div class="details">
                        <p class="num">${{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height:280px;">
                <div ref="echart" style="height:280px;"></div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { defineComponent, onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios'
export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance();
        let tableData = ref([]),
            countData = ref([]);
        const tableLabel = {
            name: '課程',
            todayBuy: '今日購買',
            monthBuy: '本月購買',
            totalBuy: '總購買'
        }
        //表格數據
        const getTableList = async () => {
            let res = await proxy.$api.getTableData();
            tableData.value = res
        };
        //count數據
        const getCountData = async () => {
            let res = await proxy.$api.getCountData();
            countData.value = res
        };

        onMounted(() => { getTableList(); getCountData() });

        return {
            tableData,
            tableLabel,
            countData
        }
    }
})
</script>

<style lang="scss" scoped>
.home {
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;

        img {
            width: 150px;
            height: 150px;
            margin-right: 40px;
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }

    .num-card {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;
        }

        .icons {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: white;
        }

        .details {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .num {
                font-size: 30px;
                margin-bottom: 10px;
            }

            .txt {
                font-size: 14px;
                text-align: left;
                color: #999;
            }
        }
    }
}
</style>