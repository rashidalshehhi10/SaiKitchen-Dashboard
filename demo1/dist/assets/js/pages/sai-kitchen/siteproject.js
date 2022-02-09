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
export let workscopelist;
var filearry = new Array();
var KTDatatablesSearchOptionsAdvancedSearch = function() {

    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
   
    var _handleFormExpectedDeliveryDate = function() {
        var form = KTUtil.getById('kt_approve_project');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_approve_project_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        projectName: {
                            validators: {
                                notEmpty: {
                                    message: 'Name is required'
                                }
                            }
                        },
                        projectDescription: {
                            validators: {
                                notEmpty: {
                                    message: 'Description is required'
                                }
                            }
                        },
                        projectDescription: {
                            validators: {
                                notEmpty: {
                                    message: 'Description is required'
                                }
                            }
                        },
                        locationId: {
                            validators: {
                                notEmpty: {
                                    message: 'Location is required'
                                }
                            }
                        },
                        excelfile: {
                            validators: {
                                notEmpty: {
                                    message: 'Excel File is required'
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
            .on('core.form.valid', function() {
                // Show loading state on button
                KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Please wait");
                // Form Validation & Ajax Submission: https://formvalidation.io/guide/examples/using-ajax-to-submit-the-form
                var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
                var exceljson='';
                /*Checks whether the file is a valid excel file*/  
                if (regex.test($("#excelfile").val().toLowerCase())) {  
                    var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
                    if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
                        xlsxflag = true;  
                    }  
                    /*Checks whether the browser supports HTML5*/  
                    if (typeof (FileReader) != "undefined") {  
                        var reader = new FileReader();  
                        reader.onload = function (e) {  
                            var data = e.target.result;  
                            /*Converts the excel data in to object*/  
                            if (xlsxflag) {  
                                var workbook = XLSX.read(data, { type: 'binary' });  
                            }  
                            else {  
                                var workbook = XLS.read(data, { type: 'binary' });  
                            }  
                            /*Gets all the sheetnames of excel in to a variable*/  
                            var sheet_name_list = workbook.SheetNames;  
             
                            var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                            sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                                /*Convert the cell value to Json*/  
                                if (xlsxflag) {  
                                     exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
                                }  
                                else {  
                                     exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                                }  
                                if (exceljson.length > 0 && cnt == 0) {  
                                   // BindTable(exceljson, '#exceltable');  
                                    cnt++;  
                                }  
                            });  
                            // var scope =[];
							// for(var i=0;i<parseInt(document.getElementById("counterId").value);i++){
							   
							// 	if(document.getElementById("Quantity"+i) != null){
                            //         var quant=0;
                            //         if(document.getElementById("Quantity"+i).value != "")
                            //           quant= parseInt(document.getElementById("Quantity"+i).value)
                                       
							// 		if(document.getElementById("ScopeSelect"+i) != null){  
							// 			scope.push(
							// 					{
							// 						"workScopeId":parseInt(document.getElementById("ScopeSelect"+i).value), 
							// 						"materialId":parseInt(document.getElementById("MaterialSelect"+i).value), 
							// 						"quantity":quant,
							// 						"sizeId":parseInt(document.getElementById("SizeSelect"+i).value),
							// 					});  
							// 		}else{
							// 			scope.push(
							// 				{
							// 					"workScopeId":parseInt(document.getElementById("scopehiddenId"+i).value), 
							// 					"materialId":parseInt(document.getElementById("MaterialSelect"+i).value), 
							// 					"quantity":quant,
							// 					"sizeId":parseInt(document.getElementById("SizeSelect"+i).value),
							// 				});  
							// 		}   
							// 	}              
							// }

                            // 
						
                            var col0 = new Array();
                            var col1 = new Array();
                            var col2 = new Array();
                            var col3 = new Array();
                            var keys = Object.keys(exceljson[0]);
                           

                            for(var n=0;n<exceljson.length;n++){

                                col0.push(exceljson[n][keys[0]])
                                col1.push(exceljson[n][keys[1]])
                                col2.push(exceljson[n][keys[2]])
                                col3.push(exceljson[n][keys[3]])
                            }

                            var reason = new Array();
                            reason.push({[keys[0]]:col0});
                            reason.push({[keys[1]]:col1});
                            reason.push({[keys[2]]:col2});
                            reason.push({[keys[3]]:col3});

							

							var obj={
								"siteProjectName": document.getElementById("projectName").value,
                                "siteProjectDescription":  document.getElementById("projectDescription").value,
								"siteProjectLocation": document.getElementById("locationId").value,	
                                "branchId": user.data.userRoles[0].branchId,							
								"excel": reason,
							}
			
                      //   

                            const data1 = JSON.stringify(obj);
                            console.log(data1);

                             $.ajax({
                                type: "Post",
                                url: baseURL + '/SiteProject/AddSiteProject',
            
                                headers: {
                                    'Content-Type': 'application/json',
                                    'userId': user.data.userId,
                                    'userToken': user.data.userToken,
                                    // 'userRoleId': user.data.userRoles[0].userRoleId,
                                    // 'branchId': user.data.userRoles[0].branchId,
                                    // 'branchRoleId': user.data.userRoles[0].branchRoleId,
                                    'Access-Control-Allow-Origin': '*',
                                },
                                data: data1,
                                success: function(response) {
                                    // Release button
                                    KTUtil.btnRelease(formSubmitButton);
                                    console.log(response);
                                    // window.location.replace("home.html");
                                    if (response.isError == false) {
                                        // sessionStorage.setItem('user', JSON.stringify(response));
                                        location.reload();
            
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

                        }  
                        if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                            reader.readAsArrayBuffer($("#excelfile")[0].files[0]);  
                        }  
                        else {  
                            reader.readAsBinaryString($("#excelfile")[0].files[0]);  
                        }  
                    }  
                    else {  
                        alert("Sorry! Your browser does not support HTML5!");  
                        return false;
                    }  
                }  
                else {  
                    alert("Please upload a valid Excel file!");  
                    return false;
                }
                
            })
            
    }
    return {

        //main function to initiate the module
        init: function() {
           // initTable1();
           // _handleFormRequestforescalation();
            _handleFormExpectedDeliveryDate();
        },

    };

}();

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

	KTDatatablesSearchOptionsAdvancedSearch.init();
	
	$.ajax({
		type: "get",
		url: baseURL + '/User/GetAllUser',
	
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
	
				
				// var arr = [];
				// arr[0] = "Jani";
				// arr[1] = "Hege";
				// arr[2] = "Stale";
				// arr[3] = "Kai Jim";
				// arr[4] = "Borge";
			  
			  
				for (var i=0;i<response.data.length;i++)
				   {
								
							
				   
								   document.getElementById('usersListId').innerHTML +=`
		   
								   <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
								   <!--begin::Card-->
								   <div class="card card-custom gutter-b card-stretch">
									   <!--begin::Body-->
									   <div class="card-body pt-4">
										   <!--begin::Toolbar-->
										   <div class="d-flex justify-content-end">
											   <div class="dropdown dropdown-inline" data-toggle="tooltip" title="Quick actions" data-placement="left">
												   <a href="#" class="btn btn-clean btn-hover-light-primary btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													   <i class="ki ki-bold-more-hor"></i>
												   </a>
												   <div class="dropdown-menu dropdown-menu-md dropdown-menu-right">
													   <!--begin::Navigation-->
													   <ul class="navi navi-hover">
														   <li class="navi-header font-weight-bold py-4">
															   <span class="font-size-lg">Choose Label:</span>
															   <i class="flaticon2-information icon-md text-muted" data-toggle="tooltip" data-placement="right" title="Click to learn more..."></i>
														   </li>
														   <li class="navi-separator mb-3 opacity-70"></li>
														   <li class="navi-item">
															   <a href="#" class="navi-link">
																   <span class="navi-text">
																	   <span class="label label-xl label-inline label-light-success">Customer</span>
																   </span>
															   </a>
														   </li>
														   <li class="navi-item">
															   <a href="#" class="navi-link">
																   <span class="navi-text">
																	   <span class="label label-xl label-inline label-light-danger">Partner</span>
																   </span>
															   </a>
														   </li>
														   <li class="navi-item">
															   <a href="#" class="navi-link">
																   <span class="navi-text">
																	   <span class="label label-xl label-inline label-light-warning">Suplier</span>
																   </span>
															   </a>
														   </li>
														   <li class="navi-item">
															   <a href="#" class="navi-link">
																   <span class="navi-text">
																	   <span class="label label-xl label-inline label-light-primary">Member</span>
																   </span>
															   </a>
														   </li>
														   <li class="navi-item">
															   <a href="#" class="navi-link">
																   <span class="navi-text">
																	   <span class="label label-xl label-inline label-light-dark">Staff</span>
																   </span>
															   </a>
														   </li>
														   <li class="navi-separator mt-3 opacity-70"></li>
														   <li class="navi-footer py-4">
															   <a class="btn btn-clean font-weight-bold btn-sm" href="#">
															   <i class="ki ki-plus icon-sm"></i>Add new</a>
														   </li>
													   </ul>
													   <!--end::Navigation-->
												   </div>
											   </div>
										   </div>
										   <!--end::Toolbar-->
										   <!--begin::User-->
										   <div class="d-flex align-items-end mb-7">
											   <!--begin::Pic-->
											   <div class="d-flex align-items-center">
												   <!--begin::Pic-->
												   
												   <!--end::Pic-->
												   <!--begin::Title-->
												   <div class="d-flex flex-column">
													   <a href="#" class="text-dark font-weight-bold text-hover-primary font-size-h4 mb-0">`+response.data[i].userName+`</a>
													   <span class="text-muted font-weight-bold">Head of Development</span>
												   </div>
												   <!--end::Title-->
											   </div>
											   <!--end::Title-->
										   </div>
										   <!--end::User-->
										   <!--begin::Desc-->
										  
										   <!--end::Desc-->
										   <!--begin::Info-->
										   <div class="mb-7">
											   <div class="d-flex justify-content-between align-items-center">
												   <span class="text-dark-75 font-weight-bolder mr-2">Email:</span>
												   <a href="#" class="text-muted text-hover-primary">`+response.data[i].userEmail+`</a>
											   </div>
											   <div class="d-flex justify-content-between align-items-cente my-1">
												   <span class="text-dark-75 font-weight-bolder mr-2">Phone:</span>
												   <a href="#" class="text-muted text-hover-primary">`+response.data[i].userMobile+`</a>
											   </div>
											   <div class="d-flex justify-content-between align-items-center">
												   <span class="text-dark-75 font-weight-bolder mr-2">Location:</span>
												   <span class="text-muted font-weight-bold">`+response.data[i].userRoles[0].branch.branchName+`</span>
											   </div>
										   </div>
										   <!--end::Info-->
										   <a href="#" class="btn btn-block btn-sm btn-light-success font-weight-bolder text-uppercase py-4">write message</a>
									   </div>
									   <!--end::Body-->
								   </div>
								   <!--end::Card-->
							   </div>`;
								   
													
							   
							
					
		   
				   }
	
	
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

 