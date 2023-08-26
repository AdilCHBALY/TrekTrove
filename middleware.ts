export { default } from 'next-auth/middleware'


// ? THIS IS NEW TO ME TO PREVENT NON LOGIN USERS FROM GETTING TO OTHER LINKS

export const config = {
    matcher : [
        '/trips',
        '/favorites',
        '/reservations',
        '/properties',
    ]
}