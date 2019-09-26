const base = 'http://localhost:4000'

// const base = 'http://106.54.204.54:4000'

export const register = base + '/api/user/addUser'

export const checkUser = base + '/api/user/checkUser'

export const login = base + '/api/user/login'

export const logout = base + '/api/user/logout'

export const getMyInfo = base + '/api/user/getMyInfo'

export const modifyUserInfo = base + '/api/user/modifyUserInfo'

export const getCarsList = base + '/api/car/list'

export const getMakeName = base + '/api/car/getMakeName'

export const getVehicleClass = base + '/api/car/getVehicleClass'

export const getTransmission = base + '/api/car/getTransmission'

export const getUserList = base + '/api/user/getUserList'

export const delUser = base + '/api/user/delUser'

export const getUserInfo = base + '/api/user/getUserInfo'

export const modifyOtherInfo = base + '/api/user/modifyOtherInfo'

export const searchUser = base + '/api/user/searchUser'

export const createArticle = base + '/api/article/createArticle'

//article列表 state: 0审核中，1已发布，2审核失败，3已删除
export const getArticleList = base + '/api/article/getArticleList'

export const getMyArticleList = base + '/api/article/getMyArticleList'

export const getReadyArticleList = base + '/api/article/getReadyArticleList'

export const successCheck = base + '/api/article/successCheck'

export const failCheck = base + '/api/article/failCheck'

export const getArticleDetail = base + '/api/article/getArticleDetail'

export const updateArticleDetail = base + '/api/article/updateArticleDetail'

export const deleteArticle = base + '/api/article/deleteArticle'

export const toTopArticle = base + '/api/article/toTopArticle'

export const getAllBrand = base + '/api/picture/getAllBrand'

export const addBrand = base + '/api/picture/addBrand'

export const getCorrespondingBrand = base + '/api/picture/getCorrespondingBrand'







































