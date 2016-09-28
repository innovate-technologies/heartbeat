import rest from "restler"
export default (alertConfig, service) => {
    rest.postJson(alertConfig.url, {
        username: "Heartbeat",
        "icon_emoji": ":heartbeat:",
        attachments: [{
            pretext: "A service reported an error!",
            title: service.name,
            "title_link": service.url,
            "fields": [
                {
                    "title": "Connection",
                    "value": `${service.type}`,
                    "short": true,
                }, {
                    "title": "Check",
                    "value": `${service.check}`,
                    "short": true,
                },
            ],
        }],
    })
}
