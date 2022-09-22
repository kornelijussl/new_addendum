// SEQUELIZE
import Sequelize from "sequelize";

// SEQUELIZE INSTANCE
import sequelizeInstance from "..";

// ------------------------------------------------------------------

const { DataTypes } = Sequelize;

export default sequelizeInstance.define(
  "Appointment",
  {
    patientName: DataTypes.STRING,
    patientSurname: DataTypes.STRING,
    appointmentDateTime: DataTypes.DATE,
  },
  {
    tableName: "appointments",
  },
);
