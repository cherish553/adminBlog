import { http } from '@/axios'
export default {
  // 添加文章类别
  add: data =>
    http.post(`/category/add`, data),
  // 获取文章列表
  list: ({ page, size, name }) =>
    http.post(`/category/list/${page}/${size}`, { name }),
  // 更新文章数据
  update: data => http.put(`/category/update`, data),
  // 删除文章类别
  del: id => http.delete(`/category/del/${id}`),
  // 获取所有文章类别
  all: _ => http.get(`/category/all`)
}
