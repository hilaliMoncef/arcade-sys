<template>
  <div>
    <div class="col-6 offset-3">
      <div class="row text-center mb-3">
        <img
          src="@/assets/img/contactless.png"
          width="150"
          height="100"
          class="mx-auto"
          alt="Contact Less"
        />
      </div>
    </div>
    <div class="card" v-if="error.active">
      <div class="card-body">
        <h5 class="card-title">{{ error.title }}</h5>
        <p class="card-text">
          {{ error.msg }}
        </p>
      </div>
    </div>
    <div class="pricing-header row py-3 mx-auto text-center">
      <ul class="p-0 m-0 w-100 col-12">
        <div
          class="form-group mt-3 d-flex flex-wrap justify-content-between align-items-stretch"
        >
          <label
            v-for="(amount, index) in amounts"
            :key="index"
            :class="[
              choosenIndexOf == index ? 'checked' : '',
              'checkbox',
              'col',
              'pt-5',
              'py-3',
              'm-3'
            ]"
            @click="chooseAmount(index)"
          >
            <input type="radio" :value="amount" />
            <span
              :class="[
                'selected',
                'd-flex',
                'align-items-center',
                'justify-content-center'
              ]"
            >
              <font-awesome-icon icon="check" />
            </span>
            <p class="small my-0">Don de</p>
            <h4 class="display-4">{{ amount }}€</h4>
          </label>
        </div>
      </ul>
    </div>

    <div class="row mt-3 text-center">
      <div class="col text-center">
        <a href="" class="btn text-danger btn-link mr-2"
          >Appuyer sur <span class="g-btn border-danger">B</span> pour
          revenir</a
        >
        <a href="" class="btn btn-primary" @click.prevent="pay"
          >Appuyer sur <span class="g-btn">A</span> pour continuer</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Payment",
  data: function() {
    return {
      choosenIndexOf: 1,
      amounts: [0, 1, 5, 10, 20, 30],
      ipPayter: "192.168.1.44:3183",
      isLoading: false,
      loadingFullPage: true,
      error: {
        active: false,
        title: "",
        msg: ""
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
        this.pay();
      }
    },
    b: function(val) {
      if (val) {
        this.$router.go(-1);
      }
    },
    left: function(val) {
      if (val) {
        if (this.amounts[this.choosenIndexOf - 1]) {
          this.chooseAmount(this.choosenIndexOf - 1);
        }
      }
    },
    right: function(val) {
      if (val) {
        if (this.amounts[this.choosenIndexOf + 1]) {
          this.chooseAmount(this.choosenIndexOf + 1);
        }
      }
    }
  },
  methods: {
    chooseAmount: function(index) {
      this.choosenIndexOf = index;
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
    pay: function() {
      if (this.choosenIndexOf != null) {
        // Calling PayterPay from here
        var result = this.launchPayment(this.amounts[this.choosenIndexOf]);

        this.payment = {
          donator: this.$store.state.session.donator,
          terminal: this.$store.state.session.terminal,
          campaign: this.$store.state.session.campaign,
          game: this.$store.state.session.game,
          date: new Date(),
          method: "Contactless",
          status: "",
          amount: this.amounts[this.choosenIndexOf],
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
            this.payment.status = "Declined";
            this.$http
              .post("payment/", this.payment)
              .then(resp => {
                // Show declined message
                this.error = {
                  active: true,
                  title: "Paiement décliné",
                  msg:
                    "Votre paiement a été refusé. Veuillez contacter votre émetteur de carte."
                };
              })
              .catch(err => {
                console.log(err.response);
              });
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
