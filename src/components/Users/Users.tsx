import React from 'react';
import {UsersPropsType} from './UsersContainer';
import s from './users.module.css'

export const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers( [
                {
                    id: 1,
                    fullName: 'Dmitriy',
                    photoUrl: 'https://www.vokrug.tv/pic/person/e/f/7/9/ef793f7a70a9e3f62f6c673cb58cb538.jpg',
                    followed: false,
                    status: "I am a boss",
                    location: {city: "Minsk", country: "Belarus"}
                },
                {
                    id: 2,
                    fullName: 'Sasha',
                    photoUrl: 'https://www.vokrug.tv/pic/person/e/f/7/9/ef793f7a70a9e3f62f6c673cb58cb538.jpg',
                    followed: true,
                    status: "I am a boss too",
                    location: {city: "Moscow", country: "Russia"}
                },
                {
                    id: 3,
                    fullName: 'Andrew',
                    photoUrl: 'https://www.vokrug.tv/pic/person/e/f/7/9/ef793f7a70a9e3f62f6c673cb58cb538.jpg',
                    followed: false,
                    status: "I am not a boss",
                    location: {city: "Kiev", country: "Ukraine"}
                },
            ]
        )
    }

    return (
        <div>
            {
                props.users.map(u => {
                    return <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.photoUrl} alt="photo" className={s.photo}/>
                            </div>
                            <div>
                                {
                                    u.followed ?
                                        <button onClick={() => props.unfollow(u.id)}>Follow</button>
                                        : <button onClick={() => props.follow(u.id)}>Unfollow</button>
                                }

                            </div>
                        </span>

                        <span>
                            <span>
                                <div>
                                    {u.fullName}
                                </div>
                                <div>
                                    {u.status}
                                </div>
                            </span>
                            <span>
                                <div>
                                    {u.location.country}
                                </div>
                                <div>
                                    {u.location.city}
                                </div>
                            </span>
                        </span>
                    </div>
                })
            }
        </div>
    );
};
