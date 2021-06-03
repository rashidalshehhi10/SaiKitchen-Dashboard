"use strict";
// Class definition

import {
    baseURL
} from './constant.js'


export var measurementFile = new Array();

var KTDropzoneDemo = function() {
    // Private functions
    var demo1 = function() {
        // single file upload
        $('#kt_dropzone_1').dropzone({
            url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
            paramName: "file", // The name that will be used to transfer the file
            maxFiles: 1,
            maxFilesize: 5, // MB
            addRemoveLinks: true,
            accept: function(file, done) {
                if (file.name == "justinbieber.jpg") {
                    done("Naha, you don't.");
                } else {
                    done();
                }
            }
        });

        // multiple file upload
        $('#kt_dropzone_2').dropzone({
            url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
            paramName: "file", // The name that will be used to transfer the file
            maxFiles: 10,
            maxFilesize: 10, // MB
            addRemoveLinks: true,
            accept: function(file, done) {
                if (file.name == "justinbieber.jpg") {
                    done("Naha, you don't.");
                } else {
                    done();
                }
            }
        });

        // file type validation
        $('#kt_dropzone_3').dropzone({
            url: baseURL + "/User", // Set the url for your upload script location
            paramName: "file", // The name that will be used to transfer the file
            maxFiles: 50,
            maxFilesize: 5, // MB
            addRemoveLinks: true,
            acceptedFiles: "image/*,application/pdf,.psd,.png",
            accept: function(file, done) {
                if (file.name == "justinbieber.jpg") {
                    done("Naha, you don't.");
                } else {
                    var reader = new FileReader();
                    var fileByteArray = [];
                    reader.readAsArrayBuffer(file);
                    reader.onloadend = function(evt) {
                        if (evt.target.readyState == FileReader.DONE) {
                            var arrayBuffer = evt.target.result,
                                array = new Uint8Array(arrayBuffer);
                            for (var i = 0; i < array.length; i++) {
                                fileByteArray.push(array[i]);
                            }
                            measurementFile.push(fileByteArray);
                            console.log(measurementFile);
                        }
                    }

                    // file.accepted();
                    done("");
                }
            }
        });
    }


    return {
        // public functions
        init: function() {
            demo1();
        }
    };
}();

KTUtil.ready(function() {
    KTDropzoneDemo.init();
});