<template>
    <div>
        <Inst :data="{...data, title: 'Инструкции'}"></Inst>
    </div>
</template>

<script>
    import Inst from "@/modules/News"
    export default {
        name: "Instructions",
        components: {Inst},
        data: ()=>({
            data: {}
        })
    }
</script>

<style scoped>

</style>