# Send notification design system

## Use case which
- Send email to receivers with specific template
- Send text message to mobile phones
- Send alert message to admin notification services

-> Which means that we always send some kind of <content> to target <receivers>
-> The service should accept the content which is **generated from a resource and represent the same interface for content** and deliver sending content to **processor sender**
-> 
+ NotificationContentGenerator -> which will generate content for sending email.
+ NotificationSender -> public method which accept receivers information in a format
