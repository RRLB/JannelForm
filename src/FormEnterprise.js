import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from './components/enterprise/TextInput';
import TextArea from './components/enterprise/TextArea';
import ContractLineInput from './components/enterprise/ContractLineInput';
import ContractLinesTable from './components/enterprise/ContractLinesTable';
import DropdownMenu from './components/DropdownMenu';  // Import component
import { isValidPhoneNumber } from 'react-phone-number-input';
import EmailInput from './components/enterprise/EmailInput'; //

const FormEnterprise = ({ onFormSubmissionSuccess }) => {
  //define state variables for each form field
  const [formData, setFormData] = useState({
    // enterprise: 'enterprise',
    nom_societe: '',
    nom_gerant: '',
    adresse: '',
    code_postal: '',
    ville: '',
    forme_juridique: '',
    email: '',
    telephone: '',
    numero_siret: '',
    observations: '',
    textareaHeight: 'auto',
    formLines: [],
    
  });
  
  const [formLines, setFormLines] = useState([]);
  const [newLine, setNewLine] = useState({
    compagnie: '',
    numero_contrat: '',
    type_contrat: '',
  });
  const [formErrors, setFormErrors] = useState({
    nom_societe: false,
    email: false,
    telephone: false
  });

  const [isValidEmail, setIsValidEmail] = useState(true); // State for email format validation
 
  const navigate = useNavigate();

  // Log all query parameters
  //These are both the same
  //This uses React hook which has the below function built in. it returns an object of params
  //get values by accessing the objkect values => const custom_t1 = queryParameters.custom_t1;
  // const queryParameters = useParams()
  // console.log(queryParameters); //return null
  //This is the JS function //run with this code in useEffect hook: queryParameters.forEach((value, key) => {console.log(`${key}: ${value}`);
  //Then return : let custom_t1 = queryParameters.get('custom_t1');

  const queryParameters = new URLSearchParams(window.location.search);
  let ResId = queryParameters.get('resId');
  
  //Set initial input values from params
  const setInitialInputValues = (queryParameters) => {
      // Extracting lines from pdf = comma-separated strings and converting them to uppercase
    setFormData((prevData) => ({
      ...prevData,
      nom_societe: queryParameters.get('nom_societe') || '',
      nom_gerant: queryParameters.get('nom_gerant') || '',
      adresse: queryParameters.get('custom_t2') || '',
      code_postal: queryParameters.get('custom_t3') || '',
      ville: queryParameters.get('custom_t6') || '',
      forme_juridique: queryParameters.get('forme_juridique') || '',
      email: queryParameters.get('custom_t8') || '',
      telephone: queryParameters.get('custom_t7') || '',
      numero_siret: queryParameters.get('numero_siret') || '',
      observations: queryParameters.get('custom_t10') || '',
      formLines: [
        // form lines cannot be passed in as parameters as compagnie and type contract are liste deroulante with fixed values
        // so if there are 3 lines : Sampo/Sampo/Axa the params will be : Sampo/Axa
        // {
        //   compagnie: compagnie,
        //   numero_contrat: numeroContrat,
        //   type_contrat: typeContrat,
        // }
      ],
    }));
  };

  // useEffect to call setInitialInputValues on component mount and when searchParams changes
  useEffect(() => {
    setInitialInputValues(queryParameters,);
    queryParameters.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }, []);

  // // Handle input change
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });

  //   // Real-time validation
  //   validateField(name, value);
  // };
   // Function to validate email format
   const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Adresse e-mail est requise';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Adresse e-mail invalide';
    }
    return '';
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === 'email') {
      validateEmail(value); // Validate email format on email input change
    }
    validateField(name, value);
  };
 
  const validateField = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case 'nom_societe':
        errors.nom_societe = !value.trim() ? 'Nom de société est requis' : '';
        break;
      case 'email':
        errors.email = validateEmail(value);
        break;
      case 'telephone':
        errors.telephone = !isValidPhoneNumber(value) ? 'Numéro de téléphone invalide' : '';
        break;
      // case 'date_naissance':
      //    errors.date_naissance = !/^\d{2}\/\d{2}\/\d{4}$/.test(value) ? 'Date invalide. Utilisez le format JJ/MM/AAAA.' : '';
      //   break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const handleAddLine = () => {
    // Create a new line using the current state of newLine
    const lineToAdd = {
      compagnie: newLine.compagnie,
      numero_contrat: newLine.numero_contrat,
      type_contrat: newLine.type_contrat,
    };

    // Update formLines in formData using the callback function
    setFormData((prevData) => {
      const updatedFormLines = [...prevData.formLines, lineToAdd];
      // console.log(updatedFormLines); // Log the updated formLines
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
    // console.log(formLines);
  }, [formLines]); // Add formLines as a dependency to useEffect

  // Handle submit change
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    // Validate all fields before submission
    const fields = ['nom_societe', 'email', 'telephone'];
    let errors = { ...formErrors };

    fields.forEach(field => {
      validateField(field, formData[field]);
    });

    setFormErrors(errors);
    console.log(errors);
    
    const { nom_societe, email, telephone } = formData; // Destructure nom and email from formData
    if(!nom_societe || !email || !telephone ){
      setFormErrors({
        nom_societe: !nom_societe ? "Nom de société est requis" : "",
        // email: !email ? "Adresse e-mail est requis" : "",

        telephone: !telephone ? 'Numéro de téléphone est requis' : '',
      });
    } else {
      setFormErrors({
        nom_societe: !nom_societe,
        // email: !email,
        telephone: !telephone
      })
      axios
        .post(
          "https://armoires.zeendoc.com/jannel/_ClientSpecific/41543/index.php", 
          formData, 
          { crossdomain: true, headers: {'Form': 'Entreprise', 'ResId': ResId} }
        )
        .then(res => {
          if (onFormSubmissionSuccess) {
            onFormSubmissionSuccess();
          }
          navigate('/');
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la soumission du formulaire !", error);
      });
    }
  };

  const handleOnClickClose = async (event) => {
    const handleForm = await handleSubmit(event)
  }

  return (
    <div className="Form form-group"> 
        <h1>Formulaire fiche entreprise</h1>
      
      <div className="FormEnterprise" >
        <div className="row">

          <TextInput 
            label="Nom société"
            name='nom_societe'
            value={formData.nom_societe} 
            onChange={handleInputChange}
            required={true}
            error={formErrors.nom_societe} 
          />

          <TextInput 
            label="Nom du gérant"
            name='nom_gerant'
            value={formData.nom_gerant} 
            onChange={handleInputChange}
          />
        
          <TextInput 
            label="Adresse" 
            name='adresse'
            value={formData.adresse} 
            onChange={handleInputChange}
          />
          
          <TextInput
            label="Code postal"
            name="code_postal"
            value={formData.code_postal}
            onChange={handleInputChange}
          />
          
          <TextInput
            label="Ville"
            name="ville"
            value={formData.ville}
            onChange={handleInputChange}
          />
          
          <TextInput 
            label="Forme Juridique" 
            name='forme_juridique'
            value={formData.forme_juridique} 
            onChange={handleInputChange}
          />

          <EmailInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required={true}
            error={formErrors.email}
          />

          <TextInput
            label="Téléphone"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            required={true}
            error={formErrors.telephone }
          />
          <TextInput
            label="Numéro Siret"
            name="numero_siret"
            value={formData.numero_siret}
            onChange={handleInputChange}
          />
        

        <TextArea
          label="Observations"
          name="observations"
          value={formData.observations}
          onChange={handleInputChange}
          height={formData.textareaHeight}
        />

        <h2 className="contract" style={{ marginTop : 40, marginBottom : 0, paddingTop : 10 }} >Contrats</h2>
          
        <DropdownMenu newLine={newLine} setNewLine={setNewLine} setFormLines={setFormLines} formType="enterprise"/>

        <ContractLineInput
          newLine={newLine}
          setNewLine={setNewLine}
          handleAddLine={handleAddLine}
        />
        
        <ContractLinesTable formLines={formLines} />

        </div>

        <div className="btn-group ">
          <div >
            <Link role="button" to={ `/` } >
              <button  className="back btn btn-secondary" >Retour</button>
            </Link>
          </div>

          <div >
            <button onClick={(event) => handleOnClickClose(event)} className=" btn btn-primary " type="submit">Valider</button>
          </div>
        </div>
      </div>
    </div>
  
  
  );
}

export default FormEnterprise;
