$(document).on("ready", function () {
  $("body").on('click', '#settings', function () {
    $(".aside-menu").toggleClass("open");
  });
})