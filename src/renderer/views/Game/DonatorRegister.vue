<template>
  <div class="col-6 offset-3">
    <div v-if="donator">
      <div class="row">
        <h1 class="display-4 text-center">
          Bienvenue, <strong>{{ donator.name }}</strong> !
        </h1>
        <a>Ce n'est pas vous ?</a>
      </div>
      <div class="row mt-3 text-center">
        <button
          class="btn btn-primary"
          @click.prevent="gotoGame"
        >
          Poursuivre
        </button>
      </div>
    </div>
    <div v-else-if="email">
      <div class="row mb-4">
        <h1 class="display-4 text-center">
          Vos informations
        </h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <form>
        <div class="row mb-3">
          <div class="col">
            <label for="name">Votre email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              required=""
            >
            <div class="invalid-feedback">
              Valid email is required.
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <label for="name">Votre nom</label>
            <input
              v-model="newDonator.name"
              type="text"
              class="form-control"
              required=""
            >
            <div class="invalid-feedback">
              Valid name is required.
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <label for="name">Votre sexe</label>
            <select
              v-model="newDonator.gender"
              class="custom-select d-block w-100"
              required
            >
              <option value="O">
                Non spécifié...
              </option>
              <option value="M">
                Homme
              </option>
              <option value="F">
                Femme
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-3 text-center">
          <div class="col">
            <button
              class="btn btn-primary"
              @click="registerDonator"
            >
              Donner
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      Erreur: veuillez contacter le support.
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonatorRegister',
  data: function () {
    return {
      donator: {},
      newDonator: {},
      email: '',
      payment: ''
    }
  },
  mounted: function () {
    this.donator = this.$store.state.currentDonator
    this.email = this.$store.state.newDonatorEmail
    this.payment = this.$store.state.currentPayment
  },
  methods: {
    registerDonator: function () {
      if (this.email) {
        this.newDonator.email = this.email
      }
      this.$http
        .post('donator/', this.newDonator)
        .then(resp => {
          if (resp.status == 201) {
            this.$store.commit('saveCurrentDonator', resp.data)
            this.donator = resp.data
            this.gotoGame()
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    gotoGame: function () {
      if (this.payment) {
        this.$http
          .patch('payment/' + this.payment.id + '/', {
            donator: this.donator.id
          })
          .then(resp => {
            console.log(resp)

            this.$router.push('/play')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.error('Fatal error')
      }
    }
  }
}
</script>
