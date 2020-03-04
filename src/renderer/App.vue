<template>
  <div id="app">
    <div class="container">
      <div id="notification" class="alert alert-warning mx-auto d-none my-3">
        <div class="d-flex align-items-center justify-content-between">
          <span id="message">Une nouvelle version est disponible !</span>
          <button
            class="btn btn-primary d-none"
            id="restart-app"
            @click.prevent="restartApp"
          >
            Appuyer sur
            <span class="g-btn"
              ><font-awesome-icon class="small" icon="play"
            /></span>
            pour redémarrer
          </button>
        </div>
      </div>
    </div>
    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
      <router-view />
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
var gpio = require("onoff").Gpio;

export default {
  name: "App",
  data: function() {
    return {
      gamepads: []
    };
  },
  created: function() {
    window.addEventListener("gamepadconnected", this.gamepadConnectionHandler);
    window.addEventListener(
      "gamepaddisconnected",
      this.gamepadDisconnectionHandler
    );
  },
  computed: {
    start() {
      return this.$store.state.gamepad.Start;
    }
  },
  watch: {
    start: function(val) {
      if (val) {
        this.restartApp();
      }
    },
    right: function(val) {
      console.log(val);
    }
  },
  mounted: function() {
    const version = document.getElementById("version");

    ipcRenderer.send("app_version");
    ipcRenderer.on("app_version", (event, arg) => {
      ipcRenderer.removeAllListeners("app_version");
      //version.innerText = "Version " + arg.version;
    });

    const notification = document.getElementById("notification");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart-app");

    ipcRenderer.on("update_available", () => {
      ipcRenderer.removeAllListeners("update_available");
      message.innerText = "A new update is available. Downloading now...";
      notification.classList.remove("d-none");
    });
    ipcRenderer.on("update_downloaded", () => {
      ipcRenderer.removeAllListeners("update_downloaded");
      message.innerText =
        "Update Downloaded. It will be installed on restart. Restart now?";
      restartButton.classList.remove("d-none");
      notification.classList.remove("d-none");
    });
    
    // Gamepad Custom API
    var btnA = new gpio(20, "in", "both");
    btnA.watch(function(err, value) {
      this.$store.commit("toggleA", true);
      setTimeout(() => {
        this.$store.commit("toggleA", false);
      }, 10);
     }.bind(this));
     
     var btnAbis = new gpio(24, "in", "both", {debounceTimeout: 10});
      btnAbis.watch(function(err, value) {
        this.$store.commit("toggleA", true);
        setTimeout(() => {
          this.$store.commit("toggleA", false);
        }, 10);
       }.bind(this));
       
       
      var btnB = new gpio(21, "in", "both", {debounceTimeout: 10});
    btnB.watch(function(err, value) {
      this.$store.commit("toggleB", true);
      setTimeout(() => {
        this.$store.commit("toggleB", false);
      }, 10);
     }.bind(this));
     
     var btnBbis = new gpio(25, "in", "both", {debounceTimeout: 10});
      btnBbis.watch(function(err, value) {
        this.$store.commit("toggleB", true);
        setTimeout(() => {
          this.$store.commit("toggleB", false);
        }, 10);
       }.bind(this));
       
       
       var btnX = new gpio(7, "in", "both", {debounceTimeout: 10});
    btnX.watch(function(err, value) {
      this.$store.commit("toggleX", true);
      setTimeout(() => {
        this.$store.commit("toggleX", false);
      }, 10);
     }.bind(this));
     
     var btnXbis = new gpio(15, "in", "both", {debounceTimeout: 10});
      btnXbis.watch(function(err, value) {
        this.$store.commit("toggleX", true);
        setTimeout(() => {
          this.$store.commit("toggleX", false);
        }, 10);
       }.bind(this));
       
       
       var btnY = new gpio(12, "in", "both", {debounceTimeout: 10});
    btnY.watch(function(err, value) {
      this.$store.commit("toggleY", true);
      setTimeout(() => {
        this.$store.commit("toggleY", false);
      }, 10);
     }.bind(this));
     
     var btnYbis = new gpio(18, "in", "both", {debounceTimeout: 10});
      btnYbis.watch(function(err, value) {
        this.$store.commit("toggleY", true);
        setTimeout(() => {
          this.$store.commit("toggleY", false);
        }, 10);
       }.bind(this));
       
       
       var btnLeft = new gpio(27, "in", "both", {debounceTimeout: 10});
    btnLeft.watch(function(err, value) {
      this.$store.commit("toggleLeft", true);
      setTimeout(() => {
        this.$store.commit("toggleLeft", false);
      }, 10);
     }.bind(this));
     
     var btnLeftYbis = new gpio(6, "in", "both", {debounceTimeout: 10});
      btnLeftYbis.watch(function(err, value) {
        this.$store.commit("toggleLeft", true);
        setTimeout(() => {
          this.$store.commit("toggleLeft", false);
        }, 10);
       }.bind(this));
       
       
       var btnRight = new gpio(22, "in", "both", {debounceTimeout: 10});
    btnRight.watch(function(err, value) {
    
      this.$store.commit("toggleRight", true);
      setTimeout(() => {
        this.$store.commit("toggleRight", false);
      }, 10);
     }.bind(this));
     
     var btnRightbis = new gpio(13, "in", "both", {debounceTimeout: 10});
      btnRightbis.watch(function(err, value) {
        this.$store.commit("toggleRight", true);
        setTimeout(() => {
          this.$store.commit("toggleRight", false);
        }, 10);
       }.bind(this));
       
       
       var btnTop = new gpio(4, "in", "both", {debounceTimeout: 10});
    btnTop.watch(function(err, value) {
      this.$store.commit("toggleTop", true);
      setTimeout(() => {
        this.$store.commit("toggleTop", false);
      }, 10);
     }.bind(this));
     
     var btnTopbis = new gpio(11, "in", "both", {debounceTimeout: 10});
      btnTopbis.watch(function(err, value) {
        this.$store.commit("toggleTop", true);
        setTimeout(() => {
          this.$store.commit("toggleTop", false);
        }, 10);
       }.bind(this));
       
       
       var btnBottom = new gpio(17, "in", "both", {debounceTimeout: 10});
    btnBottom.watch(function(err, value) {
      this.$store.commit("toggleBottom", true);
      setTimeout(() => {
        this.$store.commit("toggleBottom", false);
      }, 10);
     }.bind(this));
     
     var btnBottombis = new gpio(5, "in", "both", {debounceTimeout: 10});
      btnBottombis.watch(function(err, value) {
        this.$store.commit("toggleBottom", true);
        setTimeout(() => {
          this.$store.commit("toggleBottom", false);
        }, 10);
       }.bind(this));
    
  },
  methods: {
    restartApp: function() {
      ipcRenderer.send("restart_app");
    },
    gamepadConnectionHandler: function(event) {
      this.gamepads.push(event.gamepad);
      console.log("Gamepad Connected: " + event.gamepad.id);
      this.cycle();
    },
    gamepadDisconnectionHandler: function(event) {
      this.gamepads.splice(this.gamepads.indexOf(event.gamepad), 1);
      console.log("Gamepad Disconnected: " + event.gamepad.id);
      cancelAnimationFrame();
    },
    scanGamepads: function() {
      return navigator.getGamepads
        ? Array.from(navigator.getGamepads()).filter(gp => gp !== null)
        : navigator.webkitGetGamepads
        ? Array.from(navigator.webkitGetGamepads()).filter(gp => gp !== null)
        : [];
    },
    buttonPressed: function(btn) {
      if (typeof btn === "object") {
        return btn.pressed;
      }
      return btn == 1.0;
    },
    cycle: function() {
      this.gamepads = this.scanGamepads();

      var gp = this.gamepads[0];
      if (this.$store.state.gamepad.listening) {
        if (this.buttonPressed(gp.buttons[0])) {
          this.$store.commit("toggleA", true);
        } else {
          this.$store.commit("toggleA", false);
        }
        if (this.buttonPressed(gp.buttons[1])) {
          this.$store.commit("toggleB", true);
        } else {
          this.$store.commit("toggleB", false);
        }
        if (this.buttonPressed(gp.buttons[2])) {
          this.$store.commit("toggleX", true);
        } else {
          this.$store.commit("toggleX", false);
        }
        if (this.buttonPressed(gp.buttons[3])) {
          this.$store.commit("toggleY", true);
        } else {
          this.$store.commit("toggleY", false);
        }
        if (this.buttonPressed(gp.buttons[9])) {
          this.$store.commit("toggleStart", true);
        } else {
          this.$store.commit("toggleStart", false);
        }
        if (gp.axes[0] == 1) {
          this.$store.commit("toggleRight", true);
        } else {
          this.$store.commit("toggleRight", false);
        }
        if (gp.axes[0] == -1) {
          this.$store.commit("toggleLeft", true);
        } else {
          this.$store.commit("toggleLeft", false);
        }
        if (gp.axes[1] == -1) {
          this.$store.commit("toggleTop", true);
        } else {
          this.$store.commit("toggleTop", false);
        }
        if (gp.axes[1] == 1) {
          this.$store.commit("toggleBottom", true);
        } else {
          this.$store.commit("toggleBottom", false);
        }
      }
      requestAnimationFrame(this.cycle);
    }
  }
};
</script>

<style>
@import "./assets/css/all.min.css";

.card.card-rounded {
  border-radius: 20px !important;
  border: none !important;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.13);
}

html,
body,
#app {
  height: 100%;
}
</style>
