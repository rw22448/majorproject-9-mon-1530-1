package sept.major.availability.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import sept.major.availability.entity.BookingResponse;
import sept.major.availability.entity.HoursResponse;
import sept.major.availability.service.AvailabilityPair;
import sept.major.availability.service.AvailabilityService;
import sept.major.availability.service.connector.BookingServiceConnector;
import sept.major.availability.service.connector.HoursServiceConnector;
import sept.major.availability.service.connector.ServiceConnectorException;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.AbstractMap;
import java.util.List;

/**
 * availability controller is the entry point for the service that receives the REST calls.
 * It works with hours and bookings services to process and return relevant results without
 * directly communicating with the database.
 */
@RestController
@RequestMapping("/availability")
@CrossOrigin
public class AvailabilityController {

    private static final Logger log = LoggerFactory.getLogger(AvailabilityController.class);

    @Autowired
    public Environment env;

    @Autowired
    RestTemplate restTemplate;
    @Autowired
    private AvailabilityService availabilityService;

    @Autowired
    private HoursServiceConnector hoursServiceConnector;

    @Autowired
    private BookingServiceConnector bookingServiceConnector;

    /**
     * @return simple "ok" response to allow health check of the service to pass
     */
    @GetMapping("/health")
    public ResponseEntity<Object> getAvailabilityServiceHealth() {
    	MultiValueMap<String, String> s= new LinkedMultiValueMap<String, String>();
    	
    	s.add("Service:", "availability");
    	
    	try {
    		s.add("availableProcessors:", "" + Runtime.getRuntime().availableProcessors());
		} catch (Exception e) {
			s.add("Getting processor details excption:", e.getMessage());
		}
		
    	try {
			s.add("totalMemory:", "" + Runtime.getRuntime().totalMemory());
			s.add("freeMemory", "" + Runtime.getRuntime().freeMemory());
			s.add("maxMemory:", "" + Runtime.getRuntime().maxMemory());

		} catch (Exception e) {
			s.add("Getting memory details excption:", e.getMessage());
		}

    	try {
			File diskPartition = new File("/");
			s.add("getTotalSpace:", "" + diskPartition.getTotalSpace());
			s.add("getFreeSpace:", "" + diskPartition.getFreeSpace());
			s.add("getUsableSpace:", "" + diskPartition.getUsableSpace());
    	} catch (Exception e) {
    		s.add("Getting disk details excption:", e.getMessage());
    	}
    	
    	return new ResponseEntity<Object>(""+s, HttpStatus.OK);
    }

    /**
     * This method will get user's available hours in the range get user's booked times overlay the booking on the availability calculate the result and return
     * as a list
     *
     * @param token authorization token to identify the session
     * @param requesterUsername
     * @param startDateString requests start date
     * @param endDateString requests end date
     * @param workerUsername worker username filter
     * @param creatorUsername creator/supervisor username filter
     * @param customerUsername
     * @return available hours for the worker with the given filters
     */
    @GetMapping("/range")
    public ResponseEntity getAvailabilityInRange(@RequestHeader("Authorization") String token,
                                                 @RequestHeader("username") String requesterUsername,
                                                 @RequestParam(name = "startDateTime") String startDateString,
                                                 @RequestParam(name = "endDateTime") String endDateString,
                                                 @RequestParam(required = false) String workerUsername,
                                                 @RequestParam(required = false) String creatorUsername,
                                                 @RequestParam(required = false) String customerUsername) {

        log.info("startDateTime:{}, endDateTime:{}, workerUsername:{}, creatorUsername:{}, ", startDateString, endDateString, workerUsername, creatorUsername);

        List<HoursResponse> hoursList;
        List<BookingResponse> bookingsList;
        try {
            hoursList = hoursServiceConnector.getRange(token, requesterUsername, startDateString, endDateString, workerUsername, creatorUsername);
            log.info(hoursList.toString());
            bookingsList = bookingServiceConnector.getRange(token, requesterUsername, startDateString, endDateString, workerUsername, customerUsername);
            log.info(bookingsList.toString());
        } catch (ServiceConnectorException e) {
            return new ResponseEntity(e.getJsonFormat(), HttpStatus.BAD_REQUEST);
        }

        return evaluateAvailabilities(hoursList, bookingsList);
    }

    /**
     * Return availabilities for a given worker for a given date using hours and bookings services
     *
     * @param token authorization token to identify the session
     *@param requesterUsername
     * @param dateString date string filter
     * @param workerUsername worker username filter
     * @param creatorUsername
     * @param customerUsername
     *@return available hours for the worker with the given filters
     */
    @GetMapping("/date")
    public ResponseEntity getAvailabilityInDate(@RequestHeader("Authorization") String token,
                                                @RequestHeader("username") String requesterUsername,
                                                @RequestParam(name = "date") String dateString,
                                                @RequestParam(required = false) String workerUsername,
                                                @RequestParam(required = false) String creatorUsername,
                                                @RequestParam(required = false) String customerUsername) {

        log.info("dateString:{}, workerUsername:{}, creatorUsername:{}, ", dateString, workerUsername, creatorUsername);

        List<HoursResponse> hoursList;
        List<BookingResponse> bookingsList;
        try {
            hoursList = hoursServiceConnector.getDate(token, requesterUsername, dateString, workerUsername, creatorUsername);
            log.info(hoursList.toString());
            bookingsList = bookingServiceConnector.getDate(token, requesterUsername, dateString, workerUsername, customerUsername);
            log.info(bookingsList.toString());
        } catch (ServiceConnectorException e) {
            return new ResponseEntity(e.getJsonFormat(), HttpStatus.BAD_REQUEST);
        }

        return evaluateAvailabilities(hoursList, bookingsList);

    }


