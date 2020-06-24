<template>
  <div class="component">
    <div class="d-flex flex-column h-100">
        <div class="view position-relative d-flex flex-column align-items-center">
            
          <!-- ////// -->
            <div class="content">
              <div class="end-title">
                <span class="h2">Merci pour votre dons !</span><br>
                <span class="h2">L'association que vous avez choisit est {{ session.campaign.name }} </span>
                <div class="logo-circle" style="margin-left:45%;">
                  <img :src="session.campaign.logo" :alt="session.campaign.name" />
                </div>
              </div>
              <div class="end-choice">
                <!-- <div class="list-button">
                  <div class="rejouer e-button">Rejouer</div>
                  <div class="recu e-button">Reçu de dons</div>
                  <div class="infos e-button">Plus d'informations</div>
                  <div class="acceuil e-button">Acceuil</div>
                </div> -->
                <div class="list-button"  v-for="(choice, i) in choices" :key="i" :for="i" @click.prevent="doChoice(i)">
                  <div :class="[selectedChoice == i ? 'selected' : '' ,'e-button']"> {{choice.name}} </div>
                </div>
              </div>
            </div>
              <!-- <img src="@/assets/img/QRcode_puls.png" alt="QR code to puls-impact.fr"/> -->
          <!-- ////// -->
      </div>
  </div>
        <!-- <div class="big-gamepad bg-gradient d-flex px-4 py-2">
          <div
            class="d-flex align-items-center justify-content-between flex-1 py-2 px-3"
          >
            <img src="@/assets/img/gamepad.svg" width="60" />
            <div class="g-buttons ml-4">
              <div class="row mb-1">
                <span :class="['g-btn']">X</span>
                <span :class="['g-btn']">Y</span>
                <span class="g-btn">L</span>
              </div>
              <div class="row">
                <span :class="['g-btn']">A</span>
                <span :class="['g-btn', b ? 'clicked' : '']">B</span>
                <span class="g-btn">R</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between ml-5">
            <span><span class="g-btn">A</span>Valider</span>
            <span><span class="g-btn" @click="simulate_b">B</span>Accueil</span>
          </div>
        </div>
        <div
          class="small-btn-gamepad d-flex align-items-center justify-content-center p-4 mb-3 pr-5"
        >
          <span><span class="g-btn">B</span>Retour</span>
        </div> -->
        <helpGamepad :gpio_help="2"  @simulate_a="simulate_a" @simulate_b="simulate_b" @simulate_up="simulate_up" @simulate_down="simulate_down"/>
  </div>
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';

export default {
  name: "End",
  components: {helpGamepad},
  props: ["session"],
  data: function() {
    return { 
      choices : [
        { name : "Rejouer", id : 1},
        { name : "Revenir à l'accueil", id : 2},
        { name : "Qui sommes-nous ?", id : 3},
      ],
      selectedChoice: ""
    };
  },
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    },
    b() {
      return this.$store.state.gamepad.B;
    },
    up() {
      return this.$store.state.gamepad.Up;
    },
    down() {
      return this.$store.state.gamepad.Down;
    }
  },
  watch: {
    a: function(val) {
      if (val) {
        // this.$emit("nextView");
      }
    },
    b: function(val) {
      if (val) {
        this.$emit("lastView");
      }
    },
    up: function(val) {
      if (val) {
          this.doChoice(this.selectedChoice - 1);
      }
    },
    down: function(val) {
      if (val) {
          this.doChoice(this.selectedChoice + 1);
       }
    }
  },
  mounted: function() {
    this.$store.commit("startListening");
    this.$emit("endGameSession");
    this.$emit("endSession");
    this.doChoice(1);
  },
  methods: {
    simulate_up() {
        this.doChoice(this.selectedChoice - 1);
    },
    simulate_down() {
        this.doChoice(this.selectedChoice + 1);
    },
    simulate_a() {
      switch (this.selectedChoice) {
        case 0: this.$emit("replay");
            break;
        case 1: this.$emit("home"); 
            break;
        case 2: this.$emit("moreInfo"); 
            break;
      }
    },
    simulate_b() {
      this.$emit("lastView");
    }, 
    doChoice(index) {
      if (index > 2) {
        this.selectedChoice = 0; 
      } else if (index < 0) {
        this.selectedChoice = 2;
      } else {
        this.selectedChoice = index;
      }
    }
  }
};
</script>

<style scoped>

.content  {
  height: 80%;
  width: 100%;
  position:absolute;
  top:10%;
}

.selected {
  background-color : rgb(252, 236, 17) !important;
}

.end-title {
  text-align: center;
  color:white;
  margin-bottom: 15vh;
}

.list-button {
  margin-top: 2vh;
  color: white;
  font-size: 2rem;
  text-align: center;
}

.e-button {
  width: 30%;
  margin-left : 50%;
  transform: translateX(-50%);
  margin-top:30px;
  border : 3px solid rgb(255, 56, 56);
  background-color: rgb(255, 129, 129);
}

</style>
