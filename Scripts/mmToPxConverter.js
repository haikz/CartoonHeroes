function MmToPxConverter(_monitorDpi) {
    this.monitorDpi = _monitorDpi;
    this.pxPerMm = _monitorDpi / 25.4; // 1 inc = 25,4 mm
}

MmToPxConverter.prototype = {
    constructor: MmToPxConverter,
    mmToPx: function(mm){
        return Math.round(mm * this.pxPerMm);
    },
    getCssDimInPx: function (dim_mm) {
        return (this.mmToPx(dim_mm) + "px");
    }
}