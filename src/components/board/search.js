import React from "react";
import PropTypes from 'prop-types';

const Search = ({onChange, searchTerm, addNew}) => (
            <div className="d-flex justify-content-center align-items-center text-dark ">
                <div className="form-control-position pointer">
                    { addNew }
                </div>
                <input
                    className="form-control mx-2 shadow-sm"
                    id="searchUser"
                    name="searchUser"
                    type="text"
                    onChange={e => onChange(e.target.value)}
                    value= {searchTerm}
                />
            </div>
);

Search.propTypes = {
    onChange: PropTypes.func,
    addNew: PropTypes.element,
    searchTerm: PropTypes.string.isRequired,
}

export default Search;