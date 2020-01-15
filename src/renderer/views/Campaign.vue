<template>
  <div class="about mt-3">
    <div class="row mb-4">
      <div class="col">
        <h4 class="font-weight-bold">
          Dashboard
        </h4>
      </div>
      <div class="col text-right">
        <router-link
          to="/campaigns"
          class="btn btn-link"
        >
          Retour à la liste
        </router-link>
      </div>
    </div>
    <div class="col">
      <div class="row mb-3">
        <div class="card card-rounded bg-dark text-white">
          <div class="card-body d-flex">
            <div class="mr-4">
              <img
                :src="campaign.logo"
                :alt="campaign.name"
                height="150"
              >
            </div>
            <div class="d-flex flex-column">
              <span class="small mt-2 mb-0">Campagne n° {{ campaign.id }}</span>
              <h1 class="display-4 text-white">
                {{ campaign.name }}
              </h1>
              <p class="w-100">
                <strong>Description :</strong> {{ campaign.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="card card-rounded">
          <div class="card-body">
            <p class="lead">
              Montant récolté aujourd'hui
            </p>
            <div class="display-4">
              {{ totalToday }} €
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card card-rounded">
          <div class="card-body">
            <p class="lead">
              Montant total récolté
            </p>
            <div class="display-4">
              {{ campaign.collected }}/{{ campaign.goal_amount }} €
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card card-rounded">
          <div class="card-body">
            <p class="lead">
              Montant moyen
            </p>
            <div class="display-4">
              {{ avgDonation }} €
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-8">
        <div class="card card-rounded">
          <div class="card-body">
            <h3 class="my-3">
              Derniers donateurs
            </h3>
            <p class="lead ">
              Les 5 derniers donateurs pour cette campagne.
            </p>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">
                    #
                  </th>
                  <th scope="col">
                    Don
                  </th>
                  <th scope="col">
                    Terminal
                  </th>
                  <th scope="col">
                    Jeu
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="donation in lastDonations"
                  :key="donation.id"
                >
                  <th scope="row">
                    {{ donation.id }}
                  </th>
                  <td>{{ donation.amount }} €</td>
                  <td>
                    <router-link
                      :to="'/terminal/' + donation.terminal.id + '/'"
                    >
                      {{ donation.terminal.name }}
                    </router-link>
                  </td>
                  <td>{{ donation.game.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card card-rounded">
          <div class="card-body">
            <h3 class="my-3">
              Vidéo
            </h3>
            <video
              :src="campaign.video_url"
              controls
              class="w-100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Campaign',
  data: function () {
    return {
      campaign: '',
      totalToday: '',
      totalEver: '',
      avgDonation: '',
      lastDonations: {}
    }
  },
  mounted: function () {
    this.getCampaign()
  },
  methods: {
    getCampaign: function () {
      this.$http
        .get('campaign/' + this.$route.params.id + '/')
        .then(resp => {
          this.campaign = resp.data
          this.getStats()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getStats: function () {
      this.$http
        .get('campaign/' + this.$route.params.id + '/stats/')
        .then(resp => {
          const data = JSON.parse(resp.data)
          this.totalToday = data.total_today
          this.totalEver = data.total_ever
          this.avgDonation = data.avg_amount.toFixed(2)
          this.lastDonations = data.last_donations
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>
