module.exports = async ({ req }) => {
    const token = await req.headers["authentication"];
    return token;
    /*let user;
    
    try {
        user = await jwt.verify(token, APP_SECRET);
        console.log(`${user.id} user`);
    } catch (error) {
        console.log(`${error.message} caught`);
    }
    // the user and secret we are passing here is what we access in every resolver
    return {
        user,
        SECRET
    };*/
}