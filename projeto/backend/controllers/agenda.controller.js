import AgendaModel from "../models/agenda.model.js";

export const listarConsultas =
async (req, res) => {

  try {

    const consultas =
      await AgendaModel.listarConsultas();

    res.json(consultas);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      erro: error.message
    });

  }

};