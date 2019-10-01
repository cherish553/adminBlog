
import cherishTable from './cherishTable'
import cherishPagination from './cherishPagination'
import cherishDialog from './cherishDialog'
const cherish = {
  install (Vue) {
    Vue.component('cherishTable', cherishTable)
    Vue.component('cherishPagination', cherishPagination)
    Vue.component('cherishDialog', cherishDialog)
  }
}
export default cherish
