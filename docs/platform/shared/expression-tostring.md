### Expressions or Variables Returning Non-expected Values when Nested in String
Users may sometimes observe that the returned value for an expression or variable appears to return a "junk" or "non-expected" value.  This can happen when combining different expressions and variable types together.

For example, the expression `<+trigger.payload.repository.pushed_at>` will often return the correct epoch time value when utilized as an expression on its own, or referenced on its own.  However, when combining it with a string, it may return a random value, such as `VARTQSO2X4HIRVVPAG63VAR6LOEAYFE4F72F3W7`

The reason for this behavior is because that the value is an integer and the combination of that value within JEXL causes that value to render when included as a part of a larger string value.

To match the format of the destination, users should utilize the JEXL modifier `.toString()` to modify this value so that it can be a part of a string.  In this example, `<+trigger.payload.repository.pushed_at>` becomes `<+trigger.payload.repository.pushed_at.toString()>`, and the epoch time value is then returned

To find out the type of the value, to confirm the need for a conversion, users can utilize `.getClass().getSimpleName()` as a part of the expression to get a return of the value type.  For example, `<+trigger.payload.repository.pushed_at>` becomes `<+trigger.payload.repository.pushed_at.getClass().getSimpleName()>` returns **Integer**.