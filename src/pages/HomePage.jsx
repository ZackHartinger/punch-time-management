import PageTitle from "../components/PageTitle";
import WorkDayTable from "../components/WorkDayTable";

const HomePage = () => {
    const title = "Home Page";
    const workdays = [
        {
            "WorkDayId": 1,
            "EmployeeId": 1001,
            "FirstName": "Zack",
            "LastName": "Hartinger",
            "CustomerName": "Customer 1",
            "Date": "2025-01-15",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 1",
            "Mileage": "52",
            "WorkDayTasks": [
                {
                    "TaskId": 1,
                    "Category": "General Labor",
                    "Description": "Moved Material"
                },
                {
                    "TaskId": 5,
                    "Category": "Irrigation",
                    "Description": "Set Irrigation heads"
                }
            ]
        },
        {
            "WorkDayId": 2,
            "EmployeeId": 1001,
            "FirstName": "Zack",
            "LastName": "Hartinger",
            "CustomerName": "Customer 2",
            "Date": "2025-01-14",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 2",
            "Mileage": "54",
            "WorkDayTasks": [
                {
                    "TaskId": 2,
                    "Category": "General Labor",
                    "Description": "Demoed Landscape"
                }
            ]
        },
        {
            "WorkDayId": 3,
            "EmployeeId": 1001,
            "FirstName": "Zack",
            "LastName": "Hartinger",
            "CustomerName": "Customer 3",
            "Date": "2025-01-13",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 3",
            "Mileage": "56",
            "WorkDayTasks": [
                {
                    "TaskId": 3,
                    "Category": "General Labor",
                    "Description": "Planted Plants"
                }
            ]
        },
        {
            "WorkDayId": 4,
            "EmployeeId": 1001,
            "FirstName": "Zack",
            "LastName": "Hartinger",
            "CustomerName": "Customer 4",
            "Date": "2025-01-12",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 1",
            "Mileage": "58",
            "WorkDayTasks": [
                {
                    "TaskId": 4,
                    "Category": "Hardscape",
                    "Description": "Set Wall Blocks"
                }
            ]
        },
        {
            "WorkDayId": 5,
            "EmployeeId": 1001,
            "FirstName": "Zack",
            "LastName": "Hartinger",
            "CustomerName": "Customer 5",
            "Date": "2025-01-11",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 2",
            "Mileage": "60",
            "WorkDayTasks": [
                {
                    "TaskId": 5,
                    "Category": "Irrigation",
                    "Description": "Set Irrigation heads"
                }
            ]
        },
        {
            "WorkDayId": 6,
            "EmployeeId": 1001,
            "FirstName": "Zack",
            "LastName": "Hartinger",
            "CustomerName": "Customer 6",
            "Date": "2025-01-10",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 3",
            "Mileage": "62",
            "WorkDayTasks": [
                {
                    "TaskId": 1,
                    "Category": "General Labor",
                    "Description": "Moved Material"
                }
            ]
        },
        {
            "WorkDayId": 7,
            "EmployeeId": 1001,
            "FirstName": "Zack",
            "LastName": "Hartinger",
            "CustomerName": "Customer 7",
            "Date": "2025-01-09",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 1",
            "Mileage": "64",
            "WorkDayTasks": [
                {
                    "TaskId": 2,
                    "Category": "General Labor",
                    "Description": "Demoed Landscape"
                }
            ]
        },
        {
            "WorkDayId": 8,
            "EmployeeId": 1001,
            "FirstName": "Zack",
            "LastName": "Hartinger",
            "CustomerName": "Customer 8",
            "Date": "2025-01-08",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 2",
            "Mileage": "66",
            "WorkDayTasks": [
                {
                    "TaskId": 3,
                    "Category": "General Labor",
                    "Description": "Planted Plants"
                }
            ]
        },
        {
            "WorkDayId": 9,
            "EmployeeId": 1001,
            "FirstName": "Zack",
            "LastName": "Hartinger",
            "CustomerName": "Customer 9",
            "Date": "2025-01-07",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 3",
            "Mileage": "68",
            "WorkDayTasks": [
                {
                    "TaskId": 4,
                    "Category": "Hardscape",
                    "Description": "Set Wall Blocks"
                }
            ]
        },
        {
            "WorkDayId": 10,
            "EmployeeId": 1002,
            "FirstName": "Lauren",
            "LastName": "Peterson",
            "CustomerName": "Customer 10",
            "Date": "2025-01-06",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 1",
            "Mileage": "70",
            "WorkDayTasks": [
                {
                    "TaskId": 5,
                    "Category": "Irrigation",
                    "Description": "Set Irrigation heads"
                }
            ]
        },
        {
            "WorkDayId": 11,
            "EmployeeId": 1002,
            "FirstName": "Lauren",
            "LastName": "Peterson",
            "CustomerName": "Customer 11",
            "Date": "2025-01-05",
            "StartTime": "08:00 AM",
            "EndTime": "04:00 PM",
            "HoursWorked": "8",
            "LunchDuration": "30 minutes",
            "LunchTime": "12:00 PM",
            "TruckName": "Truck 2",
            "Mileage": "72",
            "WorkDayTasks": [
                {
                    "TaskId": 1,
                    "Category": "General Labor",
                    "Description": "Moved Material"
                }
            ]
        }
    ]

    return (
        <div className="container pt-3">
            <PageTitle title={title} />
            <div className="work-day-card">
                <WorkDayTable tableData={workdays.slice(0, 5)} />
            </div>
        </div>
    )
}

export default HomePage;