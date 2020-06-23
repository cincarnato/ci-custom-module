import CustomizationPage from '../pages/CustomConfigPage/CustomConfigPage'

export const index = [
    {
        name: "customization",
        path: '/admin/customization',
        component: CustomizationPage,
        meta: {
            requiresAuth: true,
            permission: "CUSTOMIZATION_SHOW"
        }
    },

]
