import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useModal } from "../../context/Modal";

import OpenModalButton from "../OpenModalButton";

import CreateReviewModal from "../CreateReview";
import UpdateReviewModal from "../UpdateReview";
import DeleteReviewModal from "../DeleteReview";
import LoadingPage from "../LoadingPage";

import * as RecipeActions from "../../store/recipes";
import * as ReviewActions from "../../store/reviews";
import * as LikeActions from "../../store/likes";
import * as CommentActions from "../../store/comments";

import "./RecipeDetail.css";
// import "./OpenModalButton.css";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const { closeModal, setModalContent } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const user = useSelector((state) => state.session.user);
  const userId = useSelector((state) => state.session.user?.id);
  // const currRecipe = useSelector((state) => state.recipes.recipes[recipeId]);
  const currentReviews = useSelector((state) => state.reviews.reviews || []);

  // const currentComments = useSelector((state) =>
  //   Object.values(state.recipes.comments)
  // );

  const currentComments = useSelector((state) => state.recipes.comments);
  const likesByRecipe = useSelector((state) => state.likes);

  // console.log("current comments", currentComments);
  // console.log("current reviews", currentReviews);
  console.log("current user ID:", userId);
  console.log("Likes by recipe:", likesByRecipe);

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
    if (location.pathname === "/recipes/new") {
      setReviews([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      setReviews([]);
    };
  }, []);

  useEffect(() => {
    if (recipeId) {
      setLoading(true);

      dispatch(RecipeActions.getRecipeThunk(recipeId))
        .then((currentRecipes) => setCurrentRecipe(currentRecipes))
        .then((currentRecipes) => {
          if (currentRecipes?.Owner?.id) {
            setCurrentRecipe(currentRecipes);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });

      // dispatch(ReviewActions.getAllReviewsThunk(recipeId))
      //   .then((reviews) => setReviews(reviews.Reviews))
      //   .catch((err) => console.log(err))
      //   .finally(() => {
      //     setLoading(false);
      //   });

      // dispatch(CommentActions.getAllCommentsThunk(recipeId))
      //   .then((comments) => setComments(comments.Comments))
      //   .catch((err) => console.log(err))
      //   .finally(() => {
      //     setLoading(false);
      //   });

      dispatch(LikeActions.getLikesByRecipeThunk(recipeId)).then((likes) => {
        const userLike = likes.find((like) => like.user_id === userId);
        setLiked(!!userLike);
      });
    } else {
      console.error("No recipeId");
    }
  }, [dispatch, recipeId, reviewPosted, refreshKey]);

  const isLoggedIn = !!user;
  const isRecipeOwner = userId === currentRecipe.owner_id;
  const hasReviewed = currentRecipe.reviews?.some(
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
    setLoading(false);
    setReviewPosted(true);
    postedRef.current = true;
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
        onReviewSubmit={handleReviewSubmit}
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

  const handleLike = () => {
    dispatch(LikeActions.createRecipeLikeThunk(recipeId)).then(() => {
      setLiked(true);
      dispatch(RecipeActions.getRecipeThunk(recipeId));
      setRefreshKey(refreshKey + 1);
    });
  };

  const handleUnlike = () => {
    const likesObj = Object.values(likesByRecipe.likes).find(
      (like) => like.user_id === userId && like.recipe_id === parseInt(recipeId)
    );
    if (!likesObj) {
      console.error("No like found for the current user and recipe");
      return;
    }
    const likeId = likesObj.id;
    dispatch(LikeActions.deleteRecipeLikeThunk(recipeId, likeId)).then(() => {
      setLiked(false);
      dispatch(RecipeActions.getRecipeThunk(recipeId));
      setRefreshKey(refreshKey + 1);
    });
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          {currentRecipe && (
            <div>
              <div className="recipe-name-detail">
                <div id="recipe-name">
                  <h2>{currentRecipe?.name}</h2>
                </div>
                <div className="recipe-owner-name">
                  <h3 id="h3-recipe-name">
                    Recipe Created by: {currentRecipe?.owner_name}
                  </h3>
                </div>
                <div className="recipe-detail-review-likes-container">
                  <div className="recipe-detail-review">
                    <i className="fas fa-star"></i>
                    {currentRecipe ? (
                      <div>
                        {!isNaN(currentRecipe.avg_rating)
                          ? parseFloat(currentRecipe.avg_rating).toFixed(1)
                          : "New"}
                      </div>
                    ) : (
                      "New"
                    )}
                  </div>
                  <div className="recipe-likes">
                    {currentRecipe?.likes > 0 ? (
                      <>
                        {liked ? (
                          <i
                            className="fa-solid fa-heart liked"
                            onClick={() => {
                              if (user) handleUnlike();
                            }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-heart"
                            onClick={() => {
                              if (user) handleLike();
                            }}
                          ></i>
                        )}{" "}
                        {currentRecipe?.likes}{" "}
                      </>
                    ) : (
                      <>
                        {liked ? (
                          <i
                            className="fa-solid fa-heart liked"
                            onClick={() => {
                              if (user) handleUnlike();
                            }}
                          ></i>
                        ) : (
                          <i
                            className="far fa-heart"
                            onClick={() => {
                              if (user) handleLike();
                            }}
                          ></i>
                        )}{" "}
                        New
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
                          currentRecipe?.images &&
                          currentRecipe.images.length > 0
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
                        Total Time to Cook -{" "}
                        {formatTime(currentRecipe?.total_time)}
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
                    {button}
                    {currentRecipe.reviews?.map(
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
                                <div className="update-button">
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
                                </div>
                                <div className="delete-button">
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
                              </div>
                            )}
                          </div>
                        )
                    )}
                  </div>
                  <div className="recipe-comments-container">
                    <div className="recipe-comments">
                      <div className="recipe-comment-header">
                        {currentRecipe ? (
                          <div className="recipe-comment-header">
                            <h3>
                              {currentRecipe?.comments?.length === 0
                                ? "No Comments Yet"
                                : currentRecipe?.comments?.length === 1
                                ? "Comment"
                                : "Comments"}
                            </h3>
                          </div>
                        ) : (
                          "Loading..."
                        )}
                      </div>
                      {currentRecipe.comments.map(
                        (comment, i) => (
                          console.log("comments map", comment),
                          (
                            <div key={i} className="recipe-comment-container">
                              <div className="recipe-comment-user">
                                <div className="recipe-comment-user-name">
                                  <h3>{comment?.owner_name}</h3>
                                </div>
                                <p id="comment-created">
                                  {comment?.created_at}
                                </p>
                                <p>{comment?.comment}</p>
                              </div>
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
