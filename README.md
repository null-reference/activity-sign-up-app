# Acme Widget Company - Activity Sign-up App

If you don't know why you're on this project page, it's probably not for you :).

For those who know what's up... WELCOME!

# Getting Started

**IMPORTANT: The project depends upon a localdb instance (ie. server accessible @ `(localdb)\mssqllocaldb)`**

Firstly, let's get the necessary DB setup out of the way. Run the following against your `localdb` instance.

```
CREATE DATABASE [AcmeWebActivity]
GO

USE [AcmeWebActivity]
GO

CREATE TABLE [Subscription] (
  [SubscriptionID] int NOT NULL IDENTITY,
  [FirstName] varchar(100) NOT NULL,
  [LastName] varchar(100) NOT NULL,
  [Email] varchar(100) NOT NULL,
  [Activity] varchar(100) NOT NULL,
  [Comments] varchar(500) NULL
);
GO
```

Clone the repository: `git clone https://github.com/null-reference/activity-sign-up-app.git`

Open the created directory with VSCode.

You should be prompted with a message similar to "There are unresolved dependencies'. Please execute the restore command to continue.", choose "Restore". This will install all the required project dependences.

Once complete, run the application with a press of the `F5` key.

*This project was built using the [React project template with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/react?view=aspnetcore-2.1&tabs=visual-studio)*
