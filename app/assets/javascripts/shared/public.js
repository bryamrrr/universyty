$(document).on("ready", function () {
  $("body").on('click', '#shopping-cart', function () {
    console.log("shopping-cart");
  });
  $("body").on('click', '#team-list', function () {
    console.log("team-list");
  });
  $("body").on('click', '#settings', function () {
    $(".aside-menu").toggleClass("open");
  });
})