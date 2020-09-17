// http://cdn.zsdx.cn/test/IMG_6754.jpg
const faceRecognition = (image) => {
    return new Promise((resolve, reject) => {
        const tencentcloud = require("tencentcloud-sdk-nodejs");

        const IaiClient = tencentcloud.iai.v20200303.Client;
        const models = tencentcloud.iai.v20200303.Models;

        const Credential = tencentcloud.common.Credential;
        const ClientProfile = tencentcloud.common.ClientProfile;
        const HttpProfile = tencentcloud.common.HttpProfile;

        let cred = new Credential("AKIDVlkeNzqNBtLVSH899tVqvmmYx5w4tYsv", "3pJc2IabLhnc4PUIp5IEsofJgW6YrthR");
        let httpProfile = new HttpProfile();
        let clientProfile = new ClientProfile();
        let client = new IaiClient(cred, "ap-shanghai", clientProfile);
        let req = new models.DetectFaceRequest();
        let params = {
            Image: image,
            NeedFaceAttributes: 1,
            SignatureMethod: 'TC3-HMAC-SHA256'
        }

        req.from_json_string(JSON.stringify(params));
        httpProfile.endpoint = "iai.tencentcloudapi.com";
        clientProfile.httpProfile = httpProfile;

        client.DetectFace(req, function (errMsg, response) {

            if (errMsg) {
                console.log(errMsg);
                reject(errMsg);
                return;
            }
            resolve(response.to_json_string());
        });
    })
}

module.exports = faceRecognition


