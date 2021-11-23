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
                selectable: true,
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
                },
                select: function( start, end, jsEvent, view ) {                   
                    // show modal dialog
                    // $('#event-modal').find('input[name=evDate]').val(
                    //     start.start.
                    // );
                   // $( "#evDate" ).datepicker({ dateFormat: 'YYYY-MM-DD HH:mm:ss' });
                   var today  = new Date(start.start);
                   var hours = new Date();
                  //  $("#evDate").datepicker("setDate", start.start);
                  $("#evDate").val(today.toLocaleDateString()+" "+hours.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
                    $('#event-modal').modal('show');
                   
                    
                    
                }
            });

            calendar.render();
        }
    };
}();
$("#evuName").blur(function() {
    if($('#evuName').val()!=''){
        $('#evuName').css("border-color","#e4e6ef");
      }});
$("#evDescription").blur(function() {
        if($('#evDescription').val()!=''){
            $('#evDescription').css("border-color","#e4e6ef");
          }});
$("#evDate").blur(function() {
            if($('#evDate').val()!=''){
                $('#evDate').css("border-color","#e4e6ef");
              }});
$("#submit").click( function() {
    if($('#evuName').val()==''){
        $('#evuName').css("border-color","#C80000");
       return false;
      }
      if($('#evDescription').val()==''){
        $('#evDescription').css("border-color","#C80000");
       return false;
      };
      if($('#evDate').val()==''){
        $('#evDate').css("border-color","#C80000");
       return false;
      };
      var eventobj={
        "calendarEventId":0,
        "calendarEventName":document.getElementById("evuName").value,
        "calendarEventDescription":document.getElementById("evDescription").value,
        "calendarEventDate":document.getElementById("evDate").value,
        "calendarEventOnClickUrl":document.getElementById("evURL").value,
        "eventTypeId":document.getElementById("evSelect").value,
      }
      const data = JSON.stringify(eventobj);
      // console.log(data);
      $.ajax({
        url:  baseURL +'/Dashboard/AddCalendarEvent' ,
        data: data,
        type: 'post',
        headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'userToken': user.data.userToken,
            'userRoleId': user.data.userRoles[0].userRoleId,
            'branchId': user.data.userRoles[0].branchId,
            'branchRoleId': user.data.userRoles[0].branchRoleId,
            'Access-Control-Allow-Origin': '*',
        },
        dataType: 'json',
        success: function(response) {
            // if saved, close modal
            $("#event-modal").modal('hide');
            window.location.replace("home.html");         
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
                  
            console.log(errorThrown);

          }
    });
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
            let mstart ='';
            let eventcolor ='';
				for (var i = 0; i < response.data.calendar.length; i++) {
                    if(response.data.calendar[i].date !='')
                     mstart = (new Date(response.data.calendar[i].date)).toISOString();
                    else
                      mstart ='';
                      switch(response.data.calendar[i].eventTypeId) {
                        case 1:
                            eventcolor ='#fb9c56';
                          break;
                        case 2:
                            eventcolor ='#FF7F50';
                          break;
                        case 3:
                            eventcolor ='#FFF0FF';
                          break;
                        case 4:
                            eventcolor ='#FFE2BF';
                          break;
                        case 5:
                            eventcolor ='#FFE0D0';
                          break; 
                        case 6:
                            eventcolor ='#FF95ED';
                          break;
                        case 7:
                            eventcolor ='#ffc107';
                          break;
                        case 8:
                            eventcolor ='#FF00F0';
                          break;
                        case 9:
                            eventcolor ='#F0FF90';
                          break;
                        case 10:
                            eventcolor ='#FF8000';
                          break;
                        case 11:
                            eventcolor ='#FCFF00';
                          break;
                        case 12:
                            eventcolor ='#C0C0C0';
                          break;

                          case 13:
                            eventcolor ='#90ffec';
                          break;

                          case 14:
                            eventcolor ='#ffb890';
                          break;

                          case 15:
                            eventcolor ='#efcfff';
                          break;

                          case 16:
                            eventcolor ='#30f70c ';
                          break;
                          case 17:
                            eventcolor ='#65c454';
                          break;

                          case 18:
                            eventcolor ='#0c73f7';
                          break;
                          
                        
                        default:
                            eventcolor = '';
                      }
                    try{	eventList.push(
                            {
                                "title":response.data.calendar[i].name ,
                                "start":mstart,
                                
                                "description": response.data.calendar[i].description,
                                color:eventcolor,
                                url:response.data.calendar[i].onClickURL
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
