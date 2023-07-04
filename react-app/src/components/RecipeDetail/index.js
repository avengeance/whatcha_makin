import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useModalContext } from '../../context/ModalContext';

import OpenModalButton from './OpenModalButton';
import CreateReviewModal from './CreateReviewModal';
import DeleteReviewModal from './DeleteReviewModal';

import * as RecipeActions from '../../store/recipe';
import * as ReviewActions from '../../store/review';
import * as LikeActions from '../../store/like';
import * as CommentActions from '../../store/comment';

import "./RecipeDetail.css";

const RecipeDetail = () => {
    const { recipeId } = useParams();
    const { closeModal, setModalContent } = useModalContext();
    const dispatch = useDispatch();
    const history = useHistory();

    const currentRecipe = useSelector((state) => state.recipes.recipes[recipeId]);
    const ownerId = useSelector((state) => state.session.user?.id);
    const likesByRecipe = useSelector((state) => state.likes.likesByRecipe);

    const [reviews, setReviews] = useState([]);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        dispatch(RecipeActions.getRecipeThunk(recipeId))
            .then(currentRecipe => setCurrentRecipe(currentRecipe))
            .then(currentRecipe => {
                if (currentRecipe?.Owneer?.id){
                    setCurrentRecipe(currentRecipe);
                }
            })
            .catch(err => console.log(err))
    }, [dispatch, recipeId]);

    function handlePostReview(){
        const modalContent = <PostReviewModal onReviewSubmit={handleReviewSubmit} />;
        history.push(`/recipes/${recipeId}`);
        setModalContent(modalContent);
    }

    useEffect(() => {
        if (!recipeId){
            console.error('No recipeId');
            return
        }

        dispatch(ReviewActions.getAllReviewsThunk(recipeId))
            .then(reviews => setReviews(reviews.Reviews))
            .catch(err => console.log(err))
        dispatch(CommentActions.getAllCommentsThunk(recipeId))
            .then(comments => setComments(comments.Comments))
            .catch(err => console.log(err))
    }, [dispatch,recipeId])

    return (
        <></>
    )
}

export default RecipeDetail;
