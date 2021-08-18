"use strict";
import { baseURL } from './constant.js'
var eventList = new Array();
let user;
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);
// Class Definition
//var green =  KTUtil.getCssVariableValue("--bs-active-success");
//var red =  KTUtil.getCssVariableValue("--bs-active-danger");

// Initialize Fullcalendar -- for more info please visit the official site: https://fullcalendar.io/demos
var KTCalendarBasic = function() {

    return {
        //main function to initiate the module
        init: function() {
			
            var calendarEl = document.getElementById('k_calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: [ 'bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list' ],
                themeSystem: 'bootstrap',

                isRTL: KTUtil.isRTL(),

                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },

                height: 800,
                contentHeight: 780,
                aspectRatio: 3,  // see: https://fullcalendar.io/docs/aspectRatio

                nowIndicator: true,

                views: {
                    dayGridMonth: { buttonText: 'month' },
                    timeGridWeek: { buttonText: 'week' },
                    timeGridDay: { buttonText: 'day' }
                },

                defaultView: 'dayGridMonth',
                editable: false,
                eventLimit: true, // allow "more" link when too many events
                navLinks: true,
                events: eventList,

                eventRender: function(info) {
                    var element = $(info.el);

                    if (info.event.extendedProps && info.event.extendedProps.description) {
                        if (element.hasClass('fc-day-grid-event')) {
                            element.data('content', info.event.extendedProps.description);
                            element.data('placement', 'top');
                            KTApp.initPopover(element);
                        } else if (element.hasClass('fc-time-grid-event')) {
                            element.find('.fc-title').append('<div class="fc-description">' + info.event.extendedProps.description + '</div>');
                        } else if (element.find('.fc-list-item-title').lenght !== 0) {
                            element.find('.fc-list-item-title').append('<div class="fc-description">' + info.event.extendedProps.description + '</div>');
                        }
                    }
                }
            });

            calendar.render();
        }
    };
}();

jQuery(document).ready(function() {
    
});
// Class Initialization
jQuery(document).ready(function() {
    var login = localStorage.getItem("user");
	if (login !== null) {
		user = JSON.parse(login);
		console.log(user);
    }
    
	$.ajax({
		type: "Post",
		url: baseURL + '/Dashboard/ViewDashboard',

		headers: {
        'Content-Type': 'application/json',
        'userId': user.data.userId,
        'userToken': user.data.userToken,
        'userRoleId': user.data.userRoles[0].userRoleId,
        'branchId': user.data.userRoles[0].branchId,
        'branchRoleId': user.data.userRoles[0].branchRoleId,
        'Access-Control-Allow-Origin': '*',
		},
		success: function (response) {
			console.log(response);
            document.getElementById('lblcustomerRegistered').innerHTML=response.data.customerRegistered;
            document.getElementById('lblTotalInquiry').innerHTML=response.data.totalInquiries;
            document.getElementById('lblTotalQuotation').innerHTML=response.data.totalquotations;
            document.getElementById('lblTotalJobOrder').innerHTML=response.data.totalJoborder;
            document.getElementById('lblContactedCustomer').innerHTML=response.data.customerContacted;
            document.getElementById('lblNeedToContactCustomer').innerHTML=response.data.customerNeedtoContact;
            document.getElementById('lblCompletedInquiry').innerHTML=response.data.inquiryCompleted;
            document.getElementById('lblPendingInquiry').innerHTML=response.data.inquiryIncomplete;
            document.getElementById('lblApprovedQuotation').innerHTML=response.data.quotationAccepted;
            document.getElementById('lblRejectedQuotation').innerHTML=response.data.quotationRejected;
			eventList =[];
				for (var i = 0; i < response.data.calendar.length; i++) {
				try{	eventList.push(
						{
							"title":response.data.calendar[i].workscopeName ,
							"start":(new Date(response.data.calendar[i].measurementScheduleDate)).toISOString(),
							"className": "fc-event-danger fc-event-solid-warning",
							"description": response.data.calendar[i].workscopeName +' Measurement of '+ response.data.calendar[i].inquiryWorkscopeId 
						},
						{
							"title":response.data.calendar[i].workscopeName ,
							"start":(new Date(response.data.calendar[i].designScheduledate)).toISOString(),
							"className": "fc-event-light fc-event-solid-primary",
							"description": response.data.calendar[i].workscopeName +' Design of '+ response.data.calendar[i].inquiryWorkscopeId 
						}
					);
                }catch(error){}
				}

				KTCalendarBasic.init();

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {

		}
	});
});
