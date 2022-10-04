var useraction = "";
var homeid = "";
var agentid = '';
var city = "";
var state = "";
var county = "";
var zipcode = "";
var lat = "";
var long = "";
var price_from = "";
var price_to = "";
var payment_from = "";
var payment_to = "";
var beds = "";
var bath = "";
var sqft = "";
var garage = "";
var threed = "";
var aerial = "";
var radius = "";
var address = '';
var uploadImage = 0;
var contact_agent_keys = [];
var last_county_google='';

var registerUserDataObj = {};

var ifCCPresent = false;

function login_show_loading() {
    $('#login_loading').showLoading();
}

function login_hide_loading() {
    $('#login_loading').hideLoading();
}

function viewing_limit_show_loading() {
    $('#viewing_limit_loading').showLoading();
}

function viewing_limit_hide_loading() {
    $('#viewing_limit_loading').hideLoading();
}

$(document).ready(function() {
    $('#login_modal .first_step_required').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#first_submit').trigger("click");
        }
    });

    $(document).on('keyup', '#viewing_limit_modal .first_step_required', function(e) {
        if (e.keyCode == 13) {
            $('#viewing_limit_first_submit').trigger("click");
        }
    });

    $(document).on('keyup', '#viewing_limit_modal .second_step_required', function(e) {
        if (e.keyCode == 13) {
            $('#viewing_limit_second_submit').trigger("click");
        }
    });

    $(document).on('keyup', '#viewing_limit_modal .third_step_required', function(e) {
        if (e.keyCode == 13) {
            $('#viewing_limit_third_submit').trigger("click");
        }
    });

    if (localStorage.hasOwnProperty('agent_list_request')) {
        if (localStorage.getItem("agent_list_request") != null) {
            if (localStorage.getItem("agent_list_request") != 0) {
                see_home_related_agents(localStorage.getItem("agent_list_request"));
                localStorage.setItem("agent_list_request", 0);
            }
        }
    }


});

$(document).on('click', '#first_submit', function() {

    $("#login_email_first_step_required").text('Email is required.');
    $("#login_zipcode_first_step_required").text('Zip Code is required.');

    var flag = true;
    $("#login_modal .first_step_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_first_step_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_first_step_required").css('display', 'none');
        }
    });

    var email = $('#login_email').val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(email) && email != '') {
        $("#login_email_first_step_required").text('Email is not valid.');
        $("#login_email_first_step_required").css('display', 'block');
        flag = false;
    } else {
        $("#email_validation").css('display', 'none');
    }


    if (flag == true) {
        login_show_loading();
        $.ajax({
            url: web_url + 'ajax/check-email',
            type: 'post',
            data: {
                'email': $('#login_email').val(),
                'zipcode': $('#login_zipcode').val()
            },
            dataType: 'json',
            success: function(data) {
                login_hide_loading();
                if (data.status == true) {
                    $('#login_modal .first_step').css('display', 'none');
                    if (data.user_exist == false) {
                        $('#login_modal .third_step').css('display', 'block');
                    } else {
                        $('#username').text(data.user_name);
                        $('#login_modal .second_step').css('display', 'block');
                    }
                } else {
                    showErrorToast(data.message);
                }
            },
            error: function() {
                login_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
    }

});

$(document).on('click', '#viewing_limit_first_submit', function() {

    $("#viewing_limit_email_first_step_required").text('Email is required.');
    $("#viewing_limit_zipcode_first_step_required").text('Zip Code is required.');

    var flag = true;
    $("#viewing_limit_modal .first_step_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_first_step_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_first_step_required").css('display', 'none');
        }
    });

    var email = $('#viewing_limit_email').val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(email) && email != '') {
        $("#viewing_limit_email_first_step_required").text('Email is not valid.');
        $("#viewing_limit_email_first_step_required").css('display', 'block');
        flag = false;
    } else {}


    if (flag == true) {
        viewing_limit_show_loading();
        $.ajax({
            url: web_url + 'ajax/check-email',
            type: 'post',
            data: {
                'email': $('#viewing_limit_email').val(),
                'zipcode': $('#viewing_limit_zipcode').val()
            },
            dataType: 'json',
            success: function(data) {
                viewing_limit_hide_loading();
                if (data.status == true) {
                    $('#viewing_limit_modal .first_step').css('display', 'none');
                    if (data.user_exist == false) {
                        $('#viewing_limit_modal .third_step').css('display', 'block');
                    } else {
                        $('#viewing_limit_username').text(data.user_name);
                        $('#viewing_limit_modal .second_step').css('display', 'block');
                    }
                } else {
                    showErrorToast(data.message);
                }
            },
            error: function() {
                viewing_limit_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
    }
});

$(document).ready(function() {
    $('#login_modal .second_step_required').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#second_submit').trigger("click");
        }
    });
});

$(document).on('click', '#second_submit', function() {

    $('#resend_activation_login').css('display', 'none');
    $("#login_password_second_step_required").text('Password is required.');

    var flag = true;
    $("#login_modal .second_step_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_second_step_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_second_step_required").css('display', 'none');
        }
    });

    if (flag == true) {
        login_show_loading();
        $.ajax({
            url: web_url + 'ajax/login',
            type: 'post',
            data: {
                'email': $('#login_email').val(),
                'zipcode': $('#login_zipcode').val(),
                'password': $('#login_password').val(),
                'action': useraction,
                'id': homeid,
                'agent': agentid,
                'city': city,
                'state': state,
                'county': county,
                'zipcode1': zipcode,
                'lat': lat,
                'long': long,
                'price_from': price_from,
                'price_to': price_to,
                'payment_from': payment_from,
                'payment_to': payment_to,
                'address': address,
                'beds': beds,
                'bath': bath,
                'sqft': sqft,
                'garage': garage,
                'threed': threed,
                'aerial': aerial,
                'radius': radius
            },
            dataType: 'json',
            success: function(data) {
                if (data.status == true) {


                    if (useraction == 'favourite' || useraction == 'savehome') {
                        var home_type = $('.' + homeid + '_div').attr('data-home_type');
                        if (home_type != 1) {
                            localStorage.setItem("agent_list_request", homeid);
                        }
                    }

                    if (useraction == 'contact') {
                        if (agentid == 'yes') {
                            window.location.href = window.location.href + "?contact_details=1";
                            return;
                        } else {
                            localStorage.setItem("contact_agent_home_id", homeid);
                        }
                    }

                    if (useraction == 'maintenance-login') {
                        window.location.href = data.redirect_link;
                        return;
                    }

                    if(data.firsttime_login)
                    {
                        showAssistantPassword();
                        signin_hide_loading();
                        return;
                    }

                    showSuccessToast(data.message);

                    setTimeout(function() {
                        if (getParameterByName('redirect') != null) {
                            window.location.replace(getParameterByName('redirect'));
                        } else {
                            if (useraction == 'website_request') {
                                window.open(homeid, '_blank');
                            }

                            if (useraction == 'download_request') {
                                window.open(data.file_path, '_blank');

                                var home_type = $('.' + agentid + '_div').attr('data-home_type');
                                if (home_type != 1) {
                                    localStorage.setItem("agent_list_request", agentid);
                                }
                            }


                            if (useraction == 'found-contact-agent') {
                                window.location.href = window.location.href + "?want_to_contact=yes";
                            } else if (useraction == 'contact_agent_request') {
                                if (typeof find_agent_searched_address !== 'undefined') {

                                    var additional_para = web_url + 'find-an-agent?';
                                    if (find_agent_searched_address != '') {
                                        additional_para = additional_para.concat('&address=' + find_agent_searched_address);
                                        additional_para = additional_para.concat('&address-title=' + find_agent_searched_address);
                                    }

                                    if ($('#find_an_agent_search_lat').val() != '') {
                                        additional_para = additional_para.concat('&latitude=' + $('#find_an_agent_search_lat').val());
                                    }

                                    if ($('#find_an_agent_search_long').val() != '') {
                                        additional_para = additional_para.concat('&longitude=' + $('#find_an_agent_search_long').val());
                                    }

                                    window.location.href = additional_para;
                                } else {
                                    location.reload(true);
                                }
                            } else {
                                location.reload(true);
                            }
                        }
                    }, 1500);

                } else {
                    login_hide_loading();
                    showErrorToast(data.message);

                    if (data.hasOwnProperty('is_active')) {
                        $('#resend_activation_login').css('display', 'inline-block');
                    }
                }
            },
            error: function() {
                login_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
        //alert("hey "+arr);
    }

});

$(document).on('click', '#second_submit', function() {

    $('#resend_activation_login').css('display', 'none');
    $("#viewing_limit_password_second_step_required").text('Password is required.');

    var flag = true;
    $("#viewing_limit_modal .second_step_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_second_step_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_second_step_required").css('display', 'none');
        }
    });

    if (flag == true) {
        viewing_limit_show_loading();
        $.ajax({
            url: web_url + 'ajax/login',
            type: 'post',
            data: {
                'email': $('#viewing_limit_email').val(),
                'zipcode': $('#viewing_limit_zipcode').val(),
                'password': $('#viewing_limit_password').val(),
                'action': useraction,
                'id': homeid,
                'agent': agentid,
                'city': city,
                'state': state,
                'county': county,
                'zipcode1': zipcode,
                'lat': lat,
                'long': long,
                'price_from': price_from,
                'price_to': price_to,
                'payment_from': payment_from,
                'payment_to': payment_to,
                'address': address,
                'beds': beds,
                'bath': bath,
                'sqft': sqft,
                'garage': garage,
                'threed': threed,
                'aerial': aerial,
                'radius': radius
            },
            dataType: 'json',
            success: function(data) {
                if (data.status == true) {


                    if (useraction == 'favourite' || useraction == 'savehome') {
                        var home_type = $('.' + homeid + '_div').attr('data-home_type');
                        if (home_type != 1) {
                            localStorage.setItem("agent_list_request", homeid);
                        }
                    }

                    if (useraction == 'contact') {
                        if (agentid == 'yes') {
                            window.location.href = window.location.href + "?contact_details=1";
                            return;
                        } else {
                            localStorage.setItem("contact_agent_home_id", homeid);
                        }
                    }

                    if (useraction == 'maintenance-login') {
                        window.location.href = data.redirect_link;
                        return;
                    }

                    showSuccessToast(data.message);

                    setTimeout(function() {
                        if (getParameterByName('redirect') != null) {
                            window.location.replace(getParameterByName('redirect'));
                        } else {
                            if (useraction == 'website_request') {
                                window.open(homeid, '_blank');
                            }

                            if (useraction == 'download_request') {
                                window.open(data.file_path, '_blank');

                                var home_type = $('.' + agentid + '_div').attr('data-home_type');
                                if (home_type != 1) {
                                    localStorage.setItem("agent_list_request", agentid);
                                }
                            }


                            if (useraction == 'found-contact-agent') {
                                window.location.href = window.location.href + "?want_to_contact=yes";
                            } else if (useraction == 'contact_agent_request') {
                                if (typeof find_agent_searched_address !== 'undefined') {

                                    var additional_para = web_url + 'find-an-agent?';
                                    if (find_agent_searched_address != '') {
                                        additional_para = additional_para.concat('&address=' + find_agent_searched_address);
                                        additional_para = additional_para.concat('&address-title=' + find_agent_searched_address);
                                    }

                                    if ($('#find_an_agent_search_lat').val() != '') {
                                        additional_para = additional_para.concat('&latitude=' + $('#find_an_agent_search_lat').val());
                                    }

                                    if ($('#find_an_agent_search_long').val() != '') {
                                        additional_para = additional_para.concat('&longitude=' + $('#find_an_agent_search_long').val());
                                    }

                                    window.location.href = additional_para;
                                } else {
                                    location.reload(true);
                                }
                            } else {
                                location.reload(true);
                            }
                        }
                    }, 1500);

                } else {
                    viewing_limit_hide_loading();
                    showErrorToast(data.message);

                    if (data.hasOwnProperty('is_active')) {
                        $('#resend_activation_login').css('display', 'inline-block');
                    }
                }
            },
            error: function() {
                viewing_limit_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
        //alert("hey "+arr);
    }

});

$(document).ready(function() {
    $('#login_modal .third_step_required').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#third_submit').trigger("click");
        }
    });
});

var popupemail, popupfirst, popuplast, popupzip;

$(document).on('click', '#third_submit', function() {

    $("#login_first_third_step_required").text('First Name is required.');
    $("#login_last_third_step_required").text('Last Name is required.');
    $("#create_password_third_step_required").text('Create Password is required.');
    $("#confirm_password_third_step_required").text('Confirm Password is required.');

    var flag = true;
    $("#login_modal .third_step_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_third_step_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_third_step_required").css('display', 'none');
        }
    });

    // if (flag == true) {
    //     if ($('#create_password').val() != $('#confirm_password').val()) {
    //         $("#confirm_password_third_step_required").text('Password and Confirm password must be same.');
    //         $("#confirm_password_third_step_required").css('display', 'block');
    //         flag = false;
    //     }
    // }

    if (flag == true) {
        popupemail = $('#login_email').val();
        popupfirst = $('#login_first').val();
        popupzip = $('#login_zipcode').val();
        popuplast = $('#login_last').val();

        $('#login_modal').modal('hide');
        $("#login_modal_final_step").modal({
            backdrop: 'static',
            keyboard: false
        });
    }

});

