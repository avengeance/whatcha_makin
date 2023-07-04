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

    const currentRecipes = useSelector((state) => state.recipes.recipes[recipeId]);
    const ownerId = useSelector((state) => state.session.user?.id);
    const likesByRecipe = useSelector((state) => state.likes.likesByRecipe);

    const [currentRecipe, setCurrentRecipe] = useState(null);
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
        const modalContent = <CreateReviewModal />;
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
