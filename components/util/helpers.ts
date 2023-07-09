export function choiceArrayToString(
  choices: Array<string | Array<string | string[]>>
){
  let retVal = '';
  choices.forEach((i) => {
    if (Array.isArray(i)) {
      i.forEach((j) => {
        if (Array.isArray(j)) {
          retVal = retVal.concat('(', j.join(' and '), '), ');
        } else {
          retVal = retVal.concat(j, ' or ');
        }
      });
      if (retVal.endsWith(' or ')) {
        retVal = retVal.slice(0, retVal.length - 4).concat(', ');
      }
    } else {
      retVal = retVal.concat(i, ', ');
    }
  });

  retVal = retVal.trim();
  if (retVal.endsWith(',')) {
    retVal = retVal.slice(0, retVal.length - 1);
  }
  return retVal.replaceAll('{X}', 'Pick One');
};
