import jwt from 'jsonwebtoken';

//middleware function to decode jwt token to clerk id

const authUser = async (req, res, next) => {
    try {

        const {token} = req.headers
        if(!token) {
            return res.json({success: false, message: "Unauthorized"})
        }

        const token_decoded = jwt.decode(token)
        req.body.clerkId = token_decoded.clerkId
        next()
       

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
        
    }
}

export default authUser;