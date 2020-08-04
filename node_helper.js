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
      // var pyshell = new PythonShell('/srv/MagicMirror/modules/MMM-Python/test.py');
      var pyshell = new PythonShell('/srv/MagicMirror/modules/MMM-Python/flask_test.py', {
        pythonOptions: ['-u']
      });
      // PythonShell.run('/srv/MagicMirror/modules/MMM-Python/test.py', null, (err, results) => {
      //   if (err) throw err;
      //   console.log(`results: ${results}`);
      //   this.sendSocketNotification("STARTPYTHON", results);
      // })
      pyshell.on('message', message => {
        console.log("[:" + message + ":]");
        if (message) {
          message = message.replace(/'/gi, "\"");
        }

        function IsJsonString(str) {
          try {
            var json = JSON.parse(str);
            return (typeof json === 'object');
          } catch (e) {
            return false;
          }
        }
        if (IsJsonString(message)) {
          pyshell.kill('SIGINT');
          this.sendSocketNotification("ENDPYTHON", JSON.parse(message));
        } else if (message == "start") {
          this.sendSocketNotification("STARTCHECK");
        }

      })
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
