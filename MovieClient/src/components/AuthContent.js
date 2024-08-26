import React, { useRef, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Reviews = ({ movie, setReviews, reviews }) => {
  const { user } = useContext(UserContext);
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const { movie, reviews } = response.data;
        setReviews(reviews);  // Ensure you're setting the reviews from the API response
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    fetchReviews();
  }, [movieId, setReviews]);
  

  const addReview = async (e) => {
    e.preventDefault();
  
    const rev = revText.current;
    const username = user?.username || "Anonymous";
  
    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
        username: username
      });
  
      const newReview = response.data;
  
      setReviews(prevReviews => [...prevReviews, newReview]);
  
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
  <React.Fragment key={r._id || index}>
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


