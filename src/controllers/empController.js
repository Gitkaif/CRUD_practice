const Emp = require('../models/empModel');

exports.addEmp = async (req, res) => {
    const newEmp = new Emp(req.body);
    const ressult = await newEmp.save();
    res.status(201).json({ message: "New user added..." }, ressult);
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
        const result = await Emp.findByIdAndDelete(req.params._id);
        res.status(200).json(result);
    } catch (error) {
        // console.log(error);
        res.status(500).json({message:"emp not deleted"})
    }
}
