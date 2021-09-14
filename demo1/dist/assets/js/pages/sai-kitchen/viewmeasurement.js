"use strict";
import {
    baseURL
} from './constant.js'
import {
    baseFileURL
} from './constant.js'
export let user;
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

let inquiryWorkscopeId;
let permissions;
let measurementPermission;
let isDesignView=0;

var KTDatatablesSearchOptionsAdvancedSearch = function() {
    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    var _handleFormAcceptMeasurement = function() {
        var form = KTUtil.getById('kt_approve_inquiry');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_approve_inquiry_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        design_schedule_date: {
                            validators: {
                                notEmpty: {
                                    message: 'Design Schedule Date is required'
                                }
                            }
                        },
                        DesignAssignto: {
                            validators: {
                                notEmpty: {
                                    message: 'Design Assign is required'
                                },

                            }
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            //	eleInvalidClass: '', // Repace with uncomment to hide bootstrap validation icons
                            //	eleValidClass: '',   // Repace with uncomment to hide bootstrap validation icons
                        })
                    }
                }
            )
            .on('core.form.valid', function() {
                // Show loading state on button
                KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");
                // Form Validation & Ajax Submission: https://formvalidation.io/guide/examples/using-ajax-to-submit-the-form
                var inquiryApproved = {
                    id: inquiryWorkscopeId,
                    designAssignedTo: $('#kt_designassignto').val(),
                    designScheduleDate: document.getElementById('design_schedule_date').value,
                };
                const data = JSON.stringify(inquiryApproved);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Measurement/AcceptMeasurement',

                    headers: {
                        'Content-Type': 'application/json',
                        'userId': user.data.userId,
                        'userToken': user.data.userToken,
                        'userRoleId': user.data.userRoles[0].userRoleId,
                        'branchId': user.data.userRoles[0].branchId,
                        'branchRoleId': user.data.userRoles[0].branchRoleId,
                        'Access-Control-Allow-Origin': '*',
                    },
                    data: data,
                    success: function(response) {
                        // Release button
                        KTUtil.btnRelease(formSubmitButton);
                        console.log(response);
                        // window.location.replace("home.html");
                        if (response.isError == false) {
                            // sessionStorage.setItem('user', JSON.stringify(response));
                            window.location.replace("measurementrequest.html");

                        } else {
                            Swal.fire({
                                text: response.errorMessage,
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                }
                            }).then(function() {
                                KTUtil.scrollTop();
                            });
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        // Release button
                        KTUtil.btnRelease(formSubmitButton);

                        // alert(errorThrown);

                        Swal.fire({
                            text: 'Internet Connection Problem',
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light-primary"
                            }
                        }).then(function() {
                            KTUtil.scrollTop();
                        });
                    }
                });
            })
            .on('core.form.invalid', function() {
                Swal.fire({
                    text: "Sorry, looks like there are some errors detected, please try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() {
                    KTUtil.scrollTop();
                });
            });
    }
    var _handleFormRejectMeasurement = function() {
        var form = KTUtil.getById('kt_modify_reject_measurement');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_reject_measurement_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        measurement_schedule_date: {
                            validators: {
                                notEmpty: {
                                    message: 'Measurement Schedule Date is required'
                                }
                            }
                        },
                        MeasurementAssignto: {
                            validators: {
                                notEmpty: {
                                    message: 'Measurement Assign is required'
                                },

                            }
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                        bootstrap: new FormValidation.plugins.Bootstrap({
                            //	eleInvalidClass: '', // Repace with uncomment to hide bootstrap validation icons
                            //	eleValidClass: '',   // Repace with uncomment to hide bootstrap validation icons
                        })
                    }
                }
            )
            .on('core.form.valid', function() {
                // Show loading state on button
                KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");
                // Form Validation & Ajax Submission: https://formvalidation.io/guide/examples/using-ajax-to-submit-the-form
                var inquiryRejected = {
                    id: inquiryWorkscopeId,
                    measurementAssignedTo: $('#kt_assignto').val(),
                    measurementScheduleDate: document.getElementById('measurement_schedule_date').value,
                    measurementComment: document.getElementById('measurementComment').value,
                };
                const data = JSON.stringify(inquiryRejected);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Measurement/DeclineMeasurement',

                    headers: {
                        'Content-Type': 'application/json',
                        'userId': user.data.userId,
                        'userToken': user.data.userToken,
                        'userRoleId': user.data.userRoles[0].userRoleId,
                        'branchId': user.data.userRoles[0].branchId,
                        'branchRoleId': user.data.userRoles[0].branchRoleId,
                        'Access-Control-Allow-Origin': '*',
                    },
                    data: data,
                    success: function(response) {
                        // Release button
                        KTUtil.btnRelease(formSubmitButton);
                        console.log(response);
                        // window.location.replace("home.html");
                        if (response.isError == false) {
                            // sessionStorage.setItem('user', JSON.stringify(response));
                            window.location.replace("measurementrequest.html");
                        } else {
                            Swal.fire({
                                text: response.errorMessage,
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                }
                            }).then(function() {
                                KTUtil.scrollTop();
                            });
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        // Release button
                        KTUtil.btnRelease(formSubmitButton);

                        // alert(errorThrown);

                        Swal.fire({
                            text: 'Internet Connection Problem',
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light-primary"
                            }
                        }).then(function() {
                            KTUtil.scrollTop();
                        });
                    }
                });
            })
            .on('core.form.invalid', function() {
                Swal.fire({
                    text: "Sorry, looks like there are some errors detected, please try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() {
                    KTUtil.scrollTop();
                });
            });
    }
    return {

        //main function to initiate the module
        init: function() {
            _handleFormAcceptMeasurement();
            _handleFormRejectMeasurement();
        },

    };

}();
// Class Initialization
jQuery(document).ready(function() {
	var login = localStorage.getItem("user");
    if (login !== null) {
        user = JSON.parse(login);
        console.log(user);
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 7) {
                measurementPermission = permissions[i].permissionLevelId;
                console.log(measurementPermission);
            }
        }
    }


    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    inquiryWorkscopeId = urlParams.get('inquiryWorkscopeId');
    isDesignView = urlParams.get('designView');
    console.log(inquiryWorkscopeId);
    if (inquiryWorkscopeId == null || inquiryWorkscopeId == "") {
        window.location.replace("measurementrequest.html");
    }

