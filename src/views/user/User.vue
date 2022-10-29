<template>
    <div class="user-header">
        <el-button @click="handleAdd">＋新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="請輸入">
                <el-input v-model="formInline.keyword" placeholder="請輸入用戶名" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSerch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="list" style="width: 100%;height: 90%;">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop"
                :width="item.width ? item.width : 125" />
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">編輯</el-button>
                    <el-button type="danger" size="small"  @click="handleDelete(scope.row)">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pager">
            <el-pagination small background layout="prev, pager, next" :total="config.total"
                @current-change="changePage" class="mt-4" />
        </div>
    </div>
    <el-dialog v-model="dialogVisible" :title="action=='add'?'新增用戶':'編輯用戶'" width="50%" :before-close="handleClose">
        <el-form :inline="true" :model="formUser" ref="userForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name" :rules="[
                        {
                            required: true,
                            message: '姓名是必填項',
                            trigger: 'blur',
                        }
                    ]">
                        <el-input v-model="formUser.name" placeholder="請輸入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年齡" prop="age" :rules="[
                        {
                            required: true,
                            message: '年齡是必填項',
                            trigger: 'blur',
                        }, {
                            type: 'number',
                            message: '必須是數字',
                        }
                    ]">
                        <el-input v-model.number="formUser.age" placeholder="請輸入年齡" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="性別" prop="sex" :rules="[
                        {
                            required: true,
                            message: '性別是必填項',
                            trigger: 'blur',
                        }
                    ]">
                        <el-select v-model="formUser.sex" placeholder="請選擇性別">
                            <el-option label="男" value="1" />
                            <el-option label="女" value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="日期" prop="birth" :rules="[
                        {
                            required: true,
                            message: '日期是必填項',
                            trigger: 'blur',
                        }
                    ]">
                        <el-date-picker v-model="formUser.birth" type="date" label="出生日期" placeholder="請選擇"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="地址" prop="addr" :rules="[
                    {
                        required: true,
                        message: '地址是必填項',
                        trigger: 'blur',
                    }
                ]">
                    <el-input v-model="formUser.addr" placeholder="請輸入地址" />
                </el-form-item>
            </el-row>
            <el-row style="justify-content: flex-end;">
                <el-form-item>
                    <el-button type="primary" @click="handelCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">確定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref, reactive } from 'vue';
export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance();
        const list = ref([]);
        //控制dialog的顯示隱藏
        const dialogVisible = ref(false);
        //表頭數據
        const tableLabel = reactive([
            {
                prop: "name",
                label: "姓名",
            },
            {
                prop: "age",
                label: "年龄",
            },
            {
                prop: "sexLabel",
                label: "性别",
            },
            {
                prop: "birth",
                label: "出生日期",
                width: 200,
            },
            {
                prop: "addr",
                label: "地址",
                width: 320,
            },
        ]);
        //創建後渲染表
        onMounted(() => {
            getUserData(config)
        });
        //表格數據頁數,搜索名稱數據
        const config = reactive({
            total: 0,
            page: 1,
            name: ''
        })
        //表格渲然數據處理
        const getUserData = async (config) => {
            let res = await proxy.$api.getUserData(config);
            config.total = res.count;
            list.value = res.list.map((item) => {
                item.sexLabel = item.sex === 0 ? '女' : '男';
                return item;
            })
        };
        //點擊分頁
        const changePage = (page) => {
            config.page = page;
            getUserData(config);
        };
        //搜索框數據
        const formInline = reactive({
            keyword: ""
        });
        const handleSerch = () => {
            config.name = formInline.keyword;
            getUserData(config);
        };
        //關閉dailog
        const handleClose = (done) => {
            ElMessageBox.confirm('確定關閉嗎？')
                .then(() => {
                    proxy.$refs.userForm.resetFields();
                    done()
                })
                .catch(() => {
                    // catch error
                })
        };
        //取消
        const handelCancel = () => {
            dialogVisible.value = false;
            proxy.$refs.userForm.resetFields();
        };
        //日期格式化
        const timeFormat = (time) => {
            var time = new Date(time);
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var date = time.getDate();
            function add(m) {
                return m < 10 ? "0" + m : m;
            }
            return year + "-" + add(month) + "-" + add(date);
        };
        //新增用戶user數據
        const formUser = reactive({
            name: '',//用戶名
            age: '',//用戶年齡
            sex: '',//用戶男1，用戶女0
            birth: '',//用戶出生日期
            addr: '',//用戶地址
        });
        //用戶新增
        const handleAdd =()=>{
            dialogVisible.value=true;
            action.value='add';
        };
        //提交方法
        const onSubmit = () => {
            proxy.$refs.userForm.validate(async (valid) => {
                if (valid) {
                    //新增
                    if(action.value =='add'){
                        formUser.birth = timeFormat(formUser.birth);
                    let res = await proxy.$api.addUser(formUser)
                    if (res) {
                        dialogVisible.value = false;
                        proxy.$refs.userForm.resetFields();
                        getUserData(config);
                    };
                    }else{
                        //編輯
                    formUser.sex=='女'?(formUser.sex=0):(formUser.sex=1)
                    let res = await proxy.$api.editUser(formUser)
                    if (res) {
                        dialogVisible.value = false;
                        proxy.$refs.userForm.resetFields();
                        getUserData(config);
                    };
                    }
                }else{
                        ElMessage({
                            showClose:true,
                            message:'請輸入正確的內容！',
                            type:'error'
                        })
                    };
            })
        };
        //區分編輯edit或新增add的字段
        const action = ref('add');
        //用戶編輯
        const handleEdit =(row)=>{
            action.value='edit';
            dialogVisible.value=true;
        //編輯用戶數據-淺拷貝到模態框
        row.sex== 0? (row.sex='女'):(row.sex=='男')
        proxy.$nextTick(()=>{
            Object.assign(formUser,row)
        })
        };
//刪除用戶
        const handleDelete = (row)=>{
            ElMessageBox.confirm('你確定刪除嗎？')
                .then(async() => {
                    await proxy.$api.deleteUser({
                        id:row.id
                    })

                ElMessage({
                    showClose:true,
                    message:'刪除成功！',
                    type:'succes'             
                })
                getUserData(config)
                })
                .catch(() => {
                    // catch error
                })
        };

        return {
            list,
            tableLabel,
            config,
            changePage,
            formInline,
            handleSerch,
            dialogVisible,
            handleClose,
            formUser,
            handleAdd,
            onSubmit,
            handelCancel,
            handleEdit,
            action,
            handleDelete
        }
    }
})
</script>

<style lang="scss" scoped>
.table {
    position: relative;
    height: 90%;

    .pager {
        position: absolute;
        right: 0;
        bottom: 0;
    }
}

.user-header {
    display: flex;
    justify-content: space-between;
}
</style>