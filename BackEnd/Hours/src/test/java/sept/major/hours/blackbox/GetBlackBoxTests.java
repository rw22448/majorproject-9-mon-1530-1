package sept.major.hours.blackbox;

import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testcontainers.shaded.com.fasterxml.jackson.core.JsonProcessingException;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static sept.major.hours.HoursTestHelper.randomEntityMap;

@PropertySource("classpath:application-test.properties")
public class GetBlackBoxTests extends HoursBlackBoxHelper {

    @Test
    public void getById() throws JsonProcessingException {
        Map<String, String> postResultMap = successfulPost(randomEntityMap(null));

        HashMap<String, String> queryValues = new HashMap<>();
        queryValues.put("workerUsername", "foo");

        ResponseEntity<String> getResult = testRestTemplate.getForEntity(getUrl("all"), String.class, queryValues);

        System.out.println(getResult);
        assertThat(getResult.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getResult.getBody()).isEqualTo(new ObjectMapper().writeValueAsString(postResultMap));

    }
}