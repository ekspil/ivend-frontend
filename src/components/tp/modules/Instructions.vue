<template>
    <div>
        <Inst :data="{...data, title: 'Инструкции', nodate: true}" topLine="false" header="false"></Inst>
    </div>
</template>

<script>
    import Inst from "@/modules/News"

    import gql from 'graphql-tag';
    export default {
        name: "Instructions",
        components: {Inst},
        data: ()=>({
            data: {}
        }),
        apollo: {
            data: {
                query: gql`
                    query {
                        getInstr {

                            date
                            text
                            link
                            header
                            active
                            }
                    }
                `,
                update: (data) => {
                    function compare(a, b) {
                        let dateA = a.date.split(/[\s|,\.!\-#]+/)
                        dateA.reverse()
                        let dateB = b.date.split(/[\s|,\.!\-#]+/)
                        dateB.reverse()
                        dateA.join('.')
                        dateB.join('.')
                        if (dateA > dateB) return -1; // если первое значение больше второго
                        if (dateA == dateB) return 0; // если равны
                        if (dateA < dateB) return 1; // если первое значение меньше второго
                    }
                    return {
                        news: data.getInstr.sort(compare)
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>