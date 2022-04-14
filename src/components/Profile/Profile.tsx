import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType, DialogsPageType, ProfilePageType} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {EmptyObject, Store} from "redux";
import {ReducersType} from "../../redux/redux-store";

type ProfileProps = {
    store: ReducersType
    //state: ProfilePageType
   // addPost: () => void
   // updatePostText: (newText:string) => void
    //dispatch:(action:ActionsType) => void
}

const Profile = (props: ProfileProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
                store={props.store}
            />
        </div>
    );
};

export default Profile;