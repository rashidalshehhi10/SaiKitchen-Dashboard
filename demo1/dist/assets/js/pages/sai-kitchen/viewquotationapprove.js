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
let isInstallment=false;
var calcfile=new Array();
var KTDatatablesSearchOptionsAdvancedSearch = function() {
   
    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

   

    return {

        //main function to initiate the module
        init: function() {
           
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
    //document.getElementById("inquiryId").value = inquiryId;
    document.getElementById("inquiryId").innerHTML = inquiryId;
    console.log(inquiryId);
    if (inquiryId == null || inquiryId == "") {
        window.location.replace("inquiry.html");
    }
    
branchTypeId = user.data.userRoles[0].branch.branchTypeId;

   

    $.ajax({
        type: "post",
        url: baseURL + '/Inquiry/GetinquiryDetailsById?inquiryId=' + inquiryId,

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
if(inquiry.payments.length > 0)
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

var jobHtml =``;
var jobdetail =``;
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

if(response.data.inquiry.jobOrders.length > 0){
   var bool1,bool2,bool2,bool3,bool4,bool5,bool6;
   if(response.data.inquiry.jobOrders[0].siteMeasurementMatchingWithDesign){
      bool1  ="Yes";
   }else
      bool1 = "No";
   if(response.data.inquiry.jobOrders[0].materialConfirmation){
      bool2  ="Yes";
   }else
      bool2 = "No";
   if(response.data.inquiry.jobOrders[0].mepdrawing){
      bool3  ="Yes";
   }else
      bool3 = "No";
   if(response.data.inquiry.jobOrders[0].quotationAndCalculationSheetMatchingProposal){
      bool4  ="Yes";
   }else
      bool4 = "No"; 
   if(response.data.inquiry.jobOrders[0].approvedDrawingsAndAvailabilityOfClientSignature){
      bool5  ="Yes";
   }else
      bool5 = "No"; 
   if(response.data.inquiry.jobOrders[0].appliancesDataSheet){
      bool6  ="Yes";
   }else
      bool6 = "No";          
   jobHtml =`<div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Prefered date by client :</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].jobOrderExpectedDeadline+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Is Appliances Provided By Client:</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].isAppliancesProvidedByClient+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Site Measurement Matching With Design :</span>
      <span class="text-muted" style=" text-align: right;">`+bool1+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Site Measurement Matching With Design Notes :</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].siteMeasurementMatchingWithDesignNotes+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">material Confirmation :</span>
      <span class="text-muted" style=" text-align: right;">`+bool2+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">material Confirmation Notes:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].materialConfirmationNotes+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">mep drawing:</span>
      <span class="text-muted" style=" text-align: right;">`+bool3+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">mep drawing Notes:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].mepdrawingNotes+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">quotation And Calculation Sheet Matching Proposal:</span>
      <span class="text-muted" style=" text-align: right;">`+bool4+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">quotation And Calculation Sheet Matching Proposal Notes:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].quotationAndCalculationSheetMatchingProposalNotes+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">approved Drawings And Availability Of Client Signature:</span>
      <span class="text-muted" style=" text-align: right;">`+bool5+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">approved Drawings And Availability Of Client Signature Notes:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].approvedDrawingsAndAvailabilityOfClientSignatureNotes+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">appliances DataSheet:</span>
      <span class="text-muted" style=" text-align: right;">`+bool6+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">appliances DataSheet Notes:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].appliancesDataSheetNotes+`</span>
</div>
`;
if(response.data.inquiry.jobOrders[0].jobOrderDetails.length >0){
 jobdetail = `<div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Material Availablity Date:</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].jobOrderDetails[0].materialAvailabilityDate+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Shop Drawing Completion Date:</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].jobOrderDetails[0].shopDrawingCompletionDate+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Production Completion Date:</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].jobOrderDetails[0].productionCompletionDate+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Wooden Work Completion Date:</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].jobOrderDetails[0].woodenWorkCompletionDate+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Material Delivery Final Date:</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].jobOrderDetails[0].materialDeliveryFinalDate+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Counter Top Fixing Date:</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].jobOrderDetails[0].countertopFixingDate+`</span>
</div>
<div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Installation Start Date:</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].jobOrderDetails[0].installationStartDate+`</span>
</div>
 <div class="d-flex align-items-center justify-content-between mb-2">
   <span class="font-weight-bold mr-2">Notes:</span>
   <span class="text-muted" style=" text-align: right;">`+response.data.inquiry.jobOrders[0].jobOrderDetails[0].jobOrderDetailDescription+`</span>
