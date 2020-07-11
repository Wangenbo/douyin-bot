const { exec } = require('child_process')
const AppActivity = 'com.ss.android.ugc.aweme/com.ss.android.ugc.aweme.splash.SplashActivity'
const test = 'ls -af'
const PACKAGE_NAME = 'com.ss.android.ugc.aweme' //APP的包名
let log = !true

/*
 * @Author: Wilbur
 * @Date: 2020-07-10 09:50:29
 * @Desc: 执行 shell 脚本
 * @param:   command@String
 */

const fnExecShell = (command) => {
    return new Promise((resolve, reject) => {
        console.log(command, '\n')

        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                reject(new Error(err + ''))
            }else{
                resolve(stdout)
            }
        })
    })
}

/*
 * @Author: Wilbur
 * @Date: 2020-07-10 10:00:30
 * @Desc: 打开APP
 */
const openApp = () => {
    const shell = `adb shell am start -n ${AppActivity}`
    return fnExecShell(shell)
}

/*
 * @Author: Wilbur
 * @Date: 2020-07-10 16:10:25
 * @Desc: 滑动屏幕
 */
const swipeScreen = (a = { x: 300, y: 1000 }, b = { x: 300, y: 640 }, ms = 200) => {
    const { x: x1, y: y1 } = a
    const { x: x2, y: y2 } = b
    const shell = `adb shell input swipe ${x1} ${y1} ${x2} ${y2} ${ms}`

    return fnExecShell(shell)
}

/*
 * @Author: Wilbur
 * @Date: 2020-07-10 16:10:46
 * @Desc: 点击屏幕
 */

const touchScreen = (point) => {
    const { x, y } = point
    const shell = `adb shell input tap ${x} ${y}`
    return fnExecShell(shell)
}

const checkPackageIsInstall = () => {
    const shell = `adb shell pm list packages`

    return fnExecShell(shell)
}

/*
 * @Author: Wilbur
 * @Date: 2020-07-10 16:11:03
 * @Desc: 延迟执行函数
 */
function awaitMoment (time = 2000) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
    })
}

/*
 * @Author: Wilbur
 * @Date: 2020-07-10 16:11:22
 * @Desc: 主函数，入口
 */
(function mian () {


    // await

    // await touchScreen({ x: 300, y: 300 })
    // await swipeScreen({ x: 300, y: 1000 }, { x: 300, y: 640 })


    checkPackageIsInstall().then((res)=> {

        if(res.indexOf(PACKAGE_NAME) > -1) { //检查手机中是否安装APP
            // 打开APP
            openApp().then(()=>{
                console.log('APP 启动成功')
            })

            console.log('等待APP初始化....')


            awaitMoment(5000).then(()=> {
                console.log('APP内容初始化完毕')
            })
        }else{
            console.log('您还未安装抖音APP')
        }
    })
})()