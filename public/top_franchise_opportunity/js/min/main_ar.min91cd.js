function arhomemodal(a){$("#arhomemodal").modal("show");var e=a.replace("vimeo.com","player.vimeo.com/video"),s=e.substring(0,e.lastIndexOf("/")+1),t=s.substring(0,s.lastIndexOf("/")),d=(t.substring(t.lastIndexOf("/")+1,t.length),t+"?h="+e.substring(e.lastIndexOf("/")+1,e.length));$("#arhome").attr("src",d)}function arcardmodal(a){$("#arcardmodal").modal("show");var e=a.replace("vimeo.com","player.vimeo.com/video"),s=e.substring(0,e.lastIndexOf("/")+1),t=s.substring(0,s.lastIndexOf("/")),d=(t.substring(t.lastIndexOf("/")+1,t.length),t+"?h="+e.substring(e.lastIndexOf("/")+1,e.length));$("#arcard").attr("src",d)}function curbLeadModal(a){$("#curbleadsmodal").modal("show");var e=a.replace("vimeo.com","player.vimeo.com/video"),s=e.substring(0,e.lastIndexOf("/")+1),t=s.substring(0,s.lastIndexOf("/")),d=(t.substring(t.lastIndexOf("/")+1,t.length),t+"?h="+e.substring(e.lastIndexOf("/")+1,e.length));$("#curbLead").attr("src",d)}$(document).on("click",".close-model-cls",(function(a){a.preventDefault();var e=$(this).closest(".close-model-id").attr("data-id");$("#"+e).modal("hide"),$("#"+e).find("iframe").attr("src","")})),$(document).on("hidden.bs.modal","#curbleadsmodal_main,#our_service_popup,#arhomemodal,#arcardmodal,#curbleadsmodal",(function(){var a=$(this).closest(".close-model-id").attr("data-id");$("#"+a).modal("hide"),$("#"+a).find("iframe").attr("src","")}));
