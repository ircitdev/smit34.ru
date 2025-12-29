jQuery(document).ready(function($) {
  $(document.body).on('click','.topmenu__mbtn',function(){

    $('.topmenu__wrap').toggleClass('topmenu__wrap-active');
    $('.topmenu__mbtn').toggleClass('topmenu__mbtn-active');

  });

  $(document.body).on('click','.topmenu__wrap a',function(){
    $('.topmenu__mbtn').trigger("click");
  });




})