$(document).on('click', '#viewing_limit_third_submit', function() {

    $("#viewing_limit_first_third_step_required").text('First Name is required.');
    $("#viewing_limit_last_third_step_required").text('Last Name is required.');

    var flag = true;
    $("#viewing_limit_modal .third_step_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_third_step_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_third_step_required").css('display', 'none');
        }
    });

    if (flag == true) {
        popupemail = $('#viewing_limit_email').val();
        popupfirst = $('#viewing_limit_first').val();
        popupzip = $('#viewing_limit_zipcode').val();
        popuplast = $('#viewing_limit_last').val();

        $('#viewing_limit_modal').modal('hide');
        $("#login_modal_final_step").modal({
            backdrop: 'static',
            keyboard: false
        });
    }

});

$(document).on('click', '#login_final_step', function() {

    $("#create_password_final_step_required").text('Create Password is required.');
    $("#confirm_password_final_step_required").text('Confirm Password is required.');

    var flag = true;
    $(".final_step_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_final_step_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_final_step_required").css('display', 'none');
        }
    });

    if (flag == true) {
        if ($('#create_password').val() != $('#confirm_password').val()) {
            $("#confirm_password_final_step_required").text('Password and Confirm password must be same.');
            $("#confirm_password_final_step_required").css('display', 'block');
            flag = false;
        }
    }

    if (flag == true) {

        $('#login_modal_final_step_modal_content').showLoading();
        $.ajax({
            url: web_url + 'ajax/register',
            type: 'post',
            data: {
                'email': popupemail,
                'zipcode': popupzip,
                'first_name': popupfirst,
                'last_name': popuplast,
                'password': $('#create_password').val(),
                'action': useraction,
                'agent': agentid,
                'id': homeid,
                'city': city,
                'state': state,
                'county': county,
                'zipcode1': zipcode,
                'lat': lat,
                'long': long,
                'price_from': price_from,
                'price_to': price_to,
                'payment_from': payment_from,
                'payment_to': payment_to,
                'address': address,
                'beds': beds,
                'bath': bath,
                'sqft': sqft,
                'garage': garage,
                'threed': threed,
                'aerial': aerial,
                'radius': radius,
                'set_temp_pass': 0
            },
            dataType: 'json',
            success: function(data) {
                $('#login_modal_final_step_modal_content').hideLoading();
                if (data.status == true) {
                    showSuccessToast(data.message);
                    $("#login_modal_final_step").modal('hide');
                    popupfirst = '';
                    popuplast = '';
                    popupzip = '';
                    popupemail = '';

                    setTimeout(function() {
                        location.reload(true);
                    }, 2000);
                } else {
                    // showErrorToast(data.message);
                    if (data['valid-phone-no']) {
                        showErrorToast(data.message);
                    } else {
                        $.alert({
                            title: '',
                            content: "The phone number you are using for your password appears to be a non-working number.  Please ensure you use your correct working phone number because we use your phone number for account recovery in case you are not able to log in.  We will never give your phone number to telemarketers.  If you do not prefer to permanently use your phone number as your password, you can change your password at any time.",
                        });
                    }
                }

            },
            error: function() {
                $('#login_modal_final_step_modal_content').hideLoading();
                showErrorToast('Something Went Wrong.');
            }
        });

    }

});

$(document).on('click', '.trigger-user-register-without-password-login', function() {

    $('body').showLoading();
    // $.alert({
    //     title: '',
    //     content: "It appears that you did not want to use your phone number for your password.  No worries, you can still enroll for free.  We have sent you an email with a link that will allow you to finish enrolling without using your phone number as a password.",
    // });
    $.ajax({
        url: web_url + 'ajax/register',
        type: 'post',
        data: {
            'email': popupemail,
            'zipcode': popupzip,
            'first_name': popupfirst,
            'last_name': popuplast,
            'password': "",
            'action': "",
            'set_temp_pass': 1,
            'action': useraction,
            'agent': agentid,
            'id': homeid,
        },
        dataType: 'json',
        success: function(data) {
            $('body').hideLoading();
            if (data.status == true) {
                $("#login_modal_final_step").modal('hide');
                $.alert({
                    title: '',
                    content: "It appears that you did not want to use your phone number for your password.  No worries, you can still enroll for free.  We have sent you an email with a link that will allow you to finish enrolling without using your phone number as a password.",
                    onClose: function() {
                        location.reload(true);
                    },
                });
                registerUserDataObj = {};

                // showSuccessToast(data.message);
            } else {
                showErrorToast(data.message);
            }
        },
        error: function() {
            $('body').hideLoading();
            showErrorToast('Something Went Wrong.');
        }
    });
});


$(document).ready(function() {
    $(document).on("hidden.bs.modal", "#login_modal", function() {
        $('#login_modal .first_step').css('display', 'block');
        $('#login_modal .second_step, #login_modal .third_step').css('display', 'none');
        $('#login_modal .login_modal_fields').val('');
        $('#login_modal .login_modal_text').text('');
        $('#resend_activation_login').css('display', 'none');
    });

    $(document).on("hidden.bs.modal", "#viewing_limit_modal", function() {
        $('#viewing_limit_modal .first_step').css('display', 'block');
        $('#viewing_limit_modal .second_step, #viewing_limit_modal .third_step').css('display', 'none');
        $('#viewing_limit_modal .viewing_limit_modal_fields').val('');
        $('#viewing_limit_modal .viewing_limit_modal_fields').text('');
        $('#viewing_limit_resend_activation_login').css('display', 'none');
    });

});


$(document).ready(function() {
    $("#login_zipcode").keypress(function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            $("#login_zipcode_first_step_required").css('display', 'block');
            $("#login_zipcode_first_step_required").text("Digits Only");
            return false;
        } else {
            $("#login_zipcode_first_step_required").css('display', 'none');
        }
    });

    $("#login_zipcode").on("paste", function() {
        setTimeout(function() {
            var txtvalue = $("#access_code").val();
            myString = txtvalue.replace(/\D/g, '');
            $("#access_code").val(myString);
        }, 100);
    });

    $("#viewing_limit_zipcode").keypress(function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            $("#viewing_limit_zipcode_first_step_required").css('display', 'block');
            $("#viewing_limit_zipcode_first_step_required").text("Digits Only");
            return false;
        } else {
            $("#viewing_limit_zipcode_first_step_required").css('display', 'none');
        }
    });

    $("#viewing_limit_zipcode").on("paste", function() {
        setTimeout(function() {
            var txtvalue = $("#access_code").val();
            myString = txtvalue.replace(/\D/g, '');
            $("#access_code").val(myString);
        }, 100);
    });
});



function user_logout() {
    body_show_loading();
    $.ajax({
        url: web_url + 'ajax/logout',
        type: 'post',
        data: {
            'email': $('#login_email').val(),
            'zipcode': $('#login_zipcode').val(),
            'first_name': $('#login_first').val(),
            'last_name': $('#login_last').val(),
            'password': $('#create_password').val()
        },
        dataType: 'json',
        success: function(data) {
            if (data.status == true) {
                setTimeout(function() {
                    window.location.replace(web_url);
                }, 500);
            } else {
                body_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        },
        error: function() {
            body_hide_loading();
            showErrorToast('Something Went Wrong.');
        }
    });
}




//Facebook

function facebook_show_loading(id) {
    $('.facebook_login' + id).showLoading();
}

function facebook_hide_loading() {
    $('.facebook_login1').hideLoading();
    $('.facebook_login2').hideLoading();
    $('.facebook_login3').hideLoading();
}


$(document).ready(function() {

    /*window.fbAsyncInit = function () {
        FB.init({
            appId: FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        });

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                getFbUserData();
                fbLogout();
            }
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));*/

    window.fbAsyncInit = function() {
        FB.init({
            appId: FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v2.10'
        });

        //FB.AppEvents.logPageView();

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                getFbUserData();
                fbLogout();
            }
        });

    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});


