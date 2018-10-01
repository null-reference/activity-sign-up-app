# Acme Widget Company - Activity Sign-up App

If you don't know why you're on this project page, it's probably not for you :).

For those who know what's up... WELCOME!

# Getting Started

**IMPORTANT: The project depends upon a localdb instance (ie. server accessible @ `(localdb)\mssqllocaldb)`)**

Firstly, let's get the necessary DB setup out of the way. Run the following against your `localdb` instance.

```
CREATE DATABASE [AcmeWebActivityAuth]
GO

USE [AcmeWebActivityAuth]
GO

DROP TABLE IF EXISTS [Subscription]
GO
DROP TABLE IF EXISTS [User]
GO

CREATE TABLE [User] (
  [UserID] int NOT NULL PRIMARY KEY IDENTITY,
  [Username] varchar(100) NOT NULL UNIQUE,
  [Password] varchar(100) NOT NULL,
  [FirstName] varchar(100) NOT NULL,
  [LastName] varchar(100) NOT NULL,
  [Email] varchar(100) NOT NULL UNIQUE
);
GO

CREATE TABLE [Subscription] (
  [SubscriptionID] int NOT NULL IDENTITY,
  [UserID] int NOT NULL,
  [Activity] varchar(100) NOT NULL,
  [Comments] varchar(500) NULL,
  CONSTRAINT [FK_Subscription_User_UserID] FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([UserID])
);
GO

-- currently do not have a "create user profile" component; let's assume some users are setup in advance
INSERT INTO [User] (Username, [Password], FirstName, LastName, Email)
VALUES
	('steve', 'pw123', 'Steve', 'Dignan', 'guyfrompei@gmail.com'),
	('karen', 'pw123', 'Karen', 'Jones', 'kjones@gmail.com'),
	('rhea', 'pw123', 'Rhea', 'Newman', 'rnewman@gmail.com'),
	('simon', 'pw123', 'Simon', 'Smith', 'ssmith@gmail.com')
GO

-- throw in some mock subscription data to start with
INSERT INTO [Subscription] (UserID, Activity, Comments)
VALUES 
	(1, 'Baseball', 'Let''s go team!'),
	(2, 'Baseball', null),
	(3, 'Baseball', null),
	(2, 'Hockey', 'Have fun out there!'),
	(3, 'Hockey', null),
	(4, 'Hockey', null)
GO
```

Clone the repository: `git clone https://github.com/null-reference/activity-sign-up-app.git`

Open the created directory with VSCode.

You should be prompted with a message similar to "There are unresolved dependencies'. Please execute the restore command to continue.", choose "Restore". This will install all the required project dependencies.

Once complete, run the application with a press of the `F5` key.

*This project was built using the [React project template with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/react?view=aspnetcore-2.1&tabs=visual-studio)*
