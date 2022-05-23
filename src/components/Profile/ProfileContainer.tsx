import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, ProfileType} from '../../redux/profile-reducer';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

class ProfileContainer extends React.Component<ProfilePropsType> {
    componentDidMount() {
        let userID = this.props.match.params.userID
        if (!userID) userID = '2'

        this.props.getUserProfile(userID)

        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userID)
        //     .then(response => {
        //         this.props.setUserProfile(response.data)
        //     })
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={"/login"}/>

        return (
            <div>
                <Profile profile={this.props.profile}/>
            </div>
        )

    }

};

type mapStateToPropsType = {
    profile:ProfileType | null
    isAuth:boolean
}

type mapDispatchToPropsType = {
    getUserProfile:(userID:string) => void
}



const mapStateToProps = (state: AppStateType):mapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth:state.auth.isAuth
})

type PathParamsType = {
    userID:string
}

type ProfilePropsType = RouteComponentProps<PathParamsType> & mapStateToPropsType & mapDispatchToPropsType

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    getUserProfile
})(WithUrlDataContainerComponent);