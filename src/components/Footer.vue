<template>
    <footer class="footer">
        <div class="container">
            <div class="row align-items-center flex-row-reverse">
                <div class="col-md-12 col-sm-12 mt-3 mt-lg-0 text-center">
                    © {{ (new Date()).getFullYear() }} <a href="#">ivend</a>. Все права защищены.
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
