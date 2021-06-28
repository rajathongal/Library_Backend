const Books = require('../models/book');

exports.addBook = async (req, res, next) => {
    
    try {
        const { 
            title,  
            author,
            genre,
        } = req.body;

        return await Books.findOne({title: title}).then(async resp => {
            if (resp === null) {
                const book = Books({
                    title: title,
                    author: author,
                    genre: genre,
                    image: {
                        data: req.file.buffer || null,
                        contentType: req.file.mimetype 
                    }
                });

                return await book.save().then(response => {
                    return res.status(200).json({ 
                        success: true,
                        message: "Book added successfully",
                        book: response
                    });
                })
            } else {
                return res.status(409).json({ 
                    success: true,
                    message: "Book already exists"
                });
            }
        })
    } catch(err) {
        return res.status(504).json({ 
            success: false,
            error: err.message
        });
    }
}