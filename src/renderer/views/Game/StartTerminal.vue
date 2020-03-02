<template>
  <div class="h-100 w-100">
    <div v-if="terminal.is_active" class="h-100 w-100">
      <div class="h-100 w-100">
        <div class="splited-view d-flex flex-column">
          <div class="view position-relative first bg-gradient d-flex">
            <!-- RIBBON -->
            <div class="ribbon left">
              <span class="h5 mr-4 mb-3">1 - Choisis ton jeu</span>
            </div>
            <div class="small-gamepad bg-gradient d-flex flex-column px-4 py-2">
              <div
                class="d-flex align-items-center justify-content-between flex-1 py-2 px-3 mb-3"
              >
                <img src="@/assets/img/gamepad.svg" width="60" />
                <div class="g-buttons">
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
              <div class="d-flex align-items-center justify-content-between">
                <span><span class="g-btn">A</span>Valider</span>
                <span><span class="g-btn">B</span>Retour</span>
              </div>
            </div>
            <div
              :class="[
                'd-flex',
                'w-100',
                'align-items-center',
                choosingIndex == 1 ? 'overlayed' : ''
              ]"
            >
              <!-- Main layout -->
              <div
                class="col-3 font-weight-bold text-white  d-flex justify-content-center text-center"
              >
                1 PARTIE = 5 MIN
              </div>
              <div class="cards d-flex align-items-stretch mx-5">
                <div
                  v-for="game in games"
                  class="form-group col-4 mt-2"
                  :key="game.id"
                  :for="game.id"
                >
                  <label
                    :class="[
                      choosenGame.id == game.id ? 'selected' : '',
                      'checkbox',
                      'h-100',
                      'py-3',
                      'mx-2',
                      'px-3'
                    ]"
                  >
                    <input type="radio" />
                    <div class="px-5 mb-4">
                      <img
                        :src="game.logo"
                        :alt="game.name"
                        style="width: 100px; height: 100px; object-fit: contain;"
                        class="rounded-circle bg-white"
                      />
                    </div>
                    <span
                      class="mt-2 font-weight-bold text-uppercase text-center"
                    >
                      {{ game.name }}
                    </span>
                    <p class="small text-left" style="line-height: 1.3em;">
                      {{ game.description.substring(0, 200) }}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="view second position-relative d-flex">
            <div class="ribbon right">
              <span class="h5">2 - Choisis ton association</span>
            </div>
            <div
              :class="[
                'd-flex',
                'w-100',
                'align-items-center',
                choosingIndex == 0 ? 'overlayed' : ''
              ]"
            >
              <div
                class="col-3 h4 font-weight-bold text-black d-flex justify-content-center text-center"
              >
                1 PARTIE<br />=<br />1 DON
              </div>
              <div class="cards d-flex align-items-stretch mx-5 mt-5">
                <div
                  v-for="campaign in campaigns"
                  :key="campaign.id"
                  :for="campaign.id"
                  class="form-group col-4 mt-2"
                >
                  <label
                    :class="[
                      choosenCampaign.id == campaign.id ? 'selected' : '',
                      'checkbox',
                      'h-100',
                      'bg-gradient-diag',
                      'py-3',
                      'mx-2',
                      'px-3'
                    ]"
                  >
                    <input type="radio" />
                    <div class="px-5 mb-4">
                      <img
                        :src="campaign.logo"
                        :alt="campaign.name"
                        style="width: 100px; height: 100px; object-fit: contain;"
                        class="rounded-circle bg-white"
                      />
                    </div>
                    <span
                      class="mt-2 font-weight-bold text-uppercase text-center"
                      >{{ campaign.name }}</span
                    >
                    <p class="small text-left" style="line-height: 1.3em;">
                      {{ campaign.description.substring(0, 200) }}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">
          Borne désactivée
        </h1>
        <p class="lead">
          Cette borne est actuellement indisponible, veuillez réessayer plus
          tard.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartTerminal",
  data: function() {
    return {
      email: "",
      choosingIndex: 0,
      terminal: {},
      campaigns: {},
      games: {},
      choosenGame: "",
      isAdmin: {},
      choosenCampaign: "",
      choosenIndexOf: {
        games: "",
        campaigns: ""
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
        if (this.choosingIndex == 0) {
          this.choosingIndex += 1;
        } else {
          this.gotoPayment();
        }
      }
    },
    b: function(val) {
      if (val) {
        if (this.choosingIndex == 1) {
          this.choosingIndex -= 1;
        }
      }
    },
    left: function(val) {
      if (val) {
        if (this.choosingIndex == 0) {
          if (this.games[this.choosenIndexOf.games - 1]) {
            this.choosenGame = this.games[this.choosenIndexOf.games - 1].id;
            this.chooseGame(this.choosenIndexOf.games - 1);
          }
        } else {
          if (this.campaigns[this.choosenIndexOf.campaigns - 1]) {
            this.choosenCampaign = this.campaigns[
              this.choosenIndexOf.campaigns - 1
            ].id;
            this.chooseCampaign(this.choosenIndexOf.campaigns - 1);
          }
        }
      }
    },
    right: function(val) {
      if (val) {
        if (this.choosingIndex == 0) {
          if (this.games[this.choosenIndexOf.games + 1]) {
            this.choosenGame = this.games[this.choosenIndexOf.games + 1].id;
            this.chooseGame(this.choosenIndexOf.games + 1);
          }
        } else {
          if (this.campaigns[this.choosenIndexOf.campaigns + 1]) {
            this.choosenCampaign = this.campaigns[
              this.choosenIndexOf.campaigns + 1
            ].id;
            this.chooseCampaign(this.choosenIndexOf.campaigns + 1);
          }
        }
      }
    }
  },
  mounted: function() {
    this.isAdmin = this.$store.getters.isAdmin;
    if (!this.isAdmin) {
      this.$http
        .get("terminal/mine/")
        .then(resp => {
          this.$store.commit("startTerminal", resp.data);
          this.terminal = resp.data.terminal;
          this.campaigns = resp.data.campaigns;
          this.games = resp.data.games;
          this.shuffleArray(this.campaigns);
          this.shuffleArray(this.games);
          this.$store.commit("startSession");
          this.$http.get("terminal/mine/on/").then(response => {
            this.$store.commit("saveCurrentTerminal", response.data);
          });
          this.chooseCampaign(0);
          this.choosenCampaign = this.campaigns[0];
          this.chooseGame(0);
          this.choosenGame = this.games[0];
          this.$store.commit("startListening");
        })
        .catch(err => {
          console.error(err.response);
        });
    }
  },
  methods: {
    chooseGame: function(index) {
      this.choosenGame = this.games[index];
      this.choosenIndexOf.games = index;
    },
    chooseCampaign: function(index) {
      this.choosenCampaign = this.campaigns[index];
      this.choosenIndexOf.campaigns = index;
    },
    gotoPayment: function() {
      if (this.choosenGame != null) {
        this.$store.commit(
          "saveGameChoice",
          this.games[this.choosenIndexOf.games]
        );
        this.$store.dispatch("updateSession");
      }
      if (this.choosenIndexOf.campaigns != null) {
        this.$store.commit("saveCampaignChoice", {
          campaign: this.campaigns[this.choosenIndexOf.campaigns],
          indexOf: this.choosenIndexOf.campaigns + 1
        });
        this.$store.dispatch("startSession");
        this.$router.push("/payment");
      } else {
        console.error("no choice");
      }
    },
    shuffleArray: function(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
};
</script>
