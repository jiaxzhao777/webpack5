import "./index.css";
import Icon from "./image.png";

const say = (statements) => {
  console.log(statements);
};

// const component = <div></div>;

say("Tecvan");
// console.log(component);

function imageComponent() {
  const element = document.createElement("div");

  // lodash 现在使用 import 引入。
  // element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  // 将图像添加到已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}
document.body.appendChild(imageComponent());

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
