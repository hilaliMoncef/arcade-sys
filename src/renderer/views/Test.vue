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
                  type="email"
                  class="form-control"
                  aria-describedby="emailHelpId"
                  placeholder="Entrez un email valide"
                />
              </div>
              <div class="row mt-5">
                <div class="form-check">
                  <label
                    class="form-check-label text-uppercase font-weight-bold "
                  >
                    <input type="checkbox" class="form-check-input" value="1" />
                    Newsletter association
                  </label>
                </div>
                <div class="form-check">
                  <label
                    class="form-check-label text-uppercase font-weight-bold mt-3"
                  >
                    <input type="checkbox" class="form-check-input" value="1" />
                    être recontacté par l’association
                  </label>
                </div>
              </div>
              <div class="row mt-4">
                <SimpleKeyboard />
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
                <span class="g-btn">X</span>
                <span class="g-btn">Y</span>
                <span class="g-btn">L</span>
              </div>
              <div class="row">
                <span :class="['g-btn', a ? 'clicked' : '']">A</span>
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
  name: "Test",
  components: {
    SimpleKeyboard
  },
  data: function() {
    return {
      timer: 0,
      duration: 0,
      videoId: "TM86NgP2zx8",
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        showinfo: 0
      }
    };
  },
  mounted: function() {},
  methods: {
    playerPlaying: async function() {
      var duration = await this.$refs.youtube.player.getDuration();
      this.duration = duration;
      var interval = setInterval(() => {
        this.timer = this.timer + 1;
      }, 1000);
      if (this.timer >= this.duration) {
        clearInterval(interval);
        this.$router.push("/play");
      }
    }
  }
};
</script>
