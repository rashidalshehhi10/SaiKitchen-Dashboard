

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
var paymentId;
// Class Initialization
jQuery(document).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  paymentId = urlParams.get('paymentId')
  //document.getElementById("inquiryId").value = inquiryId;
  $.ajax({
     type: "post",
     url: baseURL + '/Payment/GetPaymentDetailsByPaymentId?paymentId=' + paymentId,
     success: function(response) {
           console.log(response);
           if (response.isError == false) {
            inquiryId = response.data.inquiryId;
              document.getElementById("spanamount").innerHTML = response.data.paymentAmount;

           } else {

        }
     },
     error: function(XMLHttpRequest, textStatus, errorThrown) {
        
     }
  });


});

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

  });
 



 
  
    $("#approvebtn" ).click(function() {
          document.getElementById("load").style.removeProperty('display');
          $.ajax({
            type: "post",
            url:  baseURL +'/Quotation/stripeByPaymentId?paymentId=' + paymentId,
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
   
        } else {
          // The payment succeeded!
          //add payment
          var apprvObj={
            "paymentId": paymentId,
            "paymentIntentToken":result.paymentIntent.id,
            "clientSecret":result.paymentIntent.client_secret,
            "PaymentMethod":result.paymentIntent.payment_method,
            "SelectedPaymentMode":4,
          }
          const data = JSON.stringify(apprvObj);
                $.ajax({
                  type: "post",
                  url: baseURL + '/Payment/AddPaymentByPaymentId' ,
                  data:data,
                  success: function(response) {
                        console.log(response);
                        if (response.isError == false) {
           
                        } else {
            
                    }
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                    
                  }
              });
              document.getElementById("load").style.display = 'none';
              orderComplete(result.paymentIntent.id);
              

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
      $('#msg').modal('show');
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
  

  