

//region smit34 cart -----

//window.jq = jQuery.noConflict();


jQuery(document).ready(function($){




//region functions -------


//region cookies -------------



function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}




//endregion cookies-----------


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

//region cart item add/remove -----
function addCartItem(name){

  console.log('name:',name);
  window.smit34cart.tarifs[name]={};
  var setCartJSON = JSON.stringify(window.smit34cart);
  setCookie('smit34cart', setCartJSON);

  showCartTarifs();


  popup({
      'msg':'услуга добавлена в корзину!',
      'container':'#popup_container'
  });

  console.log('smit34cart var ', window.smit34cart);
  console.log('smit34cart cookie', getCookie('smit34cart'));

}

function rmCartItem(name){
  delete window.smit34cart.tarifs[name];

  var setCartJSON = JSON.stringify(window.smit34cart);
  setCookie('smit34cart', setCartJSON);
  showCartTarifs();

    popup({
        'msg':'услуга удалена из корзины!',
        'container':'#popup_container'
    });

  console.log(window.smit34cart.tarifs);
}

function initCart(){

  //обнуляем/инициализируем куки
  var tmpcart = {
    "tarifs":{
    }
  };
  var setCartJSON = JSON.stringify(tmpcart);
  setCookie('smit34cart', setCartJSON);


  //обнуляем/инициализируем глобальную переменную
    window.smit34cart={};
    window.smit34cart.tarifs={};

  //console.log(window.smit34cart);
}

//endregion

function server_request(params){

  var data = params.data;
  var task = params.task;
  var url = 'https://smit34.ru/local/bem/bl_servicesCart1251/submit_ajax_handler.php'
//var login = ''
//var pass = ''


  var d = $.Deferred();
  var qdata = {data:data,ajax:1,task:task/*, login:login, pass:pass*/};


//alert("server_request:"+JSON.stringify(qdata));

  $.ajax({url:url,
    type:"POST",
    dataType: "html",
    data:qdata
  })
      .done(function(data){
//$.extend(elems["items"] , data);
//дописываем в клиентский массив элементов полученные с сервера данные
//а если в data не только элементы? #тид2015050714311ис
// TODO: Сделать переменную для приёма сервисных сообщений с сервера, который будет сообщать, например, о ненайденных элементах #тсозд20140911
        d.resolve(data);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        var requestResponse = {
          httpStatus: jqXHR.status,
          error: errorThrown || jqXHR.statusText,
        };
        alert("error:"+errorThrown)
        console.log("error:"+errorThrown);
      })
      .always(function(){

      });

  return d.promise();
}; //server_request(data,task)

function cartListItemHtml(params){
  serviceName = params.serviceName;
  return serviceListHtml = '<li>'+serviceName+'</li>';
};

function showCart(){
//qwe
  var cartHtml = '' +
      '<div class="servicesCart_container_outer fader animated fadeOutUp hide " style="">'+



      '<div class="servicesCart_container servicesCart_list animated vh_center_content" >' +
        // '<div class="servicesCart__closeOnBgClick"></div>'+

        '<div class="servicesCart_container__inner " >' +



             '<div class="servicesCart_list_container ">' +
              '<div class="servicesCart_list_container_inner">' +
                '<ul class="servicesCart_list_ul">'+

                '</ul>' +
                //'<div class="servicesCart_gotoPurchase" style="">Оформить заявку</div>'+
              '</div>' +
            '</div>' +


        '</div>'+
      '</div>'+


        '<div class="servicesCart_container servicesCart_purchaseForm animated fadeOutRightBig hide vh_center_content" style="">' +
        // '<div class="servicesCart__closeOnBgClick"></div>'+

        '<div class="servicesCart_container__inner">' +

             //region #тформазаказа



                '<div class = "" style="">'+


                  '<input class="servicesCart__purchaseForm_text servicesCart__purchaseForm_name" placeholder="Имя" type="text" name="name" id="name">'+
                  '<input class="servicesCart__purchaseForm_text servicesCart__purchaseForm_address" placeholder="Адрес" type="text" name="address" id="address">'+
                  '<input class="servicesCart__purchaseForm_text servicesCart__purchaseForm_phone" placeholder="Телефон" onfocus="this.value=\"\" type="text" name="phone" id="phone">'+
                  '<input class="servicesCart__purchaseForm_text servicesCart__purchaseForm_email" placeholder="Email" onfocus="this.value=\"\" type="text" name="email" id="email">'+
                  '<textarea class="servicesCart__purchaseForm_text servicesCart__purchaseForm_comment" placeholder="Комментарий" onfocus="this.value=\"\" type="text" name="email" id="comment"></textarea>'+
                  '<input class="servicesCart_purchaseSubmit" type="submit" label="отправить заявку">'+



                  '<div style="padding-left:10px;color:#aeaeae;text-align:center">' +
                  'Нажимая "отправить",<br> вы соглашаетесь ' +
                  'с условиями <a href="https://www.smit34.ru/oferta.pdf" target="_blank" >оферты</a><br>, ' +
                  '<a href="https://smit34.ru/soglasie-na-obrabotku-personalnykh-dannykh.php" target="_blank">' +
                  'соглашения на обработку персональных данных' +
                  '</a> и ' +
                    '<a href="https://smit34.ru/documents/Регламент в ред от 01-11-2017г.pdf" target="_blank">' +
                    'регламента' +
                    '</a>' +
                  '</div>'+
                  '<div class="servicesCart_purchaseBack" style="cursor:pointer;padding-bottom:20px">Вернуться в корзину</div>'+



                '</div>'+




              //endregion

          '</div>'+
        '</div>'+


      '</div>'+




      '<div class="servicesCart_showhide" style="">' +
      '<!-- svg --><img width="80%" style="position:absolute;top:50%;left:50%;margin-left:-40%;margin-top:-30%" alt="" src="/local/bem/bl_services_cart/img/cart.svg"/>'+
      '</div>';


  $(document.body).append(cartHtml);


    showCartTarifs();

  // setTimeout(function(){
  //   $('.hide').removeClass('hide');
  // },1000)


}

//отображение списка тарифов
function showCartTarifs(){
  var tarifs = window.smit34cart.tarifs;



  $('.servicesCart_list_ul').html('');

    // if(tarifs.length==0){
    //     $('.servicesCart_list_ul').append('Вы пока не добавили в корзину ни одной услуги')
    // }else{
    //     $('.servicesCart_list_container').append('' +
    //         '' +
    //         '<div class="servicesCart_gotoPurchase" style="">Оформить заявку</div>')
    // }


  for( var i in tarifs ){
    $('.servicesCart_list_ul').append(cartListItemHtml({'serviceName':i}));
  }


  if($('.servicesCart_list_ul li').length==0){



    $('.servicesCart_list_ul').append('<div style="padding:30px">Вы пока не добавили в корзину ни одной услуги'+
      '<br>Если вы затрудняетесь с выбором услуг, мы рекомендуем Вам отправить заявку на консультацию. Наши специалисты свяжутся с вами в кратчайшие сроки, расскажут о преимуществах различных предложений и помогут определить наиболее подходящие Вам варианты.</div>'
    );
    $('.servicesCart_list_container').append('<div class="servicesCart_gotoPurchase" style="text-align:center">Отправить заявку на консультацию</div>')



  }else{


      $('.servicesCart_list_container .servicesCart_gotoPurchase').detach('');
      $('.servicesCart_list_container').append('<div class="servicesCart_gotoPurchase" style="">Оформить заявку</div>')

  }

  $('.servicesCart_list_container').append('<a href="#bundles" class="servicesCart_backToSite" style="text-align:center">Вернуться к выбору услуг</a>');

}

function actualizeButtons(){

  //$('[class*=add2cartBtn_]').each(function(i){
  $('[class*=add2cartBtn]').each(function(i){


    var serviceId = $(this).attr('data-service-id');
    if(window.smit34cart.tarifs[window.alltarifs[serviceId]]!==undefined){
      console.log(serviceId);
      $('[data-service-id="'+serviceId+'"]').html('ПОДКЛЮЧЕНО');
      // $('.'+cclass).css({
      //    'background-color':'rgba(153,204,52,1)!important'
      //});
      //$('.'+cclass).style('background-color', 'rgba(153,204,52,1)', 'important');
      //$('.'+cclass).css({"background-color":"rgba(153,204,51,1)!important"});

      $('[data-service-id="'+serviceId+'"]').addClass('add2cartBtn_purchased');
      //$('.'+serviceId).addClass('add2cartBtn_purchased')

    }else{

        $('[data-service-id="'+serviceId+'"]').html('ПОДКЛЮЧИТЬ');
        // $('.'+cclass).css({
        //    'background-color':'rgba(153,204,52,1)!important'
        //});
        //$('.'+cclass).style('background-color', 'rgba(153,204,52,1)', 'important');
        $('[data-service-id="'+serviceId+'"]').removeClass('add2cartBtn_purchased')
        //$('.'+serviceId).css({"background-color":"rgba(250,203,51,1)!important"});

    }

    console.log(serviceId);
    console.log(window.smit34cart.tarifs[window.alltarifs[serviceId]]);

  })

  console.log('actualizeButtons');
  console.log('window.alltarifs', window.alltarifs);
  console.log('window.smit34cart.tarifs', window.smit34cart.tarifs);


}


function getClass(domObj){
  var classes = domObj.attr('class');
  var arClasses = classes.split(' ');
  for(var i in arClasses){
    var regex=/^add2cartBtn_.*/;
    if (regex.test(arClasses[i])){
      //console.log(arClasses[i]);
      var cclass = arClasses[i]
    }
  }
  return cclass
}


function popup(params){

    var msg = params.msg;
    var container = params.container||'body';

    var uid = guid();

    $(container).append("<div class='popup-msg ' id='"+uid+"' style=''>" + msg + "</div>");
    //$('#'+uid).fadeIn(500);
    setTimeout(function(){
      $('#'+uid).removeClass('fadeInUp');
      $('#'+uid).addClass('fadeOutUp')
      setTimeout(function(){
        $('#'+uid).remove();
      },1000)
      // $('#'+uid).fadeOut(2000, function() {
      //       $(this).remove()
      //   })
    }, 2000);
}

function popup2(params){

    var params = params||'';
    //var msg = params.msg;
    var container = params.container||'body';

    var uid = guid();

    var classes={};

    //$(container).append("" +
    //$(document.body).append('<div class="test"></div>');








    $(document.body).append('' +
        '<div class="bl_popup_fullscreen animated transition1" id="'+uid+'" style="">' +
        '<div class="bl_popup_fullscreen__fader " style="">'+
        '</div>'+
          '<div class="bl_popup_fullscreen__container">' +
          '<div class="bl_popup_fullscreen__container_inner">' +
            '<h1>Дорогие абоненты!</h1>' +
            '<br> Мы рады сообщить Вам, что мы обновили нашу тарифную сетку и расширили спектр наших услуг!' +
            '<br>Подробную информацию Вы найдете на нашем обновленном сайте!' +
            '<br>Также рады сообщить Вам, что провели масштабную модернизацию нашей сети,  ' +
            '<br>которая позволила добиться ещё более высоких показателей качества и отказоустойчивости сети и оказываемых услуг.' +


            '<br><br>Предлагаем вам ознакомиться с нашими новыми тарифами и услугами.' +
            '<br>Вы можете добавлять в корзину заинтересовавшие Вас услуги ' +
            '<br> и оставлять заявки на их подключение всего за пару кликов! ' +

            '<br><br>Благодарим Вас за то, что Вы с нами!' +
            '<br>Мы неустанно работаем над тем, чтобы наши абонеты наслаждались предоставляемыми услугами самого высокого качества по доступным ценам' +
            '<div class="bl_popup_fullscreen__procceed_btn">Перейти на сайт</div>'+
        '</div>' +
        '</div>');
    // $('#'+uid).fadeIn(500);
    // setTimeout(function(){
    //     $('#'+uid).fadeOut(2000, function() {
    //         $(this).remove()
    //     })
    // }, 2000);
}



//endregion functions ----------


//region #тинициализация --------

// tmpcart = {
// "tarifs":{
// }
// };
//
// console.log(tmpcart);
// var setCartJSON = JSON.stringify(tmpcart);
// setCookie('smit34cart', setCartJSON);


//-----------
var gotCartJSON = getCookie('smit34cart');




if(gotCartJSON == undefined){

  initCart();

}

gotCartJSON = getCookie('smit34cart');
window.smit34cart = JSON.parse(gotCartJSON);



//  console.log('add2cartBtn_');
//  $('[class*=add2cartBtn_]').each(function(i){
//    var cclass = getClass($(this));
//    console.log(cclass);
//  })
//если пихать эту перепенную в куки в джисоне, то, кука записывается не полностью, похоже у куков есть ограничение, и она его переполняет.
window.alltarifs = {

  "add2cartBtn_bundle_prostoi":"Пакеты - Простой",
  "add2cartBtn_bundle_vseVklucheno":"Пакеты - Все включено",
  "add2cartBtn_bundle_domashniy":"Пакеты - Домашний",
  "add2cartBtn_bundle_domashniy_wifi":"Пакеты - Домашний WiFi",
  "add2cartBtn_bundle_vseVklucheno_wifi":"Пакеты - Все Включено WiFi",
  "add2cartBtn_tarifs_eth_smit":"Тарифы - Проводной интернет - CмИТ",
  "add2cartBtn_tarifs_eth_dlyaTeba":"Тарифы - Проводной интернет - Для тебя",
  "add2cartBtn_tarifs_eth_bezGranic":"Тарифы - Проводной интернет - Без границ",

  "add2cartBtn_tarifs_tv_promo":"Тарифы - Цифровое ТВ - Промо",//OLD
  "add2cartBtn_tarifs_tv_bazovy":"Тарифы - Цифровое ТВ - Базовый",//OLD
  "add2cartBtn_tarifs_tv_superbazovy":"Тарифы - Цифровое ТВ - Супербазовый",//OLD

  "add2cartBtn_tarifs_tv2":"Тарифы - Цифровое ТВ - Комфорт",
  "add2cartBtn_tarifs_tv3":"Тарифы - Цифровое ТВ - Премиум",
  "add2cartBtn_tarifs_tvMax":"Тарифы - Цифровое ТВ - Все включено + Амедиатека",

  "add2cartBtn_dop_white_ip":"Доп. услуги - Выделенный IP",
  "add2cartBtn_dop_router_rent":"Доп. услуги - Аренда роутера",
  "add2cartBtn_dop_router_buy":"Доп. услуги - Покупка роутера",
  "add2cartBtn_dop_antivirus":"Доп. услуги - Антивирус",
  "add2cartBtn_dop_roditControl":"Доп. услуги - Родительский контроль",
  "add2cartBtn_dop_mediacenter":"Доп. услуги - Медиацентр",
  "add2cartBtn_tarifs_wifi_etoProsto":"Тарифы - Беспроводной интернет - Это просто",
  "add2cartBtn_tarifs_wifi_super":"Тарифы - Беспроводной интернет - Супер",

  "add2cartBtn_bundles_dop_forHome1":"Пакеты - Для Дома",
  "add2cartBtn_bundles_dop_bezopasny":"Пакеты - Безопасный",
  "add2cartBtn_bundles_dop_forHomeWifi":"Пакеты - Для Дома WiFi",
  "add2cartBtn_bundles_dop_igrovoy":"Пакеты - Игровой",
  "add2cartBtn_bundles_dop_optimalny":"Пакеты - Оптимальный",

  "add2cartBtn_dopchannels_kino":"Телевидение - Доп.каналы - Кино",
  "add2cartBtn_dopchannels_match":"Телевидение - Доп.каналы - Матч",
  "add2cartBtn_dopchannels_ourfootball":"Телевидение - Доп.каналы - Наш Футбол",
  "add2cartBtn_dopchannels_dozhd":"Телевидение - Доп.каналы - Дождь",
  "add2cartBtn_dopchannels_amediateka":"Телевидение - Доп.каналы - Амедиатека",
  "add2cartBtn_dopchannels_nochnoy":"Телевидение - Доп.каналы - Ночной",

  "add2cartBtn_tarifs_video-1":"Тарифы - Видеонаблюдение - Видео-1",
  "add2cartBtn_tarifs_video-2":"Тарифы - Видеонаблюдение - Видео-1",
  "add2cartBtn_tarifs_video-ul":"Тарифы - Видеонаблюдение - Для юридических лиц",
  "add2cartBtn_tarifs_video-tsg":"Тарифы - Видеонаблюдение - Для ТСЖ",

}


showCart();



$('[class*=add2cartBtn_]').html('ПОДКЛЮЧИТЬ');

//  $('[class*=add2cartBtn_]').css({
//    "text-align":"center",
//    "line-height":"70px",
//    "vertical-align":"middle",
//    "color":"#fff",
//    "cursor":"pointer",
//    "background-color":"rgba(250,203,51,1)"
//  });
//$('[class*=add2cartBtn_dop]').css({"line-height":"30px",});

actualizeButtons();

$('body').append("<div class='popup_container' id='popup_container' style='position: fixed; top:0; right:120px;z-index:10000'></div>");



//region 2del bl_video_tarif
// это вроде было для muse и уже не актуально

    var bl_video_tarif = '<div class="bl_video_tarif__outcon">' +
            '<div class="bl_video_tarif__innercon">' +
                '<div>Для юридических лиц</div>' +
            '</div>' +
        '</div>';



    var block1 = ''+
        '<div class="block1__outcon" style="">'+
            '<div class="block1__innercon" style="">' +
                 bl_video_tarif+
                 bl_video_tarif+
            '</div>'+
        '</div>';



    $('.container1').append(block1);

    $('.container1').height('auto');


//endregion

    // $('.bl_dop_channels').parent().css({'heght':'0px'});
    // $('.bl_rest_bundles').parent().hide();



//endregion тинициализация


//region CONTROLLER --------





$(document.body).on('click','.servicesCart__closeOnBgClick',function(event){
  $('.servicesCart_showhide').trigger('click');
})


$(document.body).on('click','.servicesCart_showhide',function(){
//alert('test');
  //$('.servicesCart_container').toggle();

  // $(".servicesCart_container").toggleClass('hide');
  // $('.servicesCart_container_outer').toggle();

  // $('.servicesCart_container_outer').

  // $('.bemlightbox1').show();
  // $(".servicesCart_container").removeClass('hide');
  // $('.servicesCart_container').toggleClass('fadeInDown');
  // $('.servicesCart_container').toggleClass('fadeOutUp');


  $(".servicesCart_container_outer").removeClass('hide');
  $('.servicesCart_container_outer').toggleClass('fadeInDownBig');
  $('.servicesCart_container_outer').toggleClass('fadeOutUp');
  $()
})

$(document.body).on('click','.servicesCart__gotoCart',function(){
  $('.servicesCart_showhide').trigger('click');
});

$(document.body).on('click','.menubtnbot_connect',function(){
    $( ".servicesCart_showhide").trigger('click');
})

$(document.body).on('click','.servicesCart_gotoPurchase',function(){
  $('.servicesCart_list').addClass('fadeOutLeftBig');

  $('.servicesCart_purchaseForm').removeClass('hide');
  $('.servicesCart_purchaseForm').removeClass('fadeOutRightBig');
  $('.servicesCart_purchaseForm').addClass('fadeInRightBig');


});

$(document.body).on('click','.servicesCart_purchaseBack',function(){
  $('.servicesCart_list').removeClass('fadeOutLeftBig');
  $('.servicesCart_list').addClass('fadeInLeftBig');
  $('.servicesCart_purchaseForm').removeClass('fadeInRightBig')
  $('.servicesCart_purchaseForm').addClass('fadeOutRightBig')
});

$(document.body).on('click','.servicesCart_purchaseSubmit',function(){

  //var qdata = JSON.stringify( window.smit34cart);
    var qdata ={
        name:$('.servicesCart__purchaseForm_name').val(),
        address:$('.servicesCart__purchaseForm_address').val(),
        phone:$('.servicesCart__purchaseForm_phone').val(),
        email:$('.servicesCart__purchaseForm_email').val(),
        comment:$('.servicesCart__purchaseForm_comment').val(),
        cart:{}
    }
    console.log('rere');
    qdata.cart = JSON.stringify( window.smit34cart)


  server_request({
    'data': qdata,
    'task':'write_request'
  })
      .done(function(data){


        console.log(data);
        var res = JSON.parse(data);
        if (res.success == 1){

          console.log('res:',res);

          popup({
            "msg":res.msg,
            "container":"#popup_container"
          });

          //$('#' + formid + ' input, #' + formid + ' select, #' + formid + ' textarea').attr('value', '');

          initCart();
          //showCart();

          $( ".servicesCart_showhide").trigger('click');
          $('.servicesCart_container').detach();
          $('.servicesCart_container_outer').detach();
          $('.servicesCart_showhide').detach();

          showCart();

          actualizeButtons();

        }
        else{

          $('body').append("<div class='status-msg ' id='status-msg-id' style='position:fixed;top:100px; background:rgba(255,255,255,0.9); color:#000;font-size:18px;padding:20px;width:80%;width:320px;left:50%; margin-left:-160px;display:none'>Произошла непредвиденная ошибка сохранения заявки. Пожалуйста, позвоните нам или напишите на email</div>");
          $('#status-msg-id').fadeIn(500);
          setTimeout(function(){
            $('#status-msg-id').fadeOut(2000, function() {
              $(this).remove()
            })
          }, 2000);

        }

      })
      .fail(function(data){
        $('body').append("<div class='status-msg' id='status-msg-id' style='position:fixed;top:100px; background:rgba(255,255,255,0.9); color:#000;font-size:18px;padding:20px;width:80%;max-width:600px;left:50%; margin-left:-160px;'>Cервер не ответил вовремя. Пожалуйта, попробуйте перезагрузить страницу и повторите попытку еще раз. Если снова не получается, пожалуйста, позвоните нам или напишите на email!</div>");
        setTimeout(function() {
          $('#status-msg-id').fadeOut(2000, function() {
            $(this).remove()
          })
        }, 2000);

      });



});

$(document.body).on('click','.servicesCart_backToSite',function(){

    $('.servicesCart_showhide').trigger('click')

});



//region Контроллер добавления в корзину услуг -------


$(document.body).on('click', '.bl_add2cartBtn', function(){
  var serviceId = $(this).attr('data-service-id');
  console.log('getClass:',serviceId);
  console.log($(this).attr('class'));

  //alert(window.alltarifs[cclass]);
  console.log(window.alltarifs[serviceId]);
  if(window.smit34cart.tarifs[window.alltarifs[serviceId]]==undefined){

    addCartItem(window.alltarifs[serviceId]);
    //$('.'+serviceId).html('ПОДКЛЮЧЕНО');
    $("[data-service-id='"+serviceId+"']").html('ПОДКЛЮЧЕНО');
    // $('.'+cclass).css({
    //   'background-color':'rgba(153,204,51,1)!important'
    // });
    //$('.'+cclass).css("cssText", "background-color:rgba(153,204,51,1)!important");
    $("[data-service-id='"+serviceId+"']").addClass('add2cartBtn_purchased');
    $( ".servicesCart_purchaseBack").trigger('click');

  }else{

    rmCartItem(window.alltarifs[serviceId]);
    $("[data-service-id='"+serviceId+"']").html('ПОДКЛЮЧИТЬ');
    // $('.'+cclass).css({
    //   'background-color':'rgba(250,203,51,1)'
    // });
    $("[data-service-id='"+serviceId+"']").removeClass('add2cartBtn_purchased');

    $( ".servicesCart_purchaseBack").trigger('click');

  }
})


//TODO $(document.body).on('click', '.bl_removeFromCartBtn', function() {})

//Беспроводной интернет - тариф "Это просто!"
//  $(document.body).on('click', '#u9230', function(){
//    if(window.smit34cart.tarifs['Беспроводной интернет - тариф "Это просто!" ']==undefined){
//      addCartItem('Беспроводной интернет - тариф "Это просто!" ');
//      $('#u9230').html('ПОДКЛЮЧЕНО');
//      $('#u9230').css({
//        'background-color':'rgba(153,204,51,1)'
//      });
//    }else{
//      rmCartItem('Беспроводной интернет - тариф "Это просто!" ');
//
//      $('#u9230').html('ПОДКЛЮЧИТЬ');
//      $('#u9230').css({
//        'background-color':'rgba(153,204,51,1)'
//      });
//    }
//
//  })

//endregion Контроллер услуг -------


//region контроллер пунктов меню

   /* $(".menubtntop_connect").click(function() {
      alert(2)
        $('html, body').animate({
            scrollTop: $(".bl_tv").offset().top
        }, 1000);
    });*/

//endregion










//endregion controller //////////////////


//region модуль корзина TODO

//endregion корзина


//region блок полноэкранная всплывашка ---------------

  //region todo
    // + сделать верстку
    // сделать показ если не кука
    // сделать запись куки при показе
    // сделать обработчик закрывашки
  //endregion

    var deps = {
      'bl_services_cart/style.css bl_popup_fullscreen':{},
      'function popup2()':{}
    }

    $(document).ready(function() {
        // if(getCookie("landingWelcomeShowed")==1){
        //
        // }else{
        //   popup2();
        // }
    })

    $(document.body).on('click','.bl_popup_fullscreen__procceed_btn',function(){
      $(".bl_popup_fullscreen").toggleClass('hide');
      setCookie('landingWelcomeShowed', 1);
    });


    //controller
//     $(document.body).ready(function(){
// //alert('test');
//         //$('.servicesCart_container').toggle();
//
//         $(".servicesCart_container").toggleClass('hide');
//
//         //alert($('.servicesCart_container_outer').length);
//         $('.servicesCart_container_outer').toggle();
//     })

//endregion всплывашка ------------





})

//
// <script
// src="https://code.jquery.com/jquery-1.12.4.min.js"
// integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
// crossorigin="anonymous"></script>
//     <script src="/local/bem/bl_services_cart/script.js?v=100" ></script>
//     <link rel="stylesheet" type="text/css" href="/local/bem/bl_services_cart/style.css?v=100">
//
//



