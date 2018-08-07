export const getMeanValue = (values: number[]): number => {
  const sum = values.reduce((a, b) => a + b);
  const meanVal = sum / values.length;
  return meanVal;
}

export const getStandardDeviation = (
  list: number[], 
  meanValue: number
): number => {
  const diffs = list.map(value => value - meanValue);
  const squareDiffs = diffs.map(value => Math.pow(value, 2));
  const avgSquareDiffs = getMeanValue(squareDiffs);
  const SDresult = Math.sqrt(avgSquareDiffs);

  return SDresult;
}

export const foundInObj = (obj: object, field: string, searchTerm: string): boolean => {
  return obj[field].toLowerCase().includes(searchTerm.toLowerCase());
}

export const searchHandler = (list: any[], searchTerm: string, searchFields: string[]): any[] => {
  return list.filter(listItem => {
    let found = false;
    for (const field of searchFields) {
      const flattenedObject = flattenObject(listItem);
      found = foundInObj(flattenedObject, field, searchTerm);
      if (found) { break;}
    }
    return found;
  });
}

export const flattenObject = (obj: object): object => {
	const toReturn = {};
	
	for (const key in obj) {
		if (!obj.hasOwnProperty(key)) { continue;}
		
		if ((typeof obj[key]) === 'object') {
			const flatObject = flattenObject(obj[key]);
			for (const i in flatObject) {
				if (!flatObject.hasOwnProperty(i)) { continue;}
				
				toReturn[key + '.' + i] = flatObject[i];
			}
		} else {
			toReturn[key] = obj[key];
		}
	}
	return toReturn;
}
