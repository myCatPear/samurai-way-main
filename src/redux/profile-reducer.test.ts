import {addPostActionCreator, ProfilePageType, profileReducer} from "./profile-reducer";

const state:ProfilePageType = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 22},
        {id: 2, message: 'YO', likesCount: 33}
    ],
    profile: null,
    status: ""
}

it ('length of posts should be incremented', () => {
    const action = addPostActionCreator('Kostya')

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

it ('message of new post should be "Kostya"', () => {
    const action = addPostActionCreator('Kostya')

    const newState = profileReducer(state, action)

    expect(newState.posts[0].message).toBe('Kostya')
})