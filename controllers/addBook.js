const Books = require('../models/book');
const Authors = require('../models/authors');

exports.addBook = async (req, res, next) => {
    
    try {
        const { 
            title,  
            author,
            genre,
        } = req.body;

        return await Books.findOne({title: title}).then(async resp => {
            if (resp === null) {
                console.log("entered")
                const book = Books({
                    title: title,
                    author: author,
                    genre: genre,
                    image: {
                        data: req.file.buffer || null,
                        contentType: req.file.mimetype 
                    }
                });

                const authorAdd = Authors({
                    author: author,
                    image: {
                        data: req.file.buffer || null,
                        contentType: req.file.mimetype 
                    }
                })
                
                return await book.save().then(async response => {

                    await Authors.findOne({author: author}).then(res => {
                        if(res === null){
                            authorAdd.save();
                        }
                    })
                    
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

exports.bookView = async (req, res) => {
    try {

        const { _id } = req.body;

        return await Books.findOne({_id: _id}).then(resp => {
            if(resp === null){
                return res.status(404).json({
                    succss: true,
                    message: "Book Not found"
                })
            } else {
                return res.status(200).json({ 
                    success: true,
                    book: resp
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

exports.addBookCoverPage = async (req, res) => {
    try {
        const { 
            _id
        } = req.body;

        return await Books.findOne({_id: _id}).then(async resp => {
           
            if (resp === null) {
                return res.status(404).json({ 
                    success: true,
                    message: "Book does not exists"
                });
            } else {
                return await Books.findOneAndUpdate({_id: _id}, { 
                    bookCover: {
                        data: req.file.buffer || null,
                        contentType: req.file.mimetype 
                    }
                }, { new: true}).then(respo => {
                    
                    return res.status(200).json({
                        success: true
                    })
                })
            }
        })
    } catch(err) {
        return res.status(504).json({ 
            success: false,
            error: err.message
        });
    }
}