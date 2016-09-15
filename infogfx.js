    //var xpos = -Math.abs(($(".svgImage").width() - $(".svg_landscape").width()) / 2);
    //$(".svgImage").css("left", xpos)

    var zoomed = false;
    $(".zoomedIn_container").fadeOut(0);
    var active_tekst; 




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

    $(".btn-back").fadeOut(0);

    $('.btn').button();



    var $panzoom = $(".svg_landscape").panzoom({

        panOnlyWhenZoomed: true,
        onPan: function() {

            if (zoomed ==false){
                 $panzoom.panzoom("reset");
            }


            console.log("Zoomed: " + zoomed);

        },

    });


    function zoomIn(e) {
        //
        $panzoom.panzoom('zoom', false, {
            increment: 2.5,
            animate: true,
            focal: e
        });
        $(".btn-back").fadeIn(1000).click(zoomOut);
        zoomed = true;

        $(".zoomedIn_container").fadeIn();
        $(".zoomedTitle").html("Zoom på: " + active_tekst);

        $(".gui_container").fadeOut();
        $(".btn_info_gfx").fadeOut();
    };

    function zoomOut(e) {
        $(".btn-back").hide();
        $panzoom.panzoom("reset");

        /*console.log($panzoom.css("margin-left"));
        $panzoom.panzoom('zoom', true, {
            increment: 1,
            animate: true
        });*/
        zoomed = false;
         $(".zoomedIn_container").fadeOut();
        $(".gui_container").fadeIn();
        $(".btn_info_gfx").fadeIn();
    };

    $(".svg_landscape").css("-webkit-user-select", "none");




    // Focal zoom:
