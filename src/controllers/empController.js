const Emp = require('../models/empModel');


// for only single record insert

// exports.addEmp = async (req, res) => {   
//     const newEmp = new Emp(req.body);
//     const ressult = await newEmp.save();
//     res.status(201).json({ message: "New user added..." }, ressult);
// };

// for both single and multiple records insert

exports.addEmp = async (req, res) => {
    try {
        let result;
        if (Array.isArray(req.body)) {
            result = await Emp.insertMany(req.body);
        }
        else {
            const newEmp = new Emp(req.body);
            result = await newEmp.save();
        }
        res.status(201).json({ message: "New user added..." }, result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.showEmp = async (req, res) => {
    try {
        const emps = await Emp.find();
        if (emps != null) {
            res.status(200).json(emps);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }

};

exports.deleteEmp = async (req, res) => {
    try {
        const result = await Emp.findByIdAndDelete(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "emp not deleted" })
    }
}

exports.updateEmp = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, salary } = req.body;
        if (!name || !salary) {
            res.status(400).json({ message: "all fields are required" });
            return;
        }
        const updatedEmp = await Emp.findByIdAndUpdate(id, { name, salary }, { new: true, runValidators: true });
        if (!updatedEmp) {
            res.status(404).json({ message: "Emp not found" });
            return;
        }
        res.status(200).json({ message: "emp updated successfully", updatedEmp });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}