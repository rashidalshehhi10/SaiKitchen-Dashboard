"use strict";

import {
    baseURL
} from './constant.js'
import {
    measurementFile
} from './constant.js'
import {
    inqStatus
} from './status.js'
let user;
var table;
var exceljson;



let permissions;
let quotationPermission;

jQuery(document).ready(function() {

 

    var login = localStorage.getItem("user");
    if (login !== null) {
        user = JSON.parse(login);
        console.log(user);
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 14) {
                quotationPermission = permissions[i].permissionLevelId;
                console.log(quotationPermission);
            }
        }
    }



 
 
//   document.getElementById('ccc').value = listRows;

        	
			  
// 				for (var n=0;n<listRows.data.length;n++)
//                 {
                             
                         
                
//                                 document.getElementById('ListRowsId').innerHTML +=`
        
//                                 <li class="nav-item mb-2">
//                                 <a class="nav-link" id="home-tab-5" data-toggle="tab" onclick="getBlocks(` +n+ `)" >
//                                   <span class="nav-icon">
//                                     <i class="flaticon2-layers-1"></i>
//                                   </span>
//                                   <span class="nav-text">`+listRows.data[n].row+`</span>
//                                 </a>
//                               </li>`;
         
        
//                 }
 

   




	// $.ajax({
	// 	type: "post",
	// 	url: baseURL + '/SiteProject/GetSiteProjectDetailbyId?ProjectSiteId='+siteProjectId,
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'userId': user.data.userId,
	// 		'userToken': user.data.userToken,
	// 		'userRoleId': user.data.userRoles[0].userRoleId,
	// 		'branchId': user.data.userRoles[0].branchId,
	// 		'branchRoleId': user.data.userRoles[0].branchRoleId,
	// 		'Access-Control-Allow-Origin': '*',
	// 	},
	// 	success: function(response) {
	// 		console.log(response);
	// 		if (response.isError == false) {
	


	
	
	// 		} else {
	// 			Swal.fire({
	// 				text: response.errorMessage,
	// 				icon: "error",
	// 				buttonsStyling: false,
	// 				confirmButtonText: "Ok, got it!",
	// 				customClass: {
	// 					confirmButton: "btn font-weight-bold btn-light-primary"
	// 				}
	// 			}).then(function () {
	// 				KTUtil.scrollTop();
	// 			});
	// 		}
	// 	},
	// 	error: function(XMLHttpRequest, textStatus, errorThrown) {
	
	
	// 		// alert(errorThrown);
	
	// 		Swal.fire({
	// 			text: 'Internet Connection Problem',
	// 			icon: "error",
	// 			buttonsStyling: false,
	// 			confirmButtonText: "Ok, got it!",
	// 			customClass: {
	// 				confirmButton: "btn font-weight-bold btn-light-primary"
	// 			}
	// 		}).then(function() {
	// 			KTUtil.scrollTop();
	// 		});
	// 	}
	// });
	


});

