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

    $.fn.dataTable.Api.register('column().title()', function() {
        return $(this.header()).text().trim();
    });




    var initTable1 = function() {
        // begin first table
         table = $('#kt_datatable').DataTable({
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html

            lengthMenu: [5, 10, 25, 50],

            pageLength: 10,

            language: {
                'lengthMenu': 'Display _MENU_',
            },
            serverSorting: true,
            autoColumns: true,
            order: [
                [0, 'desc']
            ],
            searchDelay: 0,
            processing: true,
            serverSide: false,
            ajax: {
               // url: baseURL + '/CommercialProject/GetAllCommercialProjects?branchId=' + user.data.userRoles[0].branchId,
               url: baseURL + '/CommercialProject/GetAllCommercialProjects',
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'commercialProjectId', 'commercialProjectName',  'commercialProjectNo', 'commercialProjectDesription',
                        'commercialProjectStartDate','projectStatusName' , 'actions' 
                    ],
                },
            },
            columns: [{
                    data: 'commercialProjectId'
                },
                {
                    data: 'commercialProjectName'
                 },
                 {
                    data: 'commercialProjectNo'
                 },
                {
                    data: 'commercialProjectDesription'
                },
                {
                    data: 'commercialProjectStartDate'
                },
                {
                    data: 'projectStatusName'
                },
                {
                    data: 'actions',
                   // responsivePriority: -1
                },
                
            ],

            initComplete: function() {
                this.api().columns().every(function() {
                    var column = this;

                    // switch (column.title()) {
                    //     case 'Status':
                    //         var status = inqStatus;
                    //         column.data().unique().sort().each(function(d, j) {
                    //             if (d != null)
                    //                 $('.datatable-input[data-col-index="3"]').append('<option value="' + status[d].title + '">' + status[d].title + '</option>');
                    //         });
                    //         break;

                    // }
                });
            },

            columnDefs: [
                {
                    defaultContent: "-",
                    targets: "_all"
                },
                {
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function(data, type, full, meta) {
                        console.log(full);
                        var action = ``;
                        
                        
                        
                    
                        //     action += `
                        //     <a type="button"  onclick="document.getElementById('PurchaseOrderId').innerHTML = ` + full.purchaseOrderId + `;" data-toggle="modal" data-target="#ScheduleDate" style="background-color:#734f43;margin:2px" class="btn btn-sm btn-clean btn-icon" title="Rest Expected Delivery Date">\
                        //     <i class="la la-calendar"></i>
                        // </a>
                        // `;
                        // action += `
                        // <a type="button" onclick="document.getElementById('PurchaseOrderId').innerHTML = ` + full.purchaseOrderId + `;" data-toggle="modal" data-target="#Requestforescalation" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Request For Delete">
                        // <i class="la la-trash"></i>
                        // </a>
                        
						// `;
                         
                            return action;
                       
                    },
                },

            ],
        });

        



        var filter = function() {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
        };

        var asdasd = function(value, index) {
            var val = $.fn.dataTable.util.escapeRegex(value);
            table.column(index).search(val ? val : '', false, true);
        };

        $('#kt_search').on('click', function(e) {
            e.preventDefault();
            var params = {};
            $('.datatable-input').each(function() {
                var i = $(this).data('col-index');
                if (params[i]) {
                    params[i] += '|' + $(this).val();
                } else {
                    params[i] = $(this).val();
                }
            });
            $.each(params, function(i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#kt_reset').on('click', function(e) {
            e.preventDefault();
            $('.datatable-input').each(function() {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });

        $('#kt_datepicker').datepicker({
            todayHighlight: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        });

    };
    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
    var _handleFormRequestforescalation = function() {
        var form = KTUtil.getById('kt_escalation');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_escalation_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
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
              
                $.ajax({
                    type: "Post",  
                    url: baseURL + '/Purchase/DeletePurchaseOrder?PurchaseOrderId='+parseInt(document.getElementById("PurchaseOrderId").innerHTML),

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
                    success: function(response) {
                        // Release button
                       // KTUtil.btnRelease(formSubmitButton);
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
            })

    }
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
                        JobNOId: {
                            validators: {
                                notEmpty: {
                                    message: 'JobNo is required'
                                }
                            }
                        },
                        projectId: {
                            validators: {
                                notEmpty: {
                                    message: 'Project Name is required'
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
                            var scope =[];
							for(var i=0;i<parseInt(document.getElementById("counterId").value);i++){
							   
								if(document.getElementById("Quantity"+i) != null){
                                    var quant=0;
                                    if(document.getElementById("Quantity"+i).value != "")
                                      quant= parseInt(document.getElementById("Quantity"+i).value)
                                       
									if(document.getElementById("ScopeSelect"+i) != null){  
										scope.push(
												{
													"workScopeId":parseInt(document.getElementById("ScopeSelect"+i).value), 
													"materialId":parseInt(document.getElementById("MaterialSelect"+i).value), 
													"quantity":quant,
													"sizeId":parseInt(document.getElementById("SizeSelect"+i).value),
												});  
									}else{
										scope.push(
											{
												"workScopeId":parseInt(document.getElementById("scopehiddenId"+i).value), 
												"materialId":parseInt(document.getElementById("MaterialSelect"+i).value), 
												"quantity":quant,
												"sizeId":parseInt(document.getElementById("SizeSelect"+i).value),
											});  
									}   
								}              
							}

                            // 
						
                            var col0 = new Array();
                            var col1 = new Array();
                            var col2 = new Array();
                            var col3 = new Array();
                            var keys = Object.keys(exceljson[0]);
                           

                            for(i==0;i<exceljson.length;i++){

                                col0.push(exceljson[i][keys[0]])
                                col1.push(exceljson[i][keys[1]])
                                col2.push(exceljson[i][keys[2]])
                                col3.push(exceljson[i][keys[3]])
                            }

                            var reason = new Array();
                            reason.push({[keys[0]]:col0});
                            reason.push({[keys[1]]:col1});
                            reason.push({[keys[2]]:col2});
                            reason.push({[keys[3]]:col3});

                         

							var obj={
								"jobno": document.getElementById("JobNOId").value,
								"projectname": document.getElementById("projectId").value,
								"location": document.getElementById("locationId").value,
								"scopeofWork":scope,
								"excel": reason
							}
                            
                            const data1 = JSON.stringify(obj);
                            console.log(data1);

                             $.ajax({
                                type: "Post",
                                url: baseURL + '/CommercialProject/AddCommercialProject',
            
                                headers: {
                                    'Content-Type': 'application/json',
                                    'userId': user.data.userId,
                                    'userToken': user.data.userToken,
                                    'userRoleId': user.data.userRoles[0].userRoleId,
                                    'branchId': user.data.userRoles[0].branchId,
                                    'branchRoleId': user.data.userRoles[0].branchRoleId,
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
            initTable1();
            _handleFormRequestforescalation();
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


      $('#kt_datatable').on('click', 'td.dtr-control', function () {
      
        table.rows().every(function(){
            // If row has details expanded
            //if(this.child.isShown()){
                // Collapse row details
                this.child.hide();
                $(this.node()).removeClass('shown');
                $(this.node()).removeClass('parent');
            //}
        });
     var tr = $(this).closest('tr');
     var row = table.row( tr );

     if ( row.child.isShown() ) {
         // This row is already open - close it
         row.child.hide();
         tr.removeClass('shown');
         tr.removeClass('parent');
     }
     else {
         // Open this row
         row.child.show();
         tr.addClass('shown');
         tr.addClass('parent');
     }
    });


    KTDatatablesSearchOptionsAdvancedSearch.init();


});

 