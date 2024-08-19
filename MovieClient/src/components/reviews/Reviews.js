import React, { useRef, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const { user } = useContext(UserContext);
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId]);

  useEffect(() => {
    localStorage.setItem(`reviews-${movieId}`, JSON.stringify(reviews));
  }, [movieId]);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;
    const username = user?.username || "Anonymous"; // Use the logged-in username or "Anonymous"

    try {
        const response = await api.post("/api/v1/reviews", {
            reviewBody: rev.value,
            imdbId: movieId,
            username: username
        });

        const newReview = response.data;
        console.log("API Response:", newReview); // Log the response to verify the structure

        // Update state with the new review including username
        setReviews(prevReviews => {
            console.log("Reviews before update:", prevReviews); // Log previous reviews
            const updatedReviews = [...prevReviews, newReview];
            console.log("Updated reviews:", updatedReviews); // Log updated reviews
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
          <img src={movie?.poster} alt="Movie Poster" />
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
         {reviews?.map((r, index) => (
    <React.Fragment key={r.id || index}>
        <Row>
            <Col>
                <strong>{r.username}:</strong> {r.body}
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
    </React.Fragment>
))}
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
