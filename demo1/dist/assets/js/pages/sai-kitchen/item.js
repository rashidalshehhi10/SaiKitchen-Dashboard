"use strict";
// Class definition

import {
    baseURL
} from './constant.js'
import {
    measurementFile
} from './constant.js'
import {
    baseFileURL
} from './constant.js'

let user;
let datatable;
let customerData;
var KTAppsUsersListDatatable = function() {
    // Private functions

    // basic demo
    var _demo = function() {
        datatable = $('#kt_datatable').KTDatatable({
            // datasource definition
            data: {

                type: 'remote',
                source: {
                    read: {  
                        url: baseURL + '/ApplianceAccessory/GetAllApplianceAccessory',
                    },
                },
                pageSize: 10, // display 20 records per page
                serverPaging: true,
                serverFiltering: false,
                serverSorting: false,
            },

            // layout definition
            layout: {
                scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            processing: true,
            serverSide: false,
            search: {
                input: $('#kt_subheader_search_form'),
                delay: 0,
                key: 'generalSearch'
            },

            // columns definition
            columns: [{
                    field: 'applianceAccessoryId',
                    title: '#',
                    sortable: 'asc',
                    width: 40,
                    type: 'number',
                    selector: false,
                    textAlign: 'left',
                    template: function(data) {;
                        return '<span class="font-weight-bolder">' + data.applianceAccessoryId + '</span>';

                    }
                },

                {
                    field: 'applianceAccessoryImgUrl',
                    title: 'Item Image',
                    autoHide: true,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        // var status = {
                        // 	1: {'title': 'Paid', 'class': ' label-light-primary'},
                        // 	2: {'title': 'Approved', 'class': ' label-light-danger'},
                        // 	3: {'title': 'Pending', 'class': ' label-light-primary'},
                        // 	4: {'title': 'Rejected', 'class': ' label-light-success'}
                        // };
                        if (data.applianceAccessoryImgUrl != null){
 

                var file = data.applianceAccessoryImgUrl.substr((data.applianceAccessoryImgUrl.lastIndexOf('.') + 1));
                  switch(file) {
                        case "pdf":                                                         
                            output+=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/pdf.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        case "css":
                            output +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/css.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        case "doc":
                            output +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/doc.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        case "html":
                            output +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/html.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        case "javascript":
                            output+=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/html.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        case "jpg":
                            output +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/jpg.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        case "jpeg":
                            output +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/jpg.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        case "mp4":
                            output +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/mp4.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        case "xml":
                            output+=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/xml.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        case "zip":
                            output +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="/assets/media/svg/files/zip.svg" style="width:24px;height:24px;"></a>'+
                              '</div>';
                        break;
                        default:
                            output +=
                            '<div   class="divico">'+
                             '<a href="'+baseFileURL+data.applianceAccessoryImgUrl+'" target="_blank"> <img  src="" style="width:24px;height:24px;"></a>'+
                            '</div>';

                      }

//
                        // var index = KTUtil.getRandomInt(1, 4);
                        // if (data.applianceAccessoryImgUrl != null) {
                        //     output += '<div class="font-weight-bold text-muted">' + data.applianceAccessoryImgUrl + '</div>';
                        //     // output += '<div class="text-muted">' + status[index].title + '</div>';
                        // }
                    }
                        return output;
                    },
                },
                {
                    field: 'applianceAccessoryName',
                    title: 'Item Name',
                    autoHide: true,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        // var status = {
                        // 	1: {'title': 'Paid', 'class': ' label-light-primary'},
                        // 	2: {'title': 'Approved', 'class': ' label-light-danger'},
                        // 	3: {'title': 'Pending', 'class': ' label-light-primary'},
                        // 	4: {'title': 'Rejected', 'class': ' label-light-success'}
                        // };
                        // var index = KTUtil.getRandomInt(1, 4);
                        if (data.applianceAccessoryName != null) {
                            output += '<div class="font-weight-bold text-muted">' + data.applianceAccessoryName + '</div>';
                            // output += '<div class="text-muted">' + status[index].title + '</div>';
                        }
                        return output;
                    },
                },

                {
                    field: 'brandName',
                    title: 'Brand Name',
                    autoHide: true,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        if (data.brandId != null) {
                            output += '<div class="font-weight-bold text-muted">' + data.brandName + '</div>';
                            // output += '<div class="text-muted">' + status[index].title + '</div>';
                        }
                        return output;
                    },
                },
                {
                    field: 'applianceAccessoryPrice',
                    title: 'Price',
                    // autoHide: true,
                    template: function(data) {
                        var output = '';
                        if (data.applianceAccessoryPrice != null) {
                            output += '<div class="font-weight-bold text-muted">' + data.applianceAccessoryPrice + '</div>';
                        }
                        return output;
                    },
                    
                },

                {
                    field: 'applianceAccessoryTypeId',
                    title: 'Type',
                    // autoHide: true,
                    template: function(data) {
                        var output = '';
                        if (data.applianceAccessoryTypeId != null) {
                            output += '<div class="font-weight-bold text-muted">' + data.applianceAccessoryTypeName + '</div>';
                        }
                        return output;
                    },
                    
                },
                {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    // width: 130,
                    // overflow: 'visible',
                    autoHide: false,
                    template: function(data) {
                        if (applianceAccessoryPermission >= 3) {
                            var action = '\
<button type="button"  onclick="getapplianceAccessoryById(\'' + baseURL + '\',\'' + data.applianceAccessoryId + '\');"  class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2" title="Edit details">\
			<span class="svg-icon svg-icon-md">\
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
						<rect x="0" y="0" width="24" height="24"/>\
						<path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "/>\
						<path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>\
					</g>\
				</svg>\
			</span>\
		</button>\
		';
        action += '\
			<button type="button"  onclick="deleteapplianceAccessoryById(\'' + baseURL + '\',\'' + data.applianceAccessoryId + '\');"  class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon" title="Delete Brand">\
			<span class="svg-icon svg-icon-md">\
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
						<rect x="0" y="0" width="24" height="24"/>\
						<path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>\
						<path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>\
					</g>\
				</svg>\
			</span>\
		</button>\
		';
                            //                     if (workscopePermission >= 5) {
                            //                         action += '\
                            // 	<button type="button"  onclick="deleteCustomerById(\'' + baseURL + '\',\'' + data.customerId + '\');"  class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon" title="Delete">\
                            // 	<span class="svg-icon svg-icon-md">\
                            // 		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                            // 			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                            // 				<rect x="0" y="0" width="24" height="24"/>\
                            // 				<path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>\
                            // 				<path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>\
                            // 			</g>\
                            // 		</svg>\
                            // 	</span>\
                            // </button>\
                            // ';
                            //                     }
                            return action;
                        } else {
                            return `<span></span>`;
                        }
                    },
                },
                {
                    field: 'unitOfMeasurementId',
                    title: 'unit Of Measurement',
                    // autoHide: true,
                    template: function(data) {
                        var output = '';
                        if (data.unitOfMeasurementId != null) {
                            output += '<div class="font-weight-bold text-muted">' + data.unitOfMeasurementName + '</div>';
                        }
                        return output;
                    },
                    
                },

                {
                    field: 'applianceAccesoryDescription',
                    title: 'Description',
                    // autoHide: true,
                    template: function(data) {
                        var output = '';
                        if (data.applianceAccesoryDescription != null) {
                            output += '<div class="font-weight-bold text-muted">' + data.applianceAccesoryDescription + '</div>';
                        }
                        return output;
                    },
                    
                }
                 
 

            ],
        });

        $('#kt_datatable_search_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_datatable_contact_statuss').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });


        $('#kt_datatable_search_status, #kt_datatable_contact_statuss').selectpicker();
        // $('#kt_datatable_search_status').selectpicker();
    };



    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    var _handleFormAddapplianceAccessory = function() {
        var form = KTUtil.getById('kt_add_applianceAccessory');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_add_applianceAccessory_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        applianceAccessoryName: {
                            validators: {
                                notEmpty: {
                                    message: 'Item Name is required'
                                }
                            }
                        },
                        // promoCode: {
                        //     validators: {
                        //         notEmpty: {
                        //             message: 'Code is required'
                        //         }
                        //     }
                        // },
                        // kt_datepicker_3: {
                        //     validators: {
                        //         notEmpty: {
                        //             message: 'Date is required'
                        //         }
                        //     }
                        // },
                        // kt_datepicker_2: {
                        //     validators: {
                        //         notEmpty: {
                        //             message: 'Date is required'
                        //         }
                        //     }
                        // },
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
              //  console.log($('input[name="measurementPromo"]:checked').val());
               // var measurementPromo=$('input[name="measurementPromo"]:checked').val()=="on"?true:false;


                        //  added to brand select in insert statment 

                      

                        //
                        var applianceAccessory = {
                            applianceAccessoryId:  document.getElementById("applianceAccessoryId").innerHTML,
                            applianceAccessoryName: document.getElementById('applianceAccessoryName').value,
                            applianceAccesoryDescription: document.getElementById('applianceAccesoryDescription').value,
                            applianceAccessoryTypeId: document.getElementById('applianceAccessoryTypeId').value,
                            unitOfMeasurementId: document.getElementById('unitOfMeasurementId').value,
                            applianceAccessoryImgUrl: measurementFile[0],
                            applianceAccessoryPrice: document.getElementById('applianceAccessoryPrice').value,
                            brandId: document.getElementById('brandId').value,   
                            isActive: true,
                            isDeleted:true,
                            createdBy: 0,
                            createdDate: "string",
                            updatedBy: 0,
                            updatedDate: "string",
                            applianceAccessoryType: {},
                            brand: {},
                            unitOfMeasurement: {}
            
                        };
                        const data = JSON.stringify(applianceAccessory);
                        console.log(data);
                       // alert(JSON.stringify(applianceAccessory))

                

               
               
               
                if(applianceAccessory.applianceAccessoryId==0){

                    $.ajax({
                        type: "Post",
                        url: baseURL + '/ApplianceAccessory/CreateApplianceAccessory',
    
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
                                window.location.replace("item.html");
    
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

                  
                }
                else{  
                    
                    

                    var applianceAccessoryupdate = {
                        applianceAccessoryId:  document.getElementById("applianceAccessoryId").innerHTML,
                        applianceAccessoryName: document.getElementById('applianceAccessoryName').value,
                        applianceAccesoryDescription: document.getElementById('applianceAccesoryDescription').value,
                        applianceAccessoryPrice: document.getElementById('applianceAccessoryPrice').value,
                        applianceAccessoryTypeId: document.getElementById('applianceAccessoryTypeId').value,
                        brandId: document.getElementById('brandId').value,
                        unitOfMeasurementId: document.getElementById('unitOfMeasurementId').value,
                        applianceAccessoryImgUrl: measurementFile[0]
                        
                    };
                    const data = JSON.stringify(applianceAccessoryupdate);
                    console.log(data);
                   // alert(JSON.stringify(applianceAccessory))



                    $.ajax({
                        type: "Post",
                        url: baseURL + '/ApplianceAccessory/UpdateApplianceAccessoryById',
    
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
                                window.location.replace("item.html");
    
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
                }

              

                

                
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
        // public functions
        init: function() {
            _demo();
            _handleFormAddapplianceAccessory();
        },
    };
}();
let permissions;
let applianceAccessoryPermission;
jQuery(document).ready(function() {

    var login = localStorage.getItem("user");
    if (login !== null) {
        user = JSON.parse(login);
        console.log(user);
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 12) {
                applianceAccessoryPermission = permissions[i].permissionLevelId;
                console.log(applianceAccessoryPermission);
              
            }
        }
        if(applianceAccessoryPermission==null){
        window.location.replace("index.html");
        }

      //  if (applianceAccessoryPermission >= 2) {


            document.getElementById('btnNewCustomer').innerHTML += `	<!--begin::Button-->
			<button type="button" onclick="customFormReset();" data-target="#addapplianceAccessory" data-toggle="modal"
				class="btn btn-primary font-weight-bolder">
				<span class="svg-icon svg-icon-md">
					<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Flatten.svg-->
					<svg xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
						height="24px" viewBox="0 0 24 24" version="1.1">
						<g stroke="none" stroke-width="1" fill="none"
							fill-rule="evenodd">
							<rect x="0" y="0" width="24" height="24" />
							<circle fill="#000000" cx="9" cy="15" r="6" />
							<path
								d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z"
								fill="#000000" opacity="0.3" />
						</g>
					</svg>
					<!--end::Svg Icon-->
				</span>New Item</button>
			<!--end::Button-->`;
      //  }
    }
    KTAppsUsersListDatatable.init();


    $.ajax({
        type: "post",
        url: baseURL + '/UnitOfMeasurement/GetAllUnitOfMeasurement' ,
        success: function(response) {

            console.log(response);
            if (response.isError == false) {
                // for(var i=0;i<response.data.length;i++){
                // brand += `<option value="`+response.data[i].brandId+`">`+response.data[i].brandName+`</option>`;
                // }

                const roleTypeList2 = document.getElementById('unitOfMeasurementId');
                var roleTypeListHTML2 = new Array();
                roleTypeListHTML2.push('<option value="0"></option>');
                var selected='';
                for (var i = 0; i < response.data.length; i++) {
                    selected='';
                    // if( unitOfMeasurementNUM == response.data[i].unitOfMeasurementId){
                    //     selected='selected';
                    // }
                    roleTypeListHTML2.push(`
                    <option value="` + response.data[i].unitOfMeasurementId+ `" `+selected+`>` + response.data[i].unitOfMeasurementName + `</option>`);
                }
                roleTypeList2.innerHTML = roleTypeListHTML2.join('');


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
        
        }
    });


$.ajax({
    type: "post",
    url: baseURL + '/Brand/GetAllBrand' ,
    success: function(response) {
    
        console.log(response);
        if (response.isError == false) {
            // for(var i=0;i<response.data.length;i++){
            // brand += `<option value="`+response.data[i].brandId+`">`+response.data[i].brandName+`</option>`;
            // }

            const roleTypeList1 = document.getElementById('brandId');
            var roleTypeListHTML1 = new Array();
            roleTypeListHTML1.push('<option value="0"></option>');
            var selected='';
            for (var i = 0; i < response.data.length; i++) {
                selected='';
                // if(brandNUM == response.data[i].brandId){
                //     selected='selected';
                // }
                roleTypeListHTML1.push(`
                <option value="` + response.data[i].brandId+ `" `+selected+`>` + response.data[i].brandName + `</option>`);
            }
            roleTypeList1.innerHTML = roleTypeListHTML1.join('');


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
    
    }
});


$.ajax({
    type: "get",
    url: baseURL + '/ApplianceAccessoryType/GetAllApplianceAccessoryType' ,
    success: function(response) {
    

    
        console.log(response);
        if (response.isError == false) {
            // for(var i=0;i<response.data.length;i++){
            // brand += `<option value="`+response.data[i].brandId+`">`+response.data[i].brandName+`</option>`;
            // }

            const roleTypeList3 = document.getElementById('applianceAccessoryTypeId');
            var roleTypeListHTML3 = new Array();
            roleTypeListHTML3.push('<option value="0"></option>');
            var selected='';
            for (var i = 0; i < response.data.length; i++) {
                selected='';
                // if(applianceAccessoryTypeNUM == response.data[i].applianceAccessoryTypeId){
                //     selected='selected';
                // }
                roleTypeListHTML3.push(`
                <option value="` + response.data[i].applianceAccessoryTypeId+ `" `+selected+`>` + response.data[i].applianceAccessoryTypeName + `</option>`);
            }
            roleTypeList3.innerHTML = roleTypeListHTML3.join('');


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
    
    }
});





});