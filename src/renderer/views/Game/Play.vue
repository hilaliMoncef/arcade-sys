<template>
  <div class="h-100 w-100">
    <vue-element-loading :active="loading" is-full-screen />
    <div
      class="d-flex align-items-center justify-content-center bg-gradient text-white"
    >
      <div class="row">
        <h1 class="display-4 text-center text-white">
          Le jeu a débuté
        </h1>
        <p class="lead text-white">
          Veuillez patienter, votre partie va se lancer
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";

export default {
  name: "Play",
  data: function() {
    return {
      currentGame: this.$store.state.currentGame,
      shell: {},
      loading: false
    };
  },
  components: {
    VueElementLoading
  },
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    }
  },
  watch: {
    a: function(val) {
      if (val) {
        this.endGame();
      }
    }
  },
  mounted: function() {
    this.loading = true;
    this.$http.get("terminal/mine/play/");
    this.$store.commit("startGameSession");
    this.$store.commit("stopListening");
    
    let command = 'retroarch -L "/home/pi/genesis_plus_gx_libretro.so" "/home/pi/'+ this.currentGame.path +'"';
    this.startShell(command);
    // .then(resp => {
    //   this.$store.commit("startListening");
    //   this.endGame();
    // });
  },
  methods: {
    startShell: function(command) {
      var exec = require("child_process").exec;
      var shell = exec(command, (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
        console.log(stdout);
        this.$store.commit("startListening");
        this.endGame();
      });
      var timer = setTimeout(function() {
        exec('killall "retroarch"');
      }, 40000);
    },
    endGame: function() {
      this.loading = false;
      this.$router.push("/endgame");
    }
  }
};
</script>
