function body_show_loading(){$("body").showLoading()}function body_hide_loading(){$("body").hideLoading()}function getParameterByName(o,a){a||(a=window.location.href),o=o.replace(/[\[\]]/g,"\\$&");var e=new RegExp("[?&]"+o+"(=([^&#]*)|&|#|$)").exec(a);return e?e[2]?decodeURIComponent(e[2].replace(/\+/g," ")):"":null}function fetchModalPopupAndShow(o,a,e){var n=o["popup-name"],d=o.params||{},s=o.force_call||!1,l="";if(!$(".modal#"+n).length||s){switch(s&&$(".modal#"+n).length&&$(".modal#"+n).remove(),n){case"login_modal":l="ajax/login-popup-modal";break;case"signin_modal":l="ajax/sign-in-modal";break;case"forgot_modal":l="ajax/forgot-password-modal";break;case"signup_modal_step_1":l="ajax/sign-up-step-1-modal";break;case"signup_modal_step_2":l="ajax/sign-up-step-2-modal";break;case"signupfb_modal":l="ajax/sign-up-fb-modal"}$("body").showLoading(),console.log(l),$.ajax({type:"GET",url:web_url+l,dataType:"json",data:d,success:function(o){console.log(o),$("body").hideLoading(),o.success?($("body").append(o.popupHtml),o.ifCCPresent&&(ifCCPresent=!0,lastFour=o.lastFour),a(),$("#"+n+" .modal-header .close").removeAttr("data-dismiss"),$("#"+n+" .modal-header .close").attr("data-bs-dismiss","modal")):showErrorToast(o.message)},error:function(){$("body").hideLoading(),showErrorToast("Something Went Wrong.")}})}else a()}function signing_model(){fetchModalPopupAndShow({"popup-name":"signin_modal"},(function(){$("#signin_modal").modal("show")}))}function dashboardopenNav(){document.getElementById("navbar_mobile").style.width="100%"}function dashboardcloseNav(){document.getElementById("navbar_mobile").style.width="0"}