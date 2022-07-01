import { ComponentInternalInstance, ref } from "vue";

export const excludes = ref<string[]>([]);
export function removeKeepAliveCache(instance: ComponentInternalInstance) {
    excludes.value.push(instance.type.name!);
    console.log(excludes.value, "remove");
}
export function resetKeepAliveCache(instance: ComponentInternalInstance) {
    excludes.value = excludes.value.filter((item) => item !== instance.type.name);
    console.log(excludes.value, "reset");
}
export const SimpleEvents = {
    map: new Map(),
    registerEvent(key: string, cb: (data?: any) => void) {
        this.map.set(key, cb);
    },
    emit(key: string, params?: any) {
        if (this.map.has(key)) {
            this.map.get(key)(params);
        }
    },
};
