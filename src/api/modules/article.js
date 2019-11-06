import { http } from '@/axios'
const url = 'article'
export default {
  // 添加文章类别
  add: ({ tagId, ...rest }) =>
    http.post(`/${url}/add`, {
      tagId: tagId.join(','),
      ...rest
    }),
  // 获取文章列表
  list: ({ page, tagId, size, ...rest }) =>
    http.post(`/${url}/list/${page}/${size}`, {
      tagId: tagId.join(','),
      ...rest
    }),
  // 查询文章详情
  search: id => http.get(`/${url}/search/${id}`),
  // 更新文章数据
  update: ({ tagId, ...rest }) => http.put(`/${url}/update`, {
    tagId: tagId.join(','),
    ...rest
  }),
  // 改变文章状态/
  changeStatus: _ => http.put(`/${url}/update`, _),
  // 删除文章类别
  del: id => http.delete(`/${url}/del/${id}`)
}
