<template>
  <div class="h-100 w-100">
    <div class="h-100 w-100">
      <div class="d-flex flex-column h-100">
        <div
          class="bg-gradient-half position-absolute w-100 h-100 d-flex flex-column"
        >
          <div class="flex-1 h-100 bg-gradient position-relative"></div>
          <div class="flex-1 h-100 bg-white position-relative">
            <div class="with-split"></div>
          </div>
        </div>
        <div
          class="view position-relative d-flex flex-column align-items-center"
        >
          <div class="ribbon left" style="width: 380px; height: 110px;">
            <span class="h5 mr-3 mb-4">3 - Prêt à être solidaire?</span>
          </div>
          <div
            class="row d-flex align-items-center justify-content-around mt-5 pt-5 w-100"
          >
            <span class="col-8 offset-2 h3 text-uppercase text-center"
              >100% est reversé à l'association</span
            >
            <div class="col-2">
              <div class="logo-circle">
                <img :src="campaign.logo" :alt="campaign.name" />
              </div>
            </div>
          </div>
          <div class="container-fluid px-5 my-3">
            <div class="row d-flex align-items-start justify-content-between">
              <div
                v-for="(amount, index) in amounts"
                :key="index"
                :class="[
                  'amount-wrap',
                  'col',
                  'd-flex',
                  'flex-column',
                  'align-items-center'
                ]"
              >
                <div class="logo-rounded">
                  <img
                    :src="campaign.logo"
                    :alt="campaign.name"
                    height="125"
                    class="rounded"
                  />
                </div>
                <div
                  :class="[
                    choosenIndexOf == index ? 'selected' : '',
                    'amount',
                    'mt-3',
                    'd-flex',
                    'flex-column',
                    'p-3'
                  ]"
                >
                  <span class="h2 text-center mt-3">{{ amount }}€</span>
                  <span class="mt-3"
                    >Erum, to magni si as voluptis que doluptati int, tem que
                    que volupti onsequatis dolupta speritat rae simus illestrum
                    qui cquam libus, unt volore sequibusant.</span
                  >
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
              <span><span class="g-btn">B</span>Retour</span>
            </div>
          </div>
          <div
            class="small-btn-gamepad d-flex align-items-center justify-content-center p-4 mb-3 pr-5"
          >
            <span><span class="g-btn">A</span>Valider</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Payment",
  data: function() {
    return {
      campaign: this.$store.state.currentCampaign,
      choosenIndexOf: 2,
      amounts: [1, 5, 10, 20, 30],
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
        this.proceed();
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
    proceed: function() {
      this.$router.push({
        name: "contactless",
        params: { amount: this.amounts[this.choosenIndexOf] }
      });
    }
  }
};
</script>
