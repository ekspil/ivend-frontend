<template>
    <footer class="footer">
        <div class="container">
            <div class="row align-items-center text-center">
                <div class="col-lg-6 col-sm-12 text-left privacy">
                    <router-link to="/tariffs">Тарифы и реквизиты</router-link>
                    <a v-if="oferta" :href="oferta" target="_blank" class="ml-5">Договор присоединения</a>
                </div>
                <div class="col-lg-6 col-sm-12 mt-3 mt-lg-0 text-right privacy">
                    © {{ (new Date()).getFullYear() }} <a href="https://cabinet.ivend.pro">ivend</a>. Все права защищены.
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
	export default {
		name: 'Footer',

    beforeMount() {
      if(this.$store.state.user.partnerInfo && this.$store.state.user.partnerInfo.fileOferta){
        this.oferta = `/api/v1/files/download/${this.$store.state.user.partnerInfo.partnerId}/${this.$store.state.user.partnerInfo.fileOferta}`
      } else{
        this.oferta = "/assets/uploads/oferta.pdf"
      }
    },
    data: () =>({
    oferta: null,
  })
	}
</script>

<style scoped lang="scss">
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 10;
	}
</style>
