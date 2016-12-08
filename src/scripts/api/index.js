export default {
  getListByPageNo (pageNo,cb) {
    $.ajax({
      url: 'http://localhost:3001/getListByPageNo.json',
      dataType: 'json',
      success: function(response) {
        console.log(response);
        cb && cb(response);
      },
      error: function() {
      }
    });
  },
  getHeaderText (cb) {
    setTimeout(function (){
      cb && cb({ text: "修改了测试Header 文本内容" });
       
    },2000);
  }
}