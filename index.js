function validateCreditCard(creditCardNum) {
    const result = {valid :true , number : creditCardNum};

    const ccNumberNoDash = creditCardNum.split("-").join("");
    
    if (ccNumberNoDash.length !== 16){
        result.valid = false;
        result.error = "wrong length, must be 16 digits";
        return result;
    }   
    for (let i = 0 ; i < ccNumberNoDash.length;  i++){
        let currentNumber = ccNumberNoDash[i];
        currentNumber = parseInt(currentNumber);
        
        if (!Number.isInteger(currentNumber)){
            result.valid = false;
            result.error = "invalid characters";
            return result
        }
    }
    let twoDifferentDigits = false;
    for (let i = 1; i < ccNumberNoDash.length; i++){
        if (ccNumberNoDash[i] !== ccNumberNoDash[i - 1]) {
          twoDifferentDigits = true;
          break;
        }
      }
        if (twoDifferentDigits === false) {
    result.valid = false;
    result.error = "_Need more than 1 unique digit_";
    return result;
  }
  if (ccNumberNoDash[ccNumberNoDash.length - 1] % 2 !== 0) {
    result.valid = false;
    result.error = "_odd final number_";
    return result;
  }


  let sum = 0;
  for (let i = 0; i < ccNumberNoDash.length; i++) {
    sum += parseInt(ccNumberNoDash[i]);
  }
  if (sum <= 16) {
    result.valid = false;
    result.error = "_sum less than 16_";
    return result;
  }

  return result;
};

/**** tests *****/
console.log(validateCreditCard('9999-7777-8888-0000')); //{ valid: true, number: '9999-7777-8888-0000' }
console.log(validateCreditCard('6666-6666-6666-1666')); //{ valid: true, number: '6666-6666-6666-1666' }
console.log(validateCreditCard('a923-3211-9c01-1112')); //{ valid: false,number: 'a923-3211-9c01-1112',error: '_invalid characters_' }
console.log(validateCreditCard('4444-4444-4444-4444')); //{ valid: false,number: '4444-4444-4444-4444',error: '_only one type of number_' }
console.log(validateCreditCard('1211-1111-1111-1112')); //{ valid: true, number: '1211-1111-1111-1112' }




