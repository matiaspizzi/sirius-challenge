const getFilters = () => {
    const storedFilters = localStorage.getItem('filters');
    if (storedFilters) {
        return JSON.parse(storedFilters);
    } else {
        return {name: "", type: "", color: "", isBaby: false, weight_gt: 0, weight_lt: 1000};
    }
}

export { getFilters };