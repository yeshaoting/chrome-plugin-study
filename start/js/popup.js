$(document).ready(function() {
  // 换一批
  $("div.head a.refresh").click(function(event) {
    var images = $("a.thumbnail img").each(function() {
      change_img($(this));
    });

  });

  // 单独更换
  $("a.thumbnail img").click(function(event) {
    change_img($(this));
  });

  function change_img($obj) {
    var url = "https://unsplash.it/300/300/?random=" + Math.random();
    $obj.attr("src", url);
  }

});
