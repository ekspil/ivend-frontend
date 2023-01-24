<template>



<div v-if="data && data.controller">
  <div class="modal fade" id="ModalSettingsController" tabindex="-1" data-backdrop="static"   role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="data.controller.mode === 'ps_m_D'">Настройки режима контроллера PULSE</span>
            <span v-if="data.controller.mode === 'mech'">Настройки режима контроллера MECHANIC</span>
          </h5>




        </div>



          <div class="modal-body">
            <div class="form-group">

              <input class=""  type="checkbox" v-model="data.controller.autoSetUp" /><label class="f-b ml-2"> - автоматическая настройка</label>
            </div>
            <div v-if="data.controller.mode === 'ps_m_D'">
            <div class="form-group">
              <label class="form-label f-b">Цена импульса линии 1 (монетник, синий провод)</label>
              <input class="form-control" value="" type="number" v-model="pulse.a" placeholder="A"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Цена импульса линии 2 (купюрник, зеленый провод)</label>
              <input class="form-control" value="" type="number" v-model="pulse.b" placeholder="B"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Цена импульса линии 3 (безнал, коричневый провод)</label>
              <input class="form-control" value="" type="number" v-model="pulse.c" placeholder="C"/>
            </div>
          </div>
          <div v-if="data.controller.mode === 'mech'">



            <div class="form-group">
              <label class="form-label f-b">Цена 1</label>
              <input class="form-control" value="" type="number" v-model="pulse.a" placeholder="A"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Цена 2</label>
              <input class="form-control" value="" type="number" v-model="pulse.b" placeholder="B"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Цена 3</label>
              <input class="form-control" value="" type="number" v-model="pulse.c" placeholder="C"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Цена 4</label>
              <input class="form-control" value="" type="number" v-model="pulse.d" placeholder="D"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Цена 5</label>
              <input class="form-control" value="" type="number" v-model="pulse.e" placeholder="E"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Цена 6</label>
              <input class="form-control" value="" type="number" v-model="pulse.f" placeholder="F"/>
            </div>
          </div>



        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal"  @click.prevent="pulseBack(true, true, true, false, false, true, true, true)">Закрыть</button>
          <button type="button" class="btn btn-primary" @click.prevent="" data-dismiss="modal">Сохранить</button>
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" id="ModalSettingsTerminal" tabindex="-1" data-backdrop="static"   role="dialog" aria-labelledby="exampleModalLabelModalSettingsTerminal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabelModalSettingsTerminal">Настройки режима терминала</h5>

        </div>
        <div class="modal-body" >

          <div class="form-group" v-if="isVendistaIntegrated">
            <label class="form-label f-b">Номер терминала</label>
            <input class="form-control" value="" type="text" v-model="data.controller.bankTerminalUid" placeholder=""/>
          </div>

          <div class="form-group">
            <label class="form-label f-b">Сумма на терминале по умолчанию  <span class="text-red" v-if="!(Number(pulse.t) % Number(pulse.o) === 0)">Проверьте кратность чисел!</span></label>
            <input class="form-control" value="" type="number" v-model="pulse.t" placeholder="O"/>
          </div>
          <div class="form-group">
            <label class="form-label f-b">Цена выходного импульса (безнал, желтый провод)</label>
            <input class="form-control" value="" type="number" v-model="pulse.o" placeholder="T"/>
          </div>


        </div>
        <div class="modal-footer" >
          <button type="button" class="btn btn-secondary" data-dismiss="modal"   @click.prevent="pulseBack(false, false, false, true, true)">Закрыть</button>
          <button type="button" class="btn btn-primary" @click.prevent="" data-dismiss="modal" :disabled="!(Number(pulse.t) % Number(pulse.o) === 0)">Сохранить</button>
        </div>
      </div>
    </div>
  </div>

</div>

</template>

<script>
export default {
  name: "pulse",
  props: ["pulse", "data", "isVendistaIntegrated"],
  computed: {

  },
  methods: {
    pulseBack(a,b,c,o,t,d,e,f){
      if(a){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.a = this.data.controller.pulse.a
        if(this.data && this.data.controller && this.data.controller.mech) this.pulse.a = this.data.controller.mech.a
      }
      if(b){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.b = this.data.controller.pulse.b
        if(this.data && this.data.controller && this.data.controller.mech) this.pulse.b = this.data.controller.mech.b
      }
      if(c){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.c = this.data.controller.pulse.c
        if(this.data && this.data.controller && this.data.controller.mech) this.pulse.c = this.data.controller.mech.c
      }
      if(d){
        if(this.data && this.data.controller && this.data.controller.mech) this.pulse.d = this.data.controller.mech.d
      }
      if(e){
        if(this.data && this.data.controller && this.data.controller.mech) this.pulse.e = this.data.controller.mech.e
      }
      if(f){
        if(this.data && this.data.controller && this.data.controller.mech) this.pulse.f = this.data.controller.mech.f
      }
      if(o){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.o = this.data.controller.pulse.o
      }
      if(t){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.t = this.data.controller.pulse.t
      }
    },
  },

  watch: {
    pulse: {
      handler(newValue, oldValue) {
        if (this.data.controller.mode === 'ps_m_D') {
          if (Number(newValue.a) > 1000) this.pulse.a = 1000
          if (Number(newValue.b) > 1000) this.pulse.b = 1000
          if (Number(newValue.c) > 1000) this.pulse.c = 1000
          if (Number(newValue.o) > 1000) this.pulse.o = 1000
          if (Number(newValue.t) > 10000) this.pulse.t = 10000
          if (Number(newValue.a) < 0) this.pulse.a = 0
          if (Number(newValue.b) < 0) this.pulse.b = 0
          if (Number(newValue.c) < 0) this.pulse.c = 0
          if (Number(newValue.o) < 0) this.pulse.o = 0
          if (Number(newValue.t) < 0) this.pulse.t = 0
        }
        if (this.data.controller.mode === 'mech') {
          if (Number(newValue.a) > 10000) this.pulse.a = 10000
          if (Number(newValue.b) > 10000) this.pulse.b = 10000
          if (Number(newValue.c) > 10000) this.pulse.c = 10000
          if (Number(newValue.d) > 10000) this.pulse.d = 10000
          if (Number(newValue.e) > 10000) this.pulse.e = 10000
          if (Number(newValue.f) > 10000) this.pulse.f = 10000
          if (Number(newValue.o) > 10000) this.pulse.o = 10000
          if (Number(newValue.t) > 10000) this.pulse.t = 10000
          if (Number(newValue.a) < 0) this.pulse.a = 0
          if (Number(newValue.b) < 0) this.pulse.b = 0
          if (Number(newValue.c) < 0) this.pulse.c = 0
          if (Number(newValue.d) < 0) this.pulse.d = 0
          if (Number(newValue.e) < 0) this.pulse.e = 0
          if (Number(newValue.f) < 0) this.pulse.f = 0
          if (Number(newValue.o) < 0) this.pulse.o = 0
          if (Number(newValue.t) < 0) this.pulse.t = 0
        }
      },
      deep: true

    }
  },
}
</script>

<style scoped>

</style>