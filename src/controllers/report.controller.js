const reportService = require("../services/report.service");

const createReport = async (req, res) => {
    try {
        const report = await reportService.createReport(req.body, req.user.userId);
        res.status(201).json({
            message: "report created successfully",
            report
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllReports = async (req, res) => {
    try {
        const reports = await reportService.getAllReports(req.query);
        res.status(200).json(reports);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getReportById = async (req, res) => {
    try {
        const report = await reportService.getReportById(req.params.id);
        res.status(200).json(report);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getReportsByMachine = async (req, res) => {
    try {
        const reports = await reportService.getReportsByMachine(req.params.id);
        res.status(200).json(reports);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateReport = async (req, res) => {
    try {
        const report = await reportService.updateReport(req.params.id, req.body);
        res.status(200).json({
            message: "report updated successfully",
            report
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const resolveReport = async (req, res) => {
    try {
        const report = await reportService.resolveReport(req.params.id, req.body);
        res.status(200).json({
            message: "report resolved successfully",
            report
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    getReportsByMachine,
    updateReport,
    resolveReport
};