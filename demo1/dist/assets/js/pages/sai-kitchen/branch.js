"use strict";

import {
	baseURL
} from './constant.js'

import {
	user
} from './base.js'
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);
var editor; // use a global for the submit and return data rendering in the examples

var KTDatatablesExtensionsResponsive = function () {

	var initTable1 = function () {
		var table = $('#kt_datatable');

		// begin first table
		table.DataTable({
			responsive: true,
			ajax: baseURL + '/Branch/GetBranches',
			columns: [{
					data: null,
					render: function (data, type, row) {
						console.log(data);
						return data.branchId;
					}
				},
				{
					data: null,
					render: function (data, type, row) {

						return data.branchName;
					}
				},
				{
					data: null,
					render: function (data, type, row) {

						return data.branchContact;
					}
				},
				{
					data: null,
					render: function (data, type, row) {

						return data.branchAddress;
					}
				},
				{
					data: null,
					render: function (data, type, row) {

						var status = {
							1: {
								'title': 'Head office',
								'state': 'success'
							},
							2: {
								'title': 'Showroom',
								'state': 'primary'
							},
							3: {
								'title': 'Factory',
								'state': 'danger'
							},
						};
						if (typeof status[data.branchTypeId] === 'undefined') {
							return data;
						}
						return '<span class="label label-' + status[data.branchTypeId].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data.branchTypeId].state + '">' + status[data.branchTypeId].title + '</span>';
						// return parseInt(data.branchTypeId);
					}
				},
				{
					data: null
				}
			],

			// select: true,
			columnDefs: [{
					width: '180px',
					targets: 0
				},
				{
					targets: 5,
					title: 'Actions',
					orderable: false,
					render: function (data, type, full, meta) {

						return '\
						\
						<button type="button" onclick="myFunction(\'' + baseURL + '\',\'' + data.branchId + '\');" data-target="#editBranchRole" data-toggle="modal" class="btn btn-sm btn-clean btn-icon" title="Edit details">\
						<i class="la la-edit"></i>\
					</button>\
					<button type="button"  onclick="deleteBranchById(\'' + baseURL + '\',\'' + data.branchId + '\');"  class="btn btn-sm btn-clean btn-icon" title="Delete">\
								<i class="la la-trash"></i>\
							</button>\
						';
					},
				},

				{
					width: '180px',
					targets: 4,
					render: function (data, type, full, meta) {
						var status = {
							1: {
								'title': 'Head office',
								'state': 'success'
							},
							2: {
								'title': 'Showroom',
								'state': 'primary'
							},
							3: {
								'title': 'Factory',
								'state': 'danger'
							},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span>';
					}
				}
			]
		});
	};



	var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

	var _handleFormAddBranch = function () {
		var form = KTUtil.getById('kt_login_add_branch');
		var formSubmitUrl = KTUtil.attr(form, 'action');
		var formSubmitButton = KTUtil.getById('kt_login_add_branch_role_submit_button');

		if (!form) {
			return;
		}

		FormValidation
			.formValidation(
				form, {
					fields: {
						name: {
							validators: {
								notEmpty: {
									message: 'Name is required'
								}
							}
						},
						contact: {
							validators: {
								notEmpty: {
									message: 'Contact is required'
								}
							}
						},
						address: {
							validators: {
								notEmpty: {
									message: 'Address is required'
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
			.on('core.form.valid', function () {
				// Show loading state on button
				KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");
				// Form Validation & Ajax Submission: https://formvalidation.io/guide/examples/using-ajax-to-submit-the-form
				var branch = {
					branchName: "string",
					branchAddress: "string",
					branchContact: "string",
					branchTypeId: 0,
					isActive: true,
					isDeleted: false
				};
				// var permissionRoles = {
				// 	permissionId: 0,
				// 	isActive: true,
				// 	isDeleted: false
				// };
				// var roleHead = {
				// 	headRoleId: 0,
				// 	isActive: true,
				// 	isDeleted: false
				// };
				branch.branchName = document.getElementById('branchName').value;
				branch.branchContact = document.getElementById('branchContact').value;
				branch.branchAddress = document.getElementById('branchAddress').value;
				branch.branchTypeId = $('#kt_select2_1').val();
				// branchRole.permissionRoles.push({
				// 	permissionId: 1,
				// 	isActive: true,
				// 	isDeleted: false
				// });
				// branchRole.roleHeads.push({
				// 	headRoleId: 1,
				// 	isActive: true,
				// 	isDeleted: false
				// });

				// console.log(branchRole);
				const data = JSON.stringify(branch);
				console.log(data);
				$.ajax({
					type: "Post",
					url: baseURL + '/Branch/AddBranch',
					beforeSend: function (xhr) {
						xhr.setRequestHeader('userId', user.data.userId);
						xhr.setRequestHeader('Accept', 'application/json');
						xhr.setRequestHeader('userToken', user.data.userToken);
						xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
						xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
						xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
						xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
					},
					
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
						KTUtil.btnRelease(formSubmitButton);
						console.log(response);
						// window.location.replace("home.html");
						if (response.isError == false) {
							// sessionStorage.setItem('user', JSON.stringify(response));
							window.location.replace("branch.html");

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
	return {
		//main function to initiate the module
		init: function () {
			initTable1();
			_handleFormAddBranch();
		}
	};
}();

let permissions;
let branchPermission;
jQuery(document).ready(function() {

        console.log(user);
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 2) {
                branchPermission = permissions[i].permissionLevelId;
                console.log(branchPermission);
              
            }
        }
        if(branchPermission==null){
        window.location.replace("index.html");
        }
	
	KTDatatablesExtensionsResponsive.init();


	console.log(baseURL + '/Branch/GetBranchTypes');
	console.log(user.data.userId);

	$.ajax({
		type: "post",
		url: baseURL + '/Branch/GetBranchTypes',
		crossDomain: true,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('userId', user.data.userId);
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.setRequestHeader('userToken', user.data.userToken);
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
			xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
			xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
		},
		
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

				console.log(response.data[0].permissionName);
				const branchTypeList = document.getElementById('kt_select2_1');
				var branchTypeListHTML = new Array();

				for (var i = 0; i < response.data.length; i++) {
					branchTypeListHTML.push(`
					<option value="` + response.data[i].branchTypeId + `">` + response.data[i].branchTypeName + `</option>`);
				}

				branchTypeList.innerHTML = branchTypeListHTML.join('');

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