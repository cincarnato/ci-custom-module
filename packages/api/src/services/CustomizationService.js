import Customization from '../models/CustomizationModel'
import {UserInputError} from 'apollo-server-express'
import path from "path";
import fs from "fs";
import {User} from "../../security/models/UserModel";

const mongoose = require('mongoose');


export const findCustomization = async function () {
    return new Promise((resolve, reject) => {
        Customization.findOne().exec((err, res) => {
                err ? reject(err) : resolve(res)
            }
        );
    })
}


export const createCustomization = async function (user, {colors, logo, language}) {

    const doc = new Customization({
        colors, logo, language
    })
    doc.id = doc._id;
    return new Promise((resolve, rejects) => {
        doc.save((error => {

            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                rejects(error)
            }

            resolve(doc)
        }))
    })
}

export const updateCustomization = async function (user, id, {primary, onPrimary, secondary, onSecondary, logo, language}) {
    return new Promise((resolve, rejects) => {
        Customization.findOneAndUpdate({_id: id},
            {primary, onPrimary, secondary, onSecondary, logo, language},
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    rejects(error)
                }

                resolve(doc)
            })
    })
}

export const updateColors = async function (user, {primary, onPrimary, secondary, onSecondary}) {
    return new Promise((resolve, rejects) => {
        let colors = {primary, onPrimary, secondary, onSecondary}
        Customization.findOneAndUpdate({},
            {colors},
            {new: true, runValidators: true, context: 'query', useFindAndModify: false},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    rejects(error)
                }
                resolve(doc.colors)
            })
    })
}

export const updateLogo = async function (user, {mode, title}) {
    return new Promise((resolve, rejects) => {
        Customization.findOneAndUpdate({},
            {$set: {'logo.mode': mode, 'logo.title': title}},
            {new: true, runValidators: true, context: 'query', useFindAndModify: false},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    rejects(error)
                }
                resolve(doc.logo)
            })
    })
}

export const updateLang = async function (user, {language}) {
    return new Promise((resolve, rejects) => {
        Customization.findOneAndUpdate({},
            {language},
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    rejects(error)
                }

                resolve(doc)
            })
    })
}


export const uploadLogo = async function (user, file) {

    function randomstring(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const {filename, mimetype, encoding, createReadStream} = await file;


    const parseFileName = path.parse(filename);
    const finalFileName = user.username + parseFileName.ext

    const rs = createReadStream()
    const dst = path.join("media", "logo", finalFileName)
    var wstream = fs.createWriteStream(dst);
    rs.pipe(wstream);

    const rand = randomstring(3)
    const url = process.env.APP_API_URL + "/media/logo/" + finalFileName + "?" + rand

    let logo = {
        filename,
        url
    }
    return new Promise((resolve, rejects) => {
        Customization.findOneAndUpdate(
            {}, {$set: {'logo.filename': finalFileName, 'logo.url': url}}, {useFindAndModify: false},
            (error) => {
                if (error) rejects({status: false, message: "Falla al intentar guardar el logo en la DB"})
                else resolve({filename, mimetype, encoding, url})
            }
        );
    })


    return {filename, mimetype, encoding, url};
}
