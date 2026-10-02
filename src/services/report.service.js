const reportRepository = require("../repositories/report.repository");
const machineRepository = require("../repositories/machine.repository");

const createReport = async (data, userId) => {
    if (!data.machine) {
        throw new Error("machine is required !");
    }
    if (!data.description) {
        throw new Error("description is required !");
    }

    const machine = await machineRepository.findMachineById(data.machine);
    if (!machine) {
        throw new Error("machine introuvable !");
    }

    const reportData = {
        machine: data.machine,
        description: data.description,
        declaredBy: userId
    };

    return reportRepository.createReport(reportData);
};

const getAllReports = async (query) => {
    const filters = {};
    if (query.machine) filters.machine = query.machine;
    if (query.statut) filters.statut = query.statut;

    return reportRepository.findAllReports(filters);
};

const getReportById = async (id) => {
    const report = await reportRepository.findReportById(id);
    if (!report) {
        throw new Error("signalement introuvable !");
    }
    return report;
};

const getReportsByMachine = async (machineId) => {
    const machine = await machineRepository.findMachineById(machineId);
    if (!machine) {
        throw new Error("machine introuvable !");
    }
    return reportRepository.findReportsByMachine(machineId);
};

const updateReport = async (id, data) => {
    const report = await reportRepository.findReportById(id);
    if (!report) {
        throw new Error("signalement introuvable !");
    }

    const validStatuts = ["ouvert", "en_cours", "resolu"];
    if (data.statut && !validStatuts.includes(data.statut)) {
        throw new Error("statut invalide !");
    }

    return reportRepository.updateReportById(id, data);
};

const resolveReport = async (id, data) => {
    const report = await reportRepository.findReportById(id);
    if (!report) {
        throw new Error("signalement introuvable !");
    }

    if (!data.resolutionNote) {
        throw new Error("resolutionNote is required !");
    }

    const updateData = {
        statut: "resolu",
        resolutionNote: data.resolutionNote,
        resolvedAt: new Date()
    };

    return reportRepository.updateReportById(id, updateData);
};

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    getReportsByMachine,
    updateReport,
    resolveReport
};