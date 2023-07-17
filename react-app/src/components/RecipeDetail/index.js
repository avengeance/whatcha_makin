import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import OpenModalButton from "../OpenModalButton";

import CreateReviewModal from "../CreateReview";
import UpdateReviewModal from "../UpdateReview";
import DeleteReviewModal from "../DeleteReview";

import * as RecipeActions from "../../store/recipes";
import * as ReviewActions from "../../store/reviews";
import * as LikeActions from "../../store/likes";
import * as CommentActions from "../../store/comments";

import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const { closeModal, setModalContent } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const currRecipe = useSelector((state) => state.recipes.recipes[recipeId]);
  const currentReviews = useSelector((state) => state.reviews.reviews || []);

  const currentComments = useSelector((state) => state.comments.comments);
  const likesByRecipe = useSelector((state) => state.likes.likesByRecipe);

  const [currentRecipe, setCurrentRecipe] = useState({});
  const currentRecipes = useSelector((state) => state.recipes.recipes);

  const [reviews, setReviews] = useState([]);
  const [reviewPosted, setReviewPosted] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const postedRef = useRef(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipeId) {
      setLoading(true); // Assume that you are starting to load

      // Fetch recipe details
      dispatch(RecipeActions.getRecipeThunk(recipeId))
        .then((currentRecipes) => setCurrentRecipe(currentRecipes))
        .then((currentRecipes) => {
          if (currentRecipes?.Owner?.id) {
            setCurrentRecipe(currentRecipes);
          }
        })
        .catch((err) => console.log(err));

      // Fetch reviews for this recipe
      dispatch(ReviewActions.getAllReviewsThunk(recipeId))
        .then((reviews) => setReviews(reviews.Reviews))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false)); // End loading when all requests are completed
    } else {
      console.error("No recipeId");
    }
  }, [dispatch, recipeId, reviewPosted, refreshKey]);

  const isLoggedIn = !!user;
  const isRecipeOwner = user?.id === currentRecipe.owner_id;
  const hasReviewed = currentReviews.some(
    (review) => review && review.owner_id === user?.id
  );

  let button;

  if (isLoggedIn && !isRecipeOwner && !hasReviewed) {
    button = (
      <button id="post-review" onClick={handlePostReview}>
        Post Your Review
      </button>
    );
  }

  console.log("This is isLoggedIn:", isLoggedIn);
  console.log("This is isRecipeOwner", isRecipeOwner);
  console.log("This is has reviewed:", hasReviewed);
  console.log("This is curr recipe", currRecipe);
  console.log("This is user:", user);

  // useEffect(() => {
  //   if (recipeId) {
  //     dispatch(RecipeActions.getRecipeThunk(recipeId))
  //       .then((currentRecipes) => setCurrentRecipe(currentRecipes))
  //       .then((currentRecipe) => {
  //         if (currentRecipes?.Owner?.id) {
  //           setCurrentRecipe(currentRecipes);
  //           setLoading(false);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [dispatch, recipeId, reviewPosted]);

  function handlePostReview() {
    const modalContent = (
      <CreateReviewModal
        recipeId={recipeId}
        onReviewSubmit={handleReviewSubmit}
      />
    );
    setLoading(true);
    setModalContent(modalContent);
    setReviewPosted(true);
    postedRef.current = true;
    setLoading(false);
    history.push(`/recipes/${recipeId}`);
  }

  function handleReviewSubmit() {
    setReviewPosted(true);
    postedRef.current = true;
  }

  function handleUpdateReview(reviewId) {
    const modalContent = (
      <UpdateReviewModal
        recipeId={recipeId}
        reviewId={reviewId}
        onReviewSubmit={handlePostReview}
      />
    );
    history.push(`/recipes/${recipeId}`);
    setModalContent(modalContent);
  }

  function formatTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainderMinutes = minutes % 60;

    // Return a formatted string
    return `${hours} hr ${remainderMinutes} min`;
  }

  //   useEffect(() => {
  //     if (recipeId) {
  //       if (postedRef.current) {
  //         dispatch(ReviewActions.getAllReviewsThunk(recipeId))
  //           .then((reviews) => {
  //             setReviews(reviews.Reviews);
  //             setHasReviewed(
  //               currentReviews?.some((review) => review?.owner_id === user?.id)
  //             );
  //             setReviewPosted(false);
  //           })
  //           .catch((err) => console.log(err));
  //         postedRef.current = false;
  //       }
  //     }
  //   }, [dispatch, recipeId, refreshKey, user, reviewPosted]);

  // useEffect(() => {
  //   if (!recipeId) {
  //     console.error("No recipeId");
  //     return;
  //   }
  //   dispatch(ReviewActions.getAllReviewsThunk(recipeId))
  //     .then((reviews) => setReviews(reviews.Reviews))
  //     .catch((err) => console.log(err));
  // }, [dispatch, recipeId, refreshKey]);

  return (
    <>
      {currentRecipe && (
        <div>
          <div className="recipe-name-detail">
            <div id="recipe-name">
              <h2>{currentRecipe?.name}</h2>
            </div>
            <div className="recipe-owner-name">
              <h3>Recipe Created by: {currentRecipe?.owner_name}</h3>
            </div>
            <div className="recipe-review-likes-container">
              <div className="recipe-review">
                <i className="fas fa-star"></i>
                {/* {currentRecipe.avg_rating ? currentRecipe.avg_rating.toFixed(1) : 'New'} */}
                {/* {avgRating ? avgRating.toFixed(1) : 'New'} */}
                {currentRecipe ? (
                  <div>{currentRecipe.avg_rating}</div>
                ) : (
                  "Loading..."
                )}
              </div>
              <div className="recipe-likes">
                {currentRecipe?.likes > 0 ? (
                  <>
                    <i className="fa-solid fa-heart"></i> {currentRecipe?.likes}{" "}
                  </>
                ) : (
                  <>
                    <i className="far fa-heart"></i> New
                  </>
                )}
              </div>
            </div>
            <div id="recipe-detail-info">
              <div className="recipe-image">
                <div id="main-recipe-image">
                  <img
                    className="main-image"
                    src={
                      currentRecipe?.images && currentRecipe.images.length > 0
                        ? currentRecipe.images[0].url
                        : null
                    }
                    alt="Main Image"
                  />
                </div>
                <div className="recipe-image-overlay">
                  {currentRecipe?.images
                    ?.filter((image) => image.is_preview !== true)
                    .map((images, i) => (
                      <img
                        key={i}
                        className="recipe-images"
                        src={images.url}
                        alt={currentRecipe.name}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="recipe-description">
              <div className="recipe-description-time-container">
                <div className="recipe-description-owner-container">
                  <div className="recipe-description-text">
                    <h4>Recipe Description</h4>
                    <p>{currentRecipe?.description}</p>
                  </div>
                </div>
                <div className="recipe-time">
                  <h3>
                    Total Time to Cook - {formatTime(currentRecipe?.total_time)}
                  </h3>
                  <h4>Prep Time - {currentRecipe?.prep_time} min</h4>
                  <h4>Cook Time - {currentRecipe?.cook_time} min</h4>
                  <h3>Servings - {currentRecipe?.servings}</h3>
                </div>
              </div>
              <div className="recipe-ingredients-seasoning-containter">
                <div className="recipe-ingredients">
                  <h3>Ingredients</h3>
                  {currentRecipe?.ingredients &&
                    currentRecipe.ingredients
                      .filter((ingredient) => !ingredient.is_seasoning)
                      .map((ingredient, i) => (
                        <p key={i}>
                          {ingredient.quantity} {ingredient.measurement}{" "}
                          {ingredient.name}
                        </p>
                      ))}
                </div>
                <div className="recipe-seasoning">
                  <h3>Seasoning</h3>
                  {currentRecipe?.ingredients &&
                    currentRecipe.ingredients
                      .filter((ingredient) => ingredient.is_seasoning)
                      .map((ingredient, i) => (
                        <p key={i}>
                          {ingredient.quantity} {ingredient.measurement}{" "}
                          {ingredient.name}
                        </p>
                      ))}
                </div>
              </div>
            </div>
            <div id="recipe-directions-container">
              <div className="recipe-directions-container">
                <div className="recipe-directions">
                  <div id="direction-text">
                    <h3>Directions</h3>
                  </div>
                  {currentRecipe?.directions &&
                    currentRecipe.directions.map((direction, i) => (
                      <p key={i}>
                        {direction.step}: {direction.step_info}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div id="recipe-reviews-container">
              <div className="recipe-reviews-container">
                <div className="recipe-reviews">
                  <div className="recipe-review-header">
                    {currentRecipe ? (
                      <>
                        <div className="recipe-review-header">
                          <h3>
                            {currentRecipe?.reviews?.length === 0
                              ? "No Reviews Yet"
                              : currentRecipe?.reviews?.length === 1
                              ? "Review"
                              : "Reviews"}
                          </h3>
                        </div>
                        <div id="number-review">
                          <h4># {currentRecipe?.reviews?.length}</h4>
                        </div>
                      </>
                    ) : (
                      "Loading..."
                    )}
                  </div>
                </div>
                {/* {user && user.id !== currentRecipe?.owner_id && !hasReviewed ? (
                  <button id="post-review" onClick={handlePostReview}>
                    Post Your Review
                  </button>
                ) : null} */}
                {button}
                {currentReviews.map(
                  (review, i) =>
                    review && (
                      <div key={i} className="recipe-review-container">
                        <div className="recipe-review-user">
                          <div className="recipe-review-user-name">
                            <div id="review-owner-name">
                              <h3>{review?.owner_name}</h3>
                            </div>
                            <p>
                              <i
                                id="recipe-detail-star"
                                className="fas fa-star"
                              ></i>
                              {review?.stars}
                            </p>
                          </div>
                          <p id="review-created">{review?.created_at}</p>
                          <p>{review?.review}</p>
                        </div>
                        {user && user.id === review.owner_id && (
                          <div>
                            <OpenModalButton
                              buttonText={"Update"}
                              modalComponent={
                                <UpdateReviewModal
                                  recipeId={recipeId}
                                  reviewId={review.id}
                                  closeModal={closeModal}
                                  refreshKey={refreshKey}
                                  setRefreshKey={setRefreshKey}
                                />
                              }
                            />
                            <OpenModalButton
                              buttonText={"Delete Review"}
                              modalComponent={
                                <DeleteReviewModal
                                  recipeId={recipeId}
                                  reviewId={review.id}
                                  closeModal={closeModal}
                                  refreshKey={refreshKey}
                                  setRefreshKey={setRefreshKey}
                                />
                              }
                            />
                          </div>
                        )}
                      </div>
                    )
                )}
              </div>
            </div>
            {/* <div className='recipe-comments-container'>
                            <div className='recipe-comments'>
                                <div className='recipe-comment-header'>
                                    <h3>{currentRecipe?.comments?.length === 0 ? 'No Comments Yet' : currentRecipe.comments.length === 1 ? 'Comment' : 'Comments'}</h3>
                                </div>
                                {currentRecipe.comments.map((comment, i) => (
                                    <div key={i} className='recipe-comment-container'>
                                        <div className='recipe-comment-user'>
                                            <div className='recipe-comment-user-name'>
                                                <h3>{comment?.owner_name}</h3>
                                            </div>
                                            <p id='comment-created'>{comment?.created_at}</p>
                                        </div>
                                        <p>{comment?.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
