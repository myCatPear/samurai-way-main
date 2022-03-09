import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
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
                    <Post message={'hello'}/>
                </div>
            </div>
    );
};

export default MyPosts;