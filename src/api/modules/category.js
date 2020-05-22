import { http } from '@/axios'
const pre = '/category'
export default {
  // 添加文章类别
  add: data =>
    http.post(`${pre}/add`, data),
  // 获取文章列表
  list: ({ page, size, name }) =>
    http.post(`${pre}/list/${page}/${size}`, { name }),
  // 更新文章数据
  update: data => http.put(`${pre}/update`, data),
  // 删除文章类别
  del: id => http.delete(`${pre}/del/${id}`),
  // 获取所有文章类别
  all: _ => http.get(`${pre}/all`)
}
