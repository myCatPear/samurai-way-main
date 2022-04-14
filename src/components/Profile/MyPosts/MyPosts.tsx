import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {ActionsType, PostsData,} from "../../../redux/store";

type MyPostsProps = {
    posts: Array<PostsData>
    newPostText: string
    updateNewPostText: (text: string) => void
    addPost: () => void
}

const MyPosts = (props: MyPostsProps) => {
    let postsElements = props.posts.map(p => <Post message={p.message} id={p.id} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const onAddPostHandler = () => {
        props.addPost()
        //   props.dispatch(addPostActionCreator())
    }

    const onChangeHandler = () => {
        let text = ''
        if (newPostElement.current?.value) text = newPostElement.current?.value
        props.updateNewPostText(text)
    }

    return (
        <div className={classes.postBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea onChange={onChangeHandler} ref={newPostElement} value={props.newPostText}/>
                </div>

                <button onClick={onAddPostHandler}>Add post</button>
                <button>Remove</button>
            </div>

            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;