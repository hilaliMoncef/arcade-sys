<template>
  <form class="w-100">
    <div class="row">
      <div class="col-9">
        <div class="form-group w-100">
          <label for="name">Nom de la campagne</label>
          <input
            v-model="campaign.name"
            type="text"
            class="form-control"
            aria-describedby="nameHelp"
          >
          <small
            id="nameHelp"
            class="form-text text-muted"
          >Donnez un nom cohérent à la campagne.</small>
        </div>
      </div>
      <div class="col-3">
        <div class="form-group w-100">
          <label for="name">Objectif de collecte</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                id="basic-addon1"
                class="input-group-text"
              ><font-awesome-icon
                icon="euro-sign"
              /></span>
            </div>
            <input
              v-model="campaign.goal_amount"
              type="number"
              class="form-control"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group w-100">
          <label for="name">Lien vers l'association</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                id="basic-addon1"
                class="input-group-text"
              ><font-awesome-icon
                icon="link"
              /></span>
            </div>
            <input
              v-model="campaign.link"
              type="text"
              class="form-control"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group w-100">
          <label for="description">Description</label>
          <textarea
            v-model="campaign.description"
            class="form-control"
            aria-describedby="descHelp"
          />
          <small
            id="descHelp"
            class="form-text text-muted"
          >Une courte description de la mission de l'association.</small>
        </div>
      </div>
    </div>
    <form
      class="row"
      enctype="multipart/form-data"
    >
      <div class="col">
        <div class="form-group">
          <label for="logo">Logo</label>
          <input
            ref="logo"
            type="file"
            class="form-control-file"
            aria-describedby="fileHelpId"
            name="logo"
          >
          <small
            id="fileHelpId"
            class="form-text text-muted"
          >Logo en PNG décrivant bien la mission de l'association.</small>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col">
        <div class="form-group w-100">
          <label for="name">Lien vers la vidéo</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                id="basic-addon1"
                class="input-group-text"
              ><font-awesome-icon
                icon="video"
              /></span>
            </div>
            <input
              v-model="campaign.video"
              type="text"
              class="form-control"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group w-100">
          <div class="form-group">
            <label for="html_template">HTML Template</label>
            <textarea
              v-model="campaign.html_template"
              class="form-control"
            />
            <small
              id="htmlHelp"
              class="form-text text-muted"
            >Template HTML qui apparaît à la fin de chaque partie.</small>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <router-link
          to="/campaigns"
          class="btn btn-link"
        >
          Retour
        </router-link>
        <button
          class="btn btn-primary"
          @click.prevent="add"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddCampaignForm',
  data: function () {
    return {
      campaign: {}
    }
  },
  methods: {
    add: function () {
      if (this.campaign) {
        let form = new FormData()
        form.append('author', this.$store.state.user_id)
        form.append('name', this.campaign.name)
        form.append('goal_amount', this.campaign.goal_amount)
        form.append('link', this.campaign.link)
        form.append('description', this.campaign.description)
        form.append('html_template', this.campaign.html_template)
        form.append('video', this.campaign.video)
        form.append('logo', this.$refs.logo.files[0])
        this.$http
          .post('campaign/', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(resp => {
            this.campaign = resp.data
            this.$router.push('/campaigns')
          })
          .catch(err => {
            console.log(err.response)
          })
      }
    }
  }
}
</script>
