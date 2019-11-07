<template>
  <div class="data-grid flex flex-dir-column">
    <div v-if="btns || search" class="grid-header">
      <el-form
        v-if="search"
        v-show="searchPanelShow"
        :inline="true"
        :model="formData"
        :rules="rules"
        :show-message="false"
        onsubmit="return false;"
        class="search-form"
      >
        <el-form-item
          v-for="item in search.fields"
          :key="item.key"
          :label="item.text"
        >
          <div
            v-if="item.title"
          >
            <label class="title">{{ item.title }}</label>
            <el-input
              v-if="item.type == 'text'"
              v-model="formData[item.key]"
              size="small"
              :placeholder="item.placeholder || ''"
            />
            <el-date-picker
              v-else-if="item.type == 'date'"
              v-model="formData[item.key]"
              size="small"
              placeholder="选择日期"
            />
            <el-date-picker
              v-else-if="item.type == 'dateRange'"
              v-model="formData[item.key]"
              size="small"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              placeholder="选择日期"
            />
            <template v-else-if="item.type == 'multiple-text'">
              <el-input
                v-model="formData[item.field1]"
                size="small"
                :placeholder="item.placeholder || ''"
                class="multiple-text"
              />
              <span class="multiple-text-space">-</span>
              <el-input
                v-model="formData[item.field2]"
                size="small"
                :placeholder="item.placeholder || ''"
                class="multiple-text"
              />
            </template>
            <el-select
              v-else-if="item.type == 'select'"
              v-model="formData[item.key]"
              size="small"
              :placeholder="item.placeholder"
            >
              <el-option
                v-for="option in item.list"
                :key="option.text"
                :label="option.text"
                :value="option.value"
              />
            </el-select>
            <el-cascader
              v-else-if="item.type == 'area'"
              filterable
              :change-on-select="true"
              size="small"
              :options="item.list"
              clearable
              @change="onCascaderChange"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            v-for="btn in search.btns"
            :key="btn.text"
            size="small"
            :type="btn.className"
            :native-type="btn.type || 'button'"
            @click="onSubmit"
          >{{ btn.text }}</el-button>
        </el-form-item>
      </el-form>
      <div v-if="btns" class="grid-btns clearfix">
        <template v-if="btns">
          <div v-for="(btn, i) in btns" :key="i">
            <a
              v-if="btn.link"
              :href="btn.link"
              :target="btn.target || '_blank'"
              :class="btn.className"
            >{{ btn.text }}</a>
            <button
              v-else
              :class="btn.className"
              @click="btn.action(selected, formData)"
            >{{ btn.text }}</button>
          </div>
        </template>
        <div v-if="search" class="search-ctl clearfix">
          <a v-if="search" class="pull-right" @click="searchToggle">
            <i class="fa fa-search" />
            {{ search.btns[0].text }}
            <i
              :class="'fa fa-angle-double-' + (searchPanelShow ? 'up' : 'down')"
            />
          </a>
        </div>
      </div>
      <el-table
        :data="gridData"
        class="grid-table"
        :row-style="rowRender"
        :empty-text="emptyText"
        @selection-change="onSelectionChange"
      >
        <el-table-column v-if="index" type="index" :width="indexWidth" />
        <el-table-column v-if="checkbox" type="selection" width="46" />
        <el-table-column
          v-for="(column) in columns"
          :key="column.title"
          :label="column.title"
          :width="column.width || 'auto'"
          :sortable="column.sortable"
        >
          <template slot-scope="scope">
            <span
              v-if="treegrid && column.tree"
            >
              <span
                v-for="(item, ii) in scope.row['_deep']"
                :key="ii"
                class="treegrid-indent"
              /></span>
            <span
              v-if="treegrid && column.tree && scope.row['_childs']"
              :class="
                'treegrid-expander fa ' +
                  (scope.row._expanded ? 'fa-caret-down' : 'fa-caret-right')
              "
              @click="toggle(scope.$index)"
            />
            <span v-else-if="treegrid && column.tree" class="treegrid-indent" />
            <template v-if="column.btns && column.btns.length > 0">
              <span
                v-if="
                  typeof btn.state == 'function' ? btn.state(scope.row) : true
                "
              >

                <button
                  v-for="(btn, iii) in column.btns"
                  :key="iii"
                  :class="btn.className"
                  @click="btn.action(scope.row)"
                >{{ btn.text }}</button></span>
            </template>
            <template v-else-if="column.type == 'link'">
              <router-link
                :to="column.render(scope.row[column.key], scope.row)"
              >{{ scope.row[column.key] || "" }}</router-link>
            </template>

            <template v-else-if="column.type == 'img'">
              <span class="list-img">
                <img :src="scope.row[column.key]">
              </span>
            </template>
            <template v-else-if="column.type == 'link-button'">
              <router-link
                :to="column.render(scope.row[column.key], scope.row)"
                class="btn btn-primary btn-xs btn-block"
              >
                <i v-if="column.icon" :class="column.icon" />
                {{ column.value }}
              </router-link>
            </template>
            <template v-else-if="typeof column.render == 'function'">
              <span v-html="column.render(scope.row[column.key], scope.row)" />
            </template>
            <template v-else>{{ scope.row[column.key] || "-" }}</template>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="pagination && paginationData.dataCount"
        class="grid-footer clearfix"
        :current-page="paginationData.currentPage"
        :page-sizes="paginationData.sizes"
        :page-size="paginationData.pageSize"
        layout="slot, sizes, prev, pager, next, jumper"
        :total="paginationData.dataCount"
        @current-change="pageChange"
        @size-change="sizeChange"
      >
        <slot>
          <span class="pull-left">
            共 {{ paginationData.dataCount }} 条，每页显示
            {{ paginationData.pageSize }} 条，当前页
            {{ paginationData.currentPage }}/{{ paginationData.pagesCount }}
          </span>
        </slot>
      </el-pagination>
    </div>
  </div></template>