if(isDesignView!=1){
    document.getElementById('actionButtons').innerHTML=`   <a href="#"   data-toggle="modal" data-target="#measurementScheduleDate" class="btn btn-sm font-weight-bold" style="background-color: #aa9d9d; color:#ffffff">
    <i >
       <span class="svg-icon svg-icon-2x svg-icon-white ml-n2">
          <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  transform="rotate(-180 0 0)" width="15px" height="15px" viewBox="0 0 24 24" version="1.1">
             <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="15" height="15"/>
                <path d="M2.70963455,10 L2.70963455,19 L3.86223328,19.3841996 C5.08583091,19.7920655 6.36718132,20 7.65696647,20 L11.2502228,20 C12.6802659,20 13.9115103,18.990621 14.1919649,17.5883484 L14.9411635,13.8423552 C15.2660994,12.217676 14.2124491,10.6372006 12.5877699,10.3122648 C12.3285558,10.260422 12.0636265,10.2430672 11.7998644,10.2606513 L8.20963455,10.5 L8.57383093,6.49383981 C8.6423241,5.74041495 8.08707726,5.07411874 7.3336524,5.00562558 C7.29241938,5.00187712 7.25103761,5 7.20963455,5 L7.20963455,5 C6.27903894,5 5.4166784,5.48826024 4.93789092,6.28623939 L2.70963455,10 Z" fill="#000000" transform="translate(8.854817, 12.500000) scale(-1, 1) translate(-8.854817, -12.500000) "/>
                <rect fill="#000000" opacity="0.3" transform="translate(19.500000, 14.500000) scale(-1, 1) translate(-19.500000, -14.500000) " x="17" y="9" width="5" height="11" rx="1"/>
             </g>
          </svg>
          <!--end::Svg Icon-->
       </span>
    </i>
    Reject Measurement
 </a>
 <a href="#" data-toggle="modal" data-target="#ScheduleDate"  class="btn btn-sm font-weight-bold" style="background-color: #F1583E; color:#ffffff">
    <i >
       <span class="svg-icon svg-icon-2x svg-icon-white ml-n2">
          <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 0 24 24" version="1.1">
             <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="15" height="15"/>
                <path d="M9,10 L9,19 L10.1525987,19.3841996 C11.3761964,19.7920655 12.6575468,20 13.9473319,20 L17.5405883,20 C18.9706314,20 20.2018758,18.990621 20.4823303,17.5883484 L21.231529,13.8423552 C21.5564648,12.217676 20.5028146,10.6372006 18.8781353,10.3122648 C18.6189212,10.260422 18.353992,10.2430672 18.0902299,10.2606513 L14.5,10.5 L14.8641964,6.49383981 C14.9326895,5.74041495 14.3774427,5.07411874 13.6240179,5.00562558 C13.5827848,5.00187712 13.5414031,5 13.5,5 L13.5,5 C12.5694044,5 11.7070439,5.48826024 11.2282564,6.28623939 L9,10 Z" fill="#000000"/>
                <rect fill="#000000" opacity="0.3" x="2" y="9" width="5" height="11" rx="1"/>
             </g>
          </svg>
          <!--end::Svg Icon-->
       </span>
    </i>
    Approve Measurement
 </a>`;
}
	

    $.ajax({
        type: "post",
        url: baseURL + '/Measurement/ViewMeasurementById?inquiryId=' + inquiryWorkscopeId,

        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'userToken': user.data.userToken,
            'userRoleId': user.data.userRoles[0].userRoleId,
            'branchId': user.data.userRoles[0].branchId,
            'branchRoleId': user.data.userRoles[0].branchRoleId,
            'Access-Control-Allow-Origin': '*',
        },

        success: function(response) {
            console.log(response);
            if (response.isError == false) {

                
var files=response.data.measurements[response.data.measurements.length-1].files;
console.log(files);
const imgView = document.getElementById('imgview');
const imgViewdocs = document.getElementById('imgViewdocs');
const pdfView = document.getElementById('pdfview');
const pdfViewdocs = document.getElementById('pdfViewdocs');
const videoViewdocs= document.getElementById('videoViewdocs');
const videoView = document.getElementById('videoview');
var videoViewHTML =``;
var imgViewdocsHTML = ``;
var imgViewHTML =``;
var pdfViewHTML =``;
var pdfViewdocsHTML = ``;
var videoViewdocsHTML = ``;
var isImgLoaded=false;
var isPdfLoaded=false;
var isVideoLoaded=false;
files.forEach(element => {
	console.log(baseFileURL+element.fileUrl);
    if(element.fileContentType=='mp4'){
        if(isVideoLoaded==false){
        var videoUrl="https://player.vimeo.com/video/"+element.fileUrl;
        videoViewHTML += `    <iframe id="framevideodoc"  src=`+videoUrl+` width="100%" height="600px" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        isVideoLoaded=true;
    }
    videoViewdocsHTML += `<div style="cursor: pointer;" onclick="changeMeasurementVideoFile('https://player.vimeo.com/video/`+element.fileUrl+`');" >   
    <img alt="" class="max-h-65px" style="height:65px" src="assets/media/svg/files/mp4.svg" />
 </a>`;
    }else if(element.fileContentType=='pdf'){
   
    if(isPdfLoaded==false){
        pdfViewHTML += `<object id="objpdfdoc" data=`+baseFileURL+element.fileUrl+`  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen  width="100%" height="600px">
        <iframe id="framepdfdoc" src=`+baseFileURL+element.fileUrl+`  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen  width="100%" height="600px" style="border: none;">
        This browser does not support PDFs. Please download the PDF to view it: 
        <a  id="linkpdfdoc" href=`+baseFileURL+element.fileUrl+`>Download PDF</a>
        </iframe>
        </object>`;
        isPdfLoaded=true;
        }
        pdfViewdocsHTML += `<div style="cursor: pointer;" onclick="changeMeasurementPDFFile('`+baseFileURL+element.fileUrl+`');" >   
           <img alt="" class="max-h-65px" style="height:65px" src="assets/media/svg/files/pdf.svg" />
        </a>`;
	
}else{
    if(isImgLoaded==false){
        imgViewHTML += `<object id="objimgdoc" data=`+baseFileURL+element.fileUrl+`  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen  width="100%" height="600px">
        <iframe id="frameimgdoc" src=`+baseFileURL+element.fileUrl+`  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen  width="100%" height="600px" style="border: none;">
        This browser does not support PDFs. Please download the PDF to view it: 
        <a  id="linkimgdoc" href=`+baseFileURL+element.fileUrl+`>Download PDF</a>
        </iframe>
        </object>`;
        isImgLoaded=true;
        }
        imgViewdocsHTML += `<a type="button" onclick="changeMeasurementImgFile('`+baseFileURL+element.fileUrl+`');" >   
           <img alt="" class="max-h-65px" src="`+baseFileURL+element.fileUrl+`" />
        </a>`;
}
});

	 
imgView.innerHTML=imgViewHTML;
videoView.innerHTML=videoViewHTML;
videoViewdocs.innerHTML=videoViewdocsHTML;
imgViewdocs.innerHTML=imgViewdocsHTML;

pdfView.innerHTML=pdfViewHTML;
pdfViewdocs.innerHTML=pdfViewdocsHTML;

            }else {
				Swal.fire({
					text: response.errorMessage,
					icon: "error",
					buttonsStyling: false,
					confirmButtonText: "Ok, got it!",
					customClass: {
						confirmButton: "btn font-weight-bold btn-light-primary"
					}
				}).then(function() {
					KTUtil.scrollTop();
				});
			}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {


            // alert(errorThrown);

            Swal.fire({
                text: 'Internet Connection Problem',
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-light-primary"
                }
            }).then(function() {
                KTUtil.scrollTop();
            });
        }
    });

    $.ajax({
        type: "post",
        url: baseURL + '/User/GetMeasurementUsers?branchId=' + user.data.userRoles[0].branch.branchId,

        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'userToken': user.data.userToken,
            'userRoleId': user.data.userRoles[0].userRoleId,
            'branchId': user.data.userRoles[0].branchId,
            'branchRoleId': user.data.userRoles[0].branchRoleId,
            'Access-Control-Allow-Origin': '*',
        },

        success: function(response) {
            console.log(response);
            if (response.isError == false) {

                console.log(response.data[0].userName);
                const assigntoList = document.getElementById('kt_assignto');
                var assignToListHTML = new Array();

                for (var i = 0; i < response.data.length; i++) {
                    assignToListHTML.push(`
					<option value="` + response.data[i].userId + `">` + response.data[i].userName + `</option>`);
                }

                assigntoList.innerHTML = assignToListHTML.join('');

            } else {
                Swal.fire({
                    text: response.errorMessage,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function () {
                    KTUtil.scrollTop();
                });
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {


            // alert(errorThrown);

            Swal.fire({
                text: 'Internet Connection Problem',
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-light-primary"
                }
            }).then(function() {
                KTUtil.scrollTop();
            });
        }
    });


    $.ajax({
        type: "post",
        url: baseURL + '/User/GetDesignUsers?branchId=' + user.data.userRoles[0].branch.branchId,

        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'userToken': user.data.userToken,
            'userRoleId': user.data.userRoles[0].userRoleId,
            'branchId': user.data.userRoles[0].branchId,
            'branchRoleId': user.data.userRoles[0].branchRoleId,
            'Access-Control-Allow-Origin': '*',
        },

        success: function(response) {
            console.log(response);
            if (response.isError == false) {

                console.log(response.data[0].userName);
                const assigntoList = document.getElementById('kt_designassignto');
                var assignToListHTML = new Array();

                for (var i = 0; i < response.data.length; i++) {
                    assignToListHTML.push(`
					<option value="` + response.data[i].userId + `">` + response.data[i].userName + `</option>`);
                }

                assigntoList.innerHTML = assignToListHTML.join('');

            } else {
                Swal.fire({
                    text: response.errorMessage,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function () {
                    KTUtil.scrollTop();
                });
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {


            // alert(errorThrown);

            Swal.fire({
                text: 'Internet Connection Problem',
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-light-primary"
                }
            }).then(function() {
                KTUtil.scrollTop();
            });
        }
    });

    KTDatatablesSearchOptionsAdvancedSearch.init();
    $('#kt_tab_document div').hide();
    $('#kt_tab_video div').hide();
    $('.nav li a').click(function(){
		var data = $(this).attr("href");
		console.log(data);
        if(data=='#kt_tab_diagram'){
            $('#kt_tab_diagram div').show();
            $('#kt_tab_document div').hide();
            $('#kt_tab_video div').hide();
        }else if(data=='#kt_tab_document'){
            $('#kt_tab_document div').show();
            $('#kt_tab_diagram div').hide();
            $('#kt_tab_video div').hide();
        }else if(data=='#kt_tab_video'){
            $('#kt_tab_video div').show();
            $('#kt_tab_diagram div').hide();
            $('#kt_tab_document div').hide();
        }
	});

    });

