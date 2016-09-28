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
                sendAlert(service)
            }
        }
        if (service.check === "exactmatch") {
            if (response.rawEncoded !== service.match) {
                down = true
                sendAlert(service)
            }
        }

        if (!down) {
            alertsSent = _.without(alertsSent, service.name)
        }
    } catch (error) {
        sendAlert(service)
    }
}

const getResponse = (url) => new Promise((resolve, reject) => {
    rest.get(url, { timeout: 10000})
    .on("complete", (body, response) => {
        resolve(response)
    })
    .on("timeout", reject)
    .on("error", reject)

})
