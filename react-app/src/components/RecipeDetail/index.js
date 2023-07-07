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

    // useEffect(() => {
    //     dispatch(RecipeActions.getRecipeThunk(recipeId))
    //         .then(currentRecipe => setCurrentRecipe(currentRecipe))
    //         .then(currentRecipe => {
    //             if (currentRecipe?.Owner?.id) {
    //                 setCurrentRecipe(currentRecipe);
    //             }
    //         })
    //         .catch(err => console.log(err))
    //     }, [dispatch, recipeId]);

    useEffect(() => {
        setIsloading(true);
        dispatch(RecipeActions.getRecipeThunk(recipeId))
            .then((data) => {
                console.log("this is data:", data)
                setIsloading(false);
            })
    }, [dispatch, recipeId])

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

    if (isLoading) {
        return <div>Loading.....</div>
    }

    return (
        <div>
            {currentRecipe && (
                <div>
                    <div className="recipe-name-detail">
                        <div id='recipe-detail-info'>
                            <h2>{currentRecipe?.name}</h2>
                            <div className='recipe-image'>
                                <div id='main-recipe-image'>
                                    <img src={currentRecipe?.images && currentRecipe.images.length > 0
                                        ? currentRecipe.images[0].url : null} alt='Main Image'
                                        onLoad={() => console.log('Image loaded')}
                                        onError={() => console.log('Image failed to load')} />

                                </div>

                                <div className='recipe-image-overlay'>
                                    {/* {currentRecipe?.images?.filter(image => image.)} */}
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
