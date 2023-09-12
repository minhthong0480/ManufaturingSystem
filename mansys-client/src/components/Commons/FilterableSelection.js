import React from 'react';
import { useState, useEffect } from 'react';
import { Select } from 'antd';

const FilterableSelect = ({ defaultOptions, className, placeHolder, onChange, value, disabled}) => {
    const [filteredOptions, setFilteredOptions] = useState(defaultOptions ? defaultOptions : []);

    useEffect(() => {
      handleSearch('')
    }, [defaultOptions])

    const handleSearch = (value) => {
      const filtered = defaultOptions.filter((option) =>
          option.key.toLowerCase().indexOf(value.toLowerCase()) >= 0
        );

        setFilteredOptions(filtered);
    };
  
    return (
        <Select
          disabled={disabled}
          className={className ? className : ''}
          showSearch
          placeholder={placeHolder ? placeHolder : "Select an option"}
          optionFilterProp="children"
          filterOption={false}
          onSearch={handleSearch}
          onChange={(e) => {if(onChange) onChange(e)}}
          value={value}
        >
          {filteredOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.key}
            </Select.Option>
          ))}
        </Select>
      );
  };
  
  export default FilterableSelect;