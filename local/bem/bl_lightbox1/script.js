jQuery(document).ready(function($){




  window.bl_lightbox1_show = function bl_lightbox1_show(params){
      var content = params.content;

      var lightboxHtml='<div class="bemlightbox1 animated " data-guid="">'+
          '<div class="bemlightbox1__closeBtn popup_close_btn ion-android-close " ></div>'+
          '<div class="bemlightbox1__inner " >'+

          '</div>'+
          '</div>'

      $('body').append(lightboxHtml);
      //var guid =

      $('.bemlightbox1__inner').html(content);


      // console.log('bl_tarifElem1__channels');
      $('.bemlightbox1').show();
      $('.bemlightbox1').addClass('fadeInDown');
      $('.bemlightbox1').removeClass('fadeOutUp');

  }



  $(document.body).on('click','.bemlightbox1__closeBtn',function() {
    console.log('bemlightbox1_close_btn');

    $('.bemlightbox1').addClass('fadeOutUp');
    $('.bemlightbox1').removeClass('fadeInDown');
    //$('.bemlightbox1').hide();

    $('.bemlightbox1').detach();

  })




})

//