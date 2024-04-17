// eslint-disable-next-line no-unused-vars
import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { DatePicker } from "antd";

function RangeDatePicker({ onDateChange }) {
  const { RangePicker } = DatePicker;

  function onChange(dates, dateStrings) {
    onDateChange(dates, dateStrings);
  }

  return (
    <div className="text-center" data-testid="rangePicker">
      <RangePicker
        autofocus
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
        }}
        onChange={onChange}
        className="rounded-lg rounded-bl-lg w-full"
      />
    </div>
  );
}

RangeDatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};

export default RangeDatePicker;
