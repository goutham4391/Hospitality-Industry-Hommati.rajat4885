var map = '';
var idList = [];
var mapBound = null;
var i, infowindow;
var markers = [];
var clustor_markers = [];
var markerBounds = '';
var openedInfowindow = null;
var is_map = true;
var markerCluster = null;
var map_called = 0;
var show_console_log = true;
var simultaneousMarkerCreationCount = 500;
var markerAddSleepDuration = 500;
var createdMarkersCount = 0;
var markersCreationInterval = null;
var isPageLoaded = false;
var listLoaded = false;
var mapLoaded = false;
var forcedSearch = false;
var originalInfowindowAjaxCall = null;
var open_house = 0;
var min_payment = 0;
var max_payment = 0;
var search_max_baths = 0;
var min_lot_size = 0;
var is_ter_search = 0;
var agent_id = 0;
var mapSearchAjax = '';
var advance_search_type = '';

var firstHomeSearch = true;

var forcefulSearch = false;

days_on_hommati=0;
days_on_hommati_start_date='';
days_on_hommati_end_date='';

$(document).ready(function() {
    home_Map_init();
    if ($(".map-search-filters-container").length) {
        settingFiltersValueInTheMap = true;
        /*$(".custom-filter-select").each(function(index, element) {
            $(element).trigger("change");
        });
        searchthreedmenu($(".threed-menu .active button")[0]);
        searchaerialmenu($(".aerial-menu .active button")[0]);*/
    }
    /*$('#search_max_price').trigger('change');
    $('#search_min_price').trigger('change');*/
    if (typeof MarkerClusterer !== 'undefined') {
        set_cluster();
    }

    $(document).on('click', '.search-pagination a', function(e) {
        e.preventDefault();
        var page = $(this).attr('href').split('page=')[1];
        $('.properties-list-cl').animate({
            scrollTop: 0
        }, '500', 'swing');
        $("#pageno").val(page);
        updatePageParams();
        advance_search_result(page, 0);
    });
});

$(document).ready(function() {

    $("#search_garage,#search_sqft,#search_beds,#search_national_radius").select2({
        tags: true,
        dropdownAutoWidth : true,
        width: 'auto',
        createTag: function(params) {
            return {
                id: params.term,
                text: params.term,
                newOption: true
            }
        }
    });
});

function home_Map_init() {
    var mapProp = {
        zoom: 4,
        center: new google.maps.LatLng(37.0902, -95.7129),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    map = new google.maps.Map(document.getElementById("home_properties_map"), mapProp);
    infowindow = new google.maps.InfoWindow();
    markerBounds = new google.maps.LatLngBounds();
}

function addMarkerToMap(lat, lng, html, id, name, is_not_featured, link) {
    randomPoint = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: randomPoint,
        title: name,
        icon: web_url + "public/images/hommati-icon.png",
    });

    //Default Value
    link = link || '';

    markerBounds.extend(randomPoint);

    var infowindow = new google.maps.InfoWindow({
        content: html,
        own_redirection: link,
        home_id: id,
    });

    marker.addListener('click', function() {
        window.location.href = infowindow.own_redirection;
    });

    markers.push(marker);
    if (is_not_featured == 1) {
        clustor_markers.push(marker);
        if (markerCluster) {
            markerCluster.addMarker(marker, true);
        }
    } else {
        marker.setMap(map);
    }
    idList.push(parseInt(id));

    marker.addListener('mouseover', function() {
        if (openedInfowindow) {
            openedInfowindow.close();
        }

        infowindow.open(map, this);
        if (!infowindow.content) {
            if (originalInfowindowAjaxCall) {
                originalInfowindowAjaxCall.abort();
            }
            originalInfowindowAjaxCall = $.ajax({
                type: "POST",
                url: web_url + 'ajax/get-property-infowindow-html',
                dataType: 'json',
                data: {
                    'home_id': infowindow.home_id,
                },
                success: function(result) {
                    if (result.status) {
                        infowindow.setContent(result.html);
                        var marke_img_id = '#marker_img_' + infowindow.home_id;
                        if ($(marke_img_id).length && $(marke_img_id).attr('src') == "") {
                            $(marke_img_id).attr("src", $(marke_img_id).attr("data-img"));
                        }
                    } else {
                        showErrorToast(result.message);
                    }
                    originalInfowindowAjaxCall = null;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (textStatus && textStatus != 'abort') {
                        showErrorToast('Something Went Wrong.');
                    }
                    originalInfowindowAjaxCall = null;
                }
            });
        }
        var marke_img_id = '#marker_img_' + infowindow.home_id;
        if ($(marke_img_id).length && $(marke_img_id).attr('src') == "") {
            $(marke_img_id).attr("src", $(marke_img_id).attr("data-img"));
        }
        openedInfowindow = infowindow;

    });

    marker.addListener('mouseout', function() {
        if (openedInfowindow) {
            openedInfowindow.close();
        }
    });

}


