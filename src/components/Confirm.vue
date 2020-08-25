<template>
    <div class="container">
        <div class="side-app">
            <div class="page-header" v-if="isRoleNotConfirmed && !isRedirectedForConfirmationUserAction">
                <h4 class="page-title">Проверьте, пожалуйста, вашу почту и подтвердите регистрацию. (В случае, если письмо не пришло, проверьте папку "Спам")</h4>
            </div>
            <div class="page-header" v-if="isRedirectedForConfirmationUserAction">
                <h4 class="page-title" v-if="!confirmationError">Пожалуйста, подождите...</h4>
                <h4 class="page-title" v-if="confirmationError">Произошла ошибка во время потверждения аккаунта.
                    Свяжитесь с администраторами</h4>
            </div>
        </div>
    </div>
</template>

<script>
  import gql from 'graphql-tag';

  export default {
    name: 'Confirm',
    computed: {
      isRoleNotConfirmed() {
        const role = this.$store.state.user?.profile?.role
        return role === "VENDOR_NOT_CONFIRMED"
      },
      isRedirectedForConfirmationUserAction() {
        return this.$route.query.action_type
      }
    },
    data() {
      return {
        confirmationError: null
      }
    },
    mounted: async function () {
      const actionType = this.$route.query.action_type
      const token = this.$route.query.token
        if(!actionType) return

      try {
        const input = {
          token,
          type: actionType
        }

        await this.$apollo.mutate({
          mutation: gql `
                            mutation confirmUserAction($input: UserActionConfirmation!) {
                                confirmUserAction(input: $input) {
                                role
                            }
                        }
                        `,
          variables: {
            input
          }
        });

        this.$store.dispatch('user/fetch')

        setTimeout(() => this.$router.push('/home'), 1000)
      } catch (e) {
        this.confirmationError = true
      }
    },
  }
</script>
