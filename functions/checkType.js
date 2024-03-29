const checkType = (value) => {
    if (typeof value === 'string') {
        return 'string';
    } else if (typeof value === 'object') {
        return 'object';
    } else {
        return 'neither string nor object';
    }
}

export default checkType