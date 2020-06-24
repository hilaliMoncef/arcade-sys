<template>
  <div class="component">
      <div class="view second position-relative d-flex">
        <!-- RIBBON -->
        <div class="ribbon left">
          <span class="h5 mr-4 mb-3">2 - Choisis ton asso</span>
        </div>

        <!-- ///// CAROUSEL ///// -->
        <div class="carousel">
          <vueper-slides ref="carousel" :infinite="false" :visibleSlides="1" :fixedHeight="true" :gap=30 transition-speed="250"
            @ready="chooseCampaign($event.currentSlide.index)" 
            @slide="chooseCampaign($event.currentSlide.index)">

            <template v-slot:arrow-left>
              <div class="left-arrow"></div>
            </template>
            <template v-slot:arrow-right>
              <div class="right-arrow"></div>
            </template>

            <vueper-slide v-for="(campaign, i) in campaigns" :key="i">
              <template v-slot:content>
                <div class="div-content">
                  <div class="row title">
                      <span class="campaign-name"> {{ campaign.name }} </span>
                  </div>
                  <div class="row picture">
                      <img :src=campaign.logo :alt=campaign.name class="campaign-picture">
                  </div>
                  <div class="row infos">
                  </div>
                  <div class="row descr">
                    <span class="campaign-description">
                        {{ campaign.description }}
                      </span>
                  </div>
                </div>
              </template>
            </vueper-slide>
          </vueper-slides>
        </div>

        <!-- <div class="carousel double-carousel">
            <vueper-slides class="carousel-top" ref="vueperslides1" :infinite="false" :visibleSlides="1" :fixedHeight="true" :gap=30 :bullets="false"
                           @slide="$refs.vueperslides2 && $refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })">
              <vueper-slide v-for="(campaign, i) in campaigns" :key="i">
                <template v-slot:content>
                  <div class="div-content">
                    <div class="row title">
                        <span class="campaign-name"> {{ campaign.name }} </span>
                    </div>
                    <div class="row picture">
                        <img :src=campaign.logo :alt=campaign.name class="campaign-picture">
                    </div>
                    <div class="row infos">
                    </div>
                    <div class="row descr">
                      <span class="campaign-description">
                          {{ campaign.description }}
                        </span>
                    </div>
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>

            <vueper-slides class="carousel-bottom" ref="vueperslides2" :touchable="false" :infinite="false" :visibleSlides="2" :fixedHeight="true" :gap=30
                            @slide="$refs.vueperslides1 && $refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })">
              <vueper-slide v-for="(campaign, i) in campaigns" :key="i" @click.native="$refs.vueperslides2 && $refs.vueperslides2.goToSlide(i)">
                  <template v-slot:content>
                    <div class="div-content">
                      hello
                    </div>
                  </template>
                </vueper-slide>
            </vueper-slides>
        </div> -->
        <!-- ///// CAROUSEL ///// -->

      </div>
    <!-- GAMEPAD -->
    <helpGamepad @simulate_a="simulate_a" @simulate_b="simulate_b" @simulate_right="simulate_right" @simulate_left="simulate_left" />
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import helpGamepad from '@/components/helpGamepad.vue';



export default {
  name: "CampaignChoice",
  components: {VueperSlides, VueperSlide, helpGamepad},
  props: ["campaigns", "session"],
  data: function() {
    return {
      choosenCampaign: {},
      choosenIndexOf: {
        campaigns: ""
      },
      timer: 0,
      time: 0,
      duration: 0,
      playerVars: {
        autoplay: 1,
        iv_load_policy: 3, 
        playsinline: 1,
        controls: 0,
        modestbranding: 1, 
        showinfo: 0,
        rel: 0
      }
    };
  },
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    },
    b() {
      return this.$store.state.gamepad.B;
    },
    left() {
      return this.$store.state.gamepad.Left;
    },
    right() {
      return this.$store.state.gamepad.Right;
    },
  },
  watch: {
    a: function(val) {
      if (val) {
        // if (this.choosingIndex == 0) {
        //   this.choosingIndex += 1;
        // } else {
        //   this.gotoPayment();
        // }
        this.gotoPayment();
      }
    },
    b: function(val) {
      if (val) {
        // if (this.choosingIndex == 1) {
        //   this.choosingIndex -= 1;
        // }
        this.$emit("lastView");
      }
    },
    left: function(val) {
      if (val) {
        this.$refs.carousel.previous();
      }
    },
    right: function(val) {
      if (val) {
        this.$refs.carousel.next();
      }
    }
  },
  mounted: function() {
    if (this.session.position_asso) {
      this.chooseCampaign(this.session.position_asso - 1);
    } else {
      this.chooseCampaign(0);
    }
  },
  methods: {
    simulate_a() {
      this.gotoPayment();
    },
    simulate_b() {
      this.$emit("lastView");
    },
    simulate_left() {
      this.$refs.carousel.previous();
    },
    simulate_right() {
      this.$refs.carousel.next();
    },
    chooseCampaign: function(index) {
      this.choosenCampaign = this.campaigns[index];
      this.choosenIndexOf.campaigns = index;

      // Saving
      this.$emit("saveCampaign", {
        campaign: this.choosenCampaign,
        indexOf: this.choosenIndexOf.campaigns + 1
      });
    },
    playerReady: function() {
      this.$refs.youtube.player.mute();
      this.$refs.youtube.player.getDuration().then(resp => {
        this.duration = resp;
        console.log("resp = "+ resp);
      });
      console.log("duration = " + this.duration);
    },
    playerPlaying: async function() {
      let currentTime = this.$refs.youtube.player.getCurrentTime()
      this.timer = (Math.ceil(currentTime) / this.duration) * 100;
      console.log("duration = " + this.duration);
    },
    playVideo() {
      this.$refs.youtube.player.playVideo()
    },
    gotoPayment: function() {
      if ((this.choosenCampaign != null)) {
        this.$emit("startSession"); // Important to start the session here, for nice timers
        this.$emit("nextView");
      } else {
        this.$emit("error", {
          visible: true,
          title: "Aucun choix valide",
          errors: {}
        });
      }
    }
  }
};
</script>

<style scoped>

.campaign-name {
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.campaign-picture {
  height: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
}

.campaign-description  {
  margin-left: 18px;
  margin-right: 18px;
  color : white;
  font-size: 1rem;
  text-align: justify;
}

.video-border {
    border: 2px solid #FFFF00;
    width: fit-content;
    height: 364px;
    border-radius: 30px;
    overflow: hidden;
}

</style>