<template>

    <div class="auth-page">
        <img src="assets/images/brand/logo.png" class="auth-page__logo"/>

        <!-- Авторизация -->
        <div class="auth-block">
            <div class="auth-block__title">Авторизация</div>

            <form name="login" action="">

                <div class="auth-block__field-container auth-block__field-container--login">
                    <input class="auth-block__field" type="text" name="login" placeholder="Логин" required>
                </div>

                <div class="auth-block__field-container auth-block__field-container--pass">
                    <input class="auth-block__field" type="password" name="pass" placeholder="Пароль" required>
                </div>

                <button class="auth-block__submit-btn btn btn-primary" type="submit">Войти</button>
                <div class="auth-block__flex">

                    <label class="default-checkbox" for="remember-checkbox">
                        <input class="auth-block__checkbox" type="checkbox" name="remember" id="remember-checkbox">

                        <span class="auth-block__checkbox-label">Запомнить меня</span>
                    </label>

                    <a class="auth-block__link" href="#">Вспомнить пароль</a>

                </div>

            </form>

            <div class="auth-block__link-container">
                <span class="auth-block__link-title">Нет аккаунта?</span>
                <router-link class="auth-block__link" to="/register">Зарегестрируйтесь</router-link>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
    @import "../../../layout/html/assets/scss/main";
</style>
