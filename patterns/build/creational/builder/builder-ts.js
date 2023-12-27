"use strict";
var ImageFormat;
(function (ImageFormat) {
    ImageFormat["Png"] = "png";
    ImageFormat["Jpeg"] = "jpeg";
})(ImageFormat || (ImageFormat = {}));
class ImageBuilder {
    constructor() {
        this.formats = [];
    }
    addPng() {
        if (this.formats.includes(ImageFormat.Png)) {
            this.formats.push(ImageFormat.Png);
        }
    }
}
