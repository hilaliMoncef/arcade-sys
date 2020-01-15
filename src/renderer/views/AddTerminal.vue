<template>
  <div v-if="!formVisible">
    <div class="col-8 offset-2 mb-4">
      <div class="row">
        <h1 class="display-4 text-center">
          Choisir un client
        </h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-6 offset-3">
      <select
        v-model="choosenCustomer"
        class="custom-select mb-2"
      >
        <option
          v-for="customer in customers"
          :key="customer.id"
          :value="customer.id"
        >
          {{ customer.company }} - {{ customer.representative }}
        </option>
      </select>
      <button
        class="btn btn-primary w-100"
        @click.prevent="continueWithCustomer"
      >
        Choisir un client existant
      </button>
      <div class="hr-text my-4">
        <span class="mx-3">ou</span>
      </div>
      <button
        class="btn btn-success w-100"
        @click.prevent="continueWithoutCustomer"
      >
        Créer un nouveau client
      </button>
    </div>
  </div>
  <div v-else>
    <div class="row">
      <div class="col-8 offset-2 mb-4">
        <div class="row">
          <a
            href=""
            class="mb-2"
            @click.prevent="goBack"
          >Retour au choix du client</a>
        </div>
        <div class="row">
          <h1 class="display-4 text-center">
            Nouveau terminal
          </h1>
          <p class="lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
    <div class="col-6 offset-3">
      <div class="row">
        <div class="mt-1">
          <h4 v-if="choosenCustomer">
            Choix du client
          </h4>
          <h4 v-else>
            Nouveau client
          </h4>
          <p class="small">
            Le compte client lié au terminal.
          </p>
        </div>
        <div class="form-group w-100">
          <label for="name">Nom de l'entreprise</label>
          <input
            v-model="customer.company"
            type="text"
            class="form-control"
            :disabled="choosenCustomer != ''"
          >
        </div>
        <div class="form-group w-100">
          <label for="name">Contact au sein de l'entreprise</label>
          <input
            v-model="customer.representative"
            type="text"
            class="form-control"
            :disabled="choosenCustomer != ''"
          >
        </div>
        <div class="col pl-0">
          <div class="form-group">
            <label for="sales_type">Type de vente</label>
            <select
              v-model="customer.sales_type"
              class="form-control"
              :disabled="choosenCustomer != ''"
            >
              <option
                value="A"
                :checked="customer.sales_type == 'A'"
              >
                Achat
              </option>
              <option
                value="L"
                :checked="customer.sales_type == 'L'"
              >
                Location
              </option>
            </select>
          </div>
        </div>
        <div class="col pr-0">
          <div class="form-group">
            <label for="sales_type">Contrat de maintenance</label>
            <select
              v-model="customer.maintenance_type"
              class="form-control"
              :disabled="choosenCustomer != ''"
            >
              <option
                value="option1"
                :checked="customer.sales_type == 'option1'"
              >
                Option 1
              </option>
              <option
                value="option2"
                :checked="customer.sales_type == 'option2'"
              >
                Option 2
              </option>
            </select>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="mt-3">
          <h4>Paramètres de connexion</h4>
          <p class="small">
            Les identifiants que le client doit utiliser pour connecter son
            terminal.
          </p>
        </div>
        <div class="form-group w-100">
          <label for="name">Nom d'utilisateur</label>
          <input
            v-model="user.username"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-group w-100">
          <label for="name">Mot de passe</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
          >
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="mt-1">
          <h4>Nom du terminal</h4>
          <p class="small">
            Un nom clair pour identifier le terminal.
          </p>
        </div>
        <div class="form-group w-100">
          <label for="name">Nom du terminal</label>
          <input
            v-model="terminal.name"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-group w-100">
          <label for="name">Localisation du terminal</label>
          <input
            v-model="terminal.location"
            type="text"
            class="form-control"
          >
        </div>
      </div>
      <div class="row my-3 text-center">
        <button
          class="btn btn-primary"
          @click.prevent="addTerminal"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTerminal',
  components: {},
  data: function () {
    return {
      formVisible: false,
      choosenCustomer: '',
      customer: {},
      user: {},
      terminal: {},
      customers: {}
    }
  },
  mounted: function () {
    this.getCustomers()
  },
  methods: {
    addTerminal: function () {
      if (this.choosenCustomer != '' && this.customer.id) {
        this.user.customer = this.customer.id
        this.$http
          .post('user/', this.user)
          .then(resp => {
            this.user = resp.data
            this.terminal.owner = this.user.id
            this.terminal.campaigns = []
            this.terminal.games = []
            this.$http
              .post('terminal/', this.terminal)
              .then(resp => {
                this.terminal = resp.data
                this.$router.push({
                  name: 'edit-terminal',
                  params: { id: this.terminal.id }
                })
              })
              .catch(err => {
                console.log('Error in terminal post')
                console.error(err.response)
              })
          })
          .catch(err => {
            console.log('Error in user post')
            console.error(err.response)
          })
      } else if (this.customer && this.user && this.terminal) {
        this.$http
          .post('customer/', this.customer)
          .then(resp => {
            this.customer = resp.data
            this.user.customer = this.customer.id
            this.$http
              .post('user/', this.user)
              .then(resp => {
                this.user = resp.data
                this.terminal.owner = this.user.id
                this.terminal.campaigns = []
                this.terminal.games = []
                this.$http
                  .post('terminal/', this.terminal)
                  .then(resp => {
                    this.terminal = resp.data
                    this.$router.push({
                      name: 'edit-terminal',
                      params: { id: this.terminal.id }
                    })
                  })
                  .catch(err => {
                    console.log('Error in terminal post')
                    console.error(err.response)
                  })
              })
              .catch(err => {
                console.log('Error in user post')
                console.error(err.response)
              })
          })
          .catch(err => {
            console.log('Error in Customer post')
            console.error(err.response)
          })
      }
    },
    getCustomers: function () {
      this.$http
        .get('customer/')
        .then(resp => {
          this.customers = resp.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    continueWithCustomer: function () {
      if (this.choosenCustomer) {
        // Get data about customer first
        this.$http
          .get('customer/' + this.choosenCustomer + '/')
          .then(resp => {
            this.customer = resp.data
            this.formVisible = true
          })
          .catch(err => {
            console.log(err.response)
          })
      }
    },
    continueWithoutCustomer: function () {
      this.choosenCustomer = ''
      this.customer = {}
      this.formVisible = true
    },
    goBack: function () {
      this.choosenCustomer = ''
      this.customer = {}
      this.formVisible = false
    }
  }
}
</script>

<style>
.hr-text {
  display: flex;
  align-items: center;
  text-align: center;
}
.hr-text::before,
.hr-text::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #000;
}
</style>
