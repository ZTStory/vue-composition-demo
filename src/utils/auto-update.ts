const autoUpdateWorker = new Worker("/vue-composition-demo/auto-update.worker.js", {
    type: "module",
});
autoUpdateWorker.addEventListener("message", () => {
    const res = confirm("页面有更新，点击确定刷新页面");
    res && location.reload();
});
