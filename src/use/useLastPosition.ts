import { reactive, onDeactivated, onActivated, Ref } from "vue";

export function useLastPositon(scrollElement: Ref<HTMLElement | undefined>) {
    const refLastPosition = reactive({
        x: 0,
        y: 0,
    });

    onActivated(() => {
        if (!(refLastPosition.x === 0 && refLastPosition.y === 0)) {
            scrollElement.value?.scrollTo({
                top: refLastPosition.y,
                left: refLastPosition.x,
            });
        }
    });

    onDeactivated(() => {
        refLastPosition.x = scrollElement.value?.scrollLeft ?? 0;
        refLastPosition.y = scrollElement.value?.scrollTop ?? 0;
    });
}
