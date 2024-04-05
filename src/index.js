import "./index.css";

const say = (statements) => {
  console.log(statements);
};

const component = <div></div>;

say("Tecvan");
console.log(component);

let dataList;
// 使用node来启动一个服务
const source = new EventSource("http://localhost:8080/getInfo");
console.log(EventSource.CONNECTING); // 0
console.log(EventSource.OPEN); // 1;
console.log(EventSource.CLOSED); // 2

// open事件 客户端和服务器链接上触发
source.onopen = function (event) {
  console.log("onopen===>", event);
};

source.onmessage = function (event) {
  console.log("onmessage===>", event);
  dataList = JSON.parse(event.data);
};

source.onerror = function (event) {
  console.log("onerror====>", event);
};
