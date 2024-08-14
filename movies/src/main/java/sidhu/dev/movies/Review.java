package sidhu.dev.movies;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Review {
    private ObjectId id;
    private String body;
    private LocalDateTime created;
    private LocalDateTime updated;
    private String username;

    public Review(String body,String username, LocalDateTime created, LocalDateTime updated) {
        this.body = body;
        this.username = username;
        this.created = created;
        this.updated = updated;
    }
}
