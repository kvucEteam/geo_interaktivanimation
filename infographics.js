$(document).ready(function() {
    $(".svg_bgr").slideToggle(0, function() {
        console.log("anim complete");
    });

    $(".svg_container").click(function() {
        $(".svg_bgr").slideToggle(2000, function() {
            console.log("anim complete");
        });
    });

    $("svg").svgPanZoom({});

});