</div>

`;
}
jobHtml +=jobdetail;
}
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
   `+jobHtml+`
   
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
        if( dicMeasurement["measurementRow"+response.data.inquiry.inquiryId]==null){
            dicMeasurement["measurementRow"+response.data.inquiry.inquiryId]=``;
        }
        if(element.fileContentType=='mp4'){
            var videoUrl="https://player.vimeo.com/video/"+element.fileUrl;
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
        });
      }
      if(counter == 0 & element.designs.length > 0){
        element.designs[0].files.forEach(element => {
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
                           <i class="la fab la-codepen"></i>Advance Payment
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
                           <i class="la fab la-codepen"></i>Before Installation Payment
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
                           <i class="la fab la-codepen"></i>After Delivery Payment
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
                           <i class="la fab la-codepen"></i>Installment Payment
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
                         <i class="la fab la-codepen"></i>MEP Drawing
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
                        <i class="la fab la-codepen"></i> Material sheet
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
                         <i class="la fab la-codepen"></i> Data sheet appliances
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
                      <i class="la fab la-codepen"></i> Job order checklist file
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
                   <i class="la fab la-codepen"></i> Detailed Design File
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
                             <i class="la fab la-codepen"></i>Calculation SheetFile
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
                            <i class="la fab la-codepen"></i>Quotation
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
                        <i class="la fab la-codepen"></i>Design
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
                let measur ='';
                //if(element.measurements.length > 0){
                  measur = `<div class="card">
                  <div class="card-header" >
                     <div class="card-title" data-toggle="collapse" data-target="#measurementRow`+element.inquiryWorkscopeId+`">
                        <i class="la la-ruler-combined"></i>Measurement
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
                //}
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
                           <i class="la fab la-codepen"></i>Advance Payment
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
                           <i class="la fab la-codepen"></i>Before Installation Payment
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
                           <i class="la fab la-codepen"></i>After Delivery Payment
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
                           <i class="la fab la-codepen"></i>Installment Payment
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
                             <i class="la fab la-codepen"></i>Calculation SheetFile
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
                             <i class="la fab la-codepen"></i>Quotation
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
                          <i class="la fab la-codepen"></i>MEP Drawing
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
                         <i class="la fab la-codepen"></i> Material sheet
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
                          <i class="la fab la-codepen"></i> Data sheet appliances
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
                       <i class="la fab la-codepen"></i> Job order checklist file
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
                    <i class="la fab la-codepen"></i> Detailed Design File
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
                         <i class="la fab la-codepen"></i>Design
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
                     <div class="card-title" data-toggle="collapse" data-target="#measurementRow`+element.inquiryWorkscopeId+`">
                        <i class="la la-ruler-combined"></i>Measurement
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






    KTDatatablesSearchOptionsAdvancedSearch.init();


   

    });
    jQuery(document).ready(function() {
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
       // document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED '+advancePaymentAmount;
      }else{
           totalAmount= (($(this).val()/1-measurementFee)+ ((($(this).val()-measurementFee)/100)*vatvalue));
           if(totalAmount<0){
               totalAmount=0;
           }
          document.getElementById('txtTotalAmount').value= totalAmount;   
             document.getElementById('lblTotalAmount').innerHTML='Total Amount = Amount - Discount 0% - Measurement Fee AED '+measurementFee+' + VAT '+vatvalue+'%';
             advancePaymentAmount= (totalAmount/100)*advancePayment;
             //document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED'+advancePaymentAmount;
           
      }
  });
  
  $('#txtAdvancePayment').keyup(function () {
      advancePayment=  document.getElementById('txtAdvancePayment').value;
      totalAmount= document.getElementById('txtTotalAmount').value
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
 
  $('#kt_btn_add_quotation').click(function () {

   var form = KTUtil.getById('kt_add_quotation');
   var formSubmitUrl = KTUtil.attr(form, 'action');
   var formSubmitButton = KTUtil.getById('kt_btn_add_quotation');
   var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
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
           var calc ='';
           if(calcfile.length > 0)
                calc = calcfile[0];
                    
            var file = ''; 
           if(measurementFile.length > 0) 
                      file = measurementFile[0];
           console.log(measurementFile);
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
            advancePayment: document.getElementById('txtAdvancePayment').value,
            beforeInstallation: document.getElementById('txtBeforeInstallation').value,
            afterDelivery: document.getElementById('txtAfterInstallation').value,
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
});
    
                            