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
var table;
export let workscopelist;
var fourfile =  new Array();
let advancePayment=0;
let advancePaymentAmount =0;
let totalAmount = 0;
let promoId=0;
let promoDiscount=0;
let isMeasurementPromo;
let vatvalue=0;
let measurementFee=0;
let noOfInstallment=0;
let beforeInstallation=0;
let afterDelivery=0;
let isInstallment=false;
var four=new Array() ,five=new Array(),six=new Array(),seven=new Array();
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
                url: baseURL + '/JobOrder/GetInquiryJobOrderByBranchId?branchId=' + user.data.userRoles[0].branchId,
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
                        action += `\<a  style="background-color:#734f43;margin:2px" href="`+window.location.origin+`/viewjoborderfiles.html?inquiryId=` + full.inquiryId + `"     class="btn btn-sm btn-clean btn-icon" title="Inquiry Status">
                        <i class="la la-ellipsis-h""></i>\
                        </a>\
                        `;txtAdvancePayment

                        if (full.isEscalationRequested==false){
                            action += `
                            \<a type="button"  onclick="setInquiryEscalationId(` + full.inquiryId + `)" data-toggle="modal" data-target="#Requestforescalation" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Request For Escalation">
                        <i class="la la-question"></i>\
                        </a>\  
						`;

                        }
                        action += `
                        <a type="button"  onclick="addComponent(` + full.inquiryId + `);" data-toggle="modal" data-target="#ScheduleDate" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Upload">
                            <i class="la la-file-pdf-o"></i>
                        </a>                       
                           `;

                           action +=
                           `<a type="button" onclick="setInquiryId(` + full.inquiryId + `)" data-toggle="modal" data-target="#RejectModal" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Reject Joborder">
                               <i class="la la-thumbs-down"></i>
                           </a> 
                           `;


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
                            //window.location.replace("joborderfiles.html");
                            location.reload();
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

    var _handleFormRejectJoborder = function() {
        var form = KTUtil.getById('kt_reject_joborder');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_reject_joborder_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        rejectReason: {
                            validators: {
                                notEmpty: {
                                    message: 'Joborder reject reason  is required'
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
                var JoborderRejected = {
                    "inquiryId":parseInt(document.getElementById("inquiryWorkscopeId").innerHTML),
                    "comment": document.getElementById("rejectReason").value,
                    "feedBackReactionId": 0,
                };
              
                const data = JSON.stringify(JoborderRejected);
                console.log(data);

                $.ajax({
                    type: "Post",
                    url: baseURL + '/Quotation/RejectContract',

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
                          
                            location.reload();
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
            _handleFormRequestforescalation();
            _handleFormRejectJoborder();
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
        $.ajax({
            type: "POST",
            url: baseURL + '/Fees/GetAllFees',
            
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
                    advancePayment=response[1].feesAmount;
                    // cc
                       document.getElementById('txtAdvancePayment').value=advancePayment;
                       beforeInstallation =response[2].feesAmount;
                       afterDelivery =response[3].feesAmount;
                   // cc
                   document.getElementById("txtBeforeInstallation").value =beforeInstallation;
                   document.getElementById("txtAfterInstallation").value =afterDelivery;
                
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
                }).then(function () {
                    KTUtil.scrollTop();
                });
            }
        });

        $('#kt_datatable').on('click', 'td.dtr-control', function () {
      
            table.rows().every(function(){
                // If row has details expanded
                //if(this.child.isShown()){
                    // Collapse row details
                    this.child.hide();
                    $(this.node()).removeClass('shown');
                    $(this.node()).removeClass('parent');
                //}
            });
         var tr = $(this).closest('tr');
         var row = table.row( tr );
    
         if ( row.child.isShown() ) {
             // This row is already open - close it
             row.child.hide();
             tr.removeClass('shown');
             tr.removeClass('parent');
         }
         else {
             // Open this row
             row.child.show();
             tr.addClass('shown');
             tr.addClass('parent');
         }
        });
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
    $('#txtAdvancePayment').keyup(function () {
        advancePayment=  document.getElementById('txtAdvancePayment').value;
        totalAmount = document.getElementById('totalAmount').value;
        advancePaymentAmount= (totalAmount/100)*advancePayment;
        
        document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED'+advancePaymentAmount;
    
    });
 
});


$('#kt_approve_inquiry_button').click(function () {

    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

   // document.getElementById("load").style.removeProperty('display');
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
            var file1='',file2='',file3='',file4='';
            if(four.length >0){
                file1 = four;
            }
            if(five.length >0){
                file2 = five;
            }
            if(six.length >0){
                file3 = six;
            }
            if(seven.length >0){
                file4 = seven[0];
            }
            var pymnt = new Array();
            advancePayment= document.getElementById('txtAdvancePayment').value;
            beforeInstallation= document.getElementById('txtBeforeInstallation').value;
            afterDelivery= document.getElementById('txtAfterInstallation').value;
            if(document.getElementById('method').value=='1'){
                isInstallment=false;
                advancePayment= document.getElementById('txtAdvancePayment').value;
                noOfInstallment =0;
                
            }
            else{
                isInstallment=true;
                advancePayment= document.getElementById('txtAdvancePayment').value;
                beforeInstallation=0;
                afterDelivery=0;
                noOfInstallment=document.getElementById('instCnt').value;
                for (let i = 1; i <= parseInt(noOfInstallment); i++) {
                    pymnt.push({
                        paymentName: "",
                        paymentDetail: "",
                        paymentAmount: 0,
                        paymentModeId: 0,
                        paymentAmountinPercentage: document.getElementById('ipercent'+i).value,
                        paymentExpectedDate: document.getElementById('kt_datepicker'+i).value,
                        inquiryId: parseInt(document.getElementById('inquiryId').value),
                        isActive: true,
                        isDeleted: false
                    })
                }
            }
            var checklistdata = {
                "inquiryId":parseInt(document.getElementById('inquiryId').value),
               // "isAppliancesProvidedByClient" : $('input[name="isAppliances"]:checked').val(),
                "signedquotation":file1,
                "signedcontract": file2,
                //"jobOrderChecklistFileUrl":fourfile[6]==undefined?"":fourfile[6],
                "signeddesign":file3,
                //"detailedDesignFile":file4,
                "advancePayment":advancePayment,
                "beforeInstallation":beforeInstallation,
                "afterDelivery":afterDelivery,
                "payments":pymnt,
                "isInstallment":isInstallment,
                "noOfInstallment":noOfInstallment,
                "pdf": "",
                "paymentTypeId":0,
            };
            const data = JSON.stringify(checklistdata);
            console.log(data);
            console.log(fourfile);
                $.ajax({
                type: "Post",
                url: baseURL + '/Quotation/AddContract',
                headers: {
                    'Content-Type': 'application/json',
                    'userId': user.data.userId,
                    'Access-Control-Allow-Origin': '*',
                },
                data: data,
                success: function(response) {
                    console.log(response);
                    //document.getElementById("load").style.display = 'none';
                   // window.location.replace("joborderfiles.html");
                   location.reload()
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //document.getElementById("load").style.display = 'none';
                    document.getElementById("alert").innerHTML ="An error Occured";
                }
            });    
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
    maxFiles: 10,
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
                 removeA(four, fileuploded.innerHTML);
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
    four.push(response.data.item1);
    document.getElementById("alert").innerHTML ='';
}
    
});
$('#kt_dropzone_5').dropzone({
            
    // url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
    url: baseURL+"/File/UploadFile", // Set the url for your upload script location
    type: "Post",
    headers : {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json'
    },
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 10,
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
                removeA(five, fileuploded.innerHTML);
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

    five.push(response.data.item1);

}

});

$('#kt_dropzone_6').dropzone({
            
    // url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
    url: baseURL+"/File/UploadFile", // Set the url for your upload script location
    type: "Post",
    headers : {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json'
    },
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 10,
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
                removeA(six, fileuploded.innerHTML);
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

    six.push(response.data.item1);

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



