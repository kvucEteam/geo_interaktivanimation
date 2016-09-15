    //var xpos = -Math.abs(($(".svgImage").width() - $(".svg_landscape").width()) / 2);
    //$(".svgImage").css("left", xpos)
    

    $('.btn_info_gfx').on('click touchstart', function(e) {
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

    $(".btn-back").fadeOut(0);

    

    var $panzoom = $(".svg_landscape").panzoom({
        disablePan: false,

    });


    function zoomIn(e) {
        //
        $panzoom.panzoom('zoom', false, {
            increment: 2.5,
            animate: true,
            focal: e
        });
        $(".btn-back").fadeIn(1000).click(zoomOut);
    };

    function zoomOut(e) {
        $(".btn-back").hide();
        $panzoom.panzoom("reset");

        /*console.log($panzoom.css("margin-left"));
        $panzoom.panzoom('zoom', true, {
            increment: 1,
            animate: true
        });*/
    };

    $(".svg_landscape").css("-webkit-user-select","none");




    // Focal zoom:
