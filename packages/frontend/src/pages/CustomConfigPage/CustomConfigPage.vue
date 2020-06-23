<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
            <customization></customization>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Customization from "../../components/Customization";
    export default {
        name: "CustomizationPage",
        components: {Customization}
    }
</script>

<style scoped>

</style>

