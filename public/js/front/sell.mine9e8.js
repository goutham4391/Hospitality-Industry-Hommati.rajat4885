var sell_search_manully_is_place_selected=!1,sell_search_manully_address_change="";function googleInitializeFunction(){customConsoleLog("calling the googleInitializeFunction"),"undefined"==typeof google&&(customConsoleLog("google is undefined"),setTimeout(googleInitializeFunction,100)),customConsoleLog("google is defined");var e=document.getElementById("sell_search_address"),l=new google.maps.places.Autocomplete(e,{componentRestrictions:{country:"US"}});l.addListener("place_changed",(function(){var e=l.getPlace();$("#sell_search_address").val(e.formatted_address),$("#sell-modal-address-tx").text(e.formatted_address),$("#sell_search_address").attr("title",e.formatted_address);var a="",s="",t="",o="",_="",n="",r={street_number:"short_name",route:"long_name",locality:"long_name",administrative_area_level_1:"short_name",administrative_area_level_2:"short_name",country:"long_name",postal_code:"short_name",neighborhood:"long_name"},c=!0;-1===e.formatted_address.indexOf("County")&&(c=!1);for(var i=0;i<e.address_components.length;i++){var d=e.address_components[i].types[0];if(r[d]){var g=e.address_components[i][r[d]];"neighborhood"==d&&(a=g.trim()),"administrative_area_level_1"==d&&($("#sell_search_state").val(g.trim()),s=g.trim()),"postal_code"==d&&($("#sell_search_zipcode").val(g),t=g.trim()),"administrative_area_level_2"==d&&c&&($("#sell_search_county").val(g),n=g.trim()),"locality"==d&&(o=g.trim(),_=e.address_components[i].short_name.trim(),$("#sell_search_city").val(o),$("#sell_search_city_short").val(_)),$("#sell_search_lat").val(e.geometry.location.lat().toFixed(4)),$("#sell_search_long").val(e.geometry.location.lng().toFixed(4))}}sell_search_manully_is_place_selected=!0;var u=customSearchParameters({neighborhood:a,city:o,state:s,county:n,zipcode:t,cityShort:_});u.type&&(a=u.neighborhood.trim(),$("#sell_search_city").val(u.city),$("#sell_search_city_short").val(u.cityShort),o=check_city=u.city,_=u.cityShort,$("#sell_search_state").val(u.state),s=u.state,$("#sell_search_zipcode").val(u.zipcode),t=u.zipcode,$("#sell_search_county").val(u.county),check_county=u.county),customConsoleLog("place change "+$.now()),is_sell_google_search=!0}))}function sell_agent_loading_show(){$(".sell-search-area").showLoading()}function sell_agent_loading_hide(){$(".sell-search-area").hideLoading()}function contact_sell_agent(e,l){var a=$(l).data("name");$("#agentname").text("Email "+a),$("#sell_contact_agent-agent_id").val(e),$("#sell_contact_agent_modal").modal("show")}function sell_agent_loading_show_contact(){$("#sell_contact_agent_loading").showLoading()}function sell_agent_loading_hide_contact(){$("#sell_contact_agent_loading").hideLoading()}function sell_contact_show_loading(){$("#login_sell_contact_agent_loading").showLoading()}function sell_contact_hide_loading(){$("#login_sell_contact_agent_loading").hideLoading()}function sell_fbLogin(){FB.login((function(e){e.authResponse?(sell_contact_show_loading(),sell_FbUserData(),fbLogout()):$("#status").html("User cancelled login or did not fully authorize.")}),{scope:"email"})}function sell_FbUserData(){FB.api("/me",{locale:"en_US",fields:"id,first_name,last_name,email"},(function(e){$.ajax({url:web_url+"ajax/sell-agent-facebook-register",type:"post",data:{first_name:$("#reg_sell_user_first").val(),last_name:$("#reg_sell_user_last").val(),email:$("#sell_contact_agent-email").val(),phone:$("#sell_contact_agent-phone").val(),home_id:$("#sell_contact_agent-agent_id").val(),fb_id:e.id,fb_email:e.email},dataType:"json",success:function(e){1==e.status&&showSuccessToast(e.message),1==e.logged_in&&1==e.status?setTimeout((function(){var e=web_url+"sell?";""!=$("#sell_search_address").val()&&(e=(e=e.concat("&address="+$("#sell-modal-address-tx").text())).concat("&address-title="+$("#sell-modal-address-tx").text())),""!=$("#sell_search_lat").val()&&(e=e.concat("&latitude="+$("#sell_search_lat").val())),""!=$("#sell_search_long").val()&&(e=e.concat("&longitude="+$("#sell_search_long").val())),window.location.href=e}),1500):(showErrorToast(e.message),sell_contact_hide_loading())},error:function(){sell_contact_hide_loading(),showErrorToast("Something Went Wrong.")}})}))}function processAjaxData(e,l){window.history.pushState({html:e.html,pageTitle:e.pageTitle},"",l)}$(document).ready((function(){$("#sell_search_address").keydown((function(e){sell_search_manully_address_change=$(".pac-container:visible .pac-item:first").text(),sell_search_manully_is_place_selected=!1,Iscitiesgooglesearch=!1})),$("#sell_search_address").change((function(){""==$(this).val()&&($("#sell_search_state").val(""),$("#sell_search_city_short").val(""),$("#sell_search_city").val(""),$("#sell_search_county").val(""),$("#sell_search_zipcode").val(""),$("#sell_search_lat").val(""),$("#sell_search_long").val(""),is_sell_google_search=!1),0==sell_search_manully_is_place_selected&&(customConsoleLog("manully "+$.now()),get_data_from_address(sell_search_manully_address_change,(function(e){0==sell_search_manully_is_place_selected&&(customConsoleLog("manully Response "+$.now()),1==e.status?($("#sell_search_address").val(e.address),$("#sell_search_address").attr("title",e.address),$("#sell-modal-address-tx").text(e.address),$("#sell_search_state").val(""),$("#sell_search_county").val(""),$("#sell_search_zipcode").val(""),$("#sell_search_lat").val(e.lat),$("#sell_search_long").val(e.long),$("#sell_search_city_short").val(""),$("#sell_search_city").val(""),is_sell_google_search=!0):($("#sell-modal-address-tx").text(""),$("#sell_search_state").val(""),$("#sell_search_county").val(""),$("#sell_search_zipcode").val(""),$("#sell_search_lat").val(""),$("#sell_search_long").val(""),$("#sell_search_city_short").val(""),$("#sell_search_city").val(""),is_sell_google_search=!1))})))}))})),$(document).ready(googleInitializeFunction),$(document).on("click","#sell_btn_submit",(function(){""!=$("#sell_search_address").val()?1==is_sell_google_search?(sell_agent_loading_show(),$.ajax({url:web_url+"ajax/find-near-by-sell-agents",type:"post",data:{address:$("#sell_search_address").val(),state:$("#sell_search_state").val(),county:$("#sell_search_county").val(),city:$("#sell_search_city").val(),cityshort:$("#sell_search_city_short").val(),latitude:$("#sell_search_lat").val(),longitude:$("#sell_search_long").val(),zipcode:$("#sell_search_zipcode").val()},dataType:"json",success:function(e){$(".sell-search-area").html(e.html),$("body").css("background-image",'url("")'),sell_agent_loading_hide(),e.show_login_popup&&openLoginPopup((function(){$("#login_modal").modal("show")}))},error:function(){sell_agent_loading_hide(),showErrorToast("Something Went Wrong.")}})):showErrorToast("Select address from google."):showErrorToast("Enter Address First.")})),$(document).ready((function(){var e=window.location.href.split("isuser_search=")[1],l=window.location.href,a=l.indexOf("?"),s=l.substring(a),t=l.replace(s,"");l=t,1==e&&(sell_agent_loading_show(),$.ajax({url:web_url+"ajax/find-near-by-sell-agents-redirect",type:"post",data:{address:"",state:"",county:"",latitude:"",longitude:"",zipcode:""},dataType:"json",success:function(e){$(".sell-search-area").html(e.html),$("body").css("background-image",'url("")'),sell_agent_loading_hide(),e.show_login_popup&&openLoginPopup((function(){$("#login_modal").modal("show")}))},error:function(){sell_agent_loading_hide(),showErrorToast("Something Went Wrong.")}}))})),$(document).on("click","#sell_contact_agent_submit",(function(){$("#sell_contact_agent-first_name-sell_contact_agent_required").text("First Name is required."),$("#sell_contact_agent-last_name-sell_contact_agent_required").text("Last Name is required."),$("#sell_contact_agent-email-sell_contact_agent_required").text("Email is required."),$("#sell_contact_agent-phone-sell_contact_agent_required").text("Phone Number is required.");var e=!0;$(".sell_contact_agent_required").each((function(l){var a=$(this).attr("name");""==$(this).val()?($("#"+a+"-sell_contact_agent_required").css("display","block"),e=!1):$("#"+a+"-sell_contact_agent_required").css("display","none")}));var l=$("#sell_contact_agent-email").val();/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(l)||""==l||($("#sell_contact_agent-email-sell_contact_agent_required").text("Email is not valid."),$("#sell_contact_agent-email-sell_contact_agent_required").css("display","block"),e=!1),e&&(sell_agent_loading_show_contact(),$.ajax({url:web_url+"ajax/contact-agent-sell",type:"post",data:{first_name:$("#sell_contact_agent-first_name").val(),last_name:$("#sell_contact_agent-last_name").val(),email:$("#sell_contact_agent-email").val(),phone:$("#sell_contact_agent-phone").val(),home_id:$("#sell_contact_agent-agent_id").val(),source_page:"sell"},dataType:"json",success:function(e){1==e.status?(showSuccessToast(e.message),$("#sell_contact_agent_modal").modal("hide")):showErrorToast(e.message),e.show_password_popup&&($("#lead_sell_user_modal").modal("show"),$("#lead_id").val(e.user_data.lead_id),$("#first_name").val(e.user_data.first_name),$("#last_name").val(e.user_data.last_name),$("#useremail").val(e.user_data.useremail),$("#phonenumber").val(e.user_data.phonenumber)),sell_agent_loading_hide_contact()},error:function(){sell_agent_loading_hide_contact(),showErrorToast("Something Went Wrong."),$("#sell_contact_agent_modal").modal("hide")}}))})),$(document).on("click","#sell_contact_agent_login",(function(){$("#sell_contact_agent-first_name-sell_contact_agent_required").text("First Name is required."),$("#sell_contact_agent-last_name-sell_contact_agent_required").text("Last Name is required."),$("#sell_contact_agent-email-sell_contact_agent_required").text("Email is required."),$("#sell_contact_agent-phone-sell_contact_agent_required").text("Phone Number is required.");var e=!0;$(".sell_contact_agent_required").each((function(l){var a=$(this).attr("name");""==$(this).val()?($("#"+a+"-sell_contact_agent_required").css("display","block"),e=!1):$("#"+a+"-sell_contact_agent_required").css("display","none")}));var l=$("#sell_contact_agent-email").val();/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(l)||""==l||($("#sell_contact_agent-email-sell_contact_agent_required").text("Email is not valid."),$("#sell_contact_agent-email-sell_contact_agent_required").css("display","block"),e=!1),e&&($("#sell_contact_agent_loading").showLoading(),$.ajax({url:web_url+"ajax/check-email",type:"post",data:{email:$("#sell_contact_agent-email").val(),zipcode:"38001"},dataType:"json",success:function(e){$("#sell_contact_agent_loading").hideLoading(),1==e.status?0==e.user_exist?($("#sell_contact_agent_modal").modal("hide"),$("#login_sell_user_modal").modal("show"),$(".old_user_sell_agent_code").css("display","none"),$(".new_user_sell_agent_code").css("display","block"),$(".facebook_user_sell_agent_code").css("display","none"),$("#reg_sell_user_first").val($("#sell_contact_agent-first_name").val()),$("#reg_sell_user_last").val($("#sell_contact_agent-last_name").val())):($("#sell_contact_agent_modal").modal("hide"),$("#login_sell_user_modal").modal("show"),$(".new_user_sell_agent_code").css("display","none"),$(".old_user_sell_agent_code").css("display","block"),$(".facebook_user_sell_agent_code").css("display","none")):1==e.is_fb?($("#sell_contact_agent_modal").modal("hide"),$("#login_sell_user_modal").modal("show"),$(".facebook_user_sell_agent_code").css("display","block"),$(".new_user_sell_agent_code").css("display","none"),$(".old_user_sell_agent_code").css("display","none")):showErrorToast(e.message)},error:function(){$("#sell_contact_agent_loading").hideLoading(),showErrorToast("Something Went Wrong.")}}))})),$(document).ready((function(){$("#sell_contact_agent-phone").length&&document.getElementById("sell_contact_agent-phone").addEventListener("input",(function(e){var l=e.target.value.replace(/\D/g,"").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);e.target.value=l[2]?"("+l[1]+") "+l[2]+(l[3]?"-"+l[3]:""):l[1]})),$(".sell_contact_agent_required").keyup((function(e){13==e.keyCode&&$(".sell_submit_button").trigger("click")})),$("#sell_contact_agent_modal").on("hidden.bs.modal",(function(){$(".sell_contact_agent_modal_text").text(""),$(".sell_contact_agent_required").each((function(e){}))}))})),$(document).ready((function(){$("#old_login_user-submit").on("click",(function(){$("#old_login_user_password-old_login_user-required").text("Password is required.");var e=!0;$(".old_login_user-required").each((function(l){var a=$(this).attr("name");""==$(this).val()?($("#"+a+"-old_login_user-required").css("display","block"),e=!1):$("#"+a+"-old_login_user-required").css("display","none")})),e&&(sell_contact_show_loading(),$.ajax({url:web_url+"/ajax/sell-agent-login",type:"post",data:{password:$("#old_login_user_password").val(),first_name:$("#sell_contact_agent-first_name").val(),last_name:$("#sell_contact_agent-last_name").val(),email:$("#sell_contact_agent-email").val(),phone:$("#sell_contact_agent-phone").val(),home_id:$("#sell_contact_agent-agent_id").val()},dataType:"json",success:function(e){sell_contact_hide_loading(),1==e.status?(showSuccessToast(e.message),setTimeout((function(){var e=web_url+"sell?";""!=$("#sell_search_address").val()&&(e=(e=e.concat("&address="+$("#sell-modal-address-tx").text())).concat("&address-title="+$("#sell-modal-address-tx").text())),""!=$("#sell_search_lat").val()&&(e=e.concat("&latitude="+$("#sell_search_lat").val())),""!=$("#sell_search_long").val()&&(e=e.concat("&longitude="+$("#sell_search_long").val())),window.location.href=e}),1500)):(sell_contact_hide_loading(),showErrorToast(e.message))},error:function(){sell_contact_hide_loading(),showErrorToast("Something Went Wrong.")}}))}))})),$(document).ready((function(){$("#reg_user-submit").on("click",(function(){$("#reg_sell_user_first-reg_sell-required").text("First is required."),$("#reg_sell_user_last-reg_sell-required").text("Last Name is required."),$("#reg_sell_user_password-reg_sell-required").text("Password is required."),$("#reg_sell_user_confirm_password-reg_sell-required").text("Confirm Password is required.");var e=!0;$(".reg_sell-required").each((function(l){var a=$(this).attr("name");""==$(this).val()?($("#"+a+"-reg_sell-required").css("display","block"),e=!1):$("#"+a+"-reg_sell-required").css("display","none")})),""!=$("#reg_sell_user_password").val()&&""!=$("#reg_sell_user_confirm_password").val()&&$("#reg_sell_user_password").val()!=$("#reg_sell_user_confirm_password").val()&&($("#reg_sell_user_confirm_password-reg_sell-required").text("Password and Confirm password must be same."),$("#reg_sell_user_confirm_password-reg_sell-required").css("display","block"),e=!1),e&&(sell_contact_show_loading(),$.ajax({url:web_url+"/ajax/sell-agent-reg",type:"post",data:{password:$("#reg_sell_user_confirm_password").val(),first_name:$("#reg_sell_user_first").val(),last_name:$("#reg_sell_user_last").val(),email:$("#sell_contact_agent-email").val(),phone:$("#sell_contact_agent-phone").val(),home_id:$("#sell_contact_agent-agent_id").val()},dataType:"json",success:function(e){sell_contact_hide_loading(),1==e.status?(showSuccessToast(e.message),setTimeout((function(){var e=web_url+"sell?";""!=$("#sell_search_address").val()&&(e=(e=e.concat("&address="+$("#sell-modal-address-tx").text())).concat("&address-title="+$("#sell-modal-address-tx").text())),""!=$("#sell_search_lat").val()&&(e=e.concat("&latitude="+$("#sell_search_lat").val())),""!=$("#sell_search_long").val()&&(e=e.concat("&longitude="+$("#sell_search_long").val())),window.location.href=e}),1500)):(sell_contact_hide_loading(),showErrorToast(e.message))},error:function(){sell_contact_hide_loading(),showErrorToast("Something Went Wrong.")}}))})),$("#lead_user-submit").on("click",(function(){$("#lead_sell_user_password-lead_sell-required").text("Password is required.");var e=!0;$(".lead_sell-required").each((function(l){var a=$(this).attr("name");""==$(this).val()?($("#"+a+"-lead_sell-required").css("display","block"),e=!1):$("#"+a+"-lead_sell-required").css("display","none")})),e&&($("#lead_sell_contact_agent_loading").showLoading(),$.ajax({url:web_url+"/ajax/lead_through_register",type:"post",data:{password:$("#lead_sell_user_password").val(),first_name:$("#first_name").val(),last_name:$("#last_name").val(),email:$("#useremail").val(),phone:$("#phonenumber").val(),lead_id:$("#lead_id").val()},dataType:"json",success:function(e){$("#lead_sell_contact_agent_loading").hideLoading(),1==e.status?(showSuccessToast(e.message),location.reload()):showErrorToast(e.message)},error:function(){$("#lead_sell_contact_agent_loading").hideLoading(),showErrorToast("Something Went Wrong.")}}))}))})),$(document).ready((function(){$("#login_sell_user_modal").on("hidden.bs.modal",(function(){$(".old_login_user-required").val(""),$(".old_login_user-text").text(""),$(".reg_sell-required").val(""),$(".reg_sell-text").text(""),$(".old_user_sell_agent_code").css("display","none"),$(".new_user_sell_agent_code").css("display","none")})),$(".reg_sell-required").keyup((function(e){13==e.keyCode&&$("#reg_user-submit").trigger("click")})),$(".old_login_user-required").keyup((function(e){13==e.keyCode&&$("#old_login_user-submit").trigger("click")}))})),$(document).ready((function(){processAjaxData("","/sell")}));