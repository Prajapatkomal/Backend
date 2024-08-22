
const authorize = (permittedRole)=>{
    return (req,res,next)=>{
      const userRole = req.user.role
      if(permittedRole.includes(userRole)){
        next()
      }else{
        res.status(403).json({message:"you are not allowed to access this route"})
      }
    }
}



export{authorize}