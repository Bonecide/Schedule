import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import "./ScheduleTable.scss";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableCell from "./TableCell";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const data = [
  {
    id : 1,
    name: "Иванов",
    subjects: [
      { name: "Математика", teacher: "Ivanov", time: "14:00 - 15:00" },
    ],
  },
  {
    id : 2,
    name: "Петров",
    subjects: [
      { name: "Математика", teacher: "Ivanov", time: "14:00 - 15:00" },
    ],
  },
  {
    id : 3,
    name: "Сидорова",
    subjects: [
      { name: "Математика", teacher: "Ivanov", time: "14:00 - 15:00" },
    ],
  },
  {
    id : 4,
    name: "Иванов",
    subjects: [
      { name: "Математика", teacher: "Ivanov", time: "14:00 - 15:00" },
    ],
  },
  {
    id : 5,
    name: "Иванов",
    subjects: [
      { name: "Математика", teacher: "Ivanov", time: "14:00 - 15:00" },
    ],
  },
];

const ScheduleTable = () => {
  const schedule = JSON.parse(localStorage.getItem("schedule"));
  const [scheduleData, setScheduleData] = useState(
    schedule?.length ? schedule : data
  );

  const handleDrop = (item, targetDayIndex, targetStudentIndex) => {
    const { dayIndex, studentIndex } = item;
    const subject = scheduleData[studentIndex].subjects[dayIndex];

    // Если предмет перемещается в ту же самую клетку, где он уже находится, не делаем ничего
    if (dayIndex === targetDayIndex && studentIndex === targetStudentIndex) {
      return;
    }
    // Если в целевой клетке уже есть другой предмет, не перемещаем текущий предмет
    if (
      scheduleData[targetStudentIndex].subjects[targetDayIndex]?.name !== undefined
    ) {
      return;
    }
    const newScheduleData = [...scheduleData];
    newScheduleData[studentIndex].subjects[dayIndex] = undefined;
    newScheduleData[targetStudentIndex].subjects[targetDayIndex] = subject;

    setScheduleData(newScheduleData);
    localStorage.setItem("schedule", JSON.stringify(scheduleData));
  };

  console.log(scheduleData);
  return (
    <DndProvider backend={HTML5Backend}>
      <table>
        <thead>
          <tr>
            <th>Ученики</th>
            {days.map((day, dayIndex) => (
              <th key={`day-${dayIndex}`}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleData.length &&
            scheduleData.map((student, studentIndex) => (
              <tr key={`student-${studentIndex}`}>
                <td>{student.name}</td>
                {days.map((day, dayIndex) => {
                  const subject = student.subjects[dayIndex];
                  return (
                    <TableCell
                      setScheduleData={setScheduleData}
                      scheduleData={scheduleData}
                      key={`student-${student.id}-day-${dayIndex}`}
                      dayIndex={dayIndex}
                      studentIndex={studentIndex}
                      onDrop={handleDrop}
                      subject={subject}
                    />
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </DndProvider>
  );
};

export default ScheduleTable;
