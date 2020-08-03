const request = require("request")
const {
  PythonShell
} = require("python-shell")

var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {},

  socketNotificationReceived: function(noti, payload) {
    if (noti == "INIT") {
      this.initialize()
    } else if (noti == "START") {
      this.startInit()
    } else if (noti == "STARTPYTHON") {
      var pyshell = new PythonShell('/srv/MagicMirror/modules/MMM-Python/test.py');
      // var pyshell = new PythonShell('/home/mirror/Downloads/jetson-interface/python/examples/test2.py');
      // PythonShell.run('/srv/MagicMirror/modules/MMM-Python/test.py', null, (err, results) => {
      //   if (err) throw err;
      //   console.log(`results: ${results}`);
      //   this.sendSocketNotification("STARTPYTHON", results);
      // })
      pyshell.on('message', message => {
        console.log(message);

        function IsJsonString(str) {
          try {
            var json = JSON.parse(str);
            return (typeof json === 'object');
          } catch (e) {
            return false;
          }
        }
        if (IsJsonString(message)) {
          this.sendSocketNotification("STARTPYTHON", JSON.parse(message));
        } else {
          this.sendSocketNotification("STARTPYTHON", message);
        }

      })
    } else if (noti == "CHECKCAMERA") {
      // 카메라 연결 체크하기. 카메라가 제대로 연결되어있어서 스트리밍 주소를 준다면 소켓 알림으로 보내기
      this.sendSocketNotification("STARTCHECK");
    } else if (noti == "CHECKING") {
      // 카메라 측정완료될 때 까지 대기

      this.sendSocketNotification("ENDPYTHON");
    }
  },
  initialize: function() {
    console.log(" ::: Load Python ::: Initializing");
  },
  startInit: function() {
    console.log(" ::: News KOR ::: Starting");

  },

  finishInit: function() {
    this.sendSocketNotification("UPDATE", this.news)
  }
})
