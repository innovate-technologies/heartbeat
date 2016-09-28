Heartbeat
=========
Heartbeat is a simply service written in Node.js to perform checks on servers and report failed tests. 

While it was meant to be an internal tool fitted to our needs we made it flexible to add modules so it can be extended to everybody's needs. 
Adding plugins is as simple as making a folder for a node module. 

## Integrated modules
### Checks
* HTTP with status code check and exact string match

### Alerts
* Slack webhooks
