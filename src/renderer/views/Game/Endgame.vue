<template>
  <div class="h-100 w-100">
    <div class="h-100 w-100">
      <div class="d-flex flex-column h-100 bg-gradient">
        <div
          class="view position-relative d-flex flex-column align-items-center"
        >
          <div class="ribbon left">
            <span class="h3 mr-3 mb-4">Merci !</span>
          </div>

          <div
            class="row d-flex align-items-center justify-content-around mt-5 pt-5 w-100"
          >
            <span
              class="col-4 offset-1 h3 mt-3 text-uppercase text-center d-flex flex-column align-items-center"
            >
            </span>
            <div class="col-2 offset-5">
              <div class="logo-circle">
                <img src="@/assets/img/msf.png" />
              </div>
            </div>
          </div>
          <div class="container mt-5">
            <div class="col-8 offset-2">
              <div class="row">
                <label class="h5 text-white" for="email">Mail</label>
                <input
                  v-model="donator.email"
                  type="email"
                  class="form-control"
                />
              </div>
              <div class="row mt-5">
                <div class="form-check">
                  <label
                    class="form-check-label text-uppercase font-weight-bold "
                  >
                    <input
                      type="checkbox"
                      v-model="donator.accept_newsletter"
                      class="form-check-input d-none"
                      value="1"
                    />
                    <span
                      :class="[
                        'g-btn',
                        donator.accept_newsletter ? 'clicked' : '',
                        'mr-1'
                      ]"
                      >X</span
                    >
                    Newsletter association
                  </label>
                </div>
                <div class="form-check">
                  <label
                    class="form-check-label text-uppercase font-weight-bold mt-3"
                  >
                    <input
                      type="checkbox"
                      v-model="donator.accept_asso"
                      class="form-check-input d-none"
                      value="1"
                    />
                    <span
                      :class="[
                        'g-btn',
                        donator.accept_asso ? 'clicked' : '',
                        'mr-1'
                      ]"
                      >Y</span
                    >
                    être recontacté par l’association
                  </label>
                </div>
              </div>
              <div class="row mt-4">
                <SimpleKeyboard :input="donator.email" @onChange="onChange" />
              </div>
            </div>
          </div>
        </div>
        <div class="big-gamepad bg-gradient d-flex px-4 py-2">
          <div
            class="d-flex align-items-center justify-content-between flex-1 py-2 px-3"
          >
            <img src="@/assets/img/gamepad.svg" width="60" />
            <div class="g-buttons ml-4">
              <div class="row mb-1">
                <span :class="['g-btn', x ? 'clicked' : '']">X</span>
                <span :class="['g-btn', y ? 'clicked' : '']">Y</span>
                <span class="g-btn">L</span>
              </div>
              <div class="row">
                <span :class="['g-btn']">A</span>
                <span :class="['g-btn', b ? 'clicked' : '']">B</span>
                <span class="g-btn">R</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between ml-5">
            <span><span class="g-btn">A</span>Valider</span>
            <span><span class="g-btn">B</span>Accueil</span>
          </div>
        </div>
        <div
          class="small-btn-gamepad d-flex align-items-center justify-content-center p-4 mb-3 pr-5"
        >
          <span><span class="g-btn">L</span>Envoyer</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleKeyboard from "@/components/SimpleKeyboard.vue";
export default {
  name: "Endgame",
  components: {
    SimpleKeyboard
  },
  data: function() {
    return {
      donator: {}
    };
  },
  computed: {
    b() {
      return this.$store.state.gamepad.B;
    },
    x() {
      return this.$store.state.gamepad.X;
    },
    y() {
      return this.$store.state.gamepad.Y;
    },
    start() {
      return this.$store.state.gamepad.Start;
    }
  },
  watch: {
    b: function(val) {
      if (val) {
        this.$router.push("/start");
      }
    },
    x: function(val) {
      if (val) {
        this.donator.accept_newsletter = !this.donator.accept_newsletter;
      }
    },
    y: function(val) {
      if (val) {
        this.donator.accept_asso = !this.donator.accept_asso;
      }
    },
    start: function(val) {
      if (val) {
        this.saveEmail();
      }
    }
  },
  mounted: function() {
    this.donator = this.$store.state.currentDonator;
    this.$http.get("terminal/mine/gameover/");
    this.$store.commit("endGameSession");
    this.$store.dispatch("updateSession");
  },
  methods: {
    saveEmail: function() {
      if (this.donator.email) {
        this.$http.put("donator/" + this.donator.id + "/", this.donator);
        this.$router.push("/start");
      }
    },
    restart: function() {
      this.$store.commit("endSession");
      this.$store.dispatch("updateSession");
      this.$store.commit("deleteGamingStates");
      this.$router.push("/start");
    },
    onChange(input) {
      this.donator.email = input;
    },
    onInputChange(input) {
      this.donator.email = input.target.value;
    }
  }
};
</script>
