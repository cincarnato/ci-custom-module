const {createCustomization, findCustomization} = require('./CustomizationService');
const {values} = require('../../defaults')

export const initCustomization = function () {

    findCustomization().then(doc => {
        if (!doc) {
            createCustomization({}, values
            ).then(docNew => {
                console.log("Customization created: ", docNew.id)
                process.exit()
            })
        }else{
            console.log("Customization found: ", doc.id)
            process.exit()
        }
    })

}
