/**
 * Created by schandramouli on 10/28/16.
 */

$(document).ready(function() {
    $(".calendar").weekCalendar({
        timeslotsPerHour: 6,
        timeslotHeight: 30,
        hourLine: true,
        height: function($calendar) {
            return $(window).height() - $('h1').outerHeight(true);
        },
        eventRender : function(calEvent, $event) {
            if (calEvent.end.getTime() < new Date().getTime()) {
                $event.css('backgroundColor', '#aaa');
                $event.find('.time').css({'backgroundColor': '#999', 'border':'1px solid #888'});
            }
        },
        eventNew: function(calEvent, $event) {
            displayMessage('<strong>Added event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
            calEvent = getEventDetails(calEvent);
            console.log(this);
            this.eventRender(calEvent, $event);
            //alert('You\'ve added a new event. You would capture this event, add the logic for creating a new event with your own fields, data and whatever backend persistence you require.');
        },
        eventDrop: function(calEvent, $event) {
            displayMessage('<strong>Moved Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventResize: function(calEvent, $event) {
            displayMessage('<strong>Resized Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventClick: function(calEvent, $event) {
            displayMessage('<strong>Clicked Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
            var shouldEdit = prompt("Edit event?");
            if (shouldEdit) {
                calEvent = getEventDetails(calEvent);
            }

        },
        eventMouseover: function(calEvent, $event) {
            displayMessage('<strong>Mouseover Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventMouseout: function(calEvent, $event) {
            displayMessage('<strong>Mouseout Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        noEvents: function() {
            displayMessage('There are no events for this week');
        }
    });

    function displayMessage(message) {
        $('#message').html(message).fadeIn();
    }

    function getEventDetails(calEvent) {
        var eventName = prompt("Event name?");
        if (eventName !== null) {
            calEvent.title = eventName;
        } else {
            calEvent = null;
        }
        return calEvent;
    }

    $('<div id="message" class="ui-corner-all"></div>').prependTo($('body'));
});