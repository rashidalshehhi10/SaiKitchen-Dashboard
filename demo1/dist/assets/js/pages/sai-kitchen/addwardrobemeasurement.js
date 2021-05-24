"use strict";

import {
    baseURL
} from './constant.js'


import {
    measurementFile
} from './dropzone.js'


// List of all countries in a simple list / array.
// Sorted alphabetical by country name (special characters on bottom)
const countryList = ["United Arab Emirates", "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State Of", "Bonaire, Sint Eustatius And Saba", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension And Tristan Da Cunha", "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin (french Part)", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic Of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];


let user;
let datatable;
let inquiryWorkscopeId;
// Class definition
var KTWizard1 = function() {
    // Base elements
    var _wizardEl;
    var _formEl;
    var _wizardObj;
    var _validations = [];

    // Private functions
    var _initValidation = function() {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        // Step 1
        _validations.push(FormValidation.formValidation(
            _formEl, {
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
                            regexp: {
                                regexp: /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{11}$/,
                                message: 'Invalid'
                            }
                        }
                    },
                    customerEmail: {
                        validators: {
                            notEmpty: {
                                message: 'Email is required'
                            },
                            emailAddress: {
                                message: 'Please write valid email address'
                            }
                        }
                    },
                    customerAddress: {
                        validators: {
                            notEmpty: {
                                message: 'Address is required'
                            }
                        }
                    },
                    customerNationalId: {
                        validators: {
                            notEmpty: {
                                message: 'Required'
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        //eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ));

        // Step 2
        _validations.push(FormValidation.formValidation(
            _formEl, {
                fields: {
                    measurement_schedule_date: {
                        validators: {
                            notEmpty: {
                                message: 'Schedule Date is required'
                            }
                        }
                    },
                    scopeTag: {
                        validators: {
                            notEmpty: {
                                message: 'Work Scope is required'
                            }
                        }
                    },
                    width: {
                        validators: {
                            notEmpty: {
                                message: 'Package width is required'
                            },
                            digits: {
                                message: 'The value added is not valid'
                            }
                        }
                    },
                    height: {
                        validators: {
                            notEmpty: {
                                message: 'Package height is required'
                            },
                            digits: {
                                message: 'The value added is not valid'
                            }
                        }
                    },
                    packagelength: {
                        validators: {
                            notEmpty: {
                                message: 'Package length is required'
                            },
                            digits: {
                                message: 'The value added is not valid'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        //eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ));

        // Step 3
        _validations.push(FormValidation.formValidation(
            _formEl, {
                fields: {
                    txtfloor: {
                        validators: {
                            notEmpty: {
                                message: 'Floor is required'
                            }
                        }
                    },
                    packaging: {
                        validators: {
                            notEmpty: {
                                message: 'Packaging type is required'
                            }
                        }
                    },
                    preferreddelivery: {
                        validators: {
                            notEmpty: {
                                message: 'Preferred delivery window is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        //eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ));

        // Step 4
        _validations.push(FormValidation.formValidation(
            _formEl, {
                fields: {
                    locpostcode: {
                        validators: {
                            notEmpty: {
                                message: 'Postcode is required'
                            }
                        }
                    },
                    loccity: {
                        validators: {
                            notEmpty: {
                                message: 'City is required'
                            }
                        }
                    },
                    locstate: {
                        validators: {
                            notEmpty: {
                                message: 'State is required'
                            }
                        }
                    },
                    loccountry: {
                        validators: {
                            notEmpty: {
                                message: 'Country is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap({
                        //eleInvalidClass: '',
                        eleValidClass: '',
                    })
                }
            }
        ));
    }

    var _initWizard = function() {
        // Initialize form wizard
        _wizardObj = new KTWizard(_wizardEl, {
            startStep: 1, // initial active step number
            clickableSteps: false // allow step clicking
        });

        // Validation before going to next page
        _wizardObj.on('change', function(wizard) {
            if (wizard.getStep() > wizard.getNewStep()) {
                return; // Skip if stepped back
            }

            // Validate form before change wizard step
            var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step

            if (validator) {
                validator.validate().then(function(status) {
                    if (status == 'Valid') {
                        wizard.goTo(wizard.getNewStep());

                        KTUtil.scrollTop();
                    } else {
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light"
                            }
                        }).then(function() {
                            KTUtil.scrollTop();
                        });
                    }
                });
            }

            return false; // Do not change wizard step, further action will be handled by he validator
        });

        // Change event
        _wizardObj.on('changed', function(wizard) {
            KTUtil.scrollTop();
        });

        // Submit event
        _wizardObj.on('submit', function(wizard) {
            console.log(document.getElementsByClassName('windowswallname').value);
            Swal.fire({
                text: "All is good! Please confirm the form submission.",
                icon: "success",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, submit!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-primary",
                    cancelButton: "btn font-weight-bold btn-default"
                }
            }).then(function(result) {
                if (result.value) {
                    var measurement = {
                        // measurementName: "string",
                        measurementDescription: document.getElementById('kt_autosize_1').value,
                        measurementStatusId: 1,
                        // measurementComment: "string",
                        // feesId: 0,
                        files: new Array(),
                        inquiryWorkscopeId: inquiryWorkscopeId,
                        measurementTakenBy: user.data.userId,
                        isActive: true,
                        isDeleted: false,
                        kitchenDesignInfo: {
                            kdikitchenType: $('input[name="kitchentype"]:checked').val(),
                            kdiboardModelCarcass: $("input:checkbox[name=boardmodelcarcass]:checked").val(),
                            kdiboardModelCarcassColor: document.getElementById('boardmodelcarcasscolor').value,
                            kdiboradModelDoorShutter: $("input:checkbox[name=boardmodeldoorshutter]:checked").val(),
                            kdiboardModelDoorShutterColor: document.getElementById('boardmodeldoorshuttercolor').value,
                            kdibaseUnitHeight: $('input[name="baseunitheight"]:checked').val(),
                            kdiwallUnitHeight: $('input[name="wallunitheight"]:checked').val(),
                            kdinotes: "",
                            isActive: true,
                            isDeleted: false,
                            appliances: new Array(),
                        },
                        measurementDetail: {
                            measurementDetailName: "",
                            measurementDetailDescription: "",
                            measurementDetailCeilingHeight: document.getElementById('ceilingheight').value,
                            measurementDetailCielingDiameter: document.getElementById('ceilingdepth').value,
                            measurementDetailCornishHeight: document.getElementById('cornishheight').value,
                            measurementDetailCornishDiameter: document.getElementById('cornishdepth').value,
                            measurementDetailSkirtingHeight: document.getElementById('skirtingheight').value,
                            measurementDetailSkirtingDiameter: document.getElementById('skirtingdepth').value,
                            measurementDetailPlinthHeight: document.getElementById('plinthheight').value,
                            measurementDetailPlinthDiameter: document.getElementById('plinthdepth').value,
                            measurementDetailDoorHeight: document.getElementById('doorheight').value,
                            measurementDetailSpotLightFromWall: document.getElementById('spotlightfromwall').value,
                            isActive: true,
                            isDeleted: false,
                            measurementDetailInfos: new Array(),
                        }
                    };
                    console.log(measurementFile.length);
                    for (var i = 0; i < measurementFile.length; i++) {
                        measurement.files.push({
                            fileName: "",
                            fileImage: measurementFile[i],
                            fileUrl: "",
                            isActive: true,
                            isDeleted: false,
                        });
                    }
                    measurement.kitchenDesignInfo.appliances.push({
                        appliancesName: "string",
                        appliancesValue: true,
                        isActive: true,
                        isDeleted: false
                    });
                    console.log($('div[data-repeater-item-window]').length);
                    for (var i = 0; i < $('div[data-repeater-item-window]').length; i++) {
                        // [0][windowswallname]
                        measurement.measurementDetail.measurementDetailInfos.push({
                            measurementDetailInfoName: $('[0][windowswallname]').val(),
                            measurementDetailInfoDistanceHeight: document.getElementsByName('[' + i + '][windowheight]').value,
                            measurementDetailInfoDistanceLl: document.getElementsByName('[' + i + '][windowdistancell]').value,
                            measurementDetailInfoDistanceRr: document.getElementsByName('[' + i + '][windowdistancerr]').value,
                            measurementDetailInfoDistanceHff: document.getElementsByName('[' + i + '][windowdistancehff]').value,
                            isActive: true,
                            isDeleted: false
                        });
                    }
                    console.log($('div[data-repeater-item-electric]').length);
                    for (var i = 0; i < $('div[data-repeater-item-electric]').length; i++) {
                        measurement.measurementDetail.measurementDetailInfos.push({
                            measurementDetailInfoName: document.getElementsByName('[' + i + '][electricwallname]').value,
                            measurementDetailInfoDistanceHeight: '',
                            measurementDetailInfoDistanceLl: document.getElementsByName('[' + i + '][electricpointdistancell]').value,
                            measurementDetailInfoDistanceRr: document.getElementsByName('[' + i + '][electricpointdistancerr]').value,
                            measurementDetailInfoDistanceHff: document.getElementsByName('[' + i + '][electricpointdistancehff]').value,
                            isActive: true,
                            isDeleted: false
                        });
                    }

                    console.log(measurement);
                    const data = JSON.stringify(measurement);
                    console.log(data);
                    $.ajax({
                        type: "Post",
                        url: baseURL + '/Inquiry/AddMeaurementtoInquiry',
                        headers: {
                            'Content-Type': 'application/json',
                            'userId': user.data.userId,
                            'userToken': user.data.userToken,
                            'userRoleId': user.data.userRoles[0].userRoleId,
                            'branchId': user.data.userRoles[0].branchId,
                            'branchRoleId': user.data.userRoles[0].branchRoleId,
                        },
                        data: data,
                        success: function(response) {
                            // Release button
                            console.log(response);
                            // window.location.replace("home.html");
                            if (response.isError == false) {
                                // sessionStorage.setItem('user', JSON.stringify(response));
                                window.location.replace("measurement.html");

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

                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Your form has not been submitted!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-primary",
                        }
                    });
                }
            });
        });
    }

    return {
        // public functions
        init: function() {
            _wizardEl = KTUtil.getById('kt_wizard');
            _formEl = KTUtil.getById('kt_form');

            _initValidation();
            _initWizard();
        }
    };
}();


let permissions;
let inquiryPermission;

jQuery(document).ready(function() {
    KTWizard1.init();



    var login = sessionStorage.getItem("user");
    if (login !== null) {
        user = JSON.parse(login);
        console.log(user);
        permissions = user.data.userRoles[0].branchRole.permissionRoles;
        console.log(permissions);
        for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permissionId == 6) {
                inquiryPermission = permissions[i].permissionLevelId;
                console.log(inquiryPermission);
            }
        }
    }
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    inquiryWorkscopeId = urlParams.get('inquiryWorkscopeId')
    console.log(inquiryWorkscopeId);
    if (inquiryWorkscopeId == null || inquiryWorkscopeId == "") {
        window.location.replace("measurement.html");
    }



    $('#customerContact').keyup(function() {
        var reg = /^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{11}$/;
        if (reg.test($(this).val())) {

            $.ajax({
                type: "Post",
                url: baseURL + '/Customer/GetCustomerbyContact?customerContact=' + $(this).val(),

                headers: {
                    'Content-Type': 'application/json',
                    'userId': user.data.userId,
                    'userToken': user.data.userToken,
                    'userRoleId': user.data.userRoles[0].userRoleId,
                    'branchId': user.data.userRoles[0].branchId,
                    'branchRoleId': user.data.userRoles[0].branchRoleId,
                },
                // data: data,
                success: function(response) {
                    console.log(response);
                    // window.location.replace("home.html");
                    if (response.isError == false) {
                        // sessionStorage.setItem('user', JSON.stringify(response));
                        try {

                            document.getElementById('customerName').value = response.data.customerName;
                            document.getElementById('customerEmail').value = response.data.customerEmail;
                            document.getElementById('customerContact').value = response.data.customerContact;
                            document.getElementById('customerAddress').value = response.data.customerAddress;
                            document.getElementById('customerNationalId').value = response.data.customerNationalId;
                            $('#kt_contact_status').val(response.data.contactStatusId).change();
                            $('#kt_wayofcontact').val(response.data.wayofContactId).change();
                            $('#kt_country_of_Resdience').val(response.data.customerCountry).change();
                            $('#kt_city_of_Resdience').val(response.data.customerCity).change();
                            document.getElementById("customerCity").innerHTML = response.data.customerCity;
                            $('#kt_nationality').val(response.data.customerNationality).change();
                        } catch (error) {
                            document.getElementById('customerName').value = "";
                            document.getElementById('customerEmail').value = "";
                            document.getElementById('customerAddress').value = "";
                            document.getElementById('customerNationalId').value = "";
                        }

                        //  document.getElementById('customerEmail').value;
                        // 	customer.customerEmail = document.getElementById('customerEmail').value;
                        // 	customer.customerContact = document.getElementById('customerContact').value;
                        // 	customer.customerAddress = document.getElementById('customerAddress').value;
                        // 	customer.customerNationalId = document.getElementById('customerNationalId').value;
                        // 	customer.contactStatusId = $('#kt_contact_status').val();
                        // 	customer.wayofContactId = $('#kt_wayofcontact').val();
                        // 	customer.customerCountry = $('#kt_country_of_Resdience').val();
                        // 	customer.customerCity = $('#kt_city_of_Resdience').val();
                        // 	customer.customerNationality = $('#kt_nationality').val();

                        // window.location.replace("branchrole.html");

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
    });


});