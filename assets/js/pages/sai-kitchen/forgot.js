"use strict";
import {
	baseURL
} from './constant.js'
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
// Class Definition
var KTLogin = function () {
	var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';


	var _handleFormSetPassword = function () {
		var form = KTUtil.getById('kt_login_forgot_form');
		var formSubmitUrl = KTUtil.attr(form, 'action');
		var formSubmitButton = KTUtil.getById('kt_login_forgot_form_submit_button');

		if (!form) {
			return;
		}

		FormValidation
			.formValidation(
				form, {
					fields: {
						email: {
							validators: {
								notEmpty: {
									message: 'Password is required'
								},
								emailAddress: {
									message: 'Invalid email address'
								}

							}
						}
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
			.on('core.form.valid', function () {
				// Show loading state on button
				KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");
				
			var	email=  document.getElementById('email').value;
				

				const data = JSON.stringify({
					userEmail:  document.getElementById('email').value
				 });
				  $.ajax({
					  type: "post",
					  url: baseURL+'/User/ForgotPasswordUser',
					  headers: {
						  'Content-Type':'application/json'
					  },
					  data: data,
					  success: function(response) {
							  // Release button
							  KTUtil.btnRelease(formSubmitButton);
				  
						  console.log(response);
				  
						  // window.location.replace("home.html");
						  // var objResponse = jQuery.parseJSON( response );
				  if(response.isError==false){
					
					Swal.fire({
						text: "Kindly check your email",
						icon: "success",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn font-weight-bold btn-light-primary"
						}
					}).then((result) => {
						/* Read more about isConfirmed, isDenied below */
						if (result.isConfirmed) {
					
							window.location.replace("index.html");
						} 
					  })

				  
				  }else{
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
				  
					//    alert(errorThrown);
					
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
			.on('core.form.invalid', function () {
				Swal.fire({
					text: "Sorry, looks like there are some errors detected, please try again.",
					icon: "error",
					buttonsStyling: false,
					confirmButtonText: "Ok, got it!",
					customClass: {
						confirmButton: "btn font-weight-bold btn-light-primary"
					}
				}).then(function () {
					KTUtil.scrollTop();
				});
			});
	}


	// Public Functions
	return {
		init: function () {
			_handleFormSetPassword();
		}
	};
}();
var userId;
// Class Initialization
jQuery(document).ready(function () {
	KTLogin.init();
	if (sessionStorage.getItem("user") !== null) {
		window.location.replace("home.html");
	}

}); // Class Initial