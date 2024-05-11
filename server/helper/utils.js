exports.parseJwt = async function (token) {
    if (token === "" || token === undefined || token === null || token === "undefined")
        return null;
    let promise = new Promise(function (resolve, reject) {
        let work = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        resolve(work);
    });
    return promise
}

