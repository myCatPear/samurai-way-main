import React from 'react';
import classes from './Profile.module.css'

const Profile = () => {
    return (
            <div className={classes.content}>
                <div>
                    <img
                        src="https://user-images.githubusercontent.com/88069082/149673405-b47f71c1-0777-4038-9247-5b0c9d166f22.jpg"
                        alt="fo"/>
                </div>
                <div>
                    ava + descr
                </div>
                <div>
                    My Posts
                    <div>
                        New post
                    </div>
                    <div className={classes.posts}>
                        <div className={classes.item}>Post1</div>
                        <div className={classes.item}>Post2</div>
                    </div>
                </div>
            </div>
    );
};

export default Profile;