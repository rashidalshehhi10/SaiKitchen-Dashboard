

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
            console.log(response.data);
            if (response.isError == false) {
                document.getElementById("invoID").innerText = response.data.invoiceNo;
                document.getElementById("rinvoiceno").innerText = response.data.invoiceNo;
                document.getElementById("invoDate").innerText = response.data.createdDate;
                document.getElementById("invoDuDate").innerText = response.data.validDate;
                document.getElementById("branchAddress").innerText = response.data.branchAddress;
                document.getElementById("branchContact").innerText = response.data.branchContact;
                document.getElementById("sbranchContact").innerText = response.data.branchContact;
                document.getElementById("customerName").innerText = response.data.customerName;
                document.getElementById("buildingAddress").innerText = response.data.buildingAddress;
                document.getElementById("customerEmail").innerText = response.data.customerEmail;
                document.getElementById("customerContact").innerText = response.data.customerContact;
                document.getElementById("amount").innerHTML = parseInt(response.data.amount).toLocaleString() + ' aed';
                
                var disval =  Math.round((parseInt(response.data.discount)/100)*parseInt(response.data.amount));
                var vatval = Math.round((parseInt(response.data.vat)/100)*parseInt(response.data.amount));
                document.getElementById("discount").innerHTML = disval.toLocaleString() +' aed';
                document.getElementById("vat").innerHTML = vatval.toLocaleString() +' aed';
                document.getElementById("totalAmount").innerHTML = parseInt(response.data.totalAmount).toLocaleString()+' aed';
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
                                 '<div style="display: inline-block;width: 20%;">'+response.data.invoiceDetails[i-1].inquiryWorkScopeNames+'</div>'+
                                 '<div style="display: inline-block;width: 15%;">'+response.data.invoiceDetails[i-1].quantity+'</div>'+
                                 '<div style="display: inline-block;width: 15%;">'+response.data.discount+'%</div>'+
                                //  '<div style="display: inline-block;width: 15%;">'+parseInt(response.data.amount).toLocaleString()+'</div>'+
                                 '<div style="display: inline-block;width: 15%;">-</div>'+
                                 '<div style="display: inline-block;width: 15%;">'+response.data.vat +'%</div>'+
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
                    response.data.termsAndConditionsDetail[i].termsAndConditionsId +'. '+response.data.termsAndConditionsDetail[i].termsAndConditionsDetail
                    '</div>';
                }

            }else {
				
			}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           
        }
    });


});
$( "#rejectbtn" ).click(function() {
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
            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

  });

  $('#slctapprve').on('change', function() {
    if(this.value == '1'){
        document.getElementById("cardpay").style.display ="none";
        document.getElementById("divPymntType").style.removeProperty('display');
        document.getElementById("divPymntType").innerHTML= '<p style="font-weight:bold;">'+document.getElementById("branchAddress").innerText+ '<p/><p style="display:inline-block;padding-right:5px;">Amount: </p><p style="font-weight:bold;display:inline-block;"> '+document.getElementById("totalAmount").innerText+' </p>';
       
    }
    if(this.value == '2'){
        document.getElementById("cardpay").style.display ="none";
        document.getElementById("divPymntType").style.removeProperty('display');
        document.getElementById("divPymntType").innerHTML='<p style="display:inline-block;padding-right:5px;">Pay To the Order of:</p><p style="font-weight:bold;display:inline-block;">  Sai Kitchen & Wardrobe </p>'+ '<p style="height:0px;"></p><p style="display:inline-block;padding-right:5px;">Amount: </p><p style="font-weight:bold;display:inline-block;"> '+document.getElementById("totalAmount").innerText+' </p>';
    }
    if(this.value == '3'){
        document.getElementById("spamount").innerHTML= '<p style="padding-top:5px;display:inline-block;padding-right:5px;">Amount: </p><p style="font-weight:bold;display:inline-block;"> '+document.getElementById("totalAmount").innerText+' </p>'
        document.getElementById("divPymntType").style.display ="none";
        document.getElementById("cardpay").style.removeProperty('display');
    }
  });


  ///begin strip script
  jQuery(document).ready(function() {
    const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
    inquiryId = urlParams.get('inquiryId')
    document.getElementById("inquiryId").value = inquiryId;
    $.ajax({
        type: "post",
        url:  baseURL +'/Quotation/stripe?inquiryId=' + inquiryId,
        success: function(response) {
          secret = response.data;
            console.log(response.data);
      },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           
        }
    });
  
  
  });
  // Disable the button until we have Stripe set up on the page
  //document.querySelector("button").disabled = true;
  jQuery(document).ready( function () {
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
      payWithCard(stripe, card, secret);
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

          showError(result.error.message);
          $('#msg').modal('show');
        } else {
          // The payment succeeded!
              orderComplete(result.paymentIntent.id);
              var apprvObj={
                inquiryId:document.getElementById("inquiryId").value,
                FeedBackReactionId:document.getElementById("aemoji").value,
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
                      $('#msg').modal('show');
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#msg').modal('show');
                  }
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
    document.querySelector(".result-message").classList.remove("hidden");
    //document.querySelector("button").disabled = true;
  };
  
  // Show the customer the error from Stripe if their card fails to charge
  var showError = function(errorMsgText) {
   // loading(false);
   document.querySelector(".result-message").classList.add("hidden");
    var errorMsg = document.querySelector("#card-error");
    errorMsg.textContent = errorMsgText;
  //  setTimeout(function() {
   //   errorMsg.textContent = "";
  //  }, 4000);
  };
  