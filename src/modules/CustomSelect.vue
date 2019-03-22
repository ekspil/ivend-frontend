<template>
  <div class="custom-select-wrapper">
    <div class="input-wrapper">
      <input v-if="inputShown" type="text" :class="['custom-input', className]" v-model="value"/>
      <img src="/assets/images/icons/cancel.svg" alt="Return" @click="toggleInput"/>
    </div>
    <select :class="['custom-select', className]" v-if="!inputShown" v-model="value">
      <option v-for="option in options" :key="option.id" :value="option.name">
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
    }
  },
  created () {
    this.value = this.initialValue;
  }
}
</script>

<style scoped lang="scss">

</style>
