import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(info);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.getAllSpecialty();
    return res.status(200).json(infor);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever",
    });
  }
};

let getDetailSpecialtyById = async (req, res) => {
  try {
    let info = await specialtyService.getDetailSpecialtyById(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(info);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever",
    });
  }
};
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
};
