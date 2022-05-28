import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, ProfileType} from '../../redux/profile-reducer';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

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
    profile: state.profilePage.profile,
})

type PathParamsType = {
    userID:string
}

type ProfilePropsType = RouteComponentProps<PathParamsType> & mapStateToPropsType & mapDispatchToPropsType

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default withAuthRedirect(connect(mapStateToProps, {
    getUserProfile
})(WithUrlDataContainerComponent));