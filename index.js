function validateCreditCard(creditCardNum) {
  // "result" stores the end return value
  const result = { valid: true, number: creditCardNum };

  // Remove dashes from creditCardNum string
  const ccNumberNoDashes = creditCardNum.split("-").join("");

  // The credit card number must be 16 digits in length
  if (ccNumberNoDashes.length !== 16) {
    result.valid = false;
    result.error = "wrong_length, must be 16 digits";
    return result;
  }

  // All of the digits must be numbers
  for (let i = 0; i < ccNumberNoDashes.length; i++) {
    // store the current digit
    let currentNumber = ccNumberNoDashes[i];

    // turn the digit from a string to an integer (if the digit is in fact a digit and not anther char)
    currentNumber = parseInt(currentNumber);

    // check that the digit is a number
    if (!Number.isInteger(currentNumber)) {
      result.valid = false;
      result.error = "_invalid characters_";
      return result;
    }
  }

  // The credit card number must be composed of at least two different digits (i.e. all of the digits cannot be the same)
  let twoDifferentDigits = false;
  for (let i = 1; i < ccNumberNoDashes.length; i++) {
    if (ccNumberNoDashes[i] !== ccNumberNoDashes[i - 1]) {
      twoDifferentDigits = true;
      break;
    }
  }
  if (twoDifferentDigits === false) {
    result.valid = false;
    result.error = "_Need more than 1 unique digit_";
    return result;
  }

  // The final digit of the credit card number must be even
  if (ccNumberNoDashes[ccNumberNoDashes.length - 1] % 2 !== 0) {
    result.valid = false;
    result.error = "_odd final number_";
    return result;
  }

  // The sum of all the digits must be greater than 16
  let sum = 0;
  for (let i = 0; i < ccNumberNoDashes.length; i++) {
    sum += parseInt(ccNumberNoDashes[i]);
  }
  if (sum <= 16) {
    result.valid = false;
    result.error = "_sum less than 16_";
    return result;
  }

  // If we got this far, consider the credit card number valid
  return result;
};

/**** tests *****/
console.log(validateCreditCard('0000-0000-0000-001')); // { valid: false, number: '0000-0000-0000-001', error: 'wrong_length, must be 16 digits' }
console.log(validateCreditCard('9999-7777-8888-0000')); //{ valid: true, number: '9999-7777-8888-0000' }
console.log(validateCreditCard('6666-6666-6666-1666')); //{ valid: true, number: '6666-6666-6666-1666' }
console.log(validateCreditCard('a923-3211-9c01-1112')); //{ valid: false,number: 'a923-3211-9c01-1112',error: '_invalid characters_' }
console.log(validateCreditCard('4444-4444-4444-4444')); //{ valid: false,number: '4444-4444-4444-4444',error: '_only one type of number_' }
console.log(validateCreditCard('1211-1111-1111-1112')); //{ valid: true, number: '1211-1111-1111-1112' }
console.log(validateCreditCard('1211-1111-1111-1113')); //{ valid: false, number: '1211-1111-1111-1113', error: '_odd final number_' }