const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        default: "none"
    },
    author: {
        type: String,
        default: "none"
    },
    genre: {
        type: String,
        default: "none"
    },
    image: { 
        data:{
            type: Buffer,
            default: Buffer.alloc(0)
            
        },
        contentType: {
            type: String,
            default: "none"
        },
        
    },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },  versionKey: false });

bookSchema.index({email: 1}, { unique: true });

module.exports = mongoose.model('Books', bookSchema);