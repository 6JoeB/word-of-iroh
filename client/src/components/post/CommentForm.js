import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState("");

	return (
		<div className='post-form'>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId, { text });
					setText("");
				}}
			>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Add a comment</span>
					</div>
					<div>
						<textarea
							className='form-input'
							name='text'
							cols='30'
							rows='3'
							minLength='1'
							value={text}
							onChange={(e) => setText(e.target.value)}
						></textarea>
					</div>
				</label>
				<input type='submit' className='btn btn-dark myb-1' value='Submit' />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
