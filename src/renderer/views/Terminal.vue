<template>
  <div class="mt-2">
    <div class="row mb-4">
      <div class="col">
        <h4 class="font-weight-bold">
          Dashboard
        </h4>
      </div>
      <div class="col text-right">
        <router-link to="/terminals" class="btn btn-link">
          Retour à la liste
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col mb-3">
        <div class="px-4 py-2 card card-rounded bg-dark">
          <h1 class="display-4" style="color: #fff;">
            #{{ terminal.id }} {{ terminal.name }}
          </h1>
          <p class="lead w-100">
            <span v-if="terminal.is_active" class="badge badge-success mr-2"
              >Activé</span
            >
            <span v-else class="badge badge-danger mr-2">Inactive</span>
            <span v-if="terminal.is_on" class="badge badge-success mr-2"
              >Allumé</span
            >
            <span v-else class="badge badge-danger mr-2">Eteint</span>
            <span v-if="terminal.is_playing" class="badge badge-success"
              >En jeu</span
            >
            <span v-else class="badge badge-warning">En attente</span>
          </p>
        </div>
      </div>
    </div>
    <div class="row my-2 d-flex align-items-stretch">
      <div class="col">
        <div class="card card-rounded px-4 py-3 h-100">
          <div class="d-flex justify-content-around align-items-center h-100">
            <span
              v-for="campaign in campaigns"
              :key="campaign.id"
              class="border px-2 py-1 mx-1 rounded border-primary h-100 text-primary small d-flex flex-column  justify-content-around align-items-center"
            >
              <img :src="campaign.logo" height="50" :alt="campaign.name" />
              <span>{{ campaign.name }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card card-rounded px-4 py-3 h-100">
          <div class="d-flex justify-content-around align-items-center h-100">
            <span
              v-for="game in games"
              :key="game.id"
              class="border px-2 py-1 mx-1 rounded h-100 border-secondary text-secondary small d-flex flex-column justify-content-around align-items-center"
            >
              <img :src="game.logo" height="50" :alt="game.name" />
              <span>{{ game.name }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-7">
        <div class=" mt-4 px-4 py-2 card card-rounded">
          <h5 class="my-3">
            Derniers donateurs :
          </h5>
          <p>Les 5 derniers donateurs sur ce terminal.</p>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  ID
                </th>
                <th scope="col">
                  Campagne
                </th>
                <th scope="col">
                  Montant
                </th>
                <th scope="col">
                  Jeu choisi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="donation in donations" :key="donation.id">
                <td class="font-weight-bold">
                  {{ donation.donator.id }}
                </td>
                <td>{{ donation.campaign.name }}</td>
                <td>{{ donation.amount }} €</td>
                <td>{{ donation.game.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-5 mt-4">
        <div class="mb-3 px-4 py-2 pt-3 card card-rounded">
          <h5>Session moyenne :</h5>
          <p class="display-4">
            {{ avgTS }}
          </p>
        </div>
        <div class="mb-3 px-4 py-2 pt-3 card card-rounded">
          <h5>Session de jeu moyenne :</h5>
          <p class="display-4">
            {{ avgGameTS }}
          </p>
        </div>
        <div class="mb-3 px-4 py-2 pt-3 card card-rounded">
          <h5>Donation moyenne :</h5>
          <p class="display-4">{{ avgDonations }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Terminal",
  data: function() {
    return {
      terminal: "",
      campaigns: {},
      games: {},
      donations: {},
      avgDonations: "",
      avgTS: "",
      avgGameTS: ""
    };
  },
  mounted: function() {
    this.getTerminal();
    this.getStats();
  },
  methods: {
    getTerminal: function() {
      this.$http
        .get("terminal/" + this.$route.params.id + "/")
        .then(resp => {
          this.terminal = resp.data;
          this.$http
            .get("terminal/" + this.$route.params.id + "/campaigns/")
            .then(resp => {
              this.campaigns = resp.data;
            });
          this.$http
            .get("terminal/" + this.$route.params.id + "/games/")
            .then(resp => {
              this.games = resp.data;
            });
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getStats: function() {
      this.$http
        .get("terminal/" + this.$route.params.id + "/stats/")
        .then(resp => {
          const data = JSON.parse(resp.data);
          this.avgDonations = data.avg_amount.toFixed(2);
          this.donations = data.payments;
          this.avgGameTS = data.avg_game_ts.replace(/"/g, "");
          this.avgTS = data.avg_ts.replace(/"/g, "");
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>
