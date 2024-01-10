export const PostMessageCallBackMap = new Map();
const messageEventHandler = (event: MessageEvent) => {
  // 事件分发
  const data = event.data;
  let eventKey = data?.api;
  eventKey = data?.api + (data?.timestamp || "");

  if (PostMessageCallBackMap.has(eventKey)) {
    console.debug("postMessageResult", event, eventKey, PostMessageCallBackMap);
    PostMessageCallBackMap.get(eventKey)(data);
    // 清除字典防止内存泄漏
    setTimeout(() => {
      PostMessageCallBackMap.delete(eventKey);
    }, 0);
  }
};
export function registerJSApiModule() {
  window.addEventListener("message", messageEventHandler);
}
export function deregisterJSApiModule() {
  window.removeEventListener("message", messageEventHandler);
}



// JSApi Core
type JSBridgeReq = {
  api: string;
  timestamp?: number;
  [key: string]: any;
};

type JSBridgeRes<T> = JSBridgeReq & {
  response: {
    code: string;
    data: T;
  };
};

function sendMessage<T>(param: JSBridgeReq): Promise<JSBridgeRes<T>> {
  return new Promise((resolve, reject) => {
    if (window.parent) {
      param.timestamp = Date.now();
      window.parent.postMessage(param, "*");

      let eventKey = param.api + param.timestamp;
      PostMessageCallBackMap.set(eventKey, resolve);
    }
  });
}
function responseHandler<T>(result: JSBridgeRes<T>): Promise<JSBridgeRes<T>> {
  return new Promise((resolve, reject) => {
    if (result.response.code === "0000") {
      resolve(result);
    } else {
      reject(new Error(`调用 App 接口失败，接口名称：${result.api}`));
    }
  });
}

// JSAPI
export function getLoginToken() {
  return sendMessage<{ loginToken: string }>({
    api: "getLoginToken",
  }).then(responseHandler);
}

export function goBack() {
  return sendMessage({ api: "goBack" });
}
