<template>
    <div class="stepping" id="stepping">
        <div class="step">
            <span>Etape</span>
            <span>{{n_step +1}}</span>
        </div>
        <div class="indicator">
        </div>
    </div>
</template>

<script>
export default {
    props: ["n_step"],
}
</script>

<style scoped>

.stepping {
    position: absolute;
    height: 120px;
    width: 250px;
    border: solid 4px #f00;
    z-index: 10;
}

</style>