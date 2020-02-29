<template>
  <div class="h-100 w-100">
    <div class="splited-view d-flex flex-column">
      <div class="view position-relative first bg-gradient d-flex">
        <!-- RIBBON -->
        <div class="ribbon left">
          <span class="h5 mr-4 mb-3">1 - Choisis ton jeu</span>
        </div>
        <div class="small-gamepad bg-gradient d-flex flex-column px-4 py-2">
          <div
            class="d-flex align-items-center justify-content-between flex-1 py-2 px-3 mb-3"
          >
            <img src="@/assets/img/gamepad.svg" width="60" />
            <div class="g-buttons">
              <div class="row mb-1">
                <span class="g-btn">X</span>
                <span class="g-btn">Y</span>
                <span class="g-btn">L</span>
              </div>
              <div class="row">
                <span class="g-btn">A</span>
                <span class="g-btn">B</span>
                <span class="g-btn">R</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <span><span class="g-btn">A</span>Valider</span>
            <span><span class="g-btn">B</span>Retour</span>
          </div>
        </div>
        <div class="d-flex w-100 align-items-center overlayed">
          <!-- Main layout -->
          <div class="col-3 font-weight-bold text-white">
            1 PARTIE = 5 MIN
          </div>
          <div class="cards d-flex mx-5">
            <div class="form-group col-4 mt-2">
              <label :class="['checkbox', 'py-3', 'mx-2', 'px-3']">
                <input type="radio" />
                <div class="px-5">
                  <img
                    src="@/assets/img/msf.png"
                    alt=""
                    class="img-fluid rounded-circle"
                  />
                </div>
                <span class="mt-2 font-weight-bold text-uppercase"
                  >Campagne</span
                >
                <p class="small text-left" style="line-height: 1.3em;">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  fuga harum accusamus quod quae quasi, voluptas, voluptates
                  animi exercitationem modi excepturi a beatae debitis pariatur
                  ullam hic.
                </p>
              </label>
            </div>
            <div class="form-group col-4 mt-2">
              <label :class="['selected', 'checkbox', 'py-3', 'mx-2', 'px-3']">
                <input type="radio" />
                <div class="px-5">
                  <img
                    src="@/assets/img/msf.png"
                    alt=""
                    class="img-fluid rounded-circle"
                  />
                </div>
                <span class="mt-2 font-weight-bold text-uppercase"
                  >Campagne</span
                >
                <p class="small text-left" style="line-height: 1.3em;">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  fuga harum accusamus quod quae quasi, voluptas, voluptates
                  animi exercitationem modi excepturi a beatae debitis pariatur
                  ullam hic.
                </p>
              </label>
            </div>
            <div class="form-group col-4 mt-2">
              <label :class="['checkbox', 'py-3', 'mx-2', 'px-3']">
                <input type="radio" />
                <div class="px-5">
                  <img
                    src="@/assets/img/msf.png"
                    alt=""
                    class="img-fluid rounded-circle"
                  />
                </div>
                <span class="mt-2 font-weight-bold text-uppercase"
                  >Campagne</span
                >
                <p class="small text-left" style="line-height: 1.3em;">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  fuga harum accusamus quod quae quasi, voluptas, voluptates
                  animi exercitationem modi excepturi a beatae debitis pariatur
                  ullam hic.
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="view second position-relative d-flex">
        <div class="ribbon right">
          <span class="h5">2 - Choisis ton association</span>
        </div>
        <div class="d-flex w-100 mt-5 align-items-center">
          <div
            class="col-3 h4 font-weight-bold text-black d-flex justify-content-center text-center"
          >
            1 PARTIE<br />=<br />1 DON
          </div>
          <div class="cards d-flex mx-5">
            <div class="form-group col-4 mt-2">
              <label
                :class="[
                  'checkbox',
                  'bg-gradient-diag',
                  'py-3',
                  'mx-2',
                  'px-3'
                ]"
              >
                <input type="radio" />
                <div class="px-5">
                  <img
                    src="@/assets/img/msf.png"
                    alt=""
                    class="img-fluid rounded-circle"
                  />
                </div>
                <span class="mt-2 font-weight-bold text-uppercase"
                  >Campagne</span
                >
                <p class="small text-left" style="line-height: 1.3em;">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  fuga harum accusamus quod quae quasi, voluptas, voluptates
                  animi exercitationem modi excepturi a beatae debitis pariatur
                  ullam hic.
                </p>
              </label>
            </div>
            <div class="form-group col-4 mt-2">
              <label
                :class="[
                  'selected',
                  'bg-gradient-diag',
                  'checkbox',
                  'py-3',
                  'mx-2',
                  'px-3'
                ]"
              >
                <input type="radio" />
                <div class="px-5">
                  <img
                    src="@/assets/img/msf.png"
                    alt=""
                    class="img-fluid rounded-circle"
                  />
                </div>
                <span class="mt-2 font-weight-bold text-uppercase"
                  >Campagne</span
                >
                <p class="small text-left" style="line-height: 1.3em;">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  fuga harum accusamus quod quae quasi, voluptas, voluptates
                  animi exercitationem modi excepturi a beatae debitis pariatur
                  ullam hic.
                </p>
              </label>
            </div>
            <div class="form-group col-4 mt-2">
              <label
                :class="[
                  'checkbox',
                  'py-3',
                  'bg-gradient-diag',
                  'mx-2',
                  'px-3'
                ]"
              >
                <input type="radio" />
                <div class="px-5">
                  <img
                    src="@/assets/img/msf.png"
                    alt=""
                    class="img-fluid rounded-circle"
                  />
                </div>
                <span class="mt-2 font-weight-bold text-uppercase"
                  >Campagne</span
                >
                <p class="small text-left" style="line-height: 1.3em;">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  fuga harum accusamus quod quae quasi, voluptas, voluptates
                  animi exercitationem modi excepturi a beatae debitis pariatur
                  ullam hic.
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  data: function() {
    return {
      stdout: ""
    };
  },
  methods: {}
};
</script>
