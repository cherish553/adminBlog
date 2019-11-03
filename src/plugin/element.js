import {
  Pagination, Tag, MessageBox, Row,
  Card, Form, FormItem, Input, Message, Button, Container, Header, Dropdown, DropdownMenu, DropdownItem, Popover, Aside, Menu, MenuItem, Main, Col, Select, Cascader, Table, TableColumn, Footer, Dialog, Loading, Option
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  install (Vue) {
    Vue.prototype.$confirm = MessageBox
    Vue.prototype.$message = Message
    Vue.use(Pagination)
      .use(Card)
      .use(Form)
      .use(Row)
      .use(FormItem)
      .use(Input)
      .use(Button)
      .use(Container)
      .use(Header)
      .use(Dropdown)
      .use(DropdownMenu)
      .use(DropdownItem)
      .use(Popover)
      .use(Aside)
      .use(Menu)
      .use(MenuItem)
      .use(Main)
      .use(Col)
      .use(Select)
      .use(Cascader)
      .use(Table)
      .use(TableColumn)
      .use(Footer)
      .use(Dialog)
      .use(Option)
      .use(Tag)
      .use(Loading.directive)
  }
}
