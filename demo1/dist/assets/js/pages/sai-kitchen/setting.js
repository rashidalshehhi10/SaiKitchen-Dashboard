"use strict";

import {
    baseURL
} from './constant.js';
export let selectedRow;
let user;




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
	

   
   
    $.ajax({
        type: "POST",
        url: baseURL + '/Setting/GetSetting',
        data:null,
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
                document.getElementById('settingId').value = response.data.settingId;
                const roleTypeList = document.getElementById('settingMeasurementDelay');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 1; i <= 100; i++) {
                    selected='';
                    if(response.data.settingMeasurementDelay== i){
                        selected='selected';
                    }
                    roleTypeListHTML.push(`
					<option value="` + i+ `" `+selected+`>` + i + `</option>`);
                }
                roleTypeList.innerHTML = roleTypeListHTML.join('');

                const Design = document.getElementById('settingDesignDelay');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 1; i <= 100; i++) {
                    selected='';
                    if(response.data.settingDesignDelay== i){
                        selected='selected';
                    }
                    roleTypeListHTML.push(`
					<option value="` + i+ `" `+selected+`>` + i + `</option>`);
                }
                Design.innerHTML = roleTypeListHTML.join(''); 

                const Quotation = document.getElementById('settingQuotationDelay');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 1; i <= 100; i++) {
                    selected='';
                    if(response.data.settingQuotationDelay== i){
                        selected='selected';
                    }
                    roleTypeListHTML.push(`
					<option value="` + i+ `" `+selected+`>` + i + `</option>`);
                }
                Quotation.innerHTML = roleTypeListHTML.join('');
                
                const NoAction = document.getElementById('settingNoActionDelayFromCustomer');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 1; i <= 100; i++) {
                    selected='';
                    if(response.data.settingNoActionDelayFromCustomer== i){
                        selected='selected';
                    }
                    roleTypeListHTML.push(`
					<option value="` + i+ `" `+selected+`>` + i + `</option>`);
                }
                NoAction.innerHTML = roleTypeListHTML.join(''); 

                const Maintenance = document.getElementById('settingMaintenanceAfterMonth');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 1; i <= 100; i++) {
                    selected='';
                    if(response.data.settingMaintenanceAfterMonth== i){
                        selected='selected';
                    }
                    roleTypeListHTML.push(`
					<option value="` + i+ `" `+selected+`>` + i + `</option>`);
                }
                Maintenance.innerHTML = roleTypeListHTML.join(''); 

                const Assignee = document.getElementById('settingAssigneeDelay');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 1; i <= 100; i++) {
                    selected='';
                    if(response.data.settingAssigneeDelay== i){
                        selected='selected';
                    }
                    roleTypeListHTML.push(`
					<option value="` + i+ `" `+selected+`>` + i + `</option>`);
                }
                Assignee.innerHTML = roleTypeListHTML.join(''); 

                const Approval = document.getElementById('settingApprovalDelay');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 1; i <= 100; i++) {
                    selected='';
                    if(response.data.settingApprovalDelay== i){
                        selected='selected';
                    }
                    roleTypeListHTML.push(`
					<option value="` + i+ `" `+selected+`>` + i + `</option>`);
                }
                Approval.innerHTML = roleTypeListHTML.join('');

                const Customer = document.getElementById('settingCustomerContactDelay');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 1; i <= 100; i++) {
                    selected='';
                    if(response.data.settingCustomerContactDelay== i){
                        selected='selected';
                    }
                    roleTypeListHTML.push(`
					<option value="` + i+ `" `+selected+`>` + i + `</option>`);
                }
                Customer.innerHTML = roleTypeListHTML.join('');

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

 $('#kt_update_button').click(function () {
    var settings = {
        "settingId":document.getElementById('settingId').value,
        "settingMeasurementDelay": document.getElementById('settingMeasurementDelay').value,
        "settingDesignDelay": document.getElementById('settingDesignDelay').value,
        "settingQuotationDelay": document.getElementById('settingQuotationDelay').value,
        "settingNoActionDelayFromCustomer": document.getElementById('settingNoActionDelayFromCustomer').value,
        "settingMaintenanceAfterMonth": document.getElementById('settingMaintenanceAfterMonth').value,
        "settingAssigneeDelay": document.getElementById('settingAssigneeDelay').value,
        "settingApprovalDelay": document.getElementById('settingApprovalDelay').value,
        "settingCustomerContactDelay": document.getElementById('settingCustomerContactDelay').value,
      };
    const data = JSON.stringify(settings);
    console.log(data);
     $.ajax({
        type: "Post",
        url: baseURL + '/Setting/UpdateSetting',
        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
        success: function(response) {
            console.log(response);
            window.location.replace("setting.html");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           
        }
    }); 
});

$('#kt_reset_button').click(function () {
    var settings = {
        "settingId":document.getElementById('settingId').value,
        "settingMeasurementDelay": 1,
        "settingDesignDelay": 1,
        "settingQuotationDelay": 1,
        "settingNoActionDelayFromCustomer": 7,
        "settingMaintenanceAfterMonth": 6,
        "settingAssigneeDelay": 1,
        "settingApprovalDelay": 1,
        "settingCustomerContactDelay":1,
      };
    const data = JSON.stringify(settings);
    console.log(data);
     $.ajax({
        type: "Post",
        url: baseURL + '/Setting/UpdateSetting',
        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
        success: function(response) {
            console.log(response);
            window.location.replace("setting.html");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           
        }
    }); 
});