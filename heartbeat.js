console.log("Heartbeat")
console.log("Server uptime checker")
console.log("Copyright 2016 Innovate Technologies")
console.log("------------------------------------")

global.alertsSent = [] // array of service names which an alert is sent for

global.sendAlert = (service) => {
    if (alertsSent.indexOf(service.name) !== -1) {
        return
    }
    for (let alertService in config.alerts) {
        if (config.alerts.hasOwnProperty(alertService)) {
            require(`./components/alerts/${alertService}`)(config.alerts[alertService], service)
        }
    }
    alertsSent.push(service.name)
}

for (let service of config.services) {
    require(`./components/checks/${service.type}`)(service)
}
