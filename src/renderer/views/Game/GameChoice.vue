<template>
  <div>
    <div class="home">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <ul>
          <div
            class="form-group w-100 mt-5 d-flex justify-content-between align-items-stretch"
          >
            <label
              v-for="(game, index) in games"
              :key="game.id"
              :for="game.id"
              :class="[
                choosenGame.id == game.id ? 'checked' : '',
                'checkbox',
                'col-4',
                'py-5',
                'mx-2'
              ]"
              @click="chooseGame(index)"
            >
              <input
                :id="game.id"
                v-model="choosenGame.id"
                type="radio"
                :value="game.id"
              >
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
              <span class="checkbox-icon">
                <img
                  :src="game.logo"
                  width="120"
                  :alt="game.name"
                >
              </span>
              <h4 class="mt-2">{{ game.name }}</h4>
              <p class="small text-left">{{ game.description }}</p>
            </label>
          </div>
        </ul>
      </div>
      <div class="row">
        <div class="col text-center">
          <a
            href=""
            class="btn text-danger btn-link mr-2"
          >Appuyer sur <span class="g-btn border-danger">B</span> pour
            revenir</a>
          <a
            href=""
            class="btn btn-primary"
            @click.prevent="gotoPayment"
          >Appuyer sur <span class="g-btn">A</span> pour continuer</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameChoice',
  data: function () {
    return {
      choosenGame: '',
      choosenIndexOf: 0,
      games: {}
    }
  },
  computed: {
    a () {
      return this.$store.state.gamepad.A
    },
    b () {
      return this.$store.state.gamepad.B
    },
    left () {
      return this.$store.state.gamepad.Left
    },
    right () {
      return this.$store.state.gamepad.Right
    }
  },
  watch: {
    a: function (val) {
      if (val) {
        this.gotoPayment()
      }
    },
    b: function (val) {
      if (val) {
        this.$router.go(-1)
      }
    },
    left: function (val) {
      if (val) {
        if (this.games[this.choosenIndexOf - 1]) {
          this.chooseGame(this.choosenIndexOf - 1)
        }
      }
    },
    right: function (val) {
      if (val) {
        if (this.games[this.choosenIndexOf + 1]) {
          this.chooseGame(this.choosenIndexOf + 1)
        }
      }
    }
  },
  mounted: function () {
    this.$http.get('terminal/mine/').then(resp => {
      this.games = resp.data.games
      this.choosenGame = this.games[0]
    })
  },
  methods: {
    chooseGame: function (index) {
      this.choosenGame = this.games[index]
      this.choosenIndexOf = index
    },
    gotoPayment: function () {
      if (this.choosenGame != null) {
        this.$store.commit('saveGameChoice', this.games[this.choosenIndexOf])
        this.$store.dispatch('updateSession')
        this.$router.push('/payment')
      }
    }
  }
}
</script>
