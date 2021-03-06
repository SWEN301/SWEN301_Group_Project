
angular.module('kps')
    .factory('MailService', service);

function service(EventService, $rootScope) {

    var mailList;

    var svc = {
        createMailEvent: createMailEvent,
        getFilteredMailList: getFilteredMailList,
        getMailList: getMailList
    };

    $rootScope.$on('logFileLoaded', function(){
        mailList = EventService.getMailEvents();
    });

    // mailList automatically updated on EventService.addEvent()
    function createMailEvent(eventData){
        var event = {
            day: eventData.day,
            to: eventData.route.to,
            from: eventData.route.from,
            weight: parseInt(eventData.weight),
            volume: parseInt(eventData.volume),
            priority: generateMailEventPriority(eventData),
            eventType: "mail"
        };
        EventService.addEvent(event);
    }

    function generateMailEventPriority(ev){
        if (ev.highPriority){
            return EventService.routeIsInternational(ev.route.to, ev.route.from) ?
                "International Air" : "Domestic Air";
        }
        else {
            return EventService.routeIsInternational(ev.route.to, ev.route.from) ?
                "International Standard" : "Domestic Standard";
        }
    }

    function getFilteredMailList(filter){
        return EventService.getFilteredMailEvents(filter);
    }
    
    function getMailList(){
        return mailList;
    }

    return svc;
}