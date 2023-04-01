import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import AddSubject from "./AddSubjectModal/AddSubject";

const TableCell = ({
  dayIndex,
  studentIndex,
  onDrop,
  subject,
  setScheduleData,
  scheduleData,
}) => {
  const [content, setContent] = useState({
    name: "-",
  });
  const [isHover, setIsHover] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setContent(subject?.name !== undefined ? subject : { name: "-" });
  }, [subject]);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "subject",
    item: { dayIndex, studentIndex, subject },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      opacity: monitor.isDragging() ? 1 : 1,
    }),
  }));

  const [{}, drop] = useDrop(() => ({
    accept: "subject",
    drop: (item) => {
      onDrop(item, dayIndex, studentIndex);
    },
    canDrop: (item) =>
      item.dayIndex !== dayIndex || item.studentIndex !== studentIndex,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // Отображаем содержимое ячейки только если там есть предмет
  const handleSubmit = (data) => {
    const newScheduleData = [...scheduleData];
    newScheduleData[studentIndex].subjects[dayIndex] = {
      name: data.name,
      teacher: data.teacher,
      time: data.start + " - " + data.end,
    };
    setScheduleData(newScheduleData);
    localStorage.setItem('schedule',JSON.stringify(scheduleData))
    setIsModalOpen(false);
  };
  return (
    <>
      <td
        onMouseEnter={() => subject && setIsHover(true)}
        onMouseLeave={() => subject && setIsHover(false)}
        className={`relative ${subject !== undefined ? "hasSubject" : ""}`}
        onClick={() => {
          if (!subject?.name) {
            setIsModalOpen(true);
          }
        }}
      >
        <div>
          <div
            onClick={(e) => e.stopPropagation()}
            ref={(node) => {
              if (dayIndex === 0 && studentIndex === 0) {
                console.log(node, dayIndex, studentIndex);
              }
              drag(drop(node));
            }}
            className={
              subject?.name !== undefined
                ? "table-cell"
                : "table-cell-withoutSubject"
            }
          >
            <p className="content">{content?.name}</p>
          </div>
          {isHover && subject && (
            <div className="popUp">
              <p> {content.time}</p>
              <p> {content.teacher}</p>
            </div>
          )}
        </div>
      </td>
      {isModalOpen && (
        <AddSubject onSubmit={handleSubmit} close={setIsModalOpen} />
      )}
    </>
  );
};

export default TableCell;
