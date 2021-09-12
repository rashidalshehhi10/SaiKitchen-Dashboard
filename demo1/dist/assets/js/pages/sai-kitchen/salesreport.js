"use strict";
// Class definition

import {
    baseURL
} from './constant.js'


// List of all countries in a simple list / array.
// Sorted alphabetical by country name (special characters on bottom)



let user;
let datatable;
let customerData;

let permissions;
let customerPermission;


var height = '350px';//parseInt(KTUtil.css(element, 'height'));
var labelColor ='#F1583E' ;//KTUtil.getCssVariableValue('--bs-gray-500');
var borderColor ='#FFF6F0' ; //KTUtil.getCssVariableValue('--bs-gray-200');
var baseColor ='#F1583E' ; //KTUtil.getCssVariableValue('--bs-info');
var lightColor = '#FFF6F0' ;//KTUtil.getCssVariableValue('--bs-light-info');



var datasource1 =[];
var datasource2 =[];
var columnName = [
    { title: "INQUIRY" },
    { title: "WORKSCOPE" },
    { title: "CUSTOMER" },
    { title: "CONTACT INFO." },
    { title: "PAYMENT METHOD ID" },
    { title: "PAYMENT TYPE/MODE" },
    { title: "AMOUNT RECEIVED" },

  ];
  var example = $("#kt_datatable_example_4").DataTable({
    data: datasource1,
    columns: columnName,
    "searching": false, 
    "lengthChange": false
});

