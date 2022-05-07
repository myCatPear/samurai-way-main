import React from 'react';
import {UsersPropsType} from './UsersContainer';
import s from './users.module.css'
import axios from "axios";
import avatar from '../../assets/img/ava.png'

export class Users extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChangedHandler = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        const pages = []

        for (let i = 1; i <= pagesCount; i += 1) {
            pages.push(i)
        }


        return <div>
            <div>
                {pages.map(p => {
                    return <span className={this.props.currentPage === p ? s.selectedPage : ""}
                                 onClick={() => this.onPageChangedHandler(p)}>{p}</span>
                })}
            </div>
            {
                this.props.users.map(u => {
                    return <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.photos.small === null ? avatar : u.photos.small} alt="photo" className={s.photo}/>
                            </div>
                            <div>
                                {
                                    u.followed ?
                                        <button onClick={() => this.props.unfollow(u.id)}>Follow</button>
                                        : <button onClick={() => this.props.follow(u.id)}>Unfollow</button>
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
    }
}
