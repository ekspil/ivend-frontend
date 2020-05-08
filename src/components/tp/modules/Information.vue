<template>
    <div>
        <Info :data="{...data, title: 'Информация'}"></Info>
    </div>
</template>

<script>
    import Info from "@/modules/News"
    export default {
        name: "Information",
        components: {Info},
        data: ()=>({
            data: {}
        })
    }
</script>

<style scoped>

</style>