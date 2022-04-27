import React from 'react';
import {UsersPropsType} from './UsersContainer';
import s from './users.module.css'
import axios from "axios";
import avatar from '../../assets/img/ava.png'

export const Users = (props: UsersPropsType) => {
    const getUser = () => {
        if (props.users.length === 0) {

            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })

            // props.setUsers( [
            //         {
            //             id: 1,
            //             fullName: 'Dmitriy',
            //             photoUrl: 'https://www.vokrug.tv/pic/person/e/f/7/9/ef793f7a70a9e3f62f6c673cb58cb538.jpg',
            //             followed: false,
            //             status: "I am a boss",
            //             location: {city: "Minsk", country: "Belarus"}
            //         },
            //         {
            //             id: 2,
            //             fullName: 'Sasha',
            //             photoUrl: 'https://www.vokrug.tv/pic/person/e/f/7/9/ef793f7a70a9e3f62f6c673cb58cb538.jpg',
            //             followed: true,
            //             status: "I am a boss too",
            //             location: {city: "Moscow", country: "Russia"}
            //         },
            //         {
            //             id: 3,
            //             fullName: 'Andrew',
            //             photoUrl: 'https://www.vokrug.tv/pic/person/e/f/7/9/ef793f7a70a9e3f62f6c673cb58cb538.jpg',
            //             followed: false,
            //             status: "I am not a boss",
            //             location: {city: "Kiev", country: "Ukraine"}
            //         },
            //     ]
            // )
        }
    }


    return (

        <div>
            <button onClick={getUser}>get user</button>
            {
                props.users.map(u => {
                    return <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.photos.small === null ? avatar : ""} alt="photo" className={s.photo}/>
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
                                    {u.name}
                                </div>
                                <div>
                                    {u.status}
                                </div>
                            </span>
                            <span>
                                <div>
                                    {"u.location.country"}
                                </div>
                                <div>
                                    {"u.location.city"}
                                </div>
                            </span>
                        </span>
                    </div>
                })
            }
        </div>
    );
};
