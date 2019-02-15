import React from 'react';
import DateTime from 'react-datetime';

const DatePicker = ({
    inputProps,
    dateFormat,
    defaultValue,
    label,
    onBlur,
    onChange,
    value,
    viewMode,
    disableOnClickOutside = false,
    onFocus,
    isValidDate,
    labelClassName = ''
}) => {

    const placeholder = inputProps && (inputProps.placeholder || "YYYY-MM-DD");

    return (
        <div className="">
            <label className={labelClassName}>{label}</label>
            <DateTime
                className=""
                inputProps={{ placeholder, readOnly: true, className: "form-control bg-white" }}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                value={value}
                defaultValue={defaultValue}
                viewMode={viewMode}
                dateFormat={dateFormat || "YYYY-MM-DD"}
                timeFormat={false}
                closeOnSelect={true}
                disableOnClickOutside={disableOnClickOutside}
                isValidDate={isValidDate}
            />
        </div>
    )
}

export default DatePicker;
