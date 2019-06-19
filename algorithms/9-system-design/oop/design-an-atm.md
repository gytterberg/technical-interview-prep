# Design an ATM

## Requirements and Goals of an ATM

### Main Components of an ATM

- Card reader
- Keypad
- Screen
- Cash dispenser
- Deposit slot
- Receipt slot
- Network infrastructure

### Main Functionality of an ATM

- Check balance
- Deposit (cash/check)
- Withdrawal
- Transfer

### Actors of an ATM System

#### Operator

- Turn ATM ON/OFF
- Refill ATM with cash, receipts, INK
- Take out deposited checks and cash

#### Customer

- See Main functionality

#### Bank Admin

- Generate reports based on operator

## Classes of an ATM System

- ATM
- Keypad
- Screen
- Printer
- CashDispenser
- DepositSlot
- Bank
- CardReader
- Account
- Customer
- Card
- Transaction

![Sample Class Diagram for an ATM](./class-diagram.png)

## Sample Activity Diagrams

### Authentication

![Sample Authentication Activity Diagram](./authentication-activity.png)

### Deposit

### Withdrawal