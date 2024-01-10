const domains = ["unpkg.com"];
const retryInfos = {};
const maxRetryTimes = 3;

window.addEventListener(
    "error",
    (e) => {
        console.log(e);
        const tag = e.target;
        if (tag.tagName === "SCRIPT" && !(e instanceof ErrorEvent)) {
            const url = new URL(tag.src);
            console.log(url);
            if (!retryInfos[url.pathname]) {
                retryInfos[url.pathname] = {
                    times: 0,
                    nextIndex: 0,
                };
            }
            const info = retryInfos[url.pathname];
            if (info.times < maxRetryTimes) {
                // 换域名重试
                url.host = domains[info.nextIndex];
                // tag.src = url.toString();
                // 同步阻塞
                document.write(`<script src='${url.toString()}'>\<\/script>`);
                info.times++;
                info.nextIndex = (info.nextIndex + 1) % domains.length;
            }
        }
    },
    true
);
// console.log(a.b);
