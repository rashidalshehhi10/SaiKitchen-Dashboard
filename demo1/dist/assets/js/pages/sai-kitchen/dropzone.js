"use strict";
// Class definition

import {
    baseURL
} from './constant.js'

import {
    measurementFile
} from './constant.js'


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
            
            // url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
            url: baseURL +"/File/UploadFile", // Set the url for your upload script location
            type: "Post",
            headers : {
                'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/json'
            },
            paramName: "file", // The name that will be used to transfer the file
            maxFiles: 150,
            maxFilesize: 30000, // MB
            timeout: 600000,
            addRemoveLinks: true,
            removedfile:function(file) {
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        // event.target.result contains base64 encoded image
                        var base64String = event.target.result;
                        var fileName = file.name;
                        var finalbase64 = base64String.split(",")[1];
                        // handlePictureDropUpload(base64String ,fileName );
                        removeA(measurementFile, finalbase64);
                    };
                    reader.readAsDataURL(file);
                    
                file.previewElement.remove();
    
            },
      
            acceptedFiles: "image/*,application/pdf,.png,.mp4",
            
        init: function() {
            this.on("addedfile", function (file) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    // event.target.result contains base64 encoded image
                    var base64String = event.target.result;
                    var fileName = file.name;
                    var finalbase64 = base64String.split(",")[1]
                    measurementFile.push(finalbase64);
                    // handlePictureDropUpload(base64String ,fileName );
                };
                reader.readAsDataURL(file);

            });
        },
        success: function(file, response){
            // alert(response);
            measurementFile.push(response.data.item1);
        
        }
            // accept: function(file, done) {
            //     if (file.name == "justinbieber.jpg") {
            //         done("Naha, you don't.");
            //     } else {
            //         var reader = new FileReader();
            //         var fileByteArray = [];
            //         reader.readAsArrayBuffer(file);
            //         reader.onloadend = function(evt) {
            //             if (evt.target.readyState == FileReader.DONE) {
            //                 var arrayBuffer = evt.target.result,
            //                     array = new Uint8Array(arrayBuffer);
            //                 for (var i = 0; i < array.length; i++) {
            //                     fileByteArray.push(array[i]);
            //                 }
            //                 measurementFile.push(fileByteArray);
            //                 console.log(measurementFile);
            //             }
            //         }
            //         // file.accepted();
            //         done("");
            //     }
            // }
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


function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}