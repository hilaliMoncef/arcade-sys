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
                <img :src="campaign.logo" :alt="campaign.title" />
              </div>
            </div>
          </div>
          <div class="container my-3 text-center">
            <youtube
              :video-id="videoId"
              :player-vars="playerVars"
              ref="youtube"
              @playing="playerPlaying()"
              @ended="gotoPlay()"
            ></youtube>
          </div>
          <div class="container my-2 text-center">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: (timer / duration) * 100 + '%' }"
                :aria-valuenow="timer"
                aria-valuemin="0"
                :aria-valuemax="duration"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowCampaign",
  data: function() {
    return {
      campaign: {},
      session: {},
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
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    }
  },
  watch: {
    a: function(val) {
      if (val) {
        this.gotoPlay();
      }
    }
  },
  mounted: function() {
    this.campaign = this.$store.state.currentCampaign;
    this.session = this.$store.state.session;
  },
  methods: {
    gotoPlay: function() {
      this.$router.push("/play");
    },
    playerPlaying: async function() {
      var duration = await this.$refs.youtube.player.getDuration();
      this.duration = Math.round(duration);
      var interval = setInterval(() => {
        this.timer = this.timer + 1;
      }, 1000);
      if (this.timer >= duration) {
        clearInterval(interval);
        this.gotoPlay();
      }
    }
  }
};
</script>
