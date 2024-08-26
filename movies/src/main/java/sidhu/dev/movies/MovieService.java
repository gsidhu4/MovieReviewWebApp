package sidhu.dev.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Movie> findAllMovies() {
        return repository.findAll();
    }
    public Optional<Movie> findMovieByImdbId(String imdbId) {
        Optional<Movie> movieOpt = repository.findMovieByImdbId(imdbId);
        if (movieOpt.isPresent()) {
            Movie movie = movieOpt.get();

            // Fetch reviews manually based on reviewIds
            List<Review> reviews = reviewRepository.findAllById(movie.getReviewIds());
            movie.setReviews(reviews); // Set the reviews in the movie object
        }
        return movieOpt;
    }
}
