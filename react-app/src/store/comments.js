import { csrfFetch } from "./csrf";

// Constants
const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

// Actions
const getAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
        comments,
})
const createComment = (comment) => ({
    type: CREATE_COMMENT,
        comment,
})
const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
        comment,
})

// Thunks
export const getAllCommentsThunk = (recipeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/comments`, {
        method: "GET",
    })
    const data = await res.json()
    dispatch(getAllComments(data))
    return data
}
export const createCommentThunk = (recipeId, comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/comments/new`, {
        method: "POST",
        body: JSON.stringify({comment: comment}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await res.json()
    dispatch(createComment(data))
    return data
}
export const deleteCommentThunk = (recipeId,commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/comments/${commentId}/delete`, {
        method: "DELETE",
    })
    const data = await res.json()
    dispatch(deleteComment(data))
    return data
}

// Reducer

const intialState = {
    comments: {}
}

const commentsReducer = (state = intialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_COMMENTS:
            action.comments.forEach((comment)=>{
                newState.comments[comment.id] = comment
            })
            return newState
        case CREATE_COMMENT:
            newState.comments.push(action.comments)
            return newState
        case DELETE_COMMENT:
            delete newState[action.comments.id]
            return newState
        default:
            return state
    }
}

export default commentsReducer
