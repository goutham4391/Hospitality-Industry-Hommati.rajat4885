function _defineProperty(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}var disableLoginPopup=1,prfheardAboutSpokeToAPerson="1",prfheardAboutfranchiseCode=["2","3","4"],prfheardAboutfranchiseCode1=["12"],prfheardAboutReferredByAgent="5",prfheardAboutGiftCard="7",prfheardAboutRoundRobin=["6","8","9","10","11"],prfpageSource="",prfheardAboutHommati="",showPricings=!1,showPricingsOf=0;function agent_show_loading(){$(".as_agent_block").showLoading()}function agent_hide_loading(){$(".as_agent_block").hideLoading()}function RestrictSpace(){if(32==event.keyCode)return!1}function pricing_submit_agent_details(){var e;$("#as_agent_role-required").text("Role is required."),$("#as_heard_about_hommati-required").text("This field is required."),$("#as_heard_about_hommati_2-required").text("This field is required."),$("#as_agent_first_name-required").text("First Name is required."),$("#as_agent_last_name-required").text("Last Name is required."),$("#as_agent_email-required").text("Email is required."),$("#as_agent_state-required").text("State is required."),$("#as_agent_county-required").text("County is required."),$("#as_agent_franchise_code-required").text("Franchise Code is required."),$("#as_heard_about_hommati_2-required").css("display","none");var a=!0;$(".as_agent_required").each((function(e){var t=$(this).attr("name");$("#as_"+t).is(":visible")&&(""==$(this).val()?($("#as_"+t+"-required").css("display","block"),a=!1):$("#as_"+t+"-required").css("display","none"))}));var t=$("#as_agent_email").val();/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(t)||""==t||($("#as_agent_email-required").text("Email is not valid."),$("#as_agent_email-required").css("display","block"),a=!1),document.getElementById("as_agent_role").checked||document.getElementById("as_broker_role").checked||($("#as_agent_role-required").css("display","block"),a=!1);var o="",r=document.getElementById("as_agent_franchise_code");if(r)o=r.value;var n=(_defineProperty(e={agent_role:$("input[name=as_agent_role]:checked").val(),agent_email:$("#as_agent_email").val(),agent_first_name:$("#as_agent_first_name").val(),agent_last_name:$("#as_agent_last_name").val()},"agent_email",$("#as_agent_email").val()),_defineProperty(e,"agent_state",$("#as_agent_state").val()),_defineProperty(e,"agent_county",$("#as_agent_county").val()),_defineProperty(e,"agent_is_logged_in_data",$("#as_agent_is_logged_in_data").val()),_defineProperty(e,"type",type),_defineProperty(e,"franchise_code",o),_defineProperty(e,"is_price_sheet_request",is_price_sheet_request),_defineProperty(e,"is_charter_agent",!1),_defineProperty(e,"agent_state_text",$("#as_agent_state option:selected").text()),_defineProperty(e,"flag",a),_defineProperty(e,"isGiftCard",!1),_defineProperty(e,"source",prfpageSource),_defineProperty(e,"agent_service_page",!0),_defineProperty(e,"show_pricings",showPricings),_defineProperty(e,"show_pricings_of",showPricingsOf),e),i=$("#as_heard_about_hommati").val(),s=$("#as_heard_about_hommati_2 .selected_rep").attr("data-frcode");i==prfheardAboutSpokeToAPerson?("other"==s?s=$("#as_representative_name").val():(s=$("#as_heard_about_hommati_2 .selected_rep").text(),n.franchise_code=$("#as_heard_about_hommati_2 .selected_rep").attr("data-frcode")),""!=s&&null!=s||($(".heard_about_hommati_2_wrapper").css("display","inline-block"),$("#as_heard_about_hommati_2-required").css("display","block"),n.flag=!1)):-1!==prfheardAboutRoundRobin.indexOf(i)?s="":-1!==prfheardAboutfranchiseCode.indexOf(i)||-1!==prfheardAboutfranchiseCode1.indexOf(i)?(""!=(s=$("#as_franchise_code").val())&&null!=s||($(".heard_about_hommati_2_wrapper").css("display","inline-block"),$("#as_heard_about_hommati_2-required").css("display","block"),n.flag=!1),n.franchise_code=s):i==prfheardAboutReferredByAgent?""!=(s=$("#as_agent_referred").val())&&null!=s||($(".heard_about_hommati_2_wrapper").css("display","inline-block"),$("#as_heard_about_hommati_2-required").css("display","block"),n.flag=!1):i==prfheardAboutGiftCard&&($("#as_heard_about_hommati_2-required").css("display","none"),n.heard_about_hommati=$("#as_heard_about_hommati option:selected").text(),n.heard_about_hommati_2=$("#as_first_number").val(),""!=(s=$("#as_first_number").val())&&null!=s||($(".heard_about_hommati_2_wrapper").css("display","inline-block"),$("#as_heard_about_hommati_2-required").css("display","block"),n.flag=!1),n.isGiftCard=!0,activateCard(n)),n.isGiftCard||(i=$("#as_heard_about_hommati option:selected").text(),n.heard_about_hommati=i,n.heard_about_hommati_2=s,continueEnrollment(n))}function showSecondDropdown(e){if(prfheardAboutHommati=e,$(".heard_about_hommati_2").css("display","none"),$(".heard_about_hommati_2_wrapper").css("display","none"),prfpageSource="real-estate-agent",prfheardAboutHommati==prfheardAboutSpokeToAPerson)$(".heard_about_hommati_2_wrapper").css("display","inline-block"),$(".heard_about_hommati_2:first-child").css("display","inline-block");else if(-1!==prfheardAboutfranchiseCode.indexOf(prfheardAboutHommati)){$(".heard_about_hommati_2_wrapper").css("display","inline-block"),$(".heard_about_hommati_2:nth-child(2)").css("display","inline-block"),$(".heard_about_hommati_2:nth-child(2) span.heard_about_hommati_2_text").text("Please enter the three digit number or promo code on the postcard, email or social media post. The three digit number can also be found at the end of the landing page URL such as: hommati.com/office/000")}else if(-1!==prfheardAboutfranchiseCode1.indexOf(prfheardAboutHommati)){$(".heard_about_hommati_2_wrapper").css("display","inline-block"),$(".heard_about_hommati_2:nth-child(2)").css("display","inline-block"),$(".heard_about_hommati_2:nth-child(2) span.heard_about_hommati_2_text").text("Please enter the three digit number or promo code on the postcard, email, social media post, brochure or flyer.  The three digit number can also be found at the end of the landing page URL such as hommati.com/office/000")}else prfheardAboutHommati==prfheardAboutReferredByAgent?($(".heard_about_hommati_2_wrapper").css("display","inline-block"),$(".heard_about_hommati_2:nth-child(3)").css("display","inline-block")):prfheardAboutHommati==prfheardAboutGiftCard&&($(".heard_about_hommati_2_wrapper").css("display","inline-block"),$(".heard_about_hommati_2:nth-child(4)").css("display","inline-block"))}function continueEnrollment(e){$("#as_agent_franchise_code").length&&$("#as_agent_franchise_code").val(),1==e.flag&&(agent_show_loading(),$.ajax({url:agent_services_pricing,type:"post",data:e,dataType:"json",success:function(e){1==e.status?(e.msg&&showSuccessToast(e.message),$("#as_price_section").html(e.html),$("#pricing_section_modal").modal("hide")):(null!=e.focus&&1==e.focus&&($(".heard_about_hommati_2_wrapper").css("display","inline-block"),$(".heard_about_hommati_2:nth-child(2)").css("display","inline-block"),$(".heard_about_hommati_2_selected").val("Code: "),$("#as_franchise_code").val(""),$("#as_franchise_code").focus()),showErrorToast(e.message),$("#as_agent_enrollment_submit_btn").attr("disabled",!1)),agent_hide_loading()},error:function(){agent_hide_loading(),showErrorToast("Something Went Wrong.")}}))}$(document).ready((function(){$("#as_agent_state").select2({dropdownParent:$("#pricing_section_modal")}),$("#as_agent_county").select2({dropdownParent:$("#pricing_section_modal")}),$("#as_agent_state").change((function(){""!=$("#as_agent_state").val()?(agent_show_loading(),$.ajax({url:web_url+"ajax/county-find",type:"post",data:{state_id:$("#as_agent_state").val()},dataType:"json",success:function(e){agent_hide_loading(),$("#as_agent_county").html(e.county_options)},error:function(){agent_hide_loading(),showErrorToast("Something Went Wrong.")}})):$("#as_agent_county").html('<option value="">County</option>')}))})),$(document).on("click",".gift-card-image img",(function(){$("#as_gift-image").attr("src",$(this).attr("src")),$("#as_gift_image_modal").modal("show")})),$(document).ready((function(){function e(a,t){if(a.className)return a.className.split(" ").indexOf(t)>=0||a.parentNode&&e(a.parentNode,t)}$(".as_agent_required").keyup((function(e){13==e.keyCode&&pricing_submit_agent_details()})),$("#as_agent_county").change((function(){agent_show_loading();var e=$("#as_agent_state").val(),a=$("#as_agent_county").val();$.ajax({url:web_url+"ajax/franchise-by-state-county",type:"post",data:{agent_state:e,agent_county:a},dataType:"json",success:function(e){(agent_hide_loading(),e.status)?($("#as_heard_about_hommati option[value='1']").length>0||$("#as_heard_about_hommati option:first").after(new Option("Spoke to a representative of Hommati","1")),$("#as_heard_about_hommati_2").html(e.franchise_options)):("1"==$("#as_heard_about_hommati").val()&&($(".heard_about_hommati_2_wrapper").css("display","none"),$(".heard_about_hommati_2:first-child").css("display","none")),$("#as_heard_about_hommati option[value='1']").remove())},error:function(e){agent_hide_loading(),showErrorToast("Something Went Wrong.")}})})),$(document).on("click",(function(a){document.getElementById("as_heard_about_hommati_2_wrapper")&&(e(a.target,"heard_about_hommati_2_wrapper")||""!=$(".heard_about_hommati_2_selected").val()&&"inline-block"==$("#as_heard_about_hommati_2_wrapper").css("display").trim()&&($(".heard_about_hommati_2_selected").css("display","block"),$(".heard_about_hommati_2_wrapper").css("display","none")))})),$("#as_heard_about_hommati").on("change",(function(e){showSecondDropdown($(this).val()),$(".heard_about_hommati_2_selected").val(""),$("#as_franchise_code").val(""),$("#as_agent_referred").val(""),$(".heard_about_hommati_2_selected").css("display","none"),$("#as_heard_about_hommati_2 li").removeClass("selected_rep")})),$(document).on("click","#as_heard_about_hommati_2 li",(function(e){var a=$(this).attr("data-frcode");$("#as_heard_about_hommati_2 li").removeClass("selected_rep"),$(this).addClass("selected_rep"),"other"==a?$("#as_representative_name").css("display","inline-block"):($("#as_representative_name").css("display","none"),$(".heard_about_hommati_2_wrapper").css("display","none")),$(".heard_about_hommati_2_selected").val("Spoke to "+$("#as_heard_about_hommati_2 .selected_rep").text()),$(".heard_about_hommati_2_selected").css("display","block")})),$("#as_franchise_code,#as_agent_referred,#as_first_number,#as_second_number,#as_last_number").change((function(e){if("as_franchise_code"==$(this).attr("id")||"as_agent_referred"==$(this).attr("id"))if("as_franchise_code"==$(this).attr("id")){if(a=$(this).val(),!allfranchisees.includes(a)&&(showErrorToast("Invalid Franchise Code."),1))return $("#as_franchise_code").val(""),!1;$(".heard_about_hommati_2_selected").val("Code: "+$(this).val())}else $(".heard_about_hommati_2_selected").val("Referred by "+$(this).val());else $(".heard_about_hommati_2_selected").val("Gift Card: "+$("#as_first_number").val()+"-"+$("#as_second_number").val()+"-"+$("#as_last_number").val());var a})),$(document).on("click",".heard_about_hommati_2_selected",(function(e){setTimeout((function(){showSecondDropdown(prfheardAboutHommati)}),200)})),$("#as_agent_email").on("change",(function(){$("#as_agent_email-required").css("display","none"),agent_show_loading(),$("#as_agent_enrollment_submit_btn").prop("disabled",!0);/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#as_agent_email").val())||""==$("#as_agent_email").val()?$.ajax({url:agent_services_email,type:"post",data:{email:$("#as_agent_email").val(),last_name:$("#as_agent_last_name").val(),alias_last_name:$("#as_agent_last_name").val(),zipcode:"38001"},dataType:"json",success:function(e){agent_hide_loading(),$("#as_agent_enrollment_submit_btn").prop("disabled",!1),1==e.status?$("#as_heard_about_hommati_2_container").css("display","block"):$("#as_heard_about_hommati_2_container").css("display","none"),void 0!==e.fId&&e.fId&&(showPricings=!0,showPricingsOf=e.fId)},error:function(){agent_hide_loading(),$("#as_agent_enrollment_submit_btn").prop("disabled",!1),showErrorToast("Something Went Wrong.")}}):(agent_hide_loading(),$("#as_agent_enrollment_submit_btn").prop("disabled",!1),$("#as_agent_email-required").text("Email is not valid."),$("#as_agent_email-required").css("display","block"))})),""!=$("#as_agent_email").val()&&$("#as_agent_email").trigger("change")})),$(document).ready((function(){$("#as_agent_franchise_code").length&&document.getElementById("as_agent_franchise_code").addEventListener("input",(function(e){var a=e.target.value.replace(/\D/g,"").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);e.target.value=a[2]?""+a[1]+a[2]+(a[3]?""+a[3]:""):a[1]}))}));var cardValues=["025","050","100"];function cardInvalidError(){showErrorToast("We’re sorry, that does not seem to be a valid card number.  Please check the card and try again.")}function showGiftCardLoading(e){$(e).showLoading()}function hideGiftCardLoading(e){$(e).hideLoading()}function commonAjax(e,a,t,o,r,n){r&&showGiftCardLoading(r),$.ajax({type:"POST",url:a,data:e,success:function(e){t(e,n),r&&hideGiftCardLoading(r)},error:function(){r&&hideGiftCardLoading(r),o()}})}function activateCard(e){$("#as_first_number").val()&&$("#as_second_number").val()&&$("#as_last_number").val()?3==$("#as_first_number").val().length&&3==$("#as_second_number").val().length&&6==$("#as_last_number").val().length?commonAjax({franchise_code:$("#as_first_number").val(),card_value:$("#as_second_number").val(),card_number:$("#as_last_number").val(),source:"real-estate-agent"},checkCardUrl,cardCheckSuccess,cardCheckError,".gift-card",e):commonError("Card number is not valid, please check the card."):commonError("Please enter card number.")}function commonError(e){e?showErrorToast(e):showErrorToast("Something went wrong.")}function cardCheckSuccess(e,a){e.status?e.loggedIn?window.location.href=e.action_one:e.form_redirect?(e.action_one||e.action_two)&&$.confirm({title:e.message,content:"",buttons:{"Sign In":function(){window.location.href=e.action_one}}}):continueEnrollment(a):e.message?commonError(e.message):commonError()}function cardCheckError(e){e.message?commonError(e.message):commonError()}function download_price_list_userLogged_in(){var e=new FormData;e.append("fid_id",franchiseId),$.ajax({type:"POST",url:web_url+"ajax/save-price-list-user-logged-in",data:e,cache:!1,processData:!1,contentType:!1,beforeSend:function(){$("#as_price_section").showLoading()},success:function(e){$("#as_price_section").hideLoading(),e.status?showpricepdfdata():showErrorToast(e.message)},error:function(e){showErrorToast("Something went wrong"),$("#as_price_section").hideLoading()}})}$(document).on("keypress",".card-numbers",(function(e){return 8==e.which||0==e.which||!(e.which<48||e.which>57)})),$(document).on("keyup","#as_first_number",(function(){$(this).val().length>=$(this).prop("maxlength")&&$("#as_second_number").focus()})),$(document).on("keyup","#as_second_number",(function(e){8==e.keyCode?$(this).val()||$("#as_first_number").focus():$(this).val().length>=$(this).prop("maxlength")&&(cardValues.includes($(this).val())?$("#as_last_number").focus():(cardInvalidError(),$(this).val(""),$(this).focus()))})),$(document).on("keyup","#as_last_number",(function(e){8==e.keyCode&&($(this).val()||$("#as_second_number").focus())}));