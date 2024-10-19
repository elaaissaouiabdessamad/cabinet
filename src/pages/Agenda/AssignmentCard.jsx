import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaUserMd, FaUser, FaClock, FaCalendarAlt } from "react-icons/fa";

dayjs.extend(relativeTime);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDateWithCapitalizedDay = (date) => {
  const formattedDate = dayjs(date).format("dddd DD MMMM YYYY HH:mm");
  const day = formattedDate.split(" ")[0];
  const restOfDate = formattedDate.slice(day.length);
  return capitalizeFirstLetter(day) + restOfDate;
};

const AssignmentCard = ({ title, assignment, assignmentDate, type }) => {
  const assignmentTime = dayjs(assignment.assignmentDateTime);
  const isBefore = assignmentTime.isBefore(assignmentDate);

  return (
    <div className="mb-2 p-4 border rounded-lg shadow-sm flex flex-col space-y-2">
      <h4 className="text-lg font-semibold">
        {title} en{" "}
        {type == "salle de cathétérisme"
          ? "Salle de Cathétérisme"
          : "Bloc de Rythmologie"}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-[#8f8df2]" />
          {formatDateWithCapitalizedDay(assignment.assignmentDateTime)}
        </p>
        <p className="flex items-center">
          <FaClock className="mr-2 text-[#8f8df2]" />
          {isBefore
            ? `Il y a ${assignmentTime.from(dayjs(assignmentDate), true)}`
            : `Il reste ${assignmentTime.to(dayjs(assignmentDate), true)}`}
        </p>
        <p className="flex items-center">
          <FaUserMd className="mr-2 text-[#8f8df2]" />
          Médecin: {assignment.doctor.prenom} {assignment.doctor.nom}
        </p>
        <p className="flex items-center">
          <FaUser className="mr-2 text-[#8f8df2]" />
          Patient: {assignment.patient.prenom} {assignment.patient.nom}
        </p>
      </div>
    </div>
  );
};

export default AssignmentCard;
