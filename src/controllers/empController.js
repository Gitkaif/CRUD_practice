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
        const { id } = req.params; //destructuring -> direct access to id
        const { name, salary } = req.body; //fields we want to update

        if (!name || !salary) { //input validations
            res.status(400).json({ message: "all fields are required" });
            return; //stops function execution to prevent multiple ressponses
        }
        
        const updatedEmp = await Emp.findByIdAndUpdate(
            id,
            { name, salary }, //new data
            { new: true, runValidators: true }
            // new:true -> returns the updated document instead of the old one
            // runValidators:true -> enforces schema validation rules during update
        );

        if (!updatedEmp) { //if id not exits in db return null
            res.status(404).json({ message: "Emp not found" });
            return;
        }
        res.status(200).json({ message: "emp updated successfully", updatedEmp });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}