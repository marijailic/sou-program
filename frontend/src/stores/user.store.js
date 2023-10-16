import { defineStore } from 'pinia'
import backendApiService from '@/services/backendApiService'
import imageService from '@/services/imageService'
import authService from '@/services/authService'

const formatUserData = async (user) => {
    let profilePictureSrc = await imageService.getImageSrc(
        user.profile_picture_key
    )
    if (!profilePictureSrc) {
        profilePictureSrc = require('@/assets/sp-icon.png')
    }

    return {
        ...user,
        fullName: `${user.name} ${user.surname}`,
        profilePictureSrc,
    }
}

export const useStoreUser = defineStore('storeUser', {
    state: () => ({
        users: [],
    }),
    getters: {
        getUserByUsername: (state) => (username) => {
            return state.users.find(
                (user) => user.username.toLowerCase() === username.toLowerCase()
            )
        },
        getUserByID: (state) => (userID) => {
            return state.users.find((user) => user.id === Number(userID))
        },
        getSearchedUsersByUsername: (state) => (searchedUsername) => {
            const searchLowerCase = searchedUsername.toLowerCase()
            const currentUser = state.getUserByUsername(
                authService.getAuthUsername()
            )

            return state.users.filter((user) => {
                const fullNameLowerCase = user.fullName.toLowerCase()
                const reversedFullNameLowerCase =
                    `${user.surname} ${user.name}`.toLowerCase()

                return (
                    (authService.isAuthUserDemos() || user !== currentUser) &&
                    (fullNameLowerCase.includes(searchLowerCase) ||
                        reversedFullNameLowerCase.includes(searchLowerCase))
                )
            })
        },
    },
    actions: {
        async fetchUsers() {
            const res = await backendApiService.get({
                url: '/user',
            })

            if (!res.ok) {
                window.location.href = '/error'
                return
            }

            const resObj = await res.json()
            this.users = await Promise.all(resObj.data.map(formatUserData))

            return this.users
        },
        async deleteUser(userID) {
            const res = await backendApiService.delete({
                url: '/delete-user',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userID }),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async createUser(user) {
            const res = await backendApiService.post({
                url: '/create-user',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async updateUser(user) {
            const res = await backendApiService.post({
                url: '/update-user',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
    },
})
