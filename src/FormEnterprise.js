
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const FormEnterprise = ({ onFormSubmissionSuccess }) => {
  //define state variables for each form field
  const [formData, setFormData] = useState({
    // enterprise: 'enterprise',
    nom_societe: '',
    nom_gerant: '',
    adresse: '',
    email: '',
    telephone: '',
    numero_siret: '',
    compagnie: '',
    numero_contrat: '',
    type_contrat: [],
    
  });

  // Log all query parameters
  //These are both the same
  //This uses React hook which has the below function built in. it returns an object of params
  //get values by accessing the objkect values => const custom_t1 = queryParameters.custom_t1;
  // const queryParameters = useParams()
  // console.log(queryParameters); //return null
  //This is the JS function //run with this code in useEffect hook: queryParameters.forEach((value, key) => {console.log(`${key}: ${value}`);
  //Then return : let custom_t1 = queryParameters.get('custom_t1');
  const queryParameters = new URLSearchParams(window.location.search);
  console.log(queryParameters); //returns values
  
  let ResId = queryParameters.get('resId');
  console.log(ResId);
  //Set initial input values from params
  const setInitialInputValues = (queryParams) => {
    
    setFormData({
      nom_societe: queryParams.get('nom_societe') || '',
      nom_gerant: queryParams.get('nom_gerant') || '',
      adresse: queryParams.get('custom_t2') || '',
      email: queryParams.get('custom_t8') || '',
      telephone: queryParams.get('custom_t7') || '',
      numero_siret: queryParams.get('numero_siret') || '',
      compagnie: [queryParameters.get('custom_n7')?.toLowerCase()] || '',//optional chaining if not null
      type_contrat: (queryParameters.get('custom_n6')?.split(',') || []) //if null sets to empty array
      .filter((value) => value.trim() !== '')
      .map((value) => value.toLowerCase()) || '',
      numero_contrat: queryParams.get('custom_t5') || ''
    });
  };

  // useEffect to call setInitialInputValues on component mount and when searchParams changes
  useEffect(() => {
    setInitialInputValues(queryParameters);
    queryParameters.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }, []);
  console.log(formData);
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle select change for company
  const handleSelectChangeOne = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle select change for multiple selec
  const handleSelectChangeMultiple = (e) => {
    const { name, value } = e.target;
    //creates a new array selectedOptions -> contains the selected values from the dropdown
    const selectedOptions = [...e.target.options].filter(o => o.selected).map(o => o.value);
    //filters elements that are == selected // map creates new array based on the selected options

    //updates formData => contains array of the selected options
    setFormData({ ...formData, [name]: selectedOptions }); 
  };
  
  // Handle submit change
  const handleSubmit = async () => {
    
      axios.post("https://armoires.zeendoc.com/jannel/_ClientSpecific/41543/index.php", formData, { crossdomain: true, headers: {'Form': 'Entreprise', 'ResId': ResId} })
      .then(res=>{
        console.log(res);
        console.log(res.data);
        //send response to editForm.js
      if (onFormSubmissionSuccess) {
        onFormSubmissionSuccess();
      }
        // window.location = "/" ;//This line of code will redirect you once the submission is succeessful
    })
      // onFormSubmit(formData);
    };

    const navigate = useNavigate();

    const handleOnClickClose = async () => {
      const handleForm = await handleSubmit()
      // console.log(handleForm);
      //redirect to homepage
      navigate('/');
      // window.close(); //not working as can only close window that was opened by the script
      //Redirect to armoire Jannel
      // window.location.replace('https://armoires.zeendoc.com/jannel/Ihm/index.php?Coll_Id=coll_1');
    }

  return (
    <div className="Form form-group"> 
        <h1>Formulaire fiche entreprise</h1>
      
      <div className="FormEnterprise" >

        <div className="row">

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Nom société</label> 
              <input 
                className="form-control" placeholder="nom société" id="inputDefault"
                type='text' 
                name='nom_societe'
                value={formData.nom_societe} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Nom du gérant</label> 
              <input 
                className="form-control" placeholder="nom du gérant" id="inputDefault"
                type='text' 
                name='nom_gerant'
                value={formData.nom_gerant} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Adresse</label> 
              <input 
                className="form-control" placeholder="adresse" id="inputDefault"
                type='text' 
                name='adresse'
                value={formData.adresse} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Email</label>  
              <input 
              className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email"
                type='email' 
                name='email'
                value={formData.email} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Téléphone</label> 
              <input 
                className="form-control" placeholder="téléphone" id="inputDefault"
                type='number' 
                name='telephone'
                value={formData.telephone} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Numéro de siret</label> 
              <input 
                className="form-control" placeholder="numéro de siret" id="inputDefault"
                type='text' 
                name='numero_siret'
                value={formData.numero_siret} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6">
            <label className="col-form-label">Sélectionner une compagnie</label>
            <select
              name="compagnie"
              value={formData.compagnie}
              onChange={handleSelectChangeOne}
              
              className="form-select" 
              id="exampleSelect1"
            >
              <option value=""></option>
              <option value="axa">AXA</option>
              <option value="sampo">SAMPO</option>
            </select>
            <label className="col-form-label">Numéro de contrat</label> 
              <input 
                className="form-control" placeholder="numéro de contrat" id="inputDefault"
                type='text' 
                name='numero_contrat'
                value={formData.numero_contrat} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6">
            <label className="col-form-label">Sélectionner multiple avec Ctrl</label>
            <select 
              name="type_contrat"
              type="select-multiple"
              value={formData.type_contrat}
              onChange={handleSelectChangeMultiple}
              multiple={true}  
              id="exampleSelect2"
            >
              
              <option value="mrh">MRH</option>
              <option value="mri">MRI</option>
              <option value="rc">RC</option>
              <option value="auto">Auto</option>
              <option value="gav">GAV</option>
              <option value="sante">Santé</option>
              <option value="pj">PJ</option>
              <option value="chasse">Chasse</option>
              <option value="vie">Vie</option>
              <option value="retraite">Retraite</option>
              <option value="scolaire">Scolaire</option>
            </select>
          </div>


                
        </div>

        <div className="btn-group ">
        <div >
          <Link role="button" to={ `/` } >
            <button  className="back btn btn-secondary" >Retour</button>
          </Link>
        </div>

        <div >
          <button onClick={() => handleOnClickClose()} className=" btn btn-primary " type="submit">Validé</button>
        </div>
      </div>

    </div>
   
  </div>
  
  
  );
}

export default FormEnterprise;
