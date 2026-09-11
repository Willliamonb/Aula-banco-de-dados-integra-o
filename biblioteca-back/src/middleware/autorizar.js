const autorizar = (...perfisPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario){
            return res.status(401).json({
                mensagem: "Usuario não autenticado"
            })
        }

        const {perfil} = req.usuario

        if(!perfisPermitidos.includes(perfil)){
            return res.status(403).json({
                mensagem: "Você não tem permisão para realizar está ação"
            })
        }
        next()
    }
}

export default autorizar