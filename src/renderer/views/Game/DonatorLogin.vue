<template>
  <div class="col-6 offset-3">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">
        Identifiez-vous
      </h1>
      <p class="lead">
        Veuillez rentrer un email pour nous permettre de vous identifier.
      </p>
    </div>
    <form>
      <div class="row">
        <div class="col">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            required
          >
          <div class="invalid-feedback">
            Email invalide.
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col text-center">
          <button
            class="btn btn-primary"
            @click.prevent="donatorLogin"
          >
            Suivant
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'DonatorLogin',
  data: function () {
    return {
      donator: {},
      newDonator: {},
      email: ''
    }
  },
  methods: {
    donatorLogin: function () {
      this.$http
        .get('donator/email/' + this.email + '/')
        .then(resp => {
          this.$store.commit('saveCurrentDonator', resp.data)
          this.$router.push('/donator/login')
        })
        .catch(err => {
          if (err.response.status == 404) {
            this.$store.commit('saveNewDonatorEmail', this.email)
            this.$router.push('/donator/login')
          }
        })
    }
  }
}
</script>
