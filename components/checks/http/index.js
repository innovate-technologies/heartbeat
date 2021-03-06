import rest from "restler"
import _ from "lodash"

export default (service) => {
    setInterval(checkUptime, service.interval, service)
}

const checkUptime = async (service) => {
    try {
        let down = false
        const response = await getResponse(service.url)
        service.response = response
        if (service.check === "responsecode") {
            if (response.statusCode !== service.code) {
                down = true
                sendAlert(service, `Got response code ${response.statusCode}`, response.raw.toString())
            }
        }
        if (service.check === "exactmatch") {
            if (response.rawEncoded !== service.match) {
                down = true
                sendAlert(service, "Didn't find an exactly match", response.rawEncoded)
            }
        }

        if (service.check === "match") {
            if (!new RegExp(service.match).test(response.raw.toString())) {
                down = true
                sendAlert(service, "Didn't match regex", response.raw.toString())
            }
        }

        if (!down) {
            alertsSent = _.without(alertsSent, service.name)
        }
    } catch (error) {
        sendAlert(service, error)
    }
}

const getResponse = (url) => new Promise((resolve, reject) => {
    var attempts = 0
    rest.get(url, { timeout: 10000})
    .on("complete", (body, response) => {
        resolve(response)
    })
    .on("timeout", function () {
        attempts++
        if (attempts > 3) {
            this.retry(3000)
        } else {
            reject(new Error("timed out"))
        }
    })
    .on("error", function (err) {
        attempts++
        if (attempts > 3) {
            this.retry(3000)
        } else {
            reject(new Error("Request error:" + err))
        }
    })
})
