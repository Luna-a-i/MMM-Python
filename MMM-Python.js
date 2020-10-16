Module.register("MMM-Python", {
  defaults: {
    debug: false
  },

  getStyles: function() {
    return ["MMM-Python.css"]
  },

  start: function() {
    this.sendSocketNotification("INIT", this.config)
    this.draw();
  },

  draw: function() {
    var form = document.createElement("div");
    form.id = "peopleButton";
    form.ico = document.createElement("i");
    form.ico.classList.add("fas");
    form.ico.classList.add("fa-male");
    form.appendChild(form.ico);
    form.addEventListener("click", () => {
      this.wait();
    })
    document.body.appendChild(form);
    this.peopleButton = form;
  },
  wait: async function() {
    console.log("open BG");
    var form = await document.createElement("div");
    form.id = "peopleBG";
    await document.body.appendChild(form);
    form._title = document.createElement("div");
    form._text = document.createElement("div");
    form._title.id = "peopleBG_title";
    form._text.id = "peopleBG_text";
    form.textDiv = document.createElement("div");
    form.textDiv.id = "peopleDiv";
    form.textDiv.appendChild(form._title);
    form.textDiv.appendChild(form._text);
    form.appendChild(form.textDiv);

    function __sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    this.bg = form;
    await __sleep(50);
    await form.classList.add("show");
    await __sleep(500);
    // 작업 시작
    form._title.innerText = "신장 측정 모듈 실행 중...";
    form._text.innerText = "신장 측정 모듈을 실행하는 중입니다...";
    this.sendSocketNotification("STARTPYTHON");
    // 작업 끝
  },
  waitEnd: async function() {
    this.bg._title.remove();
    this.bg._text.remove();
    this.bg.textDiv.remove();
    if (this.bg.screen) {
      this.bg.screen._camera = "";
    }
    await this.bg.classList.remove("show");
    await __sleep(500);
    this.bg.remove();
  },

  connectCamera: async function() {
    var form = await document.createElement("div");
    form.id = "cameraFrame";
    this.bg.textDiv.appendChild(form);
    form.screen = await document.createElement("div");
    form.screen.id = "cameraScreen";
    form.appendChild(form.screen);
    // form._camera = await document.createElement("video");
    form._camera = new Image();
    form._camera.style.display = "none";
    // form._camera.src = "http://192.168.1.28:5000/startStream";
    if (this.config.debug == true) {
      form._camera.src = "http://via.placeholder.com/480x848";
    } else {
      form._camera.src = "http://localhost:5000/startStream?q=" + Math.random();
    }
    form._camera.onerror = async () => {
      await __sleep(1000);
      form._camera.src = "http://localhost:5000/startStream?q=" + Math.random();
    }
    form._camera.onload = async () => {
      form._camera.style.display = "block";
      this.bg._text.innerText = "신장 측정이 진행 중 입니다... 카메라 앞에 서주세요."
    }
    // form._camera.addEventListener("click", () => {
    //   this.clearSquare();
    // })
    form.screen.appendChild(form._camera);
    form._text = await document.createElement("div");
    form._text.id = "cameraText";
    form._text.innerText = "측정 중...";
    form.appendChild(form._text);
    this.bg.screen = form;
  },
  clearSquare: async function() {
    // var foo = document.querySelectorAll(".peopleSquare");
    // var foo2 = document.querySelectorAll(".peopleSquareText");
    // var foo3 = document.querySelectorAll(".peopleSquareDot");
    // var foo4 = document.querySelectorAll(".peopleSquareDotText");
    // for (var v in foo) {
    //   if (foo.hasOwnProperty(v)) {
    //     foo[v].remove();
    //     foo2[v].remove();
    //     foo3[v * 3].remove();
    //     foo3[v * 3 + 1].remove();
    //     foo3[v * 3 + 2].remove();
    //     foo4[v * 3].remove();
    //     foo4[v * 3 + 1].remove();
    //     foo4[v * 3 + 2].remove();
    //   }
    //   // await foo[0].remove();
    //   // await foo2[0].remove();
    //   // await foo3[0].remove();
    //   // await foo3[0].remove();
    //   // await foo3[0].remove();
    //   // await foo4[0].remove();
    //   // await foo4[0].remove();
    //   // await foo4[0].remove();
    // }
    // var foo2 = await document.getElementsByClassName("peopleSquareText");
    // for (var v in foo2) {
    //   if (await foo2.hasOwnProperty(v)) {
    //   }
    // }
    var foo = document.querySelectorAll(".peopleTop");
    var foo2 = document.querySelectorAll(".peopleTopText");

    for (var v in foo) {
      if (foo.hasOwnProperty(v)) {
          foo[v].remove();
          foo2[v].remove();
      }
    }
  },
  drawSquare: async function(d) {
    console.log(d);
    var vtop = await document.createElement("div");
    vtop.classList.add("peopleTop");
    vtop.style.top = d.top+"px";
    this.bg.screen.screen.vtop = vtop;
    this.bg.screen.screen.appendChild(vtop);
    var vtopText = await document.createElement("div");
    vtopText.classList.add("peopleTopText");
    vtopText.innerText = d.height;
    vtop.appendChild(vtopText);
    // var sq = await document.createElement("div");
    // sq.classList.add("peopleSquare");
    // sq.style.top = d.top + "px";
    // sq.style.height = (d.bottom - d.top) + "px";
    // sq.style.left = d.left + "px";
    // sq.style.width = (d.right - d.left) + "px";
    // sq.style.position = "absolute";
    // sq.style.border = "2px solid green";
    // this.bg.screen.screen.appendChild(sq);
    // var sqText = await document.createElement("div");
    // sqText.classList.add("peopleSquareText");
    // sqText.innerText = (d.height2 * 100).toFixed(2);
    // sqText.style.color = "skyblue";
    // sqText.style.fontWeight = "bold";
    // sqText.style.top = "-43px";
    // sqText.style.left = "0px";
    // sqText.style.position = "absolute";
    // await sq.appendChild(sqText);
    // var dot = [];
    // dot.d1 = document.createElement("div");
    // dot.d2 = document.createElement("div");
    // dot.d3 = document.createElement("div");
    // dot.d1.classList.add("peopleSquareDot");
    // dot.d2.classList.add("peopleSquareDot");
    // dot.d3.classList.add("peopleSquareDot");
    // dot.d1.style.top = d.d1top + "px";
    // dot.d2.style.top = d.d2top + "px";
    // dot.d3.style.top = d.d3top + "px";
    // dot.d1.style.left = d.d1left + "px";
    // dot.d2.style.left = d.d2left + "px";
    // dot.d3.style.left = d.d3left + "px";
    // dot.d1t = document.createElement("div");
    // dot.d2t = document.createElement("div");
    // dot.d3t = document.createElement("div");
    // dot.d1t.classList.add("peopleSquareDotText");
    // dot.d2t.classList.add("peopleSquareDotText");
    // dot.d3t.classList.add("peopleSquareDotText");
    // dot.d1t.innerText = d.d1;
    // dot.d2t.innerText = d.d2;
    // dot.d3t.innerText = d.d3;
    // dot.d1.appendChild(dot.d1t);
    // dot.d2.appendChild(dot.d2t);
    // dot.d3.appendChild(dot.d3t);
    // this.bg.screen.screen.appendChild(dot.d1);
    // this.bg.screen.screen.appendChild(dot.d2);
    // this.bg.screen.screen.appendChild(dot.d3);
  },

  socketNotificationReceived: async function(noti, payload) {
    // if (payload) {
    //   payload = payload.replace(/'/gi, "\"");
    //
    // }

    if (noti == "STARTPYTHON") {
      this.bg._text.innerText = "신장 측정을 위한 카메라를 연결하는 중입니다..."
      console.log("STARTPYTHON -> CHECKCAMERA");
      this.sendSocketNotification("CHECKCAMERA");

    } else if (noti == "STARTCHECK") {
      // 카메라 URL을 받은 후다. 화면에 카메라를 뿌려준다. 측정될때까지 대기
      this.bg._text.innerText = "카메라에서 이미지를 받아오는 중입니다..."
      this.connectCamera();
    } else if (noti == "DRAWSQUARE") {
      await this.clearSquare();
      await this.drawSquare(payload);
    } else if (noti == "ENDPYTHON") {
      if (payload.status == "success") {
        // alert("[DEBUG] 키는 : "+ payload.height);
        // setTimeout(() => {
        //   this.waitEnd();
        // },2000);
        this.drawSuccess(payload.height);
        this.waitEnd();
      } else {
        alert("카메라 모듈 연결에 실패했습니다.\n\n사유 : " + payload.err);
        this.waitEnd();
      }
    }
  },
  drawSuccess: async function(h) {
    var form = document.createElement("div");
    form.id = "viewHeight";
    form.innerText = h+" cm";
    this.peopleButton.appendChild(form);
    function __sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    await __sleep(3000);
    form.classList.add("hide");
    await __sleep(1000);
    form.remove();
  },
  IsJsonString: function(str) {
    try {
      var json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    }
  }


})
