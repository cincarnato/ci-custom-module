import vuetify from '../../../plugins/vuetify'
import i18n from '../../../i18n'
import CustomizationProvider from "../providers/CustomizationProvider";

const customizationStore =  {
    state: {
        colors: {
            primary: '#000000',
            secondary: '#000000',
            onPrimary: '#ffffff',
            onSecondary: '#ffffff'
        },
        logo: {
            mode: 'Round',
            title: '',
            url: ''
        },
        language: null
    },
    getters: {
        getLogo: state => {
            return state.logo
        },
        getColors: state => {
            return state.colors
        },
        getLanguage: state => {
            return state.language
        }
    },
    actions: {
        loadCustomizations({commit}){
            CustomizationProvider.customization().then(r => {
                commit('setColors',r.data.customization.colors)
                commit('setLogo',r.data.customization.logo)
                commit('setLanguage',r.data.customization.language)
            })
        },
        setLogo({commit}, logo) {
            commit('setLogo', logo)
        },
        setColors({commit}, colors) {
            commit('setColors', colors)
        },
        setLanguage({commit}, language) {
            commit({commit}, language)
        }
    },
    mutations: {
        setLogo(state, {mode, title, url}) {
            state.logo.mode = mode
            state.logo.title = title
            state.logo.url = url
        },
        setColors(state, {primary, onPrimary, secondary, onSecondary}) {
            state.colors.primary = primary
            state.colors.onPrimary = onPrimary
            state.colors.secondary = secondary
            state.colors.onSecondary = onSecondary

            vuetify.framework.theme.themes.light.primary = primary
            vuetify.framework.theme.themes.light.onPrimary = onPrimary
            vuetify.framework.theme.themes.light.secondary = secondary
            vuetify.framework.theme.themes.light.onSecondary = onSecondary

        },
        setLanguage(state, language) {
            state.language = language
            i18n.locale = language
        }
    }
}

export default customizationStore
