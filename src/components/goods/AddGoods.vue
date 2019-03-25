<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-lg-10 offset-lg-1 col-md-12">
          <Validate
          class="card"
          title="Добавление товара в матрицу товаров"
          ref="form"
          formName="addGoods"
          :schema="schema"
          @onSubmit="save"
          @onSuccess="onSuccess"
          v-if="!$apollo.loading && data"
          >
          <template slot="form">
            <div class="table-responsive product-matrix-table product-matrix-table--add-rproduct">
              <table class="table card-table table-vcenter text-nowrap">
                <thead>
                  <tr>
                    <th class="">ID</th>
                    <th class="">Название товара</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="input-cel">
                      <Field type="text" formName="addGoods" name="buttonId" placeholder="Введите ID кнопки" />
                    </td>
                    <td class="input-cel">
                      <CustomSelect
                      :initialValue="item.id"
                      :options="data.goods"
                      @onSelect="onGoodSelect"
                      @onBlur="onGoodAppend"
                      @onInputToggle="disableSubmit"
                      @onSelectToggle="enableSubmit"
                      ref="goodSelect"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template slot="submit">
            <button
            type="submit"
            :class="['btn', 'btn-primary', 'ml-auto', submitDisabled && 'disabled']"
            >
            Добавить товар
          </button>
        </template>
      </Validate>

      <div class="aligned-text" v-else-if="$apollo.loading">
        Загрузка...
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import gql from 'graphql-tag';

import { propEq, find } from 'ramda';
import { convertServerError } from '@/utils';
import { required } from '@/utils/validation';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';

import CustomSelect from '@/modules/CustomSelect';

export default {
  name: 'AddGoods',
  components: {
    Validate,
    Field,
    CustomSelect
  },
  apollo: {
    data: {
      query: gql`
      query ($id: Int!) {
        getController (id: $id) {
          itemMatrix {
            id
            buttons {
              item {
                name
              }
            }
          }
        }

        getProfile {
          items {
            id,
            name
          }
        }
      }
      `,

      variables () {
        return { id: Number(this.$route.params.id) };
      },

      update (data) {
        if (data.getProfile.items.length > 0) {
          this.item.id = data.getProfile.items[0].id;
        }

        return {
          matrixId: data.getController.itemMatrix.id,
          buttons: data.getController.itemMatrix.buttons,
          goods: data.getProfile.items
        };
      }
    }
  },

  data: () => ({
    item: {
      id: 1
    },

    schema: {
      buttonId: [required]
    },

    submitDisabled: false
  }),

  methods: {
    async save () {
      if (!this.submitDisabled) {
        const cache = this.$store.getters['cache/data'];

        /* Забираем значение из CustomSelect */
        const newGoodLabel = this.$refs.goodSelect.value;
        if (typeof(newGoodLabel) === 'string') {
          this.item.id = find(propEq('name', newGoodLabel))(this.data.goods).id;
        } else {
          this.item.id = find(propEq('id', newGoodLabel))(this.data.goods).id;
        }

        try {
          const { errors } = await this.$apollo.mutate({
            mutation: gql`
            mutation addButton ($data: AddButtonToItemMatrixInput!) {
              addButtonToItemMatrix (input: $data) {
                buttons {
                  buttonId,
                  item {
                    id,
                    name
                  }
                }
              }
            }
            `,

            variables: {
              data: {
                itemMatrixId: this.data.matrixId,
                buttonId: Number(cache.buttonId),
                itemId: this.item.id
              }
            },

            update: data => data.buttons
          });
          this.$refs.form.process({ errors, success: 'Товар успешно добавлен.' });
        } catch (error) {
          this.$refs.form.showMessage('error', convertServerError(error.message));
        }
      }
    },

    onSuccess () {
      this.$router.push(`/controllers/edit/${this.$route.params.id}`);
    },

    onGoodSelect (good) {
      this.item.id = good.id;
    },
    async onGoodAppend (name) {
      this.disableSubmit();

      const isAlreadyExist = find(propEq('name', name))(this.data.goods);
      if (name && !isAlreadyExist) {
        const { data } = await this.$apollo.mutate({
          mutation: gql`
          mutation ($input: CreateItemInput!) {
            createItem(input: $input) {
              id,
              name
            }
          }
          `,
          variables: {
            input: {
              name
            }
          }
        });

        const newItem = data.createItem;
        this.data.goods.push(newItem);

        this.enableSubmit();
      }
    },

    disableSubmit () {
      this.submitDisabled = true;
    },
    enableSubmit () {
      this.submitDisabled = false;
    }
  }
}
</script>

<style scoped lang="scss">
  .input-cel div {
    min-height: 74px;
  }
</style>
