var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ProductSchema   = new Schema({
    name:{
        type: String,
        enum: ['Pomme', 'Banane', 'Fraise','Orange','Cerise','Mandarine'],
        required: true
    },
    stock: Number,
    marketplace: { type: Schema.Types.ObjectId, ref: 'marketplace' },
});

module.exports = mongoose.model('Product', ProductSchema);