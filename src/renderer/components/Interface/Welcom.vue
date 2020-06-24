<template>
    <div class="component">
        <div class="view screensaver">
            <div class="welcom-content">
                
                <div class="row w-title">
                    <span class="w-main-title">ART.CADE SOLIDAIRE</span>
                    <span class="w-subtitle">1 DON A UNE ASSOCIATION = 1 PARTIE</span>
                </div>
                
                <div class="row w-content">
                    <span class="w-description">Joue une partie, et au passage soutiens une association !</span>
                    <span class="w-consigne" @click="simulate_a"> PRESS A POUR COMMENCER</span>
                </div>

                <div class="row w-footer">
                    <span class="w-credit">© PULS IMPACT · 2019 - 2020</span>
                    <span class="w-credit-infos">Agence en innovations solidaires</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Welcom",
  props: [],   
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    },
    b() {
      return this.$store.state.gamepad.B;
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
        this.start();
      }
    },
    b: function(val) {
      if (val) {
        this.start();
      }
    },
    left: function(val) {
      if (val) {
          //Nothing
      }
    },
    right: function(val) {
      if (val) {
          // Nothing
       }
    }
  },
  methods: {
    simulate_a() {
      this.start();
    },
    simulate_b() {
      this.start();
    },
    start: function() {
        this.$emit("nextView");
      }
    }
};
</script>


<style scoped>
.screensaver {
  z-index: 10;
}

span {
    width: fit-content;
    margin-left: 50%;
    transform: translateX(-50%);
}

.w-title {
    position: absolute;
    text-align: center;
    width: 100%;
    top: 8vh;
}

.w-content {
    position: absolute;
    text-align: center;
    width: 100%;
    top: 50vh;
}

.w-footer {
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: 6vh;
}

.w-consigne {
    font-size: 1.5rem;
    font-weight: 600;
    padding : 10px;
    border : solid 3px red;
    margin-top : 30px;
}


</style>
