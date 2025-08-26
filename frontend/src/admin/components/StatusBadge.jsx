import React from "react";

const StatusBadge = ({ type, appointment }) => {
  let text = "";
  let color = "";

  if (type === "general") {
    if (appointment.cancelled) {
      text = "Cancelled";
      color = "bg-red-100 text-red-600";
    } else if (appointment.isCompleted) {
      text = "Completed";
      color = "bg-green-100 text-green-600";
    } else {
      text = "Active";
      color = "bg-blue-100 text-blue-600";
    }
  }

  if (type === "payment") {
    if (appointment.cancelled) {
      text = "Cancelled";
      color = "bg-red-100 text-red-600";
    } else if (appointment.isCompleted) {
      text = "Completed";
      color = "bg-green-100 text-green-600";
    } else if (appointment.payment) {
      text = "Paid";
      color = "bg-green-100 text-green-600";
    } else {
      text = "Pending";
      color = "bg-orange-100 text-orange-600";
    }
  }

  if (type === "completion") {
    if (appointment.cancelled) {
      text = "Cancelled";
      color = "bg-red-100 text-red-600";
    } else if (appointment.isCompleted) {
      text = "Completed";
      color = "bg-green-100 text-green-600";
    } else {
      text = "Pending";
      color = "bg-orange-100 text-orange-600";
    }
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
    >
      {text}
    </span>
  );
};

export default StatusBadge;