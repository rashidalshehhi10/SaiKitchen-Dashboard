"use strict";

import {
	baseURL
} from './constant.js'


// List of all countries in a simple list / array.
// Sorted alphabetical by country name (special characters on bottom)
const countryList = ["United Arab Emirates", "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State Of", "Bonaire, Sint Eustatius And Saba", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension And Tristan Da Cunha", "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin (french Part)", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic Of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];


let user;
let datatable;
let measurementFeesAmount;
let afterdiscountmeasurementFeesAmount;
let promoId;
let promoDiscount;
let isMeasurementPromo;
let vatvalue;
// Class definition
var KTWizard1 = function () {
	// Base elements
	var _wizardEl;
	var _formEl;
	var _wizardObj;
	var _validations = [];

	// Private functions
	var _initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		_validations.push(FormValidation.formValidation(
			_formEl, {
				fields: {
					customerName: {
						validators: {
							notEmpty: {
								message: 'Name is required'
							}
						}
					},
					customerContact: {
						validators: {
							notEmpty: {
								message: 'Contact is required'
							},
							regexp: {
								regexp: /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{11}$/,
								message: 'Invalid'
							}
						}
					},

					customerAddress: {
						validators: {
							notEmpty: {
								message: 'Address is required'
							}
						}
					},
					customerNationalId: {
						validators: {
							notEmpty: {
								message: 'Required'
							}
						}
					},
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));

		// Step 2
		_validations.push(FormValidation.formValidation(
			_formEl, {
				fields: {
					measurement_schedule_date: {
						validators: {
							notEmpty: {
								message: 'Schedule Date is required'
							}
						}
					},
					scopeTag: {
						validators: {
							notEmpty: {
								message: 'Work Scope is required'
							}
						}
					},
					width: {
						validators: {
							notEmpty: {
								message: 'Package width is required'
							},
							digits: {
								message: 'The value added is not valid'
							}
						}
					},
					height: {
						validators: {
							notEmpty: {
								message: 'Package height is required'
							},
							digits: {
								message: 'The value added is not valid'
							}
						}
					},
					packagelength: {
						validators: {
							notEmpty: {
								message: 'Package length is required'
							},
							digits: {
								message: 'The value added is not valid'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));

		// Step 3
		_validations.push(FormValidation.formValidation(
			_formEl, {
				fields: {
					txtfloor: {
						validators: {
							notEmpty: {
								message: 'Floor is required'
							}
						}
					},
					packaging: {
						validators: {
							notEmpty: {
								message: 'Packaging type is required'
							}
						}
					},
					preferreddelivery: {
						validators: {
							notEmpty: {
								message: 'Preferred delivery window is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));

		// Step 4
		_validations.push(FormValidation.formValidation(
			_formEl, {
				fields: {
					locpostcode: {
						validators: {
							notEmpty: {
								message: 'Postcode is required'
							}
						}
					},
					loccity: {
						validators: {
							notEmpty: {
								message: 'City is required'
							}
						}
					},
					locstate: {
						validators: {
							notEmpty: {
								message: 'State is required'
							}
						}
					},
					loccountry: {
						validators: {
							notEmpty: {
								message: 'Country is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));
	}

	var _initWizard = function () {
		// Initialize form wizard
		_wizardObj = new KTWizard(_wizardEl, {
			startStep: 1, // initial active step number
			clickableSteps: false // allow step clicking
		});

		// Validation before going to next page
		_wizardObj.on('change', function (wizard) {
			if (wizard.getStep() > wizard.getNewStep()) {
				return; // Skip if stepped back
			}

			// Validate form before change wizard step
			var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step

			if (validator) {
				validator.validate().then(function (status) {
					if (status == 'Valid') {
						wizard.goTo(wizard.getNewStep());

						KTUtil.scrollTop();
					} else {
						Swal.fire({
							text: "Sorry, looks like there are some errors detected, please try again.",
							icon: "error",
							buttonsStyling: false,
							confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn font-weight-bold btn-light"
							}
						}).then(function () {
							KTUtil.scrollTop();
						});
					}
				});
			}

			return false; // Do not change wizard step, further action will be handled by he validator
		});

		// Change event
		_wizardObj.on('changed', function (wizard) {
			KTUtil.scrollTop();
		});

		// Submit event
		_wizardObj.on('submit', function (wizard) {

			var totalAmount=0;
			if( $('input[name="clientMeasurement"]:checked').val()=="false"){
			 totalAmount=(afterdiscountmeasurementFeesAmount/1)+((afterdiscountmeasurementFeesAmount/100)*vatvalue);
			}

			Swal.fire({
				text: "Make sure you receive the measurement Fees AED "+totalAmount+"(inclusive VAT) by cash before proceeding to next step",
				icon: "success",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "Yes, Recieved!",
				cancelButtonText: "No, Not Yet",
				customClass: {
					confirmButton: "btn font-weight-bold btn-primary",
					cancelButton: "btn font-weight-bold btn-default"
				}
			}).then(function (result) {
				if (result.value) {
					// _formEl.submit(); // Submit form
					var inquiry = {
						inquiryName: "",
						inquiryDescription: document.getElementById('inquirydescription').value,
						inquiryStatusId: 1,
						isMeasurementProvidedByCustomer: $('input[name="clientMeasurement"]:checked').val(),
						isDesignProvidedByCustomer: $('input[name="clientDesign"]:checked').val(),
						measurementFees:'',
						customer: {
							customerName: "",
							customerEmail: "",
							customerContact: "",
							customerAddress: "",
							customerCity: "",
							customerCountry: "",
							customerNationality: "",
							customerNationalId: "",
							contactStatusId: 0,
							wayofContactId: 0,
							branchId: user.data.userRoles[0].branchId,
							userId: user.data.userId,
							isActive: true,
							isEscalationRequested: false,
							isDeleted: false,
							customerWhatsapp:"",
						},
						branchId: user.data.userRoles[0].branchId,
						promoId: promoId,
						promoDiscount: promoDiscount,
						isMeasurementPromo: isMeasurementPromo,
						isEscalationRequested: false,
						addedBy:user.data.userId,
						isActive: true,
						isDeleted: false,
						building: {
							buildingAddress: document.getElementById('buildingAddress').value,
							buildingMakaniMap:document.getElementById('BuildingMakaniMap').value,
							buildingTypeOfUnit: $('input[name="typeofunit"]:checked').val(),
							buildingCondition: $('input[name="condition"]:checked').val(),
							buildingFloor: document.getElementById('floor').value,
							buildingReconstruction: $('input[name="construction"]:checked').val(),
							isOccupied: $('input[name="occupied"]:checked').val(),
							isActive: true,
							isDeleted: false,
						},
						inquiryWorkscopes: new Array(),
						payments:new Array(),
					};

					inquiry.customer.customerId = document.getElementById("customerId").innerHTML;
					inquiry.customer.customerName = document.getElementById('customerName').value;
					inquiry.customer.customerEmail = document.getElementById('customerEmail').value;
					inquiry.customer.customerContact = document.getElementById('customerContact').value;
					inquiry.customer.customerAddress = document.getElementById('customerAddress').value;
					inquiry.customer.customerNationalId = document.getElementById('customerNationalId').value;
					inquiry.customer.contactStatusId = $('#kt_contact_status').val();
					inquiry.customer.wayofContactId = $('#kt_wayofcontact').val();
					inquiry.customer.customerCountry = $('#kt_country_of_Resdience').val();
					inquiry.customer.customerCity = $('#kt_city_of_Resdience').val();
					inquiry.customer.customerNationality = $('#kt_nationality').val();
					inquiry.customer.customerWhatsapp = document.getElementById('whatsapp').value;
					var workscope = document.getElementsByClassName("tagify__tag tagify__tag tagify__tag--primary");
					workscope.forEach(element => {
						try {
							inquiry.inquiryWorkscopes.push({
								workscopeId: element.attributes.workScopeId.value,
								statusId: 1,
								measurementAssignedTo:$('#kt_assignto').val(),
								inquiryStatusId:1,
								measurementScheduleDate: document.getElementById('measurement_schedule_date').value,
								isActive: true,
								isDeleted: false,

							});
						} catch (error) {

						}
					});
					if( $('input[name="clientMeasurement"]:checked').val()=="false"){
					inquiry.payments.push({
						paymentName: "Measurement",
						paymentDetail: "",
						paymentAmount: afterdiscountmeasurementFeesAmount,
						paymentTypeId: 1,
						paymentStatusId: 3,
						paymentModeId: 1,
						isActive: true,
						isDeleted: false,
					})
				}else{
					inquiry.payments.push({
						paymentName: "Measurement",
						paymentDetail: "Measurement Provided by client",
						paymentAmount: 0,
						paymentTypeId: 1,
						paymentStatusId: 3,
						paymentModeId: 1,
						isActive: true,
						isDeleted: false,
					})
				}

					console.log(inquiry);

					const data = JSON.stringify(inquiry);
					console.log(data);
					$.ajax({
						type: "Post",
						url: baseURL + '/Inquiry/AddInquiry',
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
						success: function (response) {
							// Release button
							console.log(response);
							// window.location.replace("home.html");
							if (response.isError == false) {
								// sessionStorage.setItem('user', JSON.stringify(response));
								window.location.replace("inquiry.html");
	
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
							// Release button
	
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

				} else if (result.dismiss === 'cancel') {
					Swal.fire({
						text: "Inquiry has not been submitted!.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn font-weight-bold btn-primary",
						}
					});
				}
			});
		});
	}

	return {
		// public functions
		init: function () {
			_wizardEl = KTUtil.getById('kt_wizard');
			_formEl = KTUtil.getById('kt_form');

			_initValidation();
			_initWizard();
		}
	};
}();


let permissions;
let inquiryPermission;

jQuery(document).ready(function () {
	KTWizard1.init();



	var login = localStorage.getItem("user");
	if (login !== null) {
		user = JSON.parse(login);
		console.log(user);
		permissions = user.data.userRoles[0].branchRole.permissionRoles;
		console.log(permissions);
		for (var i = 0; i < permissions.length; i++) {
			if (permissions[i].permissionId == 6) {
				inquiryPermission = permissions[i].permissionLevelId;
				console.log(inquiryPermission);
			}
		}

        if(inquiryPermission==null){
            window.location.replace("index.html");
            }
		// if (inquiryPermission >= 2) {
		// 	document.getElementById('btnNewCustomer').innerHTML += `	<!--begin::Button-->
		// 	<button type="button" onclick="customFormReset();" data-target="#addCustomer" data-toggle="modal"
		// 		class="btn btn-primary font-weight-bolder">
		// 		<span class="svg-icon svg-icon-md">
		// 			<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Flatten.svg-->
		// 			<svg xmlns="http://www.w3.org/2000/svg"
		// 				xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
		// 				height="24px" viewBox="0 0 24 24" version="1.1">
		// 				<g stroke="none" stroke-width="1" fill="none"
		// 					fill-rule="evenodd">
		// 					<rect x="0" y="0" width="24" height="24" />
		// 					<circle fill="#000000" cx="9" cy="15" r="6" />
		// 					<path
		// 						d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z"
		// 						fill="#000000" opacity="0.3" />
		// 				</g>
		// 			</svg>
		// 			<!--end::Svg Icon-->
		// 		</span>New Customer</button>
		// 	<!--end::Button-->`;
		// }
	}



	$('#customerContact').keyup(function () {
		var reg = /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{11}$/;
		if (reg.test($(this).val())) {

			$.ajax({
				type: "Post",
				url: baseURL + '/Customer/GetCustomerbyContact?customerContact=' + $(this).val(),
			
				headers: {
					'Content-Type': 'application/json',
					'userId': user.data.userId,
					'userToken': user.data.userToken,
					'userRoleId': user.data.userRoles[0].userRoleId,
					'branchId': user.data.userRoles[0].branchId,
					'branchRoleId': user.data.userRoles[0].branchRoleId,
					'Access-Control-Allow-Origin': '*',
				},
				// data: data,
				success: function (response) {
					console.log(response);
					// window.location.replace("home.html");
					if (response.isError == false) {
						// sessionStorage.setItem('user', JSON.stringify(response));
						try {

							document.getElementById('customerName').value = response.data.customerName;
							document.getElementById('customerEmail').value = response.data.customerEmail;
							document.getElementById('customerContact').value = response.data.customerContact;
							document.getElementById('customerAddress').value = response.data.customerAddress;
							document.getElementById('customerNationalId').value = response.data.customerNationalId;
							$('#kt_contact_status').val(response.data.contactStatusId).change();
							$('#kt_wayofcontact').val(response.data.wayofContactId).change();
							$('#kt_country_of_Resdience').val(response.data.customerCountry).change();
							$('#kt_city_of_Resdience').val(response.data.customerCity).change();
							document.getElementById("customerCity").innerHTML = response.data.customerCity;
							$('#kt_nationality').val(response.data.customerNationality).change();
							document.getElementById('whatsapp').value = response.data.customerWhatsapp;
						} catch (error) {
							document.getElementById('customerName').value = "";
							document.getElementById('customerEmail').value = "";
							document.getElementById('customerAddress').value = "";
							document.getElementById('customerNationalId').value = "";
						}

						//  document.getElementById('customerEmail').value;
						// 	customer.customerEmail = document.getElementById('customerEmail').value;
						// 	customer.customerContact = document.getElementById('customerContact').value;
						// 	customer.customerAddress = document.getElementById('customerAddress').value;
						// 	customer.customerNationalId = document.getElementById('customerNationalId').value;
						// 	customer.contactStatusId = $('#kt_contact_status').val();
						// 	customer.wayofContactId = $('#kt_wayofcontact').val();
						// 	customer.customerCountry = $('#kt_country_of_Resdience').val();
						// 	customer.customerCity = $('#kt_city_of_Resdience').val();
						// 	customer.customerNationality = $('#kt_nationality').val();

						// window.location.replace("branchrole.html");

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
					}).then(function () {
						KTUtil.scrollTop();
					});
				}
			});

		}
	});

	$('#promoCode').keyup(function () {

			$.ajax({
				type: "Post",
				url: baseURL + '/Promo/GetPromoByCode?promoCode=' + $(this).val(),
			
				headers: {
					'Content-Type': 'application/json',
					'userId': user.data.userId,
					'userToken': user.data.userToken,
					'userRoleId': user.data.userRoles[0].userRoleId,
					'branchId': user.data.userRoles[0].branchId,
					'branchRoleId': user.data.userRoles[0].branchRoleId,
					'Access-Control-Allow-Origin': '*',
				},
				// data: data,
				success: function (response) {
					console.log(response);
					// window.location.replace("home.html");
					if (response.isError == false) {
						// sessionStorage.setItem('user', JSON.stringify(response));
						try {
							promoId=response.data.promoId;
							afterdiscountmeasurementFeesAmount=measurementFeesAmount-(measurementFeesAmount/100)*response.data.promoDiscount;
							promoDiscount=response.data.promoDiscount;
							isMeasurementPromo=response.data.isMeasurementPromo;
							document.getElementById('paymentFee').innerHTML='AED&#160;'+afterdiscountmeasurementFeesAmount;
							
					if( $('input[name="clientMeasurement"]:checked').val()=="false"){
document.getElementById('measurementFee').innerHTML='AED&#160;'+afterdiscountmeasurementFeesAmount;
					}
						} catch (error) {
							promoId=null;
							promoDiscount=0;
							isMeasurementPromo=false;
							if( $('input[name="clientMeasurement"]:checked').val()=="false"){
								document.getElementById('measurementFee').innerHTML='AED&#160;'+measurementFeesAmount;
							}
							document.getElementById('paymentFee').innerHTML='AED&#160;'+measurementFeesAmount;
						}

						//  document.getElementById('customerEmail').value;
						// 	customer.customerEmail = document.getElementById('customerEmail').value;
						// 	customer.customerContact = document.getElementById('customerContact').value;
						// 	customer.customerAddress = document.getElementById('customerAddress').value;
						// 	customer.customerNationalId = document.getElementById('customerNationalId').value;
						// 	customer.contactStatusId = $('#kt_contact_status').val();
						// 	customer.wayofContactId = $('#kt_wayofcontact').val();
						// 	customer.customerCountry = $('#kt_country_of_Resdience').val();
						// 	customer.customerCity = $('#kt_city_of_Resdience').val();
						// 	customer.customerNationality = $('#kt_nationality').val();

						// window.location.replace("branchrole.html");

					} else {
						promoId=null;
						promoDiscount=0;
						isMeasurementPromo=false;
						if( $('input[name="clientMeasurement"]:checked').val()=="false"){
							document.getElementById('measurementFee').innerHTML='AED&#160;'+measurementFeesAmount;
						}
						document.getElementById('paymentFee').innerHTML='AED&#160;'+measurementFeesAmount;
						// Swal.fire({
						// 	text: response.errorMessage,
						// 	icon: "error",
						// 	buttonsStyling: false,
						// 	confirmButtonText: "Ok, got it!",
						// 	customClass: {
						// 		confirmButton: "btn font-weight-bold btn-light-primary"
						// 	}
						// }).then(function () {
						// 	KTUtil.scrollTop();
						// });
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
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
					}).then(function () {
						KTUtil.scrollTop();
					});
				}
			});
	});
	const countryOfResidenceList = document.getElementById('kt_country_of_Resdience');
	const nationalityList = document.getElementById('kt_nationality');
	var countryListHTML = new Array();

	for (var i = 0; i < countryList.length; i++) {
		countryListHTML.push(`
		<option value="` + countryList[i] + `">` + countryList[i] + `</option>`);
	}

	countryOfResidenceList.innerHTML = countryListHTML.join('');
	nationalityList.innerHTML = countryListHTML.join('');



	GetCity(countryList[0]);
	console.log(baseURL + '/Customer/GetContactStatus');

	$.ajax({
		type: "get",
		url: baseURL + '/Customer/GetContactStatus',
		
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

				console.log(response.data[0].contactStatusName);
				const contactStatusList = document.getElementById('kt_contact_status');
				var contactStatusListHTML = new Array();

				for (var i = 0; i < response.data.length; i++) {
					contactStatusListHTML.push(`
					<option value="` + response.data[i].contactStatusId + `">` + response.data[i].contactStatusName + `</option>`);
				}

				contactStatusList.innerHTML = contactStatusListHTML.join('');
				const searchContactStatusList = document.getElementById('kt_datatable_contact_status');
				// searchContactStatusList.innerHTML = contactStatusListHTML.join('');

				// $('#kt_datatable_contact_status').on('change', function () {
				// 	datatable.search($(this).val().toLowerCase(), 'ContactStatus');
				// });


				// $('#kt_datatable_search_status').selectpicker();
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
		url: baseURL + '/Customer/GetWayOfContacts',
		
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

				console.log(response.data[0].contactStatusName);
				const contactWayList = document.getElementById('kt_wayofcontact');
				var contactWayListHTML = new Array();

				for (var i = 0; i < response.data.length; i++) {
					contactWayListHTML.push(`
					<option value="` + response.data[i].wayOfContactId + `">` + response.data[i].wayOfContactName + `</option>`);
				}

				contactWayList.innerHTML = contactWayListHTML.join('');

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
		type: "post",
		url: baseURL + '/User/GetMeasurementUsers?branchId='+ user.data.userRoles[0].branch.branchId,
		
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

				console.log(response.data[0].userName);
				const assigntoList = document.getElementById('kt_assignto');
				var assignToListHTML = new Array();

				for (var i = 0; i < response.data.length; i++) {
					assignToListHTML.push(`
					<option value="` + response.data[i].userId + `">` + response.data[i].userName + `</option>`);
				}

				assigntoList.innerHTML = assignToListHTML.join('');

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


	$('#kt_country_of_Resdience').on('change', function () {
		// var countrylist = {
		// 	country: "string"
		// };
		var country = $('#kt_country_of_Resdience').val();

		// const data = JSON.stringify(countrylist);
		// console.log(data);
		GetCity(country);
	});


	// var addressPicker = new AddressPicker();

	// $('#customerAddress').typeahead(null, {
	// 	displayKey: 'description',
	// 	source: addressPicker.ttAdapter()
	//   });
	
	
	// var addressPickers = new AddressPicker();
	// $('#buildingAddress').typeahead(null, {
	// 	displayKey: 'description',
	// 	source: addressPickers.ttAdapter()
	//   });

	const input = document.getElementById("customerAddress");
	const input2 = document.getElementById("buildingAddress");
const options = {
  componentRestrictions: { country: "ae" },
  fields: ["address_components", "geometry", "icon", "name"],
  strictBounds: false,
  types: ["establishment"],
};
const autocomplete = new google.maps.places.Autocomplete(input, options);
const autocomplete2 = new google.maps.places.Autocomplete(input2, options);

});

function GetCity(country) {
	$.ajax({
		type: "Get",
		url: 'https://api.teleport.org/api/cities/?search=' + country,
		
		headers: {
			'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
		},
		// data: data,
		success: function (response) {
			console.log(response);
			const cityOfResidenceList = document.getElementById('kt_city_of_Resdience');
			var cityListHTML = new Array();
			var cities = response._embedded["city:search-results"];
			console.log(cities);
			for (var i = 0; i < cities.length; i++) {
				if (cities[i].matching_full_name.includes(country)) {
					cityListHTML.push(`
		<option value="` + cities[i].matching_full_name + `">` + cities[i].matching_full_name + `</option>`);
				}
			}

			cityOfResidenceList.innerHTML = cityListHTML.join('');

			if (document.getElementById("customerId").innerHTML != 0) {
				$('#kt_city_of_Resdience').val(document.getElementById("customerCity").innerHTML).change();
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {}
	});

	$.ajax({
		type: "get",
		url: baseURL + '/Fees/GetFeesById?feesId=1',
		
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
				measurementFeesAmount=response.data.feesAmount;
				afterdiscountmeasurementFeesAmount=response.data.feesAmount;
				document.getElementById('paymentFee').innerHTML='AED&#160;'+response.data.feesAmount;
			
				document.getElementById('measurementFee').innerHTML='AED&#160;'+response.data.feesAmount;
			
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
}
