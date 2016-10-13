var active_zoom;
var active_zoom_slide = 0;
var tab_index = 0;
var tab_title = "info";
var zoomed = false;



var $panzoom = $(".svg_landscape").panzoom({
    panOnlyWhenZoomed: true,
    onPan: function() {
        if (zoomed == false) {
            $panzoom.panzoom("reset");
        }
        console.log("Zoomed: " + zoomed);
    },
});


$(document).ready(function() {
    $(".svg_landscape").css("-webkit-user-select", "none");
    $(".zoomedIn_container").fadeOut(0);
    $(".btn-back").fadeOut(0);
    $('.btn').button();
    $('.btn-view-toggle').click(clickedToggle);
    $('li').click(toogleZoomTab);

    $(".carousel-control").click(clickedCarousel);


    detaljer();

    $('.btn_info_gfx').on('click touchstart', function(e) {

        active_zoom = $('.btn_info_gfx').index(this)
            //        active_zoom = $(this).index("detalje_label");
        console.log("as: " + active_zoom);
        if (e.type == 'click') {
            console.log('Mouse Click');
            zoomIn(e);
            console.log('Mouse: ' + touch);
        } else {
            var touch = e.originalEvent.touches[0];
            zoomIn(touch);
            console.log('Touch: ' + touch);
        }
    });


});

function init() {
    console.log(jsonData);
}

function clickedToggle() {

    var indeks = $(this).index(".btn-view-toggle");
    $(".btn-view-toggle").removeClass("vuc-primary-active")
    $(this).addClass("vuc-primary-active");

    if (indeks == 0) {
        $(".png_overlay").remove();
        $(".svg_landscape").append("<img class='img-responsive png_overlay' src='svg/pile_overlay.png'>");
        $(".detalje_container").hide();
    } else if (indeks == 1) {
        $(".png_overlay").remove();
        $(".svg_landscape").append("<img class='img-responsive png_overlay' src='svg/sfaerer_overlay.png'>");
        $(".detalje_container").hide();

        console.log("vis sfærer!");
    } else if (indeks == 2) {
        $(".png_overlay").remove();
        $(".detalje_container").show();

    }

}

function detaljer() {
    $(".svg_landscape").append("<div class='detalje_container'></div>");
    for (var i = 0; i < jsonData.zoom_punkter.length; i++) {
        var zp = jsonData.zoom_punkter[i];
        console.log(i + " punkt");

        $(".detalje_container").append("<span class='btn btn-xs btn-default detalje_label btn_info_gfx'><span class='glyphicon glyphicon-search'> </span> " + jsonData.zoom_punkter[i].header + "</span>");
        $(".detalje_container").append("<div ><img class='img-responsive gif' src=" + zp.simple_gif + "></div>");

        $(".detalje_label").eq(i).css("left", zp.label_position[0] + "%").css("top", zp.label_position[1] + "%")
        $(".gif").eq(i).css("left", zp.simplegif_position[0] + "%").css("top", zp.simplegif_position[1] + "%")
    }
}

function toogleZoomTab() {
    var indeks = $(this).index();
    tab_index = indeks;
    console.log("TZT" + tab_index);
    $(".exp_tekst").slideUp(200, function() {
        $(".exp_tekst").html(jsonData.zoom_punkter[active_zoom].slides[active_zoom_slide].tab[tab_index].txt);
        $(".zoom_pic").attr("src", jsonData.zoom_punkter[active_zoom].slides[active_zoom_slide].tab[tab_index].pic)
        $(".exp_tekst").slideDown(200);
    });
}


function zoomIn(e) {

    active_zoom_slide = 0;

    var zp = jsonData.zoom_punkter[active_zoom];
    //
    $panzoom.panzoom('zoom', false, {
        duration: 20,
        increment: 1.5,
        animate: true,
        focal: e
    });

    $(".btn-back").fadeIn(1000).click(zoomOut);

    if (jsonData.zoom_punkter[active_zoom].slides.length < 2) {
    $(".btn_right").hide();
    }

    $(".btn_left").hide();
    zoomed = true;


    console.log($(".container-fluid").height());
    $(".zoomedIn_container").css("height", $(".container-fluid").height()).fadeIn();
    //$(".img_container").css("height", $(".container-fluid").height() * 0.4); //).fadeIn();
    //$(".zoom_pic").css("height", $(".container-fluid").height() * 0.4); //).fadeIn();
    $(".zoomTitle").html(zp.header);
    console.log("ZP: " + zp.overskrift)
    $(".exp_header").html(zp.overskrift[active_zoom_slide]);
    console.log(zp.slides[active_zoom_slide].tab[tab_index].pic);
    $(".zoom_pic").attr("src", zp.slides[active_zoom_slide].tab[tab_index].pic); //.css("height", );

    $(".exp_tekst").html(zp.slides[active_zoom_slide].tab[tab_index].txt);
    $(".gui_container").fadeOut();
    $(".btn_info_gfx").fadeOut();
    //$(".gif").fadeOut(0);
};

function zoomOut(e) {
    //$(".gif").fadeIn(200);
    $(".btn-back").hide();
    $panzoom.panzoom("reset");
    zoomed = false;
    $(".zoomedIn_container").fadeOut();
    $(".gui_container").fadeIn();
    $(".btn_info_gfx").fadeIn();
};

function clickedCarousel() {

    var carousel_length = jsonData.zoom_punkter[active_zoom].slides.length;
    var indeks = $(this).index(".carousel-control");

    if (indeks == 0) {
        active_zoom_slide--;
    } else if (indeks == 1) {
        active_zoom_slide++;
    }

    console.log("ass: " + active_zoom_slide + ", " + carousel_length);

    $(".zoom_expl").fadeOut(400, function() {

        $(".zoom_pic").attr("src", jsonData.zoom_punkter[active_zoom].infotekster[active_zoom_slide][0]);
        $(".exp_header").html(jsonData.zoom_punkter[active_zoom].infotekster[active_zoom_slide][1]);
        $(".exp_tekst").html(jsonData.zoom_punkter[active_zoom].infotekster[active_zoom_slide][2 + tab_index]);
        $(".zoom_expl").show();

        //resize_text_container();
    });

    if (active_zoom_slide == 0) {
        $(".btn_left").hide();
    } else if (active_zoom_slide >= carousel_length - 1) {
        $(".btn_right").hide();
    } else {
        $(".btn_right, .btn_left").show();
    }


}

// Focal zoom:
function resize_text_container() {

    var div_offset = $(".img_container").height();

    var container_height = $(".container-fluid").height();
    var remaining_height = container_height - parseInt(div_offset);

    console.log("zoom_pic-height " + div_offset + ", RH: " + remaining_height);


}
