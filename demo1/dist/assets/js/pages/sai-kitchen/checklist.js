"use strict";

import {
    baseURL
} from './constant.js'
import {
    measurementFile
} from './constant.js'
let user;
export let workscopelist;
var filearry = new Array();
var fourfile =  new Array();
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
                url: baseURL + '/CheckList/GetInquiryChecklistByBranchId?branchId=' + user.data.userRoles[0].branchId,
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
                            var status = {
                                1: {
                                    'title': 'Measurement Pending',
                                    'class': 'label-light-primary'
                                },
                                2: {
                                    'title': 'Measurement Delayed',
                                    'class': ' label-light-danger'
                                },
                                3: {
                                    'title': 'Design Pending',
                                    'class': ' label-light-primary'
                                },
                                4: {
                                    'title': 'Design Delayed',
                                    'class': ' label-light-success'
                                },
                                5: {
                                    'title': 'Quotation Pending',
                                    'class': ' label-light-primary'
                                },
                                6: {
                                    'title': 'Quotation Delayed',
                                    'class': ' label-light-danger'
                                },
                                7: {
                                    'title': 'Measurement Approved',
                                    'class': 'label-light-success'
                                },
                                8: {
                                    'title': 'Measurement Rejected',
                                    'class': ' label-light-info'
                                },
                                9: {
                                    'title': 'Measurement Approval Pending',
                                    'class': ' label-light-primary'
                                },
                                10: {
                                    'title': 'Design Approved',
                                    'class': 'label-light-success'
                                },
                                11: {
                                    'title': 'Design Rejected',
                                    'class': ' label-light-info'
                                },
                                12: {
                                    'title': 'Design Approval Pending',
                                    'class': ' label-light-primary'
                                },
                                13: {
                                    'title': 'Quotation Approved',
                                    'class': 'label-light-success'
                                },
                                14: {
                                    'title': 'Quotation Rejected',
                                    'class': ' label-light-info'
                                },
                                15: {
                                    'title': 'Quotation Approval Pending',
                                    'class': ' label-light-primary'
                                },
                                16: {
                                    'title': 'Design Waiting For Customer Approval',
                                    'class': ' label-light-primary'
                                },
                                17: {
                                    'title': 'Design Rejected By Client',
                                    'class': ' label-light-info'
                                },
                                18: {
                                    'title': 'Check List Pending',
                                    'class': ' label-light-info'
                                },
                                32: {
                                    'title': 'Waiting For Advance',
                                    'class': ' label-light-info'
                                },
                                43: {
                                    'title': 'Commerical Checklist Pending',
                                    'class': ' label-light-primary'
                                },
                                44: {
                                    'title': 'Commerical Checklist Approved',
                                    'class': ' label-light-success'
                                },
                                45: {
                                    'title': 'Commerical Checklist Rejected',
                                    'class': ' label-light-info'
                                },
                                46: {
                                    'title': 'Job Order Factory Approval Pending',
                                    'class': ' label-light-primary'
                                },
                                47: {
                                    'title': 'Job Order Factory Accepted',
                                    'class': ' label-light-success'
                                },
                                48: {
                                    'title': 'Job Order Factory Rejected',
                                    'class': ' label-light-info'
                                },
                            };
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
                        <a href="viewchecklist.html?inquiryId=` + full.inquiryId + `" style="background-color:#734f43;margin:2px" class="btn btn-sm btn-clean btn-icon" title="View Inquiry">\
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
                        var status = {
                            1: {
                                'title': 'Measurement Pending',
                                'class': 'label-light-primary'
                            },
                            2: {
                                'title': 'Measurement Delayed',
                                'class': ' label-light-danger'
                            },
                            3: {
                                'title': 'Design Pending',
                                'class': ' label-light-primary'
                            },
                            4: {
                                'title': 'Design Delayed',
                                'class': ' label-light-success'
                            },
                            5: {
                                'title': 'Quotation Pending',
                                'class': ' label-light-primary'
                            },
                            6: {
                                'title': 'Quotation Delayed',
                                'class': ' label-light-danger'
                            },
                            7: {
                                'title': 'Measurement Approved',
                                'class': 'label-light-success'
                            },
                            8: {
                                'title': 'Measurement Rejected',
                                'class': ' label-light-info'
                            },
                            9: {
                                'title': 'Measurement Approval Pending',
                                'class': ' label-light-primary'
                            },
                            10: {
                                'title': 'Design Approved',
                                'class': 'label-light-success'
                            },
                            11: {
                                'title': 'Design Rejected',
                                'class': ' label-light-info'
                            },
                            12: {
                                'title': 'Design Approval Pending',
                                'class': ' label-light-primary'
                            },
                            13: {
                                'title': 'Quotation Approved',
                                'class': 'label-light-success'
                            },
                            14: {
                                'title': 'Quotation Rejected',
                                'class': ' label-light-info'
                            },
                            15: {
                                'title': 'Quotation Approval Pending',
                                'class': ' label-light-primary'
                            },
                            16: {
                                'title': 'Design Waiting For Customer Approval',
                                'class': ' label-light-primary'
                            },
                            17: {
                                'title': 'Design Rejected By Client',
                                'class': ' label-light-info'
                            },
                            18: {
                                'title': 'Check List Pending',
                                'class': ' label-light-info'
                            },
                            32: {
                                'title': 'Waiting For Advance',
                                'class': ' label-light-info'
                            },
                            43: {
                                'title': 'Commerical Checklist Pending',
                                'class': ' label-light-primary'
                            },
                            44: {
                                'title': 'Commerical Checklist Approved',
                                'class': ' label-light-success'
                            },
                            45: {
                                'title': 'Commerical Checklist Rejected',
                                'class': ' label-light-info'
                            },
                            46: {
                                'title': 'Job Order Factory Approval Pending',
                                'class': ' label-light-primary'
                            },
                            47: {
                                'title': 'Job Order Factory Accepted',
                                'class': ' label-light-success'
                            },
                            48: {
                                'title': 'Job Order Factory Rejected',
                                'class': ' label-light-info'
                            },
                        };

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
    var _handleFormApprove = function() {
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
                                    message: 'Preferred Date is required'
                                }
                            }
                        },
						/* kt_dropzone_6: {
                            validators: {
                                notEmpty: {
                                    message: 'JobOrderChecklistFile is required'
                                }
                            }
                        }, */
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
                 var checklistdata = {
				"inquiryId":document.getElementById('inquiryId').value,
				"factoryId": document.getElementById('kt_select_branch').value,
				"jobOrderExpectedDeadline": document.getElementById('design_schedule_date').value, 
				"comment": document.getElementById('CheckComment').value,
				"addFileonChecklists":new Array(),
				//"isAppliancesProvidedByClient" : $('input[name="isAppliances"]:checked').val(),
				//"materialSheetFileUrl":fourfile[4]==undefined?"":fourfile[4],
				//"mepDrawingFileUrl": fourfile[5]==undefined?"":fourfile[5],
				"jobOrderChecklistFileUrl":fourfile[6]==undefined?"":fourfile[6],
				//"dataSheetApplianceFileUrl":fourfile[7]==undefined?"":fourfile[7],
                "siteMeasurementMatchingWithDesign": $('input[name="isMeasurements"]:checked').val(),
                "siteMeasurementMatchingWithDesignNotes":document.getElementById("MeasurementsComment").value,
                "matrialConfirmation": $('input[name="isMaterial"]:checked').val(),
                "matrialConfirmationNotes":document.getElementById("MaterialComment").value,
                "mepDrawing": $('input[name="isMEP"]:checked').val(),
                "mepDrawingNotes":document.getElementById("MEPComment").value,
                "quotationAndCalculationSheetMatchingProposal": $('input[name="isQuotation"]:checked').val(),
                "quotationAndCalculationSheetMatchingProposalNotes":document.getElementById("QuotationComment").value,
                "approvedDrawingsAndAvailabilityOfClientSignture": $('input[name="isDrawings"]:checked').val(),
                "approvedDrawingsAndAvailabilityOfClientSigntureNotes":document.getElementById("DrawingsComment").value,
                "appliancesDataSheet": $('input[name="isAppliances"]:checked').val(),
                "appliancesDataSheetNotes":document.getElementById("AppliancesComment").value,
			  };
			  let from = document.getElementById('addcompCount').value;
			  let to = document.getElementById('addmaxCount').value;
			  for (let i = parseInt(from)+1; i <= parseInt(to); i++) {
				checklistdata.addFileonChecklists.push({
				   // "inquiryworkscopeId":0,//document.getElementById('kt_workscpe_'+i)==null?"": document.getElementById('kt_workscpe_'+i).value,
					"documentType":document.getElementById('documentType'+i).value,
					"files":filearry[i]==undefined?[]:filearry[i],
				})
			  }
			  
			  filearry= [];
			const data = JSON.stringify(checklistdata);
			console.log(data);
			console.log(fourfile);
 			 $.ajax({
				type: "Post",
				url: baseURL + '/CheckList/ApproveinquiryChecklist',
				headers: {
					'Content-Type': 'application/json',
					'userId': user.data.userId,
					'Access-Control-Allow-Origin': '*',
				},
				data: data,
				success: function(response) {
					console.log(response);
					filearry= [];
					document.getElementById("checkbody").innerHTML ="";
					document.getElementById('design_schedule_date').value ="";
					document.getElementById('CheckComment').value="";
					$('#approve').modal('hide');
					window.location.replace("checklist.html");
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					document.getElementById("alert").innerHTML ="All fields should be selected";
				}
			});   
                
            })
    }
    return {

        //main function to initiate the module
        init: function() {
            initTable1();
            _handleFormApprove();
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
            if (permissions[i].permissionId == 9) {
                quotationPermission = permissions[i].permissionLevelId;
                console.log(quotationPermission);
            }
        }
    }

    KTDatatablesSearchOptionsAdvancedSearch.init();

    $.ajax({
		type: "get",
		url: baseURL + '/Branch/GetBranchByType?typeId=3',

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
			if (response.isError == false) {

				console.log(response.data[0].permissionName);
				const branchList = document.getElementById('kt_select_branch');
				var branchTypeListHTML = new Array();

				for (var i = 0; i < response.data.length; i++) {
					branchTypeListHTML.push(`
					<option value="` + response.data[i].branchId + `">` + response.data[i].branchName + `</option>`);
				}

				branchList.innerHTML = branchTypeListHTML.join('');

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
		error: function (XMLHttpRequest, textStatus, errorThrown) {


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
});

$('#kt_reject_inquiry_button').click(function () {
    var rejectlistdata = {
        "inquiryId":document.getElementById('inquiryId').value,
        "addrejections": [{
            "inquiryWorkscopeId":document.getElementById("kt_workscpe_1")==undefined?0:parseInt(document.getElementById("kt_workscpe_1").value),
            "rejectionType":document.getElementById("documentType1").value==""?0:parseInt(document.getElementById("documentType1").value),
            "reason":document.getElementById('RejectComment1').value,
        }],

      };
      let from = document.getElementById('compCount').value;
      let to = document.getElementById('maxCount').value;
      for (let i = parseInt(from)+1; i <= parseInt(to); i++) {
        rejectlistdata.addrejections.push({
            "inquiryWorkscopeId":document.getElementById("kt_workscpe_"+i)==undefined?0:parseInt(document.getElementById("kt_workscpe_"+i).value),
            "rejectionType":document.getElementById("documentType"+i).value==""?0:parseInt(document.getElementById("documentType"+i).value),
            "reason":document.getElementById('RejectComment'+i).value,
        })
      }
    const data = JSON.stringify(rejectlistdata);
    console.log(data);
     $.ajax({
        type: "Post",
        url: baseURL + '/CheckList/RejectinquiryChecklist',
        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
        success: function(response) {
            console.log(response);
            document.getElementById("rjctbody").innerHTML ="";
            document.getElementById('RejectComment1').value="";
            document.getElementById('divscopelist1').innerHTML="";
            $('#measurementScheduleDate').modal('hide');
            window.location.replace("checklist.html");
            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            document.getElementById("ralert").innerHTML ="All fields should be selected";
        }
    }); 
});
$('#addComponentbtn').click(function () {
        
    let count = document.getElementById("addcompCount").value;
    if (count == 2)  { 
        document.getElementById("documentType3").options[document.getElementById("documentType3").options.selectedIndex].setAttribute("selected", "selected");
     }
     if (count == 1)  { 
         document.getElementById("documentType2").options[document.getElementById("documentType2").options.selectedIndex].setAttribute("selected", "selected");
         document.getElementById("documentType3").options[document.getElementById("documentType3").options.selectedIndex].setAttribute("selected", "selected");
      }
    if(parseInt(count) > 0 ){
        document.getElementById("checkbody").innerHTML +=
        `<div class="form-group row">
                        <div class="col-lg-5" >
                        <label class="font-size-h6 font-weight-bolder text-dark">Rejected Phase</label>
                            <select class="form-control" id="documentType`+count+`"  name="documentType`+count+`"  style="width:100%">
                                <option value=""></option>
                                <option value="7">Measurement</option>
                                <option value="8">Design</option>
                                <option value="9">Quotation</option>
                            </select>
                        </div>
                        <div id="file`+count+`" style="display:none"></div>
                        <div id="divscopelist`+count+`" class="col-lg-5"></div>
                        </div>
                        <div class="form-group row">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="dropzone dropzone-default dropzone-success" id="kt_dropzone_`+count+`" name="measurementDrawing`+count+`">
                                    <div class="dropzone-msg dz-message needsclick">
                                        <h3 class="dropzone-msg-title">Drop files here or click to upload.</h3>
                                        <span class="dropzone-msg-desc">Only image, video & pdf files are allowed for upload</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        
         document.getElementById("addcompCount").value = parseInt(count) -1;
         let from = document.getElementById('addcompCount').value;
      let to = document.getElementById('addmaxCount').value;
      Dropzone.autoDiscover = false;
      for (let i = parseInt(from)+1; i <= parseInt(to); i++) {
        let measurementFile =new Array();
        $('#kt_dropzone_'+i).dropzone({
            url: baseURL+"/File/UploadFile", // Set the url for your upload script location
           type: "Head",
           headers : {
               'Access-Control-Allow-Origin': '*',
           },
           paramName: "file"+i, // The name that will be used to transfer the file
           maxFiles: 150,
           maxFilesize: 30000, // MB
           timeout: 600000,
           addRemoveLinks: true,
           removedfile:function(file) {
            var fileuploded = file.previewElement.querySelector("[data-dz-name]");
            var fileurl ='';
            var filearr = fileuploded.innerHTML.split(".");
            if(filearr.length > 1){
                fileurl = "/File/DeleteFileFromBlob?fileName=";
            }else{
                fileurl = "/File/DeleteVideo?VideoId=";
            }
            $.ajax({
                type:"post",
                url:baseURL+fileurl+fileuploded.innerHTML,
                cache:false,
                success: function(){
                    removeA(measurementFile, fileuploded.innerHTML);
                    filearry[i] = measurementFile;
                    file.previewElement.remove();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    console.log("Error");
            
                }
            });
           },
     
           acceptedFiles: "image/*,application/pdf,.png,.mp4",
           
          init: function() {
       
           },
           success: function(file, response){
            var fileuploded = file.previewElement.querySelector("[data-dz-name]");
            fileuploded.innerHTML = response.data.item1;
               // alert(response.data.item1);
               measurementFile.push(response.data.item1);
               filearry[i] = measurementFile;
           
           }
           
         });
       }
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
    }else{
        alert("Can't Add more components");
    }
    
});
$('#resetComponentbtn').click(function () {
    filearry= [];
     document.getElementById("addcompCount").value = document.getElementById("addmaxCount").value;
     document.getElementById("checkbody").innerHTML ="";
     document.getElementById("alert").innerHTML ="";
    });
    $('#kt_close_inquiry_button').click(function () {
         filearry= [];
         document.getElementById("addcompCount").value = document.getElementById("addmaxCount").value;
         document.getElementById("checkbody").innerHTML ="";
         document.getElementById("alert").innerHTML ="";
        });
        $('#xclose').click(function () {
            filearry= [];
            document.getElementById("addcompCount").value = document.getElementById("addmaxCount").value;
            document.getElementById("checkbody").innerHTML ="";
            document.getElementById("alert").innerHTML ="";
           });
        $('#xclose').click(function () {
            filearry= [];
            document.getElementById("compCount").value = document.getElementById("maxCount").value;
            document.getElementById("checkbody").innerHTML ="";
            document.getElementById("alert").innerHTML ="";
           });
           $('#addRjctbtn').click(function () {
    
            let count = document.getElementById("compCount").value;
            if(parseInt(count) > 1 ){
                document.getElementById("rjctbody").innerHTML +=
                `<div class="form-group row">
                                <div class="col-lg-5" >
                                <label class="font-size-h6 font-weight-bolder text-dark">Rejected Phase</label>
                                    <select class="form-control" id="documentType`+count+`" onchange="createList(`+count+`)" name="documentType`+count+`"  style="width:100%">
                                        <option value=""></option>
                                        <option value="7">Measurement</option>
                                        <option value="8">Design</option>
                                        <option value="9">Quotation</option>
                                    </select>
                                </div>
                                
                                <div id="divscopelist`+count+`" class="col-lg-5"></div>
                                </div>
                                <div class="form-group row">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                            <label class="font-size-h6 font-weight-bolder text-dark">Comment</label>
                                            <div class="input-group">
                                                <input type="text" name="RejectComment`+count+`" id="RejectComment`+count+`"
                                                    class="form-control" value=""
                                                    placeholder="" >
                                            </div>
                                </div>
                             </div>
                               `;
                 document.getElementById("compCount").value = parseInt(count) -1;
            }else{
                alert("Can't Add more components");
            }
            
        });
        $('#kt_close_reject_inquiry_button').click(function () {
             document.getElementById("compCount").value = document.getElementById("maxCount").value;
             document.getElementById("rjctbody").innerHTML ="";
             document.getElementById("ralert").innerHTML ="";
            });
            $('#resetRjctbtn').click(function () {
                document.getElementById("compCount").value = document.getElementById("maxCount").value;
                document.getElementById("rjctbody").innerHTML ="";
                document.getElementById("ralert").innerHTML ="";
               });
               $('#rclose').click(function () {
                document.getElementById("compCount").value = document.getElementById("maxCount").value;
                document.getElementById("rjctbody").innerHTML ="";
                document.getElementById("ralert").innerHTML ="";
               });

               for (let j = 6; j <= 6; j++) {
                $('#kt_dropzone_'+j).dropzone({
                             url: baseURL+"/File/UploadFile", // Set the url for your upload script location
                            type: "Head",
                            headers : {
                                'Access-Control-Allow-Origin': '*',
                            },
                            paramName: "file"+j, // The name that will be used to transfer the file
                            maxFiles: 1,
                            maxFilesize: 30000, // MB
                            timeout: 600000,
                            addRemoveLinks: true,
                            removedfile:function(file) {
                                if(file.status =="error"){
                                    file.previewElement.remove();
                                    return false;
                                }
                                var fileuploded = file.previewElement.querySelector("[data-dz-name]");
                                var fileurl ='';
                                var filearr = fileuploded.innerHTML.split(".");
                                if(filearr.length > 1){
                                    fileurl = "/File/DeleteFileFromBlob?fileName=";
                                }else{
                                    fileurl = "/File/DeleteVideo?VideoId=";
                                }
                                $.ajax({
                                    type:"post",
                                    url:baseURL+fileurl+fileuploded.innerHTML,
                                    cache:false,
                                    success: function(){
                                       // removeA(measurementFile, fileuploded.innerHTML);
                                        removeA(fourfile, fileuploded.innerHTML);
                                        file.previewElement.remove();
                                    },
                                    error: function(XMLHttpRequest, textStatus, errorThrown){
                                        console.log("Error");
                                
                                    }
                                });
                            },
                      
                            acceptedFiles: "image/*,application/pdf,.png,.mp4",
                            
                           init: function() {
                        
                            },
                            success: function(file, response){
                                var fileuploded = file.previewElement.querySelector("[data-dz-name]");
                                fileuploded.innerHTML = response.data.item1;
                                fourfile[j] = response.data.item1;
                            
                            }
                            
                          });
                        }
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