import React, { useState } from "react";
import styles from "./Review.module.css"; // Import the CSS module

type Review = {
  movieTitle: string;
  reviewText: string;
  rating: number;
};

const CreateReview: React.FC = () => {
  const [formData, setFormData] = useState<Review>({
    movieTitle: "",
    reviewText: "",
    rating: 0,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting review:", formData);

    // Example: Add API integration here
    // await axios.post('/api/reviews', formData);

    setSubmitted(true);
    setFormData({ movieTitle: "", reviewText: "", rating: 0 });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Create a Movie Review</h1>
      {submitted && <p className={styles.successMessage}>Review submitted successfully!</p>}
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <div className={styles.formGroup}>
          <label htmlFor="movieTitle" className={styles.label}>
            Movie Title
          </label>
          <input
            type="text"
            id="movieTitle"
            name="movieTitle"
            value={formData.movieTitle}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="reviewText" className={styles.label}>
            Review
          </label>
          <textarea
            id="reviewText"
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            required
            rows={5}
            className={styles.textarea}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rating" className={styles.label}>
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            min={1}
            max={5}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
