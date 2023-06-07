export interface Leave {
  tx_id: number,
  employee_name: string,
  start_date: string,
  end_date: string,
  days: number
  leave_type: string,
  reason: string,
  status: string
}

export const LeaveColumns = [
  {
    key: "tx_id",
    column: "txId",
    type: "number",
    label: "Tx Id"
  },
  {
    key: "employee_name",
    column: "employeeName",
    type: "text",
    label: "Employee Name"
  },
  {
    key: "leave_type",
    column: "leaveType",
    type: "text",
    label: "Leave Type"
  },
  {
    key: "start_date",
    column: "startDate",
    type: "text",
    label: "Start Date"
  },
  {
    key: "end_date",
    column: "endDate",
    type: "text",
    label: "End Date"
  },
  {
    key: "status",
    column: "status",
    type: "text",
    label: "Status"
  },
  {
    key: "isEdit",
    column: "isEdit",
    type: "isEdit",
    label: ""
  }
]
