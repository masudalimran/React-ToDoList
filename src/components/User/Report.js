import React from "react";

export default function Report({ copyReport, report, handleReport }) {
  return (
    <div className="reportGenDiv">
      <p onClick={copyReport} className="reportPara">
        {report}
      </p>
      <button className="report" onClick={handleReport}>
        Generate Report
      </button>
    </div>
  );
}
