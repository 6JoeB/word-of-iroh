import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
	const [text, setText] = useState("");

	return (
		<div className='post-form'>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text });
					setText("");
				}}
			>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Create a Post</span>
					</div>
					<div>
						<textarea
							className='form-input'
							name='text'
							cols='30'
							rows='5'
							value={text}
							onChange={(e) => setText(e.target.value)}
							required
						></textarea>
					</div>
				</label>
				<input type='submit' className='btn btn-dark myb-1' value='Post' />
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
