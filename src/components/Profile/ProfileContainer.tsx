import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, ProfilePageType, ProfileType, setUserProfile,} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {userAPI} from "../../api/api";

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
        return (
            <div>
                <Profile profile={this.props.profile}/>
            </div>
        )

    }

};

type mapStateToPropsType = {
    profile:ProfileType | null
}

type mapDispatchToPropsType = {
    getUserProfile:(userID:string) => void
}



const mapStateToProps = (state: AppStateType):mapStateToPropsType => ({
    profile: state.profilePage.profile
})

type PathParamsType = {
    userID:string
}

type ProfilePropsType = RouteComponentProps<PathParamsType> & mapStateToPropsType & mapDispatchToPropsType

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    getUserProfile
})(WithUrlDataContainerComponent);