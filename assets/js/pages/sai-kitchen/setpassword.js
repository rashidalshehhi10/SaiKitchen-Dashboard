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
		var form = KTUtil.getById('kt_login_set_password_form');
		var formSubmitUrl = KTUtil.attr(form, 'action');
		var formSubmitButton = KTUtil.getById('kt_login_set_password_form_submit_button');

		if (!form) {
			return;
		}

		FormValidation
			.formValidation(
				form, {
					fields: {
						password: {
							validators: {
								notEmpty: {
									message: 'Password is required'
								}

							}
						},
						confirmpassword: {
							validators: {
								notEmpty: {
									message: 'Confirm Password is required'
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
				
			var	password=  document.getElementById('password').value;
			var	confirmPassword=document.getElementById('confirmpassword').value;
			if(password!==confirmPassword){
				
							   // Release button
							   KTUtil.btnRelease(formSubmitButton);
							   Swal.fire({
								text: "Password & Confirm Password doesnt match",
								icon: "error",
								buttonsStyling: false,
								confirmButtonText: "Ok, got it!",
								customClass: {
									confirmButton: "btn font-weight-bold btn-light-primary"
								}
							}).then(function() {
								KTUtil.scrollTop();
							});
				return false;
			}

				const data = JSON.stringify({
					userId:  userId,
					userPassword:document.getElementById('password').value
				  });
				  $.ajax({
					  type: "post",
					  url: baseURL+'/User/SetNewPassword',
					  headers: {
                        'Access-Control-Allow-Origin': '*',
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
					  localStorage.setItem('user', JSON.stringify(response));
						  window.location.replace("home.html");
				  
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
	if (localStorage.getItem("user") !== null) {
		window.location.replace("home.html");
	}
	const queryString = window.location.search;
	console.log(queryString);
	const urlParams = new URLSearchParams(queryString);
	 userId = urlParams.get('userId')
	console.log(userId);
	if (userId == null) {
		window.location.replace("index.html");
	}

}); // Class Initial