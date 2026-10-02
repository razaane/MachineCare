const machineRepository = require("../repositories/machine.repository");
//const reportRepository = require("../repositories/report.repository"); 

const createMachine = async (data) => {
    if (!data.reference) {
        throw new Error("reference is required !");
    }
    if (!data.nom) {
        throw new Error("nom is required !");
    }
    if (!data.atelier) {
        throw new Error("atelier is required !");
    }

    const existing = await machineRepository.findMachineByReference(data.reference);
    if (existing) {
        throw new Error("cette reference existe deja !");
    }

    return machineRepository.createMachine(data);
};

const getAllMachines = async (query) => {
    const filters = {};
    if (query.atelier) filters.atelier = query.atelier;
    if (query.statut) filters.statut = query.statut;

    return machineRepository.findAllMachines(filters);
};

const getMachineById = async (id) => {
    const machine = await machineRepository.findMachineById(id);
    if (!machine) {
        throw new Error("machine introuvable !");
    }
    return machine;
};

const updateMachine = async (id, data) => {
    const machine = await machineRepository.findMachineById(id);
    if (!machine) {
        throw new Error("machine introuvable !");
    }

    const validStatuts = ["disponible", "en_maintenance", "hors_service"];
    if (data.statut && !validStatuts.includes(data.statut)) {
        throw new Error("statut invalide !");
    }

    return machineRepository.updateMachineById(id, data);
};

const deleteMachine = async (id) => {
    const machine = await machineRepository.findMachineById(id);
    if (!machine) {
        throw new Error("machine introuvable !");
    }

    // politique: cascade -> on supprime les reports lies avant la machine
    //await reportRepository.deleteReportsByMachine(id);
    return machineRepository.deleteMachineById(id);
};

module.exports = {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine
};