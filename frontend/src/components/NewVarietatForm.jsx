"use client";

import { useState } from "react";
import Link from "next/link";
import { createVarietat } from "@/services/bacallaService";

const initialForm = {
  nom: "",
  origen: "",
  tipus: "",
  descripcio: "",
};

export default function NewVarietatForm() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({
    type: "idle",
    message: "",
    createdId: "",
  });

  function onChange(event) {
    const { name, value } = event.target;

    // Guardem l'estat local per mantenir el formulari 100% interactiu al navegador.
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Enviant dades...", createdId: "" });

    try {
      const created = await createVarietat(formData);

      setStatus({
        type: "success",
        message: `Varietat creada correctament: ${created.nom}`,
        createdId: created.id,
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message,
        createdId: "",
      });
    }
  }

  return (
    <section className="form-panel">
      <form className="form-grid" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="nom">Nom</label>
          <input
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={onChange}
            placeholder="Ex: Bacalla d'Islàndia"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="origen">Origen o regio</label>
          <input
            id="origen"
            name="origen"
            value={formData.origen}
            onChange={onChange}
            placeholder="Ex: Atlantica nord"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="tipus">Tipus de presentacio</label>
          <input
            id="tipus"
            name="tipus"
            value={formData.tipus}
            onChange={onChange}
            placeholder="Ex: salat, esqueixat, fresc"
            required
          />
        </div>

        <div className="field field--full">
          <label htmlFor="descripcio">Descripcio curta</label>
          <textarea
            id="descripcio"
            name="descripcio"
            value={formData.descripcio}
            onChange={onChange}
            rows={4}
            placeholder="Una o dues frases sobre el producte."
            required
          />
        </div>

        <div className="action-row">
          <button type="submit" className="submit-btn" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Enviant..." : "Crear varietat"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => {
              setFormData(initialForm);
              setStatus({ type: "idle", message: "", createdId: "" });
            }}
          >
            Netejar
          </button>
        </div>
      </form>

      {status.type !== "idle" && (
        <div className={`feedback feedback--${status.type}`} role="status">
          <p>{status.message}</p>
          {status.type === "success" && status.createdId && (
            <Link href={`/varietats/${status.createdId}`}>Veure fitxa creada</Link>
          )}
        </div>
      )}
    </section>
  );
}