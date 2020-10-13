export function compareArray(array1: [], array2: []): boolean {
    const sortedArray1 = array1.slice().sort();
    const sortedArray2 = array2.slice().sort()
    if (sortedArray1.length === sortedArray2.length && sortedArray1.every((value, index) => value === sortedArray2[index])) {
        return true
    } else return false;
}

export function generateRandomId(): string {
    let result: string = '';
    while (!result) {
        result = Math.random().toString(36).substring(2,5);
    }
    return result;
}
