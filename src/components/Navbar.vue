<template>
    <div>


      <div >
        <News v-if="data" :data="data" @clearNewsData="clearNewsData"></News>
      </div>
    <div class="ren-navbar" id="headerMenuCollapse">
        <div class="container">
            <ul class="nav">
                <li class="nav-item" @click="headerMenuCollapse" >
                    <router-link :class="['nav-link', isDisabled('/home')]" to="/home" activeClass="active" :event="isDisabled('/home') ? '' : 'click'">
                        <i class="fas fa-home"></i>
                        Главная
                    </router-link>
                </li>

                <li class="nav-item" @click="headerMenuCollapse">
                    <router-link to="/monitoring" :class="['nav-link', isDisabled('/monitoring')]" activeClass="active" :event="isDisabled('/monitoring') ? '' : 'click'">
                        <i class="fas fa-desktop"></i> <span>Мониторинг</span>
                    </router-link>

                    <!-- Removed -->
                    <div class="sub-item" v-if="false">
                        <ul>
                            <li>
                                <router-link to="/monitoring">Рабочие</router-link>
                            </li>
                            <li>
                                <router-link to="/monitoring">Неисправные</router-link>
                            </li>
                        </ul>
                    </div>
                    <!-- ------- -->
                </li>

                <li class="nav-item"  @click="headerMenuCollapse">
                    <router-link to="/stats" :class="['nav-link', isDisabled('/stats')]" activeClass="active" :event="isDisabled('/stats') ? '' : 'click'">
                        <i class="fas fa-chart-bar"></i> <span>Статистика</span>
                    </router-link>
                </li>

                <!-- Removed -->
                <li class="nav-item with-sub" v-if="false" @click="headerMenuCollapse">
                    <a class="nav-link" href="#"><i class="fas fa-cog"></i> <span>Обслуживание</span></a>

                    <div class="sub-item" v-if="false">
                        <ul>
                            <li>
                                <a href="#">Товар</a>
                            </li>
                            <li>
                                <a href="#">Наличные</a>
                            </li>
                            <li>
                                <a href="#">Ремонт</a>
                            </li>
                            <li>
                                <a href="#">Установка</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item with-sub" v-if="false" @click="headerMenuCollapse">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="fas fa-hdd"></i> <span>Оборудование</span>
                    </a>

                    <div class="sub-item">
                        <ul>
                            <li>
                                <a href="#" v-if="false">Группы</a>
                            </li>
                            <li>
                                <a href="#" v-if="false">Автоматы</a>
                            </li>
                            <li>
                                <router-link to="/controllers">Контроллеры</router-link>
                            </li>
                            <li>
                                <a href="#" v-if="false">Уведомления</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <!-- ------ -->

                <li class="nav-item" @click="headerMenuCollapse">
                    <router-link :class="['nav-link', isDisabled('/settings')]" to="/settings" activeClass="active" :event="isDisabled('/settings') ? '' : 'click'">
                        <i class="fas fa-sliders-h"></i> <span>Настройки</span>
                    </router-link>
                </li>
                <li class="nav-item" @click="headerMenuCollapse">
                    <router-link :class="['nav-link', isDisabled('/billing')]" to="/billing" activeClass="active" :event="isDisabled('/billing') ? '' : 'click'">
                        <i class="fas fa-money-check"></i> <span>Оплата</span>
                    </router-link>
                </li>
                <li class="nav-item" @click="headerMenuCollapse">
                    <router-link :class="['nav-link', isDisabled('/tp')]" to="/tp" activeClass="active" :event="isDisabled('/tp') ? '' : 'click'">
                        <i class="fas fa-money-check"></i> <span>Техподдержка</span>
                    </router-link>
                </li>
                <li class="nav-item" v-if="false">
                    <router-link to="/fiscal" :class="['nav-link', isDisabled('/fiscal')]" activeClass="active" :event="isDisabled('/fiscal') ? '' : 'click'"><i class="fas fa-hdd"></i> <span>Фискализация</span></router-link>
                </li>
                <li class="nav-item" v-if="isAdmin() || $store.state.auth.admin.token" @click="headerMenuCollapse">
                    <router-link to="/fiscalAll" :class="['nav-link', isDisabled('/fiscalAll')]" activeClass="active" :event="isDisabled('/fiscalAll') ? '' : 'click'"><i class="fas fa-hdd"></i> <span>Администратор</span></router-link>
                </li>
                <li class="nav-item" v-if="isPartner()" @click="headerMenuCollapse">
                    <router-link to="/partner" :class="['nav-link', isDisabled('/partner')]" activeClass="active" :event="isDisabled('/partner') ? '' : 'click'"><i class="fas fa-hdd"></i> <span>Партнерка</span></router-link>
                </li>
            </ul>
        </div>
    </div>

        <div v-if="user && !$store.state.auth.closeHelp && user.step < 7" class="centered">
            <el-row class="" style="margin-top: 30px; margin-left: 30px; margin-right: 30px; margin-bottom: 2px;" :gutter="10">

                <el-col v-for="s of steps" :span="3" :key="s.step">
                    <el-popover
                            placement="bottom-start"
                            :title="s.name"
                            width="250"
                            trigger="hover"
                            :content="s.text">
                        <div slot class="rap">
                            {{s.text}}</div>
                        <div slot="reference" class="grid-content" @click="link(s)" :class="{
                          'el-steps': (user.step >= s.step),
                          'el-steps-not': (user.step < s.step),
                          'link': (s.step === (user.step+1))

                        }"

                        >

                            <el-container>
                                <el-main :class="{
                                  'not': (user.step < s.step)
                                }">
                                    <p style="margin: 0">Шаг {{s.step}}</p>
                                    <p style="margin: 0">{{s.name}}</p>
                                </el-main>
                            </el-container>
                        </div>
                    </el-popover>



                </el-col>

            </el-row>
            <div style="text-align: center"><a href="#" @click.prevent="closeHelp">Скрыть подсказки</a></div>
        </div>
      <div class="ren-navbar" style="background-color: red; text-align: center" v-if="!isAdmin() && $store.state.auth.admin.token">Режим администратора. Вы в профиле пользователя!</div>
    </div>
