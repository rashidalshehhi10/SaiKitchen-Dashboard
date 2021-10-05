"use strict";

import {
    baseURL
} from './constant.js'
import {
    measurementFile
} from './constant.js'
let user;
export let workscopelist;
var fourfile =  new Array();
var four=new Array() ,five=new Array(),six=new Array();
var KTDatatablesSearchOptionsAdvancedSearch = function() {

    $.fn.dataTable.Api.register('column().title()', function() {
        return $(this.header()).text().trim();
    });

    var initTable1 = function() {
        // begin first table
        var table = $('#kt_datatable').DataTable({
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
                url: baseURL + '/JobOrder/GetInquiryJobOrderByBranchId?branchId=' + user.data.userRoles[0].branchId,
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'inquiryId', 'inquiryCode','quotationNo', 'status', 'workScopeName','customerCode', 'customerName',
                        'customerContact','customerEmail', 'buildingAddress', 'buildingTypeOfUnit', 'buildingCondition', 'buildingFloor', 'buildingReconstruction',
                         'isOccupied','inquiryDescription','inquiryComment', 'inquiryStartDate', 'inquiryEndDate', 'inquiryAddedBy','inquiryAddedById','noOfRevision', 'actions'
                    ],
                },
            },
            columns: [{
                    data: 'inquiryId'
                },
                {
                    data: 'inquiryCode'
                },
                {
                    data: 'quotationNo'
                },
                {
                    data: 'status'
                },
                {
                    data: 'workScopeName'
                },
                {
                    data: 'customerCode'
                },
                {
                    data: 'customerName'
                },
                {
                    data: 'customerContact'
                },
                {
                    data: 'customerEmail'
                },
                {
                    data: 'buildingAddress'
                },
                {
                    data: 'buildingTypeOfUnit'
                },
                {
                    data: 'buildingCondition'
                },
                {
                    data: 'buildingFloor'
                },
                {
                    data: 'buildingReconstruction'
                },
                {
                    data: 'isOccupied'
                },
                {
                    data: 'inquiryDescription'
                },
                {
                    data: 'inquiryComment'
                },
                {
                    data: 'inquiryStartDate'
                },
                {
                    data: 'inquiryEndDate'
                },
                {
                    data: 'inquiryAddedBy'
                },
                {
                    data: 'actions',
                    responsivePriority: -1
                },
                
            ],

            initComplete: function() {
                this.api().columns().every(function() {
                    var column = this;

                    switch (column.title()) {
                        // case 'Country':
                        // 	column.data().unique().sort().each(function(d, j) {
                        // 		$('.datatable-input[data-col-index="2"]').append('<option value="' + d + '">' + d + '</option>');
                        // 	});
                        // 	break;

                        case 'Status':
                            var status = {
                                1: {
                                    'title': 'Measurement Pending',
                                    'class': 'label-light-primary'
                                },
                                2: {
                                    'title': 'Measurement Delayed',
                                    'class': ' label-light-danger'
                                },
                                3: {
                                    'title': 'Design Pending',
                                    'class': ' label-light-primary'
                                },
                                4: {
                                    'title': 'Design Delayed',
                                    'class': ' label-light-success'
                                },
                                5: {
                                    'title': 'Quotation Pending',
                                    'class': ' label-light-primary'
                                },
                                6: {
                                    'title': 'Quotation Delayed',
                                    'class': ' label-light-danger'
                                },
                                7: {
                                    'title': 'Measurement Approved',
                                    'class': 'label-light-success'
                                },
                                8: {
                                    'title': 'Measurement Rejected',
                                    'class': ' label-light-info'
                                },
                                9: {
                                    'title': 'Measurement Approval Pending',
                                    'class': ' label-light-primary'
                                },
                                10: {
                                    'title': 'Design Approved',
                                    'class': 'label-light-success'
                                },
                                11: {
                                    'title': 'Design Rejected',
                                    'class': ' label-light-info'
                                },
                                12: {
                                    'title': 'Design Approval Pending',
                                    'class': ' label-light-primary'
                                },
                                13: {
                                    'title': 'Quotation Approved',
                                    'class': 'label-light-success'
                                },
                                14: {
                                    'title': 'Quotation Rejected',
                                    'class': ' label-light-info'
                                },
                                15: {
                                    'title': 'Quotation Approval Pending',
                                    'class': ' label-light-primary'
                                },
                                16: {
                                    'title': 'Design Waiting For Customer Approval',
                                    'class': ' label-light-primary'
                                },
                                17: {
                                    'title': 'Design Rejected By Client',
                                    'class': ' label-light-info'
                                },
                                18: {
                                    'title': 'Check List Pending',
                                    'class': ' label-light-info'
                                },
                                32: {
                                    'title': 'Waiting For Advance',
                                    'class': ' label-light-info'
                                },
                                43: {
                                    'title': 'Commerical Checklist Pending',
                                    'class': ' label-light-primary'
                                },
                                44: {
                                    'title': 'Commerical Checklist Approved',
                                    'class': ' label-light-success'
                                },
                                45: {
                                    'title': 'Commerical Checklist Rejected',
                                    'class': ' label-light-info'
                                },
                                46: {
                                    'title': 'Job Order Factory Approval Pending',
                                    'class': ' label-light-primary'
                                },
                                47: {
                                    'title': 'Job Order Factory Accepted',
                                    'class': ' label-light-success'
                                },
                                48: {
                                    'title': 'Job Order Factory Rejected',
                                    'class': ' label-light-info'
                                },
                                54: {
                                    'title': 'Job Order Files Pending',
                                    'class': ' label-light-primary'
                                },
                                55: {
                                    'title': 'Job Order Files Delayed',
                                    'class': ' label-light-primary'
                                },
                            };
                            column.data().unique().sort().each(function(d, j) {
                                if (d != null)
                                    $('.datatable-input[data-col-index="3"]').append('<option value="' + status[d].title + '">' + status[d].title + '</option>');
                            });
                            break;

                            // case 'Type':
                            // 	var status = {
                            // 		1: {'title': 'Online', 'state': 'danger'},
                            // 		2: {'title': 'Retail', 'state': 'primary'},
                            // 		3: {'title': 'Direct', 'state': 'success'},
                            // 	};
                            // 	column.data().unique().sort().each(function(d, j) {
                            // 		$('.datatable-input[data-col-index="7"]').append('<option value="' + d + '">' + status[d].title + '</option>');
                            // 	});
                            // 	break;
                    }
                });
            },

            columnDefs: [{
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function(data, type, full, meta) {
                        console.log(full);
                        var action = ``;
                        

                        action += `
                        <a type="button"  onclick="addComponent(` + full.inquiryId + `);" data-toggle="modal" data-target="#ScheduleDate" class="btn btn-sm btn-clean btn-icon"  style="background-color:#734f43;margin:2px" title="Upload">
                            <i class="la la-file-pdf-o"></i>
                        </a>
                           `;
                            return action;
                       
                    },
                },
                {
                    targets: 3,
                    render: function(data, type, full, meta) {
                        var status = {
                            1: {
                                'title': 'Measurement Pending',
                                'class': 'label-light-primary'
                            },
                            2: {
                                'title': 'Measurement Delayed',
                                'class': ' label-light-danger'
                            },
                            3: {
                                'title': 'Design Pending',
                                'class': ' label-light-primary'
                            },
                            4: {
                                'title': 'Design Delayed',
                                'class': ' label-light-success'
                            },
                            5: {
                                'title': 'Quotation Pending',
                                'class': ' label-light-primary'
                            },
                            6: {
                                'title': 'Quotation Delayed',
                                'class': ' label-light-danger'
                            },
                            7: {
                                'title': 'Measurement Approved',
                                'class': 'label-light-success'
                            },
                            8: {
                                'title': 'Measurement Rejected',
                                'class': ' label-light-info'
                            },
                            9: {
                                'title': 'Measurement Approval Pending',
                                'class': ' label-light-primary'
                            },
                            10: {
                                'title': 'Design Approved',
                                'class': 'label-light-success'
                            },
                            11: {
                                'title': 'Design Rejected',
                                'class': ' label-light-info'
                            },
                            12: {
                                'title': 'Design Approval Pending',
                                'class': ' label-light-primary'
                            },
                            13: {
                                'title': 'Quotation Approved',
                                'class': 'label-light-success'
                            },
                            14: {
                                'title': 'Quotation Rejected',
                                'class': ' label-light-info'
                            },
                            15: {
                                'title': 'Quotation Approval Pending',
                                'class': ' label-light-primary'
                            },
                            16: {
                                'title': 'Design Waiting For Customer Approval',
                                'class': ' label-light-primary'
                            },
                            17: {
                                'title': 'Design Rejected By Client',
                                'class': ' label-light-info'
                            },
                            18: {
                                'title': 'Check List Pending',
                                'class': ' label-light-info'
                            },
                            32: {
                                'title': 'Waiting For Advance',
                                'class': ' label-light-info'
                            },
                            43: {
                                'title': 'Commerical Checklist Pending',
                                'class': ' label-light-primary'
                            },
                            44: {
                                'title': 'Commerical Checklist Approved',
                                'class': ' label-light-success'
                            },
                            45: {
                                'title': 'Commerical Checklist Rejected',
                                'class': ' label-light-info'
                            },
                            46: {
                                'title': 'Job Order Factory Approval Pending',
                                'class': ' label-light-primary'
                            },
                            47: {
                                'title': 'Job Order Factory Accepted',
                                'class': ' label-light-success'
                            },
                            48: {
                                'title': 'Job Order Factory Rejected',
                                'class': ' label-light-info'
                            },
                            54: {
                                'title': 'Job Order Files Pending',
                                'class': ' label-light-primary'
                            },
                            55: {
                                'title': 'Job Order Files Delayed',
                                'class': ' label-light-primary'
                            },
                        };

                        console.log(data);
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span style="font-size:1.0rem !important; height:80px;" class="label label-lg font-weight-bold ' + status[data].class + ' label-inline" style="background-color:white;">' + status[data].title + '</span>';

                    },
                },
                // {
                // 	targets: 7,
                // 	render: function(data, type, full, meta) {
                // 		var status = {
                // 			1: {'title': 'Online', 'state': 'danger'},
                // 			2: {'title': 'Retail', 'state': 'primary'},
                // 			3: {'title': 'Direct', 'state': 'success'},
                // 		};
                // 		if (typeof status[data] === 'undefined') {
                // 			return data;
                // 		}
                // 		return '<span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
                // 			'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span>';
                // 	},
                // },
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

    return {

        //main function to initiate the module
        init: function() {
            initTable1();
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
            if (permissions[i].permissionId == 9) {
                quotationPermission = permissions[i].permissionLevelId;
                console.log(quotationPermission);
            }
        }
    }

    KTDatatablesSearchOptionsAdvancedSearch.init();

   
});
$('#kt_approve_inquiry_button').click(function () {
    if(four.length ==0){
    document.getElementById("alert").innerHTML ="MaterialSheet File should be upload";
      return false;
    }
    var file1='',file2='',file3='';
    if(four.length >0){
        file1 = four[0];
    }
    if(five.length >0){
        file2 = five[0];
    }
    if(six.length >0){
        file3 = six[0];
    }
    var checklistdata = {
        "inquiryId":document.getElementById('inquiryId').value,
        "isAppliancesProvidedByClient" : $('input[name="isAppliances"]:checked').val(),
        "materialSheetFileUrl":file1,
        "mepDrawingFileUrl": file2,
        //"jobOrderChecklistFileUrl":fourfile[6]==undefined?"":fourfile[6],
        "dataSheetApplianceFileUrl":file3,
      };
    const data = JSON.stringify(checklistdata);
    console.log(data);
    console.log(fourfile);
      $.ajax({
        type: "Post",
        url: baseURL + '/JobOrder/AddJobOrder',
        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
        success: function(response) {
            console.log(response);
            window.location.replace("joborderfiles.html");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            document.getElementById("alert").innerHTML ="An error Occured";
        }
    });  
});


