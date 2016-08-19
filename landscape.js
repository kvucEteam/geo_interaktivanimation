$(document).ready(function() {

    /*$(".svg_landscape").panzoom({
        disableYAxis: true,
        contain: false,
    });*/

    /*$(".svg_landscape").draggable({
      containment: $(this).parent()
    });*/
    var xpos = -Math.abs(($(".svgImage").width() - $(".svg_landscape").width()) / 2);
    $(".svgImage").css("left", xpos)
    $(".btn_info_gfx").click(infoGfx)
});



window.setInterval(function() {
    var offset = $(".svgImage").offset(); // - $(".svg_landscape").offset().left;

    console.log(offset.left + ", " + offset.top);
}, 100);


function infoGfx() {

    UserMsgBox("body", "<h3>Du vil nu få mere info om " + $(this).text() + "</h3><h4>Er du klar til det?</h4>");
};

// Focal zoom: 
(function() {
    var $panzoom = $(".svg_landscape").panzoom({
        minScale: 1,
        maxScale: 3,
    });
    $panzoom.parent().on('mousewheel.focal', function(e) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        $panzoom.panzoom('zoom', zoomOut, {
            increment: 0.05,
            animate: false,
            focal: e
        });
    });
})();
