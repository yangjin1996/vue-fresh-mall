module.exports = {
  //解决跨域问题
  devServer:{
    host:'localhost',
    port:8088,
    proxy:{
      '^/api':{
          target:"http://api.4yue.top/index.php/",
          changeOrigin:true,
          pathRewrite:{
              '^/api':'/app'
          }
      } 
   }
  }
}