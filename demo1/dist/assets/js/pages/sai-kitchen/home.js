"use strict";
import { baseURL } from './constant.js'
var eventList = new Array();
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
    
	$.ajax({
		type: "Post",
		url: baseURL + '/Dashboard/ViewDashborad',

		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		success: function (response) {
			console.log(response);
				
			eventList =[];
				for (var i = 0; i < response.data.calendar.length; i++) {
					eventList.push(
						{
							"title":response.data.calendar[i].workscopeName ,
							"start":(new Date(response.data.calendar[i].measurementScheduleDate)).toISOString(),
							"className": "fc-event-danger fc-event-solid-warning",
							"description": response.data.calendar[i].workscopeName +' Measurement' 
						},
						{
							"title":response.data.calendar[i].workscopeName ,
							"start":(new Date(response.data.calendar[i].designScheduledate)).toISOString(),
							"className": "fc-event-light fc-event-solid-primary",
							"description": response.data.calendar[i].workscopeName +' Design'
						}
					);
				}

				KTCalendarBasic.init();

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {

		}
	});
});
