    //var xpos = -Math.abs(($(".svgImage").width() - $(".svg_landscape").width()) / 2);
    //$(".svgImage").css("left", xpos)
    $(".btn_info_gfx").click(infoGfx)

    $(".back").click(zoomback);

    var $panzoom = $(".svg_landscape").panzoom({
        contain: false

    });


    function infoGfx(e) {
        $panzoom.panzoom('zoom', false, {
            increment: 2,
            animate: true,
            focal: e
        });
    };

    function zoomback(e) {
        $panzoom.panzoom("reset");

        /*console.log($panzoom.css("margin-left"));
        $panzoom.panzoom('zoom', true, {
            increment: 1,
            animate: true
        });*/
    };




    // Focal zoom:
