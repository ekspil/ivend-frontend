<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-lg-10 offset-lg-1 col-md-12">
          <Validate
          class="card"
          title="Изменение товара"
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
                    <th class="">Вид товара</th>
                    <th class="">Множитель</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="input-cel">
                      <Field type="text" formName="addGoods" name="buttonId" :value="data.button.buttonId" placeholder="Введите ID кнопки" disabled />
                    </td>
                    <td class="input-cel">
                      <CustomSelect
                      :initialValue="data.button.item.id"
                      :options="data.goods"
                      @onSelect="onGoodSelect"
                      @onBlur="onGoodAppend"
                      @onInputToggle="disableSubmit"
                      @onSelectToggle="enableSubmit"
                      ref="goodSelect"
                      />
                    </td>
                    <td class="input-cel">
                      <CustomSelect
                              :initialValue="type"
                              :options="types"
                              @onSelect="onTypeSelect"

                              @onInputToggle="disableSubmit"
                              @onSelectToggle="enableSubmit"
                              ref="typeSelect"
                              :disabledAdd="dis"
                      />
                    </td>
                    <td class="input-cel">
                      <Field type="text" formName="addGoods" name="multiplier" :value="data.button.multiplier || 1" placeholder="Множитель" />
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
            Сохранить
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
        getMachineById (id: $id) {
          itemMatrix {
            id
            buttons {
              buttonId,
              type,
              multiplier,
              item {
                id
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
        return { id: Number(this.$route.params.machineId) };
      },

      update (data) {
        if (data.getProfile.items.length > 0) {
          this.item.id = data.getProfile.items[0].id;
        }
        if(data.getMachineById.itemMatrix.buttons.filter(but => but.buttonId == this.$route.params.id )[0]){
          this.type = data.getMachineById.itemMatrix.buttons.filter(but => but.buttonId == this.$route.params.id )[0].type
        }

        return {
          matrixId: data.getMachineById.itemMatrix.id,
          button: data.getMachineById.itemMatrix.buttons.filter(but => but.buttonId == this.$route.params.id )[0],
          goods: data.getProfile.items
        };
      }
    }
  },

  data: () => ({
    item: {
      id: 1
    },
    dis: true,
    types: [
      {id: "commodity", name: "Товар"},
      {id: "service", name: "Услуга"},
    ],
    type: "commodity",

    schema: {
      buttonId: [required],
      multiplier: [required]
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
            mutation editButton ($data: EditButtonToItemMatrixInput!) {
              editButtonToItemMatrix (input: $data) {
                buttons {
                  buttonId,
                  multiplier,
                  type
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
                multiplier: Number(cache.multiplier),
                type: this.type,
                itemId: this.item.id
              }
            },

            update: data => data.buttons
          });
          this.$refs.form.process({ errors, success: 'Товар успешно изменен.' });
        } catch (error) {
          this.$refs.form.showMessage('error', convertServerError(error.message));
        }
      }
    },

    onSuccess () {
        const router = this.$router
        const route = this.$route

        setTimeout(function () {router.push(`/machine/edit/${route.params.machineId}#goods`);}, 1000)
    },

    onGoodSelect (good) {
      this.item.id = good.id;
    },
    onTypeSelect (good) {
      this.type = good.id;
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