function fbLogin(id) {
    FB.login(function(response) {
        if (response.authResponse) {
            facebook_show_loading(id);
            getFbUserData();
            fbLogout();
        } else {
            // document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
            $('#status').html('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'email'
    });
}

function getFbUserData() {
    FB.api('/me', {
            locale: 'en_US',
            fields: 'id,first_name,last_name,email,picture.width(150).height(150)'
        },
        function(response) {
            //////console.log(response.first_name+' '+response.last_name+' '+response.id+' '+response.picture.data.url);
            $.ajax({
                url: web_url + 'ajax/facebook-register',
                type: 'post',
                data: {
                    'email': response.email,
                    'first_name': response.first_name,
                    'last_name': response.last_name,
                    'fb_id': response.id,
                    'agent': agentid,
                    'action': useraction,
                    'fb_img': response.picture.data.url
                },
                dataType: 'json',
                success: function(data) {
                    if (data.status == true) {
                        showSuccessToast(data.message);
                        $('.third_step').html('');
                    } else {
                        fetchModalPopupAndShow({
                            'popup-name': "signupfb_modal"
                        }, function() {
                            $('#signup_modal_step_1').modal('hide');
                            $('#signupfb_modal').modal('show');
                            $('#signup_firstfb').val(response.first_name);
                            $('#signup_lastfb').val(response.last_name);
                            $('#signup_userfbid').val(response.id);
                            $('#signup_userfbimg').val(response.picture.data.url);
                        });
                    }

                    if (data.logged_in == true && data.status == true) {

                        if (useraction == 'contact') {
                            if (agentid == 'yes') {
                                window.location.href = window.location.href + "?contact_details=1";
                                return;
                            } else {
                                localStorage.setItem("contact_agent_home_id", homeid);
                            }
                        }

                        setTimeout(function() {
                            if (getParameterByName('redirect') != null) {
                                window.location.replace(getParameterByName('redirect'));
                            } else {
                                if (useraction == 'website_request') {
                                    window.open(homeid, '_blank');
                                }

                                if (useraction == 'found-contact-agent') {
                                    window.location.href = window.location.href + "?want_to_contact=yes";
                                } else {
                                    location.reload(true);
                                }
                            }
                        }, 1500);
                    } else {
                        facebook_hide_loading();
                    }
                },
                error: function() {
                    facebook_hide_loading();
                    showErrorToast('Something Went Wrong.');
                }
            });
        });
}

function fbLogout() {
    FB.logout(function() {});
}
//Facebook



function open_login_popup() {
    openLoginPopup(function() {
        $('#login_modal').modal('show');
        localStorage.setItem("contact_agent_home_selection", 0);
    });
}

function open_login_popup_with_action(val, id, agent) {

    openLoginPopup(function() {
        useraction = val;
        homeid = id;
        agentid = agent;
        localStorage.setItem("contact_agent_home_selection", 0);
        $('#login_modal').modal('show');
    });

}

function open_login_with_slideshow(val, id) {

    openLoginPopup(function() {
        useraction = val;
        homeid = id;
        $('#login_modal').modal('show');
    });
}

function open_login_popup_contact_agent(val, home_id, type, listing_key) {
    openLoginPopup(function() {
        type = type || 0;
        listing_key = listing_key || 0;
        $('#lh_type').val(type);
        $('#lh_key').val(listing_key);
        useraction = val;
        homeid = home_id;
        $('#login_modal').modal('show');
    });

}


function save_search_without_login() {
    useraction = "search";
    city = $('#advance_city').val();
    state = $('#filter_search_state').val();
    county = $('#filter_search_county').val();
    zipcode = $('#filter_search_zipcode').val();
    lat = $('#filter_search_lat').val();
    long = $('#filter_search_long').val();
    price_from = $('#search_min_price').val();
    price_to = $('#search_max_price').val();

    payment_from = $('#search_min_payment').val();
    payment_to = $('#search_max_payment').val();

    beds = $('#search_beds').val();
    bath = $('#search_baths').val();
    sqft = $('#search_sqft').val();
    garage = $('#search_garage').val();
    threed = $('#search_3d').val();
    aerial = $('#select_aerial').val();
    radius = $('#search_national_radius').val();

    openLoginPopup(function() {
        localStorage.setItem("contact_agent_home_selection", 0);
    });

}

function signup_show_loading() {
    $('#signup_loading').showLoading();
}

function signup_hide_loading() {
    $('#signup_loading').hideLoading();
}

function savehome(action, home, agent) {
    if (action != "save") {
        $('#' + home).attr('onclick', "javascript:void(0);");
    } else {
        var sid = "save" + home + agent;
        $("#" + sid).attr("onclick", "javascript:void(0);");
    }
    $.ajax({
        type: "POST",
        url: web_url + 'ajax/savehome',
        data: {
            'action': action,
            'home': home,
            'agent': agent
        },
        success: function(result) {
            var home_type = $('.' + home + '_div').attr('data-home_type');
            if (action != "save") {
                if(result.limit_reached){
                    showErrorToast(result.message);
                    return;
                }
                document.getElementById(home).innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';
                $('#' + home).attr('onclick', "unfavorite_home('" + action + "','" + home + "','" + agent + "');");
            } else {
                var sid = "save" + home + agent;
                document.getElementById(sid).className += 'active';
                document.getElementById(sid).innerHTML = "Saved";
                $("#" + sid).attr("old-onclick", $("#" + sid).attr("onclick"));
                $("#" + sid).attr("onclick", "javascript:void(0);");
            }
            showSuccessToast('This property has been added to your favourites.');
            if (home_type == 2 ) {
                see_home_related_agents(home, home_type, 1);
            }

        }
    });
}

function unfavorite_home(action, home, agent) {
    $.ajax({
        type: "POST",
        url: web_url + 'ajax/unfavhome',
        data: {
            'home_id': home
        },
        success: function(result) {
            // document.getElementById(home).innerHTML=' <i class="fa fa-heart-o favourite-icon" id="hide" aria-hidden="true"></i>';
            $("#" + home).html(' <i class="fa fa-heart-o favourite-icon" id="hide" aria-hidden="true"></i>');
            $('#' + home).attr('onclick', "savehome('favourite','" + home + "','" + agent + "');");
            //alert(action+" "+home+""+agent)
            showSuccessToast('Deleted From Your Favourites List.');
        }
    });
}

function savehome1(action, home, agent) {
    if (action != "save") {
        $('#' + id).attr('onclick', "javascript:void(0);");
    } else {
        var sid = "save" + home + agent;
        $('#' + sid).attr('onclick', "javascript:void(0);");
    }
    $.ajax({
        type: "POST",
        url: web_url + 'ajax/savehome',
        data: {
            'action': action,
            'home': home,
            'agent': agent
        },
        success: function(result) {
            showSuccessToast('Your Home Added as Favourite !');
            var id = 'map' + home;

            if (action != "save") {
                document.getElementById(id).innerHTML = '<i class="fa fa-heart mapinfo-fav mapinfo-fav-fill" aria-hidden="true"></i>';

                $('#' + id).attr('onclick', "unfavorite_home1('" + action + "','" + home + "','" + agent + "');");
            } else {
                var sid = "save" + home + agent;
                document.getElementById(sid).className += 'active';
                document.getElementById(sid).innerHTML = "Saved";
            }
            var home_type = $('.' + home + '_div').attr('data-home_type');
            if (home_type != 1) {
                see_home_related_agents(home);
            }

        }
    });
}

function unfavorite_home1(action, home, agent) {
    $.ajax({
        type: "POST",
        url: web_url + 'ajax/unfavhome',
        data: {
            'home_id': home
        },
        success: function(result) {
            showSuccessToast('Your Home Deleted From Favourite List !');
            var id = 'map' + home;

            document.getElementById(id).innerHTML = ' <i class="fa fa-heart-o mapinfo-fav" id="hide" aria-hidden="true"></i>';
            $('#' + id).attr('onclick', "savehome1('favourite','" + home + "','" + agent + "');");
            //alert(action+" "+home+""+agent)
        }
    });
}

$(document).ready(function() {
    // $('#signup_modal .signup_required').keyup(function(e) {
    //     if (e.keyCode == 13) {
    //         $('#signup_submit').trigger("click");
    //     }
    // });

    $(document).on('keyup', '.custom-modal-form .required_field', function(e) {
        if (e.keyCode == 13) {
            var targetElementObj = $(e.target);
            targetElementObj.closest('.modal-content').find(".form-submit-button").trigger("click");
        }
    });
    $(document).on('click', '#signup_submit_step_1', function() {

        $("#signup_modal_step_1 #signup_first_signup_required").text('First Name is required.');
        $("#signup_modal_step_1 #signup_last_signup_required").text('Last Name is required.');
        $("#signup_modal_step_1 #signup_email_signup_required").text('Email is required.');

        var flag = true;
        $("#signup_modal_step_1 .required_field").each(function(index) {
            var idStr = $(this).attr('name');
            if ($(this).val() == "") {
                $("#signup_modal_step_1 #" + idStr + "_signup_required").css('display', 'block');
                flag = false;
            } else {
                $("#signup_modal_step_1 #" + idStr + "_signup_required").css('display', 'none');
            }
        });

        var email = $('#signup_modal_step_1 #signup_email').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


        if (!regex.test(email) && email != '') {
            $("#signup_modal_step_1 #signup_email_signup_required").text('Email is not valid.');
            $("#signup_modal_step_1 #signup_email_signup_required").css('display', 'block');
            flag = false;
        }
        if (flag == true) {
            registerUserDataObj.email = $("#signup_modal_step_1 #signup_email").val();
            registerUserDataObj.first_name = $("#signup_modal_step_1 #signup_first").val();
            registerUserDataObj.last_name = $("#signup_modal_step_1 #signup_last").val();
            body_show_loading();
            $.ajax({
                url: web_url + 'ajax/check-user-email',
                type: 'post',
                data: {
                    'user-email': registerUserDataObj.email
                },
                dataType: 'json',
                success: function(data) {
                    body_hide_loading();
                    if (data.success == true) {
                        fetchModalPopupAndShow({
                            'popup-name': "signup_modal_step_2"
                        }, function() {
                            $("#signup_modal_step_1").modal('hide');
                            $("#signup_modal_step_1").find("input:not(button):not([type='button'])").val('');
                            $("#signup_modal_step_2").modal({
                                backdrop: 'static',
                                keyboard: false
                            });
                            if(typeof agentServicePage !== 'undefined' && agentServicePage){
                                $("#signup_modal_step_2").modal('show');
                            }
                        });
                    } else {
                        showErrorToast(data.message);
                    }
                },
                error: function() {
                    body_hide_loading();
                    showErrorToast('Something Went Wrong.');
                }
            });

        }

    });

    $(document).on('click', '#sms_sigmup', function() {

        $("#sms_signup #signup_first_signup_required").text('First Name is required.');
        $("#sms_signup #signup_last_signup_required").text('Last Name is required.');
        $("#sms_signup #signup_email_signup_required").text('Email is required.');

        var flag = true;
        $("#sms_signup .required_field").each(function(index) {
            var idStr = $(this).attr('name');
            if ($(this).val() == "") {
                $("#sms_signup #" + idStr + "_signup_required").css('display', 'block');
                flag = false;
            } else {
                $("#sms_signup #" + idStr + "_signup_required").css('display', 'none');
            }
        });

        var email = $('#sms_signup #signup_email').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


        if (!regex.test(email) && email != '') {
            $("#sms_signup #signup_email_signup_required").text('Email is not valid.');
            $("#sms_signup #signup_email_signup_required").css('display', 'block');
            flag = false;
        }
        if (flag == true) {
            registerUserDataObj.email = $("#sms_signup #signup_email").val();
            registerUserDataObj.first_name = $("#sms_signup #signup_first").val();
            registerUserDataObj.last_name = $("#sms_signup #signup_last").val();
            registerUserDataObj.password = $("#sms_signup #def_sms_password").val();
            body_show_loading();
            $.ajax({
                url: web_url + 'ajax/check-user-email',
                type: 'post',
                data: {
                    'user-email': registerUserDataObj.email
                },
                dataType: 'json',
                success: function(data) {
                    if (data.success) {
                        $.ajax({
                            url: web_url + 'ajax/register',
                            type: 'post',
                            data: {
                                'email': registerUserDataObj.email,
                                'zipcode': '',
                                'first_name': registerUserDataObj.first_name,
                                'last_name': registerUserDataObj.last_name,
                                'password': registerUserDataObj.password,
                                'action': "",
                                'set_temp_pass': 0
                            },
                            dataType: 'json',
                            success: function(data) {
                                body_hide_loading();
                                if (data.status == true) {
                                    registerUserDataObj = {};
                                    showSuccessToast(data.message);
                                    $("#signup_modal_step_2").modal('hide');
                                    setTimeout(function() {
                                        // location.reload(true);
                                        window.location.href = tosingleurl;
                                    }, 2000);
                                } else {
                                    showErrorToast(data.message);
                                }
                                // else {
                                //     if(data['valid-phone-no']){
                                //         showErrorToast(data.message);
                                //     }
                                //     else{
                                //         $.alert({
                                //             title: '',
                                //             content: "The phone number you are using for your password appears to be a non-working number.  Please ensure you use your correct working phone number because we use your phone number for account recovery in case you are not able to log in.  We will never give your phone number to telemarketers.  If you do not prefer to permanently use your phone number as your password, you can change your password at any time.",
                                //         });
                                //     }
                                // }
                            },
                            error: function() {
                                body_hide_loading();
                                showErrorToast('Something Went Wrong.');
                            }
                        });
                    } else {
                        body_hide_loading();
                        showErrorToast(data.message);
                    }
                },
                error: function() {
                    body_hide_loading();
                    showErrorToast('Something Went Wrong.');
                }
            });

        }

    });

    $(document).on('click', '.why-we-use-phone-password-link', function() {
        $.alert({
            title: '',
            content: "We use your phone number as your password because with so many websites requiring passwords and so many variations of password requirements, using your phone number makes it easier for you to remember.  Also, we may use your phone number for account recovery in case you are not able to log in.  We will never give your phone number to telemarketers.  If you do not prefer to permanently use your phone number as your password, you can change your password at any time.",
        });
    });

    $(function() {
        if ($("#signup_password_phone_no").length) {
            document.getElementById("signup_password_phone_no").addEventListener('input', function(e) {
                var x = e.target.value.replace(/\D/g, '');
                e.target.value = x;
            });
        }

        if ($("#signup_confirm_password_phone_no").length) {
            document.getElementById("signup_confirm_password_phone_no").addEventListener('input', function(e) {
                var x = e.target.value.replace(/\D/g, '');
                e.target.value = x;
            });
        }
    });

    $("#signup_password_phone_no").on("paste", function() {
        setTimeout(function() {
            var txtvalue = $("#signup_password_phone_no").val();
            myString = txtvalue.replace(/\D/g, '');
            $("#signup_password_phone_no").val(myString);
        }, 100);
    });
    $("#signup_confirm_password_phone_no").on("paste", function() {
        setTimeout(function() {
            var txtvalue = $("#signup_confirm_password_phone_no").val();
            myString = txtvalue.replace(/\D/g, '');
            $("#signup_confirm_password_phone_no").val(myString);
        }, 100);
    });

    $(document).on('click', '.trigger-user-register-without-password', function() {

        $('body').showLoading();
        // $.alert({
        //     title: '',
        //     content: "It appears that you did not want to use your phone number for your password.  No worries, you can still enroll for free.  We have sent you an email with a link that will allow you to finish enrolling without using your phone number as a password.",
        // });
        $.ajax({
            url: web_url + 'ajax/register',
            type: 'post',
            data: {
                'email': registerUserDataObj.email,
                'zipcode': '',
                'first_name': registerUserDataObj.first_name,
                'last_name': registerUserDataObj.last_name,
                'password': "",
                'action': "",
                'set_temp_pass': 1
            },
            dataType: 'json',
            success: function(data) {
                $('body').hideLoading();
                if (data.status == true) {
                    $.alert({
                        title: '',
                        content: "It appears that you did not want to use your phone number for your password.  No worries, you can still enroll for free.  We have sent you an email with a link that will allow you to finish enrolling without using your phone number as a password.",
                        onClose: function() {
                            location.reload(true);
                        },
                    });
                    registerUserDataObj = {};
                    $("#signup_modal_step_2").modal('hide');
                    // showSuccessToast(data.message);
                } else {
                    showErrorToast(data.message);
                }
            },
            error: function() {
                $('body').hideLoading();
                showErrorToast('Something Went Wrong.');
            }
        });
    });

    $(document).on('click', '.user-register-form-close', function(event) {
        var targetElementObj = $(event.target);
        targetElementObj.closest(".modal-content").find("input:not(button):not([type='button'])").val('');
        registerUserDataObj = {};
    });

    $(document).on('click', '#signup_submit_step_2', function(event) {
        $("#signup_modal_step_2 #signup_password_signup_required").text('Password is required.');
        $("#signup_modal_step_2 #signup_confirm_password_signup_required").text('Confirm Password is required.');

        var flag = true;
        $("#signup_modal_step_2 .signup_required").each(function(index) {
            var idStr = $(this).attr('name');
            if ($(this).val() == "") {
                $("#signup_modal_step_2 #" + idStr + "_signup_required").css('display', 'block');
                flag = false;
            } else {
                $("#signup_modal_step_2 #" + idStr + "_signup_required").css('display', 'none');
            }
        });

        if (flag == true) {
            if ($('#signup_password_phone_no').val().length != 10) {
                $("#signup_modal_step_2 #signup_password_signup_required").text('Password should contain 10 digits only.').show();
                flag = false;
            }
            if ($('#signup_password_phone_no').val() != '' && $('#signup_confirm_password_phone_no').val() != '') {
                if ($('#signup_password_phone_no').val() != $('#signup_confirm_password_phone_no').val()) {
                    $("#signup_modal_step_2 #signup_confirm_password_signup_required").text('Password and Confirm password must be same.').show();
                    flag = false;
                }
            }
        }

        if (flag) {
            $('body').showLoading();
            $.ajax({
                url: web_url + 'ajax/register',
                type: 'post',
                data: {
                    'email': registerUserDataObj.email,
                    'zipcode': '',
                    'first_name': registerUserDataObj.first_name,
                    'last_name': registerUserDataObj.last_name,
                    'password': $("#signup_password_phone_no").val(),
                    'action': "",
                    'set_temp_pass': 0
                },
                dataType: 'json',
                success: function(data) {
                    $('body').hideLoading();
                    if (data.status == true) {
                        registerUserDataObj = {};
                        showSuccessToast(data.message);
                        $("#signup_modal_step_2").modal('hide');
                        setTimeout(function() {
                            location.reload(true);
                        }, 2000);
                    } else {
                        if (data['valid-phone-no']) {
                            showErrorToast(data.message);
                        } else {
                            $.alert({
                                title: '',
                                content: "The phone number you are using for your password appears to be a non-working number.  Please ensure you use your correct working phone number because we use your phone number for account recovery in case you are not able to log in.  We will never give your phone number to telemarketers.  If you do not prefer to permanently use your phone number as your password, you can change your password at any time.",
                            });
                        }
                    }
                },
                error: function() {
                    $('body').hideLoading();
                    showErrorToast('Something Went Wrong.');
                }
            });
        }
    });
});

$(document).on('click', '#signup_submit', function() {

    $("#signup_first_signup_required").text('First Name is required.');
    $("#signup_last_signup_required").text('Last Name is required.');
    $("#signup_email_signup_required").text('Email is required.');
    $("#signup_password_signup_required").text('Create Password is required.');
    $("#signup_confirm_password_signup_required").text('Confirm Password is required.');

    var flag = true;
    $(".signup_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_signup_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_signup_required").css('display', 'none');
        }
    });

    var email = $('#signup_email').val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


    if (!regex.test(email) && email != '') {
        $("#signup_email_signup_required").text('Email is not valid.');
        $("#signup_email_signup_required").css('display', 'block');
        flag = false;
    }


    if ($('#signup_password').val() != '' && $('#signup_confirm_password').val() != '') {
        if ($('#signup_password').val() != $('#signup_confirm_password').val()) {
            $("#signup_confirm_password_signup_required").text('Password and Confirm password must be same.');
            $("#signup_confirm_password_signup_required").css('display', 'block');
            flag = false;
        }
    }

    if (flag == true) {

        signup_show_loading();
        $.ajax({
            url: web_url + 'ajax/register',
            type: 'post',
            data: {
                'email': $('#signup_email').val(),
                'zipcode': '',
                'first_name': $('#signup_first').val(),
                'last_name': $('#signup_last').val(),
                'password': $('#signup_password').val(),
                'action': useraction,
                'agent': agentid,
                'id': homeid,
                'city': city,
                'state': state,
                'county': county,
                'zipcode1': zipcode,
                'lat': lat,
                'long': long,
                'price_from': price_from,
                'price_to': price_to,
                'payment_from': payment_from,
                'payment_to': payment_to,
                'address': address,
                'beds': beds,
                'bath': bath,
                'sqft': sqft,
                'garage': garage,
                'threed': threed,
                'aerial': aerial,
                'radius': radius
            },
            dataType: 'json',
            success: function(data) {
                if (data.status == true) {
                    showSuccessToast(data.message);

                    if (data.activation_required == 1) {
                        $('.signup_div').html('');
                        $('.signup_div').html('<p>An email has been sent to you. You will find your login credentials in the email.</p>');
                    } else {

                        setTimeout(function() {
                            if (useraction == 'website_request') {
                                window.open(homeid, '_blank');
                            }


                            if (useraction == 'found-contact-agent') {
                                window.location.href = window.location.href + "?want_to_contact=yes";
                            } else if (useraction == 'contact_agent_request') {
                                if (typeof find_agent_searched_address !== 'undefined') {
                                    var additional_para = web_url + 'find-an-agent?';
                                    if (find_agent_searched_address != '') {
                                        additional_para = additional_para.concat('&address=' + find_agent_searched_address);
                                        additional_para = additional_para.concat('&address-title=' + find_agent_searched_address);
                                    }

                                    if ($('#find_an_agent_search_lat').val() != '') {
                                        additional_para = additional_para.concat('&latitude=' + $('#find_an_agent_search_lat').val());
                                    }

                                    if ($('#find_an_agent_search_long').val() != '') {
                                        additional_para = additional_para.concat('&longitude=' + $('#find_an_agent_search_long').val());
                                    }

                                    window.location.href = additional_para;
                                } else {
                                    location.reload(true);
                                }
                            } else {
                                location.reload(true);
                            }
                        }, 2000);
                    }
                } else {
                    showErrorToast(data.message);
                }
                signup_hide_loading();
            },
            error: function() {
                signup_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });

    }

});

