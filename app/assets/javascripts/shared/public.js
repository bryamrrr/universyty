$(document).on("ready", function () {
  $("body").on('click', '#settings', function () {
    $(".aside-menu").toggleClass("open");
  });

  // $('#toggle-aside').on('click', function () {
  //   $("#aside").toggleClass("show");
  //   console.log('susto');
  // });
})