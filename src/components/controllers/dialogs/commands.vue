<template>



<div>
  <div class="modal fade" id="ModalCommandAdd" tabindex="-1" data-backdrop="static"   role="dialog" aria-labelledby="ModalCommandAdd" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>Добавление произвольной команды</span>
          </h5>


        </div>
        <div class="modal-body">
         <div>
            <div class="form-group">
              <label class="form-label f-b">Номер команды</label>
              <input class="form-control" value="" type="number" v-model="com.id" placeholder="A"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Значение 1</label>
              <input class="form-control" value="" type="number" v-model="com.p1" placeholder="0"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Значение 2</label>
              <input class="form-control" value="" type="number" v-model="com.p2" placeholder="0"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Значение 3</label>
              <input class="form-control" value="" type="number" v-model="com.p3" placeholder="0"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Значение 4</label>
              <input class="form-control" value="" type="number" v-model="com.p4" placeholder="0"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Значение 5</label>
              <input class="form-control" value="" type="number" v-model="com.p5" placeholder="0"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Значение 6</label>
              <input class="form-control" value="" type="number" v-model="com.p6" placeholder="0"/>
            </div>
            <div class="form-group">
              <label class="form-label f-b">Значение 7</label>
              <input class="form-control" value="" type="number" v-model="com.p7" placeholder="0"/>
            </div>
          </div>



        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal"  @click.prevent="">Закрыть</button>
          <button type="button" class="btn btn-primary" @click.prevent="addCommand()" data-dismiss="modal">Сохранить</button>
        </div>
      </div>
    </div>
  </div>


</div>

</template>

<script>
export default {
  name: "commands",
  props: ["commands"],
  data: ()=>({
    com: {
      id: 0,
      p1: undefined,
      p2: undefined,
      p3: undefined,
      p4: undefined,
      p5: undefined,
      p6: undefined,
      p7: undefined,
    }
  }),
  computed: {

  },
  methods: {
    addCommand(){
      const comResult = JSON.parse(JSON.stringify(this.com))
      this.commands.push(comResult)
      this.com = {
        id: 0,
        p1: undefined,
        p2: undefined,
        p3: undefined,
        p4: undefined,
        p5: undefined,
        p6: undefined,
        p7: undefined,
      }
    }
  },

  watch: {
  },
}
</script>

<style scoped>

</style>