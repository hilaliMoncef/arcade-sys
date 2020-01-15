<template>
  <div class="col-12">
    <div class="row">
      <div class="col-6 offset-3">
        <h1 class="display-4 text-center">
          Merci pour votre don
        </h1>
        <p class="lead">
          {{ campaign.description }}
        </p>
      </div>
    </div>
    <div class="row">
      <p>{{ campaign.video }}</p>
    </div>
    <div class="message my-4">
      {{ campaign.html_template }}
    </div>
    <div class="row mb-4 w-100">
      <a
        href="#"
        class="btn btn-primary mx-auto"
        @click.prevent="gotoPlay"
      >Appuyer sur <span class="g-btn">A</span> pour jouer</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowCampaign',
  data: function () {
    return {
      campaign: {},
      session: {}
    }
  },
  computed: {
    a () {
      return this.$store.state.gamepad.A
    }
  },
  watch: {
    a: function (val) {
      if (val) {
        this.gotoPlay()
      }
    }
  },
  mounted: function () {
    this.campaign = this.$store.state.currentCampaign
    this.session = this.$store.state.session
  },
  methods: {
    gotoPlay: function () {
      this.$router.push('/play')
    }
  }
}
</script>
