import { Ref, ref } from "vue";

interface PagingOptions<T> {
    requestFn: (params: any) => Promise<any>;
    params?: any;
    pageSize?: number;
    datas: Ref<Array<T>>;
    responseCompletion?: (vm: PagingViewModel<T>, datas: Array<T>) => Array<T>;
}

class PagingViewModel<T> {
    private currentPage: Ref<number>;
    private totalPage: Ref<number>;
    private pageSize: number;
    private params: any;
    private datas: Ref<Array<T>>;
    private requestFn: (params: any) => Promise<any>;
    private responseCompletion?: (vm: PagingViewModel<T>, datas: Array<any>) => Array<any>;

    refreshing: Ref<boolean>;
    loading: Ref<boolean>;
    finished: Ref<boolean>;

    constructor(opt: PagingOptions<T>) {
        this.requestFn = opt.requestFn;
        this.params = opt.params || {};
        this.datas = opt.datas;
        this.responseCompletion = opt.responseCompletion;
        this.pageSize = opt.pageSize ?? 20;

        this.currentPage = ref(1);
        this.totalPage = ref(1);
        this.refreshing = ref(false);
        this.loading = ref(false);
        this.finished = ref(false);
    }

    /**
     * 加载数据
     */
    loadData() {
        const params = {
            currentPage: this.currentPage.value,
            pageSize: this.pageSize,
            ...this.params,
        };

        if (this.currentPage.value === 1) {
            this.datas.value = [] as Array<T>;
        }

        this.requestFn(params).then((response) => {
            if (!response) {
                return;
            }
            this.totalPage.value = response.totalPage;
            let resDatas = response.responseObject.items;
            if (this.responseCompletion) {
                resDatas = this.responseCompletion(this, response.datas);
            }
            if (this.currentPage.value === 1) {
                this.datas.value = resDatas;
            } else {
                this.datas.value = this.datas.value.concat(resDatas);
            }
            this.didLoaded();
        });
    }
    /**
     * 加载结束，状态更新
     */
    didLoaded() {
        if (this.currentPage.value === 1) {
            this.refreshing.value = false;
            this.finished.value = false;
        } else {
            this.loading.value = false;
        }
    }
    /**
     * 下拉刷新
     */
    headerRefreshing() {
        this.currentPage.value = 1;
        this.loadData();
    }
    /**
     * 上拉加载
     */
    footerRefreshing() {
        if (this.currentPage.value === this.totalPage.value) {
            this.finished.value = true;
            this.didLoaded();
            return;
        }
        this.currentPage.value += 1;
        this.loadData();
    }
}
export { PagingViewModel };
