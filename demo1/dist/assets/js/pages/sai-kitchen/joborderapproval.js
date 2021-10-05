"use strict";

import {
    baseURL
} from './constant.js'
import {
    measurementFile
} from './constant.js'
import {
    inqStatus
} from './status.js'
let user;
export let workscopelist;
var filearry = new Array();
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
                url: baseURL + '/JobOrder/GetInquiryJobOrderFactoryByBranchId?branchId=' + user.data.userRoles[0].branchId,
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'inquiryId', 'inquiryCode','quotationNo', 'status', 'workScopeName','customerCode', 'customerName',
                        'customerContact','customerEmail', 'buildingAddress', 'buildingTypeOfUnit', 'buildingCondition', 'buildingFloor', 'buildingReconstruction',
                         'isOccupied','inquiryDescription','inquiryComment', 'inquiryStartDate', 'inquiryEndDate', 'inquiryAddedBy','inquiryAddedById','noOfRevision', 'actions'
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
                    data: 'quotationNo'
                },
                {
                    data: 'status'
                },
                {
                    data: 'workScopeName'
                },
                {
                    data: 'customerCode'
                },
                {
                    data: 'customerName'
                },
                {
                    data: 'customerContact'
                },
                {
                    data: 'customerEmail'
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
                    data: 'isOccupied'
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
                                    $('.datatable-input[data-col-index="3"]').append('<option value="' + status[d].title + '">' + status[d].title + '</option>');
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
                        console.log(full);
                        var action = ``;
                        
                        
                        if (quotationPermission >= 2) {
                            console.log(full.inquiryId);
                         
                        action += `
                        <a href="viewjoborderapproval.html?inquiryId=` + full.inquiryId + `" style="background-color:#734f43;margin:2px" class="btn btn-sm btn-clean btn-icon" title="View Inquiry">\
                        <i class="la la-file-contract"></i>
                    </a>
                    `;
                    action += `
                            <a type="button"  onclick="addComponent(` + full.inquiryId + `);" data-toggle="modal" data-target="#ScheduleDate" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Approved">
								<i class="la la-thumbs-up"></i>
							</a>
                            <a type="button" onclick="addComponent(` + full.inquiryId + `);" data-toggle="modal" data-target="#measurementScheduleDate" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Rejected">
								<i class="la la-thumbs-down"></i>
							</a>
						`;
                        }
                            return action;
                       
                    },
                },
                {
                    targets: 3,
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
    var _handleFormJobApprove = function() {
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
                        /* measurement_schedule_date: {
                            validators: {
                                notEmpty: {
                                    message: 'Cabinetry installation Date Date is required'
                                }
                            }
                        }, */
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
                var checklistdata = {
                    "inquiryId":parseInt( document.getElementById('inquiryId').value),
                    "materialAvailablityDate": document.getElementById('schedule_date1').value,
                    "shopDrawingCompletionDate": document.getElementById('schedule_date2').value,
                    "productionCompletionDate": document.getElementById('schedule_date3').value,
                    "woodenWorkCompletionDate": document.getElementById('schedule_date4').value,
                    "materialDeliveryFinalDate": document.getElementById('schedule_date5').value,
                    "counterTopFixingDate": document.getElementById('schedule_date6').value,
                    "InstallationStartDate":document.getElementById('schedule_date7').value,
                    "InstallationCompletionDate":document.getElementById('schedule_date8').value,
                    "notes": document.getElementById('CheckComment').value,
                  };
            
                const data = JSON.stringify(checklistdata);

                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/JobOrder/JobOrderFactoryApprove',
                    headers: {
                        'Content-Type': 'application/json',
                        'userId': user.data.userId,
                        'Access-Control-Allow-Origin': '*',
                    },
                    data: data,
                    success: function(response) {
                        console.log(response);
             
                        window.location.replace("joborderapproval.html");
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        document.getElementById("alert").innerHTML ="An error occured";
                    }
                });
            });
    }
    return {

        //main function to initiate the module
        init: function() {
            initTable1();
            _handleFormJobApprove();
        },

    };

}();

let permissions;
let quotationPermission;

jQuery(document).ready(function() {



    var login = localStorage.getItem("user");
    if (login !== null) {
        user = JSON.parse(login);
        console.log(user);
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 18) {
                quotationPermission = permissions[i].permissionLevelId;
                console.log(quotationPermission);
            }
        }
    }

    KTDatatablesSearchOptionsAdvancedSearch.init();


});

$('#kt_reject_inquiry_button').click(function () {
    var rejectlistdata = {
        "inquiryId":parseInt(document.getElementById('inquiryId').value),
        "reason":document.getElementById('RejectComment1').value,
      };

    const data = JSON.stringify(rejectlistdata);
    console.log(data);
     $.ajax({
        type: "Post",
        url: baseURL + '/JobOrder/JobOrderFactoryReject',
        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
        success: function(response) {
            console.log(response);
            window.location.replace("joborderapproval.html");
            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            document.getElementById("ralert").innerHTML ="An error occured";
        }
    }); 
});

