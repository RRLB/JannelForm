import './App.css';
import React, { useState, useEffect } from 'react';
// import ReactPDF from '@react-pdf/renderer';
// import CreatePDF from './CreatePDF';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';


const FormClient = () => {
  // Define state variables for each form field
  const [formData, setFormData] = useState({
    // client: 'client',
    nom: '',
    prenom: '',
    date_naissance: '',
    adresse: '',
    code_postal: '',
    ville: '',
    telephone: '',
    email: '',
    profession: '',
    observations: '',
    compagnie: '', // Default company value
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
  const setInitialInputValues = (queryParameters) => {
    
    setFormData({
      nom: queryParameters.get('custom_t1') || '',
      prenom: queryParameters.get('custom_t4') || '',
      date_naissance: queryParameters.get('custom_d3') || '',
      adresse: queryParameters.get('custom_t2') || '',
      code_postal: queryParameters.get('custom_t3') || '',
      ville: queryParameters.get('custom_t6') || '',
      telephone: queryParameters.get('custom_t7') || '',
      email: queryParameters.get('custom_t8') || '',
      profession: queryParameters.get('custom_t9') || '',
      observations: queryParameters.get('custom_t10') || '',
      compagnie: [queryParameters.get('custom_n7')?.toLowerCase()] || '',//optional chaining if not null
      type_contrat: (queryParameters.get('custom_n6')?.split(',') || []) 
      .filter((value) => value.trim() !== '')
      .map((value) => value.toLowerCase()) || '',
      numero_contrat: queryParameters.get('custom_t5') || ''
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
    const selectedOptions = [...e.target.options]
      .filter(o => o.selected)
      .map(o => o.value);//filters elements that are == selected // map creates new array based on the selected options
   
    //updates formData => contains array of the selected options
    setFormData({ ...formData, [name]: selectedOptions }); 
  };
  // Handle submit change
  const handleSubmit = async () => {
  axios.post("https://armoires.zeendoc.com/jannel/_ClientSpecific/41543/index.php", 
  formData, { crossdomain: true, headers: {'Form': 'Client', 'ResId': ResId } })
    .then(res=>{
      console.log(res);
      console.log(res.data);
  })
  };

  //Navigate to homepage
const navigate = useNavigate();
const handleOnClickClose = async () => {
  const handleForm = await handleSubmit()
  //redirect to homepage
  navigate('/');
}
      
return (

  <div className="FormWrapper">
    <div>
      
    </div>
    <div className="Form form-group">
        <h1>Formulaire fiche client particulier</h1>

      <div className="FormClient" method="POST">
        <h2>Informations générales</h2>

        <div className="row">

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Nom</label>
            <input
            className="form-control" placeholder="nom" id="inputDefault"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Prénom</label>
            <input
              className="form-control" placeholder="prénom" id="inputDefault"
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Date de naissance</label>
            <input
              className="form-control" placeholder="date de naissance" id="inputDefault"
              type="text"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Adresse</label>
            <input
              className="form-control" placeholder="adresse" id="inputDefault"
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Code postal</label>
            <input
              className="form-control" placeholder="code postal" id="inputDefault"
              type="text"
              name="code_postal"
              value={formData.code_postal}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Ville</label>
            <input
              className="form-control" placeholder="ville" id="inputDefault"
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Téléphone</label>
            <input
              className="form-control" placeholder="téléphone" id="inputDefault"
              type="number"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Email</label>
            <input
              className="form-control" placeholder="email" id="inputDefault"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Profession</label>
            <input
              className="form-control" placeholder="profession" id="inputDefault"
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-sm-12 ">
            <label className="col-form-label" >Observations</label>
            <textarea
              placeholder="texte..."
              rows="6"
              colls="8"
              className="form-control" 
              id="exampleTextarea"
              type="text"
              name="observations"
              value={formData.observations}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <h2 >Contrats</h2>
          <div className="form-group col-sm-12 col-md-6">
            <label className="col-form-label">Sélectionner une compagnie</label>
            <select
              name="compagnie"
              value={formData.compagnie}
              onChange={handleSelectChangeOne}
              multiple="" 
              className="form-select" 
              id="exampleSelect2"
            >
              <option value=""></option>
              <option value="axa">AXA</option>
              <option value="sampo">SAMPO</option>
            </select>
            <label className="col-form-label">Numéro de contrat</label>
            <input
              className="form-control" placeholder="numéro de contrat" id="inputDefault"
              type="text"
              name="numero_contrat"
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
              className="form-select" 
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

          <div className="form-group col-sm-12 col-md-6 ">
            
          </div>
        </div>
        <div className="btn-group ">
          <div >
            <Link role="button" to={ `/` } >
              <button type="button" className="back btn btn-secondary" >Retour</button>
            </Link>
          </div>

          <div >
            <button onClick={() => handleOnClickClose()} className=" btn btn-primary " type="submit">Validé</button>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  );
}

export default FormClient;

