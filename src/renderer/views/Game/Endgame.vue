<template>
  <div>
    <div class="col-6 offset-3 mb-3">
      <div class="row">
        <h1 class="display-4 text-center">
          Merci pour votre don
        </h1>
        <p class="lead">
          Si vous le souhaitez, rentrer votre e-mail, nous vous enverrons les
          informations nécessaires pour établir votre reçu fiscal.
        </p>
      </div>
      <div class="row">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="donator.email"
            type="email"
            class="form-control"
            aria-describedby="emailHelpId"
            placeholder="Entrez un email valide"
          >
          <small
            id="emailHelpId"
            class="form-text text-muted"
          >Nous ne partageons votre email à personne sans votre
            autorisation.</small>
        </div>
      </div>
      <div class="row mb-3">
        <div class="form-check">
          <label class="form-check-label">
            <input
              v-model="donator.accept_asso"
              type="radio"
              class="form-check-input"
              value="1"
            >
            Cocher si vous souhaitez être mis en relation avec l’association.
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input
              v-model="donator.accept_newsletter"
              type="radio"
              class="form-check-input"
              value="1"
            >
            Cocher si vous souhaitez recevoir des newsletter de l’association.
          </label>
        </div>
      </div>
    </div>
    <div class="col-10 offset-1 my-2">
      <div class="row">
        <SimpleKeyboard
          :input="donator.email"
          @onChange="onChange"
        />
      </div>

      <div class="row d-flex align-items-center justify-content-center mt-4">
        <button
          class="btn btn-link text-danger"
          @click.prevent="restart"
        >
          Appuyer sur <span class="g-btn border-danger">B</span> pour terminer
        </button>
        <button
          class="btn btn-primary"
          @click.prevent="saveEmail"
        >
          Appuyer sur
          <span
            class="g-btn"
          ><font-awesome-icon
            class="small"
            icon="play"
          /></span>
          pour envoyer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleKeyboard from '@/components/SimpleKeyboard.vue'
export default {
  name: 'Endgame',
  components: {
    SimpleKeyboard
  },
  data: function () {
    return {
      donator: {}
    }
  },
  computed: {
    b () {
      return this.$store.state.gamepad.B
    },
    start () {
      return this.$store.state.gamepad.Start
    }
  },
  watch: {
    b: function (val) {
      if (val) {
        this.$router.push('/start')
      }
    },
    start: function (val) {
      if (val) {
        this.saveEmail()
      }
    }
  },
  mounted: function () {
    this.donator = this.$store.state.currentDonator
    this.$http.get('terminal/mine/gameover/')
    this.$store.commit('endGameSession')
    this.$store.dispatch('updateSession')
  },
  methods: {
    saveEmail: function () {
      if (this.donator.email) {
        this.$http.put('donator/' + this.donator.id + '/', this.donator)
        this.$router.push('/sent')
      }
    },
    restart: function () {
      this.$store.commit('endSession')
      this.$store.dispatch('updateSession')
      this.$store.commit('deleteGamingStates')
      this.$router.push('/start')
    },
    onChange (input) {
      this.donator.email = input
    },
    onInputChange (input) {
      this.donator.email = input.target.value
    }
  }
}
</script>
