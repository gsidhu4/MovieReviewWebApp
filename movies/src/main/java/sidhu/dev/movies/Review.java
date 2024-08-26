package sidhu.dev.movies;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Review {
    @Id
    private ObjectId id;
    private String reviewBody;
    private LocalDateTime created;
    private LocalDateTime updated;
    private String imdbId;
    private String username;

    public Review(String reviewBody, String username, String imdbId, LocalDateTime created, LocalDateTime updated) {
        this.reviewBody = reviewBody;
        this.username = username;
        this.imdbId = imdbId;
        this.created = created;
        this.updated = updated;
    }
}
