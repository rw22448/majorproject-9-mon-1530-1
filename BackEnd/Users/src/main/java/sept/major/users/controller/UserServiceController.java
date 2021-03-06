package sept.major.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import sept.major.common.exception.RecordNotFoundException;
import sept.major.users.entity.UserEntity;
import sept.major.users.service.UserService;

import java.io.File;
import java.util.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserServiceController {

    UserService userService;
    UserServiceControllerHelper userControllerHelper;

    @Autowired
    public UserServiceController(UserService userService, UserServiceControllerHelper userControllerHelper) {
        this.userService = userService;
        this.userControllerHelper = userControllerHelper;
    }

    @GetMapping("/username")
    public ResponseEntity getUser(@RequestParam String username) {
        return userControllerHelper.getEntity(username, String.class);
    }

    @PostMapping
    public ResponseEntity createUser(@RequestBody Map<String, String> requestBody) {
        return userControllerHelper.validateInputAndPost(UserEntity.class, requestBody);
    }

    @DeleteMapping
    public ResponseEntity deleteUser(@RequestParam String username) {
        return userControllerHelper.deleteEntity(username, String.class);
    }

    @PatchMapping
    public ResponseEntity updateUser(@RequestParam String username, @RequestBody Map<String, String> requestBody) {
        return userControllerHelper.validateInputAndPatch(UserEntity.class, username, String.class, requestBody);
    }

    /**
     * @return simple "ok" response to allow health check of the service to pass
     */
    @GetMapping("/health")
    public ResponseEntity<Object> getUserServiceHealth() {
    	MultiValueMap<String, String> s= new LinkedMultiValueMap<String, String>();
    	
    	s.add("Service:", "users");
    	
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
    
    @GetMapping("/bulk")
    public ResponseEntity<List<UserEntity>> getBulkUsers(@RequestParam(required = false) String userType) {
        try {
            List<UserEntity> entityList = userService.readBulkUsers(userType);
            return new ResponseEntity(entityList, HttpStatus.OK);
        } catch (RecordNotFoundException e) {
            return new ResponseEntity(new AbstractMap.SimpleEntry<>("message", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }


    /**
     * Endpoint for changing user password
     * @param username
     * @param oldPassword
     * @param newPassword
     * @return
     */
    @PatchMapping("/password") //TODO change to put
	public ResponseEntity updatePassword(@RequestParam String username, String oldPassword, String newPassword) {
        HashMap<String, String> response = new HashMap<>();
        response.put("username", username);
        response.put("oldPassword", oldPassword);
		try {
			userService.updatePassword(username, oldPassword, newPassword);
            response.put("status", "successful");
            return new ResponseEntity(response, HttpStatus.OK);
		} catch (RuntimeException e) {
            response.put("status", "failed");
            return new ResponseEntity(response, HttpStatus.NOT_FOUND);
		}

    }


    @PutMapping("/token")
    public ResponseEntity<Map> getToken(@RequestParam String username, String password) {
        Map<String, Object> response = new HashMap<>();
        response.put("username", username);
        Pair<Optional<String>, Optional<UserEntity>> loginResult = userService.login(username, password);
        if (loginResult.getFirst().isPresent()) {
            response.put("status", "successful");
            response.put("token", loginResult.getFirst().get());
            if (loginResult.getSecond().isPresent()) {
                response.put("user", loginResult.getSecond().get());
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("status", "failed");
            response.put("token", null);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