</template>

<script>

    import gql from 'graphql-tag';

    import News from '@/components/News';
    export default {
        name: 'Navbar',
      components: {
        News
      },

        apollo: {
            user: {
                query: gql`
                    query {
                        user: getProfile {
                                step
                                newInfoId
                                billing {
                                       balance,

                                       }
                                      }
                    }
                `,

                update(data){
                 if(data && data.user && data.user.newInfoId) {
                   this.data = data.user.newInfoId
                 }
                 return data.user
                },
                pollInterval: 10000
            }
        },

        data: () => ({
          data: null,
            steps: [
              {
                step: 0,
                name: "Регистрация",
                text: "Регистрация в системе iVend пройдена успешно. Для начала работы выполните пожалуйста все шаги быстрого старта",
                link: ""
              },
              {
                step: 1,
                name: "Реквизиты",
                text: "Заполните все реквизиты вашей компании, данный пункт обязателен для полноценной работы сервиса",
                link: "/settings#company"
              },
              {
                step: 2,
                name: "Контроллеры",
                text: "Зарегистрируйте ваши контроллеры в системе по их номеру на обратной стороне",
                link: "/settings"
              },
              {
                step: 3,
                name: "Автоматы",
                text: "Создайте ваши торговые автоматы и привяжите к ним подключенное оборудование",
                link: "/settings#machines"
              },
              {
                step: 4,
                name: "Товары",
                text: "Добавьте для ваших автоматов товары или услуги, без них не будет работать статистика и фискализация",
                link: "/settings#machines",
                query: { to: 'items' }
              },
              {
                step: 5,
                name: "Уведомления",
                text: "Настройте уведомления, которые вы будете получать при различных событиях",
                link: "/settings#notifications",

              },
              {
                step: 6,
                name: "Оплата",
                text: "Пополните баланс вашего личного кабинета и держите баланс всегда положительным",
                link: "/billing#services"
              },
              {
                step: 7,
                name: "Кассы",
                text: "При необходимости фискализации продаж, добавьте онлайн кассу и включите фискальный режим",
                link: "/settings#fiscal"
              },
            ],
            user: {
                step: 7,
                billing: {
                    balance: 1
                }
            },
            role: null
        }),
      mounted(){
        let myCollapse = document.getElementById('headerMenuCollapse')
        this.bsCollapse = new bootstrap.Collapse(myCollapse, {
          toggle: false
        })
        this.interval = setInterval(()=>{
          if(document.documentElement.clientWidth > 992 && this.bsCollapse._element.clientHeight === 0){

            this.bsCollapse.show()
          }
        }, 3000)


        // this.interval2 = setInterval(()=>{
        //
        //   if(this.user && this.user.newInfoId){
        //
        //     this.data = this.user.newInfoId
        //     $('#ModalNewsPopup').modal("show")
        //     clearInterval(this.interval2)
        //   }
        //
        // }, 3000)


      },
      beforeDestroy() {
          if(this.interval){
            clearInterval(this.interval)
          }
          // if(this.interval2){
          //   clearInterval(this.interval2)
          // }
      },
      watch: {
          async data(newVal, oldVal){
            if(!newVal) return
            if(newVal === oldVal) return
            await this.$nextTick()
            $('#ModalNewsPopup').modal("show")
          }
      },
      computed: {

      },
        methods: {
          clearNewsData(){
            this.data = null
          },
          headerMenuCollapse(){



            if(document.documentElement.clientWidth <= 992) {
              this.bsCollapse.toggle()
            }
          },
            link(data){
              if(data.step === (this.user.step +1)){
                this.$router.push({ path: data.link, query: data.query})
                if(this.$route.path === '/settings'){
                  window.location.reload()
                }
              }
            },
            closeHelp(){
              this.$store.state.auth.closeHelp = true
            },
            isDisabled (link) {
                if(Number(this.user?.billing?.balance) < -100 && this.$store.state.user?.profile?.role !== "ADMIN"){
                    this.role = 'VENDOR_NEGATIVE_BALANCE'
                    if(!['/billing', '/settings', '/tp', '/confirm'].includes(link)){
                        this.$router.push('/billing')
                    }
                }else{
                    this.role = this.$store.state.user?.profile?.role;
                }
                const role = this.role

                switch (role) {
                    case 'VENDOR_NEGATIVE_BALANCE': return !['/billing', '/settings', '/tp'].includes(link)  && 'disabled';
                    case 'VENDOR_NO_LEGAL_INFO': return !['/billing', '/settings', '/tp'].includes(link) && 'disabled';

                    case 'VENDOR_NOT_CONFIRMED': return true && 'disabled';
                    case 'VENDOR':
                    default:
                        return false;
                }
            },
            isAdmin () {
                if (this.$store.state.user?.profile?.role == 'ADMIN'){
                    return true;
                }
                return false;
            },
            isPartner () {
                if (this.$store.state.user?.profile?.role == 'PARTNER'){
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav-link.disabled {
        color: #666666;
        cursor: not-allowed;

        &:hover, &:focus {
            background: transparent;
            color: #666666;
        }
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;

    }
    .el-steps {
        border: #06dabf 1px solid;
        color: #333;
        text-align: center;

    }
    .el-steps-not {
        border: #da0d06 1px solid;
        color: #333;
        text-align: center;

    }
    p.step {
        margin-left: auto;
        margin-right: auto
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 60px;
    }
    .link {
        cursor: pointer;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-main {

        border-radius: 4px;
        background-color: #e6f1e1;
        color: #2b2b2b;
        text-align: center;
        line-height: 30px;
        padding: 0;
    }
    .el-main.not {

        border-radius: 4px;
        background-color: #f1e7e7;
        color: #950000;
        text-align: center;
        line-height: 30px;
        padding: 0;
    }
    .rap {

            overflow-wrap: normal;  /* не поддерживает IE, Firefox; является копией word-wrap */
            word-wrap: normal;
            word-break: normal;  /* не поддерживает Opera12.14, значение keep-all не поддерживается IE, Chrome */
            line-break: auto;  /* нет поддержки для русского языка */
            hyphens: manual;  /* значение auto не поддерживается Chrome */

    }
    .centered {
        width: 1265px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }
    @media (max-width: 1280px) {
        .centered {
            width: 1030px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
        }
    }
    @media (max-width: 1000px) {
        .centered {
            display: none;
        }
    }
</style>
