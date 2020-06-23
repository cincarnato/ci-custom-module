require('dotenv').config()

module.exports.values = {
    colors: {
        primary: '#000000',
        onPrimary: '#FFFFFF',
        secondary: '#000000',
        onSecondary: '#FFFFFF',
    },
    logo: {
        mode: 'Round',
        title: 'Skeleton Group',
        filename: 'logo.png',
        url: process.env.APP_API_URL + '/media/logo/logo.png'
    },
    language: 'es'
}
