import graphqlClient from "../../../apollo";

class CustomizationProvider {



    customization() {
        return graphqlClient.query({
            query: require('./gql/customization.graphql')
        })
    }
    
    

    updateCustomization(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/customizationUpdate.graphql'),
            variables: form
        })
    }

    updateColors(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/colorsUpdate.graphql'),
            variables: form
        })
    }

    updateLogo(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/logoUpdate.graphql'),
            variables: form
        })
    }

    updateLanguage(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/langUpdate.graphql'),
            variables: form
        })
    }

    logoUpload(file) {
        return graphqlClient.mutate({
            mutation: require('./gql/logoUpload.graphql'),
            variables: {file}
        })
    }

}

export default new CustomizationProvider()