    /**
     * return all available hours for the given worker and creator using the hours and bookings services
     *
     * @param token authorization token to identify the session
     * @param requesterUsername
     * @param workerUsername worker username filter
     * @param creatorUsername
     * @param customerUsername
     * @return available hours for the worker with the given filter
     */
    @GetMapping("/all")
    public ResponseEntity getAllAvailabilities(@RequestHeader("Authorization") String token,
                                               @RequestHeader("username") String requesterUsername,
                                               @RequestParam(required = false) String workerUsername,
                                               @RequestParam(required = false) String creatorUsername,
                                               @RequestParam(required = false) String customerUsername) {
        log.info("workerUsername:{}, creatorUsername:{}, ", workerUsername, creatorUsername);

        List<HoursResponse> hoursList;
        List<BookingResponse> bookingsList;
        try {
            hoursList = hoursServiceConnector.getAll(token, requesterUsername, workerUsername, creatorUsername);
            log.info(hoursList.toString());
            bookingsList = bookingServiceConnector.getAll(token, requesterUsername, workerUsername, customerUsername);
            log.info(bookingsList.toString());
        } catch (ServiceConnectorException e) {
            return new ResponseEntity(e.getJsonFormat(), HttpStatus.BAD_REQUEST);
        }

        return evaluateAvailabilities(hoursList, bookingsList);
    }


    /**
     * Return specific available time slots to the requestor but similar to the general service but results are returned in time slots.
     * @param token
     * @param requesterUsername
     * @param workerUsername
     * @param creatorUsername
     * @param customerUsername
     * @param dateString
     * @return
     */
    @GetMapping("slot/date")
    public ResponseEntity getSlotsOnDate(@RequestHeader("Authorization") String token,
                                         @RequestHeader("username") String requesterUsername,
                                         @RequestParam(required = false) String workerUsername,
                                         @RequestParam(required = false) String creatorUsername,
                                         @RequestParam(required = false) String customerUsername,
                                         @RequestParam(name = "date") String dateString) {
        LocalDate date;
        try {
            date = LocalDate.parse(dateString);
        } catch (DateTimeParseException e) {
            return new ResponseEntity(new AbstractMap.SimpleEntry<>("message", "Provided date must have YYYY-MM-DD format"), HttpStatus.BAD_REQUEST);
        }

        List<HoursResponse> hoursList;
        List<BookingResponse> bookingsList;

        LocalDate endDate = availabilityService.findEndOfWeek(date);

        try {
            hoursList = hoursServiceConnector.getRange(token, requesterUsername, date.atStartOfDay().toString(), endDate.atTime(23, 59, 59).toString(), workerUsername, creatorUsername);
            log.info(hoursList.toString());
            bookingsList = bookingServiceConnector.getRange(token, requesterUsername, date.atStartOfDay().toString(), endDate.atTime(23, 59, 59).toString(), workerUsername, customerUsername);
            log.info(bookingsList.toString());
        } catch (ServiceConnectorException e) {
            return new ResponseEntity(e.getJsonFormat(), HttpStatus.BAD_REQUEST);
        }


        return new ResponseEntity(availabilityService.getTimeSlots(date, endDate, availabilityService.checkAllAvailabilities(hoursList, bookingsList)), HttpStatus.OK);
    }

    /**
     * Return available time slots to the requestor starting but similar to the general service but results are returned in time slots. It calculates the availability in
     * time slots and for the number of weeks passed in increment starting from this week.
     *
     * @param token             authorization token to identify the session
     * @param requesterUsername
     * @param workerUsername    worker username filter
     * @param creatorUsername   creator/supervisor username filter
     * @param customerUsername
     * @param increment         the increment in weeks
     * @return
     */
    @GetMapping("slot/now")
    public ResponseEntity getTimeSlotsNow(@RequestHeader("Authorization") String token,
                                          @RequestHeader("username") String requesterUsername,
                                          @RequestParam(required = false) String workerUsername,
                                          @RequestParam(required = false) String creatorUsername,
                                          @RequestParam(required = false) String customerUsername,
                                          @RequestParam(name = "from", required = false) Integer increment) {
        LocalDate date = LocalDate.now();
        if (increment != null) {
            date = availabilityService.findStartOfWeek(date).plusWeeks(increment);
        }
        return getSlotsOnDate(token, requesterUsername, workerUsername, creatorUsername, customerUsername, date.toString());
    }

    private ResponseEntity evaluateAvailabilities(List<HoursResponse> hoursResponses, List<BookingResponse> bookingResponses) {
        if (hoursResponses.isEmpty()) {
            return new ResponseEntity(new AbstractMap.SimpleEntry("message", "found no hours in the range provided"), HttpStatus.NOT_FOUND);
        }

        AvailabilityPair allAvailabilities = availabilityService.checkAllAvailabilities(hoursResponses, bookingResponses);

        if (allAvailabilities.isEmpty()) {
            return new ResponseEntity(new AbstractMap.SimpleEntry("message", "found no availabilities in the range provided"), HttpStatus.NOT_FOUND);
        }


        return new ResponseEntity(allAvailabilities, HttpStatus.OK);
    }


}
