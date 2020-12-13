var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MarketplaceSchema   = new Schema({
    name:  String,
    country:{
        type: String,
        enum: ['Paris', 'Nice', 'Dijon','Marseille','Lille'],
        required: true
    },
    total_stock: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },

});

module.exports = mongoose.model('Marketplace', MarketplaceSchema);