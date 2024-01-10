let lastSrcs;
const scriptReg = /\<script.*src=["'](.*)["']/gm;

async function extractNewScript() {
    const html = await fetch("/vue-composition-demo/?_timestamp=" + Date.now()).then((res) => res.text());
    scriptReg.lastIndex = 0;
    console.log("获取最新 html 文本:", html);

    let result = [];
    let match;
    while ((match = scriptReg.exec(html))) {
        result.push(match[1]);
    }
    console.log("解析其中 script 标签:", result);
    return result;
}

async function needUpdate() {
    const newScripts = await extractNewScript();
    if (!lastSrcs) {
        lastSrcs = newScripts;
        return false;
    }

    let result = false;
    if (lastSrcs.length !== newScripts.length) {
        return true;
    }

    for (let index = 0; index < lastSrcs.length; index++) {
        if (lastSrcs[index] !== newScripts[index]) {
            result = true;
            break;
        }
    }

    lastSrcs = newScripts;
    return result;
}

function autoUpdate(duration = 2000) {
    setTimeout(async () => {
        const willUpdate = await needUpdate();
        console.log("是否需要更新：", willUpdate);

        if (willUpdate) {
            self.postMessage({
                eventName: "autoUpdate",
                data: {
                    needUpdate: true,
                },
            });
        }
        autoUpdate();
    }, duration);
}

autoUpdate();
