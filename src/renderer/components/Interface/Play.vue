<template>
  <div class="component">
    <vue-element-loading :active="loading" is-full-screen />
    <div
      class="h-100 w-100 d-flex align-items-center justify-content-center bg-gradient text-white"
    >
      <div class="row d-flex flex-column">
        <h1 class="display-4 text-center text-white">
          Le jeu a débuté
        </h1>
        <p class="lead text-white">
          Veuillez patienter, votre partie va se lancer.
        </p>
        <p><strong>Status</strong> : {{ this.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";

export default {
  name: "Play",
  props: ["session"],
  data: function() {
    return {
      currentGame: this.$store.state.currentGame,
      loading: false,
      status: ""
    };
  },
  components: {
    VueElementLoading
  },
  mounted: function() {
    this.loading = true;

    this.$emit("startGameSession");
    this.$store.commit("stopListening");

    let command =
      'retroarch -L "/home/pi/genesis_plus_gx_libretro.so" "/home/pi/' +
      this.currentGame.path +
      '"';
    this.startShell(command);
  },
  methods: {
    startShell: function(command) {
      var exec = require("child_process").exec;
      var shell = exec(command, (error, stdout, stderr) => {
        if (error) {
          this.status = error;
          this.loading = false;
          this.endGame();
        } else {
          this.status = stdout;
          this.$store.commit("startListening");
          this.endGame();
        }
      });
      var timer = setTimeout(function() {
        exec('killall "retroarch"');
      }, 300000);
    },
    endGame: function() {
      this.loading = false;
      this.$emit("nextView");
    }
  }
};
</script>
