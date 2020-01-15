<template>
  <div>
    <div v-if="terminal.is_active" class="home">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <ul>
          <div
            class="form-group w-100 mt-5 d-flex justify-content-between align-items-stretch"
          >
            <label
              v-for="(campaign, index) in campaigns"
              :key="campaign.id"
              :for="campaign.id"
              :class="[
                choosenCampaign == campaign.id ? 'checked' : '',
                'checkbox',
                'col-4',
                'py-5',
                'mx-2'
              ]"
              @click="chooseCampaign(index)"
            >
              <input
                :id="campaign.id"
                v-model="choosenCampaign"
                type="radio"
                :value="campaign.id"
              />
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
                <img :src="campaign.logo" width="120" :alt="campaign.name" />
              </span>
              <h4 class="mt-2">{{ campaign.name }}</h4>
              <p class="lead">
                {{ campaign.collected }}/{{ campaign.goal_amount }} €
              </p>
              <p class="small text-left">{{ campaign.description }}</p>
            </label>
          </div>
        </ul>
      </div>
      <div class="row">
        <div class="col text-center">
          <a href="" class="btn btn-primary" @click.prevent="gotoGameChoice"
            >Appuyer sur <span class="g-btn">A</span> pour continuer</a
          >
        </div>
      </div>
    </div>
    <div v-else-if="isAdmin">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">
          Aucune borne associée
        </h1>
        <p class="lead">
          Ce compte n'est pas associé à une borne.
        </p>
        <router-link to="/terminals">
          Gérer les terminaux
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">
          Borne désactivée
        </h1>
        <p class="lead">
          Cette borne est actuellement indisponible, veuillez réessayer plus
          tard.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartTerminal",
  data: function() {
    return {
      email: "",
      terminal: {},
      campaigns: {},
      isAdmin: {},
      choosenCampaign: "",
      choosenIndexOf: ""
    };
  },
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    },
    left() {
      return this.$store.state.gamepad.Left;
    },
    right() {
      return this.$store.state.gamepad.Right;
    }
  },
  watch: {
    a: function(val) {
      if (val) {
        this.gotoGameChoice();
      }
    },
    left: function(val) {
      if (val) {
        if (this.campaigns[this.choosenIndexOf - 1]) {
          this.choosenCampaign = this.campaigns[this.choosenIndexOf - 1].id;
          this.chooseCampaign(this.choosenIndexOf - 1);
        }
      }
    },
    right: function(val) {
      if (val) {
        if (this.campaigns[this.choosenIndexOf + 1]) {
          this.choosenCampaign = this.campaigns[this.choosenIndexOf + 1].id;
          this.chooseCampaign(this.choosenIndexOf + 1);
        }
      }
    }
  },
  mounted: function() {
    this.isAdmin = this.$store.getters.isAdmin;
    if (!this.isAdmin) {
      this.$http
        .get("terminal/mine/")
        .then(resp => {
          this.$store.commit("startTerminal", resp.data);
          this.terminal = resp.data.terminal;
          this.campaigns = resp.data.campaigns;
          this.shuffleArray(this.campaigns);
          this.$store.commit("startSession");
          this.$http.get("terminal/mine/on/").then(response => {
            this.$store.commit("saveCurrentTerminal", response.data);
          });
          this.chooseCampaign(0);
          this.choosenCampaign = this.campaigns[0].id;
          this.$store.commit("startListening");
        })
        .catch(err => {
          console.error(err.response);
        });
    }
  },
  methods: {
    chooseCampaign: function(index) {
      this.choosenIndexOf = index;
    },
    gotoGameChoice: function() {
      if (this.choosenIndexOf != null) {
        this.$store.commit("saveCampaignChoice", {
          campaign: this.campaigns[this.choosenIndexOf],
          indexOf: this.choosenIndexOf + 1
        });
        this.$store.dispatch("startSession");
        this.$router.push("/choose");
      } else {
        console.error("no choice");
      }
    },
    shuffleArray: function(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
};
</script>

<style>
.checkbox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #dfe2ea;
  color: #a0a2b1;
  border-radius: 20px;
  font-weight: bold;
  transition: 0.2s ease all;
}

.checkbox input {
  display: none;
}

.checkbox:hover {
  color: #3751ff;
  border-color: #3751ff;
  cursor: pointer;
}

.checkbox .selected {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #dfe2ea;
  transition: 0.2s ease all;
  font-size: 12px;
  color: transparent;
}

.checkbox:hover .selected {
  border-color: #3751ff;
}

.checkbox .checkbox-icon {
  text-align: center;
}

.checkbox:hover .checkbox-icon {
  fill: #3751ff;
}

.checked {
  border-color: #3751ff;
  color: #3751ff;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(210, 215, 252, 1);
  -moz-box-shadow: 0px 0px 6px 0px rgba(210, 215, 252, 1);
  box-shadow: 0px 0px 6px 0px rgba(210, 215, 252, 1);
}

.checked svg {
  fill: #3751ff;
}

.checked .selected {
  border-color: #3751ff;
  background-color: #3751ff;
  color: white;
}

.g-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-weight: bold;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
