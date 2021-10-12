

import {
    baseURL
} from './constant.js'
import {
    baseFileURL
} from './constant.js'

// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

let inquiryId;
var stripe = Stripe("pk_test_51JA8pgAtqGclDTLoOJUyuy8M288MhMFKFDMXvm2ygLXiMGHDmUyIDfE4umnBN7d0u1Z3K3bOcsfzwTWiE5zSQmHu00G9ydc4IQ");
var card ='';
var secret = '';
let quotationData;
let advanceAmount;
// Class Initialization
jQuery(document).ready(function() {
    const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
    inquiryId = urlParams.get('inquiryId')
    document.getElementById("inquiryId").value = inquiryId;
    $.ajax({
        type: "post",
        url: baseURL + '/Quotation/ViewQuotationForCustomer?inquiryId=' + inquiryId,
        success: function(response) {
            console.log(response);
            if (response.isError == false) {
              quotationData=response.data;
                document.getElementById("invoID").innerText = response.data.invoiceNo;
                document.getElementById("rinvoiceno").innerText = response.data.invoiceNo;
                document.getElementById("invoDate").innerText = response.data.createdDate;
                document.getElementById("invoDuDate").innerText = response.data.validDate;
                document.getElementById("invoProposalRef").innerText = response.data.proposalReferenceNumber;
                document.getElementById("branchAddress").innerText = response.data.branchAddress;
                document.getElementById("branchContact").innerText = response.data.branchContact;
                document.getElementById("sbranchContact").innerText = response.data.branchContact;
                document.getElementById("customerName").innerText = response.data.customerName;
                document.getElementById("buildingAddress").innerText = response.data.buildingAddress;
                document.getElementById("customerEmail").innerText = response.data.customerEmail;
                document.getElementById("customerContact").innerText = response.data.customerContact;
                // document.getElementById("amount").innerHTML = parseInt(response.data.amount) + ' AED';
                
                // var disval =  Math.round((parseFloat(response.data.discount)/100)*parseFloat(response.data.amount));
              var subtotal=  parseFloat(response.data.amount);
                var disval =  parseFloat(response.data.discount);
                // var vatval = Math.round((parseInt(response.data.vat)/100)*parseInt(response.data.amount));
                var vatval = parseInt(response.data.vat);
                var measurementFee=parseFloat(response.data.measurementFee);
                subtotal = subtotal ? subtotal : 0;
                disval = disval ? disval : 0;
                measurementFee = measurementFee ? measurementFee : 0;
                document.getElementById("amount").innerHTML =  subtotal+' AED';
                document.getElementById("discount").innerHTML = disval+'%';
                document.getElementById("measurementFee").innerHTML = measurementFee+' AED';
                if(measurementFee>0){
                document.getElementById("measurementFee").innerHTML = '-'+measurementFee+' AED';
              }
                document.getElementById("vat").innerHTML = vatval +'%';
                
// Total Amount = Amount - Discount 0% - Measurement Fee AED 250 + VAT 5%
// var totalA

 advanceAmount=parseFloat(response.data.advancePayment)*(parseFloat(response.data.totalAmount)/100);
                document.getElementById("totalAmount").innerHTML = parseFloat(response.data.totalAmount)+' AED';
                var classrow = '';
                for (let i = 1; i <= response.data.invoiceDetails.length; i++) {
                    if(i < response.data.invoiceDetails.length){
                        if(i % 2 == 0) {
                            classrow = '<div class="divevenrow">';
                        }else{
                            classrow ='<div class="divoddrow">';
                        }
                    }else{
                        if(i % 2 == 0) {
                            classrow = '<div class="divendrow">';
                          }else{
                            classrow = '<div class="divoddendrow">';
                          }
                    }
                    document.getElementById("table").innerHTML += 
                                classrow+
                                 '<div style="display: inline-block;width: 10%;">'+i+'</div>'+
                                 '<div style="display: inline-block;width: 40%;">'+response.data.invoiceDetails[i-1].inquiryWorkScopeNames+'</div>'+
                                 '<div style="display: inline-block;width: 25%;">'+response.data.invoiceDetails[i-1].quantity+'</div>'+
                                //  '<div style="display: inline-block;width: 15%;">'+response.data.discount+'%</div>'+
                                //  '<div style="display: inline-block;width: 15%;">'+parseInt(response.data.amount).toLocaleString()+'</div>'+
                                 '<div style="display: inline-block;width: 25%;">-</div>'+
                                //  '<div style="display: inline-block;width: 15%;">'+response.data.vat +'%</div>'+
                                '</div>';
                      
                }
                for (let i = 0; i < response.data.files.length; i++) {
                    switch(response.data.files[i].fileContentType) {
                        case "pdf":
                              document.getElementById('icons').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/pdf.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        case "css":
                              document.getElementById('icons').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/css.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        case "doc":
                              document.getElementById('icons').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/doc.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        case "html":
                              document.getElementById('icons').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/html.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        case "javascript":
                              document.getElementById('javascript').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/html.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        case "jpg":
                              document.getElementById('icons').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/jpg.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        case "jpeg":
                              document.getElementById('icons').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/jpg.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        case "mp4":
                              document.getElementById('icons').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/mp4.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        case "xml":
                              document.getElementById('icons').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/xml.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        case "zip":
                              document.getElementById('icons').innerHTML +=
                              '<div   class="divico">'+
                               '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="/assets/media/svg/files/zip.svg" style="width:100%;"></a>'+
                              '</div>';
                        break;
                        default:
                            document.getElementById('icons').innerHTML +=
                            '<div   class="divico">'+
                             '<a href="'+baseFileURL+response.data.files[i].fileUrl+'" target="_blank"> <img  src="" style="width:100%;"></a>'+
                            '</div>';

                      }
                }

                for (let i = 0; i < response.data.termsAndConditionsDetail.length; i++) {
                    document.getElementById("terms").innerHTML +=
                    '<div style="padding-left: 20px;opacity: 80%;">'+
                    (i+1) +'. '+response.data.termsAndConditionsDetail[i].termsAndConditionsDetail
                    '</div>';
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
              }).then(function() {
                  KTUtil.scrollTop();
              });
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           
        }
    });


});
$( "#txtdescription" ).blur(function() {
  if($('#txtdescription').val()!=''){
    $('#txtdescription').css("border-color","#E8E4E4");
  }
});
$( "#rejectbtn" ).click(function() {
  if($('#txtdescription').val()==''){
    $('#txtdescription').css("border-color","#C80000");
   return false;
  }
  if($('#hemoji').val()=='0'){
    document.getElementById("emoj1").style.border = "solid 1px red";
   return false;
  }
    var rejectObj={
        inquiryId:document.getElementById("inquiryId").value,
        reason:document.getElementById("txtdescription").value,
        FeedBackReactionId:document.getElementById("hemoji").value,
    }
    const data = JSON.stringify(rejectObj);
   // console.log(data);
    $.ajax({
        type: "post",
        url: baseURL + '/Quotation/ClientRejectQuotation' ,
        data: data,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        success: function(response) {
            console.log(response);
            Swal.fire({
              text: 'Quotation Rejected Succesfully',
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                  confirmButton: "btn font-weight-bold btn-light-primary"
              }
          }).then(function() {
              KTUtil.scrollTop();
          });
            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
            Swal.fire({
              text: 'Quotation Rejection Failed',
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

  $('#slctapprve').on('change', function() {
    if(this.value !=''){
      
      $('#slctapprve').css("border-color","#e4e6ef");
    }

    if(this.value ==''){
      document.getElementById("divPymntType").style.removeProperty('display');
      document.getElementById("cardpay").style.removeProperty('display');
      document.getElementById("cardpay").style.display ="none";
      document.getElementById("divPymntType").style.display ="none";
    }

    if(this.value == '1'){
        document.getElementById("cardpay").style.display ="none";
        document.getElementById("divPymntType").style.removeProperty('display');
        document.getElementById("divPymntType").innerHTML= '<p style="display:inline-block;padding-right:5px;">Branch Address:</p><p style="font-weight:bold;;display:inline-block;">'+document.getElementById("branchAddress").innerText+ '<p/><p style="display:inline-block;padding-right:5px;">Amount: </p><p style="font-weight:bold;display:inline-block;"> '+advanceAmount+' </p>';
       
    }
    if(this.value == '2'){
        document.getElementById("cardpay").style.display ="none";
        document.getElementById("divPymntType").style.removeProperty('display');
        document.getElementById("divPymntType").innerHTML='<p style="display:inline-block;padding-right:5px;">Pay To the Order of:</p><p style="font-weight:bold;display:inline-block;">  SAI KITCHEN & WOODEN SAFES FACTORY </p>'+ '<p style="height:0px;"></p><p style="display:inline-block;padding-right:5px;">Amount: </p><p style="font-weight:bold;display:inline-block;"> '+advanceAmount+' </p>';
    }
    if(this.value == '4'){
        document.getElementById("spamount").innerHTML= '<p style="padding-top:5px;display:inline-block;padding-right:5px;">Amount: </p><p style="font-weight:bold;display:inline-block;"> '+advanceAmount+' </p>'
        document.getElementById("divPymntType").style.display ="none";
        document.getElementById("cardpay").style.removeProperty('display');
    }
  });



  // Disable the button until we have Stripe set up on the page
  //document.querySelector("button").disabled = true;
  jQuery(document).ready( function () {
    const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
    inquiryId = urlParams.get('inquiryId')
    document.getElementById("inquiryId").value = inquiryId;

      var elements = stripe.elements();
  
      var style = {
        base: {
          color: "#32325d",
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d"
          }
        },
        invalid: {
          fontFamily: 'Arial, sans-serif',
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };
  
       card = elements.create("card", { style: style });
      // Stripe injects an iframe into the DOM
      card.mount("#card-element");
  
      card.on("change", function (event) {
        // Disable the Pay button if there are no card details in the Element
        //document.querySelector("button").disabled = event.empty;
        document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
      });
  
  /*     var form = document.getElementById("payment-form");
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        // Complete payment when the submit button is clicked
        payWithCard(stripe, card, "pi_3JJc0f2eZvKYlo2C10ZJcKHr_secret_M3wCAUcdgAP45DS0zHLd2OpUt");
      }); */
    });
  
    $("#approvebtn" ).click(function() {
      if($('#slctapprve').val()==''){
        $('#slctapprve').css("border-color","#C80000");
       return false;
      }
      if($('#aemoji').val()=='0'){
        document.getElementById("aemoj1").style.border = "solid 1px red";
       return false;
      }
      if($('#slctapprve').val()!='4'){
        document.getElementById("load").style.removeProperty('display');
       
        document.getElementById("amount").style.width ="150px";
        document.getElementById("amount").style.textAlign = "right";
        document.getElementById("discount").style.width ="150px";
        document.getElementById("discount").style.textAlign = "right";
        document.getElementById("measurementFee").style.width ="150px";
        document.getElementById("measurementFee").style.textAlign = "right";
        document.getElementById("vat").style.width ="150px";
        document.getElementById("vat").style.textAlign = "right";
        document.getElementById("totalAmount").style.width ="150px";
        document.getElementById("totalAmount").style.textAlign = "right";
        domtoimage.toPng(document.getElementById('kt_tab_diagram'))
        .then(function (blob) {     
            var pdf = new jsPDF('l', 'pt', [$('#kt_tab_diagram').width(), $('#kt_tab_diagram').height()]);
            pdf.addImage(blob, 'JPG', 0, 0, $('#kt_tab_diagram').width(), $('#kt_tab_diagram').height(),undefined,'FAST');
            //pdf.save("test.pdf");
            var file = pdf.output();
            var out =btoa(file);
              var apprvObj={
                inquiryId:document.getElementById("inquiryId").value,
                FeedBackReactionId:document.getElementById("aemoji").value,
                paymentIntentToken:'',
                clientSecret:'',
                PaymentMethod:'',
                SelectedPaymentMode:$('#slctapprve').val(),
                pdf: out,
              }
              const data = JSON.stringify(apprvObj);
              // console.log(data);
              $.ajax({
                  type: "post",
                  url:  baseURL +'/Quotation/ClientApproveQuotation' ,
                  data: data,
                  headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*',
                  },
                  success: function(response) {
                      //console.log(response);
                      if (response.isError == false) {
                        document.getElementById("load").style.display = 'none';
                      $('#msg').modal('show');
                    } else {
                      
                  }
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                  
                    document.getElementById("load").style.display = 'none';
  
                  }
              });
              
        });
     }
   else  if($('#slctapprve').val()=='4'){
    document.getElementById("load").style.removeProperty('display');
    $.ajax({
      type: "post",
      url:  baseURL +'/Quotation/stripe?inquiryId=' + inquiryId,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      },
      success: function(response) { 
        if (response.isError == false) {
                       try{
        secret = response.data;
        console.log(response.data);
        
    payWithCard(stripe, card, secret);
  }catch(Exception ){
    $('#approve').modal('show');
  }
      }
       else {
         
        $('#approve').modal('show');
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
     
        Swal.fire({
            text: errorThrown,
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
}
    });
  // Calls stripe.confirmCardPayment
  // If the card requires authentication Stripe shows a pop-up modal to
  // prompt the user to enter authentication details without leaving your page.
  var payWithCard = function(stripe, card, clientSecret) {
    //loading(true);
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: card
        }
      })
      .then(function(result) {
        if (result.error) {
          // Show error to your customer
          document.getElementById("load").style.display = 'none';
          showError(result.error.message);
          $('#approve').modal('show');
          // $('#msg').modal('show');
        } else {
          // The payment succeeded!
              orderComplete(result.paymentIntent.id);
              
    document.getElementById("amount").style.width ="150px";
    document.getElementById("amount").style.textAlign = "right";
    document.getElementById("discount").style.width ="150px";
    document.getElementById("discount").style.textAlign = "right";
    document.getElementById("measurementFee").style.width ="150px";
    document.getElementById("measurementFee").style.textAlign = "right";
    document.getElementById("vat").style.width ="150px";
    document.getElementById("vat").style.textAlign = "right";
    document.getElementById("totalAmount").style.width ="150px";
    document.getElementById("totalAmount").style.textAlign = "right";
    domtoimage.toPng(document.getElementById('kt_tab_diagram'))
        .then(function (blob) {     
            var pdf = new jsPDF('l', 'pt', [$('#kt_tab_diagram').width(), $('#kt_tab_diagram').height()]);
            pdf.addImage(blob, 'JPG', 0, 0, $('#kt_tab_diagram').width(), $('#kt_tab_diagram').height(),undefined,'FAST');
            //pdf.save("test.pdf");
            var file = pdf.output();
            var out =btoa(file);
              var apprvObj={
                inquiryId:document.getElementById("inquiryId").value,
                FeedBackReactionId:document.getElementById("aemoji").value,
                paymentIntentToken:result.paymentIntent.id,
                clientSecret:result.paymentIntent.client_secret,
                PaymentMethod:result.paymentIntent.payment_method,
                SelectedPaymentMode:$('#slctapprve').val(),
                pdf: out,
              }
              const data = JSON.stringify(apprvObj);
              // console.log(data);
              $.ajax({
                  type: "post",
                  url:  baseURL +'/Quotation/ClientApproveQuotation' ,
                  data: data,
                  headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*',
                  },
                  success: function(response) {
                      //console.log(response);
                      if (response.isError == false) {
                        document.getElementById("load").style.display = 'none';
                      $('#msg').modal('show');
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
                    document.getElementById("load").style.display = 'none';
        Swal.fire({
          text: errorThrown,
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
        }
      });
  };
  
  /* ------- UI helpers ------- */
  
  // Shows a success message when the payment is complete
  var orderComplete = function(paymentIntentId) {
   // loading(false);
    document
      .querySelector(".result-message a")
      .setAttribute(
        "href",
        "https://dashboard.stripe.com/test/payments/" + paymentIntentId
      );
    // document.querySelector(".result-message").classList.remove("hidden");
    //document.querySelector("button").disabled = true;
  };
  
  // Show the customer the error from Stripe if their card fails to charge
  var showError = function(errorMsgText) {
   // loading(false);
   document.getElementById("errorMessage").innerHTML=errorMsgText;
   document.querySelector(".result-message").classList.add("hidden");
  //   var errorMsg = document.querySelector("#card-error");
  //   errorMsg.textContent = errorMsgText;
  //  setTimeout(function() {
   //   errorMsg.textContent = "";
  //  }, 4000);
  };
  

  
//   $('#approvebtn').click(function () {
//     document.getElementById("amount").style.width ="150px";
//     document.getElementById("amount").style.textAlign = "right";
//     document.getElementById("discount").style.width ="150px";
//     document.getElementById("discount").style.textAlign = "right";
//     document.getElementById("measurementFee").style.width ="150px";
//     document.getElementById("measurementFee").style.textAlign = "right";
//     document.getElementById("vat").style.width ="150px";
//     document.getElementById("vat").style.textAlign = "right";
//     document.getElementById("totalAmount").style.width ="150px";
//     document.getElementById("totalAmount").style.textAlign = "right";
//     domtoimage.toPng(document.getElementById('kt_tab_diagram'))
//         .then(function (blob) {     
//             var pdf = new jsPDF('l', 'pt', [$('#kt_tab_diagram').width(), $('#kt_tab_diagram').height()]);
//             pdf.addImage(blob, 'JPG', 0, 0, $('#kt_tab_diagram').width(), $('#kt_tab_diagram').height(),undefined,'FAST');
//             //pdf.save("test.pdf");
//             var file = pdf.output();
//             var out =btoa(file);
//            /*  document.getElementById("amount").style.removeProperty("width");
//             document.getElementById("amount").style.removeProperty("textAlign");  
//             document.getElementById("discount").style.removeProperty("width");
//             document.getElementById("discount").style.removeProperty("textAlign");  
//             document.getElementById("measurementFee").style.removeProperty("width");
//             document.getElementById("measurementFee").style.removeProperty("textAlign"); 
//             document.getElementById("vat").style.removeProperty("width");
//             document.getElementById("vat").style.removeProperty("textAlign"); 
//             document.getElementById("totalAmount").style.removeProperty("width");
//             document.getElementById("totalAmount").style.removeProperty("textAlign");
//             that.options.api.optionsChanged(); */
//             /*var file = pdf.output('blob');
//             var fd = new FormData();     // To carry on your data  
//             fd.append('mypdf',file);
//             alert(fd);
//             /*
//             other method
//             var file = pdf.output();
//             var out =btoa(file);
//             */
//             var quotFile = {
//               "inquiryId": document.getElementById("inquiryId").value,
//               "pdf": out,
//             };
//             const data = JSON.stringify(quotFile);
//               // console.log(data);
//               $.ajax({
//                   type: "post",
//                   url:  baseURL +'/Quotation/UploadPDFForQuotation' ,
//                   data: data,
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Access-Control-Allow-Origin': '*',
//                   },
//                   success: function(response) {
//                       console.log(response);
                      
//                   },
//                   error: function(XMLHttpRequest, textStatus, errorThrown) {
//                     console.log(response);
//                   }
//               });

             
           
//         });
            
// });
