export const updateObject = (oldObjett, updatedValues) => {
    return {
        ...oldObjett,
        ...updatedValues
    };
};
