// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/config.json');
// Set the region we will be using
AWS.config.update({region: 'us-east-2'});
// Create SQS service client
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
// Replace with your account id and the queue name you setup
const accountId = '348916346240';
const queueName = 'test.fifo';
// Setup the sendMessage parameter object
exports.queueMessages =function(message){ 
var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
   MessageAttributes: {
     
   },
   MessageBody: message,
   MessageGroupId:"586474de88e03",
   // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
   // MessageGroupId: "Group1",  // Required for FIFO queues
   QueueUrl: `https://sqs.us-east-2.amazonaws.com/${accountId}/${queueName}`
 };

sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Successfully added message", data.MessageId);
    }
  });
}