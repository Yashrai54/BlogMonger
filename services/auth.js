const jwt=require('jsonwebtoken')
const secret="yash@2005y"

function createTokenUser(user){
     const payload={
        _id:user.id,
        email:user.email,
        profileImage:user.profileImageURL,
        role:user.role
     }
     const token=jwt.sign(payload,secret)
     return token;
}
function validateToken(token){
    const payload=jwt.verify(token,secret)
    return payload
}

module.exports={
    createTokenUser,
    validateToken
}