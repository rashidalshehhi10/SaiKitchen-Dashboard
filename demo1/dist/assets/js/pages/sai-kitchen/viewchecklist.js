"use strict";
import {
    baseURL
} from './constant.js'
import {
    baseFileURL
} from './constant.js'
import {
    measurementFile
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
                  "userId": user.data.userId,
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
            _handleaddquotation();
            _handleFormApprove();
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
    inquiryId = urlParams.get('inquiryId');
    document.getElementById("inquiryId").value = inquiryId;
    console.log(inquiryId);
    if (inquiryId == null || inquiryId == "") {
        window.location.replace("quotation.html");
    }
    


    $.ajax({
        type: "post",
        url: baseURL + '/CheckList/GetinquiryChecklistDetailsById?inquiryId=' + inquiryId,

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
                response.data.inquiry.inquiryWorkscopes[0]['quotations'] =response.data.inquiry.quotations;
var inquiryWorkscopelength=response.data.inquiry.inquiryWorkscopes[response.data.inquiry.inquiryWorkscopes.length-1];
console.log(inquiryWorkscopelength);
inquiry=response.data.inquiry;
if(inquiry.promo!=null){
document.getElementById('txtPromoCode').value=inquiry.promo?.promoName;
}
promoDiscount=inquiry.promoDiscount;
promoId=inquiry.promoId;
isMeasurementPromo=inquiry.isMeasurementPromo;
measurementFee=inquiry.payments[0].paymentAmount;
const customerDetail = document.getElementById('customerDetail');
const tabs = document.getElementById('tabpaneworkscope');
const workscope=document.getElementById('workscopedetail');

var dicMeasurement = new Object();
var dicDesign = new Object();
var dicQuot = new Object();
var dicMEP  = new Object();
var dicMaterial = new Object();
var dicDatasheet = new Object();
var dicJoborder = new Object();
var dicDetailed = new Object();
var dicAdvance = new Object();
var dicBefore = new Object();
var dicAfter = new Object();
var dicInstall = new Object();
var dicCALC = new Object();
var workscopeHtml=``;
var tabsHTML =``;
dicMeasurement["measurementRow"+response.data.inquiry.inquiryId]='';
dicDesign["DesignRow"+response.data.inquiry.inquiryId]='';
dicQuot["QuotRow"+response.data.inquiry.inquiryId]='';
dicMEP["dicMEP"+response.data.inquiry.inquiryId]='';
dicMaterial["dicMaterial"+response.data.inquiry.inquiryId]=``;
dicDatasheet["dicDatasheet"+response.data.inquiry.inquiryId]=``;
dicJoborder["dicJoborder"+response.data.inquiry.inquiryId]=``;
dicDetailed["dicDetailed"+response.data.inquiry.inquiryId]=``;
dicAdvance["dicAdvance"+response.data.inquiry.inquiryId]='';
dicBefore["dicBefore"+response.data.inquiry.inquiryId]='';
dicAfter["dicAfter"+response.data.inquiry.inquiryId]='';
dicInstall["dicInstall"+response.data.inquiry.inquiryId]='';
dicCALC["dicCALC"+response.data.inquiry.inquiryId]='';
// response.data.inquiryWorkscopes.forEach(element => {
// 	console.log(baseFileURL+element.fileUrl);

//     workscopeHtml+=` <li class="nav-item">
//     <a class="nav-link " data-toggle="tab" href="#workscope`+element.workscopeId+`">
//     <span class="nav-icon">
//     <i class="la la-box"></i>
//     </span>
//     <span class="nav-text">`+element.workscopeId+`</span>
//     </a>
//  </li>`;
// });
customerDetail.innerHTML=` <!--begin::User-->
<div class="d-flex align-items-center">
   <div class="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
      <div class="symbol-label " style="background-image: url(/assets/media/users/blank.png)"></div>
      <i class="symbol-badge bg-success"></i>
   </div>
   <div>
      <a href="#" class="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary">`+response.data.inquiry.customer.customerName+`</a>
      <div class="text-muted">`+response.data.inquiry.customer.customerContact+`</div>
   </div>
</div>
<!--end::User-->
<!--begin::Contact-->
<div class="py-9">
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Code:</span>
      <span class="text-muted" style=" text-align: right;">CS`+response.data.inquiry.branchId+``+response.data.inquiry.customerId+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Email:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.customer.customerEmail+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Contact:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.customer.customerContact+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Address:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.building.buildingAddress+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Building Condition:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.building.buildingCondition+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Floor:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.building.buildingFloor+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Building Under-Construction:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.building.buildingReconstruction+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Building IsOccupied:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.building.isOccupied+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Type Of Unit:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.building.buildingTypeOfUnit+`</span>
   </div>
</div>
<!--end::Contact-->
`;
inquiryCode.innerHTML=response.data.inquiry.inquiryCode;
var isfirst=true;
var counter = 0;
response.data.inquiry.inquiryWorkscopes.forEach(element => {
   if(isfirst){
       workscopeHtml+=` <li class="nav-item">
       <a class="nav-link active" data-toggle="tab" href="#workscope`+element.workscopeId+`">
       <span class="nav-icon">
       <i class="la la-box"></i>
       </span>
       <span class="nav-text">`+element.workscope.workScopeName+`</span>
       </a>
    </li>`;
   }else{
       workscopeHtml+=` <li class="nav-item">
       <a class="nav-link " data-toggle="tab" href="#workscope`+element.workscopeId+`">
       <span class="nav-icon">
       <i class="la la-box"></i>
       </span>
       <span class="nav-text">`+element.workscope.workScopeName+`</span>
       </a>
    </li>`;
   }
   if(counter == 0 & element.measurements.length > 0){
   element.measurements[0].files.forEach(element => {
     document.getElementById("measurementFiles").innerHTML += element.fileUrl+',';
      
       if( dicMeasurement["measurementRow"+response.data.inquiry.inquiryId]==null){
           dicMeasurement["measurementRow"+response.data.inquiry.inquiryId]=``;
       }
       if(element.fileContentType=='mp4'){
           var videoUrl="https://player.vimeo.com/video/"+element.fileUrl;
           //document.getElementById("measurementFiles").innerHTML += videoUrl+',';
           dicMeasurement["measurementRow"+response.data.inquiry.inquiryId] +=`
               <!--begin::Col-->
               <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <!--begin::Card-->
                  <div class="card-body" onclick="window.open('`+videoUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                     <div class="d-flex flex-column align-items-center">
                        <!--begin: Icon-->
                        <img alt="" class="max-h-65px" src="assets/media/svg/files/mp4.svg" />
                        <!--end: Icon-->
                        <!--begin: Tite-->
                        <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                        <!--end: Tite-->
                     </div>
                  </div>
                  <!--end:: Card-->
               </div>
               <!--end::Col-->`;
       }else if(element.fileContentType=='pdf'){
           var videoUrl="https://player.vimeo.com/video/"+element.fileUrl;
          // document.getElementById("measurementFiles").innerHTML += baseFileURL+element.fileUrl+',';
           dicMeasurement["measurementRow"+response.data.inquiry.inquiryId] +=`
           <!--begin::Col-->
           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <!--begin::Card-->
              <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                 <div class="d-flex flex-column align-items-center">
                    <!--begin: Icon-->
                    <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                    <!--end: Icon-->
                    <!--begin: Tite-->
                    <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                    <!--end: Tite-->
                 </div>
              </div>
              <!--end:: Card-->
           </div>
           <!--end::Col-->`;
        

       }else{
        //document.getElementById("measurementFiles").innerHTML += baseFileURL+element.fileUrl+',';
       dicMeasurement["measurementRow"+response.data.inquiry.inquiryId] +=`
           <!--begin::Col-->
           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <!--begin::Card-->
              <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                 <div class="d-flex flex-column align-items-center">
                    <!--begin: Icon-->
                    <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                    <!--end: Icon-->
                    <!--begin: Tite-->
                    <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                    <!--end: Tite-->
                 </div>
              </div>
              <!--end:: Card-->
           </div>
           <!--end::Col-->`;
       }

// added to download multiple files
//  var m = response.data.inquiry.inquiryWorkscopes[0].measurements[0];
//  var s = m.files[0].fileUrl;

//

       });

     
     

     }
     if(counter == 0 & element.designs.length > 0){
       element.designs[0].files.forEach(element => {
        document.getElementById("designFiles").innerHTML += element.fileUrl+',';
           if(   dicDesign["DesignRow"+response.data.inquiry.inquiryId]==null){
               dicDesign["DesignRow"+response.data.inquiry.inquiryId]=``;
           }
           if(element.fileContentType=='pdf'){
               dicDesign["DesignRow"+response.data.inquiry.inquiryId] +=`
                   <!--begin::Col-->
                   <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                      <!--begin::Card-->
                      <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                         <div class="d-flex flex-column align-items-center">
                            <!--begin: Icon-->
                            <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                            <!--end: Icon-->
                            <!--begin: Tite-->
                            <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                            <!--end: Tite-->
                         </div>
                      </div>
                      <!--end:: Card-->
                   </div>
                   <!--end::Col-->`;

           }else{
           dicDesign["DesignRow"+response.data.inquiry.inquiryId] +=`
               <!--begin::Col-->
               <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <!--begin::Card-->
                  <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                     <div class="d-flex flex-column align-items-center">
                        <!--begin: Icon-->
                        <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                        <!--end: Icon-->
                        <!--begin: Tite-->
                        <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                        <!--end: Tite-->
                     </div>
                  </div>
                  <!--end:: Card-->
               </div>
               <!--end::Col-->`;
       }
   });
  }
   if(counter == 0 & response.data.inquiry.quotations.length > 0){
     response.data.inquiry.quotations[0].files.forEach(element => {
        document.getElementById("quotationFiles").innerHTML += element.fileUrl+',';
       if(   dicQuot["QuotRow"+response.data.inquiry.inquiryId]==null){
           dicQuot["QuotRow"+response.data.inquiry.inquiryId]=``;
       }
       if(element.fileContentType=='pdf'){
           dicQuot["QuotRow"+response.data.inquiry.inquiryId] +=`
               <!--begin::Col-->
               <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <!--begin::Card-->
                  <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                     <div class="d-flex flex-column align-items-center">
                        <!--begin: Icon-->
                        <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                        <!--end: Icon-->
                        <!--begin: Tite-->
                        <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                        <!--end: Tite-->
                     </div>
                  </div>
                  <!--end:: Card-->
               </div>
               <!--end::Col-->`;

       }else{
           dicQuot["QuotRow"+response.data.inquiry.inquiryId] +=`
           <!--begin::Col-->
           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <!--begin::Card-->
              <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                 <div class="d-flex flex-column align-items-center">
                    <!--begin: Icon-->
                    <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                    <!--end: Icon-->
                    <!--begin: Tite-->
                    <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                    <!--end: Tite-->
                 </div>
              </div>
              <!--end:: Card-->
           </div>
           <!--end::Col-->`;
   }
  });
   }//quotations !=undefined

   var  calculationSheetFile  = response.data.inquiry.quotations;
   if(response.data.inquiry.quotations.length > 0 & counter ==0){
        if(   dicCALC["dicCALC"+response.data.inquiry.inquiryId]==null){
           dicCALC["dicCALC"+response.data.inquiry.inquiryId]=``;
        }
       if(calculationSheetFile[0].calculationSheetFile != null){
        document.getElementById("calculationFiles").innerHTML += calculationSheetFile[0].calculationSheetFile+',';
        var fileExtension = calculationSheetFile[0].calculationSheetFile.substr((calculationSheetFile[0].calculationSheetFile.lastIndexOf('.') + 1));
        if(fileExtension == 'mp4') {
           var videoUrl="https://player.vimeo.com/video/"+calculationSheetFile[0].calculationSheetFile;
        dicCALC["dicCALC"+response.data.inquiry.inquiryId] +=`
            <!--begin::Col-->
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
               <!--begin::Card-->
               <div class="card-body" onclick="window.open('`+videoUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                  <div class="d-flex flex-column align-items-center">
                     <!--begin: Icon-->
                     <img alt="" class="max-h-65px" src="assets/media/svg/files/mp4.svg" />
                     <!--end: Icon-->
                     <!--begin: Tite-->
                     <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+calculationSheetFile[0].calculationSheetFile+`</a>
                     <!--end: Tite-->
                  </div>
               </div>
               <!--end:: Card-->
            </div>
            <!--end::Col-->`;
        }else if(fileExtension == 'pdf') {
           dicCALC["dicCALC"+response.data.inquiry.inquiryId] +=`
           <!--begin::Col-->
           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <!--begin::Card-->
              <div class="card-body" onclick="window.open('`+baseFileURL+calculationSheetFile[0].calculationSheetFile+`', '_blank');" target="_blank" style="cursor: pointer;">
                 <div class="d-flex flex-column align-items-center">
                    <!--begin: Icon-->
                    <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                    <!--end: Icon-->
                    <!--begin: Tite-->
                    <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+calculationSheetFile[0].calculationSheetFile+`</a>
                    <!--end: Tite-->
                 </div>
              </div>
              <!--end:: Card-->
           </div>
           <!--end::Col-->`;
        }else{
           dicCALC["dicCALC"+response.data.inquiry.inquiryId] +=`
           <!--begin::Col-->
           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <!--begin::Card-->
              <div class="card-body" onclick="window.open('`+baseFileURL+calculationSheetFile[0].calculationSheetFile+`', '_blank');" target="_blank" style="cursor: pointer;">
                 <div class="d-flex flex-column align-items-center">
                    <!--begin: Icon-->
                    <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                    <!--end: Icon-->
                    <!--begin: Tite-->
                    <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+calculationSheetFile[0].calculationSheetFile+`</a>
                    <!--end: Tite-->
                 </div>
              </div>
              <!--end:: Card-->
           </div>
           <!--end::Col-->`;
        }
          
       }
}
   var  jobOrder  = response.data.inquiry.jobOrders;
   if(response.data.inquiry.jobOrders.length > 0 & counter ==0){
        if(   dicMEP["dicMEP"+response.data.inquiry.inquiryId]==null){
           dicMEP["dicMEP"+response.data.inquiry.inquiryId]=``;
        }
       if(jobOrder[0].mepdrawingFileUrl !=""){
        document.getElementById("mepFiles").innerHTML += jobOrder[0].mepdrawingFileUrl+',';
        var fileExtension = jobOrder[0].mepdrawingFileUrl.substr((jobOrder[0].mepdrawingFileUrl.lastIndexOf('.') + 1));
        if(fileExtension == 'mp4') {
           var videoUrl="https://player.vimeo.com/video/"+jobOrder[0].mepdrawingFileUrl;
        dicMEP["dicMEP"+response.data.inquiry.inquiryId] +=`
            <!--begin::Col-->
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
               <!--begin::Card-->
               <div class="card-body" onclick="window.open('`+videoUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                  <div class="d-flex flex-column align-items-center">
                     <!--begin: Icon-->
                     <img alt="" class="max-h-65px" src="assets/media/svg/files/mp4.svg" />
                     <!--end: Icon-->
                     <!--begin: Tite-->
                     <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].mepdrawingFileUrl+`</a>
                     <!--end: Tite-->
                  </div>
               </div>
               <!--end:: Card-->
            </div>
            <!--end::Col-->`;
        }else if(fileExtension == 'pdf') {
           dicMEP["dicMEP"+response.data.inquiry.inquiryId] +=`
           <!--begin::Col-->
           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <!--begin::Card-->
              <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].mepdrawingFileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                 <div class="d-flex flex-column align-items-center">
                    <!--begin: Icon-->
                    <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                    <!--end: Icon-->
                    <!--begin: Tite-->
                    <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].mepdrawingFileUrl+`</a>
                    <!--end: Tite-->
                 </div>
              </div>
              <!--end:: Card-->
           </div>
           <!--end::Col-->`;
        }else{
           dicMEP["dicMEP"+response.data.inquiry.inquiryId] +=`
           <!--begin::Col-->
           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <!--begin::Card-->
              <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].mepdrawingFileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                 <div class="d-flex flex-column align-items-center">
                    <!--begin: Icon-->
                    <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                    <!--end: Icon-->
                    <!--begin: Tite-->
                    <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].mepdrawingFileUrl+`</a>
                    <!--end: Tite-->
                 </div>
              </div>
              <!--end:: Card-->
           </div>
           <!--end::Col-->`;
        }
          
       }
           if(   dicMaterial["dicMaterial"+response.data.inquiry.inquiryId]==null){
               dicMaterial["dicMaterial"+response.data.inquiry.inquiryId]=``;
           }
           if(jobOrder[0].materialSheetFileUrl !=""){
              document.getElementById("materialFiles").innerHTML += jobOrder[0].materialSheetFileUrl+',';
              var fileExtension = jobOrder[0].materialSheetFileUrl.substr((jobOrder[0].materialSheetFileUrl.lastIndexOf('.') + 1));
              if(fileExtension == 'mp4') {
                 var videoUrl="https://player.vimeo.com/video/"+jobOrder[0].materialSheetFileUrl;
              dicMaterial["dicMaterial"+response.data.inquiry.inquiryId] +=`
                  <!--begin::Col-->
                  <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                     <!--begin::Card-->
                     <div class="card-body" onclick="window.open('`+videoUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                        <div class="d-flex flex-column align-items-center">
                           <!--begin: Icon-->
                           <img alt="" class="max-h-65px" src="assets/media/svg/files/mp4.svg" />
                           <!--end: Icon-->
                           <!--begin: Tite-->
                           <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].materialSheetFileUrl+`</a>
                           <!--end: Tite-->
                        </div>
                     </div>
                     <!--end:: Card-->
                  </div>
                  <!--end::Col-->`;
              }else if(fileExtension == 'pdf') {
                 dicMaterial["dicMaterial"+response.data.inquiry.inquiryId] +=`
                 <!--begin::Col-->
                 <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                    <!--begin::Card-->
                    <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].materialSheetFileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                       <div class="d-flex flex-column align-items-center">
                          <!--begin: Icon-->
                          <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                          <!--end: Icon-->
                          <!--begin: Tite-->
                          <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].materialSheetFileUrl+`</a>
                          <!--end: Tite-->
                       </div>
                    </div>
                    <!--end:: Card-->
                 </div>
                 <!--end::Col-->`;
              }else{
                 dicMaterial["dicMaterial"+response.data.inquiry.inquiryId] +=`
                 <!--begin::Col-->
                 <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                    <!--begin::Card-->
                    <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].materialSheetFileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                       <div class="d-flex flex-column align-items-center">
                          <!--begin: Icon-->
                          <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                          <!--end: Icon-->
                          <!--begin: Tite-->
                          <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].materialSheetFileUrl+`</a>
                          <!--end: Tite-->
                       </div>
                    </div>
                    <!--end:: Card-->
                 </div>
                 <!--end::Col-->`;
              }
           }
               if(   dicDatasheet["dicDatasheet"+response.data.inquiry.inquiryId]==null){
                   dicDatasheet["dicDatasheet"+response.data.inquiry.inquiryId]=``;
               }
               if(jobOrder[0].dataSheetApplianceFileUrl !=""){
                 document.getElementById("dataFiles").innerHTML += jobOrder[0].dataSheetApplianceFileUrl+',';
                 var fileExtension = jobOrder[0].dataSheetApplianceFileUrl.substr((jobOrder[0].dataSheetApplianceFileUrl.lastIndexOf('.') + 1));
                 if(fileExtension == 'mp4') {
                    var videoUrl="https://player.vimeo.com/video/"+jobOrder[0].dataSheetApplianceFileUrl;
                 dicDatasheet["dicDatasheet"+response.data.inquiry.inquiryId] +=`
                     <!--begin::Col-->
                     <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                        <!--begin::Card-->
                        <div class="card-body" onclick="window.open('`+videoUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                           <div class="d-flex flex-column align-items-center">
                              <!--begin: Icon-->
                              <img alt="" class="max-h-65px" src="assets/media/svg/files/mp4.svg" />
                              <!--end: Icon-->
                              <!--begin: Tite-->
                              <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].dataSheetApplianceFileUrl+`</a>
                              <!--end: Tite-->
                           </div>
                        </div>
                        <!--end:: Card-->
                     </div>
                     <!--end::Col-->`;
                 }else if(fileExtension == 'pdf') {
                    dicDatasheet["dicDatasheet"+response.data.inquiry.inquiryId] +=`
                    <!--begin::Col-->
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                       <!--begin::Card-->
                       <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].dataSheetApplianceFileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                          <div class="d-flex flex-column align-items-center">
                             <!--begin: Icon-->
                             <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                             <!--end: Icon-->
                             <!--begin: Tite-->
                             <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].dataSheetApplianceFileUrl+`</a>
                             <!--end: Tite-->
                          </div>
                       </div>
                       <!--end:: Card-->
                    </div>
                    <!--end::Col-->`;
                 }else{
                    dicDatasheet["dicDatasheet"+response.data.inquiry.inquiryId] +=`
                    <!--begin::Col-->
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                       <!--begin::Card-->
                       <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].dataSheetApplianceFileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                          <div class="d-flex flex-column align-items-center">
                             <!--begin: Icon-->
                             <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                             <!--end: Icon-->
                             <!--begin: Tite-->
                             <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].dataSheetApplianceFileUrl+`</a>
                             <!--end: Tite-->
                          </div>
                       </div>
                       <!--end:: Card-->
                    </div>
                    <!--end::Col-->`;
                 }
               } 
                   if(   dicJoborder["dicJoborder"+response.data.inquiry.inquiryId]==null){
                       dicJoborder["dicJoborder"+response.data.inquiry.inquiryId]=``;
                   }
                   if(jobOrder[0].jobOrderChecklistFileUrl !="" && jobOrder[0].jobOrderChecklistFileUrl !=null){
                    document.getElementById("jobFiles").innerHTML += jobOrder[0].jobOrderChecklistFileUrl+',';
                    var fileExtension = jobOrder[0].jobOrderChecklistFileUrl.substr((jobOrder[0].jobOrderChecklistFileUrl.lastIndexOf('.') + 1));
                    if(fileExtension == 'mp4') {
                       var videoUrl="https://player.vimeo.com/video/"+jobOrder[0].jobOrderChecklistFileUrl;
                    dicJoborder["dicJoborder"+response.data.inquiry.inquiryId] +=`
                        <!--begin::Col-->
                        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                           <!--begin::Card-->
                           <div class="card-body" onclick="window.open('`+videoUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                              <div class="d-flex flex-column align-items-center">
                                 <!--begin: Icon-->
                                 <img alt="" class="max-h-65px" src="assets/media/svg/files/mp4.svg" />
                                 <!--end: Icon-->
                                 <!--begin: Tite-->
                                 <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].jobOrderChecklistFileUrl+`</a>
                                 <!--end: Tite-->
                              </div>
                           </div>
                           <!--end:: Card-->
                        </div>
                        <!--end::Col-->`;
                    }else if(fileExtension == 'pdf') {
                       dicJoborder["dicJoborder"+response.data.inquiry.inquiryId] +=`
                       <!--begin::Col-->
                       <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                          <!--begin::Card-->
                          <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].jobOrderChecklistFileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                             <div class="d-flex flex-column align-items-center">
                                <!--begin: Icon-->
                                <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                                <!--end: Icon-->
                                <!--begin: Tite-->
                                <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].jobOrderChecklistFileUrl+`</a>
                                <!--end: Tite-->
                             </div>
                          </div>
                          <!--end:: Card-->
                       </div>
                       <!--end::Col-->`;
                    }else{
                       dicJoborder["dicJoborder"+response.data.inquiry.inquiryId] +=`
                       <!--begin::Col-->
                       <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                          <!--begin::Card-->
                          <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].jobOrderChecklistFileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                             <div class="d-flex flex-column align-items-center">
                                <!--begin: Icon-->
                                <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                                <!--end: Icon-->
                                <!--begin: Tite-->
                                <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].jobOrderChecklistFileUrl+`</a>
                                <!--end: Tite-->
                             </div>
                          </div>
                          <!--end:: Card-->
                       </div>
                       <!--end::Col-->`;
                    }
                   }
                   if(   dicDetailed["dicDetailed"+response.data.inquiry.inquiryId]==null){
                    dicDetailed["dicDetailed"+response.data.inquiry.inquiryId]=``;
                }
                if(jobOrder[0].detailedDesignFile !="" && jobOrder[0].detailedDesignFile !=null){
                 document.getElementById("detailFiles").innerHTML += jobOrder[0].detailedDesignFile+',';
                 var fileExtension = jobOrder[0].detailedDesignFile.substr((jobOrder[0].detailedDesignFile.lastIndexOf('.') + 1));
                 if(fileExtension == 'mp4') {
                    var videoUrl="https://player.vimeo.com/video/"+jobOrder[0].detailedDesignFile;
                 dicDetailed["dicDetailed"+response.data.inquiry.inquiryId] +=`
                     <!--begin::Col-->
                     <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                        <!--begin::Card-->
                        <div class="card-body" onclick="window.open('`+videoUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                           <div class="d-flex flex-column align-items-center">
                              <!--begin: Icon-->
                              <img alt="" class="max-h-65px" src="assets/media/svg/files/mp4.svg" />
                              <!--end: Icon-->
                              <!--begin: Tite-->
                              <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].detailedDesignFile+`</a>
                              <!--end: Tite-->
                           </div>
                        </div>
                        <!--end:: Card-->
                     </div>
                     <!--end::Col-->`;
                 }else if(fileExtension == 'pdf') {
                    dicDetailed["dicDetailed"+response.data.inquiry.inquiryId] +=`
                    <!--begin::Col-->
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                       <!--begin::Card-->
                       <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].detailedDesignFile+`', '_blank');" target="_blank" style="cursor: pointer;">
                          <div class="d-flex flex-column align-items-center">
                             <!--begin: Icon-->
                             <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                             <!--end: Icon-->
                             <!--begin: Tite-->
                             <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].detailedDesignFile+`</a>
                             <!--end: Tite-->
                          </div>
                       </div>
                       <!--end:: Card-->
                    </div>
                    <!--end::Col-->`;
                 }else{
                    dicDetailed["dicDetailed"+response.data.inquiry.inquiryId] +=`
                    <!--begin::Col-->
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                       <!--begin::Card-->
                       <div class="card-body" onclick="window.open('`+baseFileURL+jobOrder[0].detailedDesignFile+`', '_blank');" target="_blank" style="cursor: pointer;">
                          <div class="d-flex flex-column align-items-center">
                             <!--begin: Icon-->
                             <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                             <!--end: Icon-->
                             <!--begin: Tite-->
                             <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+jobOrder[0].detailedDesignFile+`</a>
                             <!--end: Tite-->
                          </div>
                       </div>
                       <!--end:: Card-->
                    </div>
                    <!--end::Col-->`;
                 }
                }
    }
    //payments files
    if(response.data.inquiry.quotations.length > 0){
    if(counter == 0 & response.data.inquiry.quotations[0].payments.length > 0){
     response.data.inquiry.quotations[0].payments.forEach(payment => {
        if(payment.paymentTypeId == 2){
      payment.files.forEach(element => {
        document.getElementById("advanceFiles").innerHTML += element.fileUrl+',';
         if(   dicAdvance["dicAdvance"+response.data.inquiry.inquiryId]==null){
            dicAdvance["dicAdvance"+response.data.inquiry.inquiryId]=``;
         }
         if(element.fileContentType=='pdf'){
            dicAdvance["dicAdvance"+response.data.inquiry.inquiryId] +=`
                <!--begin::Col-->
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                   <!--begin::Card-->
                   <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                      <div class="d-flex flex-column align-items-center">
                         <!--begin: Icon-->
                         <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                         <!--end: Icon-->
                         <!--begin: Tite-->
                         <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                         <!--end: Tite-->
                      </div>
                   </div>
                   <!--end:: Card-->
                </div>
                <!--end::Col-->`;

        }else{
            dicAdvance["dicAdvance"+response.data.inquiry.inquiryId] +=`
            <!--begin::Col-->
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
               <!--begin::Card-->
               <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                  <div class="d-flex flex-column align-items-center">
                     <!--begin: Icon-->
                     <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                     <!--end: Icon-->
                     <!--begin: Tite-->
                     <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                     <!--end: Tite-->
                  </div>
               </div>
               <!--end:: Card-->
            </div>
            <!--end::Col-->`;
    }
      }
      );
         }
         if(payment.paymentTypeId == 3){
           payment.files.forEach(element => {
              document.getElementById("beforeFiles").innerHTML += element.fileUrl+',';
              if(   dicBefore["dicBefore"+response.data.inquiry.inquiryId]==null){
                 dicBefore["dicBefore"+response.data.inquiry.inquiryId]=``;
              }
              if(element.fileContentType=='pdf'){
                 dicBefore["dicBefore"+response.data.inquiry.inquiryId] +=`
                     <!--begin::Col-->
                     <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                        <!--begin::Card-->
                        <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                           <div class="d-flex flex-column align-items-center">
                              <!--begin: Icon-->
                              <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                              <!--end: Icon-->
                              <!--begin: Tite-->
                              <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                              <!--end: Tite-->
                           </div>
                        </div>
                        <!--end:: Card-->
                     </div>
                     <!--end::Col-->`;
     
             }else{
                 dicBefore["dicBefore"+response.data.inquiry.inquiryId] +=`
                 <!--begin::Col-->
                 <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                    <!--begin::Card-->
                    <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                       <div class="d-flex flex-column align-items-center">
                          <!--begin: Icon-->
                          <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                          <!--end: Icon-->
                          <!--begin: Tite-->
                          <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                          <!--end: Tite-->
                       </div>
                    </div>
                    <!--end:: Card-->
                 </div>
                 <!--end::Col-->`;
         }
           }
           );
           }
           if(payment.paymentTypeId == 4){
              payment.files.forEach(element => {
                 document.getElementById("afterFiles").innerHTML += element.fileUrl+',';
                 if(   dicAfter["dicAfter"+response.data.inquiry.inquiryId]==null){
                    dicAfter["dicAfter"+response.data.inquiry.inquiryId]=``;
                 }
                 if(element.fileContentType=='pdf'){
                    dicAfter["dicAfter"+response.data.inquiry.inquiryId] +=`
                        <!--begin::Col-->
                        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                           <!--begin::Card-->
                           <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                              <div class="d-flex flex-column align-items-center">
                                 <!--begin: Icon-->
                                 <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                                 <!--end: Icon-->
                                 <!--begin: Tite-->
                                 <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                                 <!--end: Tite-->
                              </div>
                           </div>
                           <!--end:: Card-->
                        </div>
                        <!--end::Col-->`;
        
                }else{
                    dicAfter["dicAfter"+response.data.inquiry.inquiryId] +=`
                    <!--begin::Col-->
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                       <!--begin::Card-->
                       <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                          <div class="d-flex flex-column align-items-center">
                             <!--begin: Icon-->
                             <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                             <!--end: Icon-->
                             <!--begin: Tite-->
                             <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                             <!--end: Tite-->
                          </div>
                       </div>
                       <!--end:: Card-->
                    </div>
                    <!--end::Col-->`;
            }
              }
              );
              }
              if(payment.paymentTypeId == 5){
                 payment.files.forEach(element => {
                    document.getElementById("installFiles").innerHTML += element.fileUrl+',';
                    if(   dicInstall["dicInstall"+response.data.inquiry.inquiryId]==null){
                       dicInstall["dicInstall"+response.data.inquiry.inquiryId]=``;
                    }
                    if(element.fileContentType=='pdf'){
                       dicInstall["dicInstall"+response.data.inquiry.inquiryId] +=`
                           <!--begin::Col-->
                           <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                              <!--begin::Card-->
                              <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                                 <div class="d-flex flex-column align-items-center">
                                    <!--begin: Icon-->
                                    <img alt="" class="max-h-65px" src="assets/media/svg/files/pdf.svg" />
                                    <!--end: Icon-->
                                    <!--begin: Tite-->
                                    <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                                    <!--end: Tite-->
                                 </div>
                              </div>
                              <!--end:: Card-->
                           </div>
                           <!--end::Col-->`;
           
                   }else{
                       dicInstall["dicInstall"+response.data.inquiry.inquiryId] +=`
                       <!--begin::Col-->
                       <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                          <!--begin::Card-->
                          <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
                             <div class="d-flex flex-column align-items-center">
                                <!--begin: Icon-->
                                <img alt="" class="max-h-65px" src="assets/media/svg/files/jpg.svg" />
                                <!--end: Icon-->
                                <!--begin: Tite-->
                                <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
                                <!--end: Tite-->
                             </div>
                          </div>
                          <!--end:: Card-->
                       </div>
                       <!--end::Col-->`;
               }
                 }
                 );
                 }  
       });
    }
    }

    counter = 1;
           if(isfirst){
              let Advance='';let Before='';let After='';let Install='';
             // if(response.data.inquiry.quotations.length > 0){
              
               //  if(response.data.inquiry.quotations[0].payments.length >0){
            // response.data.inquiry.quotations[0].payments.forEach(payment => {
               // if(payment.paymentTypeId == 2 && payment.files.length > 0){
                 Advance = `
                 <div class="card">
                  <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicAdvance`+element.inquiryWorkscopeId+`">
                          <i class="la fab la-codepen"></i>Advance Payment<span class="badge badge-default bi-download" id="k" onclick="downloadItems('advanceFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg></span>
                      </div>
                  </div>
                  <div id="dicAdvance`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                  <div class="card-body" >
                      <div class="row" id="dicAdvance`+response.data.inquiry.inquiryId+`">
                      `+dicAdvance["dicAdvance"+response.data.inquiry.inquiryId]+`
                      </div>
                  </div>
                  </div>
                 </div>
                 `;
               // }//advance
                //if(payment.paymentTypeId == 3 && payment.files.length > 0){
                 Before = `
                 <div class="card">
                  <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicBefore`+element.inquiryWorkscopeId+`">
                          <i class="la fab la-codepen"></i>Before Installation Payment<span class="badge badge-default bi-download" id="k" onclick="downloadItems('beforeFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg></span>
                      </div>
                  </div>
                  <div id="dicBefore`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                  <div class="card-body" >
                      <div class="row" id="dicBefore`+response.data.inquiry.inquiryId+`">
                      `+dicBefore["dicBefore"+response.data.inquiry.inquiryId]+`
                      </div>
                  </div>
                  </div>
                 </div>
                 `;
               // }//Before
               // if(payment.paymentTypeId == 4 && payment.files.length > 0){
                 After = `
                 <div class="card">
                  <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicAfter`+element.inquiryWorkscopeId+`">
                          <i class="la fab la-codepen"></i>After Delivery Payment<span class="badge badge-default bi-download" id="k" onclick="downloadItems('afterFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg></span>
                      </div>
                  </div>
                  <div id="dicAfter`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                  <div class="card-body" >
                      <div class="row" id="dicAfter`+response.data.inquiry.inquiryId+`">
                      `+dicAfter["dicAfter"+response.data.inquiry.inquiryId]+`
                      </div>
                  </div>
                  </div>
                 </div>
                 `;
                //}//After
                //if(payment.paymentTypeId == 5 && payment.files.length > 0 ){
                 Install = `
                 <div class="card">
                  <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicInstall`+element.inquiryWorkscopeId+`">
                          <i class="la fab la-codepen"></i>Installment Payment<span class="badge badge-default bi-download" id="k" onclick="downloadItems('installFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg></span>
                      </div>
                  </div>
                  <div id="dicInstall`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                  <div class="card-body" >
                      <div class="row" id="dicInstall`+response.data.inquiry.inquiryId+`">
                      `+dicInstall["dicInstall"+response.data.inquiry.inquiryId]+`
                      </div>
                  </div>
                  </div>
                 </div>
                 `;
               // }//Install
             // });
               //}
             // }
               let collect ='';
               //if(response.data.inquiry.jobOrders.length > 0){
                  collect =`<div class="card">
                  <div class="card-header" >
                     <div class="card-title collapsed" data-toggle="collapse" data-target="#dicMEP`+element.inquiryWorkscopeId+`">
                        <i class="la fab la-codepen"></i>MEP Drawing<span class="badge badge-default bi-download" id="k" onclick="downloadItems('mepFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                      </svg></span>
                     </div>
                  </div>
                  <div id="dicMEP`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                   <div class="card-body" >
                   <div class="row" id="dicMEP`+response.data.inquiry.inquiryIdd+`">
                   `+dicMEP["dicMEP"+response.data.inquiry.inquiryId]+`
                   </div>
                   </div>
                  </div>
               </div>`+
                   `<div class="card">
                   <div class="card-header" >
                   <div class="card-title collapsed" data-toggle="collapse" data-target="#dicMaterial`+element.inquiryWorkscopeId+`">
                       <i class="la fab la-codepen"></i> Material sheet<span class="badge badge-default bi-download" id="k" onclick="downloadItems('materialFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                       <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                       <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                     </svg></span>
                   </div>
                   </div>
                   <div id="dicMaterial`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                   <div class="card-body" >
                   <div class="row" id="dicMaterial`+response.data.inquiry.inquiryId+`">
                   `+dicMaterial["dicMaterial"+response.data.inquiry.inquiryId]+`
                   </div>
                   </div>
                   </div>
                   </div>`
                  +` <div class="card">
                  <div class="card-header" >
                     <div class="card-title collapsed" data-toggle="collapse" data-target="#dicDatasheet`+element.inquiryWorkscopeId+`">
                        <i class="la fab la-codepen"></i> Data sheet appliances<span class="badge badge-default bi-download" id="k" onclick="downloadItems('dataFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                      </svg></span>
                     </div>
                  </div>
                  <div id="dicDatasheet`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                   <div class="card-body" >
                   <div class="row" id="dicDatasheet`+response.data.inquiry.inquiryId+`">
                   `+dicDatasheet["dicDatasheet"+response.data.inquiry.inquiryId]+`
                   </div>
                   </div>
                  </div>
               </div>`+` <div class="card">
               <div class="card-header" >
                  <div class="card-title collapsed" data-toggle="collapse" data-target="#dicJoborder`+element.inquiryWorkscopeId+`">
                     <i class="la fab la-codepen"></i> Job order checklist file<span class="badge badge-default bi-download" id="k" onclick="downloadItems('jobFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                     <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                     <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                   </svg></span>
                  </div>
               </div>
               <div id="dicJoborder`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                <div class="card-body" >
                <div class="row" id="dicJoborder`+response.data.inquiry.inquiryId+`">
                `+dicJoborder["dicJoborder"+response.data.inquiry.inquiryId]+`
                </div>
                </div>
               </div>
            </div>`+` <div class="card">
            <div class="card-header" >
               <div class="card-title collapsed" data-toggle="collapse" data-target="#dicDetailed`+element.inquiryWorkscopeId+`">
                  <i class="la fab la-codepen"></i> Detailed Design File<span class="badge badge-default bi-download" id="k" onclick="downloadItems('detailFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg></span>
               </div>
            </div>
            <div id="dicDetailed`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
             <div class="card-body" >
             <div class="row" id="dicDetailed`+response.data.inquiry.inquiryId+`">
             `+dicDetailed["dicDetailed"+response.data.inquiry.inquiryId]+`
             </div>
             </div>
            </div>
         </div>`;
              // }
              let calculation ='';
              // if(response.data.inquiry.quotations.length >0){
                 calculation = `
                   <div class="card">
                      <div class="card-header" >
                         <div class="card-title collapsed" data-toggle="collapse" data-target="#dicCALC`+element.inquiryWorkscopeId+`">
                            <i class="la fab la-codepen"></i>Calculation SheetFile<span class="badge badge-default bi-download" id="k" onclick="downloadItems('calculationFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                          </svg></span>
                         </div>
                      </div>
                      <div id="dicCALC`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                       <div class="card-body" >
                       <div class="row" id="dicCALC`+response.data.inquiry.inquiryId+`">
                       `+dicCALC["dicCALC"+response.data.inquiry.inquiryId]+`
                       </div>
                       </div>
                      </div>
                   </div>
                   `;
                   //}
               let quot='';
               //if(response.data.inquiry.quotations.length >0){
                  quot = `
                  <div class="card">
                   <div class="card-header" >
                       <div class="card-title collapsed" data-toggle="collapse" data-target="#quotRow`+element.inquiryWorkscopeId+`">
                           <i class="la fab la-codepen"></i>Quotation<span class="badge badge-default bi-download" id="k" onclick="downloadItems('quotationFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                           <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                           <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                         </svg></span>
                               
                       </div>
                         
                   </div>
                   <div id="quotRow`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                   <div class="card-body" >
                       <div class="row" id="quotRow`+response.data.inquiry.inquiryId+`">
                       `+dicQuot["QuotRow"+response.data.inquiry.inquiryId]+`
                       </div>
                   </div>
                   </div>
                  </div>
                  `;
              // }
               let design = '';
            //   if(element.designs.length > 0){
                 design =
                 `<div class="card">
                 <div class="card-header" >
                    <div class="card-title collapsed" data-toggle="collapse" data-target="#designRow`+element.inquiryWorkscopeId+`">
                       <i class="la fab la-codepen"></i>Design<span class="badge badge-default bi-download" id="k" onclick="downloadItems('designFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                       <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                       <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                     </svg></span>
                    </div>
                 </div>
                 <div id="designRow`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                  <div class="card-body" >
                  <div class="row" id="designRow`+response.data.inquiry.inquiryId+`">
                  `+dicDesign["DesignRow"+response.data.inquiry.inquiryId]+`
                      </div>
                   </div>
                 </div>
              </div>`;
               //}
               

           
              var m = response.data.inquiry.inquiryWorkscopes[0].measurements[0];
             // var s = m.files[0].fileUrl;
              var s = m.files;
                 
                
                 


       
              let measur ='';
               //if(element.measurements.length > 0){
                 measur = `<div class="card">
                 <div class="card-header" >
                    <div class="card-title" data-toggle="collapse" data-target="#measurementRow`+element.inquiryWorkscopeId+`">
                       <i class="la la-ruler-combined"></i>Measurement<span class="badge badge-default bi-download" id="k" onclick="downloadItems('measurementFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                       <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                       <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                     </svg></span>
                    </div>
                 </div>
                 <div id="measurementRow`+element.inquiryWorkscopeId+`" class="collapse show" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                    <div class="card-body" >
                          <div class="row" id="measurementRow`+response.data.inquiry.inquiryId+`">
                          `+dicMeasurement["measurementRow"+response.data.inquiry.inquiryId]+`
                          </div>
                       </div>
                 </div>
              </div>`;
            
              
             
           
              
               tabsHTML+=`
               <div class="tab-pane fade show active" id="workscope`+element.workscopeId+`" role="tabpanel" aria-labelledby="workscope`+element.workscopeId+`">
               <!--begin::Accordion-->
               <div class="accordion accordion-solid accordion-toggle-plus" id="accordion`+element.inquiryWorkscopeId+`">
                  
                  `+measur+design+quot+calculation+collect+Advance+Before+After+Install+`
             

               </div>
               <!--end::Accordion-->
            </div>`;
            
           
           }else{
              let Advance='';let Before='';let After='';let Install='';
             // if(response.data.inquiry.quotations.length > 0){
             // if(response.data.inquiry.quotations[0].payments.length >0){
             //response.data.inquiry.quotations[0].payments.forEach(payment => {
               // if(payment.paymentTypeId == 2 && payment.files.length > 0){
                 Advance = `
                 <div class="card">
                  <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicAdvance`+element.inquiryWorkscopeId+`">
                          <i class="la fab la-codepen"></i>Advance Payment<span class="badge badge-default bi-download" id="k" onclick="downloadItems('advanceFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg></span>
                      </div>
                  </div>
                  <div id="dicAdvance`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                  <div class="card-body" >
                      <div class="row" id="dicAdvance`+response.data.inquiry.inquiryId+`">
                      `+dicAdvance["dicAdvance"+response.data.inquiry.inquiryId]+`
                      </div>
                  </div>
                  </div>
                 </div>
                 `;
               // }//advance
                //if(payment.paymentTypeId == 3 && payment.files.length > 0){
                 Before = `
                 <div class="card">
                  <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicBefore`+element.inquiryWorkscopeId+`">
                          <i class="la fab la-codepen"></i>Before Installation Payment<span class="badge badge-default bi-download" id="k" onclick="downloadItems('beforeFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg></span>
                      </div>
                  </div>
                  <div id="dicBefore`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                  <div class="card-body" >
                      <div class="row" id="dicBefore`+response.data.inquiry.inquiryId+`">
                      `+dicBefore["dicBefore"+response.data.inquiry.inquiryId]+`
                      </div>
                  </div>
                  </div>
                 </div>
                 `;
               // }//Before
               // if(payment.paymentTypeId == 4 && payment.files.length > 0){
                 After = `
                 <div class="card">
                  <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicAfter`+element.inquiryWorkscopeId+`">
                          <i class="la fab la-codepen"></i>After Delivery Payment<span class="badge badge-default bi-download" id="k" onclick="downloadItems('afterFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg></span>
                      </div>
                  </div>
                  <div id="dicAfter`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                  <div class="card-body" >
                      <div class="row" id="dicAfter`+response.data.inquiry.inquiryId+`">
                      `+dicAfter["dicAfter"+response.data.inquiry.inquiryId]+`
                      </div>
                  </div>
                  </div>
                 </div>
                 `;
                //}//After
                //if(payment.paymentTypeId == 5 && payment.files.length > 0){
                 Install = `
                 <div class="card">
                  <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicInstall`+element.inquiryWorkscopeId+`">
                          <i class="la fab la-codepen"></i>Installment Payment<span class="badge badge-default bi-download" id="k" onclick="downloadItems('installFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg></span>
                      </div>
                  </div>
                  <div id="dicInstall`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                  <div class="card-body" >
                      <div class="row" id="dicInstall`+response.data.inquiry.inquiryId+`">
                      `+dicInstall["dicInstall"+response.data.inquiry.inquiryId]+`
                      </div>
                  </div>
                  </div>
                 </div>
                 `;
                //}//Install
              //});
              //}}
              let calculation ='';
              // if(response.data.inquiry.quotations.length >0){
                 calculation = `
                   <div class="card">
                      <div class="card-header" >
                         <div class="card-title collapsed" data-toggle="collapse" data-target="#dicCALC`+element.inquiryWorkscopeId+`">
                            <i class="la fab la-codepen"></i>Calculation SheetFile<span class="badge badge-default bi-download" id="k" onclick="downloadItems('calculationFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                          </svg></span>
                         </div>
                      </div>
                      <div id="dicCALC`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                       <div class="card-body" >
                       <div class="row" id="dicCALC`+response.data.inquiry.inquiryId+`">
                       `+dicCALC["dicCALC"+response.data.inquiry.inquiryId]+`
                       </div>
                       </div>
                      </div>
                   </div>
                   `;
                   //}
               let quot ='';
              // if(response.data.inquiry.quotations.length >0){
                   quot = `
                   <div class="card">
                      <div class="card-header" >
                         <div class="card-title collapsed" data-toggle="collapse" data-target="#quotRow`+element.inquiryWorkscopeId+`">
                            <i class="la fab la-codepen"></i>Quotation<span class="badge badge-default bi-download" id="k" onclick="downloadItems('quotationFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                          </svg></span>
                         </div>
                      </div>
                      <div id="quotRow`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                       <div class="card-body" >
                       <div class="row" id="quotRow`+response.data.inquiry.inquiryId+`">
                       `+dicQuot["QuotRow"+response.data.inquiry.inquiryId]+`
                       </div>
                       </div>
                      </div>
                   </div>
                   `;
                   //}
                let collect ='';
               // if(response.data.inquiry.jobOrders.length > 0){
                   collect =`<div class="card">
                   <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicMEP`+element.inquiryWorkscopeId+`">
                         <i class="la fab la-codepen"></i>MEP Drawing<span class="badge badge-default bi-download" id="k" onclick="downloadItems('mepFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                         <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                         <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                       </svg></span>
                      </div>
                   </div>
                   <div id="dicMEP`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                    <div class="card-body" >
                    <div class="row" id="dicMEP`+response.data.inquiry.inquiryId+`">
                    `+dicMEP["dicMEP"+response.data.inquiry.inquiryId]+`
                    </div>
                    </div>
                   </div>
                </div>`+
                    `<div class="card">
                    <div class="card-header" >
                    <div class="card-title collapsed" data-toggle="collapse" data-target="#dicMaterial`+element.inquiryWorkscopeId+`">
                        <i class="la fab la-codepen"></i> Material sheet<span class="badge badge-default bi-download" id="k" onclick="downloadItems('materialFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                      </svg></span>
                    </div>
                    </div>
                    <div id="dicMaterial`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                    <div class="card-body" >
                    <div class="row" id="dicMaterial`+response.data.inquiry.inquiryId+`">
                    `+dicMaterial["dicMaterial"+response.data.inquiry.inquiryId]+`
                    </div>
                    </div>
                    </div>
                    </div>`
                   +` <div class="card">
                   <div class="card-header" >
                      <div class="card-title collapsed" data-toggle="collapse" data-target="#dicDatasheet`+element.inquiryWorkscopeId+`">
                         <i class="la fab la-codepen"></i> Data sheet appliances<span class="badge badge-default bi-download" id="k" onclick="downloadItems('dataFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                         <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                         <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                       </svg></span>
                      </div>
                   </div>
                   <div id="dicDatasheet`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                    <div class="card-body" >
                    <div class="row" id="dicDatasheet`+response.data.inquiry.inquiryId+`">
                    `+dicDatasheet["dicDatasheet"+response.data.inquiry.inquiryId]+`
                    </div>
                    </div>
                   </div>
                </div>`+` <div class="card">
                <div class="card-header" >
                   <div class="card-title collapsed" data-toggle="collapse" data-target="#dicJoborder`+element.inquiryWorkscopeId+`">
                      <i class="la fab la-codepen"></i> Job order checklist file<span class="badge badge-default bi-download" id="k" onclick="downloadItems('jobFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg></span>
                   </div>
                </div>
                <div id="dicJoborder`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                 <div class="card-body" >
                 <div class="row" id="dicJoborder`+response.data.inquiry.inquiryId+`">
                 `+dicJoborder["dicJoborder"+response.data.inquiry.inquiryId]+`
                 </div>
                 </div>
                </div>
             </div>`+` <div class="card">
             <div class="card-header" >
                <div class="card-title collapsed" data-toggle="collapse" data-target="#dicDetailed`+element.inquiryWorkscopeId+`">
                   <i class="la fab la-codepen"></i> Detailed Design File<span class="badge badge-default bi-download" id="k" onclick="downloadItems('detailFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                   <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                   <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                 </svg></span>
                </div>
             </div>
             <div id="dicDetailed`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
              <div class="card-body" >
              <div class="row" id="dicDetailed`+response.data.inquiry.inquiryId+`">
              `+dicDetailed["dicDetailed"+response.data.inquiry.inquiryId]+`
              </div>
              </div>
             </div>
          </div>`;
              //  }
                let design ='';
                //if(element.designs.length>0){
                  design =
                  `<div class="card">
                  <div class="card-header" >
                     <div class="card-title collapsed" data-toggle="collapse" data-target="#designRow`+element.inquiryWorkscopeId+`">
                        <i class="la fab la-codepen"></i>Design<span class="badge badge-default bi-download" id="k" onclick="downloadItems('designFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                      </svg></span>
                     </div>
                  </div>
                  <div id="designRow`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                   <div class="card-body" >
                   <div class="row" id="designRow`+response.data.inquiry.inquiryId+`">
                   `+dicDesign["DesignRow"+response.data.inquiry.inquiryId]+`
                       </div>
                    </div>
                  </div>
               </div>`;
               // }
                let measur ='';
              // if(element.measurements.length > 0){
                 measur = `<div class="card">
                 <div class="card-header" >
                    <div class="card-title" data-toggle="collapse"  data-target="#measurementRow`+element.inquiryWorkscopeId+`">
                    <i class="la la-ruler-combined"></i>Measurement<span class="badge badge-default bi-download" id="k" onclick="downloadItems('measurementFiles');"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </svg></span>
                    </div>
                 </div>
                 <div id="measurementRow`+element.inquiryWorkscopeId+`" class="collapse show" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                    <div class="card-body" >
                          <div class="row" id="measurementRow`+response.data.inquiry.inquiryId+`">
                          `+dicMeasurement["measurementRow"+response.data.inquiry.inquiryId]+`
                          </div>
                       </div>
                 </div>
              </div>`;
              // }
   tabsHTML+=`
   <div class="tab-pane fade" id="workscope`+element.workscopeId+`" role="tabpanel" aria-labelledby="workscope`+element.workscopeId+`">
   <!--begin::Accordion-->
   <div class="accordion accordion-solid accordion-toggle-plus" id="accordion`+element.inquiryWorkscopeId+`">
      
      `+measur+design+
      quot+calculation
      +collect+Advance+Before+After+Install+
      `
   </div>
   <!--end::Accordion-->
</div>`;
}

isfirst=false;
});

tabs.innerHTML=`<div class="tab-content ">`+tabsHTML+`</div>`;
workscope.innerHTML=workscopeHtml;
// response.data.inquiryWorkscopes.forEach(element => {
// element.measurements[0].files.forEach(element => {
//     var id='measurementRow'+element.measurementId;
//     console.log(id);
//         document.getElementById(id).innerHTML+=`
//         <!--begin::Col-->
//         <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//            <!--begin::Card-->
//            <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
//               <div class="d-flex flex-column align-items-center">
//                  <!--begin: Icon-->
//                  <img alt="" class="max-h-65px" src="assets/media/svg/files/doc.svg" />
//                  <!--end: Icon-->
//                  <!--begin: Tite-->
//                  <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
//                  <!--end: Tite-->
//               </div>
//            </div>
//            <!--end:: Card-->
//         </div>
//         <!--end::Col-->`;
//     });
// });
// response.data.inquiryWorkscopes.forEach(element => {

//     element.designs[0].files.forEach(element => {
//         var id='designRow'+element.designId;
//             document.getElementById(id).innerHTML+=`
//             <!--begin::Col-->
//             <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
//                <!--begin::Card-->
//                <div class="card-body" onclick="window.open('`+baseFileURL+element.fileUrl+`', '_blank');" target="_blank" style="cursor: pointer;">
//                   <div class="d-flex flex-column align-items-center">
//                      <!--begin: Icon-->
//                      <img alt="" class="max-h-65px" src="assets/media/svg/files/doc.svg" />
//                      <!--end: Icon-->
//                      <!--begin: Tite-->
//                      <a href="#" class="text-dark-75 font-weight-bold mt-15 font-size-lg">`+element.fileUrl+`</a>
//                      <!--end: Tite-->
//                   </div>
//                </div>
//                <!--end:: Card-->
//             </div>
//             <!--end::Col-->`;
//         });
// });
	

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


	$('#txtAmount').keyup(function () {
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




    KTDatatablesSearchOptionsAdvancedSearch.init();


   

    });

  
    
    jQuery(document).ready(function() {
    
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
                    console.log(response.data[0].permissionName);
                    const branchList = document.getElementById('kt_select_branch');
                    var branchTypeListHTML = new Array();
    
                    for (var i = 0; i < response.data.length; i++) {
                        branchTypeListHTML.push(`
                        <option value="` + response.data[i].branchId + `">` + response.data[i].branchName + `</option>`);
                    }
    
                    branchList.innerHTML = branchTypeListHTML.join('');

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

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
                $('#reject').modal('hide');
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
                                                        class="form-control" value=" "
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
                             