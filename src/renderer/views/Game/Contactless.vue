<template>
  <div class="h-100 w-100">
    <div class="h-100 w-100">
      <div class="d-flex flex-column h-100 bg-gradient">
        <div
          class="view position-relative d-flex flex-column align-items-center"
        >
          <div
            class="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
            v-if="error.active"
          >
            <div class="alert alert-danger" role="alert">
              <h4 class="alert-heading">Erreur : {{ error.title }}</h4>
              <p>{{ error.msg }}</p>
              <hr />
              <p class="mb-0 text-center">
                <span><span class="g-btn">A</span>Réessayer</span>
              </p>
            </div>
          </div>
          <div class="ribbon left" style="width: 380px; height: 110px;">
            <span class="h5 mr-3 mb-4">Un généreux de plus</span>
          </div>
          <div
            class="row d-flex align-items-center justify-content-around mt-5 pt-5 w-100"
          >
            <span
              class="col-4 offset-1 h3 mt-3 text-uppercase text-center d-flex flex-column align-items-center"
            >
              <span class="text-white">On y est presque</span>
              <span class="text-black">Glisse ton moyen de paiement</span>
            </span>
            <div class="col-2 offset-5">
              <div class="logo-circle">
                <img :src="campaign.logo" :alt="campaign.name" />
              </div>
            </div>
          </div>
          <div class="container-fluid px-5 my-3 text-center">
            <img
              src="@/assets/img/nfc.png"
              style="width: 80%; margin-top: -60px;"
            />
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
              <span><span class="g-btn">B</span>Retour</span>
            </div>
          </div>
          <div
            class="small-btn-gamepad d-flex align-items-center justify-content-center p-4 mb-3 pr-5"
          >
            <span><span class="g-btn">A</span>Jouer</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contactless",
  data: function() {
    return {
      campaign: this.$store.state.currentCampaign,
      choosenGame: "",
      choosenIndexOf: 0,
      error: {
        active: false,
        title: "",
        msg: ""
      },
      games: {}
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
        this.pay(this.$route.params.amount);
      }
    },
    b: function(val) {
      if (val) {
        this.$router.go(-1);
      }
    },
    left: function(val) {
      if (val) {
        if (this.games[this.choosenIndexOf - 1]) {
          this.chooseGame(this.choosenIndexOf - 1);
        }
      }
    },
    right: function(val) {
      if (val) {
        if (this.games[this.choosenIndexOf + 1]) {
          this.chooseGame(this.choosenIndexOf + 1);
        }
      }
    }
  },
  mounted: function() {
    //setTimeout(() => this.pay(this.$route.params.amount), 500);
    setTimeout(() => this.skipPayment(this.$route.params.amount), 15000);
  },
  methods: {
    skipPayment: function(amount) {
      this.payment = {
        donator: this.$store.state.session.donator,
        terminal: this.$store.state.session.terminal,
        campaign: this.$store.state.session.campaign,
        game: this.$store.state.session.game,
        date: new Date(),
        method: "Contactless",
        status: "Accepted",
        amount: amount,
        currency: "EUR"
      };
      this.$http
        .post("payment/", this.payment)
        .then(resp => {
          if (resp.status == "201") {
            this.$router.push("/watch");
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    launchPayment: function(amount) {
      var edge = require("electron-edge-js");
      var pay = edge.func({
        source: "edje-script.csx",
        references: ["PayterPay.dll"]
      });

      var payload = {
        amount: amount,
        timeout: 15 // Default timeout
      };

      var result = pay(payload, true);
      return result;
    },
    pay: function(amount) {
      this.error.active = false;
      if (this.$route.params.amount != null) {
        // Calling PayterPay from here
        var result = this.launchPayment(amount);

        this.payment = {
          donator: this.$store.state.session.donator,
          terminal: this.$store.state.session.terminal,
          campaign: this.$store.state.session.campaign,
          game: this.$store.state.session.game,
          date: new Date(),
          method: "Contactless",
          status: "",
          amount: amount,
          currency: "EUR"
        };

        // Checking response
        switch (result) {
          case 0:
            // APPROVED
            this.payment.status = "Accepted";
            this.$http
              .post("payment/", this.payment)
              .then(resp => {
                if (resp.status == "201") {
                  this.$router.push("/watch");
                }
              })
              .catch(err => {
                console.log(err.response);
              });
            break;
          case 1:
            // DECLINED
            this.error = {
              active: true,
              title: "Paiement décliné",
              msg:
                "Votre paiement a été refusé. Veuillez contacter votre émetteur de carte."
            };
            break;
          case -1:
            // CONNECTION ERROR
            this.error = {
              active: true,
              title: "Erreur de connexion au terminal",
              msg:
                "Il y a un problème de connexion au terminal de paiement. Veuillez réessayer ou contacter le support."
            };
            break;
          case -5:
            // TIMEOUT
            this.error = {
              active: true,
              title: "Temps écoulé",
              msg:
                "Vous avez mis trop de temps à passer votre carte. L'opération est annulée, veuillez réessayer."
            };
            break;
          case -6:
            // INVALID CARD
            this.error = {
              active: true,
              title: "Carte invalide",
              msg:
                "Votre carte est invalide. Veuillez réessayer ou contacter le support."
            };
            break;
          default:
            // UNKNOWN ERROR
            this.error = {
              active: true,
              title: "Erreur inconnue",
              msg:
                "Un problème inconnu est survenu. Veuillez réessayer ou contacter le support."
            };
            break;
        }
      }
    }
  }
};
</script>
