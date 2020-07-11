const tencentcloud = require("tencentcloud-sdk-nodejs");

const IaiClient = tencentcloud.iai.v20200303.Client;
const models = tencentcloud.iai.v20200303.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential("AKIDVlkeNzqNBtLVSH899tVqvmmYx5w4tYsv", "3pJc2IabLhnc4PUIp5IEsofJgW6YrthR");
let httpProfile = new HttpProfile();
httpProfile.endpoint = "iai.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new IaiClient(cred, "ap-shanghai", clientProfile);

let req = new models.DetectFaceRequest();


let params = {
    Url: "http://cdn.zsdx.cn/test/IMG_6754.jpg",
    NeedFaceAttributes: 1
}
req.from_json_string(JSON.stringify(params));


client.DetectFace(req, function (errMsg, response) {

    if (errMsg) {
        console.log(errMsg);
        return;
    }

    console.log(response.to_json_string());
});