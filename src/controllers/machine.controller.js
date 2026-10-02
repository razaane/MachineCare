const machineService = require("../services/machine.service");

const createMachine = async (req, res) => {
    try {
        const machine = await machineService.createMachine(req.body);
        res.status(201).json({
            message: "machine created successfully",
            machine
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllMachines = async (req, res) => {
    try {
        const machines = await machineService.getAllMachines(req.query);
        res.status(200).json(machines);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMachineById = async (req, res) => {
    try {
        const machine = await machineService.getMachineById(req.params.id);
        res.status(200).json(machine);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateMachine = async (req, res) => {
    try {
        const machine = await machineService.updateMachine(req.params.id, req.body);
        res.status(200).json({
            message: "machine updated successfully",
            machine
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMachine = async (req, res) => {
    try {
        await machineService.deleteMachine(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine
};