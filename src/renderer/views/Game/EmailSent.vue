<template>
  <div class="col-6 offset-3">
    <div class="row">
      <h1 class="display-4 text-center">
        Email envoyé
      </h1>
      <p class="lead">
        Les informations concernant la déduction fiscale ont été envoyés à votre
        adresse email.
      </p>
    </div>
    <div class="row">
      <a
        href=""
        class="btn btn-primary"
        @click.prevent="backHome"
      >Appuyer sur <span class="g-btn">A</span></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailSent',
  computed: {
    a () {
      return this.$store.state.gamepad.A
    }
  },
  watch: {
    a: function (val) {
      if (val) {
        this.backHome()
      }
    }
  },
  mounted: function () {
    this.$store.commit('endSession')
    this.$store.dispatch('updateSession')
    this.$store.commit('deleteGamingStates')
  },
  methods: {
    backHome: function () {
      this.$router.push('/start')
    }
  }
}
</script>
