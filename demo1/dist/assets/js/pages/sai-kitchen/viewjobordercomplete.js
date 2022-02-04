"use strict";
import {
    baseURL
} from './constant.js'
import {
    baseFileURL
} from './constant.js'
import {
   customizeFile
} from './constant.js'
export let user;
var filearry = new Array();
var fourfile =  new Array();
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

let inquiryId;
let inquiry;
let permissions;
let measurementPermission;
let promoId=0;
let promoDiscount=0;
let isMeasurementPromo;
let vatvalue=0;
let advancePayment=0;
let advancePaymentAmount=0;
let totalAmount=0;
let measurementFee=0;
let noOfInstallment=0;
let beforeInstallation=0;
let afterDelivery=0;
var KTDatatablesSearchOptionsAdvancedSearch = function() {
   
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
            _handleaddquotation();
        },

    };

}();


var branchTypeId;

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
    inquiryId = urlParams.get('inquiryId');
    document.getElementById("inquiryId").value = inquiryId;
    console.log(inquiryId);
    if (inquiryId == null || inquiryId == "") {
        window.location.replace("commercialchecklist.html");
    }
    
branchTypeId = user.data.userRoles[0].branch.branchTypeId;
if(branchTypeId==2||branchTypeId==1){
   document.getElementById("RequestforReschedulingBtn").style.display = "inline-block";
      }

     
    

    $.ajax({
        type: "post",
        url: baseURL + '/JobOrderDetail/GetinquiryJobOrderDetailsById?inquiryId=' + inquiryId,

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
               var projectname ="";
               response.data.inquiry.inquiryWorkscopes.forEach(element => {
                  projectname  += element.workscope.workScopeName+" ";
                 });
               document.getElementById("Lprojectname").innerHTML += '<u>'+projectname+'</u>';
               document.getElementById("Lprojectcode").innerHTML += '<u>'+response.data.inquiry.inquiryCode+'</u>';
               document.getElementById("Lclientname").innerHTML += '<u>'+response.data.inquiry.customer.customerName+'</u>';
               document.getElementById("Lclientcode").innerHTML += '<u>CS'+response.data.inquiry.branchId+``+response.data.inquiry.customerId+'</u>';   




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






    KTDatatablesSearchOptionsAdvancedSearch.init();


   

    });
  
    $('#kt_approve_inquiry_button').click(function () {
       let choose = document.getElementById("selectedDiv").value;
       let addURL ='';
       var checklistdata;
        addURL ='/JobOrderDetail/JobOrderCompleted';
        checklistdata ={
           "inquiryId":parseInt( document.getElementById('inquiryId').value),
           "remark": "",
           "jobOrderDetailsDescription": document.getElementById('jobComment').value,
           "handingover":customizeFile,
           "qualityRemarks":parseInt(document.getElementById('aemoji').value),
           "speedOfWorkRemarks":parseInt(document.getElementById('bemoji').value),
           "serviceOverAllRemarks":parseInt(document.getElementById('cemoji').value),
           "esignatureImg":document.getElementById("sig-canvas").toDataURL().split(",")[1],
           "yesNo":$("#DefaultCheckbox").prop('checked'),
         };
      
    
        const data = JSON.stringify(checklistdata);
        console.log(data);
        
          $.ajax({
            type: "Post",
            url: baseURL + addURL,
            headers: {
                'Content-Type': 'application/json',
                'userId': user.data.userId,
                'Access-Control-Allow-Origin': '*',
            },
            data: data,
            success: function(response) {
                console.log(response);
     
                window.location.replace("joborder.html");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //document.getElementById("alert").innerHTML ="An error occured";
            }
        }); 
    });
    $('#kt_reject_inquiry_button').click(function () {
        var rejectlistdata = {
            "inquiryId":parseInt(document.getElementById('inquiryId').value),
            "reason":document.getElementById('appComment').value,
          };
    
        const data = JSON.stringify(rejectlistdata);
        console.log(data);
         $.ajax({
            type: "Post",
            url: baseURL + '/JobOrderDetail/JobOrderDetailRescheduleReject',
            headers: {
                'Content-Type': 'application/json',
                'userId': user.data.userId,
                'Access-Control-Allow-Origin': '*',
            },
            data: data,
            success: function(response) {
                console.log(response);
                if(response.errorMessage=="inquiry Not Found"){
                Swal.fire({
                  text: 'Can Not Reject Approved Inquiry',
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                      confirmButton: "btn font-weight-bold btn-light-primary"
                  }
              }).then(function() {
                  KTUtil.scrollTop();
              });
            }else{
               window.location.replace("joborder.html");
            }
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //document.getElementById("ralert").innerHTML ="An error occured";
            }
        }); 
    });
    
    
    
                            