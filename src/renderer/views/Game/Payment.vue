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
      ipPayter: "192.168.1.34:3184",
      payment: ""
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
    launchPayment: function(file, amount) {
      const os = require("os");
      console.log(os.networkInterfaces());
      var exec = require("child_process").execFile;
      let urlArg = "--url=192.168.1.34:3184";
      let amountArg = "--amount=" + amount * 100;
      return new Promise((resolve, reject) => {
        exec(file, [urlArg, amountArg], (error, stdout, stderr) => {
          if (error) {
            console.warn(error);
          }
          resolve(stdout ? stdout : stderr);
        });
      });
    },
    pay: function() {
      if (this.choosenIndexOf != null) {
        // Calling PayterPay from here
        this.launchPayment(
          "PayterPay.exe",
          this.amounts[this.choosenIndexOf]
        ).then(resp => {
          console.log(resp);
        });

        // Proceeding
        // this.payment = {
        //   donator: this.$store.state.session.donator,
        //   terminal: this.$store.state.session.terminal,
        //   campaign: this.$store.state.session.campaign,
        //   game: this.$store.state.session.game,
        //   date: new Date(),
        //   method: "Contactless",
        //   status: "Accepted",
        //   amount: this.amounts[this.choosenIndexOf],
        //   currency: "EUR"
        // };
        // this.$http
        //   .post("payment/", this.payment)
        //   .then(resp => {
        //     if (resp.status == "201") {
        //       this.$router.push("/watch");
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err.response);
        //   });
      }
    }
  }
};
</script>
