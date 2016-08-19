$(document).ready(function() {
    $(".svg_bgr").slideToggle(0, function() {
        console.log("anim complete");
    });

    $(".svg_container").click(function() {
        $(".svg_bgr").slideToggle(2000, function() {
            console.log("anim complete");
        });
    });

    $("svg").svgPanZoom({
        events: {
            mouseWheel: true
        },

        animationTime: 0, // time in milliseconds to use as default for animations. Set 0 to remove the animation
        zoomFactor: .02, // how much to zoom-in or zoom-out
        maxZoom: 10 , //maximum zoom in, must be a number bigger than 1
        panFactor: 100
    });

});


// Focal zoom: 
/*(function() {
          var $section = $('#focal');
          var $panzoom = $section.find('.panzoom').panzoom();
          $panzoom.parent().on('mousewheel.focal', function( e ) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            $panzoom.panzoom('zoom', zoomOut, {
              increment: 0.1,
              animate: false,
              focal: e
            });
          });
        })();
        */