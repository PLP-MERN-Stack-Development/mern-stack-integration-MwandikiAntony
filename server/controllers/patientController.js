import Patient from "../models/Patient.js";

export const getPatients = async (req, res) => {
  const patients = await Patient.find({ user: req.user._id });
  res.json(patients);
};

export const addPatient = async (req, res) => {
  const patient = await Patient.create({ ...req.body, user: req.user._id });
  res.json(patient);
};

export const updatePatient = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(patient);
};

export const deletePatient = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
