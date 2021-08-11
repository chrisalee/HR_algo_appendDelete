/*
 * Complete the 'appendAndDelete' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. STRING t
 *  3. INTEGER k
 */

const appendAndDelete = (s, t, k) => {
      const identicalStringsSatisfyK = (() => {
    const stringsAreIdentical = s === t;
    const kCanBeSatisfied = k % 1 === 0;
    const matchIsPossible = stringsAreIdentical && kCanBeSatisfied;
    return matchIsPossible;
  })();

  if (identicalStringsSatisfyK) return 'Yes';

  const { length: initialLength } = s;
  const { length: desiredLength } = t;

  const happyPathMatches = (() => {
    const biggestMatch = (() => {
      let biggestMatch = '';
      for (let i = 0; i < desiredLength; i++) {
        const letter = t[i];
        const otherLetter = s[i];
        if (letter === otherLetter) {
          biggestMatch += otherLetter;
        } else {
          break;
        }
      }
      return biggestMatch;
    })();

    const { length: lettersInCommonLength } = biggestMatch;

    const initialMutations = desiredLength - lettersInCommonLength;
    const nextMutations = initialLength - lettersInCommonLength;
    const matchIsActual = initialMutations + nextMutations === k;
    return matchIsActual;
  })();

  if (happyPathMatches) return 'Yes';

  const delAndAppendAllMatches = (() => {
    const initialMutations = initialLength;
    const nextMutations = desiredLength;
    const totalMutations = initialMutations + nextMutations;
    const matchIsPossible = totalMutations <= k;
    return matchIsPossible;
  })();

  if (delAndAppendAllMatches) return 'Yes';

  const checkRestOfCases = (() => {
    const lengthsMatch = initialLength === desiredLength;
    const mustAppend = desiredLength > initialLength;
    const mustDelete = !mustAppend;
    let matchIsPossible;

    switch (lengthsMatch || mustAppend || mustDelete) {
      case lengthsMatch:
        return 'No';
      case mustAppend:
        matchIsPossible = (() => {
          const initialMutations = desiredLength - initialLength;
          const canSatisfyK =
            !(k - initialMutations === 1) && initialMutations * 2 === k;
          return canSatisfyK;
        })();
        return matchIsPossible ? 'Yes' : 'No';
      case mustDelete:
        matchIsPossible = (() => {
          const initialMutations = initialLength - desiredLength;
          const canSatisfyK = k - initialMutations >= 0;
          return canSatisfyK;
        })();
        return matchIsPossible ? 'Yes' : 'No';
      default:
        return 'No';
    }
  })();

  return checkRestOfCases;
}