$('#kt_dropzone_4').dropzone({
            
    // url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
    url: baseURL+"/File/UploadFile", // Set the url for your upload script location
    type: "Post",
    headers : {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json'
    },
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 30000, // MB
    timeout: 600000,
    addRemoveLinks: true,
    removedfile:function(file) {
        if(file.status =="error"){
            file.previewElement.remove();
            return false;
        }
        var fileuploded = file.previewElement.querySelector("[data-dz-name]");
        var fileurl ='';
        var filearr = fileuploded.innerHTML.split(".");
        if(filearr.length > 1){
            fileurl = "/File/DeleteFileFromBlob?fileName=";
        }else{
            fileurl = "/File/DeleteVideo?VideoId=";
        }
        $.ajax({
            type:"post",
            url:baseURL+fileurl+fileuploded.innerHTML,
            cache:false,
            success: function(){
                 removeA(four, fileuploded.innerHTML);
                file.previewElement.remove();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("Error");
        
            }
        });

    },

    acceptedFiles: "image/*,application/pdf,.png,.mp4,.dwg",
    
init: function() {

},
success: function(file, response){
    var fileuploded = file.previewElement.querySelector("[data-dz-name]");
    fileuploded.innerHTML = response.data.item1;
    four.push(response.data.item1);

}
    
});
$('#kt_dropzone_5').dropzone({
            
    // url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
    url: baseURL+"/File/UploadFile", // Set the url for your upload script location
    type: "Post",
    headers : {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json'
    },
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 30000, // MB
    timeout: 600000,
    addRemoveLinks: true,
    removedfile:function(file) {
        if(file.status =="error"){
            file.previewElement.remove();
            return false;
        }
        var fileuploded = file.previewElement.querySelector("[data-dz-name]");
        var fileurl ='';
        var filearr = fileuploded.innerHTML.split(".");
        if(filearr.length > 1){
            fileurl = "/File/DeleteFileFromBlob?fileName=";
        }else{
            fileurl = "/File/DeleteVideo?VideoId=";
        }
        $.ajax({
            type:"post",
            url:baseURL+fileurl+fileuploded.innerHTML,
            cache:false,
            success: function(){
                removeA(five, fileuploded.innerHTML);
                file.previewElement.remove();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("Error");
        
            }
        });

    },

    acceptedFiles: "image/*,application/pdf,.png,.mp4,.dwg",
    
init: function() {
    
},
success: function(file, response){
    var fileuploded = file.previewElement.querySelector("[data-dz-name]");
    fileuploded.innerHTML = response.data.item1;

    five.push(response.data.item1);

}

});
$('#kt_dropzone_6').dropzone({
            
    // url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
    url: baseURL+"/File/UploadFile", // Set the url for your upload script location
    type: "Post",
    headers : {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json'
    },
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 30000, // MB
    timeout: 600000,
    addRemoveLinks: true,
    removedfile:function(file) {
        if(file.status =="error"){
            file.previewElement.remove();
            return false;
        }
        var fileuploded = file.previewElement.querySelector("[data-dz-name]");
        var fileurl ='';
        var filearr = fileuploded.innerHTML.split(".");
        if(filearr.length > 1){
            fileurl = "/File/DeleteFileFromBlob?fileName=";
        }else{
            fileurl = "/File/DeleteVideo?VideoId=";
        }
        $.ajax({
            type:"post",
            url:baseURL+fileurl+fileuploded.innerHTML,
            cache:false,
            success: function(){
                removeA(six, fileuploded.innerHTML);
                file.previewElement.remove();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("Error");
        
            }
        });

    },

    acceptedFiles: "image/*,application/pdf,.png,.mp4,.dwg",
    
init: function() {

},
success: function(file, response){
    var fileuploded = file.previewElement.querySelector("[data-dz-name]");
    fileuploded.innerHTML = response.data.item1;

    six.push(response.data.item1);

}

});

              /*  for (let j = 4; j <= 6; j++) {
                $('#kt_dropzone_'+j).dropzone({
                             url: baseURL+"/File/UploadFile", // Set the url for your upload script location
                            type: "Head",
                            headers : {
                                'Access-Control-Allow-Origin': '*',
                            },
                            paramName: "file"+j, // The name that will be used to transfer the file
                            maxFiles: 1,
                            maxFilesize: 30000, // MB
                            timeout: 600000,
                            addRemoveLinks: true,
                            removedfile:function(file) {
                                if(file.status =="error"){
                                    file.previewElement.remove();
                                    return false;
                                }
                                var fileuploded = file.previewElement.querySelector("[data-dz-name]");
                                var fileurl ='';
                                var filearr = fileuploded.innerHTML.split(".");
                                if(filearr.length > 1){
                                    fileurl = "/File/DeleteFileFromBlob?fileName=";
                                }else{
                                    fileurl = "/File/DeleteVideo?VideoId=";
                                }
                                $.ajax({
                                    type:"post",
                                    url:baseURL+fileurl+fileuploded.innerHTML,
                                    cache:false,
                                    success: function(){
                                       // removeA(measurementFile, fileuploded.innerHTML);
                                        removeA(fourfile, fileuploded.innerHTML);
                                        file.previewElement.remove();
                                    },
                                    error: function(XMLHttpRequest, textStatus, errorThrown){
                                        console.log("Error");
                                
                                    }
                                });
                            },
                      
                            acceptedFiles: "image/*,application/pdf,.png,.mp4",
                            
                           init: function() {
                        
                            },
                            success: function(file, response){
                                var fileuploded = file.previewElement.querySelector("[data-dz-name]");
                                fileuploded.innerHTML = response.data.item1;
                                fourfile[j] = response.data.item1;
                            
                            }
                            
                          });
                        } */
                        function removeA(arr) {
                            var what, a = arguments, L = a.length, ax;
                            while (L > 1 && arr.length) {
                                what = a[--L];
                                while ((ax= arr.indexOf(what)) !== -1) {
                                    arr.splice(ax, 1);
                                }
                            }
                            return arr;
                        }