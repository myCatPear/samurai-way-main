import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

type PostData = {
    id:number
    message:string
    likesCount:number
}

let posts:Array<PostData> = [
    {id:1, message:'Hello', likesCount:22},
    {id:2, message:'YO', likesCount:33}
]

let postsElements = posts.map(p => <Post message={p.message} id={p.id} likesCount={p.likesCount}/>)


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
                    {postsElements}
                </div>
            </div>
    );
};

export default MyPosts;