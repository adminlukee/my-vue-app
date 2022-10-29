<template>
    <div class="tags">
        <el-tag v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name !== 'home'" :disable-transtions="false"
            :effect="$route.name === tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)"
            @close="handleClose(tag, index)">
            {{ tag.label }}
        </el-tag>
    </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const tags = store.state.tableList;
        const changeMenu = (item) => {
            router.push({ name: item.name })
        };
        const handleClose = (tag, index) => {
            let length = tags.length - 1;
            //處理vuex的tablist
            store.commit("closeTab", tag);
            //做第一個判斷
            if (tag.name !== route.name) {
                return;
            }
            if (index === length) {
                router.push({ name: tags[index - 1].name });
            } else {
                router.push({ name: tags[index].name });
            };
        };

        return {
            tags,
            changeMenu,
            handleClose
        }
    }
}
</script>

<style lang="scss" scoped>
.tags {
    padding: 0 20px;
    width: 100%;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>