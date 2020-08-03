Module.register("MMM-Python", {
  defaults: {
    none: null
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
    form._title.innerText = "신체 길이 측정 모듈 실행 중...";
    form._text.innerText = "신체 길이 측정 모듈을 실행하는 중입니다...";
    this.sendSocketNotification("STARTPYTHON");
    // 작업 끝
  },
  waitEnd: async function() {
    this.bg._title.remove();
    this.bg._text.remove();
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
    form._camera = await document.createElement("video");
    form._text = await document.createElement("div");
    form._text.id = "cameraText";
    form._text.innerText = "측정 중...";
    form.appendChild(form._text);
  },

  socketNotificationReceived: function(noti, payload) {
    if (payload) {
      payload = payload.replace(/'/gi, "\"");

    }

    if (noti == "STARTPYTHON") {
      this.bg._text.innerText = "신체 측정을 위한 카메라를 연결하는 중입니다..."
      console.log("STARTPYTHON -> CHECKCAMERA");
      this.sendSocketNotification("CHECKCAMERA");

    } else if (noti == "STARTCHECK") {
      // 카메라 URL을 받은 후다. 화면에 카메라를 뿌려준다. 측정될때까지 대기
      this.bg._text.innerText = "신체 측정을 진행 중입니다... 카메라 앞에 서주세요."
      this.connectCamera();
      console.log("STARTCHECK -> CHECKING");
      this.sendSocketNotification("CHECKING");

    } else if (noti == "ENDPYTHON") {
      console.log("ENDPYTHON");
      // this.waitEnd();
    }
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