$('#btnSearch').click(function (){
    document.getElementById("kt_apexcharts_3").innerHTML='';
    document.getElementById("kt_apexcharts_4").innerHTML='';
    document.getElementById("topFivePaidCustomers").innerHTML='';
    document.getElementById("topFiveNewCustomers").innerHTML='';
    document.getElementById("MyEmployees").innerHTML='';

    document.getElementById("load").style.removeProperty('display');
    var obj={
        "id":parseInt(document.getElementById('kt_select_branch').value),
        "startDate": $('#kt_daterangepicker_1').val(),
        "endDate": $('#kt_daterangepicker_2').val()
    }
    const data = JSON.stringify(obj);
    console.log(data);
    $.ajax({
        type: "post",
        url: baseURL + '/Report/GetReportForBranch' ,
        data: data,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        success: function(response) {
            console.log(response);
            var series =[];
            var labels =[];
            
            for (let i = 0; i < response.data.customerContactSources.length; i++) {
                series.push(response.data.customerContactSources[i].percentage);
                labels.push(response.data.customerContactSources[i].contactMode);
            }
            var options = {
                series: series,
                chart: {
                type: 'donut',
                height:'263px',
                
            },
            labels: labels,
            responsive: [{
                breakpoint: 480,
                options: {
                chart: {
                    width: 300,
                    
                },
                legend: {
                    position: 'bottom'
                }
                }
            }],
            legend: {
                position: 'bottom',
              }
            };
            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
            series= [];
            labels=[];
            for (let i = 0; i < response.data.receivedPaymentModes.length; i++) {
                series.push(response.data.receivedPaymentModes[i].percentage);
                labels.push(response.data.receivedPaymentModes[i].paymentMode);
            }
            var options = {
                series: series,
                chart: {
                type: 'donut',
                height:'263px',
                
            },
            labels: labels,
            responsive: [{
                breakpoint: 480,
                options: {
                chart: {
                    width: 300,
                    
                },
                legend: {
                    position: 'bottom'
                }
                }
            }],
            legend: {
                position: 'bottom',
              }
            };
            var chart1 = new ApexCharts(document.querySelector("#chart1"), options);
            chart1.render();

            //customer statsfication chart 
            var ydatachart=[];
            var xdatachart=[];
            var element = document.getElementById('kt_apexcharts_3');
            
            //ydatachart =[30, 40, 40, 90, 90, 70, 70];
           // xdatachart = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
           for (let i = 0; i < response.data.customerSatisfaction.length; i++) {
            xdatachart.push( response.data.customerSatisfaction[i].month);
            ydatachart.push(response.data.customerSatisfaction[i].avarege);
           }
            var options1 = {
                series: [{
                    name: 'Customer satisfaction',
                    data: ydatachart
                }],
                chart: {
                    fontFamily: 'inherit',
                    type: 'area',
                    height: height,
                    toolbar: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'solid',
                    opacity: 1
                },
                stroke: {
                    curve: 'smooth',
                    show: true,
                    width: 3,
                    colors: [baseColor]
                },
                xaxis: {
                    categories: xdatachart,
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        style: {
                            colors: labelColor,
                            fontSize: '0px'
                        }
                    },
                    crosshairs: {
                        position: 'front',
                        stroke: {
                            color: baseColor,
                            width: 1,
                            dashArray: 3
                        }
                    },
                    tooltip: {
                        enabled: true,
                        formatter: undefined,
                        offsetY: 0,
                        style: {
                            fontSize: '12px'
                        }
                    }
                },
                yaxis: {
                    
                    labels: {
                        style: {
                            colors: labelColor,
                            fontSize: '0px'
                        }
                    }
                },
                states: {
                    normal: {
                        filter: {
                            type: 'none',
                            value: 0
                        }
                    },
                    hover: {
                        filter: {
                            type: 'none',
                            value: 0
                        }
                    },
                    active: {
                        allowMultipleDataPointsSelection: false,
                        filter: {
                            type: 'none',
                            value: 0
                        }
                    }
                },
                tooltip: {
                    style: {
                        fontSize: '12px'
                    },
                    y: {
                        formatter: function (val) {
                           // return '$' + val + ' thousands'
                        }
                    }
                },
                colors: [lightColor],
                grid: {
                    borderColor: borderColor,
                    strokeDashArray: 1,
                    yaxis: {
                        lines: {
                            show: true
                        }
                    }
                },
                markers: {
                    strokeColor: baseColor,
                    strokeWidth: 3
                }
            };
            var chart2 = new ApexCharts(element, options1);
            chart2.render();

            //recieved data chart
            var element1 = document.getElementById('kt_apexcharts_4');
            //ydatachart =[10, 20, 30, 40, 50, 60, 70];
            //xdatachart = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
            xdatachart =[];
            ydatachart =[];
            for (let i = 0; i < response.data.monthlyAmountReceived.length; i++) {
                xdatachart.push( response.data.monthlyAmountReceived[i].month);
                ydatachart.push(response.data.monthlyAmountReceived[i].avarege);
               }
            var options2 = {
                series: [{
                    name: 'Customer satisfaction',
                    data: ydatachart
                }],
                chart: {
                    fontFamily: 'inherit',
                    type: 'area',
                    height: height,
                    toolbar: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'solid',
                    opacity: 1
                },
                stroke: {
                    curve: 'smooth',
                    show: true,
                    width: 3,
                    colors: [baseColor]
                },
                xaxis: {
                    categories: xdatachart,
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        style: {
                            colors: labelColor,
                            fontSize: '0px'
                        }
                    },
                    crosshairs: {
                        position: 'front',
                        stroke: {
                            color: baseColor,
                            width: 1,
                            dashArray: 3
                        }
                    },
                    tooltip: {
                        enabled: true,
                        formatter: undefined,
                        offsetY: 0,
                        style: {
                            fontSize: '12px'
                        }
                    }
                },
                yaxis: {
                    
                    labels: {
                        style: {
                            colors: labelColor,
                            fontSize: '0px'
                        }
                    }
                },
                states: {
                    normal: {
                        filter: {
                            type: 'none',
                            value: 0
                        }
                    },
                    hover: {
                        filter: {
                            type: 'none',
                            value: 0
                        }
                    },
                    active: {
                        allowMultipleDataPointsSelection: false,
                        filter: {
                            type: 'none',
                            value: 0
                        }
                    }
                },
                tooltip: {
                    style: {
                        fontSize: '12px'
                    },
                    y: {
                        formatter: function (val) {
                           // return '$' + val + ' thousands'
                        }
                    }
                },
                colors: [lightColor],
                grid: {
                    borderColor: borderColor,
                    strokeDashArray: 1,
                    yaxis: {
                        lines: {
                            show: true
                        }
                    }
                },
                markers: {
                    strokeColor: baseColor,
                    strokeWidth: 1
                }
            };
            var chart3 = new ApexCharts(element1, options2);
            chart3.render();

            document.getElementById("needToContact").innerHTML = response.data.amountReceived;
            document.getElementById("amountrecived").innerHTML = 'AED '+response.data.amountReceived;
            document.getElementById("amountpending").innerHTML = response.data.amountPending;
            document.getElementById("quotationaccepted").innerHTML = response.data.quotationAccepted;
            document.getElementById("quotationrejected").innerHTML = response.data.quotationRejected;
            document.getElementById("quotationpending").innerHTML = response.data.quotationPending;
            document.getElementById("inquirescompleted").innerHTML = response.data.inquiriesCompleted;
            document.getElementById("customerSatisfy").innerHTML = response.data.customerSatisfy+'%';
            for (let i = 0; i < response.data.topFivePaidCustomers.length; i++) {
                 document.getElementById('topFivePaidCustomers').innerHTML += 
                 `<!--begin::Item-->
                 <div class="d-flex align-items-sm-center mb-7">
                     <!--begin::Symbol-->
                     <div class="symbol symbol-50px me-5" style="margin-right: 1.25rem!important;">
                         <span class="symbol-label" >
                             <img src="/assets/media/svg/saikitchen/perso.svg"  alt="">
                         </span>
                     </div>
                     <!--end::Symbol-->
                     <!--begin::Section-->
                     <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                         <div class="flex-grow-1 me-2">
                             <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bolder">`+response.data.topFivePaidCustomers[i].name+`</a>
                             <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;">`+response.data.topFivePaidCustomers[i].customerContact+`</span>
                         </div>
                         <div class="flex-grow-1 me-2" style="text-align: right;">
                         <span class="badge badge-light fw-bolder ">AED `+response.data.topFivePaidCustomers[i].amountRecieved+` </span>
                         <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;">paid</span>
                          </div>
                     </div>
                     <!--end::Section-->
                 </div>
                 <!--end::Item-->`;
            }
            for (let i = 0; i < response.data.topFiveNewCustomers.length; i++) {
                 document.getElementById('topFiveNewCustomers').innerHTML += 
                 `<!--begin::Item-->
                 <div class="d-flex align-items-sm-center mb-7">
                     <!--begin::Symbol-->
                     <div class="symbol symbol-50px me-5" style="margin-right: 1.25rem!important;">
                         <span class="symbol-label" >
                             <img src="/assets/media/svg/saikitchen/perso.svg"  alt="">
                         </span>
                     </div>
                     <!--end::Symbol-->
                     <!--begin::Section-->
                     <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                         <div class="flex-grow-1 me-2">
                             <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bolder">`+response.data.topFiveNewCustomers[i].name+`</a>
                             <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;">`+response.data.topFiveNewCustomers[i].customerContact+`</span>
                         </div>
                         
                     </div>
                     <!--end::Section-->
                 </div>
                 <!--end::Item-->`; 
            }
            document.getElementById("EmployeesNum").innerHTML = response.data.employees.length +" Working Employee";
            for (let i = 0; i < response.data.employees.length; i++) {
                document.getElementById('MyEmployees').innerHTML += 
                `<!--begin::Item-->
                <div class="d-flex align-items-sm-center mb-7">
                    <!--begin::Symbol-->
                    <div class="symbol symbol-50px me-5" style="margin-right: 1.25rem!important;">
                        <span class="symbol-label" >
                            <img src="/assets/media/svg/saikitchen/perso.svg"  alt="">
                        </span>
                    </div>
                    <!--end::Symbol-->
                    <!--begin::Section-->
                    <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                        <div class="flex-grow-1 me-2">
                            <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bolder">`+response.data.employees[i].name+`</a>
                            <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;">`+response.data.employees[i].contact +`</span>
                        </div>
                        <div class="flex-grow-1 me-2" style="text-align: right;">
                        <span class="badge badge-light fw-bolder " style="font-size: 10px;">`+response.data.employees[i].position +` </span>
                        <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;"></span>
                         </div>
                    </div>
                    <!--end::Section-->
                </div>
                <!--end::Item-->`; 
           }
            datasource1 =[];datasource2=[];
            for (let i = 0; i < response.data.inquiryReceivedDetails.length; i++) {
                let inquiryCode = response.data.inquiryReceivedDetails[i].inquiryCode;
                let workscope ="";
                for (let l = 0; l < response.data.inquiryReceivedDetails[i].workscopeName.length ; l++) {
                      if (l < response.data.inquiryReceivedDetails[i].workscopeName.length -1)
                        workscope += response.data.inquiryReceivedDetails[i].workscopeName[l] +',';
                      else
                      workscope += response.data.inquiryReceivedDetails[i].workscopeName[l];
                }
                let customerName = response.data.inquiryReceivedDetails[i].customerName;
                let contactinfo = `<span style="display: flex;">`+'+'+ response.data.inquiryReceivedDetails[i].mobileNomber +`</span><span style="opacity:40%">`+ response.data.inquiryReceivedDetails[i].email +`</span>`;
                let paymentMethod ='';let paymentMode ='';
                if(response.data.inquiryReceivedDetails[i].reportPayments.length > 0){
                 paymentMethod = response.data.inquiryReceivedDetails[i].reportPayments[0].paymentMethod;
                 paymentMode = response.data.inquiryReceivedDetails[i].reportPayments[0].paymentType;
                }
                let amountRecieved = response.data.inquiryReceivedDetails[i].amountRecieved;
                let temparr =[inquiryCode,workscope,customerName,contactinfo,paymentMethod,paymentMode,amountRecieved];
                datasource1.push(temparr);
                datasource1.push(temparr);
            }
            for (let i = 0; i < response.data.inquiryPendingDetails.length; i++) {
                let inquiryCode = response.data.inquiryPendingDetails[i].inquiryCode;
                let workscope ="";
                for (let l = 0; l < response.data.inquiryPendingDetails[i].workscopeName.length ; l++) {
                      if (l < response.data.inquiryPendingDetails[i].workscopeName.length -1)
                        workscope += response.data.inquiryPendingDetails[i].workscopeName[l] +',';
                      else
                      workscope += response.data.inquiryPendingDetails[i].workscopeName[l];
                }
                let customerName = response.data.inquiryPendingDetails[i].customerName;
                let contactinfo = `<span style="display: flex;">`+'+'+response.data.inquiryPendingDetails[i].mobileNomber +`</span><span style="opacity:40%">`+ response.data.inquiryPendingDetails[i].email +`</span>`;
                let paymentMethod ='';let paymentMode ='';
                if(response.data.inquiryPendingDetails[i].reportPayments.length > 0){
                 paymentMethod = response.data.inquiryPendingDetails[i].reportPayments[0].paymentMethod;
                 paymentMode = response.data.inquiryPendingDetails[i].reportPayments[0].paymentType;
                }
                 
                let amountPending = response.data.inquiryPendingDetails[i].amountPending;
                let temparr =[inquiryCode,workscope,customerName,contactinfo,paymentMethod,paymentMode,amountPending];
                datasource2.push(temparr);
                datasource2.push(temparr);
            }
            if ( $.fn.dataTable.isDataTable( '#kt_datatable_example_4' ) ) {
                example.destroy();
                $('#kt_datatable_example_4').empty(); 
              }
              example = $('#kt_datatable_example_4').DataTable({
                data: datasource1,
                columns: columnName,
                "searching": false, 
                "lengthChange": false
              } );
              document.getElementById("load").style.display = 'none';
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
            document.getElementById("load").style.display = 'none';
        }
    });

  });
  $('#btnPending').click(function (){
    if ( $.fn.dataTable.isDataTable( '#kt_datatable_example_4' ) ) {
        example.destroy();
        $('#kt_datatable_example_4').empty(); 
    }
    example = $('#kt_datatable_example_4').DataTable({
        data: datasource2,
            columns: columnName,
            "searching": false, 
            "lengthChange": false
    } );
    });
    $.ajax({
		type: "get",
		url: baseURL + '/Branch/GetBranches',

		headers: {
			'Content-Type': 'application/json',
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
				
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {

		}
	});
    $('#btnRecieved').click(function (){
        if ( $.fn.dataTable.isDataTable( '#kt_datatable_example_4' ) ) {
            example.destroy();
            $('#kt_datatable_example_4').empty(); 
        }
        example = $('#kt_datatable_example_4').DataTable({
            data: datasource1,
                columns: columnName,
                "searching": false, 
                "lengthChange": false
        } );
        });



        jQuery(document).ready(function () {
            document.getElementById("kt_apexcharts_3").innerHTML='';
            document.getElementById("kt_apexcharts_4").innerHTML='';
            document.getElementById("topFivePaidCustomers").innerHTML='';
            document.getElementById("topFiveNewCustomers").innerHTML='';
            document.getElementById("MyEmployees").innerHTML='';
        
            document.getElementById("load").style.removeProperty('display');
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            var date = new Date();
            var myDate = new Date(); 
            $('#kt_daterangepicker_2').val(today).datepicker("update");          
            myDate.setMonth(date.getMonth() - 1);
            var dd = String(myDate.getDate()).padStart(2, '0');
            var mm = String(myDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = myDate.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            $('#kt_daterangepicker_1').val(today).datepicker("update");

            var obj={
                "id":parseInt(document.getElementById('kt_select_branch').value),
                "startDate": $('#kt_daterangepicker_1').val(),
                "endDate": $('#kt_daterangepicker_2').val()
            }
            const data = JSON.stringify(obj);
            console.log(data);
            $.ajax({
                type: "post",
                url: baseURL + '/Report/GetReportForBranch' ,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                success: function(response) {
                    console.log(response);
                    var series =[];
                    var labels =[];
                    
                    for (let i = 0; i < response.data.customerContactSources.length; i++) {
                        series.push(response.data.customerContactSources[i].percentage);
                        labels.push(response.data.customerContactSources[i].contactMode);
                    }
                    var options = {
                        series: series,
                        chart: {
                        type: 'donut',
                        height:'263px',
                        
                    },
                    labels: labels,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                        chart: {
                            width: 300,
                            
                        },
                        legend: {
                            position: 'bottom'
                        }
                        }
                    }],
                    legend: {
                        position: 'bottom',
                      }
                    };
                    var chart = new ApexCharts(document.querySelector("#chart"), options);
                    chart.render();
                    series= [];
                    labels=[];
                    for (let i = 0; i < response.data.receivedPaymentModes.length; i++) {
                        series.push(response.data.receivedPaymentModes[i].percentage);
                        labels.push(response.data.receivedPaymentModes[i].paymentMode);
                    }
                    var options = {
                        series: series,
                        chart: {
                        type: 'donut',
                        height:'263px',
                        
                    },
                    labels: labels,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                        chart: {
                            width: 300,
                            
                        },
                        legend: {
                            position: 'bottom'
                        }
                        }
                    }],
                    legend: {
                        position: 'bottom',
                      }
                    };
                    var chart1 = new ApexCharts(document.querySelector("#chart1"), options);
                    chart1.render();
        
                    //customer statsfication chart 
                    var ydatachart=[];
                    var xdatachart=[];
                    var element = document.getElementById('kt_apexcharts_3');
                    
                    //ydatachart =[30, 40, 40, 90, 90, 70, 70];
                   // xdatachart = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                   for (let i = 0; i < response.data.customerSatisfaction.length; i++) {
                    xdatachart.push( response.data.customerSatisfaction[i].month);
                    ydatachart.push(response.data.customerSatisfaction[i].avarege);
                   }
                    var options1 = {
                        series: [{
                            name: 'Customer satisfaction',
                            data: ydatachart
                        }],
                        chart: {
                            fontFamily: 'inherit',
                            type: 'area',
                            height: height,
                            toolbar: {
                                show: false
                            }
                        },
                        legend: {
                            show: false
                        },
                        dataLabels: {
                            enabled: false
                        },
                        fill: {
                            type: 'solid',
                            opacity: 1
                        },
                        stroke: {
                            curve: 'smooth',
                            show: true,
                            width: 3,
                            colors: [baseColor]
                        },
                        xaxis: {
                            categories: xdatachart,
                            axisBorder: {
                                show: false,
                            },
                            axisTicks: {
                                show: false
                            },
                            labels: {
                                style: {
                                    colors: labelColor,
                                    fontSize: '0px'
                                }
                            },
                            crosshairs: {
                                position: 'front',
                                stroke: {
                                    color: baseColor,
                                    width: 1,
                                    dashArray: 3
                                }
                            },
                            tooltip: {
                                enabled: true,
                                formatter: undefined,
                                offsetY: 0,
                                style: {
                                    fontSize: '12px'
                                }
                            }
                        },
                        yaxis: {
                            
                            labels: {
                                style: {
                                    colors: labelColor,
                                    fontSize: '0px'
                                }
                            }
                        },
                        states: {
                            normal: {
                                filter: {
                                    type: 'none',
                                    value: 0
                                }
                            },
                            hover: {
                                filter: {
                                    type: 'none',
                                    value: 0
                                }
                            },
                            active: {
                                allowMultipleDataPointsSelection: false,
                                filter: {
                                    type: 'none',
                                    value: 0
                                }
                            }
                        },
                        tooltip: {
                            style: {
                                fontSize: '12px'
                            },
                            y: {
                                formatter: function (val) {
                                   // return '$' + val + ' thousands'
                                }
                            }
                        },
                        colors: [lightColor],
                        grid: {
                            borderColor: borderColor,
                            strokeDashArray: 1,
                            yaxis: {
                                lines: {
                                    show: true
                                }
                            }
                        },
                        markers: {
                            strokeColor: baseColor,
                            strokeWidth: 3
                        }
                    };
                    var chart2 = new ApexCharts(element, options1);
                    chart2.render();
        
                    //recieved data chart
                    var element1 = document.getElementById('kt_apexcharts_4');
                    //ydatachart =[10, 20, 30, 40, 50, 60, 70];
                    //xdatachart = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                    xdatachart =[];
                    ydatachart =[];
                    for (let i = 0; i < response.data.monthlyAmountReceived.length; i++) {
                        xdatachart.push( response.data.monthlyAmountReceived[i].month);
                        ydatachart.push(response.data.monthlyAmountReceived[i].avarege);
                       }
                    var options2 = {
                        series: [{
                            name: 'Customer satisfaction',
                            data: ydatachart
                        }],
                        chart: {
                            fontFamily: 'inherit',
                            type: 'area',
                            height: height,
                            toolbar: {
                                show: false
                            }
                        },
                        legend: {
                            show: false
                        },
                        dataLabels: {
                            enabled: false
                        },
                        fill: {
                            type: 'solid',
                            opacity: 1
                        },
                        stroke: {
                            curve: 'smooth',
                            show: true,
                            width: 3,
                            colors: [baseColor]
                        },
                        xaxis: {
                            categories: xdatachart,
                            axisBorder: {
                                show: false,
                            },
                            axisTicks: {
                                show: false
                            },
                            labels: {
                                style: {
                                    colors: labelColor,
                                    fontSize: '0px'
                                }
                            },
                            crosshairs: {
                                position: 'front',
                                stroke: {
                                    color: baseColor,
                                    width: 1,
                                    dashArray: 3
                                }
                            },
                            tooltip: {
                                enabled: true,
                                formatter: undefined,
                                offsetY: 0,
                                style: {
                                    fontSize: '12px'
                                }
                            }
                        },
                        yaxis: {
                            
                            labels: {
                                style: {
                                    colors: labelColor,
                                    fontSize: '0px'
                                }
                            }
                        },
                        states: {
                            normal: {
                                filter: {
                                    type: 'none',
                                    value: 0
                                }
                            },
                            hover: {
                                filter: {
                                    type: 'none',
                                    value: 0
                                }
                            },
                            active: {
                                allowMultipleDataPointsSelection: false,
                                filter: {
                                    type: 'none',
                                    value: 0
                                }
                            }
                        },
                        tooltip: {
                            style: {
                                fontSize: '12px'
                            },
                            y: {
                                formatter: function (val) {
                                   // return '$' + val + ' thousands'
                                }
                            }
                        },
                        colors: [lightColor],
                        grid: {
                            borderColor: borderColor,
                            strokeDashArray: 1,
                            yaxis: {
                                lines: {
                                    show: true
                                }
                            }
                        },
                        markers: {
                            strokeColor: baseColor,
                            strokeWidth: 1
                        }
                    };
                    var chart3 = new ApexCharts(element1, options2);
                    chart3.render();
        
                    document.getElementById("needToContact").innerHTML = response.data.amountReceived;
                    document.getElementById("amountrecived").innerHTML = 'AED '+response.data.amountReceived;
                    document.getElementById("amountpending").innerHTML = response.data.amountPending;
                    document.getElementById("quotationaccepted").innerHTML = response.data.quotationAccepted;
                    document.getElementById("quotationrejected").innerHTML = response.data.quotationRejected;
                    document.getElementById("quotationpending").innerHTML = response.data.quotationPending;
                    document.getElementById("inquirescompleted").innerHTML = response.data.inquiriesCompleted;
                    document.getElementById("customerSatisfy").innerHTML = response.data.customerSatisfy+'%';
                    for (let i = 0; i < response.data.topFivePaidCustomers.length; i++) {
                         document.getElementById('topFivePaidCustomers').innerHTML += 
                         `<!--begin::Item-->
                         <div class="d-flex align-items-sm-center mb-7">
                             <!--begin::Symbol-->
                             <div class="symbol symbol-50px me-5" style="margin-right: 1.25rem!important;">
                                 <span class="symbol-label" >
                                     <img src="/assets/media/svg/saikitchen/perso.svg"  alt="">
                                 </span>
                             </div>
                             <!--end::Symbol-->
                             <!--begin::Section-->
                             <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                                 <div class="flex-grow-1 me-2">
                                     <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bolder">`+response.data.topFivePaidCustomers[i].name+`</a>
                                     <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;">`+response.data.topFivePaidCustomers[i].customerContact+`</span>
                                 </div>
                                 <div class="flex-grow-1 me-2" style="text-align: right;">
                                 <span class="badge badge-light fw-bolder ">AED `+response.data.topFivePaidCustomers[i].amountRecieved+` </span>
                                 <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;">paid</span>
                                  </div>
                             </div>
                             <!--end::Section-->
                         </div>
                         <!--end::Item-->`;
                    }
                    for (let i = 0; i < response.data.topFiveNewCustomers.length; i++) {
                         document.getElementById('topFiveNewCustomers').innerHTML += 
                         `<!--begin::Item-->
                         <div class="d-flex align-items-sm-center mb-7">
                             <!--begin::Symbol-->
                             <div class="symbol symbol-50px me-5" style="margin-right: 1.25rem!important;">
                                 <span class="symbol-label" >
                                     <img src="/assets/media/svg/saikitchen/perso.svg"  alt="">
                                 </span>
                             </div>
                             <!--end::Symbol-->
                             <!--begin::Section-->
                             <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                                 <div class="flex-grow-1 me-2">
                                     <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bolder">`+response.data.topFiveNewCustomers[i].name+`</a>
                                     <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;">`+response.data.topFiveNewCustomers[i].customerContact+`</span>
                                 </div>
                                 
                             </div>
                             <!--end::Section-->
                         </div>
                         <!--end::Item-->`; 
                    }
                    document.getElementById("EmployeesNum").innerHTML = response.data.employees.length +" Working Employee";
                    for (let i = 0; i < response.data.employees.length; i++) {
                        document.getElementById('MyEmployees').innerHTML += 
                        `<!--begin::Item-->
                        <div class="d-flex align-items-sm-center mb-7">
                            <!--begin::Symbol-->
                            <div class="symbol symbol-50px me-5" style="margin-right: 1.25rem!important;">
                                <span class="symbol-label" >
                                    <img src="/assets/media/svg/saikitchen/perso.svg"  alt="">
                                </span>
                            </div>
                            <!--end::Symbol-->
                            <!--begin::Section-->
                            <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                                <div class="flex-grow-1 me-2">
                                    <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bolder">`+response.data.employees[i].name+`</a>
                                    <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;">`+response.data.employees[i].contact +`</span>
                                </div>
                                <div class="flex-grow-1 me-2" style="text-align: right;">
                                <span class="badge badge-light fw-bolder " style="font-size: 10px;">`+response.data.employees[i].position +` </span>
                                <span class="text-muted fw-bold d-block fs-7" style="font-size: 10px;"></span>
                                 </div>
                            </div>
                            <!--end::Section-->
                        </div>
                        <!--end::Item-->`; 
                   }
                    datasource1 =[];datasource2=[];
                    for (let i = 0; i < response.data.inquiryReceivedDetails.length; i++) {
                        let inquiryCode = response.data.inquiryReceivedDetails[i].inquiryCode;
                        let workscope ="";
                        for (let l = 0; l < response.data.inquiryReceivedDetails[i].workscopeName.length ; l++) {
                              if (l < response.data.inquiryReceivedDetails[i].workscopeName.length -1)
                                workscope += response.data.inquiryReceivedDetails[i].workscopeName[l] +',';
                              else
                              workscope += response.data.inquiryReceivedDetails[i].workscopeName[l];
                        }
                        let customerName = response.data.inquiryReceivedDetails[i].customerName;
                        let contactinfo = `<span style="display: flex;">`+'+'+ response.data.inquiryReceivedDetails[i].mobileNomber +`</span><span style="opacity:40%">`+ response.data.inquiryReceivedDetails[i].email +`</span>`;
                        let paymentMethod ='';let paymentMode ='';
                        if(response.data.inquiryReceivedDetails[i].reportPayments.length > 0){
                         paymentMethod = response.data.inquiryReceivedDetails[i].reportPayments[0].paymentMethod;
                         paymentMode = response.data.inquiryReceivedDetails[i].reportPayments[0].paymentType;
                        }
                        let amountRecieved = response.data.inquiryReceivedDetails[i].amountRecieved;
                        let temparr =[inquiryCode,workscope,customerName,contactinfo,paymentMethod,paymentMode,amountRecieved];
                        datasource1.push(temparr);
                        datasource1.push(temparr);
                    }
                    for (let i = 0; i < response.data.inquiryPendingDetails.length; i++) {
                        let inquiryCode = response.data.inquiryPendingDetails[i].inquiryCode;
                        let workscope ="";
                        for (let l = 0; l < response.data.inquiryPendingDetails[i].workscopeName.length ; l++) {
                              if (l < response.data.inquiryPendingDetails[i].workscopeName.length -1)
                                workscope += response.data.inquiryPendingDetails[i].workscopeName[l] +',';
                              else
                              workscope += response.data.inquiryPendingDetails[i].workscopeName[l];
                        }
                        let customerName = response.data.inquiryPendingDetails[i].customerName;
                        let contactinfo = `<span style="display: flex;">`+'+'+response.data.inquiryPendingDetails[i].mobileNomber +`</span><span style="opacity:40%">`+ response.data.inquiryPendingDetails[i].email +`</span>`;
                        let paymentMethod ='';let paymentMode ='';
                        if(response.data.inquiryPendingDetails[i].reportPayments.length > 0){
                         paymentMethod = response.data.inquiryPendingDetails[i].reportPayments[0].paymentMethod;
                         paymentMode = response.data.inquiryPendingDetails[i].reportPayments[0].paymentType;
                        }
                         
                        let amountPending = response.data.inquiryPendingDetails[i].amountPending;
                        let temparr =[inquiryCode,workscope,customerName,contactinfo,paymentMethod,paymentMode,amountPending];
                        datasource2.push(temparr);
                        datasource2.push(temparr);
                    }
                    if ( $.fn.dataTable.isDataTable( '#kt_datatable_example_4' ) ) {
                        example.destroy();
                        $('#kt_datatable_example_4').empty(); 
                      }
                      example = $('#kt_datatable_example_4').DataTable({
                        data: datasource1,
                        columns: columnName,
                        "searching": false, 
                        "lengthChange": false
                      } );
                      document.getElementById("load").style.display = 'none';
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                    document.getElementById("load").style.display = 'none';
                }
            });
        });