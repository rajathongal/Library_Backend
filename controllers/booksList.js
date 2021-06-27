const Books = require('../models/book');

exports.booksList = async (req, res, next) => {
    try {
        return await Books.find().sort({'created_at': -1}).then(resp => {
            return res.status(200).json({
                success: true,
                data: resp
            });
        })
    } catch(err) {
        return res.status(504).json({ 
            success: false,
            error: err.message
        });
    }
};