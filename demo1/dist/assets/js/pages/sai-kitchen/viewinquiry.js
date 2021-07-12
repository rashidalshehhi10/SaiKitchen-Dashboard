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
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

let inquiryId;
let inquiry;
let permissions;
let measurementPermission;
let promoId;
let promoDiscount;
let isMeasurementPromo;
let vatvalue;
let advancePayment;
let advancePaymentAmount;
let totalAmount;


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
                // Show loading state on button
                KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");
                // Form Validation & Ajax Submission: https://formvalidation.io/guide/examples/using-ajax-to-submit-the-form
               
                console.log(measurementFile);
                
    if(user.data.userRoles[0].branchRole.roleTypeId==1){
     advancePayment= document.getElementById('txtAdvancePayment').value;
    }
                var quotationModel={
                    inquiryId: inquiryId,
                    description: document.getElementById('txtdescription').value,
                    totalAmount: document.getElementById('txtTotalAmount').value,
                    amount: document.getElementById('txtAmount').value,
                    advancePayment:advancePayment,
                    vat:vatvalue,
                    discount: promoDiscount,
                    quotationValidityDate: document.getElementById('kt_datepicker_2').value,
                    quotationFiles: measurementFile,
                    paymentName: 'Advance Payment',
                    paymentDetail: '',
                    paymentAmount:advancePaymentAmount,
                };
                const data = JSON.stringify(quotationModel);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Quotation/AddQuotation',
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
                            window.location.replace("quotation.html");

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
            _handleaddquotation();
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
    inquiryId = urlParams.get('inquiryId')
    console.log(inquiryId);
    if (inquiryId == null || inquiryId == "") {
        window.location.replace("quotation.html");
    }
    if(user.data.userRoles[0].branchRole.roleTypeId==1){
    $('#txtAdvancePayment').prop('readonly', false);
}


    $.ajax({
        type: "post",
        url: baseURL + '/Quotation/GetInquiryForQuotationbyId?inquiryId=' + inquiryId,

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
var inquiryWorkscopelength=response.data.inquiryWorkscopes[response.data.inquiryWorkscopes.length-1];
console.log(inquiryWorkscopelength);
inquiry=response.data;
document.getElementById('txtPromoCode').value=inquiry.promo.promoName;
promoDiscount=inquiry.promoDiscount;
promoId=inquiry.promoId;
isMeasurementPromo=inquiry.isMeasurementPromo;
const customerDetail = document.getElementById('customerDetail');
const tabs = document.getElementById('tabpaneworkscope');
const workscope=document.getElementById('workscopedetail');
var dicMeasurement = new Object();
var dicDesign = new Object();
var workscopeHtml=``;
var tabsHTML =``;
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
      <a href="#" class="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary">`+response.data.customer.customerName+`</a>
      <div class="text-muted">`+response.data.customer.customerContact+`</div>
   </div>
</div>
<!--end::User-->
<!--begin::Contact-->
<div class="py-9">
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Code:</span>
      <span class="text-muted" style=" text-align: right;">CS`+response.data.branchId+``+response.data.customerId+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Email:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.customer.customerEmail+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Contact:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.customer.customerContact+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Address:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.building.buildingAddress+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Building Condition:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.building.buildingCondition+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Floor:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.building.buildingFloor+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Building Under-Construction:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.building.buildingReconstruction+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Building IsOccupied:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.building.isOccupied+`</span>
   </div>
   <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="font-weight-bold mr-2">Type Of Unit:</span>
      <span class="text-muted" style=" text-align: right;">`+response.data.building.buildingTypeOfUnit+`</span>
   </div>
</div>
<!--end::Contact-->
`;
inquiryCode.innerHTML=response.data.inquiryCode;
var isfirst=true;
response.data.inquiryWorkscopes.forEach(element => {
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
    element.measurements[0].files.forEach(element => {
        if( dicMeasurement["measurementRow"+element.measurementId]==null){
            dicMeasurement["measurementRow"+element.measurementId]=``;
        }
        if(element.fileContentType=='mp4'){
            var videoUrl="https://player.vimeo.com/video/"+element.fileUrl;
            dicMeasurement["measurementRow"+element.measurementId] +=`
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
            dicMeasurement["measurementRow"+element.measurementId] +=`
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
        dicMeasurement["measurementRow"+element.measurementId] +=`
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
        element.designs[0].files.forEach(element => {
            if(   dicDesign["DesignRow"+element.designId]==null){
                dicDesign["DesignRow"+element.designId]=``;
            }
            if(element.fileContentType=='pdf'){
                dicDesign["DesignRow"+element.designId] +=`
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
            dicDesign["DesignRow"+element.designId] +=`
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
            if(isfirst){
                tabsHTML+=`
                <div class="tab-pane fade show active" id="workscope`+element.workscopeId+`" role="tabpanel" aria-labelledby="workscope`+element.workscopeId+`">
                <!--begin::Accordion-->
                <div class="accordion accordion-solid accordion-toggle-plus" id="accordion`+element.inquiryWorkscopeId+`">
                   <div class="card">
                      <div class="card-header" >
                         <div class="card-title" data-toggle="collapse" data-target="#measurementRow`+element.inquiryWorkscopeId+`">
                            <i class="la la-ruler-combined"></i>Measurement
                         </div>
                      </div>
                      <div id="measurementRow`+element.inquiryWorkscopeId+`" class="collapse show" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                         <div class="card-body" >
                               <div class="row" id="measurementRow`+element.measurements[0].measurementId+`">
                               `+dicMeasurement["measurementRow"+element.measurements[0].measurementId]+`
                               </div>
                            </div>
                      </div>
                   </div>
                   <div class="card">
                      <div class="card-header" >
                         <div class="card-title collapsed" data-toggle="collapse" data-target="#designRow`+element.inquiryWorkscopeId+`">
                            <i class="la fab la-codepen"></i>Design
                         </div>
                      </div>
                      <div id="designRow`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
                       <div class="card-body" >
                       <div class="row" id="designRow`+element.designs[0].designId+`">
                       `+dicDesign["DesignRow"+element.designs[0].designId]+`
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
                <!--end::Accordion-->
             </div>`;
            
            }else{
    tabsHTML+=`
    <div class="tab-pane fade" id="workscope`+element.workscopeId+`" role="tabpanel" aria-labelledby="workscope`+element.workscopeId+`">
    <!--begin::Accordion-->
    <div class="accordion accordion-solid accordion-toggle-plus" id="accordion`+element.inquiryWorkscopeId+`">
       <div class="card">
          <div class="card-header" >
             <div class="card-title" data-toggle="collapse" data-target="#measurementRow`+element.inquiryWorkscopeId+`">
                <i class="la la-ruler-combined"></i>Measurement
             </div>
          </div>
          <div id="measurementRow`+element.inquiryWorkscopeId+`" class="collapse show" data-parent="#accordion`+element.inquiryWorkscopeId+`">
             <div class="card-body" >
                   <div class="row" id="measurementRow`+element.measurements[0].measurementId+`">
                   `+dicMeasurement["measurementRow"+element.measurements[0].measurementId]+`
                   </div>
                </div>
          </div>
       </div>
       <div class="card">
          <div class="card-header" >
             <div class="card-title collapsed" data-toggle="collapse" data-target="#designRow`+element.inquiryWorkscopeId+`">
                <i class="la fab la-codepen"></i>Design
             </div>
          </div>
          <div id="designRow`+element.inquiryWorkscopeId+`" class="collapse" data-parent="#accordion`+element.inquiryWorkscopeId+`">
           <div class="card-body" >
           <div class="row" id="designRow`+element.designs[0].designId+`">
           `+dicDesign["DesignRow"+element.designs[0].designId]+`
               </div>
            </div>
          </div>
       </div>
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
            var amountAfterDiscount=($(this).val()/1- (($(this).val()/100)*promoDiscount));
             totalAmount=(amountAfterDiscount+ (amountAfterDiscount/100)*vatvalue);
      document.getElementById('txtTotalAmount').value=totalAmount;
      document.getElementById('lblTotalAmount').innerHTML='Total Amount = Amount - Discount '+promoDiscount+'% + VAT '+vatvalue+'%';
      advancePaymentAmount= (totalAmount/100)*advancePayment;
      document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED '+advancePaymentAmount;
    }else{
         totalAmount= ($(this).val()/1+ (($(this).val()/100)*vatvalue));
        document.getElementById('txtTotalAmount').value= totalAmount;   
           document.getElementById('lblTotalAmount').innerHTML='Total Amount = Amount - Discount 0% + VAT '+vatvalue+'%';
           advancePaymentAmount= (totalAmount/100)*advancePayment;
           document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED'+advancePaymentAmount;
         
    }
});

$('#txtAdvancePayment').keyup(function () {
    advancePayment=  document.getElementById('txtAdvancePayment').value;
    advancePaymentAmount= (totalAmount/100)*advancePayment;
    document.getElementById('lblAdvancePayment').innerHTML='Advance Payment: AED'+advancePaymentAmount;

});


    KTDatatablesSearchOptionsAdvancedSearch.init();

    $.ajax({
        type: "get",
        url: baseURL + '/Fees/GetFeesById?feesId=2',
        
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
                console.log(response.data.feesAmount);
                advancePayment=response.data.feesAmount;
                document.getElementById('txtAdvancePayment').value=advancePayment;
              
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
            }).then(function () {
                KTUtil.scrollTop();
            });
        }
    });
    $.ajax({
        type: "get",
        url: baseURL + '/Fees/GetFeesById?feesId=5',
        
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
                console.log(response.data.feesAmount);
                vatvalue=response.data.feesAmount;
                if(isMeasurementPromo==false){
                document.getElementById('lblTotalAmount').innerHTML='Total Amount = Amount - Discount '+promoDiscount+'% + VAT '+vatvalue+'%';
                }else{
                    document.getElementById('lblTotalAmount').innerHTML='Total Amount = Amount - Discount 0% + VAT '+vatvalue+'%';
                }
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
            }).then(function () {
                KTUtil.scrollTop();
            });
        }
    });

    });