$(document).on('click', '#signupfb_submit', function() {

    $("#signup_firstfb_signup_required").text('First Name is required.');
    $("#signup_lastfb_signup_required").text('Last Name is required.');
    $("#signup_emailfb_signup_required").text('Email is required.');

    var flag = true;
    $(".signupfb_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_signup_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_signup_required").css('display', 'none');
        }
    });

    var email = $('#signup_emailfb').val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(email) && email != '') {
        $("#signup_emailfb_signup_required").text('Email is not valid.');
        $("#signup_emailfb_signup_required").css('display', 'block');
        flag = false;
    }

    if (flag == true) {

        //var id = $('#signup_userfbid').val();
        //alert(id);
        //signup_show_loading();
        $('#signupfb_loading').showLoading();
        $.ajax({
            url: web_url + 'ajax/facebook-register',
            type: 'post',
            data: {
                'email': $('#signup_emailfb').val(),
                'zipcode': '',
                'first_name': $('#signup_firstfb').val(),
                'last_name': $('#signup_lastfb').val(),
                'fb_id': $('#signup_userfbid').val(),
                'fb_img': $('#signup_userfbimg').val()
            },
            dataType: 'json',
            success: function(data) {
                $('#signupfb_loading').hideLoading();
                if (data.status == true) {
                    showSuccessToast(data.message);
                    location.reload(true);
                } else {
                    showErrorToast(data.message);
                }
            },
            error: function() {
                $('#signupfb_loading').hideLoading();
                showErrorToast('Something Went Wrong.');
            }
        });

    }

});

$(document).ready(function() {
    $(document).on("hidden.bs.modal", "#signup_modal_step_1", function() {
        $('.signup_modal_fields').val('');
        $('.signup_modal_text').text('');
    });
});

function signin_show_loading() {
    $('#signin_loading').showLoading();
}

function signin_hide_loading() {
    $('#signin_loading').hideLoading();
}

$(document).on('keyup', '.signin_required', function(e) {
    if (e.keyCode == 13) {
        $('#signin_submit').trigger("click");
    }
});

$(document).on('click', '#signin_submit', function() {

    $('#resend_activation_signin').css('display', 'none');
    $("#signin_email_signin_required").text('Email is required.');
    $("#signin_password_signin_required").text('Password is required.');

    var flag = true;
    $(".signin_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_signin_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_signin_required").css('display', 'none');
        }
    });

    var email = $('#signin_email').val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


    if (!regex.test(email) && email != '') {
        $("#signin_email_signin_required").text('Email is not valid.');
        $("#signin_email_signin_required").css('display', 'block');
        flag = false;
    }



    if (flag == true) {
        signin_show_loading();
        $.ajax({
            url: web_url + 'ajax/login',
            type: 'post',
            data: {
                'email': $('#signin_email').val(),
                'zipcode': '',
                'password': $('#signin_password').val(),
                'action': useraction,
                'id': homeid,
                'agent': agentid,
                'city': city,
                'state': state,
                'county': county,
                'zipcode1': zipcode,
                'lat': lat,
                'long': long,
                'price_from': price_from,
                'price_to': price_to,
                'payment_from': payment_from,
                'payment_to': payment_to,
                'address': address,
                'beds': beds,
                'bath': bath,
                'sqft': sqft,
                'garage': garage,
                'threed': threed,
                'aerial': aerial,
                'radius': radius
            },
            dataType: 'json',
            success: function(data) {
                if (data.status == true) {

                    if (useraction == 'contact') {
                        if (agentid == 'yes') {
                            window.location.href = window.location.href + "?contact_details=1";
                            return;
                        } else {
                            localStorage.setItem("contact_agent_home_id", homeid);
                        }
                    }

                    if (useraction == 'maintenance-login') {
                        window.location.href = data.redirect_link;
                        return;
                    }

                    if(data.firsttime_login == true)
                    {
                        showAssistantPassword();
                        signin_hide_loading();
                        return;
                    }

                    showSuccessToast(data.message);
                    setTimeout(function() {
                        if (getParameterByName('redirect') != null) {
                            window.location.replace(getParameterByName('redirect'));
                        } else {
                            location.reload(true);
                        }
                    }, 1500);
                } else {
                    signin_hide_loading();
                    showErrorToast(data.message);

                    // if(data.firsttime_login == true)
                    // {
                    //      showAssistantPassword();
                    // }
                    // else
                    // {

                        if (data.hasOwnProperty('is_active')) {
                            $('#resend_activation_signin').css('display', 'inline-block');
                        }
                    //}
                }
            },
            error: function() {
                signin_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
    }

});

$(document).ready(function() {
    $(document).on("hidden.bs.modal", "#signin_modal", function() {
        $('.signin_modal_fields').val('');
        $('.signin_modal_text').text('');
        $('#resend_activation_signin').css('display', 'none');
    });

    $('#resend_activation_signin').on('click', function() {
        resednd_activation(1);
    });
});

function showAssistantPassword(){
    fetchModalPopupAndShow({
        'popup-name': "assistant_password_modal"
    }, function() {
        $('#signin_modal').modal('hide');
        $('#assistant_password_modal').modal('show');
    });
}

$(document).on('click', '#assistant_password_submit_btn', function() {
    if($('#current_pass').val()=="")
    {
        $("#current_pass_required").html("Current password is Required");
        $("#current_pass_required").css('display', 'block');
    }
    else if($('#assistant_pass').val()=="")
    {
        $("#assistant_pass_required").html("New password is Required");
        $("#assistant_pass_required").css('display', 'block');
    }
    else if($('#confirm_pass').val()=="")
    {
        $("#confirm_pass_required").html("New password is Required");
        $("#confirm_pass_required").css('display', 'block');
    }
    else if($('#assistant_pass').val()!=$('#confirm_pass').val())
    {
        $("#confirm_pass_required").html("New password and Confirm password are not match");
        $("#confirm_pass_required").css('display', 'block');
    }
    else
    {
        $("#current_pass_required").css('display', 'none');
        $("#assistant_pass_required").css('display', 'none');
        $("#confirm_pass_required").css('display', 'none');
        var formData = new FormData();

        formData.append('current_pass', $('#current_pass').val());
        formData.append('assistant_pass', $('#assistant_pass').val());
        formData.append('type', '1');
        $.ajax({
            url: web_url + 'ajax/update-assistant-password',
            type: 'post',
            data: formData,
            dataType: 'json',
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {

                if(data.status == "1")
                {
                    $('#assistant_password_modal').modal('hide');
                    showSuccessToast('Your password updated successfully');
                    location.reload();
                }
                else if(data.status == "3")
                {
                    $("#current_pass_required").html("Your current password is wrong!");
                    $("#current_pass_required").css('display', 'block');
                }
                else if(data.status == "2")
                {
                    $('#assistant_password_modal').modal('hide');
                    showErrorToast('Something Went Wrong.');
                }
            },
            error: function() {
                $('#assistant_password_modal').modal('hide');
                showErrorToast('Something Went Wrong.');
            }
        });
    }
});

$(document).on('click', '#assistant_password_cancel_btn', function() {
    var formData = new FormData();
        formData.append('type', '2');
        $.ajax({
            url: web_url + 'ajax/update-assistant-password',
            type: 'post',
            data: formData,
            dataType: 'json',
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {
                $('#assistant_password_modal').modal('hide');
            },
            error: function() {
                $('#assistant_password_modal').modal('hide');
            }
        });
});

//Change Password
function change_password_show_loading() {
    $('#change_password_loading').showLoading();
}

function change_password_hide_loading() {
    $('#change_password_loading').hideLoading();
}

$(document).ready(function() {
    $('.change_password_required').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#change_password_submit').trigger("click");
        }
    });
});

