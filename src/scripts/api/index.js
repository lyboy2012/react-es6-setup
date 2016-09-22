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
  }
}