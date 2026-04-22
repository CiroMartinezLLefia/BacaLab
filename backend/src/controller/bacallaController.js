const bacallas = [
  {
    id: "1",
    nom: "Bacallà amb panses i piProjecte",
    origen: "Empordà",
    tipus: "salat",
    descripcio:
      "Prova de desplegament en producció. Recepta tradicional de quaresma amb salsa de tomàquet, panses, pinyons i un toc de vi blanc.",
  },
  {
    id: "2",
    nom: "Bacallà sense res",
    origen: "Empordà",
    tipus: "salat",
    descripcio:
      "Prova de desplegament en producció. Recepta tradicional de quaresma amb salsa de tomàquet, panses, pinyons i un toc de vi blanc.",
  },
];

function getAllBacalla(req, res) {
  res.json({
    dades: bacallas,
    total: bacallas.length,
  });
}

function getBacallaById(req, res) {
  const { id } = req.params;
  const bacalla = bacallas.findIndex((c) => c.id === id);
  if (bacalla === -1) {
    res.status(404).json({ error: "Bacalla no encontrado", id });
  }

  res.json(bacallas[bacalla]);
}

function createBacalla(req, res) {
  const { nom, origen, tipus, descripcio } = req.body;
  const id = String(bacallas.length + 1);
  const nova = { id, nom, origen, tipus, descripcio };
  bacallas.push(nova);
  res.status(201).json(nova);
}

function editBacalla(req, res) {
  const { id } = req.params;
  const index = bacallas.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Bacalla no encontrado", index });
  }
  bacallas[index] = { ...bacallas[index], ...req.body, id };
  res.json(bacallas[index]);
}

function deleteBacalla(req, res) {
  const { id } = req.params;
  const index = bacallas.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Bacalla no trobat", id });
  }
  bacallas.splice(index, 1);
  res.status(204).send();
}

export {
  getAllBacalla,
  getBacallaById,
  createBacalla,
  editBacalla,
  deleteBacalla,
};