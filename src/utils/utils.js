export function classNamesBuilder(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const sumProp = (data, key) => {
    const sumKey = data.reduce(
        (accumulator, currentValue) => accumulator + parseInt(currentValue[key]),
        0,
    );
    return sumKey;
}