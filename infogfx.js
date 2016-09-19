var active_tekst;
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


    detaljer();

    $('.btn_info_gfx').on('click touchstart', function(e) {
        active_tekst = $(this).text();
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
        $(".overlay_container").append("<span class='btn btn-xs btn-default detalje_label btn_info_gfx'><span class='glyphicon glyphicon-search'> </span> " + jsonData.zoom_punkter[i].header + "</span>");
        $(".overlay_container").append("<span class='gif'><img src=" + zp.simple_gif + "></span>");
        $(".detalje_label").eq(i).css("left", zp.label_position[0] + "%").css("top", zp.label_position[1] + "%")
        $(".gif").eq(i).css("left", zp.simplegif_position[0] + "%").css("top", zp.simplegif_position[1] + "%")
    }
}


function zoomIn(e) {
    //
    $panzoom.panzoom('zoom', false, {
        increment: 2.5,
        animate: true,
        focal: e
    });

    $(".btn-back").fadeIn(1000).click(zoomOut);
    zoomed = true;

    $(".zoomedIn_container").fadeIn().append("<h1>Zoomed IN</h1>");

    $(".zoomedTitle").html("Zoom på: " + active_tekst);

    $(".gui_container").fadeOut();
    $(".btn_info_gfx").fadeOut();
};

function zoomOut(e) {
    $(".btn-back").hide();
    $panzoom.panzoom("reset");
    zoomed = false;
    $(".zoomedIn_container").fadeOut();
    $(".gui_container").fadeIn();
    $(".btn_info_gfx").fadeIn();
};



// Focal zoom:
