import React from 'react';
import {PostsDataType} from '../../../redux/profile-reducer';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {MyPostPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {MaxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from "../../common/FormsControl/FormsControls";

type FormDataType = {
    newPostText: string
}

const maxLength10 = MaxLengthCreator(10)


const AddNewPostText: React.FC<InjectedFormProps<FormDataType>> = (props) => {


    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={"newPostText"} component={Textarea} validate={[required,maxLength10]} placeholder={'Post message'}/>
            <button>Add post</button>
        </form>
    )
}

const MyPostReduxForm = reduxForm<FormDataType>({
    form: "addPost"
})(AddNewPostText)

const MyPosts = (props: MyPostPropsType) => {

    let postsElements = props.posts.map((p, i) => <Post key={i} message={p.message} id={p.id}
                                                        likesCount={p.likesCount}/>)

    const onAddPostHandler = (value: FormDataType) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={classes.postBlock}>
            <h3>My Posts</h3>
            <MyPostReduxForm onSubmit={onAddPostHandler}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
};


export default MyPosts;