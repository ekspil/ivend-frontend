
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
            <a href="#" class="auth-block__link">Зарегестрируйтесь</a>
        </div>
    </div>
    <!-- Регистрация -->
    <div class="auth-block disabled-block">
        <div class="auth-block__title">Регистрация</div>

        <form name="register" action="">
            <div class="auth-block__field-container auth-block__field-container--email">
                <input class="auth-block__field" type="email" name="login" placeholder="Email" required>
            </div>
            <div class="auth-block__field-container auth-block__field-container--phone">
                <input class="auth-block__field" type="tel" name="phone" placeholder="Телефон" required>
            </div>

            <!-- Код телефона -->

            <div class="auth-block__field-container auth-block__field-container--phone-code">
                <input class="auth-block__field auth-block__field--phone-code" type="text" name="tel-code"
                       placeholder="Код из смс" required>
                <button class="auth-block__phone-code-btn">Выслать код</button>
                <div class="auth-block__code-message">Код подтверждения отправлен на номер<br/>+7 (999) 999 9999</div>
            </div>

            <!-- Второй шаг регистрации -->

            <div class="disabled-block">
                <div class="auth-block__field-container auth-block__field-container--pass">
                    <input class="auth-block__field" type="password" name="pass" placeholder="Пароль" required>
                </div>
                <div class="auth-block__field-container auth-block__field-container--pass">
                    <input class="auth-block__field" type="password" name="pass-confirm" placeholder="Повторите пароль"
                           required>
                </div>
                <button class="auth-block__submit-btn btn btn-primary" type="submit">Зерегистрироваться</button>
                <label class="default-checkbox" for="сonditions-checkbox">
                    <input class="auth-block__checkbox" type="checkbox" name="remember" id="сonditions-checkbox">
                    <span class="auth-block__checkbox-label">Я согласен с <a class="auth-block__link" href="#">условиями соглашения</a></span>
                </label>
            </div>
        </form>

        <div class="auth-block__link-container">
            <span class="auth-block__link-title">Уже есть аккаунт?</span>
            <a href="#" class="auth-block__link">Войти</a>
        </div>
    </div>
</div>
