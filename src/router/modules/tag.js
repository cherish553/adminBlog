const meta = { auth: false }
const tag = {
  path: '/tag',
  name: 'tag',
  component: () => import('@/layout'),
  meta,
  children: (pre => [
    // 门店管理
    // { path: 'shopManage', name: `${pre}shop-manage`, component: () => import('@page/tag/shopManage'), meta: { title: '门店管理' } },
    // 分类管理
    { path: 'index', name: `${pre}index`, component: () => import('@page/tag'), meta: { title: '标签类别' } }
  ])('tag-')
}
export default tag
