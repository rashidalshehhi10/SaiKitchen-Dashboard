"use strict";

import {
    baseURL
} from './constant.js'
import {
    inqStatus
} from './status.js'
let user;
var table;
var y = new Array();
var KTDatatablesSearchOptionsAdvancedSearch = function() {

    $.fn.dataTable.Api.register('column().title()', function() {
        return $(this.header()).text().trim();
    });

    var initTable1 = function() {
        // begin first table
         table = $('#kt_datatable').DataTable({
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html

            lengthMenu: [5, 10, 25, 50],
            start:1,
            pageLength: 10,

            language: {
                'lengthMenu': 'Display _MENU_',
            },
            serverSorting: true,
            autoColumns: true,
            order: [
                [0, 'desc']
            ],
            //searching:true,
            searchDelay: 0,
            processing: true,
            serverSide: true,
            ajax: {
                //url: baseURL + '/Inquiry/GetInquiriesOfBranch?branchId=' + user.data.userRoles[0].branchId,
                url: baseURL + '/Inquiry/GetPagingInquiriesOfBranch?branchId=' + user.data.userRoles[0].branchId,
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'inquiryId', 'inquiryCode', 'status', 'workscopeNames','inquiryComment',
                        'measurementScheduleDate', 'measurementAssignTo','designScheduleDate', 'designAssignTo','isMeasurementProvidedByCustomer','isDesignProvidedByCustomer', 'customerCode', 'customerName',
                        'customerContact','customerEmail', 'buildingAddress','buildingMakaniMap', 'buildingTypeOfUnit', 'buildingCondition', 'buildingFloor', 'buildingReconstruction',
                         'isOccupied','inquiryDescription', 'inquiryStartDate', 'inquiryEndDate', 'inquiryAddedBy','inquiryAddedById','measurementAddedOn','designAddedOn','quotationAddedOn','commentAddedOn','factorName','noOfRevision', 'actions'
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
                    data: 'customerName'
                },
                {
                    data: 'workscopeNames'
                },
                {
                    data: 'inquiryComment'
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
                    data: 'isMeasurementProvidedByCustomer'
                },
                {
                    data: 'isDesignProvidedByCustomer'
                },
                {
                    data: 'customerCode'
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
                    data: 'buildingMakaniMap'
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
                    data: 'inquiryStartDate'
                },
                {
                    data: 'inquiryEndDate'
                },
                {
                    data: 'inquiryAddedBy'
                },
                {
                    data: 'measurementAddedOn'
                },
                {
                    data: 'designAddedOn'
                },
                {
                    data: 'quotationAddedOn'
                },
                {
                    data: 'commentAddedOn'
                },
                {
                    data: 'factorName'
                },
                {
                    data: 'actions',
                    responsivePriority: -1
                },
            ],

            initComplete: function() {
                this.api().columns().every(function() {
                    var column = this;

                   /*  switch (column.title()) {
                        // case 'Country':
                        // 	column.data().unique().sort().each(function(d, j) {
                        // 		$('.datatable-input[data-col-index="2"]').append('<option value="' + d + '">' + d + '</option>');
                        // 	});
                        // 	break;
                        // case 'Building Makani Map':
                        //     column.data().unique().sort().each(function(d, j) {
                        //         if (d != null)
                        //             $('.datatable-input[data-col-index="13"]').append('<a href='+d+' target="_blank">Click here</a>');
                        //     });
                        //     break;
                        default:
                            //Statements executed when none of
                            //the values match the value of the expression
                            var v=column.title();
                        break;
                        
                        case 'Status':
                            var status = inqStatus;
                            column.data().unique().sort().each(function(d, j) {
                                if (d != null)
                                    $('.datatable-input[data-col-index="2"]').append('<option value="' + d + '">' + status[d].title + '</option>');
                            });
                            break;
                        case 'Added By':
                            column.data().unique().sort().each(function(d, j) {
                                if (d != null)
                                    $('.datatable-input[data-col-index="25"]').append('<option value="' + d+ '">' + d + '</option>');
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
                    } */
                });
                //var allData = table.data();
            },

            columnDefs: [{
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function(data, type, full, meta) {
                        var action = ``;
                        action += `\<a  style="background-color:#734f43;margin:2px" href="`+window.location.origin+`/viewinquirystatus.html?inquiryId=` + full.inquiryId + `"     class="btn btn-sm btn-clean btn-icon" title="Inquiry Status">
                        <i class="la la-ellipsis-h"></i>\
                        </a>\
                        `;
                        if(full.status == 46){
                            action += `\<a  href="javascript:;" style="background-color:#734f43;margin:2px" onclick="changeFactor('` + full.factorName + `',`+full.inquiryId+`)"  data-toggle="modal" data-target="#changefactor"  class="btn btn-sm btn-clean btn-icon" title="Change Factory">
                            <i class="la la-foursquare"></i>\
                            </a>\
                            `;
                        }
                        if(full.inquiryAddedById==user.data.userId ||userRoleId==1){
                            action += `\<a href="javascript:;" style="background-color:#734f43;margin:2px" onclick="setInquiryWorkscopeId(` + full.inquiryId + `)"   data-toggle="modal" data-target="#managedby"  class="btn btn-sm btn-clean btn-icon" title="Change Inquiry Managed By">
                            <i class="la la-user-alt"></i>\
                            </a>\
                        `;  
                            action += `\<a href="javascript:;" style="background-color:#734f43;margin:2px" onclick="setInquiryWorkscopeId(` + full.inquiryId + `)"   data-toggle="modal" data-target="#InquiryComment"  class="btn btn-sm btn-clean btn-icon" title="Add Comment">
                            <i class="la la-file-text-o"></i>\
							</a>\
                        `;
                        if (inquiryPermission >= 3) {
                            console.log(full.inquiryId);
                            // onclick="`+full.inquiryId+`"
                            if(full.status==1 || full.status==2 || full.status==8 || full.status==36 ||full.status==37 || full.status==38 ) {
                             action += `
                            <a type="button" style="background-color:#734f43;margin:2px" onclick="setInquiryId(` + full.inquiryId + `,1)" data-toggle="modal" data-target="#ScheduleDate" class="btn btn-sm btn-clean btn-icon" title="Re-Schedule">
								<i class="la la-calendar"></i>
							</a>
						`;    }
                        if(full.status==3 || full.status==4 || full.status==11 || full.status==39 ||full.status==40 || full.status==41) {
                            action += `
                           <a type="button" style="background-color:#734f43;margin:2px" onclick="setInquiryId(` + full.inquiryId + `,2)" data-toggle="modal" data-target="#ScheduleDate" class="btn btn-sm btn-clean btn-icon" title="Re-Schedule">
                               <i class="la la-calendar"></i>
                           </a>
                       `;    }
                       if(full.status==5 || full.status==6 ) {
                        action += `
                        <a type="button" style="background-color:#734f43;margin:2px" onclick="setInquiryId(` + full.inquiryId + `,3)" data-toggle="modal" data-target="#ScheduleDate" class="btn btn-sm btn-clean btn-icon" title="Re-Schedule">
                            <i class="la la-calendar"></i>
                        </a>
                    `;    
                        }
                           
                         if (inquiryPermission >= 3 && full.status==1 && full.noOfRevision==0) {
                            console.log(full.inquiryId);
                            // onclick="`+full.inquiryId+`" 
                             action += `
                           <a href="javascript:;" style="background-color:#734f43;margin:2px" onclick="setInquiryWorkscopeId(` + full.inquiryId + `)"  data-toggle="modal" data-target="#AddWorkscope"  class="btn btn-sm btn-clean btn-icon" title="Add workscope">
								<i class="la la-plus-square"></i>
							</a>
						`;}
                            if (inquiryPermission == 4) {
                                action += '\
                            <a href="javascript:;" style="background-color:#734f43;margin:2px" class="btn btn-sm btn-clean btn-icon" title="Escalate">\
                            <i class="la la-bitbucket-square"></i>\
                        </a>\
                        ';
                            }
                            
                            if (full.status==16 ) {
                                action += `
                              <a  style="background-color:#734f43;margin:2px" target="blank" href="`+window.location.origin+`/viewdesigncustomer.html?inquiryWorkscopeId=` + full.inquiryId + `"    class="btn btn-sm btn-clean btn-icon" title="View Customer Approval Pending">
                              <i class="la fab la-codepen"></i>
                               </a>
                           `;
                          }
                            if (full.status==15 ) {
                               action += `
                               <a  style="background-color:#734f43;margin:2px" target="blank" href="`+window.location.origin+`/invoice.html?inquiryId=` + full.inquiryId + `"    class="btn btn-sm btn-clean btn-icon" title="View Quotation Customer Approval Pending">
                               <i class="la la-file-contract"></i>
                               </a>
                           `;
                           }
                           if (full.status==59 ) {
                            action += `
                            <a  style="background-color:#734f43;margin:2px" target="blank" href="`+window.location.origin+`/payinvoice.html?inquiryId=` + full.inquiryId + `"    class="btn btn-sm btn-clean btn-icon" title="View Contract Customer Approval Pending">
                            <i class="la la-file-contract"></i>
                            </a>
                        `;
                        }
                            if (inquiryPermission >= 5) {
                                action += `\<a href="javascript:;" style="background-color:#734f43;margin:2px" onclick="GetWorkscopesByinquiryId(` + full.inquiryId + `)"  data-toggle="modal" data-target="#DelWorkscope"  class="btn btn-sm btn-clean btn-icon" title="Delete workscope">
                            <i class="la la-trash"></i>\
							</a>\
                        `;
                            }
                        }
                            // return action;
                        } 
                        // else {
                        //     return `<span></span>`;
                        // }
                        
                        return action;
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
                {
                	targets: 16,
                	render: function(data, type, full, meta) {
                	
                		if (typeof data === 'undefined' || data===null || data=="") {
                			return data;
                		}
                		return '<div class="font-weight-bolder text-primary mb-0"><a href='+data+' target="_blank">Click Here</a></div>';
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
        
        $('#TotalInquiry').on('click', function() {
            table.column(2).search('',true, false, true ).draw();
            
            document.getElementById('l').innerHTML=  table.page.info().recordsTotal;
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#MeasurementPending').on('click', function() {
             table.column(2).search(1,true, false, true ).draw();
             $('html, body').animate({
                 scrollTop: $("#kt_datatable").offset().top
             }, 1000);
          });
         $('#MeasurementDelayed').on('click', function() {
            table.column(2).search(2,true, false, true).draw(); 
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         }); 
         $('#MeasurementWaitingForApproval').on('click', function() {
            table.column(2).search(9,true, false, true).draw(); 
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });   
         $('#MeasurementRejected').on('click', function() {
            table.column(2).search(8,true, false, true).draw();
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#DesignPending').on('click', function() {
            table.column(2).search(3,true, false, true).draw();
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#DesignDelayed').on('click', function() {
            table.column(2).search(4,true, false, true).draw();  
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#DesignWaitingForApproval').on('click', function() {
            table.column(2).search(16,true, false, true).draw();
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#DesignRejected').on('click', function() {
            table.column(2).search(11,true, false, true).draw();  
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#QuotationPending').on('click', function() {
            table.column(2).search(5,true, false, true).draw();  
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
             $('#QuotationDelayed').on('click', function() {
            table.column(2).search(6,true, false, true).draw();  
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#QuotationWaitingForCustomerApproval').on('click', function() {
            table.column(2).search(15,true, false, true).draw();
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);   
         });
         $('#QuotationRejected').on('click', function() {
            table.column(2).search(14,true, false, true).draw(); 
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#DesignRevisionRequested').on('click', function() {
            table.column(2).search(56,true, false, true).draw(); 
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#QuotationApproved').on('click', function() {
            table.column(2).search(13,true, false, true).draw(); 
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#JobOrderInProgress').on('click', function() {
            table.column(2).search(21,true, false, true).draw(); 
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#JobOrderDelayed').on('click', function() {
            table.column(2).search(26,true, false, true).draw(); 
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
         });
         $('#JobOrderCompleted').on('click', function() {
            table.column(2).search(27,true, false, true).draw(); 
            $('html, body').animate({
                scrollTop: $("#kt_datatable").offset().top
            }, 1000);
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

        /* $('#kt_search').click(function (e) {
            //Apply search for Employee Name // DataTable column index 0
           // oTable.columns(0).search($('#txtEmployeeName').val().trim());
            //Apply search for Country // DataTable column index 3
           // oTable.columns(3).search($('#ddCountry').val().trim());
            //hit search on server
            table.columns(0).search($('#inqId').val().trim());
            e.preventDefault();
            table.draw();
        }); */
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


    var _handleFormAddWorkscope = function() {
        var form = KTUtil.getById('kt_modify_add_workscope');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_add_workscope_button');

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
             
              var inquiryWorkscope=  {inquiryWorkscopeId:document.getElementById("inquiryWorkscopeId").innerHTML,
              workScopeId: new Array()
            };
            
					var workscope = document.getElementsByClassName("tagify__tag tagify__tag tagify__tag--primary");
					workscope.forEach(element => {
						try {
							inquiryWorkscope.workScopeId.push(element.attributes.workScopeId.value,);
						} catch (error) {

						}
					});
                const data = JSON.stringify(inquiryWorkscope);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Inquiry/AddWorkscopetoInquiry',

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
                            window.location.replace("inquiry.html");

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
    var _handleFormComment = function() {
        var form = KTUtil.getById('kt_inq_comment');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_comment_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        inqtxtComment: {
                            validators: {
                                notEmpty: {
                                    message: 'Comment is required'
                                }
                            }
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
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
                var inquiryComment = {
                    inquiryId: document.getElementById("inquiryWorkscopeId").innerHTML,
                    comment: $('#inqtxtComment').val(),
                };
                const data = JSON.stringify(inquiryComment);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Inquiry/AddComment',

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
                        console.log(response);
                        if (response.isError == false) {
                            window.location.replace("inquiry.html");

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
            _handleFormAddWorkscope();
            _handleFormComment();
        },

    };

}();

let permissions;
let userRoleId;
let inquiryPermission;

jQuery(document).ready(function() {



    var login = localStorage.getItem("user");
    if (login !== null) {
        user = JSON.parse(login);
        console.log(user);
        userRoleId = user.data.userRoles[0].branchRole.roleTypeId;
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 6) {
                inquiryPermission = permissions[i].permissionLevelId;
                console.log(inquiryPermission);
            }
        }
    }
    document.getElementById('btnNewInquiry').innerHTML += `
    <a href="javascript:toggleSearch()" class="btn btn-primary font-weight-bolder">
        <span class="svg-icon svg-icon-md">
        <!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo2/dist/../src/media/svg/icons/General/Search.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect x="0" y="0" width="24" height="24"/>
            <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
            <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"/>
        </g>
    </svg><!--end::Svg Icon-->

            </span>Search</a>
`;
    if (inquiryPermission >= 2) {
        document.getElementById('btnNewInquiry').innerHTML += `
      
                <div style="width:15px"></div>
                <a href="addinquiry.html" class="btn btn-primary font-weight-bolder">
                    <span class="svg-icon svg-icon-md">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                            height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="9" cy="15" r="6" />
                                <path
                                    d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z"
                                    fill="#000000" opacity="0.3" />
                            </g>
                        </svg>
                        </span>New Inquiry</a>`;
    }



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
 
    $.ajax({
        type: "Get",
        url: baseURL + '/User/GetInquiryCreateUser',
        data:null,
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
                const roleTypeList = document.getElementById('kt_selectmanagedby');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 0; i < response.data.length; i++) {
                    selected='';
                    roleTypeListHTML.push(`<option value="` + response.data[i].userId+ `" `+selected+`>` + response.data[i].userName + `</option>`);
                }
                roleTypeList.innerHTML = roleTypeListHTML.join('');
 



              //  const handlby = document.getElementById('handledby');
                var handledbyHTML = new Array();
                handledbyHTML.push('<option value="">select</option>');
                for ( var i = 0; i < response.data.length; i++) {
             
           
            //   var m =response.data[0].inquiries[i][0];
            handledbyHTML.push('<option value ="'+response.data[i].userId+'" >' + response.data[i].userName + '</option>');
                }
                document.getElementById('handledby').innerHTML = handledbyHTML.join(''); 


                


            } else {

            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {


        }
    });
    $.ajax({
		type: "Post",
		url: baseURL + '/Inquiry/GetinquiryStatusByBranch',

		headers: {
        'Content-Type': 'application/json',
        'userId': user.data.userId,
        'userToken': user.data.userToken,
        'userRoleId': user.data.userRoles[0].userRoleId,
        'branchId': user.data.userRoles[0].branchId,
        'branchRoleId': user.data.userRoles[0].branchRoleId,
        'Access-Control-Allow-Origin': '*',
		},
		success: function (response) {
			console.log(response);

    




            
             document.getElementById('a').innerHTML=response.data[0].inquiries[0][0].inquiryCount;
             
             document.getElementById('b').innerHTML=response.data[0].inquiries[1][0].inquiryCount;

             document.getElementById('c').innerHTML=response.data[0].inquiries[8][0].inquiryCount;

             document.getElementById('d').innerHTML=response.data[0].inquiries[7][0].inquiryCount;

             document.getElementById('e').innerHTML=response.data[0].inquiries[2][0].inquiryCount;

             document.getElementById('f').innerHTML=response.data[0].inquiries[3][0].inquiryCount;

             document.getElementById('g').innerHTML=response.data[0].inquiries[15][0].inquiryCount;
             
             document.getElementById('h').innerHTML=response.data[0].inquiries[10][0].inquiryCount;

             document.getElementById('i').innerHTML=response.data[0].inquiries[4][0].inquiryCount;

             document.getElementById('j').innerHTML=response.data[0].inquiries[5][0].inquiryCount;

             document.getElementById('k').innerHTML=response.data[0].inquiries[14][0].inquiryCount;

             document.getElementById('l').innerHTML=response.data[0].inquiries[13][0].inquiryCount;

             document.getElementById('m').innerHTML=response.data[0].inquiries[55][0].inquiryCount;
             
             document.getElementById('n').innerHTML=response.data[0].inquiries[12][0].inquiryCount;

             document.getElementById('o').innerHTML=response.data[0].inquiries[46][0].inquiryCount;
             
             document.getElementById('p').innerHTML=response.data[0].inquiries[25][0].inquiryCount;

             document.getElementById('q').innerHTML=response.data[0].inquiries[26][0].inquiryCount;

             document.getElementById('r').innerHTML=  response.data[0].totalinquiries;

           
         

          const statusFilter = document.getElementById('selectfilter');
                 var statusFilterHTML = new Array();
                 statusFilterHTML.push('<option value="">select</option>');
                 for ( var i = 0; i < response.data[0].inquiries.length; i++) {
              
            
                var m =response.data[0].inquiries[i][0];
                     statusFilterHTML.push('<option value ="'+m.inquiryStatusId+'" >' + m.inquiryStatusName + '</option>');
                 }
                 document.getElementById('selectfilter').innerHTML = statusFilterHTML.join(''); 




		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {

		}
	});

    KTDatatablesSearchOptionsAdvancedSearch.init();
});




$('#kt_managedby_button').click(function () {
    var checklistdata = {
        "inquiryId":parseInt( document.getElementById('inquiryWorkscopeId').innerHTML),
        "id": parseInt(document.getElementById('kt_selectmanagedby').value),
      };

    const data = JSON.stringify(checklistdata);
    console.log(data);
    
    $.ajax({
        type: "Post",
        url: baseURL + '/Inquiry/ChangeInquiryManagedBy',
        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
        success: function(response) {
            console.log(response);
 
            window.location.replace("inquiry.html");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });
});

$('#kt_add_customer_button').click(function () {
    var type = document.getElementById("typeId").value;
    var form = KTUtil.getById('kt_modify_inquiry_schedule');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_add_customer_button');

        if (!form) {
            return;
        }
        var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
      if(type==1){
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
                var inquirySchedule = {
                    inquiryId: document.getElementById("inquiryId").innerHTML,
                    measurementAssignedTo: $('#kt_assignto').val(),
                    measurementScheduleDate: document.getElementById('measurement_schedule_date').value,
                    inquiryStatusId: 0,
                    designAssignedTo: 0,
                    designScheduleDate:"",
                    isProvidedByCustomer:$('input[name="clientMeasurement"]:checked').val(),
                };
                const data = JSON.stringify(inquirySchedule);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Inquiry/UpdateAssignMeasurement',

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
                            window.location.replace("inquiry.html");

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
        if(type==2){
            var form = KTUtil.getById('kt_modify_inquiry_schedule');
            var formSubmitUrl = KTUtil.attr(form, 'action');
            var formSubmitButton = KTUtil.getById('kt_add_customer_button');
    
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
                    var inquirySchedule = {
                        inquiryId: document.getElementById("inquiryId").innerHTML,
                        inquiryWorkscopeId:0,
                        measurementAssignedTo: 0,
                        measurementScheduleDate: "",
                        inquiryStatusId:0,
                        designAssignedTo: $('#kt_designassignto').val(),
                        designScheduleDate: document.getElementById('design_schedule_date').value,
                        isProvidedByCustomer:$('input[name="clientDesign"]:checked').val(),
                    };
                    const data = JSON.stringify(inquirySchedule);
                    console.log(data);
                    $.ajax({
                        type: "Post",
                        url: baseURL + '/Inquiry/UpdateAssignDesign',
    
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
                         //   KTUtil.btnRelease(formSubmitButton);
                            console.log(response);
                            // window.location.replace("home.html");
                            if (response.isError == false) {
                                // sessionStorage.setItem('user', JSON.stringify(response));
                                window.location.replace("inquiry.html");
    
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
        if(type==3){
            var form = KTUtil.getById('kt_modify_inquiry_schedule');
            var formSubmitUrl = KTUtil.attr(form, 'action');
            var formSubmitButton = KTUtil.getById('kt_add_customer_button');
    
            if (!form) {
                return;
            }
    
            FormValidation
                .formValidation(
                    form, {
                        fields: {
                            quotation_schedule_date: {
                                validators: {
                                    notEmpty: {
                                        message: 'Quotation Schedule Date is required'
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
                    var inquirySchedule = {
                        inquiryId:parseInt( document.getElementById("inquiryId").innerHTML),
                        userId: user.data.userId,
                        date: document.getElementById('quotation_schedule_date').value,
                    };
                    const data = JSON.stringify(inquirySchedule);
                    console.log(data);
                    $.ajax({
                        type: "Post",
                        url: baseURL + '/Quotation/QuotationSchedule',
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
                         //   KTUtil.btnRelease(formSubmitButton);
                            console.log(response);
                            // window.location.replace("home.html");
                            if (response.isError == false) {
                                // sessionStorage.setItem('user', JSON.stringify(response));
                                window.location.replace("inquiry.html");
    
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
});

$('#kt_factor_button').click(function () {
    var Factorlistdata = {
        "inquiryId":parseInt( document.getElementById('inquiryId').innerHTML),
        "factoryId": parseInt(document.getElementById('kt_select_branch').value),
      };

    const data = JSON.stringify(Factorlistdata);
    console.log(data);
    
    $.ajax({
        type: "Post",
        url: baseURL + '/JobOrder/ChangeFactory',
        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
        success: function(response) {
            console.log(response);
 
            window.location.replace("inquiry.html");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });
});