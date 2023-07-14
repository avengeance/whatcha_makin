from ..forms.review_form import ReviewForm, EditReviewForm
from flask import Blueprint,redirect,url_for, render_template,jsonify,request
from flask_login import login_required,current_user,logout_user
from ..models.review import Review
from ..models.recipe import Recipe
from .. import db

review_routes = Blueprint('reviews', __name__)

# Get a Review
@review_routes.route('/<int:review_id>/', methods=['GET'])
def get_review(review_id):
    # review = Review.query.get(review_id)
    review = Review.query.filter_by(id=review_id).first()
    if review is None:
        return jsonify({
            "error": "Review does not exist",
            "status_code": 404
        }), 404

    review_dict = review.to_dict()
    return jsonify(review_dict), 200


# Update a Review
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    # review = Review.query.get(id)
    review = Review.query.filter_by(id=id).first()
    print(f"this is review", review)
    if review is None:
        return jsonify({
            "error": "Review does not exist",
            "status_code": 404
        }), 404
    
    if review and current_user.id == review.owner_id:
        form = EditReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        
        if request.json:
            form.review.data = request.json.get('review', None)
            form.stars.data = request.json.get('stars', None)
        
        if form.validate_on_submit():
            review.review = form.review.data
            review.stars = form.stars.data
            db.session.commit()
            
            review_dict = review.to_dict()
            
            return jsonify(review_dict), 200
        else:
            return jsonify(form.errors), 400
    else:
        return jsonify({
            "message": "You do not have permission to update this review",
            "status_code": 400
        }), 400
        
# Delete a Review
@review_routes.route('/<int:review_id>/delete', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    
    if review:
        db.session.delete(review)
        db.session.commit()
        
        res = {
            "id": review.id,
            "message": "Successfully deleted",
            "status_code": 200
        }
        
        return jsonify(res), 200
    else:
        res = {
            "message": "Review not found",
            "status_code": 404
        }
        return jsonify(res), 404
