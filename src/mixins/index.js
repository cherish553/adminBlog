export const dialog = {
  methods: {
    // 点击取消
    cancel () {
      this.$refs.modal.show = false
    },
    show () {
      this.$refs.modal.show = true
    }
  }
}
