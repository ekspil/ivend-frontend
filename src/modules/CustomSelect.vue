<template>
  <div class="custom-select-wrapper">
    <div class="input-wrapper" v-if="inputShown">
      <input
        type="text"
        :class="['custom-input', className]"
        v-model="value"
        placeholder="Ввод"
        @blur="$emit('onBlur', value)"
      />
      <img src="/assets/images/icons/cancel.svg" alt="Return" class="close-input" @click="hideInput"/>
    </div>
    <select :class="['custom-select', className]" v-if="!inputShown" v-model="value">
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
      <option v-if="!disabledAdd" value="ADD_ANOTHER_GROUP">Добавить ещё...</option>
    </select>
  </div>
</template>

<script>
import { propEq, find } from 'ramda';

export default {
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    disabledAdd: {
      type: Boolean,
      default: () => false
    },
    className: String,
    initialValue: {
      default: ''
    }
  },
  data: () => ({
    value: '',
    inputShown: false
  }),
  watch: {
    value (newVal) {
      if (newVal === 'ADD_ANOTHER_GROUP') {
        this.showInput();
      } else if (newVal !== '') {
        this.$emit('onSelect', find(propEq('id', newVal))(this.options));
      }
    }
  },
  methods: {
    showInput () {
      this.inputShown = true;
      this.value = '';

      this.$emit('onInputToggle');
    },
    hideInput () {
      this.inputShown = false;

      const newOptionId = find(propEq('name', this.value))(this.options);
      this.value = newOptionId ? newOptionId.id : this.initialValue;

      this.$emit('onSelectToggle');
    }
  },
  created () {
    this.value = this.initialValue;
  }
}
</script>

<style scoped lang="scss">
  .custom-select-wrapper {
    .input-wrapper {
      position: relative;

      input {
        padding-right: 2em;
      }

      .close-input {
        cursor: pointer;
        position: absolute;
        top: 50%;
        right: 1em;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
      }
    }
  }
</style>
