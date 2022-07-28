<template>
    <div class="page_container">
        <div class="nav_bar">
            <span class="back_btn" @click="router.back()"> &lt; </span>
            <span class="nav_title">PagingIndex</span>
        </div>
        <div class="flex_1 ofa w_100">
            <div v-for="(item, index) in datas" :key="index" class="list_item">{{ item.name }}</div>
        </div>
        <div class="float_wrap flex_column">
            <div @click="pageViewModel.headerRefreshing">下拉刷新</div>
            <div @click="pageViewModel.footerRefreshing">上拉加载</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { PagingViewModel } from "@/use/usePaging";

const router = useRouter();

class ResponseObject {
    constructor(public name: string) {
        this.name = name;
    }
}
const responseDatas: ResponseObject[] = Array.from({ length: 50 }, (v, i) => new ResponseObject(`name：${i + 1}`));

const mockDatas = function (currentPage: number, pageSize: number) {
    if (Math.ceil(responseDatas.length / pageSize) < currentPage) {
        throw new Error("当前页过长");
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize < responseDatas.length ? currentPage * pageSize : responseDatas.length;
    return {
        responseObject: {
            items: responseDatas.slice(startIndex, endIndex),
        },
        totalPage: Math.ceil(responseDatas.length / pageSize),
        currentPage,
        pageSize,
    };
};

const requestData = (params?: any) => {
    return new Promise<any>((resolve) => {
        const response = mockDatas(params.currentPage, params.pageSize);
        resolve(response);
    });
};

const datas = ref<ResponseObject[]>([]);

const pageViewModel = new PagingViewModel<any>({
    requestFn: requestData,
    datas,
    pageSize: 5,
});

pageViewModel.headerRefreshing();
</script>

<style scoped>
.list_item {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e3e3e3;
    margin-left: 16px;
    width: calc(100% - 16px);
    color: #333;
    font-size: 15px;
}
.float_wrap {
    position: fixed;
    bottom: 30px;
    right: 20px;
    width: 50px;
}

.float_wrap div {
    box-sizing: border-box;
    padding: 8px;
    margin: 8px 0;
    background: #fff;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
}
</style>
