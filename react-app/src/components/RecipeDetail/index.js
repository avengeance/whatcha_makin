import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';

import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from '../CreateReview';
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

    const currentRecipe = useSelector((state) => state.recipes.recipes[recipeId]);
    const ownerId = useSelector((state) => state.session.user?.id);
    const likesByRecipe = useSelector((state) => state.likes.likesByRecipe);

    const [currentRecipes, setCurrentRecipes] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isLoading, setIsloading] = useState(true);

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

    // useEffect(() => {
    //     setIsloading(true);
    //     dispatch(RecipeActions.getRecipeThunk(recipeId))
    //         .then((data) => {
    //             console.log("this is data:", data)
    //             setIsloading(false);
    //         })
    // }, [dispatch, recipeId])

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

    // if (isLoading) {
    //     return <div>Loading.....</div>
    // }

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
                            <div className='recipe-description-time-container'>
                                <div className='recipe-description'>
                                    <h2>{currentRecipes?.owner_name}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RecipeDetail;
