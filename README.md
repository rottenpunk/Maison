# Maison
The Maison Framework
The Maison System Framework
Initial Requirements Guide

The Maison System Framework provides an application framework for future projects.  At a high level, it provides these general features:

An HTTPS server that can serve web pages
An HTTPS server that can provide a RESTful API interface 
That can be used by web pages served by the Maison system
That can optionally be used for communication by outside systems
A login system
A standard login screen
A standard administration screen that can be used by users that have been defined with an administrator role to allow an administrator to add users with several different roles (define several levels of authorization, including users with the lowest “user” role, as well as defining other users with an “administrator” role)
An interface to an SQL relational database
A build system that can build an application system that uses the Maison framework system, or, at a minimum, the ability to build just the Maison Framework so that the features of the Maison Framework can be demonstrated. Optionally, the build system will be able to build either an application or the minimum system to be hosted as a docker image on a cloud based system, such as on Amazon Web Services, or on Heroku,  etc.
The High-Level Concept
The purpose of the Maison System Framework is that it is a starting place to create web applications.  Web applications are a set of web pages that perform some set of business functions, and as such would, for example, provide an interface for the general “CRUD” (create, read, update, delete) functionality for data access and entry.

Generally, the Maison framework would provide all of the infrastructure that could be utilized to create web applications quicker and therefore more reliable.  As an example, consider a web  application that keeps track of customers.  It may be a simple system that only has a customer database.  The web application would allow a user to add or update information about new customers, search for information about one or more customers, or delete old customers from a database.  More complex applications could track things such as orders that a customer might place, or store inventory.

In the following descriptions, we refer to a web application.  However, to be clear, they are only examples.  The Maison does not include any specific application, only features that could be used to develop an application.  The Maison does include a feature to define and manage users that would use an application.  But, this is a feature that is considered common to many different types of applications, so this type of functionality is included in the Maison system itself.  So, the goal of the Maison system is to provide functionality that is common to many different types of applications so that it is already available to use in any application that uses the Maison framework.
Assumptions about development tools
The initial assumption is that the Maison framework will run in a Node environment and will be written in JavaScript.  Therefore, additional frameworks needed will be compatible with Node and JavaScript.
An HTTPS server that can serve web pages
HTTPS provides the SSL/TLS security protocol. Generally, there should not be any difference between using the standard Node HTTP library and the HTTPS library.  However, some research will be needed to determine how both can interoperate.

Serving web pages using Node can be achieved by using the Express package.  Addition Node packages may be needed to help in developing web pages that use form variables.  The body-parser package can provide suitable form variable parsing.

There should be a way of defining a general template that would be a bare minimum “demo” level web page design that could be changed for specific applications that might be created to use the Maison framework.  The idea is to have a bare minimum template that could be used for any web pages that are part of the minimum Maison system.  See the Login System, further down, that describes a bare minimum login page that would use the starting template.
An HTTPS server that can provide a RESTful API interface
The Node Express package should also provide a framework for developing RESTFul API interfaces.  These server interfaces could be used by application web pages as an alternative to form based web pages.
A Login System
Generally, Enterprise level applications need a degree of security as well as user authentication to provide, at the least, a general user role and an administrator role.  In concept, there may need to be additional roles for users using an application system.  But, as a first feature, there should be at least two levels of authentication: user and administrator.

With that in mind, There should be a way of adding additional users and specifying their roles. A  standard login screen should be developed that would be part of the basic Maison system, which would allow a user to log on and, once logged on, associate an authorization level (at least either basic user or administrator) to that user. 

Also, a standard administration screen should be part of the Maison system which would allow an administrator to add more users, assigning them one of several different roles.  Also, allow an administrator to delete a user, if the user will not be using the system anymore.

An interface to an SQL relational database
The Maison system would provide a basic interface to a SQL relational database management system.  Within the Maison system, the Login System would use a SQL database to store information about users that would be able to access the application.
A build system that can build a system
A build system that can build an application system that uses the Maison framework system, or, at a minimum, the ability to build just the Maison Framework so that the features of the Maison Framework can be demonstrated. Optionally, the build system will be able to build either an application or the minimum system to be hosted as a docker image on a cloud based system, such as on Amazon Web Services, or on Heroku,  etc
Key Node Packages that could be used in developing the Maison Framework
As mentioned already, The Node Express package could be a good library that could provide some of the HTTP/HTTPS and RESTApi functionality.

The body-parser package can be used to process variables from web forms.

Sequelize is a popular Node package that provides interfacing to a SQL database management system using the Object Relational Model methodology.

An authentication/authorization package is needed,  JWT might be an appropriate package - more research is necessary.


