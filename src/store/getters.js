const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  username: state => state.user.userInfo.username,
  companyName: state => state.user.userInfo.companyName,
  departmentName: state => state.user.userInfo.departmentName,
  avatar: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  points: state => {
    if (state.user.userInfo.roles) {
      return state.user.userInfo.roles.points
    }
    else {
      return []
    }
  }
}
export default getters
