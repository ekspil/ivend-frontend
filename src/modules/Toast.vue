<template>
  <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 11; right: 0; bottom: 0px;">
    <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
      <div class="toast-header">
        <img src="\assets\images\icon.jpg" class="rounded mr-2" alt="" width="20px">
        <strong class="mr-auto">Ivend</strong>
        <small></small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'Toast',
		props: {
			message: String,
		},
		data: () => ({
		}),
	}
</script>

<style scoped lang="scss">

.toast {
  -ms-flex-preferred-size: 350px;
  flex-basis: 350px;
  max-width: 350px;
  font-size: .875rem;
  background-color: rgba(255, 255, 255, .85);
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, .1);
  box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .1);
  opacity: 0;
  border-radius: .25rem
}

.toast:not(:last-child) {
  margin-bottom: .75rem
}

.toast.showing {
  opacity: 1
}

.toast.show {
  display: block;
  opacity: 1
}

.toast.hide {
  display: none
}

.toast-header {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: .25rem .75rem;
  color: #6c757d;
  background-color: rgba(255, 255, 255, .85);
  background-clip: padding-box;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
  border-top-left-radius: calc(.25rem - 1px);
  border-top-right-radius: calc(.25rem - 1px)
}

.toast-body {
  padding: .75rem
}
</style>
