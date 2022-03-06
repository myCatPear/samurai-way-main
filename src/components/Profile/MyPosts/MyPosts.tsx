import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={classes.content}>
            <div>
                My Posts
                <div>
                    <textarea>1</textarea>
                    <button>Add post</button>
                    <button>Remove</button>
                </div>
                <div className={classes.posts}>
                    <Post message={'hello'}/>
                </div>
            </div>
        </div>
    );
};

export default MyPosts;