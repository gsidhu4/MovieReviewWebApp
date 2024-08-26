package sidhu.dev.movies;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewService service;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MovieRepository movieRepository; // Add MovieRepository to update movies

    // Endpoint to get reviews by IMDb ID
    @PostMapping("/byImdbId")
    public ResponseEntity<List<Review>> getReviewsByImdbId(@RequestBody Map<String, String> request) {
        String imdbId = request.get("imdbId");
        if (imdbId == null || imdbId.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        // Assuming you have a method in the ReviewRepository to find reviews by imdbId
        List<Review> reviews = reviewRepository.findByImdbId(imdbId);

        return ResponseEntity.ok(reviews);
    }


    // Endpoint to create a review
    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        try {
            // Save the review
            Review savedReview = reviewRepository.save(review);

            // Update the movie with the new review ID
            Movie movie = movieRepository.findByImdbId(review.getImdbId());
            if (movie != null) {
                movie.getReviewIds().add(savedReview.getId());
                movieRepository.save(movie);
            }

            return ResponseEntity.ok(savedReview);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}