$(document).on('click', '#change_password_submit', function() {

    $("#currentPassword_change_password_required").text('Current Password is required.');
    $("#newPassword_change_password_required").text('New Password is required.');
    $("#confirmPassword_change_password_required").text('Confirm Password is required.');

    var flag = true;
    $(".change_password_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_change_password_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_change_password_required").css('display', 'none');
        }
    });


    if ($('#newPassword').val() != '' && $('#confirmPassword').val() != '') {
        if ($('#newPassword').val() != $('#confirmPassword').val()) {
            $("#confirmPassword_change_password_required").text('Password and Confirm password must be same REGISTER.');
            $("#confirmPassword_change_password_required").css('display', 'block');
            flag = false;
        }
    }

    if (flag == true) {
        change_password_show_loading();
        $.ajax({
            url: web_url + 'ajax/change-password',
            type: 'post',
            data: {
                'userid': is_user_login,
                'currentPassword': $('#currentPassword').val(),
                'newPassword': $('#newPassword').val(),
                'phonenumber': $('#phonenumber').val(),
                'is_assistant_flag': $('#is_assistant_flag').val(),
            },
            dataType: 'json',
            success: function(data) {
                change_password_hide_loading();
                if (data.status == true) {
                    showSuccessToast(data.message);
                    setTimeout(function() {
                        //location.reload(true);
                        if(redirect_ref)
                            window.location.href=redirect_ref;
                        else
                            window.location.href=web_url;
                    }, 1500);
                } else {
                    showErrorToast(data.message);
                }
            },
            error: function() {
                change_password_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
    }

});


$(document).ready(function() {

    $(document).on("hidden.bs.modal", "#change_password_modal", function() {
        $('.change_password_modal_fields').val('');
        $('.change_password_text').text('');
    });

    if ($("#phonenumber").length) {
        document.getElementById("phonenumber").addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    $("#phonenumber").on("paste", function() {
        setTimeout(function() {
            var txtvalue = $("#phonenumber").val();
            myString = txtvalue.replace(/\D/g, '');
            $("#phonenumber").val(myString);
        }, 100);
    });

    if ($("#profile_phonenumber").length) {
        document.getElementById("profile_phonenumber").addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    $("#profile_phonenumber").on("paste", function() {
        setTimeout(function() {
            var txtvalue = $("#phonenumber").val();
            myString = txtvalue.replace(/\D/g, '');
            $("#phonenumber").val(myString);
        }, 100);
    });

});
//Change Password


//Update Profile

function update_profile_show_loading() {
    $('#update_profile_loading').showLoading();
}

function update_profile_hide_loading() {
    $('#update_profile_loading').hideLoading();
}



var introimg, introaudio, propertyaudio;

function removeuserarfiles(arid) {
    $('#' + arid).val('');
    $('#' + arid + '_div').hide();
}

function addintroimg(input) {
    introimg = input.files[0];
    ////console.log(introimg);
}

function addintroaudio(input) {
    introaudio = input.files[0];
    if (('#is_intro_aud_div').length > 0) {
        $('#is_intro_aud_div').remove();
    }

    $('#is_intro_aud_div_add').show();
}

function emptyadded(id) {
    $('#' + id + '_div_add').hide();
    if (id == 'is_intro_aud') {
        $('#inro_audio').val('');
        introaudio = '';
    } else if (id == 'is_p_aud') {
        $('#p_intro_audio').val('');
        propertyaudio = '';
    }
}

function addpintroaudio(input) {
    propertyaudio = input.files[0];
    if (('#is_p_aud_div').length > 0) {
        $('#is_p_aud_div').remove();
    }

    $('#is_p_aud_div_add').show();
}

$(document).on('click', '#update_profile_submit', function() {

    $("#profile_first_name_update_profile_required").text('First Name is required.');
    $("#profile_last_name_update_profile_required").text('Last Name is required.');
    $("#profile_zipcode_update_profile_required").text('Zip Code is required.');
    $("#profile_phonenumber_update_profile_required").text('Phone Number is required.');
    $("#profile_address_update_profile_required").text('Address is required.');
    $("#profile_agent_id_update_profile_required").text('Agent ID is required.');
    $("#profile_state_update_profile_required").text('State is required.');
    $("#profile_county_update_profile_required").text('County is required.');

    if(login_user_role && (login_user_role==2 || login_user_role==4) ){
        $("#profile_city_update_profile_required").text('City Name is required.');

        if(login_user_role==2){
            $("#profile_browser_tab_city_update_profile_required").text('Browser Tab city is required.');
        }
    }

    $("#profile_agency_name_update_profile_required").text('Agency is required.');
    $("#profile_agent_website_update_profile_required").text('Website is required.');
    $("#profile_office_number_update_profile_required").text('Office is required.');
    $("#profile_agent_bio_update_profile_required").text('Agent Bio is required.');

    var flag = true;
    var flag_name = "";
    var browserTab = $('#profile_browser_tab_city').val();

    if(browserTab !== undefined){
        if(browserTab.length == 0){
            var idStr = 'profile_browser_tab_city';
            flag_name = "#" + idStr + "_update_profile_required";
            $(flag_name).css('display','block').html('Browser Tab city is required!');
            $("#profile_browser_tab_city").focus();
            flag = false;        
        }else if(browserTab.length > 25){
        //showErrorToast('25 Characters allowed for Browser Tab City.');
        var idStr = 'profile_browser_tab_city';
        flag_name = "#" + idStr + "_update_profile_required";
        $(flag_name).css('display','block').html('Note : 25 Characters allowed for Browser Tab City.');
        $("#profile_browser_tab_city").focus();
        flag = false;        
    }else{
        $(flag_name).css('display', 'none');
    }
  }

    $("#update_profile_modal .update_profile_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            flag_name = "#" + idStr + "_update_profile_required";
            $(flag_name).css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_update_profile_required").css('display', 'none');
        }
    });


        var BroidStr = $('.update_profile_browser_tab_required').attr('name');
        if($('.update_profile_browser_tab_required').val() != undefined){
        if ($('.update_profile_browser_tab_required').val() == "" || $('.update_profile_browser_tab_required').val().length > 25) {
            flag_name = "#" + BroidStr + "_update_profile_required";
            $(flag_name).css('display', 'block');
            flag = false;
        } else {
            $("#" + BroidStr + "_update_profile_required").css('display', 'none');
        }
        }

    
    if(!flag){
        // $('body').scrollTo(flag_name);
        // document.getElementById(flag_name).scrollIntoView( {behavior: "smooth" })
         $("html, body").animate({
            scrollTop: $(flag_name).offset().top-400
          }, 100);
    }
    if($("#licence_preview").prop('checked') == true){

    var licence_number = $('#licence_number').val();
    if(licence_number=="")
    {
      flag = false;
      $("#profile_licence_number_update_profile_required").css('display', 'block');
      $('#profile_licence_number_update_profile_required').text('Licence number is required');
    }
   }

    if (flag == true) {

        var licence_preview = false;
           if($("#licence_preview").prop('checked') == true){
               licence_preview = true;
           }
           else
           {
               licence_preview = false;
           }


        profile_image_cropped = $("#raw_cropped_profile_img").val();
        agancy_image_cropped = $("#raw_cropped_agency_img").val();

        var agent_bio = '';
        if ($('#profile_agent_website').is(':visible')) {
            agent_bio = tinyMCE.get('profile_agent_bio').getContent();;
        }
        //
        // {'userid': is_user_login, 'first_name': $('#profile_first_name').val(), 'last_name': $('#profile_last_name').val(), 'zipcode': $('#profile_zipcode').val(), 'phonenumber': $('#profile_phonenumber').val(), 'address': $('#profile_address').val(), 'state': $('#profile_state').val(), 'county': $('#profile_county').val(), 'agent_id': $('#profile_agent_id').val(), 'address_business_name': $('#profile_address_business_name').val(),'profile_image':profile_image_cropped,'agency_image':agancy_image_cropped,'agency_name':$('#profile_agency_name').val(),'agent_website':$('#profile_agent_website').val(),'office_number':$('#profile_office_number').val(),'agent_bio':agent_bio,
        // },
        update_profile_show_loading();
        var is_intro_aud, is_p_aud, is_intro_img, ar_image, ar_image_name;
        if ($('#is_intro_img').length > 0) {
            is_intro_img = $('#is_intro_img').val();
        }
        if ($('#is_intro_aud').length > 0) {
            is_intro_aud = $('#is_intro_aud').val();
        }
        if ($('#is_p_aud').length > 0) {
            is_p_aud = $('#is_p_aud').val();
        }
        if ($('#agent_card_label').length > 0) {
            ar_image = $('#agent_card_label').prop('files')[0];
        }
        if ($('#ar_card_name').length) {
            ar_image_name = $('#ar_card_name').val();
        }
        if (ifCCPresent) {
            if (!$('#card_number').val() && !$('#expiration_month').val() && !$('#expiration_year').val() && !$('#card_cvv').val()) {
                $.confirm({
                    title: '',
                    content: 'The credit card fields cannot be left blank please click the Try Again button to complete the required fields or click the Revert button below to revert back to the previous card that was used.',
                    buttons: {
                        'Try Again': function () {

                        },
                        'Revert': function () {
                            revertCC();
                        }
                    }
                });
                update_profile_hide_loading();
                return;
            }
        }
        let restrict_nonsignin_user = 0;
        if($("#restrict_nonsignin_user").is(":checked"))
        {
            restrict_nonsignin_user = 1;
        }
        var formData = new FormData();
        formData.append('userid', is_user_login);
        formData.append('first_name', $('#profile_first_name').val());
        formData.append('last_name', $('#profile_last_name').val());
        formData.append('zipcode', $('#profile_zipcode').val());
        formData.append('browser_tab_city', $('#profile_browser_tab_city').val());
        formData.append('deleteuserid', $('#deleteuserid').val());
        formData.append('assistant_email', $('#assistant_email').val());
        formData.append('assistant_email2', $('#assistant_email2').val());
        formData.append('adminassistantemail', $('#adminassistantemail').val());
        formData.append('assistant_id', $('#assistant_id').val());
        formData.append('second_assistant_id', $('#second_assistant_id').val());
        formData.append('admin_assistant_id', $('#admin_assistant_id').val());
        formData.append('phonenumber', $('#profile_phonenumber').val());
        formData.append('user_email', $('#profile_email').val());
        formData.append('address', $('#profile_address').val());
        formData.append('state', $('#profile_state').val());
        formData.append('county', $('#profile_county').val());
        formData.append('city', $('#profile_city').val());
        formData.append('agent_id', $('#profile_agent_id').val());
        formData.append('address_business_name', $('#profile_address_business_name').val());
        formData.append('profile_image', profile_image_cropped);
        formData.append('agency_image', agancy_image_cropped);
        formData.append('agency_name', $('#profile_agency_name').val());
        formData.append('agent_website', $('#profile_agent_website').val());
        formData.append('office_number', $('#profile_office_number').val());
        formData.append('agent_bio', agent_bio);
        formData.append('introimg', introimg);
        formData.append('introaudio', introaudio);
        formData.append('propertyaudio', propertyaudio);
        formData.append('is_intro_img', is_intro_img);
        formData.append('is_intro_aud', is_intro_aud);
        formData.append('is_p_aud', is_p_aud);
        formData.append('ar_image', ar_image);
        formData.append('ar_image_name', ar_image_name);
        formData.append('latitude', $("#profile_latitude").val());
        formData.append('longitude', $("#profile_longitude").val());
        formData.append('licence_number', $('#licence_number').val());
        formData.append('restrict_nonsignin_user', restrict_nonsignin_user);
        formData.append('licence_preview', licence_preview);
        formData.append('card_number', $('#card_number').val());
        formData.append('expiration_month', $('#expiration_month').val());
        formData.append('expiration_year', $('#expiration_year').val());
        formData.append('card_cvv', $('#card_cvv').val());
        formData.append('profile_basesqft', $('#profile_basesqft').val());
        formData.append('browser_tab_city', $('#profile_browser_tab_city').val());
        formData.append('first_customer_campaign', $('#first_customer_campaign').val());
        formData.append('suite_no', $('#suiteno').val());

        $.ajax({
            url: web_url + 'ajax/update-profile',
            type: 'post',
            data: formData,
            dataType: 'json',
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {
                update_profile_hide_loading();
                if (data.status == true) {
                    if (data.introImgMessage) {
                        showErrorToast(data.introImgMessage);
                    } else if (data.pAudioMessage) {
                        showErrorToast(data.pAudioMessage);
                    } else if (data.introAudioMessage) {
                        showErrorToast(data.introAudioMessage);
                    } else {
                        showSuccessToast(data.message);
                        setTimeout(function() {
                            //location.reload(true);
                            if(redirect_ref)
                                window.location.href=redirect_ref;
                            else
                                window.location.href=web_url;
                        }, 1500);
                    }
                } else {
                    showErrorToast(data.message);
                }
            },
            error: function() {
                update_profile_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
    }
});

$(document).ready(function() {
    $("#profile_zipcode").keypress(function(e) {
        if (e.which != 8 && e.which != 0 && e.which != 13 && (e.which < 48 || e.which > 57)) {
            $("#profile_zipcode_update_profile_required").css('display', 'block');
            $("#profile_zipcode_update_profile_required").text("Digits Only");
            return false;
        } else {
            $("#profile_zipcode_update_profile_required").css('display', 'none');
        }
    });

    $("#profile_zipcode").on("paste", function() {
        setTimeout(function() {
            var txtvalue = $("#access_code").val();
            myString = txtvalue.replace(/\D/g, '');
            $("#access_code").val(myString);
        }, 100);
    });
});

//Update Profile



//Resend

function resednd_activation(id) {
    flag = true;

    if (id == 1) {

        function resend_activation_show_loading() {
            $('#signin_loading').showLoading();
        }

        function resend_activation_hide_loading() {
            $('#signin_loading').hideLoading();
        }

        flag = true;

        $("#signin_email_signin_required").text('Email is required.');
        $("#signin_password_signin_required").text('Password is required.');

        $(".signin_required").each(function(index) {
            var idStr = $(this).attr('name');
            if ($(this).val() == "") {
                $("#" + idStr + "_signin_required").css('display', 'block');
                flag = false;
            } else {
                $("#" + idStr + "_signin_required").css('display', 'none');
            }
        });

        var email = $('#signin_email').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


        if (!regex.test(email) && email != '') {
            $("#signin_email_signin_required").text('Email is not valid.');
            $("#signin_email_signin_required").css('display', 'block');
            flag = false;
        }


    } else {

        function resend_activation_show_loading() {
            $('#login_loading').showLoading();
        }

        function resend_activation_hide_loading() {
            $('#login_loading').hideLoading();
        }

        $(".second_step_required").each(function(index) {
            var idStr = $(this).attr('name');
            if ($(this).val() == "") {
                $("#" + idStr + "_second_step_required").css('display', 'block');
                flag = false;
            } else {
                $("#" + idStr + "_second_step_required").css('display', 'none');
            }
        });

    }

    var email_id = '';
    if (id == 1) {
        email_id = $('#signin_email').val();
    } else {
        email_id = $('#login_email').val();
    }

    if (flag == true) {
        resend_activation_show_loading();
        $.ajax({
            url: web_url + 'ajax/resend-activation',
            type: 'post',
            data: {
                'email': email_id
            },
            dataType: 'json',
            success: function(data) {
                resend_activation_hide_loading()
                if (data.status == true) {
                    showSuccessToast(data.message);
                    setTimeout(function() {
                        if (id == 1) {
                            $('#resend_activation_signin').css('display', 'none');
                        } else {
                            $('#resend_activation_login').css('display', 'none');
                        }
                    }, 1500);
                } else {
                    showErrorToast(data.message);
                }
            },
            error: function() {
                resend_activation_hide_loading()
                showErrorToast('Something Went Wrong.');
            }
        });
    }

}

//Resend



//Forgot Password

function forgot_show_loading() {
    $('#forgot_loading').showLoading();
}

function forgot_hide_loading() {
    $('#forgot_loading').hideLoading();
}

$(document).ready(function() {
    $('.forgot_required').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#forgot_submit').trigger("click");
        }
    });
});

$(document).on('click', '#forgot_submit', function() {

    $("#forgot_email_forgot_required").text('Email is required.');

    var flag = true;
    $(".forgot_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "_forgot_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "_forgot_required").css('display', 'none');
        }
    });

    var email = $('#forgot_email').val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(email) && email != '') {
        $("#forgot_email_forgot_required").text('Email is not valid.');
        $("#forgot_email_forgot_required").css('display', 'block');
        flag = false;
    }


    if (flag == true) {
        forgot_show_loading();
        $.ajax({
            url: web_url + 'ajax/forgot-password',
            type: 'post',
            data: {
                'email': $('#forgot_email').val()
            },
            dataType: 'json',
            success: function(data) {
                if (data.status == true) {
                    setTimeout(function() {
                        $('.forgot_div').css('display', 'none');
                        $('.forgot_message_div').css('display', 'block');
                        forgot_hide_loading();
                    }, 1500);
                } else {
                    forgot_hide_loading();
                    showErrorToast(data.message);
                }
            },
            error: function() {
                forgot_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
    }

});



$(document).ready(function() {
    $('.verification_required').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#verification_submit').trigger("click");
        }
    });


    if ($("#verification_code").length) {
        document.getElementById("verification_code").addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '' + x[1] + '' + x[2] + (x[3] ? '' + x[3] : '');
        });
    }


});

