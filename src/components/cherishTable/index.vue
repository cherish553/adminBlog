<template>
  <div :class="autoHeight?'':'flex-1 rest'">
    <el-table
      border
      :row-class-name="tableRowClassName"
      highlight-current-row
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      ref="table"
      :data="getPage.data"
      tooltip-effect="dark"
      @select='selects'
      @selection-change="selectionChange"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
    >
      <!-- style="width: 100%" -->
      <!-- :height="height" -->
      <el-table-column :align="align" v-if="select" type="selection" width="55"></el-table-column>
      <el-table-column :align="align" v-if="index" type="index" label="序号" width="100"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="item in prop"
        :prop="item.prop"
        :label="item.label"
        :key="item.id"
        align="center"
      ></el-table-column>
      <slot />
      <el-table-column
        v-if="Object.keys(operation).length"
        align="center"
        fixed="right"
        label="操作"
        :width="operation.width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item,index) in operation.data"
            :key="index"
            :type="item.type"
            size="small"
            :icon="item.icon"
            @click="change('operation',{type:item.name,data:scope.row})"
          >{{item.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer v-if="pagination">
      <div class="w100 relative h70">
        <el-col :span="24">
          <div class="page-bottom" :style="autoHeight?'':'position: absolute'">
            <cherish-pagination @on-result-change="change" :getPage="getPage" />
          </div>
        </el-col>
      </div>
    </el-footer>
    <cherish-pagination v-if="dialog" @on-result-change="change" :getPage="getPage" />
  </div>
</template>
<script>
export default {
  name: 'cherishTable',
  data () {
    return {
      loading: true
    }
  },
  props: {
    // 是否是dialog中的table
    dialog: {
      type: Boolean,
      default: false
    },
    // 是否自动调整高度
    autoHeight: {
      type: Boolean,
      default: true
    },
    // 高度
    height: {
      type: String,
      default: ''
    },
    // 是否有操作列
    operation: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否显示分页
    pagination: {
      type: Boolean,
      default: false
    },
    // 显示所需要的字段 prop label width
    prop: {
      type: Array,
      default () {
        return []
      }
    },
    // 拿到的数据 控制分页等
    getPage: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否选择
    select: {
      type: Boolean,
      default: false
    },
    // 是否显示索引
    index: {
      type: Boolean,
      default: false
    },
    // 控制对齐方式
    align: {
      type: String,
      default: 'center'
    }
  },
  methods: {
    selects (a, b) {
      console.log(a, b)
    },
    // 单行被点击触发
    rowClick (row) {
      this.$emit('on-result-change', 'click', row)
    },
    rowDblclick (row) {
      this.$emit('on-result-change', 'dbClick')
    },
    // 控制哪一个权限是已拥有状态
    toggleSelection (rows) {
      rows.forEach(item => this.$refs.table.toggleRowSelection(item))
    },
    // 隐藏loading
    hideLoading () {
      this.loading = false
    },
    // 显示loading
    showLoading () {
      this.loading = true
    },
    // 分页回调
    change (type, data) {
      switch (type) {
        case 'page':
          this.loading = true
          return this.$emit('on-result-change', 'page', {
            page: data.page,
            size: data.size
          })
          break
        case 'operation':
          this.$emit('on-result-change', 'operation', {
            type: data.type,
            data: data.data
          })
      }
    },
    // 进入table触发
    open () {},
    // 当用户勾选触发
    selectionChange (val) {
      this.$emit('on-result-change', 'selectData', val)
    },
    // 控制每行类名切换颜色
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
