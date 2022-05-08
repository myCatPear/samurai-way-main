import React from 'react';
import s from "./users.module.css";
import avatar from "../../assets/img/ava.png";
import {UserDataType} from "../../redux/users-reducer";

type UsersPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChangedHandler: (page: number) => void
    users: Array<UserDataType>
    unfollow:(id:number) => void
    follow:(id:number) => void

}

const Users = (props: UsersPropsType) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = []

    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? s.selectedPage : ""}
                                 onClick={() => props.onPageChangedHandler(p)}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => {
                    return <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.photos.small === null ? avatar : u.photos.small} alt="photo"
                                     className={s.photo}/>
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

export default Users;