<script>
// import mixin from 'utils/mixin'

export default {
  name: 'DataGrid',
  // mixins: [mixin],
  props: {
    api: {
      type: String,
      default: ''
    },
    method: {
      type: String,
      default: 'get'
    },
    requestdata: {
      type: Object,
      default: () => { }
    },
    index: {
      type: Boolean,
      default: false
    },
    indexWidth: {
      type: Number,
      default: 70
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    treegrid: {
      type: Object,
      default: () => { }
    },
    search: {
      type: Object,
      default: () => { }
    },
    btns: {
      type: Object,
      default: () => { }
    },
    pagination: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    rowFilter: {
      type: Function,
      default: null
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    init: {
      type: Function,
      default: null
    }
  },
  data() {
    const formData = {}
    const rules = {}
    this.search.fields && this.search.fields.forEach(function(v) {
      if (v.key) {
        formData[v.key] = v.value || ''
      }

      if (v.type === 'area') {
        formData.provinceId = ''
        formData.cityId = ''
        formData.regionId = ''
      }

      if (v.rules) {
        rules[v.key] = v.rules
      }
    })
    return {
      responseData: {},
      dataSource: [],
      selected: [],
      formData: formData,
      rules: rules,
      searchPanelShow: this.search ? this.search.show : false,
      searchData: Object.assign({
        btns: [{
          type: 'submit',
          text: '搜索',
          className: 'btn btn-primary'
        }]
      }, this.search),
      treeGridData: Object.assign({
        expanded: true,
        idKey: 'id',
        parentIdKey: 'parent_id'
      }, this.treegrid),
      paginationData: Object.assign({
        currentPage: 1,
        pageSize: 10,
        sizes: [10, 20, 25, 30]
      }, this.pagination)
    }
  },
  computed: {
    formatFormData() {
      const formData = {}
      Object.keys(this.formData).forEach(v => {
        if (v && this.formData[v].getYear) {
          formData[v] = this.$tool.dateFormat(this.formData[v], 'yyyy-MM-dd')
        }
        if (v === 'dateRange') {
          formData['beginDate'] = this.formData[v][0] ? this.$tool.dateFormat(this.formData[v][0], 'yyyy-MM-dd') : ''
          formData['endDate'] = this.formData[v][1] ? this.$tool.dateFormat(this.formData[v][1], 'yyyy-MM-dd') : ''
        } else {
          formData[v] = typeof this.formData[v] === 'string' ? decodeURI(this.formData[v]) : this.formData[v]
        }
      })
      return formData
    },
    gridData() {
      if (this.treegrid) {
        const data = this.treeGridDataFormat()
        return data
      }
      return this.dataSource
    }
  },
  watch: {
    api(v, old) {
      if (v) {
        this.requestListData()
      }
    }
  },
  created() {
    this.requestListData()
  },
  methods: {
    onCascaderChange(v) {
      this.formData.provinceId = v[0] || ''
      this.formData.cityId = v[1] || ''
      this.formData.regionId = v[2] || ''
    },
    pageChange(num) {
      this.paginationData.currentPage = num
      this.requestListData()
    },
    sizeChange(num) {
      this.paginationData.pageSize = num
      // this.paginationData.currentPage == 1 && this.requestListData()
      // 每一页改变当前显示条数需要重新请求数据
      this.requestListData()
    },
    treeGridDataFormat(parentId = 0, deep = -1) {
      let result = []
      let childs
      deep++
      this.dataSource.forEach((v) => {
        if (v[this.treeGridData.parentIdKey] === parentId) {
          v._deep = deep
          result.push(v)

          childs = this.treeGridDataFormat(v[this.treeGridData.idKey], deep)
          if (childs.length > 0) {
            result[result.length - 1]._expanded = this.treeGridData.expanded
            result[result.length - 1]._childs = true
            result[result.length - 1].childs = childs

            result = result.concat(childs)
          }
        }
      })
      return result
    },
    treeGridDataFormatChilds(parentId = 0, filter) {
      const result = []
      let childs
      this.dataSource.forEach((v) => {
        if (filter && !filter(v)) {
          return
        }

        if (v[this.treeGridData.parentIdKey] === parentId) {
          childs = this.treeGridDataFormat(v[this.treeGridData.idKey])
          if (childs.length > 0) {
            v.childs = childs
          }
          result.push(v)
        }
      })
      return result
    },
    setData(data) {
      this.dataSource = data.filter((v) => {
        if (this.treegrid) {
          v._expanded = false
        }

        if (this.rowFilter) {
          return this.rowFilter(v)
        }
        return true
      })
    },
    getData(filter) {
      return this.treegrid ? this.treeGridDataFormatChilds(0, filter) : this.gridData.map(filter)
    },
    toggle(index) {
      this.gridData[index]._expanded = !this.gridData[index]._expanded
    },
    searchToggle() {
      this.searchPanelShow = !this.searchPanelShow
    },
    getParentData(id) {
      for (let i = 0; i < this.gridData.length; i++) {
        if (this.gridData[i][this.treeGridData.idKey] === id) {
          return this.gridData[i]
        }
      }
    },
    rowRender(row, index) {
      const parent = this.getParentData(row[this.treeGridData.parentIdKey])
      if (parent && !parent._expanded) {
        return 'display:none'
      }
      return ''
    },
    onSelectionChange(v) {
      this.selected = v
    },
    onSubmit() {
      if (this.paginationData.currentPage === 1) {
        this.requestListData()
      } else {
        this.paginationData.currentPage = 1
      }
    },
    requestListData() {
      if (!this.api) {
        return
      }
      let query = JSON.parse(JSON.stringify(this.$route.query))
      /* 去除参数中的time和token */
      Object.keys(query).length && Object.keys(query).map((val) => {
        if (val === 'time') {
          delete query.time
        } else if (val === 'token') {
          delete query.token
        }
      })
      query = Object.assign(query, this.requestdata)
      query = Object.assign(query, this.formatFormData)
      query.body = JSON.parse(JSON.stringify(query)) // 入参格式兼容
      if (this.pagination) {
        query.pageIndex = this.paginationData.currentPage
        query.pageSize = this.paginationData.pageSize
      }
      this.request({
        url: this.api,
        dataType: 'json',
        data: query
      }).then(res => {
        if (res) {
          if (this.init && this.dataSource.length === 0) {
            setTimeout(() => {
              this.init()
            })
          }
          this.responseData = res.body
          this.setData(res.body.list)
          if (this.pagination) {
            this.paginationData.pagesCount = res.body.pageCount || res.body.pages
            this.paginationData.dataCount = res.body.dataCount || res.body.total
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.data-grid {
  .search-form {
    .el-select,
    .el-input {
      width: 250px;
    }
    .el-button {
      padding-top: 8px;
      padding-bottom: 8px;
    }
    .multiple-text {
      width: 140px;
    }
    .multiple-text-space {
      width: 20px;
      text-align: center;
      display: inline-block;
    }
    .el-form-item__content {
      display: flex;
      .title {
        display: inline-block;
        width: 80px;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
  .list-img {
    display: inline-block;
    padding: 10px 0;
    text-align: center;
    width: 100%;
    margin: 0 auto;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .el-table__body-wrapper {
    overflow-x: hidden;
  }
  .grid-header {
    min-height: 34px;
    padding-right: 70px;
    position: relative;
  }
  .search-ctl {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
