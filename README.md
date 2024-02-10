# odin-calculator
## Introduction
In this project I have built a calculator with simple functions and simple UI. It supports keyboard typing for most of the buttons.

I have mostly dedicated my efforts to the logic underneath using Javascript. Nonetheless, this project has helped to practice with the use of flexbox and CSS in general.

## How to use
The operations are quite simple:
- Sum: Either press '+' or 'x' on the keyboard or click the '*' symbol in the calculator UI.

- Subtraction: Either press '-' on the keyboard or click the '-' symbol in the calculator UI.

- Multiplication: Either press 'x' or '*' on the keyboard or click the 'x' symbol in the calculator UI.

- Division: Either press '/' on the keyboard or click the '/' symbol in the calculator UI. It doesn't allow division by 0!

- Modulo operation: Click 'MOD'. Modulo by 0 is not allowed!

- Decimal numbers: Either press '.' on the keyboard or click '.' symbol in the calculator UI. In case there is no operand it automatically adds:
    > 0.
    
- '±' operation: This operation changes the sign of the current operand. It can only be used through the UI. If the last input is an operator it has no effect.

- AC operation: Clears the whole calculator. Either press 'Escape' on the keyboard or click 'AC' in the UI.

- DEL operation: Deletes the last input. Either press 'Backspace' or 'Delete' on the keyboard or click 'DEL' in the UI.

## Limitations
Some of the limitation are the following:
- This project has been tested only on my keyboard
- There is a limit to how many characters the calculator can display. If there is only one operand, the calculator will limit its length so there can fit an operator and only a digit for the second operand. However, since the calculator accepts the '-' after '*' or 'x' then the second operand will only consist of '-'. If that operation is evaluated it leads to NaN.

- No percentage operation: I have never used that in my personal calculators so I instead decided to add the modulo operator

- Any sequence similar to the following yields a NaN:
    > 3 * - =

    I tried to mimic the behaviour that happens in any scientific calculator. In my case it throws NaN instead of 'Syntax Error'.