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
                    inquiryWorkscopeId: inquiryWorkscopeId,
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
                            window.location.replace("designrequest.html");

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
                    inquiryWorkscopeId: inquiryWorkscopeId,
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
    inquiryWorkscopeId = urlParams.get('inquiryWorkscopeId')
    console.log(inquiryWorkscopeId);
    if (inquiryWorkscopeId == null || inquiryWorkscopeId == "") {
        window.location.replace("measurementrequest.html");
    }



    $.ajax({
        type: "post",
        url: baseURL + '/Design/ViewDesignById?inquiryWorkscopeId=' + inquiryWorkscopeId,

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

                
var files=response.data.designs[response.data.designs.length-1].files;
console.log(files);

	
const pdfView = document.getElementById('pdfview');
var pdfViewHTML =``;
files.forEach(element => {
	console.log(baseFileURL+element.fileUrl);
// 	pdfViewHTML += `	 <object data=`+baseFileURL+element.fileUrl+`  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen  width="100%" height="100%">
// 	<iframe src=`+baseFileURL+element.fileUrl+`  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen  width="100%" height="100%" style="border: none;">
// 	This browser does not support PDFs. Please download the PDF to view it: 
// 	<a href=`+baseFileURL+element.fileUrl+`>Download PDF</a>
// 	</iframe>
// 	</object>
// `;
if(element.fileUrl.includes(".pdf")){
    	pdfViewHTML += `	 <object data=`+baseFileURL+element.fileUrl+`  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen  width="100%" height="600px">
	<iframe src=`+baseFileURL+element.fileUrl+`  frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen  width="100%" height="600px" style="border: none;">
	This browser does not support PDFs. Please download the PDF to view it: 
	<a href=`+baseFileURL+element.fileUrl+`>Download PDF</a>
	</iframe>
	</object>
`;
}else{
    
pdfViewHTML += `<div id="`+element.fileUrl+`"></div>`;
}
// 	pdfViewHTML += `<iframe frameborder="0" allowfullscreen  webkitallowfullscreen mozallowfullscreen 
//  style="width: 100%; height: 100%;"  
//  src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=`+baseFileURL+element.fileUrl+`&autoLoad=true"></iframe>        
// `;
// pdfViewHTML+=`     <iframe src="https://api2.enscape3d.com/v3/view/ab9d0c6d-16ab-4f0d-aa48-39e1bf43fc39" frameborder="0" allowfullscreen  webkitallowfullscreen mozallowfullscreen  style="width: 100%; height: 100%;">
// </iframe>`;
});

	 
pdfView.innerHTML=pdfViewHTML;

files.forEach(element => {
	console.log(baseFileURL+element.fileUrl);
    var url=element.fileUrl;
    if(!element.fileUrl.includes(".pdf")){
 
pannellum.viewer(url, {
    "type": "equirectangular",
    "autoLoad": true,
    "panorama": baseFileURL+element.fileUrl
});
    }
});

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


    });

