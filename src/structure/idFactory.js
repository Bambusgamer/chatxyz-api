const nodeId = '00001' // temporary

module.exports = () => {
    // create a 16 digit id
    const now = Date.now();
    const random = Math.floor(Math.random() * 1000000000000000);
    const id = `${now}${random}`
    return id;
};