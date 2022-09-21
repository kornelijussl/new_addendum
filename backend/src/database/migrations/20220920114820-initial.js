module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS "appointments" (
          "id" SERIAL, 
          "patientName" VARCHAR(255) NOT NULL,
          "patientSurname" VARCHAR(255) NOT NULL,
          "appointmentDate" TIMESTAMP WITH TIME ZONE NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
          PRIMARY KEY ("id")
        );
      `),

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable("appointments");
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
