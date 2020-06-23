const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;


const colorsSchema = new mongoose.Schema({
    primary: {type: String, required: true},
    onPrimary: {type: String, required: true},
    secondary: {type: String, required: true},
    onSecondary: {type: String, required: true},
})

const logoSchema = new mongoose.Schema({
    mode: {type: String, required: true},
    title: {type: String, required: false},
    filename: {type: String, required: false},
    url: {type: String, required: false}
})


const CustomizationSchema = new Schema({
    colors: colorsSchema,
    logo: logoSchema,
    language: {type: String, required: true}
});

CustomizationSchema.plugin(softDelete);
CustomizationSchema.plugin(mongoosePaginate);

const Customization = mongoose.model('Customization', CustomizationSchema);

module.exports = Customization;
