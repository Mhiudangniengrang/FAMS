import React from "react";
import { Typography, Card } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";

const StudentClassIfEdit = React.memo((props) => {
  const { classStudentData, handleEditMode, editMode3 } = props;
  const handleCancel = () => {
    handleEditMode(false);
  };
  const containerStyles = {
    scrollSnapType: "x mandatory",
    scrollPadding: "100px",
    height: "200px",
    whiteSpace: "nowrap",
    position: "relative",
    overflow: "hidden",
  };

  const itemStyles = {
    scrollSnapAlign: "start",
    display: "inline-block",
    margin: "15px 10px 15px ",
    padding: "0px 50px",
  };
  const { t } = useTranslation("translation");
  return (
    <div>
      <Typography className="bg-zinc-400 text-white px-6 py-2 mt-1 rounded-md text-base flex justify-between">
        {t("Class Information")}
        {!editMode3 && (
          <button onClick={() => handleEditMode(true)}>
            <EditOutlined />
          </button>
        )}
      </Typography>

      <div className="flex" style={containerStyles}>
        {classStudentData && classStudentData.length > 0 ? (
          classStudentData.map((item, index) => (
            <Card
              key={index}
              style={itemStyles}
              className="bg-white shadow-lg"
              hoverable
            >
              <div className="flex">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="mb-2 text-2xl font-bold"
                >
                  {item.className}
                </Typography>
                <p className="mb-4 mx-5 border px-3 rounded-md bg-[#16a34a] text-white">
                  {t(item.status)}
                </p>
              </div>
              <p className="font-medium my-3">
                {item.classCode} | {item.startDate} - {item.endDate}
              </p>
              <p>{t("Note about this")}</p>
            </Card>
          ))
        ) : (
          <div style={itemStyles}>
            <p className="my-16">Not found class...</p>
          </div>
        )}
      </div>
      {editMode3 && (
        <div className="flex justify-end my-3">
          <button
            className="text-red-500 mx-2 underline"
            onClick={handleCancel}
          >
            {t("Cancel")}
          </button>
          <button className="bg-[#172554] text-white border-solid border-2 w-20 h-8 rounded-md mx-4">
            {t("Save")}
          </button>
        </div>
      )}
    </div>
  );
});

StudentClassIfEdit.displayName = "StudentClassIfEdit";

export default StudentClassIfEdit;