function set_cluster() {

    setTimeout(function() {
        markerCluster = new MarkerClusterer(map, clustor_markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    }, 1000);
}

function append_cluster() {

    setTimeout(function() {
        markerCluster = new MarkerClusterer(map, clustor_markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    }, 2000);
}

$(document).on('mouseenter', '.marker_home', function() {
    if (map_called == 1) {
        idIndex = $.inArray(parseInt($(this).attr('data-id')), idList);
        if (idIndex != -1) {
            google.maps.event.trigger(markers[idIndex], 'mouseover');
            var latLng = markers[idIndex].getPosition();
            map.setCenter(latLng);
        }
    }
});
$(document).on('mouseover', '.marker_home', function() {
    if (map_called == 1) {
        idIndex = $.inArray(parseInt($(this).attr('data-id')), idList);
        if (idIndex != -1) {
            google.maps.event.trigger(markers[idIndex], 'mouseover');
            var latLng = markers[idIndex].getPosition();
            map.setCenter(latLng);
        }
    }
});
$(document).on('mouseout', '.marker_home', function() {
    if (map_called == 1) {
        if (openedInfowindow) {
            openedInfowindow.close();
        }
    }
});

function searchNotCanceled() {
    $('#advanced_serch_submit').val('Search');
    $('#advanced_serch_submit').removeClass('cancel');
}

$(document).on('click', '#clear_search_field', function() {
    if($('#db_advance_city').length)
        $('#db_advance_city').val('');
    else
    $('#advance_city').val('');
    $('#filter_search_state').val('');
    $('#filter_search_county').val('');
    $('#filter_search_city').val('');
    $('#filter_search_city_short').val('');
    $('#filter_search_zipcode').val('');
    $('#filter_search_lat').val('');
    $('#filter_search_long').val('');
    // $('#search_national_radius').val(0).trigger('change');
    Isgooglesearch = false;
    advance_search_address = '';

});

$(document).on('click', '#advanced_serch_submit', function() {
    if (!forcedSearch) {
        is_ter_search = 0;
        mapLoaded = false;
        listLoaded = false;
    }

    if (!firstHomeSearch) {
        if ($('#advanced_serch_submit').hasClass('cancel')) {
            $('#clear_search_field').click();
            if (showResetFilterMessage) {
                showResetFilterMessage = false;
            }

            $('#reset_filters').click();

            $('#advanced_serch_submit').removeClass('cancel');

            if (mapSearchAjax) {
                mapSearchAjax.abort();
            }
            updatePageParams();

            return false;
        }

        $('#advanced_serch_submit').addClass('cancel');
        $('#advanced_serch_submit').val('Cancel');
    } else {
        $('#advanced_serch_submit').prop("disabled", true);
    }

    updatePageParams(); //url update

    map_called = 0;
    if (typeof page === 'undefined') {
        page = 0;
    }
    advance_search_result(page, 1);
});



$(document).on("change", "#search_days_on_hommati", function() {
   if($(this).val() != ''){ 
       if($(this).val() != 2){
         if (typeof page === 'undefined') {
            page = 0;
        }
        updatePageParams();
        advance_search_result(page, 1);
       }
   }
 
});

$(document).on("change", "#days_on_datefromfilter", function() {
   if($(this).val() != '' && $('#days_on_datetofilter').val() != ''){ 
      $("#advanced_serch_submit").trigger('click');
   }
   $("#days_on_datetofilter").prop("min", $(this).val());
});
$(document).on("change", "#days_on_datetofilter", function() {
  if($('#days_on_datefromfilter').val() == ''){
    showErrorToast('Please Select From date first.');
    $(this).val('');
  }
  else{
   if($(this).val() != '' && $('#days_on_datefromfilter').val() != ''){ 
      $("#advanced_serch_submit").trigger('click');
   }
  }  
});


function advance_search_result(page, first_time) {
    if(!$("#advance_city").val() && !agent_id && !forcefulSearch){
        searchNotCanceled();
        $('#advanced_serch_submit').prop("disabled", false);
        showErrorToast('Please click on your desired search from the Google Suggestions dropdown.');
        return;
    }

    firstHomeSearch = false;
    if ($('#list_properties_listing').is(":visible")) {
        $('#list_properties_listing .container-fluid').showLoading();
    }
    if (map_called == 0) {
        if (is_map == true) {
            $('.fullmap').showLoading();
        }
    }
    if (map_called == 0) {
        if (is_map == true) {
            properties_on_map_load();
        }
    }
    isPageLoaded = true;
    forcefulSearch=false;
    if(advance_search_city=='' && advance_state=='' && $("#db_advance_city").val() !='' && $("#db_advance_city").val()){
        string_searched=$("#db_advance_city").val();
    }
    mapSearchAjax = $.ajax({
        type: "POST",
        url: web_url + 'ajax/map-search-result',
        dataType: 'json',
        data: {
            'state': advance_state,
            'county': advance_county,
            'zipcod': advance_zipcode,
            'city': advance_search_city,
            'search_type': advance_search_type,
            'city_short': advance_search_city_short,
            'lat': advance_lat,
            'long': advance_long,
            'price_from': advance_price_from,
            'price_to': advance_price_to,
            'beds': advance_beds,
            'baths': advance_baths,
            'sqft': advance_sqft,
            'sqft_man': advance_sqft_man,
            'garage': advance_garage,
            'search_3d': advance_search_3d,
            'select_aerial': advance_select_aerial,
            'national_radius': advance_national_radius,
            'page': page,
            'is_map': is_map,
            'usa_latitude': usa_latitude,
            'usa_longitude': usa_longitude,
            'advance_search_address': advance_search_address,
            'payment_from': min_payment, //new
            'payment_to': max_payment, //new
            'max_baths': search_max_baths, //new
            'min_lot_size': min_lot_size, //new
            'is_ter_search': is_ter_search, //new
            'agent_id': agent_id,
            'open_house':open_house,
            'string_searched':string_searched,
            'days_on_hommati': $('#search_days_on_hommati').val(),
            'days_on_hommati_start_date': $('#days_on_datefromfilter').val(),
            'days_on_hommati_end_date': $('#days_on_datetofilter').val()
        },
        success: function(result) {
            //console.log('Success');
            forcedSearch = false;
            if (first_time == 1) {
                if (result.no_franchise_founded == true) {
                    $.alert({
                        title: 'No Franchise Found',
                        content: noFranchiseFoundMessage,
                    });

                    if($("#db_advance_city").length){
                        $('#db_advance_city').val('');
                        $('#db_advance_city').attr('title', '');
                    }
                    $('#advance_city').val('');
                    $('#advance_city').attr('title', '');
                    $('#filter_search_state').val('');
                    $('#filter_search_city').val('');
                    $('#filter_search_city_short').val('');
                    $('#filter_search_county').val('');
                    $('#filter_search_zipcode').val('');
                    $('#filter_search_lat').val(usa_latitude);
                    $('#filter_search_long').val(usa_longitude);
                    $("#search_open_house").val(open_house);

                    $("#search_days_on_hommati").val(days_on_hommati);
                    $("#days_on_datefromfilter").val(days_on_hommati_start_date);
                    $("#days_on_datetofilter").val(days_on_hommati_end_date);

                    // $('#search_national_radius').val(0).trigger('change');
                    advance_lat = usa_latitude;
                    advance_long = usa_longitude;
                    advance_national_radius = 0;
                    advance_search_address = '';
                } else if (result.no_franchise_founded == false && result.home_list_count == 0) {
                    if (!is_ter_search && result.franchise_listing_count != 0) {
                        $.confirm({
                            title: 'We’re sorry we do not have any homes in that exact search so we are delivering all homes that are listed near your search.',
                            content: '',
                            buttons: {
                                Ok: function() {
                                    is_ter_search = 1;
                                    showResetFilterMessage = false;
                                    $("#reset_filters").trigger("click");
                                    forcefulSearch=true;
                                    advance_search_result(1, 1);
                                }
                            }
                        });
                    } else {
                        $.confirm({
                            title: 'We\'re sorry, we do not currently have a franchisee serving that market so we do not have agents and/or listings available in that area.  For now, we will show you all the listings on a national basis.  If you are interested in possibly opening a franchise in this market, please click the link below to go to the franchise opportunity page. <br> <a href="https://www.hommati.com/top-franchise-opportunity">Top Franchise Opportunity</a> <br>Thank you.',
                            content: '',
                            buttons: {
                                Ok: function() {
                                    if($("#db_advance_city").length){
                                        $('#db_advance_city').val('');
                                        $('#db_advance_city').attr('title', '');
                                    }
                                    $('#advance_city').val('');
                                    $('#advance_city').attr('title', '');
                                    $('#filter_search_state').val('');
                                    $('#filter_search_city').val('');
                                    $('#filter_search_city_short').val('');
                                    $('#filter_search_county').val('');
                                    $('#filter_search_zipcode').val('');
                                    $('#filter_search_agentid').val('');
                                    $('#filter_search_lat').val(usa_latitude);
                                    $('#filter_search_long').val(usa_longitude);
                                    // $('#search_national_radius').val(0).trigger('change');
                                    advance_lat = usa_latitude;
                                    advance_long = usa_longitude;
                                    advance_national_radius = 0;
                                    advance_search_address = '';
                                    showResetFilterMessage = false;
                                    $("#reset_filters").trigger("click");
                                    forcefulSearch=true;
                                    // $("#advanced_serch_submit").trigger('click');
                                }
                            }
                        });
                    }
                }
            }

            if (first_time == 1) {
                // //console.log("11111",string_searched);
                if (result.reset_filtters == true && !is_ter_search) {
                    //console.log("2222");

                    if($("#db_advance_city").length && string_searched=='' ){
                        $('#db_advance_city').val('');
                        $('#db_advance_city').attr('title', '');
                    }

                    $('#advance_city').val('');
                    $('#advance_city').attr('title', '');
                    $('#filter_search_state').val('');
                    $('#filter_search_city').val('');
                    $('#filter_search_city_short').val('');
                    $('#filter_search_county').val('');
                    $('#filter_search_zipcode').val('');
                    $('#filter_search_lat').val(usa_latitude);
                    $('#filter_search_long').val(usa_longitude);
                    // $('#search_national_radius').val(0).trigger('change');
                    advance_lat = usa_latitude;
                    advance_long = usa_longitude;
                    advance_national_radius = 0;
                    advance_search_address = '';
                }
            }

            next_load = 0;
            next_page = 1;

            if (result.has_more_pages == true) {
                next_load = 1;
                next_page = result.next_page_number;
            }

            $('#loadingaction').val(next_load);
            $('#seq').val(next_page);

            if (is_map == true) {
                $('.properties-list-cl').html('');
                $('.properties-list-cl').html(result.html);
                mapLoaded = true;
            } else {
                $('.list-cl').html('');
                $('.list-cl').html(result.html);
                listLoaded = true;
            }
            $('.properties-list-cl').hideLoading();
            $('#list_properties_listing .container').hideLoading();
            searchNotCanceled();

            $('#advanced_serch_submit').prop("disabled", false);

            $('html, body').animate({
                'scrollTop': 0
            });

            if (result.show_login_popup) {
                openLoginPopup(function() {
                    $("#login_modal").modal("show");
                });
            }

        },
        error: function(request, textStatus) {
            forcedSearch = false;
            if (textStatus !== 'abort') {
                showErrorToast('Something Went Wrong.');
            }

            //         $('#advanced_serch_submit').hideLoading();
            $('#advanced_serch_submit').prop("disabled", false);
            $('.properties-list-cl').hideLoading();
            $('#list_properties_listing .container').hideLoading();
            searchNotCanceled();
        }
    });
}


function refreshMap() {
    if (markers && markerCluster) {
        $.each(markers, function(index, marker) {
            marker.setMap(null);
        });

        markerCluster.removeMarkers(markers);

        markers = [];
        clustor_markers = [];
        idList = [];
    }
    markerBounds = new google.maps.LatLngBounds();

    var iw = new google.maps.InfoWindow();
}

function clean_map() {
    if (markers && markerCluster) {
        markerCluster.clearMarkers();
    }

    var iw = new google.maps.InfoWindow();
}

function updatePageParams() {
    var additional_para = '?';
    var isMobile = (window.innerWidth && window.innerWidth > 767) ? 0 : 1;

    // if(db_search==1){
        advance_address = $('#db_advance_city').val();
    /*}else{
        advance_address = $('#advance_city').val();
    }*/

    // advance_address = $('#advance_city').val();
    searched_address = $('#searched_address').val();
    advance_state = $('#filter_search_state').val();
    advance_county = $('#filter_search_county').val();
    advance_search_city = $('#filter_search_city').val();
    advance_search_type = $('#filter_search_type').val();
    advance_search_city_short = $('#filter_search_city_short').val();
    advance_zipcode = $('#filter_search_zipcode').val();
    advance_lat = $('#filter_search_lat').val();
    advance_long = $('#filter_search_long').val();
    advance_price_from = $('#search_min_price').val();
    advance_price_to = $('#search_max_price').val();
    min_payment = $('#search_min_payment').val();
    max_payment = $('#search_max_payment').val();
    agent_id = $('#filter_search_agentid').val();
    open_house = $("#search_open_house").val();
    db_search=$("#db_search").val();
    string_searched='';
    string_searched=$("#string_searched").val();

    days_on_hommati=$("#search_days_on_hommati").val();
    days_on_hommati_start_date=$("#days_on_datefromfilter").val();
    days_on_hommati_end_date=$("#days_on_datetofilter").val();

    /*if(advance_state=='' && advance_search_city=='' && advance_address !=''){
        string_searched = advance_address;
    } */

    if (!isMobile) {
        advance_beds = $('#search_beds').val();
    } else {
        advance_beds = $('#search_beds').val();
    }

    if (!isMobile) {
        advance_baths = $('#search_baths').val();
    } else {
        advance_baths = $('#search_baths').val();
    }

    search_max_baths = $('#search_max_baths').val();
    min_lot_size = $('#search_min_lot').val();

    if (!isMobile) {
        advance_sqft = $('#search_sqft').val();
        advance_sqft_man = $('#search_sqft option:selected').attr('data-is_system');
        if (typeof advance_sqft_man !== "undefined") {
            advance_sqft_man = 0;
        } else {
            advance_sqft_man = 1;
        }
    } else {
        advance_sqft = $('#search_sqft').val();
        advance_sqft_man = $('#search_sqft option:selected').attr('data-is_system');
        if (typeof advance_sqft_man !== "undefined") {
            advance_sqft_man = 0;
        } else {
            advance_sqft_man = 1;
        }
    }

    if (!isMobile) {
        advance_garage = $('#search_garage').val();
    } else {
        advance_garage = $('#search_garage').val();
    }

    if (!isMobile) {
        advance_search_3d = $('#search_3d').val();
    } else {
        advance_search_3d = $('#search_3d').val();
    }

    if (!isMobile) {
        advance_select_aerial = $('#select_aerial').val();
    } else {
        advance_select_aerial = $('#select_aerial').val();
    }

    advance_national_radius = $('#search_national_radius').val();

    $('.properties-list-cl').animate({
        scrollTop: 0
    }, '500', 'swing');

    //url update
    if (is_map == false) {
        additional_para = additional_para.concat('&list-view=true');
    }
    if(db_search==1){
        if ($('#db_advance_city').val() != '') {
            additional_para = additional_para.concat('&address=' + $('#db_advance_city').val());
            additional_para = additional_para.concat('&address-title=' + $('#db_advance_city').val());;
        }
    }else{
        if ($('#advance_city').val() != '') {
            additional_para = additional_para.concat('&address=' + $('#advance_city').val());
            additional_para = additional_para.concat('&address-title=' + $('#advance_city').attr('title'));
        }
    }
    if ($('#searched_address').val() != '') {
        additional_para = additional_para.concat('&searched_address=' + $('#searched_address').val());
    }
    if ($('#filter_search_state').val() != '') {
        additional_para = additional_para.concat('&state=' + $('#filter_search_state').val());
    }
    if ($('#filter_search_county').val() != '') {
        additional_para = additional_para.concat('&county=' + $('#filter_search_county').val());
    }
    if ($('#filter_search_city').val() != '') {
        additional_para = additional_para.concat('&city=' + $('#filter_search_city').val());
    }

    if ($('#filter_search_type').val() != '') {
        additional_para = additional_para.concat('&search_type=' + $('#filter_search_type').val());
    }

    if ($('#filter_search_city').val() == '' && $('#filter_search_state').val() == '') {
        if($('#db_advance_city').val() != ''){
            // string_searched=1;
            additional_para = additional_para.concat('&string_searched=' + $('#db_advance_city').val());
        }else if($('#string_searched').val() != ''){
            additional_para = additional_para.concat('&string_searched=' + $('#string_searched').val());
        }
    }
    if ($('#filter_search_city_short').val() != '') {
        additional_para = additional_para.concat('&city-short=' + $('#filter_search_city_short').val());
    }
    if ($('#filter_search_zipcode').val() != '') {
        additional_para = additional_para.concat('&zipcode=' + $('#filter_search_zipcode').val());
    }
    if ($('#filter_search_lat').val() != '') {
        additional_para = additional_para.concat('&latitude=' + $('#filter_search_lat').val());
    }
    if ($('#filter_search_long').val() != '') {
        additional_para = additional_para.concat('&longitude=' + $('#filter_search_long').val());
    }
    if ($('#search_min_price').val() != 0) {
        additional_para = additional_para.concat('&min-price=' + $('#search_min_price').val());
    }
    if ($('#search_max_price').val() != 0) {
        additional_para = additional_para.concat('&max-price=' + $('#search_max_price').val());
    }
    if ($('#search_beds').val() != 0) {
        additional_para = additional_para.concat('&beds=' + $('#search_beds').val());
    }
    if ($('#search_baths').val() != 0) {
        additional_para = additional_para.concat('&baths=' + $('#search_baths').val());
    }
    if ($('#search_sqft').val() != 0) {
        additional_para = additional_para.concat('&sqft=' + $('#search_sqft').val());
    }
    if ($('#pageno').val() != 0) {
        additional_para = additional_para.concat('&page=' + $('#pageno').val());
    }
    if ($('#filter_search_agentid').val() != 0) {
        additional_para = additional_para.concat('&agent_id=' + $('#filter_search_agentid').val());
    }

    if (!isMobile) {
        advance_sqft_man = $('#search_sqft option:selected').attr('data-is_system');
        if (typeof advance_sqft_man !== "undefined") {
            additional_para = additional_para.concat('&sqft_type=0');
        } else {
            additional_para = additional_para.concat('&sqft_type=1');
        }

    } else {
        advance_sqft = $('#search_sqft').val();
        advance_sqft_man = $('#search_sqft option:selected').attr('data-is_system');
        if (typeof advance_sqft_man !== "undefined") {
            additional_para = additional_para.concat('&sqft_type=0');
        } else {
            additional_para = additional_para.concat('&sqft_type=1');
        }
    }

    if ($('#search_garage').val() != 0) {
        additional_para = additional_para.concat('&garage=' + $('#search_garage').val());
    }
    if ($('#search_3d').val() != 0) {
        additional_para = additional_para.concat('&3d=' + $('#search_3d').val());
    }
    if ($('#select_aerial').val() != 0) {
        additional_para = additional_para.concat('&aerial=' + $('#select_aerial').val());
    }
    if ($('#search_national_radius').val() != 0) {
        additional_para = additional_para.concat('&radius=' + $('#search_national_radius').val());
    }

    if (search_max_baths) {
        additional_para = additional_para.concat('&max-baths=' + search_max_baths);
    }

    if (min_lot_size) {
        additional_para = additional_para.concat('&min-lot=' + min_lot_size);
    }

    if (min_payment) {
        additional_para = additional_para.concat('&min-payment-price=' + min_payment);
    }

    if (max_payment) {
        additional_para = additional_para.concat('&max-payment-price=' + max_payment);
    }
    if (open_house == 1) {
            additional_para = additional_para.concat('&open-house=1');
    }

    additional_para = additional_para.concat('&days-on-hommati=' + $("#search_days_on_hommati").val());
    additional_para = additional_para.concat('&days-on-hommati-start-date=' + $("#days_on_datefromfilter").val());
    additional_para = additional_para.concat('&days-on-hommati-to-date=' + $("#days_on_datetofilter").val());


    if (db_search == 1) {
        additional_para = additional_para.concat('&db_search=1');
    }
    processAjaxData('', additional_para);
}

$(document).on('change', '#search_days_on_hommati', function() {
    $("#search_days_on_hommati option").each(function() {
        if ($(this).hasClass('own_selected_val')) {
            if (!$(this).is(':selected')) {
                $(this).remove();
            }
        }
    });
});

$(document).on('change', '#search_min_price', function() {
    $("#search_min_price option").each(function() {
        if ($(this).hasClass('own_selected_val')) {
            if (!$(this).is(':selected')) {
                $(this).remove();
            }
        }
    });
});

$(document).on('change', '#search_max_price', function() {
    $("#search_max_price option").each(function() {
        if ($(this).hasClass('own_selected_val')) {
            if (!$(this).is(':selected')) {
                $(this).remove();
            }
        }
    });
});

$(document).on('change', '#search_beds', function() {
    $("#search_beds option").each(function() {
        if ($(this).hasClass('own_selected_val')) {
            if (!$(this).is(':selected')) {
                $(this).remove();
            }
        }
    });
});

$(document).on('change', '#search_baths', function() {
    $("#search_baths option").each(function() {
        if ($(this).hasClass('own_selected_val')) {
            if (!$(this).is(':selected')) {
                $(this).remove();
            }
        }
    });
});

$(document).on('change', '#search_sqft', function() {
    $("#search_sqft option").each(function() {
        if ($(this).hasClass('own_selected_val')) {
            if (!$(this).is(':selected')) {
                $(this).remove();
            }
        }
    });
});

$(document).on('change', '#search_garage', function() {
    $("#search_garage option").each(function() {
        if ($(this).hasClass('own_selected_val')) {
            if (!$(this).is(':selected')) {
                $(this).remove();
            }
        }
    });
});


$(document).on('change', '#search_national_radius', function() {
    $("#search_national_radius option").each(function() {
        if ($(this).hasClass('own_selected_val')) {
            if (!$(this).is(':selected')) {
                $(this).remove();
            }
        }
    });
});

// $(document).on('change', '#modal-search_beds', function() {
//     $("#modal-search_beds option").each(function() {
//         if ($(this).hasClass('own_selected_val')) {
//             if (!$(this).is(':selected')) {
//                 $(this).remove();
//             }
//         }
//     });
// });

// $(document).on('change', '#modal-search_baths', function() {
//     $("#modal-search_baths option").each(function() {
//         if ($(this).hasClass('own_selected_val')) {
//             if (!$(this).is(':selected')) {
//                 $(this).remove();
//             }
//         }
//     });
// });

// $(document).on('change', '#modal-search_sqft', function() {
//     $("#modal-search_sqft option").each(function() {
//         if ($(this).hasClass('own_selected_val')) {
//             if (!$(this).is(':selected')) {
//                 $(this).remove();
//             }
//         }
//     });
// });

// $(document).on('change', '#modal-search_sqft', function() {
//     $("#modal-search_sqft option").each(function() {
//         if ($(this).hasClass('own_selected_val')) {
//             if (!$(this).is(':selected')) {
//                 $(this).remove();
//             }
//         }
//     });
// });

// $(document).on('change', '#modal-search_garage', function() {
//     $("#modal-search_garage option").each(function() {
//         if ($(this).hasClass('own_selected_val')) {
//             if (!$(this).is(':selected')) {
//                 $(this).remove();
//             }
//         }
//     });
// });

$(document).on('click', '#map_view_btn', function() {
    var seq = $('#seq').val();
    $('#map_properties_listing').css('display', 'none');
    $('#list_properties_listing').css('display', 'block');
    $('body').addClass('scrollon');
    $('body').removeClass('mapview');
    is_map = false;
    if (!isPageLoaded || !listLoaded) {
        forcedSearch = true;

        $('#advanced_serch_submit').trigger('click');
    }
    updatePageParams();
    $('footer').css('display', 'block');
    $('.main-footer').css('display', 'block');
    $('#map_view_btn').hide();
    $('#list_view_btn').show();
});

$(document).on('click', '#list_view_btn', function() {
    // var seq = document.getElementById('seq').value;
    var seq = $('#seq').val();

    setTimeout(function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    }, 250);

    $('#map_properties_listing').css('display', 'block');
    $('#list_properties_listing').css('display', 'none');
    $('body').removeClass('scrollon');
    $('body').addClass('mapview');
    is_map = true;

    if (!isPageLoaded || !mapLoaded) {
        forcedSearch = true;

        $('#advanced_serch_submit').trigger('click');
    }
    updatePageParams();
    if (map && markerBounds) {
        map.fitBounds(markerBounds);
        map.setCenter(markerBounds.getCenter());
    }
    $('footer').css('display', 'none');
    $('.main-footer').css('display', 'none');
    $('#map_view_btn').show();
    $('#list_view_btn').hide();
});

function processAjaxData(response, urlPath) {
    window.history.pushState({
        "html": response.html,
        "pageTitle": response.pageTitle
    }, "", urlPath);
}

$(document).on('click', '.home_single_page_link', function() {
    localStorage.setItem("search_url", window.location.href);
    var move_to = $(this).attr('data-link');
    window.location.href = move_to;
});

function properties_on_map_load() {
    var homeListIds = $("#searched-home-list-ids").val();
    refreshMap();
    $('.fullmap').showLoading();
    if (show_console_log) {
        customConsoleLog("markers fetch call started on " + $.now());
        customConsoleLog($("#searched-home-list-ids"));
    }

    if(advance_search_city=='' && advance_state=='' && $("#db_advance_city").val() !='' && $("#db_advance_city").val()){
        string_searched=$("#db_advance_city").val();
    }

    $.ajax({
        type: "POST",
        url: web_url + 'ajax/map-search-markers',
        dataType: 'json',
        data: {
            'state': advance_state,
            'county': advance_county,
            'zipcod': advance_zipcode,
            'city': advance_search_city,
            'search_type': advance_search_type,
            'city_short': advance_search_city_short,
            'lat': advance_lat,
            'long': advance_long,
            'price_from': advance_price_from,
            'price_to': advance_price_to,
            'beds': advance_beds,
            'baths': advance_baths,
            'sqft': advance_sqft,
            'sqft_man': advance_sqft_man,
            'garage': advance_garage,
            'search_3d': advance_search_3d,
            'select_aerial': advance_select_aerial,
            'national_radius': advance_national_radius,
            'usa_latitude': usa_latitude,
            'usa_longitude': usa_longitude,
            'advance_search_address': advance_search_address,
            'home_list_ids': homeListIds,
            'payment_from': min_payment, //new
            'payment_to': max_payment, //new
            'max_baths': search_max_baths, //new
            'min_lot_size': min_lot_size, //new
            'is_ter_search': is_ter_search, //new
            'string_searched':string_searched

        },
        success: function(result) {
            if (show_console_log) {
                customConsoleLog("markers fetch call ended and marker creation began at " + $.now());
            }
            createdMarkersCount = 0;
            if (markersCreationInterval) {
                markersCreationInterval = null;
            }

            $('.fullmap').hideLoading();
            $('.map-loader-container').show();
            var oldTime = $.now();
            var startTime = $.now();
            markersCreationInterval = setInterval(function() {
                var currentSet = result.slice(createdMarkersCount, createdMarkersCount + simultaneousMarkerCreationCount);
                customConsoleLog("next bunch of " + createdMarkersCount + " " + ((oldTime - $.now()) / 1000));
                oldTime = $.now();
                $.each(currentSet, function(index, resultObj) {
                    addMarkerToMap(resultObj.latitude, resultObj.longitude, resultObj.html, resultObj.id, '', resultObj.is_fea, resultObj.add);
                });
                if (!createdMarkersCount) {
                    setTimeout(function() {
                        map_called = 1;
                    }, 300);
                }
                map.fitBounds(markerBounds);
                map.setCenter(markerBounds.getCenter());
                $('.fullmap').hideLoading();
                createdMarkersCount += currentSet.length;
                if (createdMarkersCount == result.length) {
                    var endTime = $.now();
                    $('.map-loader-container').hide();
                    clearInterval(markersCreationInterval);
                    markersCreationInterval = null;
                    customConsoleLog("End duration", ((endTime - startTime) / 1000) + " seconds");
                    map.fitBounds(markerBounds);
                    map.setCenter(markerBounds.getCenter());
                    if (show_console_log) {
                        customConsoleLog("markers creation ended on " + $.now() + " with markerBounds ", markerBounds, " and center ", markerBounds.getCenter());
                    }
                }
            }, markerAddSleepDuration);

        },
        error: function() {
            showErrorToast('Something Went Wrong.');
            $('.fullmap').hideLoading();
        }
    });
}
