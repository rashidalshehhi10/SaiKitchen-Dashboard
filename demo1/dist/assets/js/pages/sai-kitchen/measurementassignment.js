"use strict";

import {
    baseURL
} from './constant.js'
import {
    inqStatus
} from './status.js'
let user;

var KTDatatablesSearchOptionsAdvancedSearch = function() {

    $.fn.dataTable.Api.register('column().title()', function() {
        return $(this.header()).text().trim();
    });

    var initTable1 = function() {
        // begin first table
        var table = $('#kt_datatable').DataTable({
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html

            lengthMenu: [5, 10, 25, 50],

            pageLength: 10,

            language: {
                'lengthMenu': 'Display _MENU_',
            },
            serverSorting: true,
            autoColumns: true,
            order: [
                [0, 'desc']
            ],
            searchDelay: 0,
            processing: true,
            serverSide: false,
            ajax: {
                url: baseURL + '/Inquiry/GetMeasurementAssigneeApproval?branchId=' + user.data.userRoles[0].branchId,
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'inquiryId', 'inquiryCode', 'status', 'workscopeNames','noOfRevision',
                        'measurementScheduleDate', 'measurementAssignTo', 'designScheduleDate', 'designAssignTo', 'customerName',
                        'customerContact', 'buildingAddress', 'buildingTypeOfUnit', 'buildingCondition', 'buildingFloor', 'buildingReconstruction', 'inquiryDescription',
                        'inquiryComment', 'inquiryStartDate', 'inquiryEndDate', 'inquiryAddedBy', 'actions'
                    ],
                },
            },
            columns: [{
                    data: 'inquiryId'
                },
                {
                    data: 'inquiryCode'
                },
                {
                    data: 'status'
                },
                {
                    data: 'workscopeNames'
                },
                {
                    data: 'noOfRevision'
                },
                {
                    data: 'measurementScheduleDate'
                },
                {
                    data: 'measurementAssignTo'
                },
                {
                    data: 'designScheduleDate'
                },
                {
                    data: 'designAssignTo'
                },
                {
                    data: 'customerName'
                },
                {
                    data: 'customerContact'
                },
                {
                    data: 'buildingAddress'
                },
                {
                    data: 'buildingTypeOfUnit'
                },
                {
                    data: 'buildingCondition'
                },
                {
                    data: 'buildingFloor'
                },
                {
                    data: 'buildingReconstruction'
                },
                {
                    data: 'inquiryDescription'
                },
                {
                    data: 'inquiryComment'
                },
                {
                    data: 'inquiryStartDate'
                },
                {
                    data: 'inquiryEndDate'
                },
                {
                    data: 'inquiryAddedBy'
                },
                {
                    data: 'actions',
                    responsivePriority: -1
                },
            ],

            initComplete: function() {
                this.api().columns().every(function() {
                    var column = this;

                    switch (column.title()) {
                        // case 'Country':
                        // 	column.data().unique().sort().each(function(d, j) {
                        // 		$('.datatable-input[data-col-index="2"]').append('<option value="' + d + '">' + d + '</option>');
                        // 	});
                        // 	break;

                        case 'Status':
                            var status = inqStatus;
                            column.data().unique().sort().each(function(d, j) {
                                if (d != null)
                                    $('.datatable-input[data-col-index="2"]').append('<option value="' + status[d].title + '">' + status[d].title + '</option>');
                            });
                            break;

                            // case 'Type':
                            // 	var status = {
                            // 		1: {'title': 'Online', 'state': 'danger'},
                            // 		2: {'title': 'Retail', 'state': 'primary'},
                            // 		3: {'title': 'Direct', 'state': 'success'},
                            // 	};
                            // 	column.data().unique().sort().each(function(d, j) {
                            // 		$('.datatable-input[data-col-index="7"]').append('<option value="' + d + '">' + status[d].title + '</option>');
                            // 	});
                            // 	break;
                    }
                });
            },

            columnDefs: [{
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function(data, type, full, meta) {
                     
                        // if (inquiryPermission >= 1) {
                            console.log(full.inquiryId);
                            var action=``; 
                            action += `
                            <a type="button"  data-toggle="modal" onclick="setInquiryId(` + full.inquiryId + `)" data-target="#ScheduleDate" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Approved">
								<i class="la la-thumbs-up"></i>
							</a>
                            <a type="button" onclick="setInquiryId(` + full.inquiryId + `)" data-toggle="modal" data-target="#measurementScheduleDate" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Rejected">
								<i class="la la-thumbs-down"></i>
							</a> 
						`;
                        if (full.isEscalationRequested==false){
                            action += `
                            <a type="button" onclick="setInquiryEscalationId(` + full.inquiryId + `)" data-toggle="modal" data-target="#Requestforescalation" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Request For Escalation">
                            <i class="la la-question"></i>
                            </a>  
						`;

                        }
                       
                            return action
                        // } else {
                        //     return `<span></span>`;
                        // }
                    },
                },
                {
                    targets: 2,
                    render: function(data, type, full, meta) {
                        var status = inqStatus;

                        console.log(data);
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span style="font-size:1.0rem !important; height:80px;" class="label label-lg font-weight-bold ' + status[data].class + ' label-inline" style="background-color:white;">' + status[data].title + '</span>';

                    },
                },
                // {
                // 	targets: 7,
                // 	render: function(data, type, full, meta) {
                // 		var status = {
                // 			1: {'title': 'Online', 'state': 'danger'},
                // 			2: {'title': 'Retail', 'state': 'primary'},
                // 			3: {'title': 'Direct', 'state': 'success'},
                // 		};
                // 		if (typeof status[data] === 'undefined') {
                // 			return data;
                // 		}
                // 		return '<span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
                // 			'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span>';
                // 	},
                // },
            ],
        });

        var filter = function() {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
        };

        var asdasd = function(value, index) {
            var val = $.fn.dataTable.util.escapeRegex(value);
            table.column(index).search(val ? val : '', false, true);
        };

        $('#kt_search').on('click', function(e) {
            e.preventDefault();
            var params = {};
            $('.datatable-input').each(function() {
                var i = $(this).data('col-index');
                if (params[i]) {
                    params[i] += '|' + $(this).val();
                } else {
                    params[i] = $(this).val();
                }
            });
            $.each(params, function(i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#kt_reset').on('click', function(e) {
            e.preventDefault();
            $('.datatable-input').each(function() {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });

        $('#kt_datepicker').datepicker({
            todayHighlight: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        });

    };




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
                    "id": parseInt( document.getElementById("inquiryWorkscopeId").innerHTML),
                    "measurementAssignedTo": 0,
                    "measurementScheduleDate": "",
                    "measurementComment": "",
                    "designAssignedTo": 0,
                    "designScheduleDate": "",
                    "designComment": "",
                    "feedBackReaction": 0
                };
                const data = JSON.stringify(inquiryApproved);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL+'/Measurement/ApproveMeasurementAssignee',

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
                            window.location.replace("measurementassignment.html");

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
                        measurementComment: {
                            validators: {
                                notEmpty: {
                                    message: 'Assignement reject reason  is required'
                                }
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
                    "id":parseInt(document.getElementById("inquiryWorkscopeId").innerHTML),
                    "measurementAssignedTo": 0,
                    "measurementScheduleDate": "",
                    "measurementComment": document.getElementById("measurementComment").value,
                    "designAssignedTo": 0,
                    "designScheduleDate": "",
                    "designComment": "",
                    "feedBackReaction": 0
 
                };
                const data = JSON.stringify(inquiryRejected);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Measurement/RejectMeasurementAssignee',

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
                       // KTUtil.btnRelease(formSubmitButton);
                        console.log(response);
                        // window.location.replace("home.html");
                        if (response.isError == false) {
                            // sessionStorage.setItem('user', JSON.stringify(response));
                            window.location.replace("measurementassignment.html");
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

    }

    var _handleFormRequestforescalation = function() {
        var form = KTUtil.getById('kt_escalation');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_escalation_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
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
                var inquiryRequestforEscalation = {
                    "inquiryId":parseInt(document.getElementById("inquiryWorkscopeEscalationId").innerHTML),
                    "id":user.data.userId,

                };
                const data = JSON.stringify(inquiryRequestforEscalation);
                console.log(data);
               
                $.ajax({
                    type: "Post",  
                    url: baseURL + '/Inquiry/EscalationRequest',

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
                       // KTUtil.btnRelease(formSubmitButton);
                        console.log(response);
                        // window.location.replace("home.html");
                        if (response.isError == false) {
                            // sessionStorage.setItem('user', JSON.stringify(response));
                            window.location.replace("measurementassignment.html");
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

    }
    return {

        //main function to initiate the module
        init: function() {
            initTable1();
            _handleFormAcceptMeasurement();
            _handleFormRejectMeasurement();
            _handleFormRequestforescalation();
        },

    };

}();

let permissions;
let inquiryPermission;

jQuery(document).ready(function() {



    var login = localStorage.getItem("user");
    if (login !== null) {
        user = JSON.parse(login);
        console.log(user);
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 6) {
                inquiryPermission = permissions[i].permissionLevelId;
                console.log(inquiryPermission);
            }
        }
    } 


    KTDatatablesSearchOptionsAdvancedSearch.init();
});