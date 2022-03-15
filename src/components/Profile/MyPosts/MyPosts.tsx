import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {ProfilePageType} from "../../../redux/state";

type MyPostsProps = {
    state:ProfilePageType
}

const MyPosts = (props:MyPostsProps) => {
    let postsElements = props.state.posts.map(p => <Post message={p.message} id={p.id} likesCount={p.likesCount}/>)
    return (
            <div className={classes.postBlock}>
                <h3>My Posts</h3>
                <div>
                    <div>
                        <textarea>1</textarea>
                    </div>

                    <button>Add post</button>
                    <button>Remove</button>
                </div>
                <div className={classes.posts}>
                    {postsElements}
                </div>
            </div>
    );
};

export default MyPosts;