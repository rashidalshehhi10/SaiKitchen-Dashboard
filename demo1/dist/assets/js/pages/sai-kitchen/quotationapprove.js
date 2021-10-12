"use strict";

import {
    baseURL
} from './constant.js'
import {
    inqStatus
} from './status.js'
import {
    measurementFile
} from './constant.js'
let user;

let inquiryId;
let inquiry;
let advancePayment=0;
let advancePaymentAmount=0;
let totalAmount=0;
let isMeasurementPromo;
let measurementFee=0;
let vatvalue = 0;
let promoDiscount=0;
let beforeInstallation=0;
let afterDelivery=0;
let isInstallment=false;
let noOfInstallment=0;
var calcfile=new Array();
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
                url: baseURL + '/Quotation/GetInquiryForApprovalQuotationbyBranchId?branchId=' + user.data.userRoles[0].branchId,
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'inquiryId', 'inquiryCode', 'status', 'workscopeNames','customerCode', 'customerName',
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
                    data: 'status'
                },
                {
                    data: 'workscopeNames'
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
                        var action = ``;
                        // if(full.inquiryAddedById==user.data.userId){
                        if (quotationPermission >= 2) {
                            console.log(full.inquiryId);
                         
                        action += `
                        <a href="viewquotationapprove.html?inquiryId=` + full.inquiryId + `" style="background-color:#734f43;margin:2px" class="btn btn-sm btn-clean btn-icon" title="View Inquiry">\
                        <i class="la la-file-contract"></i>
                    </a>
                    <a type="button" onclick="setInquiryId(` + full.inquiryId + `)" data-toggle="modal" data-target="#Approvequotation" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Approved">
								<i class="la la-thumbs-up"></i>
							</a>
                    <a type="button" onclick="document.getElementById('inquiryId').innerHTML =` + full.inquiryId + `;" data-toggle="modal" data-target="#QuotationReject" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Rejected">
                            <i class="la la-thumbs-down"></i>
                        </a>        
                    `;
                        }
                            return action;
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

    var _handleaddquotation = function() {
        var form = KTUtil.getById('kt_add_quotation');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_btn_add_quotation');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        txtTotalAmount: {
                            validators: {
                                notEmpty: {
                                    message: 'Total Amount is required'
                                }
                            }
                        },
                        txtAmount: {
                            validators: {
                                notEmpty: {
                                    message: 'Amount is required'
                                }
                            }
                        },
                        txtAdvancePayment: {
                            validators: {
                                notEmpty: {
                                    message: 'Advance Payment is required'
                                }
                            }
                        },
                        kt_datepicker_2: {
                            validators: {
                                notEmpty: {
                                    message: 'Valid Till is required'
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
               
                console.log(measurementFile);

                    var calc ='';
                    if(calcfile.length > 0)
                       calc = calcfile[0];
                    
                    var file = ''; 
                    if(measurementFile.length > 0) 
                      file = measurementFile[0];
                    var quotationModel={
                    inquiryId: parseInt( document.getElementById('inquiryId').innerHTML),
                    quotationId: document.getElementById('quotationId').value,
                    description: document.getElementById('txtdescription').value,
                    totalAmount: document.getElementById('txtTotalAmount').value,
                    amount: document.getElementById('txtAmount').value,
                    ProposalReferenceNumber: document.getElementById('txtProposalReferenceNumber').value,
                    paymentTypeId :0,
                    vat:document.getElementById("vat").value,
                    discount: document.getElementById("promoDiscount").value,
                    quotationValidityDate: document.getElementById('kt_datepicker_2').value,
                    quotationFiles: measurementFile,
                    calculationSheetFile:calc,
                    isEdit: document.getElementById("editmode").value,
                    };

                const data = JSON.stringify(quotationModel);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Quotation/HeadAcceptQuotation',
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
                            window.location.replace("quotationapprove.html");

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
            _handleaddquotation();
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
    if(user.data.userRoles[0].branchRole.roleTypeId==1){
        $('#txtAdvancePayment').prop('readonly', false);}
    KTDatatablesSearchOptionsAdvancedSearch.init();
    $(function() {
        $('#method').change(function(){
           // $('input#txtcount').val(cnt)
            if($('#method').val()=='1'){
               document.getElementById('instCnt').value='0';
            document.getElementById("dynamicdiv").innerHTML='';
                $('#RowAdv').show(); 
                $('#RowAfter').show();
                 //advancePayment=document.getElementById("txtAdvancePayment").value;
                // totalAmount=document.getElementById("txtTotalAmount").value; 
             $('#txtAdvancePayment').keyup(function () {
                advancePayment=  document.getElementById('txtAdvancePayment').value;
                advancePaymentAmount= (totalAmount/100)*advancePayment;
                document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED'+advancePaymentAmount;
            
            });
                //$('#divtAmount').hide(); 
                $('#diviCnt').hide();
            }else{
                //document.getElementById("dynamicdiv").innerHTML='';
                //$('#divtAmount').show();
               
                
                $('#diviCnt').show(); 
                $('#RowAfter').hide(); 
    
            }
            
        });
        
    });
    $('#txtAmount').keyup(function () {
        isMeasurementPromo= document.getElementById("isMeasurementPromo").value;
        measurementFee = document.getElementById("measurementFee").value;
        vatvalue  = document.getElementById("vat").value;
        promoDiscount = document.getElementById("promoDiscount").value;
        if(isMeasurementPromo==false){
            var amountAfterDiscount=($(this).val()/1- (($(this).val()/100)*promoDiscount))-measurementFee;
             totalAmount=(amountAfterDiscount+ (amountAfterDiscount/100)*vatvalue);
             if(totalAmount<0){
                 totalAmount=0;
             }
      document.getElementById('txtTotalAmount').value=totalAmount;
      document.getElementById('lblTotalAmount').innerHTML='Total Amount = Amount - Discount '+promoDiscount+'% - Measurement Fee AED '+measurementFee+' + VAT '+vatvalue+'%';
      advancePaymentAmount= (totalAmount/100)*advancePayment;
      document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED '+advancePaymentAmount;
    }else{
         totalAmount= (($(this).val()/1-measurementFee)+ ((($(this).val()-measurementFee)/100)*vatvalue));
         if(totalAmount<0){
             totalAmount=0;
         }
        document.getElementById('txtTotalAmount').value= totalAmount;   
           document.getElementById('lblTotalAmount').innerHTML='Total Amount = Amount - Discount 0% - Measurement Fee AED '+measurementFee+' + VAT '+vatvalue+'%';
           advancePaymentAmount= (totalAmount/100)*advancePayment;
           document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED'+advancePaymentAmount;
         
    }
});

$('#txtAdvancePayment').keyup(function () {
    advancePayment=  document.getElementById('txtAdvancePayment').value;
    advancePaymentAmount= (totalAmount/100)*advancePayment;
    document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED'+advancePaymentAmount;

});

});


$('#kt_dropzone_4').dropzone({
            
    // url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
    url: baseURL+"/File/UploadFile", // Set the url for your upload script location
    type: "Post",
    headers : {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json'
    },
    paramName: "file", // The name that will be used to transfer the file
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
                removeA(calcfile, fileuploded.innerHTML);
                file.previewElement.remove();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("Error");
        
            }
        });

    },

    acceptedFiles: "image/*,application/pdf,.png,.mp4,.dwg",
    
