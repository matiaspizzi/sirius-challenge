import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { getFilters } from '../utils/getFilters';

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {

    const [filters, setFilters] = useState(getFilters());

    useEffect(() => {
        storeFilters(filters);
    }, [filters]);

    const storeFilters = (filters) => {
        localStorage.setItem('filters', JSON.stringify(filters));
    }

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
}

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default FilterProvider;