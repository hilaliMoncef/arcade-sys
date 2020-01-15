<template>
  <div class="col-6 offset-3">
    <div class="row">
      <h1 class="display-4 text-center">
        Le jeu a débuté
      </h1>
      <p class="lead">
        Veuillez patienter, votre partie va se lancer
      </p>
    </div>
    <div class="row">
      <button class="btn btn-primary mx-auto" @click.prevent="endGame">
        Appuyer sur <span class="g-btn">A</span> pour continuer
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Play",
  data: function() {
    return {
      currentGame: this.$store.state.currentGame
    };
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
    this.$http.get("terminal/mine/play/");
    this.$store.commit("startGameSession");
    this.$store.commit("stopListening");
    let command = "retroarch -L " + this.currentGame.path;
    this.startShell(command).then(resp => {
      this.$store.commit("startListening");
      this.endGame();
    });
  },
  methods: {
    startShell: function(command) {
      var exec = require("child_process").exec;
      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.warn(error);
          }
          resolve(stdout ? stdout : stderr);
        });
      });
    },
    endGame: function() {
      this.$router.push("/endgame");
    }
  }
};
</script>
