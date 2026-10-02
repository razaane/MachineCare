const Report = require("../models/report.model");

const createReport = (data) => {
    return Report.create(data);
};

const findAllReports = (filters = {}) => {
    return Report.find(filters);
};

const findReportById = (id) => {
    return Report.findById(id);
};

const findReportsByMachine = (machineId) => {
    return Report.find({ machine: machineId });
};

const updateReportById = (id, data) => {
    return Report.findByIdAndUpdate(id, data, { new: true });
};

const deleteReportsByMachine = (machineId) => {
    return Report.deleteMany({ machine: machineId });
};

module.exports = {
    createReport,
    findAllReports,
    findReportById,
    findReportsByMachine,
    updateReportById,
    deleteReportsByMachine
};