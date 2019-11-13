module.exports = {
  deploy: {
    production: {
      user: 'root',
      host: '49.232.58.207',
      port: 22,
      ref: 'origin/master',
      repo: 'https://github.com/cherish553/adminBlog.git',
      path: '/root/blob/adminBlog',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'yarn && yarn build'
    }
  }
}
