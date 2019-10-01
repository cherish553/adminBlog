import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Icon,
  MenuItem,
  Menu,
  Submenu,
  MenuItemGroup,
  Col,
  Button, Input, Row,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Form,
  FormItem,
  Message,
  MessageBox,
  Loading,
  Cascader,
  Popover,
  Card,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  install (Vue) {
    Vue.use(Container)
      .use(Header)
      .use(Aside)
      .use(Main)
      .use(Footer)
      .use(Icon)
      .use(Cascader)
      .use(Popover)
      .use(Menu)
      .use(Submenu)
      .use(MenuItem)
      .use(MenuItemGroup)
      .use(Col)
      .use(Button)
      .use(Input)
      .use(Row)
      .use(Table)
      .use(TableColumn)
      .use(Pagination)
      .use(Dialog)
      .use(Form)
      .use(FormItem)
      .use(Card)
      .use(Dropdown)
      .use(DropdownMenu)
      .use(DropdownItem)
      .use(Loading.directive)
    Vue.prototype.$message = Message
    Vue.prototype.$confirm = MessageBox.confirm
  }
}
