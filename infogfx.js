var active_zoom;
var active_zoom_slide = 0;
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

        $(".svg_landscape").append("<img class='img-responsive png_overlay' src='svg/pile_overlay.png'>");
        $(".detalje_container").hide();
    } else if (indeks == 1) {
        $(".png_overlay").hide();
        $(".detalje_container").show();

    }

}

function detaljer() {

    for (var i = 0; i < jsonData.zoom_punkter.length; i++) {
        var zp = jsonData.zoom_punkter[i];
        console.log(i + " punkt");
        $(".svg_landscape").append("<div class='detalje_container'></div>");
        $(".detalje_container").append("<span class='btn btn-xs btn-default detalje_label btn_info_gfx'><span class='glyphicon glyphicon-search'> </span> " + jsonData.zoom_punkter[i].header + "</span>");
        $(".detalje_container").append("<span class='gif'><img img-responsive src=" + zp.simple_gif + "></span>");
        $(".detalje_label").eq(i).css("left", zp.label_position[0] + "%").css("top", zp.label_position[1] + "%")
        $(".gif").eq(i).css("left", zp.simplegif_position[0] + "%").css("top", zp.simplegif_position[1] + "%")
    }
}

function toogleZoomTab() {
    var indeks = $(this).index();
    console.log();
    $(".exp_tekst").html(jsonData.zoom_punkter[active_zoom].infotekster[0][indeks + 2]);
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
    $(".btn_left").hide();
    zoomed = true;


    console.log($(".container-fluid").height());
    $(".zoomedIn_container").css("height", $(".container-fluid").height()).fadeIn();
    //$(".img_container").css("height", $(".container-fluid").height() * 0.4); //).fadeIn();
    //$(".zoom_pic").css("height", $(".container-fluid").height() * 0.4); //).fadeIn();
    $(".zoomTitle").html(zp.header);
    $(".zoom_pic").attr("src", zp.infotekster[active_zoom_slide][0]); //.css("height", );
    $(".exp_header").html(zp.infotekster[active_zoom_slide][1]);
    $(".exp_tekst").html(zp.infotekster[active_zoom_slide][2]);
    $(".gui_container").fadeOut();
    $(".btn_info_gfx").fadeOut();
    $(".gif").fadeOut(0);
};

function zoomOut(e) {
    $(".gif").fadeIn(200);
    $(".btn-back").hide();
    $panzoom.panzoom("reset");
    zoomed = false;
    $(".zoomedIn_container").fadeOut();
    $(".gui_container").fadeIn();
    $(".btn_info_gfx").fadeIn();
};

function clickedCarousel() {
    var carousel_length = jsonData.zoom_punkter[active_zoom].infotekster.length;

    var indeks = $(this).index(".carousel-control");

    move_zoom(indeks);

    if (indeks == 0) {
        active_zoom_slide--;
    } else if (indeks == 1) {
        active_zoom_slide++;
    }

    console.log("ass: " + active_zoom_slide + ", " + carousel_length);

    $(".zoom_expl").fadeOut("slow", function() {
        $(".zoom_pic").attr("src", jsonData.zoom_punkter[active_zoom].infotekster[active_zoom_slide][0]);
        $(".exp_header").html(jsonData.zoom_punkter[active_zoom].infotekster[active_zoom_slide][1]);
        $(".exp_tekst").html(jsonData.zoom_punkter[active_zoom].infotekster[active_zoom_slide][2]);
        $(".zoom_expl").fadeIn();
    });

    if (active_zoom_slide == 0) {
        $(".btn_left").hide();
    } else if (active_zoom_slide >= carousel_length - 1) {
        $(".btn_right").hide();
    } else {
        $(".btn_right, .btn_left").show();
    }


}

function move_zoom(indeks) {



}



// Focal zoom:
