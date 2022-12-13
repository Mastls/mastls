var code = ` <div id="{{boxId}}" style="top: 0;left: 0;width: 100vw;height: 100vh;background-color: #b2b2b269;position: absolute;z-index: 9999999;display: flex;justify-content: center;align-items: center;"><div style="width:300px;height:150px;background-color:#fff;border-radius:15px;position:relative;box-shadow:rgb(0 0 0/24%)0px 3px 8px;"> <div style="display: flex; align-items: center;"> <img style="display:flex;align-items:center;width:86px;border-radius:10px;margin:10px;" src="{{img}}" alt="" /> <div style="display:flex;flex-direction:column;"> <h2 style="display:flex;align-items:center;font-size:14px;margin:0 0 6 0;color: crimson;">{{title}}</h2> <p style="display:flex;align-items:center;font-size:12px;margin:0 4 0 0;">{{content}}</p> </div> </div> <div style="display: flex;justify-content: center;padding: 0 12px;"> <button id="btnClose" style="padding:6px 24px;background-color:#fff;width:40%;font-size:16px;border-radius:10px;border:1px solid#ccc;">关闭</button> <a style="margin-left:6px;width:100%;color:#fff;background-color:#1866FC;display:flex;justify-content:center;align-items:center;text-decoration:none;border-radius:10px;border:1px solid#ccc;" href="{{path}}">点击查看</a> </div> </div> </div>`;
var infoList = [
  {
    title: "【莆田珂珂得物鞋厂】",
    content: "请点击！【莆田耐克代工鞋厂】顺丰得物发货空军￥65椰子￥75万款货源【点击进入】专柜1.1",
    link: "https://docs.qq.com/doc/DZFNwQmJ4SVhNcVRn \"target=\"_self\"",
    img: "https://wework.qpic.cn/wwpic/654570_DIJtzL7fQx-GQFM_1669981454/0",
  },
  {
    title: "向日葵远程控制",
    content: "【长期优惠活动】免费领取！向日葵远控VIP兑换码，畅享7天精英版网络速度！",
    link: "https://flowus.cn/share/9d13333d-121b-4ce2-ac82-e5267de5a3bd \"target=\"_self\"",
    img: "https://p1.music.126.net/U3PX0VWdI-trqGYmJWjFig==/109951168120062472.jpg",
  },
  {
    title: "FlowUs",
    content: "国产笔记软件，阿虚储物间已全面采用其分享文档，内含无限网盘空间！！",
    link: "https://flowus.cn/login?code=CZ3ECT&promotionChannel=WX_axtx_02 \"target=\"_self\"",
    img: "https://p1.music.126.net/Xei1NpC4jHQF7noyqSNv_w==/109951168144774921.png",
  },
];

function setCookie() {
  var date = new Date();
  var Hour = 6; //设置每小时过期时间
  let expireTime = Hour * 3600 * 1000;
  let expires = date.getTime() + expireTime;
  date.setTime(expires);
  document.cookie =
    "ad=" + RandomNumBoth(1, 10000) + "; expires=" + date.toGMTString();
  document.cookie =
    "testexp=" + expires + "; expires=" + date.toGMTString();
  // 过了这个时间就没用过期时间
  setTimeout(() => {
    checkCookie();
  }, expireTime + 10);
}

function getCookie(cookie_name) {
  var results = document.cookie.match(
    "(^|;) ?" + cookie_name + "=([^;]*)(;|$)"
  );
  if (results) return unescape(results[2]);
  else return null;
}
function checkCookie() {
  setTimeout(function () {
    if (!getCookie("ad")) {
      setCookie();
      let btnClose = document.querySelector("#btnClose");
      if (btnClose) {
        return;
      }
      let ad = infoList[RandomNumBoth(0, infoList.length - 1)];
      let boxId = RandomNumBoth(10000, 100000);
      let newCode = code.replace("{{title}}", ad.title);
      newCode = newCode.replace("{{content}}", ad.content);
      newCode = newCode.replace("{{path}}", ad.link);
      newCode = newCode.replace("{{img}}", ad.img);
      newCode = newCode.replace("{{boxId}}", boxId);

      let div = document.createElement("div");
      div.innerHTML = newCode;
      document.body.appendChild(div);
      btnClose = document.querySelector("#btnClose");

      btnClose.onclick = function () {
        document.getElementById(boxId).remove();
      };
    }
    else {
      let timeOut = getCookie("testexp") ?? 1000;
      if (timeOut >= 1000) {
        timeOut = timeOut - new Date().getTime();
        if (timeOut < 0) {
          checkCookie();
          return;
        }
      }
      console.log(timeOut);
        setTimeout(function () {
        checkCookie();
      }, timeOut);
    }
  }, 2000);//延时2秒展示
}
  function RandomNumBoth(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}
checkCookie();