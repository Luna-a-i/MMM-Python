const request = require("request")
const {
  PythonShell
} = require("python-shell")

var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {},

  socketNotificationReceived: function(noti, payload) {
    if (noti == "INIT") {
      this.initialize(payload)
    } else if (noti == "START") {
      this.startInit()
    } else if (noti == "STARTPYTHON") {
      if (this.config.debug == true) {
        var pyshell = new PythonShell('/srv/MagicMirror/modules/MMM-Python/test.py');
      } else {
        var pyshell = new PythonShell('/srv/MagicMirror/modules/MMM-Python/flask_final.py', {
          pythonOptions: ['-u']
        });
      }





      // PythonShell.run('/srv/MagicMirror/modules/MMM-Python/test.py', null, (err, results) => {
      //   if (err) throw err;
      //   console.log(`results: ${results}`);
      //   this.sendSocketNotification("STARTPYTHON", results);
      // })
      var pyLoadTimer = setTimeout(() => {
        pyshell.kill('SIGINT');
        this.sendSocketNotification("ENDPYTHON", {
          status: "failed",
          err: "카메라가 장시간동안 응답하지 않습니다."
        });
        clearTimeout(pyLoadTimer);
      }, 20000);
      console.log(this.config);
      if (this.config.debug == true) {
        // setTimeout(() => {
        //   pyshell.kill('SIGINT');
        //   this.sendSocketNotification("ENDPYTHON", {
        //     status: "success",
        //     height: 183
        //   });
        // }, 3000);
        clearTimeout(pyLoadTimer);
      }

      pyshell.on('message', message => {
        //	console.log("[:" + message + ":]");
        if (message) {
          message = message.replace(/'/g, '"');
        }
        //       console.log("[:" + message + ":]");
        function IsJsonString(str) {
          try {
            var json = JSON.parse(str);
            return (typeof json === 'object');
          } catch (e) {
            return false;
          }
        }
        console.log("JSOOOONN", message);
        if (IsJsonString(message)) {
          var json = JSON.parse(message);
          console.log(json.status);
          if (json.status == "success") {
            pyshell.kill('SIGINT');
            this.sendSocketNotification("ENDPYTHON", json);

          } else if (json.status = "draw") {
            this.sendSocketNotification("DRAWSQUARE", json);
          }
        } else if (message == "start") {
          clearTimeout(pyLoadTimer);
          this.sendSocketNotification("STARTCHECK");
        }

      })
    }
  },
  initialize: function(payload) {
    console.log(" ::: Load Python ::: Initializing");
    this.config = payload;
  },
  startInit: function() {
    console.log(" ::: News KOR ::: Starting");

  },

  finishInit: function() {
    this.sendSocketNotification("UPDATE", this.news)
  }
})
