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






}, 100);


function infoGfx() {

    UserMsgBox("body", "<h3>Du vil nu få mere info om " + $(this).text() + "</h3><h4>Er du klar til det?</h4>");
};

// Focal zoom: 
(function() {
    var $panzoom = $(".svg_landscape").panzoom({
        minScale: 1,
        maxScale: 5,
        onEnd: function() {
            var offset = $(".svg_landscape").offset();
            var parent_offset = $(".landscape_container").offset();

            var svg_offset_left = offset.left - parent_offset.left;
            var svg_offset_top = offset.top - parent_offset.top;



            //console.log("OFFSET: x:" + offset.left + ", y: " + offset.top);
            //console.log("PARENT_OFFSET x:" + parent_offset.left + ", y: " + parent_offset.top);
            console.log("SVGOFFSET: x:" + svg_offset_left + ", y:"+ svg_offset_top);
            console.log($(".svgImage").width());


        },
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
