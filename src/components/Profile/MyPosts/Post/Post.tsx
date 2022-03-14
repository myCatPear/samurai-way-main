import React from 'react';
import classes from './Post.module.css'

type PostPropsType = {
    message:string
    id: number
    likesCount:number
}

const Post = (props: PostPropsType) => {
    return (

        <div className={classes.item}>
            <img
                src="https://n1s2.starhit.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/445x460_0_6a5d57baf3fab914fdfcc2cc563ed893@480x496_0xac120003_4430520541578509619.jpg"
                alt="s"/>
            {props.message}
            <div>
                <span>Likes: {props.likesCount}</span>
            </div>

        </div>

    );
};

export default Post;