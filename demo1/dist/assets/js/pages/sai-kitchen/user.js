"use strict";

// import {
// 	user
// } from './base.js';
import {
	baseURL
} from './constant.js'
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);
var editor; // use a global for the submit and return data rendering in the examples

let user;
var KTDatatablesExtensionsResponsive = function () {

	var initTable1 = function () {
		var table = $('#kt_datatable');

		// var url=baseURL+'/User/GetAllUserofOneBranch?branchId='+user.data.userRoles[0].branchId;
		var url = baseURL + '/User/GetAllUser';
		console.log(url);

		// begin first table
		table.DataTable({
			responsive: true,
			ajax: url,
			columns: [{
					data: null,
					render: function (data, type, row) {
						console.log(JSON.stringify(data));
						return data.userId;
					}
				},
				{
					data: null,
					render: function (data, type, row) {
						console.log(data);
						return data.userName;
					}
				},
				{
					data: null,
					render: function (data, type, row) {
						console.log(data);
						return data.userEmail;
					}
				},
				{
					data: null,
					render: function (data, type, row) {
						console.log(data);
						return data.userMobile;
					}
				},
				{
					data: null,
					render: function (data, type, row) {
						console.log(data);
						return data.lastSeen;
					}
				},
				{
					data: null,
					render: function (data, type, row) {
						console.log(data);
						return data.userRoles[0].branchRole.branchRoleName;
					}
				},
				{
					data: null,
					render: function (data, type, row) {
						console.log(data);
						return data.userRoles[0].branch.branchName;
					}
				},
				{
					data: null,
					render: function (data, type, row) {
						console.log(data);
						if(data.isNotificationEnabled)
						 return "Yes";
						else 
						 return "No";
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
					targets: 8,
					title: 'Actions',
					orderable: false,
					render: function (data, type, full, meta) {
						return '\
						\
							<a href="javascript:;" onclick="getUserById(\'' + baseURL + '\',\'' + data.userId + '\');" data-toggle="modal" data-target="#addUser"  class="btn btn-sm btn-clean btn-icon" title="Edit details">\
								<i class="la la-edit"></i>\
							</a>\
							<button type="button"  onclick="deleteUserById(\'' + baseURL + '\',\'' + data.userId + '\');" class="btn btn-sm btn-clean btn-icon" title="Delete">\
								<i class="la la-trash"></i>\
							</button>\
						';
					},
				},

				// {
				// 	width: '180px',
				// 	targets: 5,
				// 	render: function (data, type, full, meta) {
				// 		var status = {
				// 			1: {
				// 				'title': 'Head office',
				// 				'state': 'success'
				// 			},
				// 			2: {
				// 				'title': 'Showroom',
				// 				'state': 'primary'
				// 			},
				// 			3: {
				// 				'title': 'Factory',
				// 				'state': 'danger'
				// 			},
				// 		};
				// 		if (typeof status[data] === 'undefined') {
				// 			return data;
				// 		}
				// 		return '<span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
				// 			'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span>';
				// 	}
				// }
			]
		});
	};



	var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

	var _handleFormAddUser = function () {
		var form = KTUtil.getById('kt_add_user');
		var formSubmitUrl = KTUtil.attr(form, 'action');
		var formSubmitButton = KTUtil.getById('kt_add_user_submit_button');

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
						mobile: {
							validators: {
								notEmpty: {
									message: 'Mobile is required'
								}
							}
						},
						email: {
							validators: {
								notEmpty: {
									message: 'Email is required'
								},
								emailAddress: {
									message: 'Invalid email'
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
				
				var newuser = {
					userId:"string",
					userName: "string",
					userEmail: "string",
					userMobile: "string",
					isNotificationEnabled : false,
					userRoles: new Array()
				}
				var userRole = {
					branchId: 0,
					branchRoleId: 0,
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
				newuser.isNotificationEnabled = document.getElementById('IsNotificationEnabled').checked;
				newuser.userId = document.getElementById('userId').innerHTML;
				newuser.userName = document.getElementById('userName').value;
				newuser.userEmail = document.getElementById('Email').value;
				newuser.userMobile = document.getElementById('userMobile').value;
				userRole.branchId = $('#kt_select_branch').val();
				userRole.branchRoleId = $('#kt_select_branch_role').val();
				newuser.userRoles.push(userRole);
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
				const data = JSON.stringify(newuser);
				console.log(data);
				$.ajax({
					type: "Post",
					url: baseURL + '/User/RegisterUser',
					
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
							window.location.replace("user.html");

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
	return {
		//main function to initiate the module
		init: function () {
			initTable1();

			_handleFormAddUser();
		}
	};
}();

let permissions;
let userPermission;

jQuery(document).ready(function () {

	var login = localStorage.getItem("user");
	if (login !== null) {
		user = JSON.parse(login);
		console.log(user);
		permissions = user.data.userRoles[0].branchRole.permissionRoles;
		console.log(permissions);
		for (var i = 0; i < permissions.length; i++) {
			if (permissions[i].permissionId == 4) {
				userPermission = permissions[i].permissionLevelId;
				console.log(userPermission);
			}
		}
	}

    
    if(userPermission==null){
        window.location.replace("index.html");
        }
	KTDatatablesExtensionsResponsive.init();

	$.ajax({
		type: "get",
		url: baseURL + '/Branch/GetBranches',

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
				const branchList = document.getElementById('kt_select_branch');
				var branchTypeListHTML = new Array();

				for (var i = 0; i < response.data.length; i++) {
					branchTypeListHTML.push(`
					<option value="` + response.data[i].branchId + `">` + response.data[i].branchName + `</option>`);
				}

				branchList.innerHTML = branchTypeListHTML.join('');

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
	}).then(function() {
		KTUtil.scrollTop();
	});
		}
	});

	$.ajax({
		type: "get",
		url: baseURL + '/Branch/GetBranchRoles',

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
				// console.log(response.data[0].permissionName);
				const branchList = document.getElementById('kt_select_branch_role');
				var branchTypeListHTML = new Array();
				for (var i = 0; i < response.data.length; i++) {
					branchTypeListHTML.push(`
					<option value="` + response.data[i].branchRoleId + `">` + response.data[i].branchRoleName + `</option>`);
				}
				branchList.innerHTML = branchTypeListHTML.join('');
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
	}).then(function() {
		KTUtil.scrollTop();
	});
		}
	});

});