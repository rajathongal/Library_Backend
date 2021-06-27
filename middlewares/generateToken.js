const jwt = require('jsonwebtoken')
const configuration = require('../configuration/configurations');

exports.generateToken = (name, email, _id, role) => {

    const jwtsecret = configuration.JWT_SECRET;
    const rfsrtsecret = configuration.JWT_RFSRT_SECRET;

    const Token = jwt.sign({
        _id: _id,
        email: email,
        name: name,
        role: role
    },jwtsecret, 
    { expiresIn: '25mins' },
    { algorithm: 'HS256'} 
    );  

    const rfsrt = jwt.sign({
        email: email,
        name: name,
        role: role,
        _id: _id
    },rfsrtsecret, 
    { expiresIn: '1d' },
    { algorithm: 'HS256'} 
    );

    return {Token, rfsrt}
}