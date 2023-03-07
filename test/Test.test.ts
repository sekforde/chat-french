describe('Thread', () => {

  it('should crack the code', () => {

    // a function to leftpad a number with zeros
    function leftPad(num: number, size: number) {
      let s = num + '';
      while (s.length < size) s = '0' + s;
      return s;
    }

    const allCodes: string[] = [];

    for (let i = 0; i < 1000; i++) {
      allCodes.push(leftPad(i, 3));
    }

    function rightPosMatches(code: string, guess: string) {
      return code
        .split('')
        .map((d: string, i: number) => d === guess[i] ? 1 : 0)
        .reduce((a: number, b: number) => a + b, 0);
    }

    function wrongPosMatches(code: string, guess: string) {
      let count = 0;
      if (code[0] !== guess[0] && (code[0] === guess[1] || code[0] === guess[2])) count++;
      if (code[1] !== guess[1] && (code[1] === guess[0] || code[1] === guess[2])) count++;
      if (code[2] !== guess[2] && (code[2] === guess[0] || code[2] === guess[1])) count++;
      return count;
    }
    const oneCorrectRightPlace = (guess: string) => (code: string) => rightPosMatches(code, guess) === 1;
    const oneCorrectWrongPlace = (guess: string) => (code: string) => wrongPosMatches(code, guess) === 1;
    const twoCorrectWrongPlace = (guess: string) => (code: string) => wrongPosMatches(code, guess) === 2;
    const nothingIsCorrect = (guess: string) => (code: string) => rightPosMatches(code, guess) === 0 && wrongPosMatches(code, guess) === 0;

    const results = allCodes
      .filter(oneCorrectRightPlace('682'))
      .filter(oneCorrectWrongPlace('614'))
      .filter(twoCorrectWrongPlace('206'))
      .filter(nothingIsCorrect('738'))
      .filter(oneCorrectWrongPlace('780'))

    console.log(results);

  });

});