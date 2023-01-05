
function $(ele) {
  return document.querySelector(ele);
}

searchEngineList = {
  百度: ["./images/baidu.svg", "https://www.baidu.com/s?ie=utf-8&word="],
  bing: ["./images/bing.svg", "https://cn.bing.com/search?q="],
  google: ["./images/google.svg", "https://www.google.com/search?q="],
  github: ["./images/github.svg","https://github.com/search?q="],
  开发者搜索: [
    "./images/kaifa.svg",
    "https://kaifa.baidu.com/searchPage?module=SEARCH&wd=",
  ],
//   火山翻译: [
//     "./images/volctrans.svg",
//     "https://translate.volcengine.com/translate?&text=",
//   ],
};

function search() {
  let searchHref =
    searchEngineList[$(".searchEngines").getAttribute("type")][1] +
    $(".searchInput").value;
  open(searchHref);
}

for (let key in searchEngineList) {
  let style = "";
  let ico = searchEngineList[key][0];
  let href = searchEngineList[key][1];
  let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (reg.test(key) & (key.length > 3)) {
    style = "style = 'font-size:13px; padding:2px 0 0'";
  }
  let engineEle = `<div class="engine" onclick="setEngine('${ico}','${key}')"><img src="${ico}" class="icon" alt="" /><p class="font_size_14 color-primary" ${style}>${key}</p></div>`;
  $(".enginesLineBox").innerHTML += engineEle;
}

function setEngine(ico, name) {
  hideEngineBox();
  // console.log(ico,href)
  $(".searchEngines").setAttribute("type", name);
  $(".searchEngines").firstElementChild.setAttribute("src", ico);
}

let ifEngineShow = 0;

function setEngineBoxShow() {
  if (ifEngineShow === 1) {
    hideEngineBox();
    ifEngineShow = 0;
    return undefined;
  }
  $(".enginesBox").style.padding = "10px 20px 15px";
  $(".enginesBox").style.height = "80px";
  $(".enginesBox").tabIndex = -1;
  $(".enginesBox").focus();
  ifEngineShow = 1;
}

function hideEngineBox() {
  $(".enginesBox").style.height = "0";
  $(".enginesBox").style.padding = "0 20px";
}

let colorMode = "light";
let changeList = [
  ["body", "background-color: #353535;"],
  [
    ".searchBox",
    "background-color: #353535;  box-shadow: 0 0 0 #353535, 0 0 0 #353535;",
  ],
  [
    ".searchLineBox:hover .searchBox,.searchBox:focus-within",
    "box-shadow: 10px 10px 27px #232323, -10px -10px 27px #414141;",
  ],
  [".enginesBox", "background: #00000038;"],
  [".engine", "background: #00000034;"],
  [".engine p", "border-top: 2px solid #ffffff22;"],
];

function toggleColorMode() {
  hideEngineBox();
  // $(".searchInput").focus();
  if (colorMode === "light") {
    colorMode = "dark";
    // console.log(colorMode);
    $(".sun").style="width: 0;";
    $(".moon").style="";
    for (let i in changeList) {
      $("#dark").innerText += changeList[i][0] + "{" + changeList[i][1] + "}";
    }
    return undefined;
  }

  if (colorMode === "dark") {
    // console.log(1);
    colorMode = "light";
    $(".sun").style=""
    $(".moon").style="width: 0;";
    $("#dark").innerText = "";
    return undefined;
  }
}

// 设置点击事件
$(".searchBtn").onclick = search;
$(".searchEngines").onclick = setEngineBoxShow;
$(".toggleColor").onclick = toggleColorMode;

// 设置引擎选择宽度
document.documentElement.style.setProperty(
  "--enginesWidth",
  String($(".enginesLineBox").children.length * 90 - 10) + "px"
);
// 监听Enter按键
document.onkeydown = function (event) {
  if (
    (event.key === "Enter") &
    (document.activeElement === $(".searchInput"))
  ) {
    search();
  }
};
// 一言
let xhr = new XMLHttpRequest();
let shiciModelList = ["shanshui", "siji", "tianqi", "rensheng"];
let shiciModel = shiciModelList[Math.floor(Math.random() * 4)];
xhr.open("get", `https://v1.jinrishici.com/${shiciModel}.json`);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    let data = JSON.parse(xhr.responseText);
    let oneWord = document.getElementById("oneWord");
    oneWord.innerText =
      "「" +
      data.content.substring(0, data.content.length - 1) +
      "」 —— " +
      data.author +
      "《" +
      data.origin.split("/")[0] +
      "》";
    //   console.log(data);
  }
};
xhr.send();

window.document.body.onmouseover = function (event) {
  let ele = event.target; //鼠标每经过一个元素，就把该元素赋值给变量ele
  while (ele !== null) {
    if (ele === $(".appLineBox")) {
      return;
    }
    ele = ele.parentElement;
  }
  hideEngineBox();
};



// 背景函数
function backgroundFunc() {
  // 设置引擎选择框到顶部高度
  document.documentElement.style.setProperty(
    "--searchToTopHeight",
    $(".searchBox").getBoundingClientRect().top + 60 + "px"
  );

  // 监听焦点位置
  if (document.activeElement !== $(".enginesBox")) {
    hideEngineBox();
  }
}
setInterval(backgroundFunc, 100);
