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
var KTAppsUsersListDatatable = function() {
    // Private functions

    // basic demo
    var _demo = function() {
        datatable = $('#kt_datatable').KTDatatable({
            // datasource definition
            dom: 'Bfrtip',
            buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
            ],
            data: {

                type: 'remote',
                source: {
                    read: {
                        url: baseURL + '/Customer/GetCustomerOfBranch?branchId=' + user.data.userRoles[0].branchId,
                    },
                },
                pageSize: 10, // display 20 records per page
                serverPaging: true,
                serverFiltering: false,
                serverSorting: false,
            },

            // layout definition
            layout: {
                scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            processing: true,
            serverSide: false,
            search: {
                input: $('#kt_subheader_search_form'),
                delay: 0,
                key: 'generalSearch'
            },

            // columns definition
            columns: [{
                    field: 'CustomerId',
                    title: '#',
                    sortable: 'asc',
                    width: 40,
                    type: 'number',
                    selector: false,
                    textAlign: 'left',
                    template: function(data) {
                        customerData = data;
                        console.log(customerData);
                        $("#totalCustomer").html(data.totalCustomers);
                        $("#contactedCustomer").html(data.contactedCustomers);
                        $("#needToContact").html(data.needToContactCustomers);
                        $("#noInquiryCustomer").html(data.customerWithoutInquiry);
                        return '<span class="font-weight-bolder">' + data.customerId + '</span>';

                    }
                },

                {
                    field: 'Code',
                    title: 'Code',
                    autoHide: true,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        // var status = {
                        // 	1: {'title': 'Paid', 'class': ' label-light-primary'},
                        // 	2: {'title': 'Approved', 'class': ' label-light-danger'},
                        // 	3: {'title': 'Pending', 'class': ' label-light-primary'},
                        // 	4: {'title': 'Rejected', 'class': ' label-light-success'}
                        // };
                        // var index = KTUtil.getRandomInt(1, 4);
                        if (data.code !== null) {
                            output += '<div class="font-weight-bolder text-primary mb-0">' + data.code + '</div>';
                            // output += '<div class="text-muted">' + status[index].title + '</div>';
                        }
                        return output;
                    },
                }, {
                    field: 'CustomerName',
                    title: 'name',
                    width: 250,
                    template: function(data) {
                        // var number = KTUtil.getRandomInt(1, 14);
                        // var user_img = '100_' + number + '.jpg';

                        var output = '';
                        // if (number > 8) {
                        // 	output = '<div class="d-flex align-items-center">\
                        // 		<div class="symbol symbol-40 symbol-sm flex-shrink-0">\
                        // 			<img class="" src="assets/media/users/' + user_img + '" alt="photo">\
                        // 		</div>\
                        // 		<div class="ml-4">\
                        // 			<div class="text-dark-75 font-weight-bolder font-size-lg mb-0">' + data.CompanyAgent + '</div>\
                        // 			<a href="#" class="text-muted font-weight-bold text-hover-primary">' + data.CompanyEmail + '</a>\
                        // 		</div>\
                        // 	</div>';
                        // }
                        // else {
                        var stateNo = KTUtil.getRandomInt(0, 7);
                        var states = [
                            'success',
                            'primary',
                            'danger',
                            'success',
                            'warning',
                            'dark',
                            'primary',
                            'info'
                        ];
                        var state = states[stateNo];

                        output = '<div class="d-flex align-items-center">\
								<div class="symbol symbol-40 symbol-light-' + state + ' flex-shrink-0">\
									<span class="symbol-label font-size-h4 font-weight-bold">' + data.customerName.substring(0, 1) + '</span>\
								</div>\
								<div class="ml-4">\
									<div class="text-dark-75 font-weight-bolder font-size-lg mb-0">' + data.customerName + '</div>\
									<a href="javascript:;" class="text-muted font-weight-bold text-hover-primary">' + data.customerEmail + '</a>\
								</div>\
							</div>';
                        // }

                        return output;
                    }
                }, {
                    field: 'Country',
                    title: 'Country',
                    template: function(data) {
                        var output = '';

                        output += '<div class="font-weight-bolder font-size-lg mb-0">' + data.customerCountry + '</div>';
                        output += '<div class="font-weight-bold text-muted">Nationality: ' + data.customerNationality + '</div>';

                        return output;
                    }
                }, {
                    field: 'Phone',
                    title: 'Contact',
                    autoHide: false,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        // var status = {
                        // 	1: {'title': 'Paid', 'class': ' label-light-primary'},
                        // 	2: {'title': 'Approved', 'class': ' label-light-danger'},
                        // 	3: {'title': 'Pending', 'class': ' label-light-primary'},
                        // 	4: {'title': 'Rejected', 'class': ' label-light-success'}
                        // };
                        // var index = KTUtil.getRandomInt(1, 4);

                        output += '<div class="font-weight-bolder text-primary mb-0">' + data.customerContact + '</div>';
                        // output += '<div class="text-muted">' + status[index].title + '</div>';

                        return output;
                    },
                },{
                    field: 'TotalNoOfInquiries',
                    title: 'Total Inquiries',
                    autoHide: true,
                    // overflow: 'visible',
                    // callback function support for column rendering
                    template: function(data) {
                       // if(data.totalNoOfInquiries==0)
                       //    data.totalNoOfInquiries ='No Inquiries';
                        //if(data.totalNoOfInquiries!=0)
                        //   return '<span class="label label-lg font-weight-bold  label-inline">' +data.totalNoOfInquiries + '</span>';
                       // else
                           return '<span class="label label-lg font-weight-bold  label-inline">'+data.totalNoOfInquiries+'</span>';

                    },
                }, {
                    field: 'ContactStatus',
                    title: 'Contact Status',
                    autoHide: true,
                    // overflow: 'visible',
                    // callback function support for column rendering
                    template: function(data) {
                        var status = {
                            1: {
                                'title': 'Contacted',
                                'class': ' label-light-primary'
                            },
                            2: {
                                'title': 'Need to Contact',
                                'class': ' label-light-danger'
                            }
                        };
                        return '<span class="label label-lg font-weight-bold ' + status[data.contactStatusId].class + ' label-inline">' +data.contactStatus + '</span>';

                    },
                }, {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    // width: 130,
                    // overflow: 'visible',
                    autoHide: false,
                    template: function(data) {
                        if (customerPermission >= 3) {
                            var action = '\
<button type="button"  onclick="getCustomerById(\'' + baseURL + '\',\'' + data.customerId + '\');"  class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2" title="Edit details">\
			<span class="svg-icon svg-icon-md">\
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
						<rect x="0" y="0" width="24" height="24"/>\
						<path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "/>\
						<path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>\
					</g>\
				</svg>\
			</span>\
		</button>\
		';
                            if (customerPermission >= 5) {
                                action += '\
			<button type="button"  onclick="deleteCustomerById(\'' + baseURL + '\',\'' + data.customerId + '\');"  class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon" title="Delete">\
			<span class="svg-icon svg-icon-md">\
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
						<rect x="0" y="0" width="24" height="24"/>\
						<path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>\
						<path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>\
					</g>\
				</svg>\
			</span>\
		</button>\
		';
                            }
                            return action;
                        } else {
                            return `<span></span>`;
                        }
                    },
                }, {
                    field: 'WayofContact',
                    title: 'Way of Contact',
                    autoHide: true,
                    // callback function support for column rendering
                    template: function(data) {
                        var status = {
                            1: {
                                'title': 'Direct',
                                'class': ' label-light-primary'
                            },
                            2: {
                                'title': 'Google',
                                'class': ' label-light-danger'
                            },
                            3: {
                                'title': 'Facebook',
                                'class': ' label-light-primary'
                            },
                            4: {
                                'title': 'Linkedin',
                                'class': ' label-light-success'
                            },
                            5: {
                                'title': 'Twitter',
                                'class': ' label-light-info'
                            },
                            6: {
                                'title': 'Friends recommended',
                                'class': ' label-light-primary'
                            },
                            7: {
                                'title': 'Website',
                                'class': ' label-light-danger'
                            },
                            8: {
                                'title': 'Mobile App',
                                'class': ' label-light-primary'
                            },
                            9: {
                                'title': 'Owner Reference',
                                'class': ' label-light-info'
                            },
                            10: {
                                'title': 'Instagram',
                                'class': ' label-light-primary'
                            },
                            11: {
                                'title': 'Other',
                                'class': ' label-light-info'
                            }
                        };
                        return '<span class="label label-lg font-weight-bold ' + status[data.wayofContactId].class + ' label-inline">' + status[data.wayofContactId].title + '</span>';

                    },
                },
                {
                    field: 'Address',
                    title: 'Address',
                    autoHide: true,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        // var status = {
                        // 	1: {'title': 'Paid', 'class': ' label-light-primary'},
                        // 	2: {'title': 'Approved', 'class': ' label-light-danger'},
                        // 	3: {'title': 'Pending', 'class': ' label-light-primary'},
                        // 	4: {'title': 'Rejected', 'class': ' label-light-success'}
                        // };
                        // var index = KTUtil.getRandomInt(1, 4);
                        if (data.customerAddress !== null) {
                            output += '<div class="font-weight-bolder text-primary mb-0">' + data.customerAddress + '</div>';
                            // output += '<div class="text-muted">' + status[index].title + '</div>';
                        }
                        return output;
                    },
                },
                {
                    field: 'City',
                    title: 'City',
                    autoHide: true,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        // var status = {
                        // 	1: {'title': 'Paid', 'class': ' label-light-primary'},
                        // 	2: {'title': 'Approved', 'class': ' label-light-danger'},
                        // 	3: {'title': 'Pending', 'class': ' label-light-primary'},
                        // 	4: {'title': 'Rejected', 'class': ' label-light-success'}
                        // };
                        // var index = KTUtil.getRandomInt(1, 4);
                        if (data.customerCity !== null) {
                            output += '<div class="font-weight-bolder text-primary mb-0">' + data.customerCity + '</div>';
                            // output += '<div class="text-muted">' + status[index].title + '</div>';
                        }
                        return output;
                    },
                }, {
                    field: 'CustomerNextMeetingDate',
                    title: 'Next Follow-up Date',
                    autoHide: true,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        // var status = {
                        // 	1: {'title': 'Paid', 'class': ' label-light-primary'},
                        // 	2: {'title': 'Approved', 'class': ' label-light-danger'},
                        // 	3: {'title': 'Pending', 'class': ' label-light-primary'},
                        // 	4: {'title': 'Rejected', 'class': ' label-light-success'}
                        // };
                        // var index = KTUtil.getRandomInt(1, 4);
                        if (data.customerNextMeetingDate !== null) {
                            output += '<div class="font-weight-bolder text-primary mb-0">' + data.customerNextMeetingDate + '</div>';
                            // output += '<div class="text-muted">' + status[index].title + '</div>';
                        }
                        return output;
                    },
                }, {
                    field: 'CustomerNotes',
                    title: 'Customer Notes',
                    autoHide: true,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        // var status = {
                        // 	1: {'title': 'Paid', 'class': ' label-light-primary'},
                        // 	2: {'title': 'Approved', 'class': ' label-light-danger'},
                        // 	3: {'title': 'Pending', 'class': ' label-light-primary'},
                        // 	4: {'title': 'Rejected', 'class': ' label-light-success'}
                        // };
                        // var index = KTUtil.getRandomInt(1, 4);
                        if (data.customerNotes !== null) {
                            output += '<div class="font-weight-bolder text-primary mb-0">' + data.customerNotes + '</div>';
                            // output += '<div class="text-muted">' + status[index].title + '</div>';
                        }
                        return output;
                    },
                },
                {
                    field: 'EmiratesId',
                    title: 'Makani#/Map URL',
                    autoHide: true,
                    // type: 'date',
                    // format: 'MM/DD/YYYY',
                    template: function(data) {
                        var output = '';

                        // var status = {
                        // 	1: {'title': 'Paid', 'class': ' label-light-primary'},
                        // 	2: {'title': 'Approved', 'class': ' label-light-danger'},
                        // 	3: {'title': 'Pending', 'class': ' label-light-primary'},
                        // 	4: {'title': 'Rejected', 'class': ' label-light-success'}
                        // };
                        // var index = KTUtil.getRandomInt(1, 4);
                        if (data.customerNationalId !== null) {
                            output += '<div class="font-weight-bolder text-primary mb-0"><a href='+data.customerNationalId+' target="_blank">' + data.customerNationalId + '</a></div>';
                            // output += '<div class="text-muted">' + status[index].title + '</div>';
                        }
                        return output;
                    },
                }, {
                    field: 'AddedBy',
                    title: 'Added By',
                    autoHide: true,
                    template: function(data) {
                        var output = '';

                        output += '<div class="font-weight-bold text-muted">' + data.userName + '</div>';

                        return output;
                    }
                }
            ],
        });

         $('#kt_subheader_search_form').on('blur', function() {
            datatable.search($(this).val().toLowerCase());
        }); 

        $('#kt_datatable_contact_statuss').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#divclk').on('click', function() {
           document.getElementById("kt_subheader_search_form").value = 'Need to Contact';
           datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
        });

        $('#divclk2').on('click', function() {
            document.getElementById("kt_subheader_search_form").value = 'Contacted';
            datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
         });
         $('#divclk3').on('click', function() {
            document.getElementById("kt_subheader_search_form").value = 'No Inquiries';
            datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
         });
         $('#divclk1').on('click', function() {
            document.getElementById("kt_subheader_search_form").value = '';
            datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
         });
  
        $('#kt_datatable_search_status, #kt_datatable_contact_statuss').selectpicker();
        // $('#kt_datatable_search_status').selectpicker();
        $("#export_pdf").on("click",(function(e){
            e.preventDefault(),
            datatable.button(2).trigger()})); 
        
    };



    var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    var _handleFormAddCustomer = function() {
        var form = KTUtil.getById('kt_add_customer');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_add_customer_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        customerName: {
                            validators: {
                                notEmpty: {
                                    message: 'Name is required'
                                }
                            }
                        },
                        customerContact: {
                            validators: {
                                notEmpty: {
                                    message: 'Contact is required'
                                },
                                // regexp: {
                                //     regexp: /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{11}$/,
                                //     message: 'Invalid'
                                // }
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
                var customer = {
                    customerId: 0,
                    customerName: "string",
                    customerEmail: "string",
                    customerContact: "string",
                    customerAddress: "string",
                    customerCity: "string",
                    customerNotes:"string",
                    customerCountry: "string",
                    customerNationality: "string",
                    customerNationalId: "string",
                    customerNextMeetingDate:"",
                    contactStatusId: 0,
                    wayofContactId: 0,
                    branchId: user.data.userRoles[0].branchId,
                    userId: user.data.userId,
                    isActive: true,
                    isDeleted: false
                };

                customer.customerId = document.getElementById("customerId").innerHTML;
                customer.customerName = document.getElementById('customerName').value;
                customer.customerEmail = document.getElementById('customerEmail').value;
                customer.customerContact = document.getElementById('customerContact').value;
                customer.customerAddress = document.getElementById('customerAddress').value;
                customer.customerNationalId = document.getElementById('customerNationalId').value;
                customer.customerNotes = document.getElementById('customerNotes').value;
                customer.contactStatusId = $('#kt_contact_status').val();
                customer.customerNextMeetingDate=document.getElementById('next_meeting_date').value,
                customer.wayofContactId = $('#kt_wayofcontact').val();
                customer.customerCountry = $('#kt_country_of_Resdience').val();
                customer.customerCity = $('#kt_city_of_Resdience').val();
                customer.customerNationality = $('#kt_nationality').val();
                customer.customerWhatsapp = document.getElementById('whatsapp').value;
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
                const data = JSON.stringify(customer);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Customer/AddCustomer',

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
                            window.location.replace("customer.html");

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
        // public functions
        init: function() {
            _demo();
            _handleFormAddCustomer();
        },
    };
}();

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
$('#customerContact').blur('change', function() {

 $('#whatsapp').val($('#customerContact').val());

});