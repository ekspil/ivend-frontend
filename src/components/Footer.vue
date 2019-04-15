<template>
    <footer class="footer">
        <div class="container">
            <div class="row align-items-center text-center">
                <div class="col-lg-12 text-center privacy">
                    <a href="#" class="btn btn-link">Тарифы и реквизиты</a>
                    <a href="#" class="btn btn-link">Договор оферты</a>
                </div>
            </div>
            <div class="row align-items-center flex-row-reverse">
                <div class="col-lg-12 col-sm-12 mt-3 mt-lg-0 text-center">
                    © {{ (new Date()).getFullYear() }} <a href="https://cabinet.ivend.pro">ivend</a>. Все права защищены.
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
	export default {
		name: 'Footer'
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
