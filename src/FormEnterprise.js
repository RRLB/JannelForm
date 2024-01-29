import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DropdownMenu from './components/DropdownMenu';  // Import component

const FormEnterprise = ({ onFormSubmissionSuccess }) => {
  //define state variables for each form field
  const [formData, setFormData] = useState({
    // enterprise: 'enterprise',
    nom_societe: '',
    nom_gerant: '',
    adresse: '',
    forme_juridique: '',
    email: '',
    telephone: '',
    numero_siret: '',
    formLines: [],
    
  });
  const [formLines, setFormLines] = useState([]);
  const [newLine, setNewLine] = useState({
    compagnie: '',
    numero_contrat: '',
    type_contrat: '',
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

  //  

  console.log(queryParameters); //returns values
  
  let ResId = queryParameters.get('resId');
  // console.log(ResId);
  
  //Set initial input values from params
  const setInitialInputValues = (queryParameters) => {
      
      // Extracting lines from pdf = comma-separated strings and converting them to uppercase
      // const compagnie = (queryParameters.get('custom_n7') || '').toLowerCase().split(',');
      // const numeroContrat = (queryParameters.get('custom_t5') || '').toLowerCase().split(',');
      // const typeContrat = (queryParameters.get('custom_n6') || '').toLowerCase().split(',');
      // console.log(compagnie);
      // console.log(numeroContrat);
      // console.log(compagnie);

    setFormData((prevData) => ({
      ...prevData,
      nom_societe: queryParameters.get('nom_societe') || '',
      nom_gerant: queryParameters.get('nom_gerant') || '',
      adresse: queryParameters.get('custom_t2') || '',
      forme_juridique: queryParameters.get('form_juridique') || '',
      email: queryParameters.get('custom_t8') || '',
      telephone: queryParameters.get('custom_t7') || '',
      numero_siret: queryParameters.get('numero_siret') || '',
      formLines: [
        // {
        //   compagnie: compagnie,
        //   numero_contrat: numeroContrat,
        //   type_contrat: typeContrat,
        // }
      ],
    }));
    // Set the state
    // setFormLines([  // Update with an array
    //   {
    //     compagnie: compagnie,
    //     numero_contrat: numeroContrat,
    //     type_contrat: typeContrat,
    //   }
    // ]);
  };

  // useEffect to call setInitialInputValues on component mount and when searchParams changes
  useEffect(() => {
    setInitialInputValues(queryParameters,);
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


const handleAddLine = () => {
  console.log('Current newLine state:', newLine);
  // Create a new line using the current state of newLine
  const lineToAdd = {
    compagnie: newLine.compagnie,
    numero_contrat: newLine.numero_contrat,
    type_contrat: newLine.type_contrat,
  };
  console.log(lineToAdd);
  // Update formLines in formData using the callback function
  setFormData((prevData) => {
    const updatedFormLines = [...prevData.formLines, lineToAdd];
    console.log(updatedFormLines); // Log the updated formLines
    return {
      ...prevData,
      formLines: updatedFormLines,
    };
  });
  // Use setFormLines to update the formLines state
  setFormLines((prevLines) => [...prevLines, lineToAdd]);

  // Clear the newLine state for the next line
  setNewLine({
    compagnie: '',
    numero_contrat: '',
    type_contrat: '',
  });
};

useEffect(() => {
  // Log the formLines state after it has been updated
  console.log(formLines);
}, [formLines]); // Add formLines as a dependency to useEffect
 console.log(formData);
  // Handle submit change
  const handleSubmit = async () => {
      // console.log(formData);
      axios.post("https://armoires.zeendoc.com/jannel/_ClientSpecific/41543/index.php", 
      formData, { crossdomain: true, headers: {'Form': 'Entreprise', 'ResId': ResId} })
      .then(res=>{
        console.log(res);
        console.log(res.data);
        //send response to editForm.js
        if (onFormSubmissionSuccess) {
          onFormSubmissionSuccess();
        }
        // window.location = "/" ;//This line of code will redirect you once the submission is succeessful
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
    <div className="Form form-group"> 
        <h1>Formulaire fiche entreprise</h1>
      
      <div className="FormEnterprise" >

        <div className="row">

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Nom société</label> 
              <input 
                className="mainInfo form-control" placeholder="nom société" id="inputDefault"
                type='text' 
                name='nom_societe'
                value={formData.nom_societe} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Nom du gérant</label> 
              <input 
                className="mainInfo form-control" placeholder="nom du gérant" id="inputDefault"
                type='text' 
                name='nom_gerant'
                value={formData.nom_gerant} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Adresse</label> 
              <input 
                className="mainInfo form-control" placeholder="adresse" id="inputDefault"
                type='text' 
                name='adresse'
                value={formData.adresse} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Forme Juridique</label> 
              <input 
                className="mainInfo form-control" placeholder="forme juridique" id="inputDefault"
                type='text' 
                name='forme_juridique'
                value={formData.form_juridique} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Email</label>  
              <input 
              className="mainInfo form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email"
                type='email' 
                name='email'
                value={formData.email} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Téléphone</label> 
              <input 
                className="mainInfo form-control" placeholder="téléphone" id="inputDefault"
                type='number' 
                name='telephone'
                value={formData.telephone} 
                onChange={handleInputChange}
              />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-4">
            <label className="col-form-label">Numéro de siret</label> 
              <input 
                className="mainInfo form-control" placeholder="numéro de siret" id="inputDefault"
                type='text' 
                name='numero_siret'
                value={formData.numero_siret} 
                onChange={handleInputChange}
              />
          </div>

          <h2 className="contract" style={{ marginTop : 40, marginBottom : 0, paddingTop : 10 }} >Contrats</h2>
          
          <DropdownMenu newLine={newLine} setNewLine={setNewLine} setFormLines={setFormLines} formType="enterprise"/>


          <div className='contract addNew'>
            <button onClick={handleAddLine} className="btn btn-light" type="submit">Rajouté</button>
          </div>

          <div className='formLines'>
          
            {formLines.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Compagnie</th>
                    <th scope="col">Numéro de contrat</th>
                    <th scope="col">Type de contrat</th>
                  </tr>
                </thead>
                <tbody>
                  {formLines.map((line, index) => (
                    <tr key={index}>
                      <td>{Array.isArray(line.compagnie) ? line.compagnie.join(', ').toUpperCase() : line.compagnie.toUpperCase()}</td>
                      <td>{Array.isArray(line.numero_contrat) ? line.numero_contrat.join(', ').toUpperCase() : line.numero_contrat.toUpperCase()}</td>
                      <td>{Array.isArray(line.type_contrat) ? line.type_contrat.join(', ').toUpperCase() : line.type_contrat.toUpperCase()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>

        <div className="btn-group ">
        <div >
          <Link role="button" to={ `/` } >
            <button  className="back btn btn-secondary" >Retour</button>
          </Link>
        </div>

        <div >
          <button onClick={() => handleOnClickClose()} className=" btn btn-primary " type="submit">Valider</button>
        </div>
      </div>

    </div>
   
  </div>
  
  
  );
}

export default FormEnterprise;
