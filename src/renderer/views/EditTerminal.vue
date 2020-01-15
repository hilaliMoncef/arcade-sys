<template>
  <div class="about mt-3">
    <div class="col-8 offset-2 mb-4">
      <div class="row">
        <h1 class="display-4 text-center">
          Terminal n° {{ terminal.id }}
        </h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col">
      <EditSingleTerminal
        :terminal="terminal"
        :campaigns="campaigns"
        :games="games"
      />
    </div>
  </div>
</template>

<script>
import EditSingleTerminal from '@/components/EditSingleTerminal.vue'

export default {
  name: 'EditTerminal',
  components: {
    EditSingleTerminal
  },
  data: function () {
    return {
      terminal: '',
      campaigns: {},
      games: {}
    }
  },
  mounted: function () {
    this.getTerminal()
    this.getCampaigns()
    this.getGames()
  },
  methods: {
    getGames: function () {
      this.$http
        .get('game/')
        .then(resp => {
          this.games = resp.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getCampaigns: function () {
      this.$http
        .get('campaign/')
        .then(resp => {
          this.campaigns = resp.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getTerminal: function () {
      this.$http
        .get('terminal/' + this.$route.params.id + '/')
        .then(resp => {
          this.terminal = resp.data
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>
