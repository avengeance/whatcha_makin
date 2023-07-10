import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';

import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from '../CreateReview';
import UpdateReviewModal from '../UpdateReview';
import DeleteReviewModal from '../DeleteReview';

import * as RecipeActions from '../../store/recipes';
import * as ReviewActions from '../../store/reviews';
import * as LikeActions from '../../store/likes';
import * as CommentActions from '../../store/comments';

import "./RecipeDetail.css";

const RecipeDetail = () => {
    const { recipeId } = useParams();
    const { closeModal, setModalContent } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const currentReviews = useSelector((state) => state.reviews.reviews);
    const currentComments = useSelector((state) => state.comments.comments);
    const user = useSelector((state) => state.session.user);
    const likesByRecipe = useSelector((state) => state.likes.likesByRecipe);

    const [currentRecipes, setCurrentRecipes] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isLoading, setIsloading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(RecipeActions.getRecipeThunk(recipeId))
            .then(currentRecipes => setCurrentRecipes(currentRecipes))
            .then(currentRecipes => {
                if (currentRecipes?.Owner?.id) {
                    setCurrentRecipes(currentRecipes);
                }
            })
            .catch(err => console.log(err))
    }, [dispatch, recipeId]);


    function handlePostReview() {
        const modalContent = <CreateReviewModal />;
        history.push(`/recipes/${recipeId}`);
        setModalContent(modalContent);
    }

    useEffect(() => {
        if (!recipeId) {
            console.error('No recipeId');
            return
        }
        dispatch(ReviewActions.getAllReviewsThunk(recipeId))
            .then(reviews => setReviews(reviews.Reviews))
            .catch(err => console.log(err))
        dispatch(CommentActions.getAllCommentsThunk(recipeId))
            .then(comments => setComments(comments.Comments))
            .catch(err => console.log(err))
        dispatch(LikeActions.getLikesByRecipeThunk(recipeId))
            .then(likes => setLiked(likes.likes))
            .catch(err => console.log(err))
    }, [dispatch, recipeId])

    return (
        <div>
            {currentRecipes && (
                <div>
                    <div className="recipe-name-detail">
                        <div id='recipe-name'>
                            <h2>{currentRecipes?.name}</h2>
                        </div>
                        <div className='recipe-review-likes-container'>
                            <div className='recipe-review'>
                                <i className='fas fa-star'></i>
                                {currentRecipes.avg_rating ? currentRecipes.avg_rating.toFixed(1) : 'New'}
                            </div>
                            <div className='recipe-likes'>
                                {currentRecipes?.likes > 0
                                    ? <><i className="fa-solid fa-heart"></i>  {currentRecipes?.likes} </>
                                    : <><i className="far fa-heart"></i> New</>}
                            </div>
                        </div>
                        <div id='recipe-detail-info'>
                            <div className='recipe-image'>
                                <div id='main-recipe-image'>
                                    <img src={currentRecipes?.images && currentRecipes.images.length > 0
                                        ? currentRecipes.images[0].url : null} alt='Main Image' />
                                </div>
                                <div className='recipe-image-overlay'>
                                    {currentRecipes?.images?.filter(image => image.is_preview !== true).map((images, i) => (
                                        <img key={i} className="recipe-images" src={images.url} alt={currentRecipes.name} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='recipe-description'>
                            <div className='recipe-description-time-container'>
                                <div className='recipe-description-owner-container'>
                                    <div className='recipe-owner-name'>
                                        <h2>Recipe Created by: {currentRecipes?.owner_name}</h2>
                                    </div>
                                    <div className='recipe-description'>
                                        <p>{currentRecipes?.description}</p>
                                    </div>
                                </div>
                                <div className='recipe-time'>
                                    <h3>Total Time to Cook - {currentRecipes?.total_time} min</h3>
                                    <h4>Prep Time - {currentRecipes?.prep_time} min</h4>
                                    <h4>Cook Time - {currentRecipes?.cook_time} min</h4>
                                    <h3>Servings - {currentRecipes?.servings}</h3>
                                </div>
                            </div>
                            <div className='recipe-ingredients-seasoning-containter'>
                                <div className='recipe-ingredients'>
                                    <h3>Ingredients</h3>
                                    {currentRecipes?.ingredients &&
                                        currentRecipes.ingredients
                                            .filter(ingredient => !ingredient.is_seasoning)
                                            .map((ingredient, i) => (
                                                <p key={i}>
                                                    {ingredient.quantity} {ingredient.measurement} {ingredient.name}
                                                </p>
                                            ))}
                                </div>
                                <div className='recipe-seasoning'>
                                    <h3>Seasoning</h3>
                                    {currentRecipes?.ingredients &&
                                        currentRecipes.ingredients
                                            .filter(ingredient => ingredient.is_seasoning)
                                            .map((ingredient, i) => (
                                                <p key={i}>
                                                    {ingredient.quantity} {ingredient.measurement} {ingredient.name}
                                                </p>
                                            ))}
                                </div>
                            </div>
                        </div>
                        <div className='recipe-directions-container'>
                            <div className='recipe-directions'>
                                <h3>Directions</h3>
                                {currentRecipes?.directions &&
                                    currentRecipes.directions.map((direction, i) => (
                                        <p key={i}>{direction.step}: {direction.step_info}</p>
                                    ))}
                            </div>
                        </div>
                        <div className='recipe-reviews-container'>
                            <div className='recipe-reviews'>
                                <div className='recipe-review-header'>
                                    <h3>{currentRecipes?.reviews?.length === 0 ? 'No Reviews Yet' : currentRecipes.reviews.length === 1 ? 'Review' : 'Reviews'}</h3>
                                </div>
                                <p>Number of Reviews: {currentRecipes?.reviews?.length}</p>
                                <p> Rating: <i className='fas fa-star'></i> {currentRecipes.avg_rating}</p>
                                {currentReviews.map((review, i) => (
                                    <div key={i} className='recipe-review-container'>
                                        <div className='recipe-review-user'>
                                            <div className='recipe-review-user-name'>
                                                <h3>{review?.owner_name}</h3>
                                                <p><i className='fas fa-star'></i>{review?.stars}</p>
                                            </div>
                                            <p id='review-created'>{review?.created_at}</p>
                                        </div>
                                        <p>{review?.review}</p>
                                        {user && user.id === review.owner_id && (
                                            <div>
                                                <button onClick={() => setIsModalOpen(true)}>Update</button>
                                                {isModalOpen && <UpdateReviewModal onClose={() => setIsModalOpen(false)} />}
                                                <button onClick={() => DeleteReviewModal(review)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='recipe-comments-container'>
                            <div className='recipe-comments'>
                                <div className='recipe-comment-header'>
                                    <h3>{currentRecipes?.comments?.length === 0 ? 'No Comments Yet' : currentRecipes.comments.length === 1 ? 'Comment' : 'Comments'}</h3>
                                </div>
                                {currentRecipes.comments.map((comment, i) => (
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RecipeDetail;