$(document).on('click', '#verification_submit', function() {

    $("#verification_code-verification_required").text('Verification Code is required.');

    var flag = true;
    $(".verification_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "-verification_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "-verification_required").css('display', 'none');
        }
    });


    if (flag == true) {
        forgot_show_loading();
        $.ajax({
            url: web_url + 'ajax/check-promo-code',
            type: 'post',
            data: {
                'email': $('#forgot_email').val(),
                'verification_code': $('#verification_code').val(),
            },
            dataType: 'json',
            success: function(data) {
                forgot_hide_loading();
                if (data.status == true) {
                    $('#forgot_passs_head_text').text('Change Password');
                    $('.forgot_message_div').css('display', 'none');
                    $('.forgot_change_pass_div').css('display', 'block');
                    $('#forgot_change_user_id').val(data.user_id);
                    $('#is_assistant').val(data.is_assistant);
                } else {
                    showErrorToast(data.message);
                }
            },
            error: function() {
                forgot_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
    }

});

$(document).ready(function() {
    $('.forgot_change_pass-required').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#forgot_change_pass_submit').trigger("click");
        }
    });
});

$(document).on('click', '#forgot_change_pass_submit', function() {

    $("#forgot_change_pass_new_pass-forgot_change_pass-required").text('New Password is required.');
    $("#forgot_change_pass_conf_pass-forgot_change_pass-required").text('Confirm Password is required.');

    var flag = true;
    $(".forgot_change_pass-required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "-forgot_change_pass-required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "-forgot_change_pass-required").css('display', 'none');
        }
    });

    if ($('#forgot_change_pass_new_pass').val() != '' && $('#forgot_change_pass_conf_pass').val() != '') {
        if ($('#forgot_change_pass_new_pass').val() != $('#forgot_change_pass_conf_pass').val()) {
            $("#forgot_change_pass_conf_pass-forgot_change_pass-required").text('Password and Confirm password must be same.');
            $("#forgot_change_pass_conf_pass-forgot_change_pass-required").css('display', 'block');
            flag = false;
        }
    }


    if (flag == true) {
        forgot_show_loading();
        $.ajax({
            url: web_url + 'ajax/forgot-change-password',
            type: 'post',
            data: {
                'user_id': $('#forgot_change_user_id').val(),
                'is_assistant': $('#is_assistant').val(),
                'new_pass': $('#forgot_change_pass_new_pass').val(),
            },
            dataType: 'json',
            success: function(data) {
                forgot_hide_loading();
                if (data.status == true) {
                    showSuccessToast(data.message);

                    setTimeout(function() {
                        $('#signin_email').val($('#forgot_email').val());
                        $('#forgot_modal').modal('hide');
                    }, 1000)
                } else {
                    showErrorToast(data.message);
                }
            },
            error: function() {
                forgot_hide_loading();
                showErrorToast('Something Went Wrong.');
            }
        });
    }

});

$(document).ready(function() {
    $(document).on("hidden.bs.modal", "#forgot_modal", function() {
        $('.forgot_modal_fields').val('');
        $('.forgot_modal_text').text('');

        fetchModalPopupAndShow({
            'popup-name': "signin_modal"
        }, function() {
            $('#signin_modal').modal('show');
        });

        $('.forgot_div').css('display', 'block');
        $('.forgot_message_div').css('display', 'none');
        $('.forgot_change_pass_div').css('display', 'none');
        $('#forgot_passs_head_text').text('Forgot Password');
        $('#forgot_change_pass_new_pass').val('');
    });

    $(document).on("click", '.sign-up-link-element', function() {
        fetchModalPopupAndShow({
            'popup-name': "signup_modal_step_1"
        }, function() {
            $('#signup_modal_step_1').modal('show');
        });
    });

    $(document).on("click", '#update-profile-link', function() {
        var modalExisted = $("#update_profile_modal").length;
        fetchModalPopupAndShow({
            'popup-name': "update_profile_modal"
        }, function() {
            if (!modalExisted) {
                setupProfileFields();
                setupProfileImageModal();
                setupAgencyImageModal();
            }
            $('#update_profile_modal').modal('show');
            $("#update_profile_modal").on("hidden.bs.modal", function () {
                //console.log('inside modl cl');
                revertCC();
            });
            $('.mnuclose').click();
        });
    });

    $(document).on("click", '#change-password-link', function() {
        fetchModalPopupAndShow({
            'popup-name': "change_password_modal"
        }, function() {
            $('#change_password_modal').modal('show');
            $('.mnuclose').click();
        });
    });
});

function showForgotPassword() {
    fetchModalPopupAndShow({
        'popup-name': "forgot_modal"
    }, function() {
        $('#signin_modal').modal('hide');
        $('#forgot_modal').modal('show');
    });
}

//Forgot Password


//See other cities
Iscitiesgooglesearch = false;

function see_other_show_loading() {
    $('.see-other-cities-cl').showLoading();
}

function see_other_hide_loading() {
    $('.see-other-cities-cl').hideLoading();
}


//New Search
var change_cities_manully_is_place_selected = '';
var change_cities_manully_address_change = '';
//New Search

$(document).ready(function() {

    $('#see_other_city_field').change(function() {
        if ($(this).val() == '') {
            $('#change_cities_state').val('');
            $('#change_cities_county').val('');
            $('#change_cities_zipcode').val('');
            $('#change_cities_lat').val('');
            $('#change_cities_long').val('');
            Iscitiesgooglesearch = false;
        }

        if (change_cities_manully_is_place_selected == false) {
            get_data_from_address(change_cities_manully_address_change, function(getted_data) {
                if (change_cities_manully_is_place_selected == false) {
                    if (getted_data.status == true) {
                        $('#see_other_city_field').val(getted_data.address);
                        $('#see_other_city_field').attr('title', getted_data.address);
                        $('#change_cities_state').val('');
                        $('#change_cities_county').val('');
                        $('#change_cities_zipcode').val('');
                        $('#change_cities_lat').val(getted_data.lat);
                        $('#change_cities_long').val(getted_data.long);
                        Iscitiesgooglesearch = true;
                    } else {
                        $('#change_cities_state').val('');
                        $('#change_cities_county').val('');
                        $('#change_cities_zipcode').val('');
                        $('#change_cities_lat').val('');
                        $('#change_cities_long').val('');
                        Iscitiesgooglesearch = false;
                    }
                }
            });
        }
    });

    $("#see_other_city_field").keydown(function(e) {
        change_cities_manully_address_change = $(".pac-container:visible .pac-item:first").text();
        change_cities_manully_is_place_selected = false;
        Iscitiesgooglesearch = false;
    });

    var see_other_cities_options = {
        types: ['(regions)'],
        componentRestrictions: {
            country: "US"
        },
    };

    if ($("#see_other_city_field").length) {
        var see_other_cities_input = document.getElementById('see_other_city_field');
        var see_other_cities_input_autocomplete = new google.maps.places.Autocomplete(see_other_cities_input, see_other_cities_options);


        see_other_cities_input_autocomplete.addListener('place_changed', function() {

            change_cities_manully_is_place_selected = true;

            var place = see_other_cities_input_autocomplete.getPlace();
            $('#see_other_city_field').val(place.formatted_address);
            $('#see_other_city_field').attr('title', place.formatted_address);

            var componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                administrative_area_level_2: 'short_name',
                country: 'long_name',
                postal_code: 'short_name',
            };

            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {

                    var val = place.address_components[i][componentForm[addressType]];

                    if (addressType == 'administrative_area_level_1') {
                        $('#change_cities_state').val(val.trim());
                    }

                    if (addressType == 'postal_code') {
                        $('#change_cities_zipcode').val(val);
                    }
                    if (addressType == 'administrative_area_level_2') {
                        $('#change_cities_county').val(val);
                    }

                    $('#change_cities_lat').val(place.geometry.location.lat().toFixed(4));
                    $('#change_cities_long').val(place.geometry.location.lng().toFixed(4));

                }
            }
            Iscitiesgooglesearch = true;
        });
    }

});


$(document).on('click', '#cities_submit', function() {

    $("#see_other_city_field-cities_required").text('Address is required.');

    var flag = true;
    $(".cities_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "-cities_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "-cities_required").css('display', 'none');
        }
    });


    var mobile_number = '';
    if ($('#cities_mobile_number').is(':visible')) {
        mobile_number = $('#cities_mobile_number').val();
    }

    if (flag) {
        if (Iscitiesgooglesearch) {
            see_other_show_loading();
            $.ajax({
                url: web_url + 'ajax/change-city',
                type: 'post',
                data: {
                    'address': $('#see_other_city_field').val(),
                    'city': $('#change_cities_zipcode').val(),
                    'state': $('#change_cities_state').val(),
                    'county': $('#change_cities_county').val(),
                    'latitude': $('#change_cities_lat').val(),
                    'longitude': $('#change_cities_long').val(),
                    'zipcode': $('#change_cities_zipcode').val(),
                    'mobile_number': mobile_number,
                },
                dataType: 'json',
                success: function(data) {
                    see_other_hide_loading();
                    if (data.status == true) {
                        showSuccessToast(data.message);
                        setTimeout(function() {
                            location.reload(true);
                        }, 2000);
                    } else {
                        if (data.is_franchised_founded == false) {
                            $.alert({
                                title: 'No Franchise Founded',
                                content: "We're sorry we do not have a franchisee in that area yet. Are you interested in starting a Hommati franchise in your area and own a fun and financially rewarding business making drone aerial videos, stills and 3D Tours. If so click here: <a href='" + web_url + "page/franchise#block12'>Request Info Page </a>",
                            });
                        }
                    }
                },
                error: function() {
                    see_other_hide_loading();
                    showErrorToast('Something Went Wrong.');
                }
            });
        } else {
            showErrorToast('Select address from google.');
        }
    }

});

$(document).ready(function() {
    if ($("#cities_mobile_number").length) {
        document.getElementById("cities_mobile_number").addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
});
//See other cities



function contact_agent(home_id, type, listing_key) {
    fetchModalPopupAndShow({
        'popup-name': "home_contact_agent_modal"
    }, function() {
        var a = contact_agent_keys.indexOf(home_id);
        listing_key = listing_key || 0;
        type = type || 0;

        contact_agent_keys.push(home_id);
        $('#lh_type').val(type);
        $('#lh_key').val(listing_key);
        $('#home_contact_agent-home_id').val(home_id);
        $('#home_contact_agent_modal').modal('show');
    });

}



//Contact Agent - Technource


function home_contact_show_loading() {
    $('#home_contact_agent_loading').showLoading();
}

function home_contact_hide_loading() {
    $('#home_contact_agent_loading').hideLoading();
}

$(document).ready(function() {
    if ($("#home_contact_agent-phone").length) {
        document.getElementById("home_contact_agent-phone").addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    $('.home_contact_agent_required').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#home_contact_agent_submit').trigger("click");
        }
    });

    $("#home_contact_agent_modal").on("hidden.bs.modal", function() {
        $('.home_contact_agent_required').val('');
        $('.home_contact_agent_modal_text').text('');

        $(".home_contact_agent_required").each(function(index) {
            $(this).val($(this).attr('data-value'));
        });
    });

    if (localStorage.hasOwnProperty('contact_agent_home_id')) {
        if (localStorage.getItem("contact_agent_home_id") != null) {
            if (localStorage.getItem("contact_agent_home_id") != 0) {
                after_login_contact_agent_popup();
            }
        }
    }
});


