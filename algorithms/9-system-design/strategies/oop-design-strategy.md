# OOP Design Strategy Guide

OOP Design is a good exercise on how to split up our system into different components. In system design, it is usually geared towards the backend and the database. With OOP Design, we can simulate almost something like React Components but in terms of objects/classes. Functional programming is very popular these days but these OOP questions do get asked a fair bit. Again, like the system design question, this is open ended and there are many correct answers but if a candidate is making a "God class", that is wrong.

The example we will use here is desgining an ATM.

## Path 1: Define main components of an ATM

This path will start off with having the candidate walk through the main components of an ATM. This is straight up telling them that the physical components are part of the design.

I generally don't like telling candidates at the start that the physical objects can act as classes (Ex: Card Class for designing an ATM). The reason is that I want them to really reason with these questions. A lot of the time, candidates go straight for talking about depositing or withdrawing without considering the physical components of an ATM (keypad, screen, card slot, cash slot, etc...) or even the fact that there is an authentication process.

- Card reader
- Keypad
- Screen
- Cash dispenser
- Deposit slot
- Printer
- Network infrastructure to communicate with the bank

If you do take this path, then go straight into:

### What you can do with an ATM

- Balance Inquiry
- Deposit cash
- Deposit check (optional)
- Withdraw cash
- Tranfer (optional)

We should keep it barebones so feel free to omit check and transfer stuff

## Path 2: Activity Diagram/User Story

This is my preferred method to start out with. I believe Path 1 may rob candidates of a learning experience about thinking about the physical parts of the system as being part of the system we design.

Have the candidate walk through at least one user story. And they should draw this as a flow diagram. So, let's take for example, designing an ATM.

### User Story: Authentication

Insert Card -> ATM asks for PIN -> Customer enters pin -> Check validity -> Display menu -> Customer selects transaction

Note: In the check validity portion of this user story, it can be implemented such that if someone enters a wrong password more than once, boot them off the system or it can be implemented such that it just keeps prompting for password.

Other user stories:
- Withdraw
- Deposit
    - Check
    - Cash

## List "Actors" of this System (Use Case Diagram)

After you've decided which path you want to go on ask the candidate what are the actors and their "jobs"

We want people to interact with these systems. Encourage candidate to draw this out.

Actors:

- ATM Admin
    - Turn ATM on and off
    - Refill ATM with cash, ink, paper
    - Take out cash, checks
- Customer
    - Balance inquiry
    - Withdrawal
    - Deposit
- Bank Manager/Automated system
    - Generate reports and analytics
    - Keeps track of cash in ATM to note when to refill

## List all the Classes

Have the candidate now list all the classes related to the system as well as some properties and/or methods in each class similar to a schema diagram. Example classes:

- ATM
- CashReader
- CashDispenser
- Keypad
- Screen
- Printer
- DepositSlot
- Bank
- Account
- Customer
- Card
- Transactions

## Draw some interactions among the classes

Whatever classes they draw out, have them show the interaction among them similar to the activity diagram.

### Talk about stuff like inheritance

The pillars of OOP are as follows (which we will go over in lecture so this doesn't need to be stated to the candidate):

- Polymorphism
- Encapsulation
- Inheritance
- Abstraction

However, we don't need to talk too much about any other thing except inheritance. In the case of an ATM, candidates can make the argument about having Savings Account and Checking Account be subclasses (extends) of the Account class. They can also make the argument that each account can be separate classes. 