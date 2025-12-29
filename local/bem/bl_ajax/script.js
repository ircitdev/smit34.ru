jQuery(document).ready(function($){



//TODO бестолковая надстройка над $.ajax. почти не уменьшает колво параметров. только что тип запроса и тип данных не приходится заполнять
window.ajax_request = function ajax_request(params){


  var qdata = params.qdata;
  var task = params.task;
  var handlerUrl = params.handlerUrl;

  console.log(qdata);
  var d = $.Deferred();
  var data = { qdata:qdata, ajax:2, task:task };
  console.log('data:',data);
  //console.log('ajax_request url', window.lifelook_globals.path+'/index.php');
  $.ajax({
    url:handlerUrl,
    type:"POST",
    dataType: "html",
    data: data
  })
      .done(function(data){
        d.resolve(data);

        //$("#save2db").html('Сохранено в бд')
        //console.log("server:",data)

      })
      .fail(function(jqXHR, textStatus, errorThrown){
        var requestResponse = {
          httpStatus: jqXHR.status,
          error: errorThrown || jqXHR.statusText
        };
        //console.log("error:",requestResponse);
      })
      .always(function(){});
  return d.promise();


};



})