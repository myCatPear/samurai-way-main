import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {ProfilePageType} from "../../../redux/state";

type MyPostsProps = {
    state:ProfilePageType
    addPost:(postMessage:string) => void
}

const MyPosts = (props:MyPostsProps) => {
    let postsElements = props.state.posts.map(p => <Post message={p.message} id={p.id} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost =() => {
        debugger
        let text = ''
        if (newPostElement.current?.value) {
             text= newPostElement.current?.value;
        }
         props.addPost(text)
    }

    return (
            <div className={classes.postBlock}>
                <h3>My Posts</h3>
                <div>
                    <div>
                        <textarea ref={newPostElement}></textarea>
                    </div>

                    <button onClick={addPost}>Add post</button>
                    <button>Remove</button>
                </div>
                <div className={classes.posts}>
                    {postsElements}
                </div>
            </div>
    );
};

export default MyPosts;