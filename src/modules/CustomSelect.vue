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
      <img src="/assets/images/icons/cancel.svg" alt="Return" class="close-input" @click="toggleInput"/>
    </div>
    <select :class="['custom-select', className]" v-if="!inputShown" v-model="value">
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.name"
        @click="$emit('onSelect', option)"
      >
        {{ option.name }}
      </option>
      <option value="own" @click="toggleInput">Добавить ещё...</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    className: String,
    initialValue: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    value: '',
    inputShown: false
  }),
  methods: {
    toggleInput () {
      this.inputShown = !this.inputShown;
      this.value = '';
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
