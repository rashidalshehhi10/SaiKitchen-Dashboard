"use strict";
// Class definition

import {
    baseURL
} from './constant.js'


// List of all countries in a simple list / array.
// Sorted alphabetical by country name (special characters on bottom)
const countryList = ["United Arab Emirates", "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State Of", "Bonaire, Sint Eustatius And Saba", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension And Tristan Da Cunha", "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin (french Part)", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic Of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];


let user;
let datatable;
let customerData;

let permissions;
let customerPermission;
jQuery(document).ready(function() {

    var login = localStorage.getItem("user");
    if (login !== null) {
        user = JSON.parse(login);
        console.log(user);
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 5) {
                customerPermission = permissions[i].permissionLevelId;
                console.log(customerPermission);
            }
        }
        if(customerPermission==null){
            window.location.replace("index.html");
            }

        if (customerPermission >= 2) {
            document.getElementById('btnNewCustomer').innerHTML += `	<!--begin::Button-->
			<button type="button" onclick="customFormReset();" data-target="#addCustomer" data-toggle="modal"
				class="btn btn-primary font-weight-bolder">
				<span class="svg-icon svg-icon-md">
					<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Flatten.svg-->
					<svg xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
						height="24px" viewBox="0 0 24 24" version="1.1">
						<g stroke="none" stroke-width="1" fill="none"
							fill-rule="evenodd">
							<rect x="0" y="0" width="24" height="24" />
							<circle fill="#000000" cx="9" cy="15" r="6" />
							<path
								d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z"
								fill="#000000" opacity="0.3" />
						</g>
					</svg>
					<!--end::Svg Icon-->
				</span>New Customer</button>
			<!--end::Button-->`;
        }
    }
    KTAppsUsersListDatatable.init();



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
        success: function(response) {
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
        success: function(response) {
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


    $('#kt_country_of_Resdience').on('change', function() {
        // var countrylist = {
        // 	country: "string"
        // };
        var country = $('#kt_country_of_Resdience').val();

        // const data = JSON.stringify(countrylist);
        // console.log(data);
        GetCity(country);
    });

    var addressPicker = new AddressPicker();

    $('#customerAddress').typeahead(null, {
        displayKey: 'description',
        source: addressPicker.ttAdapter()
    });
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
        success: function(response) {
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
        error: function(XMLHttpRequest, textStatus, errorThrown) {}
    });
}

var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
    type: 'donut',
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };
  var chart1 = new ApexCharts(document.querySelector("#chart1"), options);
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart1.render();
  chart.render();



  var element = document.getElementById('kt_apexcharts_3');
  var element1 = document.getElementById('kt_apexcharts_4');
var height = parseInt(KTUtil.css(element, 'height'));
var labelColor ='#F1583E' ;//KTUtil.getCssVariableValue('--bs-gray-500');
var borderColor ='#FFF6F0' ; //KTUtil.getCssVariableValue('--bs-gray-200');
var baseColor ='#F1583E' ; //KTUtil.getCssVariableValue('--bs-info');
var lightColor = '#FFF6F0' ;//KTUtil.getCssVariableValue('--bs-light-info');

/*if (!element) {
    return;
}*/

var options1 = {
    series: [{
        name: 'Net Profit',
        data: [30, 40, 40, 90, 90, 70, 70]
    }],
    chart: {
        fontFamily: 'inherit',
        type: 'area',
        height: height,
        toolbar: {
            show: false
        }
    },
    plotOptions: {

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
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
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
                return '$' + val + ' thousands'
            }
        }
    },
    colors: [lightColor],
    grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
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
var chart3 = new ApexCharts(element1, options1);
chart3.render();


$("#kt_datatable_example_4").DataTable({
    "footerCallback": function(row, data, start, end, display) {
        var api = this.api(),
            data;

        // Remove the formatting to get integer data for summation
        var intVal = function(i) {
            return typeof i === "string" ?
                i.replace(/[\$,]/g, "") * 1 :
                typeof i === "number" ?
                i : 0;
        };

        // Total over all pages
        var total = api
            .column(4)
            .data()
            .reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);

        // Total over this page
        var pageTotal = api
            .column(4, {
                page: "current"
            })
            .data()
            .reduce(function(a, b) {
                return intVal(a) + intVal(b);
            }, 0);

        // Update footer
        $(api.column(4).footer()).html(
            "$" + pageTotal + " ( $" + total + " total)"
        );
    }
});