import React, { useRef, useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Reviews = ({ getMovieData, reviews, setReviews }) => {
  const { user } = useContext(UserContext);
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const data = response.data;
        console.log("Fetched movie data:", data);
        setMovie(data);

        // Fetch reviews by imdbId
        if (data.imdbId) {
          const reviewsResponse = await api.post('/api/v1/reviews/byImdbId', { imdbId: data.imdbId });
          setReviews(reviewsResponse.data);
        }
      } catch (error) {
        console.error("Error loading movie data:", error);
      }
    };
  
    loadMovieData();
  }, [movieId]);

  useEffect(() => {
    localStorage.setItem(`reviews-${movieId}`, JSON.stringify(reviews));
  }, [movieId, reviews]);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;
    const username = user?.username || "Anonymous";

    try {
        const response = await api.post("/api/v1/reviews", {
            reviewBody: rev.value,
            imdbId: movie?.imdbId || "",
            username: username
        });

        const newReview = response.data;
        console.log("API Response:", newReview);

        // Update state with the new review including username
        setReviews(prevReviews => {
            console.log("Reviews before update:", prevReviews);
            const updatedReviews = [newReview, ...prevReviews]; // Add the new review to the front of the list
            console.log("Updated reviews:", updatedReviews);
            return updatedReviews;
        });

        rev.value = "";
    } catch (err) {
        console.error("Error adding review:", err);
    }
};


  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col>
          {movie?.poster ? (
            <img src={movie.poster} alt="Movie Poster" style={{ maxWidth: '100%', height: 'auto' }} />
          ) : (
            <p>Poster not available</p>
          )}
        </Col>
        <Col>
          <Row>
            <Col>
              <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
          {reviews?.length > 0 ? (
            reviews.map((r, index) => (
              <React.Fragment key={r._id || index}>
                <Row>
                  <Col>
                    <strong>{r.username}:</strong> {r.reviewBody}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </React.Fragment>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;



