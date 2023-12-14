import React, { useState, useEffect } from 'react';

const OptionSelect = () => {
 const [selected, setSelected] = useState([]);

 const handleChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter(option => option !== value));
    }
 };

 useEffect(() => {
    console.log(selected);
 }, [selected]);

 const [formData, setFormData] = useState({
    // enterprise: 'enterprise',
    nom_societe: '',
    nom_gerant: '',
    adresse: '',
    email: '',
    telephone: '',
    numero_siret: '',
    compagnie: '',
    type_contrat: [],
    numero_contrat: '',
  });
  // Handle select change for company
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const selectedOptions = [...e.target.options].filter(o => o.selected).map(o => o.value);
    setFormData({ ...formData, [name]: selectedOptions });
    // setFormData({ ...formData, [name]: value });
  };
 return (
    <div className="form-group col-sm-12 col-md-6">
            <label className="col-form-label">Sélectionner type de contrat</label>
            <select 
              name="type_contrat"
              type="select-multiple"
              value={formData.type_contrat}
              onChange={handleSelectChange}
              multiple={true} 
              className="form-select" 
              id="exampleSelect2"
            >
              <option value=""></option>
              <option value="mrh">MRH</option>
              <option value="mri">MRI</option>
              <option value="rc">RC</option>
              <option value="auto">Auto</option>
              <option value="gav">GAV</option>
              <option value="sante">Santé</option>
              <option value="pj">PJ</option>
              <option value="classe">Classe</option>
              <option value="vie">Vie</option>
              <option value="retraite">Retraite</option>
              <option value="scolaire">Scolaire</option>
            </select>
          </div>
 );
};

export default OptionSelect;