// this should generate a unique id each time it is called (snowflake)

module.exports = () => {
    // create a 16 bit integer
    const now = Date.now();
    const random = Math.floor(Math.random() * 65536);
    const id = `${now}${random}`
    return id;
};