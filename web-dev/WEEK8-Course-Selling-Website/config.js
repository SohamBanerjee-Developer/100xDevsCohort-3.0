//you should always avoid circular depencdency(first file is importing something from the second file 
// and second file is importing something from the first file) it gives errors that js can't directly indicate
const JWT_USER_SECRET = process.env.JWT_USER_SECRET
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET
module.exports = {
    JWT_ADMIN_SECRET,
    JWT_USER_SECRET
}
//two different secrets for user and admin because 