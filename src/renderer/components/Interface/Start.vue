<template>
  <div class="component">
      <div class="view position-relative first d-flex">
        <!-- RIBBON -->
        <div class="ribbon left">
          <span class="h5 mr-4 mb-3">1 - Choisis ton jeu</span>
        </div>

        <!-- ///// CAROUSEL ///// -->
        <div class="carousel">
          <vueper-slides ref="carousel" :infinite="false" :visibleSlides="1" :fixedHeight="true" :disableArrowsOnEdges="false" :bulletsOutside="true" :touchable="false" :gap=30 transition-speed="300"
            @ready="chooseGame($event.currentSlide.index)" 
            @slide="chooseGame($event.currentSlide.index)">
            
            <template v-slot:arrow-left>
              <div class="left-arrow"></div>
            </template>
            <template v-slot:arrow-right>
              <div class="right-arrow"></div>
            </template>

            <vueper-slide v-for="(game, i) in games" :key="i">
              <template v-slot:content>
                <div class="div-content">
                  <div class="row title">
                      <span class="game-name"> {{ game.name }} </span>
                  </div>
                  <div class="row picture">
                      <img :src=game.logo :alt=game.name class="game-picture">
                  </div>
                  <div class="row infos">
                  </div>
                  <div class="row descr">
                    <span class="game-description">
                        {{ game.description }}
                      </span>
                  </div>
                </div>
              </template>
            </vueper-slide>
          </vueper-slides>
        </div>       
        <!-- ///// CAROUSEL ///// -->

      </div>
    <!-- GAMEPAD -->
    <helpGamepad :gpio_help="1" @simulate_a="simulate_a" @simulate_b="simulate_b" @simulate_left="simulate_left" @simulate_right="simulate_right"/>
  </div>
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';
import { VueperSlides, VueperSlide } from 'vueperslides'

export default {
  name: "Start",
  components : {VueperSlides, VueperSlide, helpGamepad},
  props: ["games", "session"],   
  data: function() {
    return {
      choosenGame: {},
      choosenIndexOf: {
        games: "",
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
    }
  },
  watch: {
    a: function(val) {
      if (val) {
        this.gotoCampaign();
      }
    },
    b: function(val) {
      if (val) {
        // Nothing for now
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
    if (this.session.position_game) {
      this.chooseGame(this.session.position_game - 1);
    } else {
      this.chooseGame(0);
    }
  },
  methods: {
    // SIMULATE GAMEPAD METHODS
    simulate_a() {
      this.gotoCampaign();
    },
    simulate_b() {
      // Nothing for now
    },
    simulate_left() {
      this.$refs.carousel.previous();
    },
    simulate_right() {
      this.$refs.carousel.next();
    },

    // OTHER METHODS
    chooseGame: function(index) {
      this.choosenGame = this.games[index];
      this.choosenIndexOf.games = index;

      // Saving
      this.$emit("saveGame", {
        game: this.choosenGame,
      });
    },
    gotoCampaign: function() {
      if ((this.choosenGame != null)) {
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

.game-name {
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  font-weight: 600;
  color: white;
}

.game-picture {
  height: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
}

.game-description  {
  margin-left: 18px;
  margin-right: 18px;
  color : white;
  font-size: 1.4rem;
  text-align: justify;
}

</style>