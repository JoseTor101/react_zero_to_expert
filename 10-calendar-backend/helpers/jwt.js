import jwt from 'jsonwebtoken'

const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) =>{
        const payload = {uid, name};

        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '2h'
        }, (err, token)=>{
            if(err){
                reject('No se pudo generar el token')
            }

            resolve(token)
        })
    })
};


export {
    generarJWT
}