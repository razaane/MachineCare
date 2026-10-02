const Machine = require("../models/Machine");

const createMachine = (data) => {
    return Machine.create(data);
};

const findMachineByReference = (reference) => {
    return Machine.findOne({ reference });
};

const findAllMachines = (filters = {}) => {
    return Machine.find(filters);
};

const findMachineById = (id) => {
    return Machine.findById(id);
};

const updateMachineById = (id, data) => {
    return Machine.findByIdAndUpdate(id, data, { new: true });
};

const deleteMachineById = (id) => {
    return Machine.findByIdAndDelete(id);
};

module.exports = {
    createMachine,
    findMachineByReference,
    findAllMachines,
    findMachineById,
    updateMachineById,
    deleteMachineById
};