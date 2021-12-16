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
let fuserId=0;
let filter = 1;
let usercard = 1;

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
                        url: baseURL + '/Customer/GetCustomerOfBranch?userId=' + parseInt(fuserId) +"&filter="+ parseInt(filter),
                        headers: {
                            'Content-Type': 'application/json',
                            'userId': user.data.userId,
                            'userToken': user.data.userToken,
                            'userRoleId': user.data.userRoles[0].userRoleId,
                            'branchId': user.data.userRoles[0].branchId,
                            'branchRoleId': user.data.userRoles[0].branchRoleId,
                            'Access-Control-Allow-Origin': '*',
                        },
                    },
                },
                pageSize: 10, // display 20 records per page
               // serverPaging: true,
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
            stateSave: true,
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
                        //if(data.totalCustomers = 0)
                        //$("#totalCustomer").children().bind('click', function(){ return false; });
                        if(data.totalCustomers == 0)
                           document.getElementById('divclk1').style.pointerEvents = 'none';
                        $("#totalCustomer").html(data.totalCustomers);

                        if(data.customerWithoutInquiry == 0)
                           document.getElementById('divclk2').style.pointerEvents = 'none';
                        $("#contactedCustomer").html(data.customerWithoutInquiry);

                        if(data.needToContactCustomers == 0)
                           document.getElementById('divclk').style.pointerEvents = 'none';
                        $("#needToContact").html(data.needToContactCustomers);


                        // if(data.needToFollowUp==0) 
                        //    document.getElementById('divclk4').style.pointerEvents = 'none';
                        //    $("#needtofollowup").html(data.needToFollowUp); 

                         if(data.needToFollowUpWithInquiry==0) 
                           document.getElementById('divclk10').style.pointerEvents = 'none';
                           $("#needtofollowupWithInquiry").html(data.needToFollowUpWithInquiry); 

                        if(data.needToFollowUpWithOutInquiry==0) 
                           document.getElementById('divclk11').style.pointerEvents = 'none';
                           $("#needtofollowupWithoutInquiry").html(data.needToFollowUpWithOutInquiry);  

                        // if(data.notResponding==0) 
                        // document.getElementById('divclk5').style.pointerEvents = 'none';
                        // $("#notresponding").html(data.notResponding); 

                        if(data.notRespondingWithInquiry == 0)
                           document.getElementById('divclkNotRespondingWithInquiry').style.pointerEvents = 'none';
                           $("#notrespondingwithinquiry").html(data.notRespondingWithInquiry);

                        if(data.notRespondingWithoutInquiry == 0)
                            document.getElementById('divclkNotRespondingWithoutInquiry').style.pointerEvents = 'none';
                            $("#notrespondingwithoutinquiry").html(data.notRespondingWithoutInquiry);

                        
                        if(data.customerWithInquiry == 0)
                           document.getElementById('divclk3').style.pointerEvents = 'none';
                        $("#noInquiryCustomer").html(data.customerWithInquiry);

                       if(data.direct==0){
                            document.getElementById('DirectDiv').style.pointerEvents = 'none';
                           
                        }
                        $("#Direct").html(data.direct); 
                        if(data.google==0){
                             document.getElementById('GoogleDiv').style.pointerEvents = 'none';
                                  
                        }
                        $("#Google").html(data.google);
                       if(data.faceBook==0){
                        document.getElementById('FacebookDiv').style.pointerEvents = 'none';
                       }    
                       $("#Facebook").html(data.faceBook);        

                       if(data.linkedin==0){
                        document.getElementById('LinkedinDiv').style.pointerEvents = 'none';
                       }    
                       $("#Linkedin").html(data.linkedin);    
                       if(data.twitter==0){
                        document.getElementById('TwitterDiv').style.pointerEvents = 'none';
                               
                       }  
                       $("#Twitter").html(data.twitter);

                                      
                       if(data.friends==0){
                        document.getElementById('FriendsrecommendedDiv').style.pointerEvents = 'none';
                        
                         }  
                         $("#Friendsrecommended").html(data.friends);  
                       if(data.website==0){
                           document.getElementById('WebsiteDiv').style.pointerEvents = 'none';
                        }      
                        $("#Website").html(data.website);    
                      if(data.mobileApp==0){ 
                        document.getElementById('MobileAppDiv').style.pointerEvents = 'none';
                       } 
                       $("#MobileApp").html(data.mobileApp);
                     if(data.ownerReference==0) {
                        document.getElementById('OwnerReferenceDiv').style.pointerEvents = 'none';
                      }     
                      $("#OwnerReference").html(data.ownerReference);

                     if(data.instagram==0) {
                        document.getElementById('InstagramDiv').style.pointerEvents = 'none';
                                
                     }   
                     $("#Instagram").html(data.instagram);
                     if(data.other==0){
                        document.getElementById('OtherDiv').style.pointerEvents = 'none';
                               
                                  
                        }      
                        $("#Other").html(data.other);


                          if(data.needToContactToday==0) 
                           document.getElementById('divclk6').style.pointerEvents = 'none';
                           $("#needtocontacttoday").html(data.needToContactToday); 

                           if(data.needToContactDelay==0) 
                           document.getElementById('divclk7').style.pointerEvents = 'none';
                           $("#needtocontactdelayed").html(data.needToContactDelay); 


                           if(data.needToFollowUpToday==0) 
                           document.getElementById('divclk8').style.pointerEvents = 'none';
                           $("#needtofollowuptoday").html(data.needToFollowUpToday); 

                           if(data.needToFollowUpDelay==0) 
                           document.getElementById('divclk9').style.pointerEvents = 'none';
                           $("#needtofollowupdelayed").html(data.needToFollowUpDelay); 

                        // $("#Google").html(data.);
                        // $("#Facebook").html(data.);
                        // $("#Linkedin").html(data.);
                        // $("#Twitter").html(data.);
                        // $("#Website").html(data.);
                        // $("#MobileApp").html(data.);
                        // $("#OwnerReference").html(data.);
                        // $("#Instagram").html(data.);
                        // $("#Other").html(data.);

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
                },{
                    field: 'AddedOn',
                    title: 'Added On',
                    autoHide: false,
                    template: function(data) {
                        var output = '';

                        output += '<div class="font-weight-bold text-muted">' + data.addedOn + '</div>';

                        return output;
                    }
                }
                ,  {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    //  width: 180 ,
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
        //                     if (customerPermission >= 5) {
        //                         action += '\
		// 	<button type="button"  onclick="deleteCustomerById(\'' + baseURL + '\',\'' + data.customerId + '\');"  class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon" title="Delete">\
		// 	<span class="svg-icon svg-icon-md">\
		// 		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
		// 			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
		// 				<rect x="0" y="0" width="24" height="24"/>\
		// 				<path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>\
		// 				<path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>\
		// 			</g>\
		// 		</svg>\
		// 	</span>\
		// </button>\
		// ';
        //                     }
                            if(data.totalNoOfInquiries !="No Inquiries"){
                                action += '\
                                <button type="button" onclick="showInquiry(\'' + data.customerId + '\')" name="' + data.customerId + '"   class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon" title="Show Inquires">\
                                <span class="svg-icon svg-icon-md">\
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">\
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"></path>\
                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>\
                            </svg>\
                                </span>\
                            </button>\
                            ';
                            }
                                  if (customerPermission == 4) {
                                                            if (data.isEscalationRequested!==true)
                                                             {
                                                        
                                                                    action += `
                                                                    <a type="button" onclick="setCustomerEscalationId(` + data.customerId + `)" data-toggle="modal" data-target="#Requestforescalation" class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"  style="margin:2px" title="Request For Escalation">
                                                                    <span class="svg-icon svg-icon-md">\
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                                    </svg>
                                                                    </span>\
                                                                    </a>  
                                                                `; 
                                                                }
                                                             }


             if (customerPermission >= 5) {    

                    if (data.isEscalationRequested==true){
                      
                            action += `
                            <a type="button" onclick="setCustomerApproveEscalationId(` + data.customerId + `)" data-toggle="modal" data-target="#Approveescalation" class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"  style="margin:2px" title="Approve Escalation">
                            <span class="svg-icon svg-icon-md">\
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                            </svg>
                            </span>\
                            </a>  
                        `; 
                       

                       
                           
                                action += `
                                <a type="button" onclick="setCustomerRevertEscalationId(` + data.customerId + `)" data-toggle="modal" data-target="#Rervertescalation" class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"  style="margin:2px" title="Revert Escalation">
                                <span class="svg-icon svg-icon-md">\
                                <i class="fa fa-undo" aria-hidden="true"></i>
                                </a>  
                            `; 
                            }

                        }

                        action += `
                        <a type="button"   href="`+window.location.origin+`/addinquiry.html?customerContact=` + data.customerContact + `"  class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"  style="margin:2px" title="Add Inquiry">
                        <span class="svg-icon svg-icon-md">\
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                        <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                        </svg>
                        </a>  
                    `;


                            
                            return action;
                        } else {
                            return `<span></span>`;
                        }
                    },
                }, {
                    field: 'Country',
                    title: 'Country',
                    autoHide: true,
                    template: function(data) {
                        var output = '';

                        output += '<div class="font-weight-bolder font-size-lg mb-0">' + data.customerCountry + '</div>';
                        output += '<div class="font-weight-bold text-muted">Nationality: ' + data.customerNationality + '</div>';

                        return output;
                    }
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
                            },
                            3: {
                                'title': 'Need to Follow-up',
                                'class': ' label-light-danger'
                            },
                            4: {
                                'title': 'Not Responding',
                                'class': ' label-light-danger'
                            }
                        };
                        return '<span class="label label-lg font-weight-bold ' + status[data.contactStatusId].class + ' label-inline">' +data.contactStatus + '</span>';

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
                    title: 'Managed By',
                    autoHide: true,
                    template: function(data) {
                        var output = '';

                        output += '<div class="font-weight-bold text-muted">' + data.userName + '</div>';

                        return output;
                    },
                },{
                    field: 'customerAssignedToName',
                    title: 'Assigned To',
                    autoHide: true,
                    template: function(data) {
                        var output = '';

                        output += '<div class="font-weight-bold text-muted">' + data.customerAssignedToName + '</div>';

                        return output;
                    }
                }
                ,{
                    field: 'customerAssignedByName',
                    title: 'Assigned By',
                    autoHide: true,
                    template: function(data) {
                        var output = '';

                        output += '<div class="font-weight-bold text-muted">' + data.customerAssignedByName + '</div>';

                        return output;
                    }
                }
                ,{
                    field: 'customerAssignedDate',
                    title: 'Assigned On',
                    autoHide: true,
                    template: function(data) {
                        var output = '';

                        output += '<div class="font-weight-bold text-muted">' + data.customerAssignedDate + '</div>';

                        return output;
                    }
                }
                ,{
                    field: 'escalationRequestedByName',
                    title: 'Escalation Requested By:',
                    autoHide: true,
                    template: function(data) {
                        var output = '';
                        if (data.escalationRequestedByName !== null) {
                        output += '<div class="font-weight-bold text-muted">' + data.escalationRequestedByName + '</div>';
                        }
                        return output;
                    }
                }
                ,{
                    field: 'escalationRequestedOn',
                    title: 'Escalation Requested On:',
                    autoHide: true,
                    template: function(data) {
                        var output = '';
                    if (data.escalationRequestedOn !== null) {
                        output += '<div class="font-weight-bold text-muted">' + data.escalationRequestedOn + '</div>';
                        }   
                        return output;
                    }
                }
                ,{
                    field: 'escalatedByName',
                    title: 'Escalation By:',
                    autoHide: true,
                    template: function(data) {
                        var output = '';
                        if (data.escalatedByName !== null) {
                        output += '<div class="font-weight-bold text-muted">' + data.escalatedByName + '</div>';
                        }
                        return output;
                    }
                }
                ,{
                    field: 'escalatedOn',
                    title: 'Escalation On:',
                    autoHide: true,
                    template: function(data) {
                        var output = '';
                    if (data.escalatedOn !== null) {
                        output += '<div class="font-weight-bold text-muted">' + data.escalatedOn + '</div>';
                        }   
                        return output;
                    }
                }
                ,{
                    field: 'isEscalationRequested',
                    title: 'is Escalation Requested:',
                    autoHide: true,
                    template: function(data) {
                        var output = '';
                  
                        output += '<div class="font-weight-bold text-muted">' + data.isEscalationRequested + '</div>';
                      
                        return output;
                    }
                }
            ],
        });
        //console.log(datatable.rows().data());
         $('#kt_subheader_search_form').on('blur', function() {
            datatable.search($(this).val().toLowerCase());
        }); 

        $('#kt_datatable_contact_statuss').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#divclk').on('click', function() {
       
           usercard =  document.getElementById('filtecardsId').value;
           window.location.replace("customer.html?fuserId="+usercard+"&filter=3");

            //    document.getElementById("kt_subheader_search_form").value = 'Need to Contact';
           //    datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
        });

        $('#divclk2').on('click', function() {

            usercard =  document.getElementById('filtecardsId').value;
            window.location.replace("customer.html?fuserId="+usercard+"&filter=2");


             // document.getElementById("kt_subheader_search_form").value = 'Contacted';
            // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
         });


         $('#divclkNotRespondingWithInquiry').on('click', function() {

            usercard =  document.getElementById('filtecardsId').value;
            window.location.replace("customer.html?fuserId="+usercard+"&filter=25");


             // document.getElementById("kt_subheader_search_form").value = 'Contacted';
            // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
         });


         $('#divclkNotRespondingWithoutInquiry').on('click', function() {

            usercard =  document.getElementById('filtecardsId').value;
            window.location.replace("customer.html?fuserId="+usercard+"&filter=26");


             // document.getElementById("kt_subheader_search_form").value = 'Contacted';
            // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
         });

        //  $('#divclk4').on('click', function() {

        //     usercard =  document.getElementById('filtecardsId').value;
        //     window.location.replace("customer.html?fuserId="+usercard+"&filter=17");


        //      // document.getElementById("kt_subheader_search_form").value = 'Contacted';
        //     // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
        //  });

         $('#divclk10').on('click', function() {

            usercard =  document.getElementById('filtecardsId').value;
            window.location.replace("customer.html?fuserId="+usercard+"&filter=23");
         });
         $('#divclk11').on('click', function() {

            usercard =  document.getElementById('filtecardsId').value;
            window.location.replace("customer.html?fuserId="+usercard+"&filter=24");
         });
        //  $('#divclk5').on('click', function() {

        //     usercard =  document.getElementById('filtecardsId').value;
        //     window.location.replace("customer.html?fuserId="+usercard+"&filter=18");

        //  });


         $('#divclk3').on('click', function() {
           
             usercard =  document.getElementById('filtecardsId').value;
            window.location.replace("customer.html?fuserId="+usercard+"&filter=4");
          


             // document.getElementById("kt_subheader_search_form").value = 'No Inquiries';
            // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
         });

         $('#divclk1').on('click', function() {

             usercard =  document.getElementById('filtecardsId').value;
            window.location.replace("customer.html?fuserId="+usercard+"&filter=1");

           // document.getElementById("kt_subheader_search_form").value = '';
            // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
         });

   //  way of contacts filters


                $('#divclk6').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
           window.location.replace("customer.html?fuserId="+usercard+"&filter=19");

                // document.getElementById("kt_subheader_search_form").value = '';
                // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
                });
                

                $('#divclk7').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
                 
               window.location.replace("customer.html?fuserId="+usercard+"&filter=20");

                // document.getElementById("kt_subheader_search_form").value = '';
                // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
                });

                $('#divclk8').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
                window.location.replace("customer.html?fuserId="+usercard+"&filter=21");

                // document.getElementById("kt_subheader_search_form").value = '';
                // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
                });


                $('#divclk9').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
                   window.location.replace("customer.html?fuserId="+usercard+"&filter=22");

                // document.getElementById("kt_subheader_search_form").value = '';
                // datatable.search((document.getElementById("kt_subheader_search_form").value).toLowerCase());
                });




            $('#DirectDiv').on('click', function() {

                usercard =  document.getElementById('filtecardsId').value;
            window.location.replace("customer.html?fuserId="+usercard+"&filter=5");

                        });

            $('#GoogleDiv').on('click', function() {

                usercard =  document.getElementById('filtecardsId').value;
                window.location.replace("customer.html?fuserId="+usercard+"&filter=6");
            
                        });

                $('#FacebookDiv').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
                    window.location.replace("customer.html?fuserId="+usercard+"&filter=7");
                
                            });

                $('#LinkedinDiv').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
                    window.location.replace("customer.html?fuserId="+usercard+"&filter=8");
                
                            });

                $('#TwitterDiv').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
                    window.location.replace("customer.html?fuserId="+usercard+"&filter=9");
                
                            });


                $('#FriendsrecommendedDiv').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
                    window.location.replace("customer.html?fuserId="+usercard+"&filter=10");
                
                            });


            $('#WebsiteDiv').on('click', function() {

                usercard =  document.getElementById('filtecardsId').value;
                window.location.replace("customer.html?fuserId="+usercard+"&filter=11");
            
                        });

                $('#MobileAppDiv').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
                    window.location.replace("customer.html?fuserId="+usercard+"&filter=12");
                
                            });

                $('#OwnerReferenceDiv').on('click', function() {

                    usercard =  document.getElementById('filtecardsId').value;
                    window.location.replace("customer.html?fuserId="+usercard+"&filter=13");
                
                            });  

                            
                    $('#InstagramDiv').on('click', function() {

                        usercard =  document.getElementById('filtecardsId').value;
                        window.location.replace("customer.html?fuserId="+usercard+"&filter=14");
                    
                                });   



                    $('#OtherDiv').on('click', function() {

                        usercard =  document.getElementById('filtecardsId').value;
                        window.location.replace("customer.html?fuserId="+usercard+"&filter=15");
                    
                                });   
             



   // 




         
 
        $('#kt_datatable_search_status, #kt_datatable_contact_statuss').selectpicker();
        // $('#kt_datatable_search_status').selectpicker();
 /*        $("#export_pdf").on("click",(function(e){
            e.preventDefault(),
            datatable.button(2).trigger()})); */
        
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
                        next_meeting_date: {
                            validators: {
                                notEmpty: {
                                    message: 'FollowUp date is required'
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
                if(document.getElementById('CustomerAssignedTo').value=="0")
                   customer.CustomerAssignedTo =user.data.userId;
                else
                   customer.CustomerAssignedTo = document.getElementById('CustomerAssignedTo').value;
              
               
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
    var _handleFormComment = function() {
        var form = KTUtil.getById('kt_inq_comment');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_comment_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        inqtxtComment: {
                            validators: {
                                notEmpty: {
                                    message: 'Comment is required'
                                }
                            }
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
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
                var inquiryComment = {
                    inquiryId: document.getElementById("inquiryWorkscopeId").innerHTML,
                    comment: $('#inqtxtComment').val(),
                };
                const data = JSON.stringify(inquiryComment);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Inquiry/AddComment',

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
                        console.log(response);
                        if (response.isError == false) {
                            window.location.replace("customer.html");
                          // $('#InquiryComment').modal('hide');
                          // $('#customerpop').modal('hide');
                          // document.getElementById('custxtComment').value ="";
                          // document.getElementById('inqtxtComment').value ="";
                          // $('#kt_datatableInquiry').dataTable().ajax.reload( null, false );

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
    var _handleFormCustomer = function() {
        var form = KTUtil.getById('kt_customerform');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_customer_button');

        if (!form) {
            return;
        }

        FormValidation
            .formValidation(
                form, {
                    fields: {
                        custxtComment: {
                            validators: {
                                notEmpty: {
                                    message: 'Comment is required'
                                }
                            }
                        },
						next_meeting_date: {
                            validators: {
                                notEmpty: {
                                    message: 'Date is required'
                                }
                            }
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
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
                var inquiryComment = {
                    inquiryId:parseInt( document.getElementById("inquiryWorkscopeId").innerHTML),
                    comment: $('#custxtComment').val(),
					contactStatusId:parseInt($('#kt_follow_status').val()),
					date:document.getElementById('next_follow_date').value,
                };
                const data = JSON.stringify(inquiryComment);
                console.log(data);
                $.ajax({
                    type: "Post",
                    url: baseURL + '/Inquiry/NeedToFollowUpComment',

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
                        console.log(response);
                        if (response.isError == false) {
                            window.location.replace("customer.html");
                           // $('#InquiryComment').modal('hide');
                          //  $('#customerpop').modal('hide');
                            //document.getElementById('custxtComment').value ="";
                           // document.getElementById('inqtxtComment').value ="";
                            
                         //  $('#kt_datatableInquiry').dataTable().ajax.reload( null, false );

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
                // Form Validation & Ajax Submission: https://formvalidation.io/guide/examples/using-ajax-to-submit-the-form
               /*  var customerRequestforEscalation = {
                    "customerId":parseInt(document.getElementById("customerEscalationId").innerHTML),
                    "id":user.data.userId,

                };
                const data = JSON.stringify(customerRequestforEscalation);
                console.log(data); */
              
                $.ajax({
                    type: "Post",  
                    url: baseURL + '/Customer/CustomerEscalationRequest?customerId='+parseInt(document.getElementById("customerEscalationId").innerHTML),

                    headers: {
                        'Content-Type': 'application/json',
                        'userId': user.data.userId,
                        'userToken': user.data.userToken,
                        'userRoleId': user.data.userRoles[0].userRoleId,
                        'branchId': user.data.userRoles[0].branchId,
                        'branchRoleId': user.data.userRoles[0].branchRoleId,
                        'Access-Control-Allow-Origin': '*',
                    },
                  //  data: data,
                    success: function(response) {
                        // Release button
                       // KTUtil.btnRelease(formSubmitButton);
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

    }


    var _handleFormApproveescalation = function() {
        var form = KTUtil.getById('kt_approveescalation');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_approveescalation_button');

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
                // Form Validation & Ajax Submission: https://formvalidation.io/guide/examples/using-ajax-to-submit-the-form
               /*  var customerRequestforEscalation = {
                    "customerId":parseInt(document.getElementById("customerEscalationId").innerHTML),
                    "id":user.data.userId,

                };
                const data = JSON.stringify(customerRequestforEscalation);
                console.log(data); */
              
                $.ajax({
                    type: "Post",  
                    url: baseURL + '/Customer/CustomerEscalationApprove?customerId='+parseInt(document.getElementById("customerApproveEscalationId").innerHTML),

                    headers: {
                        'Content-Type': 'application/json',
                        'userId': user.data.userId,
                        'userToken': user.data.userToken,
                        'userRoleId': user.data.userRoles[0].userRoleId,
                        'branchId': user.data.userRoles[0].branchId,
                        'branchRoleId': user.data.userRoles[0].branchRoleId,
                        'Access-Control-Allow-Origin': '*',
                    },
                  //  data: data,
                    success: function(response) {
                        // Release button
                       // KTUtil.btnRelease(formSubmitButton);
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

    }

    var _handleFormRevertescalation = function() {
        var form = KTUtil.getById('kt_revertescalation');
        var formSubmitUrl = KTUtil.attr(form, 'action');
        var formSubmitButton = KTUtil.getById('kt_revertescalation_button');

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
                // Form Validation & Ajax Submission: https://formvalidation.io/guide/examples/using-ajax-to-submit-the-form
               /*  var customerRequestforEscalation = {
                    "customerId":parseInt(document.getElementById("customerEscalationId").innerHTML),
                    "id":user.data.userId,

                };
                const data = JSON.stringify(customerRequestforEscalation);
                console.log(data); */
              
                $.ajax({
                    type: "Post",  
                    url: baseURL + '/Customer/CustomerEscalationReject?customerId='+parseInt(document.getElementById("customerRevertEscalationId").innerHTML),

                    headers: {
                        'Content-Type': 'application/json',
                        'userId': user.data.userId,
                        'userToken': user.data.userToken,
                        'userRoleId': user.data.userRoles[0].userRoleId,
                        'branchId': user.data.userRoles[0].branchId,
                        'branchRoleId': user.data.userRoles[0].branchRoleId,
                        'Access-Control-Allow-Origin': '*',
                    },
                  //  data: data,
                    success: function(response) {
                        // Release button
                       // KTUtil.btnRelease(formSubmitButton);
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

    }

    return {
        // public functions
        init: function() {
            _demo();
            _handleFormAddCustomer();
            _handleFormComment();
            _handleFormCustomer();
            _handleFormRequestforescalation();
            _handleFormApproveescalation();
            _handleFormRevertescalation();
        },
    };
}();

let permissions;
let customerPermission;
jQuery(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.get('fuserId')!=null)
       fuserId = urlParams.get('fuserId');
    
     
    if(urlParams.get('filter')!=null)
      filter = urlParams.get('filter');
    document.getElementById("filtecardsId").value = fuserId;  
    if(filter ==16) 
        document.getElementById("filtecardsId").value = 0;
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

    $.ajax({
        type: "Get",
        url: baseURL + '/User/GetInquiryCreateUser',
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
                const roleTypeList = document.getElementById('kt_selectmanagedby');
                var roleTypeListHTML = new Array();
                var selected='';
                for (var i = 0; i < response.data.length; i++) {
                    selected='';
                    roleTypeListHTML.push(`<option value="` + response.data[i].userId+ `" `+selected+`>` + response.data[i].userName + `</option>`);
                }
                roleTypeList.innerHTML = roleTypeListHTML.join('');
 


            } else {

            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {


        }
    });





    
   


    KTAppsUsersListDatatable.init();
    

     
    // begin offset 

    //$("html, body").animate({ scrollTop: $("#kt_datatable").offset().top }, 1000);

   // end offset
    
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
                
                const followStatusList = document.getElementById('kt_follow_status');
                var followStatusListHTML = new Array();

                for (var i = 0; i < response.data.length; i++) {
                    followStatusListHTML.push(`
					<option value="` + response.data[i].contactStatusId + `">` + response.data[i].contactStatusName + `</option>`);
                }

                followStatusList.innerHTML = followStatusListHTML.join('');
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

 // get customers by user

 $.ajax({
    type: "get",
    url: baseURL + '/Customer/GetCustomerbyUser',

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


      
       
        
            let all=0;    
            for (var counter=0;counter<response.data.length;counter++)
               {
                            if(response.data[counter].customers > 0)
                          {
                           all += parseInt(response.data[counter].customers);
                               document.getElementById('customerbyUser').innerHTML +=`
       
                                                   <div class="col-xl-3">
                                                                   <!--begin::Tiles Widget 4-->
                                                               <div class="card card-custom gutter-b" style="height: 110px;background-color: #755043;">
                                                                   <!--begin::Body-->
                                                                   <div id="divclkUser"  style="border-radius: .42rem;cursor: pointer;" class="card-body d-flex flex-column " onclick=filterUser(`+response.data[counter].userId+`)>
                                                                       <!--begin::Stats-->
                                                                       <div class="flex-grow-1">                                                                           
                                                                           <div class="text-white display-3 font-weight-bold" id="">`+response.data[counter].customers+`</div>
                                                                           <div class="text-white font-weight-bold">Customers Account By: `+response.data[counter].user+`</div>
                                                                       </div>
                                                                       <!--end::Stats-->
                                                                   </div>
                                                                   <!--end::Body-->
                                                               </div>
                                                               <!--end::Tiles Widget 4-->
                                                               </div>`;
                               
                                                               document.getElementById('AllCustomers').innerHTML = all;
                           }
                        
                
       
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


 // end customers by user



  //  begin Assignment To


  $.ajax({
    type: "get",
    url: baseURL + '/Customer/GetCustomerbyAssigned',

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


      
          
          
            for (var i=0;i<response.data.length;i++)
               {
                            if(response.data[i].customers > 0)
                          {
               
                               document.getElementById('assignmentTo').innerHTML +=`
       
                                                   <div class="col-xl-2">
                                                                   <!--begin::Tiles Widget 4-->
                                                               <div class="card card-custom gutter-b" style="height: 130px;">
                                                                   <!--begin::Body-->
                                                                   <div id="divclkAssignment"  style="border-radius: .42rem;cursor: pointer;" class="card-body d-flex flex-column " onclick=filterAssignedTo(`+response.data[i].userId+`)>
                                                                       <!--begin::Stats-->
                                                                       <div class="flex-grow-1">
                                                                           <div class="font-weight-bolder font-size-h3" id="">`+response.data[i].customers+`</div>
                                                                           <div class="text-dark-50 font-weight-bold">Assigned To :   `+response.data[i].user+`</div> 
                                                                       </div>
                                                                       <!--end::Stats-->
                                                                   </div>
                                                                   <!--end::Body-->
                                                               </div>
                                                               <!--end::Tiles Widget 4-->
                                                               </div>`;
                               
                                                
                           }
                        
                
       
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

  // end Assignment To








         //  begin get assigned to
         
  $.ajax({
    type: "Get",
    url: baseURL + '/User/GetAuthUser' ,
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
           

            const roleTypeList = document.getElementById('CustomerAssignedTo');
            var roleTypeListHTML = new Array();
            roleTypeListHTML.push('<option value="0"></option>');
            var selected='';
            for (var i = 0; i < response.data.length; i++) {
                selected='';
                // if( CustomerAssignedBy == response.data[i].CustomerAssignedBy){
                //     selected='selected';
                // }
                roleTypeListHTML.push(`
                <option value="` + response.data[i].userId+ `" `+selected+`>` + response.data[i].userName + `</option>`);
            }
            roleTypeList.innerHTML = roleTypeListHTML.join('');


        }else {
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
    
    }
});


  // endassigned to


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


$('#kt_managedby_button').click(function () {
    var checklistdata = {
        "inquiryId":parseInt( document.getElementById('inquiryWorkscopeId').innerHTML),
        "id": parseInt(document.getElementById('kt_selectmanagedby').value),
      };
     

    const data = JSON.stringify(checklistdata);
    console.log(data);
    
    $.ajax({
        type: "Post",
        url: baseURL + '/Inquiry/ChangeInquiryManagedBy',
        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
        success: function(response) {
            console.log(response);
 
            window.location.replace("customer.html");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });
});
$(document).ready(function () {
    $("#btnExcelExport").click(function(e) 
    {
        //window.open('data:application/vnd.ms-excel,' + encodeURIComponent($('#kt_datatable').parent().html()));
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($('.datatable-table')[0].outerHTML));
        
    });
});