$(document).on('click', '#home_contact_agent_submit', function() {

    var lh_type = $("#lh_type").val();
    var lh_key = $("#lh_key").val();
    var key = "{lkey:'" + lh_key + "'}";
    if (lh_type == 1) {
        ////console.log(" lh('submit', 'AGENT_EMAIL_SENT', " + key + ");");

        lh('submit', 'AGENT_EMAIL_SENT', key);

    }
    $("#home_contact_agent-first_name-home_contact_agent_required").text('First Name is required.');
    $("#home_contact_agent-last_name-home_contact_agent_required").text('Last Name is required.');
    $("#home_contact_agent-email-home_contact_agent_required").text('Email is required.');
    $("#home_contact_agent-phone-home_contact_agent_required").text('Phone Number is required.');

    var flag = true;
    $(".home_contact_agent_required").each(function(index) {
        var idStr = $(this).attr('name');
        if ($(this).val() == "") {
            $("#" + idStr + "-home_contact_agent_required").css('display', 'block');
            flag = false;
        } else {
            $("#" + idStr + "-home_contact_agent_required").css('display', 'none');
        }
    });


    var email = $('#home_contact_agent-email').val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(email) && email != '') {
        $("#home_contact_agent-email-home_contact_agent_required").text('Email is not valid.');
        $("#home_contact_agent-email-home_contact_agent_required").css('display', 'block');
        flag = false;
    }


    if (flag) {
        home_contact_show_loading();
        $.ajax({
            url: web_url + 'ajax/contact-agent-home',
            type: 'post',
            data: {
                'first_name': $('#home_contact_agent-first_name').val(),
                'last_name': $('#home_contact_agent-last_name').val(),
                'email': $('#home_contact_agent-email').val(),
                'phone': $('#home_contact_agent-phone').val(),
                'home_id': $('#home_contact_agent-home_id').val(),
            },
            dataType: 'json',
            success: function(data) {
                if (data.status == true) {
                    showSuccessToast(data.message);

                    var home_type = $('.' + $('#home_contact_agent-home_id').val() + '_div').attr('data-home_type');

                    if (home_type == 2) {
                        see_home_related_agents($('#home_contact_agent-home_id').val(), home_type, 1);
                    }

                    $('#home_contact_agent_modal').modal('hide');
                } else {
                    showSuccessToast(data.message);
                }
                home_contact_hide_loading();

            },
            error: function() {
                home_contact_hide_loading();
                showErrorToast('Something Went Wrong.');
                $('#home_contact_agent_modal').modal('hide');
            }
        });
    }

});



function after_login_contact_agent_popup() {

    home_id = localStorage.getItem("contact_agent_home_id");
    localStorage.setItem("contact_agent_home_id", 0)
    if (home_id != 0) {
        $('#home_contact_agent-home_id').val(home_id);
        $('#home_contact_agent_modal').modal('show');
    }


}

//Contact Agent - Technource




//Upload Images

