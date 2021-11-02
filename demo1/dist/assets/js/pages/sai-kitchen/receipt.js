



import {
    baseURL
  } from './constant.js'
  
  
  let paymentId;
  
  // Class Initialization
  jQuery(document).ready(function() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      paymentId = urlParams.get('paymentId')
  
   //   document.getElementById("inquiryId").value = inquiryId;
      $.ajax({
          type: "post",
          url: baseURL + '/Payment/GetPaymentDetails?paymentId=' + paymentId,
          success: function(response) {
           
              console.log(response);
              if (response.isError == false) {
                
                  document.getElementById("inquiryCode").innerText = response.data.inquiryCode;
                  document.getElementById("amount").innerText = response.data.amount;
                  document.getElementById("customerName").innerText = response.data.customerName;
                  document.getElementById("paymentDate").innerText = response.data.paymentDate;
                  document.getElementById("proposalReferenceNumber").innerText = response.data.proposalReferenceNumber;
  
                   document.getElementById("transactionNumber").innerText = response.data.transactionNumber;
                   document.getElementById("paymentMethod").innerText = response.data.paymentMethod;
                   
                   document.getElementById("paymentDescreption").innerText = response.data.paymentDescreption;
                   document.getElementById("couponCode").innerText = response.data.couponCode;
                   let ss = new Array();
                   for (let i = 0; i < response.data.termsAndConditionsDetail.length; i++) {
                       
                     ss += '<span style="width: 100px;" >'+response.data.termsAndConditionsDetail[i].termsAndConditionsDetail+'</span></br>';
                        
                   // var mm  = ss.termsAndConditionsDetail;
                   }
                   document.getElementById("termsAndConditionsDetail").innerHTML = ss;
                
                 
                //   document.getElementById("buildingAddress").innerText = response.data.buildingAddress;
                //   document.getElementById("customerEmail").innerText = response.data.customerEmail;
                //   document.getElementById("customerContact").innerText = response.data.customerContact;
                
      
  
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
  

      $( "#savePdfbtn" ).click(function() {
    
     //   document.getElementById("inercontainer").classList.remove("padd15");
     //   document.getElementById("innerdata").classList.remove("with");
        //document.getElementById("divprint").style.paddingTop ='400px';
        //document.getElementById("footer").style.paddingTop ='400px';
        window.print();
     //   document.getElementById("inercontainer").classList.add("padd15");
     //   document.getElementById("innerdata").classList.add("with");
        //document.getElementById("divprint").style.removeProperty('padding-top');
       // document.getElementById("footer").style.removeProperty('padding-top');
        //alert(document.getElementById("inercontainer").style.padding);
      });

      
  
  });
  
  
  
  
  
  
  
    
    
  