init: function() {

},
success: function(file, response){
    var fileuploded = file.previewElement.querySelector("[data-dz-name]");
    fileuploded.innerHTML = response.data.item1;

    calcfile.push(response.data.item1);

}

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

$('#kt_reject_inquiry_button').click(function () {

    var form = KTUtil.getById('kt_reject_inquiry');
    var formSubmitUrl = KTUtil.attr(form, 'action');
    var formSubmitButton = KTUtil.getById('RejectComment');
    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
    if (!form) {
        return;
    }

    FormValidation
        .formValidation(
            form, {
                fields: {
                    RejectComment: {
                        validators: {
                            notEmpty: {
                                message: 'Reason is required'
                            }
                        }
                    },
                    
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    bootstrap: new FormValidation.plugins.Bootstrap({
                    })
                }
            }
        )
        .on('core.form.valid', function() {
            KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");     
            var rejectlistdata = {
                "inquiryId":parseInt(document.getElementById('inquiryId').innerHTML),
                "comment":document.getElementById('RejectComment').value,
              };

            const data = JSON.stringify(rejectlistdata);
            console.log(data);
             $.ajax({
                type: "Post",
                url: baseURL + '/Quotation/HeadDeclineQuotation',
                headers: {
                    'Content-Type': 'application/json',
                    'userId': user.data.userId,
                    'Access-Control-Allow-Origin': '*',
                },
                data: data,
                success: function(response) {
                    console.log(response);
                    window.location.replace("quotationapprove.html");
                    
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    document.getElementById("ralert").innerHTML ="An error occured";
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
});

