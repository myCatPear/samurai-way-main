import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {ActionsType, PostsData} from "../../../redux/state";

type MyPostsProps = {
    posts: Array<PostsData>
    newPostText: string
   // addPost: () => void
  //  updatePostText: (newText: string) => void
    dispatch:(action:ActionsType) => void
}

const MyPosts = (props: MyPostsProps) => {
    let postsElements = props.posts.map(p => <Post message={p.message} id={p.id} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPostHandler = () => {
        props.dispatch({type:'ADD-POST'})
    }

    const onChangeHandler = () => {
        let text = ''
        if (newPostElement.current?.value) text = newPostElement.current?.value
        props.dispatch({type:'UPDATE-POST-TEXT', newText:text})
    }

    return (
        <div className={classes.postBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea onChange={onChangeHandler} ref={newPostElement} value={props.newPostText}/>
                </div>

                <button onClick={addPostHandler}>Add post</button>
                <button>Remove</button>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;