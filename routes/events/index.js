const express = require('express');
const router = express.Router();
const EventTypeCtrl = require('../../controllers/events/EventType');
const AllEventsCtrl = require('../../controllers/events/getAllEvents');
const InsertEvent = require('../../controllers/events/EventController');
const GetEvent = require('../../controllers/events/getEvent');
const MonitoringEvent = require('../../controllers/events/monitoringEvent');
const GetEventId1 = require('../../controllers/events/getEventTypeId1');
const GetEventId2 = require('../../controllers/events/getEventTypeId2');
const GetEventID = require('../../controllers/events/getEventID');
const countReport = require('../../controllers/events/reportByEvent');
const ReportStatus = require('../../controllers/events/getReport_Event');


router.get('/', (req, res) => {
    data = "";
    res.render('events/index', { message_peticion: data });
});

router.post("/getEventType", EventTypeCtrl);
router.post("/getAllEvents", AllEventsCtrl);
router.post('/insert', InsertEvent);
router.post('/getEventInfo', GetEvent);
router.post('/getEventTypebyId1', GetEventId1);
router.post('/getEventTypebyId2', GetEventId2);
router.post('/monitoringEventInfo', MonitoringEvent);
router.post('/eventID', GetEventID);
router.post('/reportByEventCount', countReport);
router.post('/getReport_EventStatus', ReportStatus);


module.exports = router;
