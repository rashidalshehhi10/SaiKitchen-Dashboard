"use strict";

import {
    baseURL
} from './constant.js';
export let selectedRow;
let user;

var KTDatatablesExtensionsResponsive = function() {

    var initTable1 = function() {
        var table = $('#kt_datatable');

        // begin first table
        table.DataTable({
            responsive: true,

            ajax: baseURL + '/Branch/GetBranchRoles',
            columns: [{
                    data: null,
                    render: function(data, type, row) {
                        // console.log(data);
                        return data.branchRoleId;
                    }
                },
                {
                    data: null,
                    render: function(data, type, row) {

                        return data.branchRoleName;
                    }
                },
                {
                    data: null,
                    render: function(data, type, row) {

                        return data.branchRoleDescription;
                    }
                },

                {
                    data: null
                }
            ],


            columnDefs: [{
                    width: '180px',
                    targets: 0
                },
                {
                    targets: 3,
                    title: 'Actions',
                    orderable: false,
                    render: function(data, type, full, meta) {
                        selectedRow = full;
                        return '\
						\
						<button type="button" onclick="getBranchRoleById(\'' + baseURL + '\',\'' + data.branchRoleId + '\');" data-toggle="modal" class="btn btn-sm btn-clean btn-icon" title="Edit details">\
						<i class="la la-edit"></i>\
					</button>\
							<button type="button"  onclick="deleteBranchRoleById(\'' + baseURL + '\',\'' + data.branchRoleId + '\');" class="btn btn-sm btn-clean btn-icon" title="Delete">\
								<i class="la la-trash"></i>\
							</button>\
						';
                    },
                }
            ]
        });




    };

    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    var _handleFormAddBranchRole = function() {
        var form = KTUtil.getById('kt_login_add_branch_role');
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
                        // description: {
                        // 	validators: {
                        // 		notEmpty: {
                        // 			message: 'Password is required'
                        // 		}
                        // 	}
                        // }
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
                var branchRole = {
                    branchRoleName: "string",
                    branchRoleDescription: "string",
                    roleTypeId: 0,
                    permissionRoles: new Array(),
                    roleHeads: new Array(),
                    branchRoleId: "string",
                };
                branchRole.branchRoleId = document.getElementById("branchRoleId").innerHTML,
                branchRole.branchRoleName = document.getElementById('roleName').value;
                branchRole.branchRoleDescription = document.getElementById('roleDescription').value;
                branchRole.roleTypeId = $('#kt_role_department').val();
                var roleHead = document.getElementsByClassName("tagify__tag tagify__tag tagify__tag--primary");

                roleHead.forEach(element => {
                    try {
                        branchRole.roleHeads.push({
                            headRoleId: element.attributes.branchRoleId.value,
                            isActive: true,
                            isDeleted: false
                        });
                    } catch (error) {

                    }

                });

                var permissionIdList = new Array();
                $("input:checkbox[name=permissionCheckbox]:checked").each(function() {
                    if (!permissionIdList.includes($(this).val())) {
                        permissionIdList.push($(this).val());
                        // alert("Id: " + $(this).attr("id") + " Value: " + $(this).val());
                        // yourArray.push($(this).val());
                        branchRole.permissionRoles.push({
                            permissionId: $(this).val(),
                            permissionLevelId: $('#kt_' + $(this).val()).val(),
                            isActive: true,
                            isDeleted: false
                        });
                    }
                });
                
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
                // console.log(roleHead[0].attributes.branchRoleId);
                // console.log( baseURL + '/Branch/AddBranchRole');
                // console.log(branchRole);
                const data = JSON.stringify(branchRole);
                console.log("send data");
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Branch/AddBranchRole',

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
                            window.location.replace("branchrole.html");

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
            initTable1();
            _handleFormAddBranchRole();
        }
    };
}();


let permissions;
let branchRolePermission;


jQuery(document).ready(function() {

    var login = localStorage.getItem("user");
    if (login !== null) {
        user = JSON.parse(login);
        console.log(user);
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 3) {
                branchRolePermission = permissions[i].permissionLevelId;
                console.log(branchRolePermission);
            }
        }
    }
    
    if(branchRolePermission==null){
        window.location.replace("index.html");
        }
	
    KTDatatablesExtensionsResponsive.init();
    console.log(baseURL + '/Permission/GetPermissions');

    $.ajax({
        type: "get",
        url: baseURL + '/Permission/GetPermissions',

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

                console.log(response.data[0].permissionName);
                const permissionList = document.getElementById('permissionList');

                const editPermissionList = document.getElementById('editPermissionList');

                var permissionListHTML = new Array();
                permissionListHTML.push(`
	<label class="checkbox">
	<input type="checkbox" value="0" onchange="selectAllCheckbox(this)" name="selectAll">
		<span></span>Select All</label>`);
                for (var i = 0; i < response.data.length; i++) {
                    permissionListHTML.push(`
	<div class="col-xs-6 col-md-6"> <label class="checkbox">
	 <input type="checkbox" onchange="toggleCheckbox(this)" value="` + response.data[i].permissionId + `" name="permissionCheckbox">
		 <span></span>` + response.data[i].permissionName + `</label> 
		 </div>	 <div class="input-group input-group-lg input-group-solid col-xs-6 col-md-6 " style="align-self:center;">
		 <select class="form-control" id="kt_` + response.data[i].permissionId + `" name="contactstatus"
			 class="form-control form-control-lg form-control-solid"
			 style="">
			 <option value="1">View</option>
			 <option value="2">Create</option>
			 <option value="3">Modify</option>
			 <option value="4">Escalate</option>
			 <option value="5">Delete</option>
		 </select>
	 </div>`);
                }

                permissionList.innerHTML = permissionListHTML.join('');
               // editPermissionList.innerHTML = permissionListHTML.join('');
                
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

    console.log(baseURL + '/Branch/GetRoleTypes');

    $.ajax({
        type: "get",
        url: baseURL + '/Branch/GetRoleTypes',

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

                console.log(response.data[0].contactStatusName);
                const roleTypeList = document.getElementById('kt_role_department');
                var roleTypeListHTML = new Array();

                for (var i = 0; i < response.data.length; i++) {
                    roleTypeListHTML.push(`
					<option value="` + response.data[i].roleTypeId + `">` + response.data[i].roleTypeName + `</option>`);
                }

                roleTypeList.innerHTML = roleTypeListHTML.join('');

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
});