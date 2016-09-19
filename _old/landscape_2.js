(function() {
    var $section = $('#auto-contain');
    $section.find('.panzoom').panzoom({
        $zoomIn: $section.find(".zoom-in"),
        $zoomOut: $section.find(".zoom-out"),
        $zoomRange: $section.find(".zoom-range"),
        $reset: $section.find(".reset"),
        //startTransform: 'scale(1.1)',
        //increment: 0.1,
        minScale: 1,
        maxScale:4,
        contain: 'automatic',
        disableYAxis: true
    }).panzoom('zoom');

    var $panzoom = $section.find('.panzoom'); //.panzoom({});
    $panzoom.parent().on('mousewheel.focal', function(e) {
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
