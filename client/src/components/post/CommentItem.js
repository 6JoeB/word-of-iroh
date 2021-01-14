import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
	postId,
	comment: { _id, text, name, avatar, user, date },
	auth,
	deleteComment,
}) => {
	const deletePostConfirm = (e) => {
		if (window.confirm("Are you sure you want to delete this comment?")) {
			deleteComment(postId, _id);
		}
	};

	return (
		<div className='post bg-white p-1 my-1'>
			<div className='comment-header'>
				<Link to={`/profile/${user}`}>
					<img className='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className='myb-1 comment-text'>{text}</p>
				<p className='post-date'>
					Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
				</p>
				{!auth.loading && user === auth.user._id && (
					<button
						onClick={(e) => deletePostConfirm()}
						type='button'
						className='btn btn-danger'
					>
						<span> Delete</span>
					</button>
				)}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	postId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