function readURL(input) {

    var url = input.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    var _URL = window.URL || window.webkitURL;

    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        uploadImage = 1;

        if ((file = input.files[0])) {
            img = new Image();
            img.onload = function() {
                if ((this.width == 250 && this.height == 250) || (this.width <= 250 && this.height <= 250)) {
                    $(".cropit-preview-background-container").css('display', 'none');
                }
                var filerdr = new FileReader();
                filerdr.onload = function(e) {
                    $('#image').attr('src', e.target.result);
                    $("#profile_image").modal('show');
                };
                filerdr.readAsDataURL(input.files[0]);

            };

            img.onerror = function() {
                alert("not a valid file: " + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    }
}

function setupProfileFields() {
    $(document).on('keyup', '.update_profile_enter_fields', function(e) {
        if (e.keyCode == 13) {
            $('#update_profile_submit').trigger("click");
        }
    });

    if ($("#profile_office_number").length) {
        document.getElementById("profile_office_number").addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    var elMyFormInput = $("#profile_agent_bio");
    tinymce.init({
        selector: "#profile_agent_bio",
        resize: "both",
        menubar: false,
        relative_urls: false,
        plugins: ["autoresize", "image", "code", "lists", "code", "example", "link", "textcolor"],
        indentation: '20pt',
        file_browser_callback: function(field_name, url, type, win) {
            if (type == 'image') elMyFormInput.click();
        },
        image_list: "/imglist",
        toolbar: [
            "undo redo       bold italic        alignleft aligncenter alignright    preview       forecolor backcolor"
        ],
        content_css: "/styles/Page.css, /styles/master.css, /styles/bootstrap.css"
    });

    $(document).on('keypress', '#profile_agent_id', function(event) {
        var charCode = (event.which) ? event.which : addEventListenerent.keyCode;
        if (charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123 || charCode > 47 && charCode < 58 || charCode == 127 || charCode == 8 || charCode == 32 || charCode == 95 || charCode == 45) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    });

    $('#profile_state,#profile_county').select2();


    var options = {
        componentRestrictions: {
            country: "US"
        }
    };

    if ($("#profile_address").length) {
        setTimeout(function(){
            var input = document.getElementById('profile_address');
            var autocomplete = new google.maps.places.Autocomplete(input, options);

            autocomplete.addListener('place_changed', function() {

                var current_state = $('#profile_state').val();
                var current_county = $('#profile_county').val();

                var place = autocomplete.getPlace();

                $('#profile_zipcode').val('');
                $('#profile_address_business_name').val('');
                $('#profile_address_business_name').val(place.name);

                var is_state_val = false;
                var st_number = '';
                var business_name = place.name;
                var route_data = '';
                var address_new_data = '';
                var county_name = '';
                var state_alert = 0;
                var county_alert = 0;

                var componentForm = {
                    street_number: 'short_name',
                    route: 'long_name',
                    locality: 'long_name',
                    administrative_area_level_1: 'short_name',
                    administrative_area_level_2: 'short_name',
                    country: 'long_name',
                    postal_code: 'short_name',
                };



                for (var i = 0; i < place.address_components.length; i++) {


                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        $('.' + addressType).val(val);

                        if (addressType == 'locality') {
                            if (val.toLowerCase().indexOf(business_name.toLowerCase()) == 0) {
                                business_name = '';
                            }
                        }

                        if (addressType == 'locality') {
                                var val = place.address_components[i]['long_name'];
                                $("#profile_city").val(val);
                        }
                        if (addressType == 'postal_code') {
                                var val = place.address_components[i]['long_name'];
                                $("#profile_zipcode").val(val);
                        }

                        if (addressType == 'country') {
                            if (val.toLowerCase().indexOf(business_name.toLowerCase()) == 0) {
                                business_name = '';
                            }
                        }

                        if (addressType == 'administrative_area_level_1') {
                            $("#profile_state > option").each(function() {

                                if (login_user_role != 1) {
                                    if ($(this).attr('data-state_name') == val) {
                                        if (val.toLowerCase().indexOf(business_name.toLowerCase()) == 0) {
                                            business_name = '';
                                        }
                                        is_state_val = true;
                                        $('#profile_state').val($(this).val()).trigger('change');
                                    }
                                }

                                if ($(this).attr('data-state_name') == val) {
                                    if (current_state != $(this).val()) {
                                        state_alert = 1;
                                    }
                                }

                            });
                        }

                        if (addressType == 'administrative_area_level_2') {
                            if (val.toLowerCase().indexOf(business_name.toLowerCase()) == 0) {
                                business_name = '';
                            }
                            county_name = val;
                        }

                        if (addressType == 'street_number') {
                            if (val.toLowerCase().indexOf(business_name.toLowerCase()) == 0) {
                                business_name = '';
                            }
                            st_number = val + ' ';
                        }

                        if (addressType == 'route') {
                            if (val.toLowerCase().indexOf(business_name.toLowerCase()) == 0) {
                                business_name = '';
                            }
                            route_data = val;
                        }
                    }
                }

                if (login_user_role != 1) {
                    if (!is_state_val) {
                        $('#profile_state').val('').trigger('change');
                        $('#profile_county').html('<option value="">County</option>');
                    }
                }


                if (business_name) {
                    //address_new_data = address_new_data.concat(business_name + ' ');
                }

                if (st_number) {
                    address_new_data = address_new_data.concat(st_number);
                }

                if (route_data) {
                    address_new_data = address_new_data.concat(route_data);
                }


                setTimeout(function() {
                    county_name = county_name.split(" ")[0];
                    last_county_google = county_name;
                    if (county_name) {
                        if (login_user_role != 1) {
                            $("#profile_county > option").each(function() {
                                if (county_name == $(this).attr('data-county_name')) {
                                    $('#profile_county').val($(this).val()).trigger('change');
                                }
                            });
                        }

                        if (county_name == $(this).attr('data-county_name')) {
                            if ($(this).val() != current_county) {
                                county_alert = 1;
                            }
                        }

                    }

                }, 1000);

                $("#profile_latitude").val(place.geometry.location.lat().toFixed(4));
                $("#profile_longitude").val(place.geometry.location.lng().toFixed(4));


                $('#profile_address').val(address_new_data);

                if (login_user_role == 1) {
                    if (state_alert == 1 && county_alert == 1) {
                        showErrorToast('You can not select other states and county Address.');
                        $('#profile_address').val('');
                    } else if (state_alert == 0 && county_alert == 1) {
                        showErrorToast('You can not select other county Address.');
                        $('#profile_address').val('');
                    } else if (state_alert == 1 && county_alert == 0) {
                        showErrorToast('You can not select other states Address.');
                        $('#profile_address').val('');
                    }
                }

            });
        },500);
    }

    $(document).on('change', '#profile_state', function() {

        if ($('#profile_state').val() != '') {
            update_profile_show_loading();

            $.ajax({
                url: web_url + 'ajax/county-find',
                type: 'post',
                data: {
                    'state_id': $('#profile_state').val()
                },
                dataType: 'json',
                success: function(data) {
                    update_profile_hide_loading();
                    $('#profile_county').html(data.county_options);

                    if ((login_user_role == 2 || login_user_role == 4) && last_county_google !='') {
                        $("#profile_county > option").each(function() {
                            if (last_county_google == $(this).attr('data-county_name')) {
                                $('#profile_county').val($(this).val()).trigger('change');
                            }
                        });
                    }
                },
                error: function() {
                    update_profile_hide_loading();
                    showErrorToast('Something Went Wrong.');
                }
            });
        } else {
            $('#profile_county').html('<option value="">County</option>');
        }
    });

    $('#agent_card_label').change(function(event) {
        var reader = new FileReader();
        var file = this.files[0];
        reader.readAsDataURL(file);
        reader.onload = function() {
            ageny_img_resize(reader.result, function(resizeimage) {
                $('#imagePreviewArCard').attr('src', resizeimage);
            });
        };
    });

}

function setupProfileImageModal() {
    $('.image-editor').cropit({
        minZoom: 0,
        maxZoom: 3,
        initialZoom: 'image',
        imageBackgroundBorderWidth: [20, 20, 20, 20],
        smallImage: 'reject',
        imageState: {},
    });


    var zoomSlider = $('.image-editor').find('input.cropit-image-zoom-input');
    zoomSlider.attr({
        min: 0,
        max: 1,
        step: 0.01
    });

    $('.rotate-cw').click(function() {
        $('.image-editor').cropit('rotateCW');
    });

    $('.rotate-ccw').click(function() {
        $('.image-editor').cropit('rotateCCW');
    });

    $('.export').click(function() {
        var imageData = $('.image-editor').cropit('export');
        window.open(imageData);
    });

    $('#myfile').change(function(evt) {
        readURL(this);
    });

    $('#cropImage').on('click', function() {
        img_url = $('.image-editor').cropit('export', {
            type: 'image/png',
            width: 800,
            height: 800
        });
        $("input[name='raw_cropped_profile_img']").val(img_url);
        $('#imagePreview').attr('src', img_url);
    });

    $('#profile_image').on('shown.bs.modal', function() {

    }).on('hidden.bs.modal', function() {

    });
}
//Upload Images


function setupAgencyImageModal() {

    $('.agency-image-editor').cropit({
        minZoom: 0,
        maxZoom: 3,
        initialZoom: 'image',
        imageBackgroundBorderWidth: [20, 20, 20, 20],
        smallImage: 'reject',
        imageState: {},
    });


    var zoomSlider = $('.agency-image-editor').find('input.cropit-image-zoom-input');
    zoomSlider.attr({
        min: 0,
        max: 1,
        step: 0.01
    });

    $('.rotate-cw1').click(function() {
        $('.agency-image-editor').cropit('rotateCW');
    });

    $('.rotate-ccw1').click(function() {
        $('.agency-image-editor').cropit('rotateCCW');
    });

    $('.export').click(function() {
        var imageData = $('.agency-image-editor').cropit('export');
        window.open(imageData);
    });

    $('#agency_file').change(function(event) {
        var reader = new FileReader();
        var file = this.files[0];
        reader.readAsDataURL(file);
        reader.onload = function() {
            ageny_img_resize(reader.result, function(resizeimage) {
                $("input[name='raw_cropped_agency_img']").val(resizeimage);
                $('#agency_imagePreview').attr('src', resizeimage);
            }, '350', '105');
        };
    });

    $(document).ready(function() {
        $('#agency_imagePreview').removeAttr('height').removeAttr('width');
        $('#agency_imagePreview').css('max-width', '150px');
        $('#agency_imagePreview').css('max-height', '150px');
        $('#agency_imagePreview').css('height', 'auto');
        $('#agency_imagePreview').css('width', 'auto');
        var newCanvas = $('<canvas class="dynamic-canvas-ageny-img" id="dynamic-canvas" style="display: none; border:1px solid #000000;"></canvas>');
        $('body').append(newCanvas);
    });

    function previewFile() {
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();


        reader.addEventListener("load", function() {
            preview.src = reader.result;
        }, false);


        if (file) {
            reader.readAsDataURL(file);
        }
    }

    $('#cropImage1').on('click', function() {
        img_url = $('.agency-image-editor').cropit('export', {
            type: 'image/png',
            width: 800,
            height: 800
        });
        $("input[name='raw_cropped_agency_img']").val(img_url);
        $('#agency_imagePreview').attr('src', img_url);
    });

    $('#agency_image_modal').on('shown.bs.modal', function() {

    }).on('hidden.bs.modal', function() {

    });
}

function readURL1(input) {

    var url = input.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    var _URL = window.URL || window.webkitURL;

    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        uploadImage = 1;

        if ((file = input.files[0])) {
            img = new Image();
            img.onload = function() {
                if ((this.width == 250 && this.height == 250) || (this.width <= 250 && this.height <= 250)) {
                    $(".cropit-preview-background-container").css('display', 'none');
                }
                var filerdr = new FileReader();
                filerdr.onload = function(e) {
                    $('#image').attr('src', e.target.result);
                    $("#agency_image_modal").modal('show');
                };
                filerdr.readAsDataURL(input.files[0]);

            };

            img.onerror = function() {
                alert("not a valid file: " + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    }
}



// $(document).ready(function() {

//     if ($("#profile_office_number").length) {
//         document.getElementById("profile_office_number").addEventListener('input', function(e) {
//             var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
//             e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
//         });
//     }

//     var elMyFormInput = $("#profile_agent_bio");
//     tinymce.init({
//         selector: "#profile_agent_bio",
//         resize: "both",
//         menubar: false,
//         relative_urls: false,
//         plugins: ["autoresize", "image", "code", "lists", "code", "example", "link", "textcolor"],
//         indentation: '20pt',
//         file_browser_callback: function(field_name, url, type, win) {
//             if (type == 'image') elMyFormInput.click();
//         },
//         image_list: "/imglist",
//         toolbar: [
//             "undo redo       bold italic        alignleft aligncenter alignright    preview       forecolor backcolor"
//         ],
//         content_css: "/styles/Page.css, /styles/master.css, /styles/bootstrap.css"
//     });

// });
//Agency Images




//Web Site Click
$(document).on('click', '.web_site_request', function() {

    var current_btn = this;
    var website = $(current_btn).attr('data-website');
    var agent_id = $(current_btn).attr('data-agent_id');

    if (website) {
        window.open(website, '_blank');
    }
    // if (is_user_login == 0) {
    //
    //     openLoginPopup(function() {
    //         useraction = 'website_request';
    //         homeid = website;
    //         agentid = agent_id;
    //
    //         $('#login_modal').modal('show');
    //     });
    //
    // } else {
    //     ////console.log("hello");
    //     var homeid = $(current_btn).attr('data-homeid');
    //     var home_type = $('.' + homeid + '_div').attr('data-home_type');
    //
    //     if (typeof homeid === "undefined") {
    //         ////console.log("unde");
    //         var agenttype = $(current_btn).attr('data-agenttype');
    //         if (typeof agenttype === "undefined") {
    //             window.open(website, '_blank');
    //         } else {
    //             if (agenttype == 1 || agenttype == 3) {
    //                 ////console.log("its here");
    //                 if (website == '') {
    //                     showErrorToast("Agent has not added web site yet.");
    //                 } else {
    //                     window.open(website, '_blank');
    //                 }
    //             } else {
    //                 see_home_related_agents_popup_only(agenttype, 2);
    //             }
    //         }
    //     } else {
    //         ////console.log("notunde");
    //         ////console.log(home_type);
    //         if (home_type == 1 || home_type == 3) {
    //             ////console.log("first");
    //             window.open(website, '_blank');
    //         }
    //
    //         if (home_type == 0 || home_type == 2) {
    //             ////console.log("second");
    //             see_home_related_agents(homeid, home_type, 1);
    //         }
    //     }
    //
    //     $(current_btn).showLoading();
    //     $.ajax({
    //         url: web_url + 'ajax/website-count-add',
    //         type: 'post',
    //         //async:false,
    //         data: {
    //             'agent_id': agent_id,
    //         },
    //         dataType: 'json',
    //         success: function(data) {
    //             if (data.status == true) {
    //                 //showSuccessToast(data.message);
    //                 //var link_id = $(current_btn).attr('data-link_id');
    //                 //$("."+link_id).addClass('clicked');
    //                 //$("."+link_id).get(0).click();
    //                 //window.open(website, '_blank');
    //                 //redirectWindow.location;
    //             } else {
    //                 showErrorToast(data.message);
    //             }
    //             $(current_btn).hideLoading();
    //         },
    //         error: function() {
    //             $(current_btn).hideLoading();
    //             showErrorToast('Something Went Wrong.');
    //         }
    //     });
    //
    // }
    $(current_btn).showLoading();
    $.ajax({
        url: web_url + 'ajax/website-count-add',
        type: 'post',
        //async:false,
        data: {
            'agent_id': agent_id,
        },
        dataType: 'json',
        success: function(data) {
            if (data.status == true) {
                //showSuccessToast(data.message);
                //var link_id = $(current_btn).attr('data-link_id');
                //$("."+link_id).addClass('clicked');
                //$("."+link_id).get(0).click();
                //window.open(website, '_blank');
                //redirectWindow.location;
            } else {
                showErrorToast(data.message);
            }
            $(current_btn).hideLoading();
        },
        error: function() {
            $(current_btn).hideLoading();
            showErrorToast('Something Went Wrong.');
        }
    });

});
//Web Site Click

//btm links
$(document).on('click', '.btm-links', function() {

    var current_btn = this;
    var website = $(current_btn).attr('data-website');
    var agent_id = $(current_btn).attr('data-agent_id');

    ////console.log("hello");
    var homeid = $(current_btn).attr('data-homeid');
    var home_type = $('.' + homeid + '_div').attr('data-home_type');

    if (website) {
        window.open(website, '_blank');
    }

    $(current_btn).showLoading();
    $.ajax({
        url: web_url + 'ajax/website-count-add',
        type: 'post',
        //async:false,
        data: {
            'agent_id': agent_id,
        },
        dataType: 'json',
        success: function(data) {
            if (data.status == true) {
                //showSuccessToast(data.message);
                //var link_id = $(current_btn).attr('data-link_id');
                //$("."+link_id).addClass('clicked');
                //$("."+link_id).get(0).click();
                //window.open(website, '_blank');
                //redirectWindow.location;
            } else {
                showErrorToast(data.message);
            }
            $(current_btn).hideLoading();
        },
        error: function() {
            $(current_btn).hideLoading();
            showErrorToast('Something Went Wrong.');
        }
    });
});
//btm links

//Request Bio
$(document).on('click', '.request_non_member_agent', function() {

    if (!$(event.target).closest('.agent_except_btn').length) {
        var current_btn = this;
        var agent_id = $(current_btn).attr('data-agent_id');


        $.confirm({
            title: 'Are you sure, you want to Request bio for this agent?',
            content: '',
            buttons: {
                confirm: function() {

                    if (is_user_login == 0) {
                        openLoginPopup(function() {
                            useraction = 'contact_agent_request';
                            homeid = 0;
                            agentid = agent_id;
                            $('#sell_contact_agent_modal').modal('show');
                        });

                    } else {

                        $(current_btn).showLoading();

                        $.ajax({
                            url: web_url + 'ajax/request-agent-bio',
                            type: 'post',
                            data: {
                                'agent_id': agent_id,
                            },
                            dataType: 'json',
                            success: function(data) {
                                if (data.status == true) {
                                    showSuccessToast(data.message);
                                } else {
                                    showErrorToast(data.message);
                                }
                                $(current_btn).hideLoading();
                            },
                            error: function() {
                                $(current_btn).hideLoading();
                                showErrorToast('Something Went Wrong.');
                            }
                        });

                    }

                },
                cancel: function() {

                },
            }
        });
    }
});
//Request Bio

//see home for broucher
$(document).on('click', '.see_home_forbroucher', function(e) {
    var current_btn = this;

    var home_id = $(current_btn).attr('data-see_home_home_id');

    var home_type = $('.' + home_id + '_div').attr('data-home_type');
    var is_sample_page = $(current_btn).attr('data-is_sample_page');
    var main_agent_id = $(current_btn).attr('data-main_agent_id');
    //var current_btn = this;
    var home_property_id = $(current_btn).attr('data-see_home_home_id');

    if (is_user_login == 0 && restrict_nonsignin_user == 1) {

        openLoginPopup(function() {
            useraction = 'download_request';
            agentid = home_property_id;

            $('#login_modal').modal('show');
        });

    } else {
        $(current_btn).showLoading();
        $(current_btn).css('opacity', '0.7');
        $(current_btn).removeClass('see_home_forbroucher');
        e.preventDefault();
        if(brochure_pdf_stream){
            window.location.href=brochure_pdf_stream;

            if (home_type == 2) {
                see_home_related_agents(home_id, home_type, 1);
            }
            setTimeout(function() {
                $(current_btn).hideLoading();
                $(current_btn).css('opacity', '1');
                $(current_btn).addClass('see_home_forbroucher');
            }, 1500);
        }else{
            $.ajax({
                url: web_url + 'ajax/see-home-generate-broucher',
                type: 'post',
                //async:false,
                data: {
                    'home_id': home_property_id,
                    'uId':$("#user_info").val(),
                    'is_sample_page' :is_sample_page,
                    'main_agent_id':main_agent_id
                },
                dataType: 'json',
                success: function(data) {

                    if (data.status == true) {
                        //showSuccessToast(data.message);
                        // window.open(data.file_path, '_blank');
                        window.location.href=data.file_stream;
                    } else {
                        showErrorToast(data.message);
                    }
                    $(current_btn).hideLoading();

                    if (home_type == 2) {
                        see_home_related_agents(home_id, home_type, 1);
                    }

                    setTimeout(function() {
                        $(current_btn).css('opacity', '1');
                        $(current_btn).addClass('see_home_forbroucher');
                    }, 1500);
                },
                error: function() {
                    $(current_btn).hideLoading();
                    showErrorToast('Something Went Wrong.');
                }
            });
        }

    }
});
//see home for broucher


function ageny_img_resize(img, callbackFunction, maxWidth, maxHeight) {
    maxWidth = maxWidth || 1024;
    maxHeight = maxHeight || 768;
    var canvas = document.getElementById('dynamic-canvas');
    var context = canvas.getContext("2d");
    canvas.className = "dynamic-canvas-ageny-img";

    var image = new Image();
    image.onload = function() {
        if (this.width > maxWidth) {
            canvas.height = (maxWidth / this.width) * this.height;
            canvas.width = maxWidth;
        } else if (this.height > maxHeight) {
            canvas.width = (maxHeight / this.height) * this.width;
            canvas.height = maxHeight;
        } else {
            canvas.width = this.width;
            canvas.height = this.height;
        }

        context.drawImage(this, 0, 0, this.width, this.height, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        callbackFunction(dataURL);
    }
    image.src = img;
    return true;
}

var property_page_nonmember = "The agent who has listed this property is not a member agent of Hommati, but no worries, if you would like more information about this property or similar properties, please click Confirm below and we will be happy to provide you with the names of several agents that would be more than happy to assist you.";

var property_page_limitedmem = "The agent who has listed this property is not a Featured Agent of Hommati, but no worries, if you would like more information about this property or similar properties, please click Confirm below and we will be happy to provide you with the names of several agents that would be more than happy to assist you.";

var sell_findan_agent_page = "The agent who has listed this property is not a Featured Agent of Hommati, but no worries, if you would like more information about this property or similar properties, please click Back below and try clicking on another agent.";

function see_home_related_agents(home_id, agenttype, page) {
    ////console.log(home_id,agenttype,page);

    var popup_messsage = ''

    if (page == 1) { //property listing or property single pages
        if (agenttype == 2) { //nonmember
            popup_messsage = property_page_nonmember;
        }
        if (agenttype == 0) { //limitedmember
            popup_messsage = property_page_limitedmem;
        }
    }

    if (page == 2) { //sell or find an agent pages
        if (agenttype == 2) { //nonmember
            popup_messsage = sell_findan_agent_page;
        }
        if (agenttype == 0) { //limitedmember
            popup_messsage = sell_findan_agent_page;
        }
    }

    var home_url = $('.' + home_id + '_div').attr('data-home_url');

    $.confirm({
        title: popup_messsage,
        content: '',
        buttons: {
            confirm: function() {
                agents_list_url = web_url + 'find-my-home/' + home_url;
                window.open(agents_list_url, '_blank');
            },
            cancel: function() {

            },
        }
    });
}

function see_home_related_agents_popup_only(agenttype, page) {

    var popup_messsage = ''

    if (page == 2) { //sell or find an agent pages
        if (agenttype == 2) { //nonmember
            popup_messsage = sell_findan_agent_page;
        }
        if (agenttype == 0) { //limitedmember
            popup_messsage = sell_findan_agent_page;
        }
    }

    var isuser_search = $('#isuser_search').val();

    var searchpage = $('#search_page').val();


    var page_name = 'find-an-agent';

    if (searchpage == 2) {
        page_name = 'sell';
    }

    ////console.log(web_url+page_name+'?isuser_search='+isuser_search);

    $.confirm({
        title: popup_messsage,
        content: '',
        buttons: {
            Back: function() {
                location.href = web_url + page_name + '?isuser_search=' + isuser_search;
            },
            Close: function() {

            },
        }
    });
}
