<template>
    <div class="component">
        <div class="d-flex flex-column h-100 bg-gradient">
        </div>


        <helpGamepad :gpio_help="4" :B_but="false" @simulate_a="simulate_a"/>
    </div>    
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';


export default {
    components: {helpGamepad},
    methods: {
        simulate_a() {
            this.$emit("nextView");
        }
    }
    
}
</script>

<style scoped>

</style>