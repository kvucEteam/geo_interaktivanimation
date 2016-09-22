var active_zoom;
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
    $('.toggle-group').click(clickedToggle);
    $('li').click(toogleZoomTab);


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
    var indeks = $(this).parent().parent().parent().index() / 2;
    console.log("indeks" + indeks);
}

function detaljer() {

    for (var i = 0; i < jsonData.zoom_punkter.length; i++) {
        var zp = jsonData.zoom_punkter[i];
        console.log(i + " punkt");
        $(".landscape_container").append("<span class='btn btn-xs btn-default detalje_label btn_info_gfx'><span class='glyphicon glyphicon-search'> </span> " + jsonData.zoom_punkter[i].header + "</span>");
        $(".landscape_container").append("<span class='gif'><img src=" + zp.simple_gif + "></span>");
        $(".detalje_label").eq(i).css("left", zp.label_position[0] + "%").css("top", zp.label_position[1] + "%")
        $(".gif").eq(i).css("left", zp.simplegif_position[0] + "%").css("top", zp.simplegif_position[1] + "%")
    }
}

function toogleZoomTab(){
    var indeks = $(this).index();
    console.log();
    $(".exp_tekst").html(jsonData.zoom_punkter[active_zoom].tekst_1[indeks+1]);
}


function zoomIn(e) {

    var zp = jsonData.zoom_punkter[active_zoom];
    //
    $panzoom.panzoom('zoom', false, {
        duration: 20,
        increment: 1.5,
        animate: true,
        focal: e
    });

    $(".btn-back").fadeIn(1000).click(zoomOut);
    zoomed = true;


    console.log($(".container-fluid").height());
    $(".zoomedIn_container").css("height", $(".container-fluid").height()).fadeIn();
    $(".img_container").css("height", $(".container-fluid").height() * 0.4); //).fadeIn();
    $(".zoom_pic").css("height", $(".container-fluid").height() * 0.4); //).fadeIn();
    $(".gif").hide();
    $(".zoomTitle").html(zp.header);
    $(".zoom_pic").attr("src", zp.zoom_gif); //.css("height", );
    $(".exp_header").html(zp.tekst_1[0]);
    $(".exp_tekst").html(zp.tekst_1[1]);
    $(".gui_container").fadeOut();
    $(".btn_info_gfx").fadeOut();
};

function zoomOut(e) {
    $(".gif").show();
    $(".btn-back").hide();
    $panzoom.panzoom("reset");
    zoomed = false;
    $(".zoomedIn_container").fadeOut();
    $(".gui_container").fadeIn();
    $(".btn_info_gfx").fadeIn();
};



// Focal zoom:
