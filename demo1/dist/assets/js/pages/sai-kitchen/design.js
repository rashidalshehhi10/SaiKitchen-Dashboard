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
                url: baseURL + '/Inquiry/GetDesignOfBranch?branchId=' + user.data.userRoles[0].branchId,
                headers: {
                    'Content-Type': 'application/json',
                    'userId': user.data.userId,
                    'userToken': user.data.userToken,
                    'userRoleId': user.data.userRoles[0].userRoleId,
                    'branchId': user.data.userRoles[0].branchId,
                    'branchRoleId': user.data.userRoles[0].branchRoleId,
                    'Access-Control-Allow-Origin': '*',
                },
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'inquiryId', 'inquiryCode', 'status', 'noOfRevision', 'workscopeNames',
                        'measurementScheduleDate', 'measurementAssignTo', 'designScheduleDate', 'designAssignTo', 'customerName',
                        'customerContact', 'buildingAddress', 'buildingTypeOfUnit', 'buildingCondition', 'buildingFloor', 'buildingReconstruction', 'inquiryDescription',
                        'inquiryComment', 'inquiryStartDate', 'inquiryEndDate', 'actions'
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
                    data: 'noOfRevision'
                },
                {
                    data: 'workscopeNames'
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
                        var ret = ``;
                        //      var ret = `<a href="javascript:;" class="btn btn-sm btn-clean btn-icon" title="Add Measurement">
                        //     <i class="la la-file-upload"></i>
                        // </a>`;
                        ret += ` <a style="background-color:#734f43;margin:2px"  href="viewmeasurement.html?inquiryWorkscopeId=` + full.inquiryId + `&designView=1"class="btn btn-sm btn-clean btn-icon" title="View Measurement">
                        <i class="la la-ruler-combined"></i>
                    </a>`;
                    ret += ` <button style="background-color:#734f43;margin:2px"  onclick="setInquiryWorkscopeId(` + full.inquiryId + `);"  class="btn btn-sm btn-clean btn-icon" title="Add Design"   data-toggle="modal" data-target="#exampleModalCenter" >
                    <i class="la fab la-codepen"></i>
                </button>`;
            //             if (full.questionaireType == 1) {
            //                 ret += ` <button  style="background-color:#734f43;margin:2px"  onclick="viewkitchenmeasurement.html?inquiryWorkscopeId=` + full.inquiryWorkscopeId + `"class="btn btn-sm btn-clean btn-icon" title="View Measurement">
            //         <i class="la la-ruler-combined"></i>
            //     </button>`;
            //             } else {
            //                 ret += ` <button  style="background-color:#734f43;margin:2px"  onclick="viewwardrobemeasurement.html?inquiryWorkscopeId=` + full.inquiryWorkscopeId + `"class="btn btn-sm btn-clean btn-icon" title="View Measurement">
            //     <i class="la la-ruler-combined"></i>
            // </button>`;
            //             }
            //             if (full.questionaireType == 1) {
            //                 ret += ` <button  style="background-color:#734f43;margin:2px"  class="btn btn-sm btn-clean btn-icon" title="Add Design"   data-toggle="modal" data-target="#exampleModalCenter" >
            //         <i class="la fab la-codepen"></i>
            //     </button>`;
            //             } else {
            //                 ret += ` <button  style="background-color:#734f43;margin:2px"  class="btn btn-sm btn-clean btn-icon" title="Add Design"   data-toggle="modal" data-target="#exampleModalCenter" >
            //     <i class="la fab la-codepen"></i>
            // </button>`;
            //             }
                        return ret;
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
                        return '<span class="label label-lg font-weight-bold' + status[data].class + ' label-inline" style="background-color:white;">' + status[data].title + '</span>';

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

    var _handleuploaddesignfile = function() {
        var form = KTUtil.getById('kt_add_design_file');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_upload_design_file');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                      
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
                console.log(brand);
                console.log(measurementFile);
                var worckscopes=[];
                var wrscpCnt = document.getElementById("wrscpCnt").value;
                for(var i=0;i<parseInt(wrscpCnt);i++){
                    var Wooden =[];
                    for(var j=1;j<=parseInt(document.getElementById("HideWoodenLength"+i).value);j++){
                      if(document.getElementById("WoodenSelect"+i+j) != null)
                        Wooden.push(
                            {
                                brand:document.getElementById("WoodenSelect"+i+j).value, 
                                item:document.getElementById("ItemName"+i+j).value, 
                                quantity:document.getElementById("Quantity"+i+j).value,
                                unit:document.getElementById("Unit"+i+j).value,
                                measurement:document.getElementById("Measurement"+i+j).value,
                                skuCode:document.getElementById("SkuCode"+i+j).value,
                                discription:document.getElementById("DescId"+i+j).value,
                            });
                    }
                    var counter =[];
                    for(var j=1;j<=parseInt(document.getElementById("HideCounterLength"+i).value);j++){
                       if(document.getElementById("CounterSelect"+i+j) != null)
                        counter.push(
                            {
                                brand:document.getElementById("CounterSelect"+i+j).value, 
                                item:document.getElementById("CItemName"+i+j).value, 
                                quantity:document.getElementById("CQuantity"+i+j).value,
                                unit:document.getElementById("CUnit"+i+j).value,
                                measurement:document.getElementById("CMeasurement"+i+j).value,
                                skuCode:document.getElementById("CSkuCode"+i+j).value,
                                discription:document.getElementById("CDescId"+i+j).value,
                            });
                    }
                    var appliance =[];
                    for(var j=1;j<=parseInt(document.getElementById("HideApplianceLength"+i).value);j++){
                        if(document.getElementById("ApplianceSelect"+i+j) != null)
                        appliance.push(
                            {
                                brand:document.getElementById("ApplianceSelect"+i+j).value, 
                                item:document.getElementById("AItemName"+i+j).value, 
                                quantity:document.getElementById("AQuantity"+i+j).value,
                                unit:document.getElementById("AUnit"+i+j).value,
                                measurement:document.getElementById("AMeasurement"+i+j).value,
                                skuCode:document.getElementById("ASkuCode"+i+j).value,
                                discription:document.getElementById("ADescId"+i+j).value,
                            });
                    }
                    var aseries =[];
                    for(var j=1;j<=parseInt(document.getElementById("HideAseriesLength"+i).value);j++){
                        if(document.getElementById("AseriesSelect"+i+j) != null)
                        aseries.push(
                            {
                                brand:document.getElementById("AseriesSelect"+i+j).value, 
                                item:document.getElementById("AsItemName"+i+j).value, 
                                quantity:document.getElementById("AsQuantity"+i+j).value,
                                unit:document.getElementById("AsUnit"+i+j).value,
                                measurement:document.getElementById("AsMeasurement"+i+j).value,
                                skuCode:document.getElementById("AsSkuCode"+i+j).value,
                                discription:document.getElementById("AsDescId"+i+j).value,
                            });
                    }
                    var Material =[];
                    for(var j=1;j<=parseInt(document.getElementById("HideMaterialLength"+i).value);j++){
                        if(document.getElementById("MaterialSelect"+i+j) != null)
                        Material.push(
                            {
                                brand:document.getElementById("MaterialSelect"+i+j).value, 
                                item:document.getElementById("MItemName"+i+j).value, 
                                quantity:document.getElementById("MQuantity"+i+j).value,
                                unit:document.getElementById("MUnit"+i+j).value,
                                measurement:document.getElementById("MMeasurement"+i+j).value,
                                skuCode:document.getElementById("MSkuCode"+i+j).value,
                                discription:document.getElementById("MDescId"+i+j).value,
                            });
                    }
                    var wrscObj = {
                        worckscoipId:document.getElementById("worckscopeId"+i).value,
                        WoodenWork:Wooden,
                        CounterTop:counter,
                        appliance:appliance,
                        Accessories:aseries,
                        Material:Material,
                    }
                    worckscopes.push(wrscObj);
                }
                 var designFiles = {
                    "inquiryId": document.getElementById("inquiryWorkscopeId").innerHTML,
                    "comment": document.getElementById('designComment').value,
                    "base64f3d": measurementFile,
                    "worckscopes":worckscopes,
                  };
                const data = JSON.stringify(designFiles);
                console.log(data);
                   $.ajax({
                    type: "Post",
                    url: baseURL + '/Design/AddUpdateDesignfiles',
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
                            window.location.replace("design.html");

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
            initTable1();
            _handleuploaddesignfile();
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