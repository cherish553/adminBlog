const meta = { auth: false }
const article = {
  path: '/article',
  name: 'article',
  component: () => import('@/layout'),
  meta,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: () => import('@page/article/index'), meta: { title: '文章' } }
    // { path: 'info', name: `${pre}info`, component: () => import('@page/article/info'), meta: { title: '文章' } }
  ])('article-')
}
export default article
