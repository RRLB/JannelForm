import "./App.css";
import React, { useState, useEffect, useRef } from "react";
// import ReactPDF from '@react-pdf/renderer';
// import CreatePDF from './CreatePDF';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from "./components/DropdownMenu"; // Import component
import TextInput from "./components/client/TextInput";
import TextArea from "./components/client/TextArea";
import { isValidPhoneNumber } from "react-phone-number-input";
import EmailInput from "./components/client/EmailInput";
import DOBInput from "./components/client/DOBInput";
import ContractLineInput from "./components/client/ContractLineInput";
import ContractLinesTable from "./components/client/ContractLinesTable";
import { parse, format } from "date-fns";

const FormClient = ({ onFormSubmissionSuccess }) => {
  // Define state variables for each form field
  const [formData, setFormData] = useState({
    // client: 'client',
    nom: "",
    prenom: "",
    date_naissance: "",
    adresse: "",
    code_postal: "",
    ville: "",
    telephone: "",
    email: "",
    profession: "",
    observations: "",
    textareaHeight: "auto",
    formLines: [],
  });

  // const [formLines, setFormLines] = useState([]);
  const [newLine, setNewLine] = useState({
    compagnie: "",
    numero_contrat: "",
    type_contrat: "",
  });
  const [formErrors, setFormErrors] = useState({
    nom: false,
    prenom: false,
    date_naissance: false,
    telephone: false,
    email: false,
  });

  // Ensure the correct date format here (MM/dd/yyyy or dd/MM/yyyy)
  const parseDate = (dateString) => {
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
    return format(parsedDate, "dd/MM/yyyy"); // Adjust format as needed
  };

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
  let ResId = queryParameters.get("resId");
  const dateString = queryParameters.get("custom_d3") || "";
  const parsedDate = dateString ? parseDate(dateString) : "";

  // Get the contractLines parameter from the query parameters
  let encodecontractLines = queryParameters.get("contractLines") || "";
  console.log(encodecontractLines);

  // Initialize contractLines with a default empty object if parsing fails
  let contractLines = {};
  let docDbId = "";
  if (encodecontractLines) {
    try {
      contractLines = JSON.parse(decodeURIComponent(encodecontractLines));
      docDbId = JSON.parse(contractLines.id_increment) || "";
      console.log(docDbId);
    } catch (error) {
      console.error("Failed to parse contractLines:", error);
    }

  }

  console.log("Parsed contractLines:", contractLines);

  // reset values in arrays
  function resetLinesIntoArrays(lineData) {
    let lineObject = {
      compagnie: [],
      numero_contrat: [],
      type_contrat: [],
    };
    console.log("LINE DATA", lineData);
    // Process each property in lineData
    for (const key in lineData) {
      // console.log("KEY", key);

      if (lineData.hasOwnProperty(key)) {
        let nestedArray = [];
        let parsedArray = JSON.parse(lineData[key]);
        
        for (let i = 0; i < parsedArray.length; i++) {
          if (!Array.isArray(parsedArray[i]) && key != "numero_contrat") {
            nestedArray.push([parsedArray[i]]);
          } else {
            nestedArray.push(parsedArray[i]);
          }
        }
        lineObject[key] = nestedArray;
      }
    }
    return lineObject;
  }

  let formLinesArray = [];
  if(contractLines.compagnie || contractLines.numero_contrat || contractLines.type_contrat){
    // contractLines.compagnie = JSON.parse(contractLines.compagnie);
    let nestedContractLines = resetLinesIntoArrays(contractLines);
    console.log("Nested Contract Lines:", nestedContractLines);

    // Map over the transformed data to create formLinesArray
    formLinesArray = nestedContractLines.compagnie.map(
      (compagnieArray, index) => ({
        compagnie: compagnieArray[0], // Each compagnie is nested in its own array
        numero_contrat: nestedContractLines.numero_contrat[index], // This one doesn't need nesting
        type_contrat: nestedContractLines.type_contrat[index][0], // Each type_contrat is nested in its own array
      })
    );
    console.log("Form Lines Array:", formLinesArray);
  }
  //Set initial input values from params
  const setInitialInputValues = (queryParameters) => {
    setFormData((prevData) => ({
      ...prevData,
      nom: queryParameters.get("custom_t1") || "",
      prenom: queryParameters.get("custom_t4") || "",
      date_naissance: parsedDate, // Use the correctly parsed and formatted date here
      adresse: queryParameters.get("custom_t2") || "",
      code_postal: queryParameters.get("custom_t3") || "",
      ville: queryParameters.get("custom_t6") || "",
      telephone: queryParameters.get("custom_t7") || "",
      email: queryParameters.get("custom_t8") || "",
      profession: queryParameters.get("custom_t9") || "",
      observations: queryParameters.get("custom_t10") || "",
      formLines: formLinesArray || "",
      // [
      //   // form lines cannot be passed in as parameters as compagnie and type contract are liste deroulante with fixed values
      //   // so if there are 3 lines : Sampo/Sampo/Axa the params will be : Sampo/Axa
      //   // {
      //   //   compagnie: compagnie,
      //   //   numero_contrat: numeroContrat,
      //   //   type_contrat: typeContrat,
      //   // }
      // ],
    }));

    // // Set the state
    // setFormLines((prevData) => ({
    //   ...prevData,
    //   compagnie: compagnie,
    //   numero_contrat: numeroContrat,
    //   type_contrat: typeContrat,
    // }));
  };
  // useEffect to call setInitialInputValues on component mount and when searchParams changes
  useEffect(() => {
    setInitialInputValues(queryParameters);
    queryParameters.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }, []);
  //auto Resize Text Box to fit length of text
  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto"; //reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; //set the height to the scroll height
    setFormData({
      ...formData,
      textareaHeight: `${textarea.scrollHeight}px`,
      observations: textarea.value,
    });
  };
  // Function to validate email format
  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Adresse e-mail est requise";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Adresse e-mail invalide";
    }
    return "";
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      validateEmail(value); // Validate email format on email input change
    }
    // if (name === 'date_naissance') {
    //   validateDOB(value); // Validate email format on email input change
    // }
    validateField(name, value);
  };

  // Function to handle textarea resize
  const handleTextareaResize = (newHeight) => {
    setFormData((prevData) => ({
      ...prevData,
      textareaHeight: `${newHeight}px`, // Update textareaHeight based on new height
    }));
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case "nom":
        errors.nom = !value.trim() ? "Nom est requis" : "";
        break;
      case "prenom":
        errors.prenom = !value.trim() ? "Prénom est requis" : "";
        break;
      case "email":
        errors.email = validateEmail(value);
        break;
      case "telephone":
        errors.telephone = !isValidPhoneNumber(value)
          ? "Numéro de téléphone invalide"
          : "";
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  // const handleAddLine = () => {
  //   // console.log('Current newLine state:', newLine);
  //   // Create a new line using the current state of newLine
  //   const lineToAdd = {
  //     compagnie: newLine.compagnie,
  //     numero_contrat: newLine.numero_contrat,
  //     type_contrat: newLine.type_contrat,
  //   };
  //   // console.log(lineToAdd);
  //   // Update formLines in formData using the callback function
  //   setFormData((prevData) => {
  //     const updatedFormLines = [...prevData.formLines, lineToAdd];
  //     // console.log(updatedFormLines); // Log the updated formLines
  //     return {
  //       ...prevData,
  //       formLines: updatedFormLines,
  //     };
  //   });
  //   // Use setFormLines to update the formLines state
  //   setFormLines((prevLines) => [...prevLines, lineToAdd]);

  //   // Clear the newLine state for the next line
  //   setNewLine({
  //     compagnie: '',
  //     numero_contrat: '',
  //     type_contrat: '',
  //   });
  // };

  // useEffect(() => {
  //   // Log the formLines state after it has been updated
  //   // console.log(formLines);
  // }, [formLines]); // Add formLines as a dependency to useEffect

  const handleDeleteLine = (index) => {
    setFormData((prevData) => {
      const updatedFormLines = prevData.formLines.filter((_, i) => i !== index);
      console.log(updatedFormLines);
      console.log(prevData);
      return {
        ...prevData,
        formLines: updatedFormLines,
      };
    });
  };

  const handleAddLine = (line) => {
    setFormData((prevData) => {
      // Ensure prevData.formLines is an array
      const currentLines = Array.isArray(prevData.formLines)
        ? prevData.formLines
        : [];
      console.log(currentLines);
      return {
        ...prevData,
        formLines: [...currentLines, line],
      };
    });

    // Clear the newLine state for the next line
    setNewLine({
      compagnie: "",
      numero_contrat: "",
      type_contrat: "",
    });
  };

  // Handle submit change
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    // Validate all fields before submission
    const fields = ["nom", "prenom", "email", "telephone"];
    let errors = { ...formErrors };

    fields.forEach((field) => {
      validateField(field, formData[field]);
    });

    setFormErrors(errors);

    const { nom, prenom, email, telephone } = formData; // Destructure nom and email from formData
    if (!nom || !prenom || !email || !telephone) {
      setFormErrors({
        nom: !nom ? "Nom est requis" : "",
        prenom: !prenom ? "Prénom est requis" : "",
        telephone: !telephone ? "Numéro de téléphone est requis" : "",
        email: !email ? "Adresse e-mail est requis" : "",
      });
    } else {
      setFormErrors({
        nom: !nom,
        prenom: !prenom,
        telephone: !telephone,
        email: !email,
      });

      axios
        .post(
          "https://armoires.zeendoc.com/jannel/_ClientSpecific/41543/index.php",
          formData,
          {
            crossdomain: true,
            headers: { Form: "Client", ResId: ResId, docDbId: docDbId },
          }
        )
        .then((res) => {
          //send response to editForm.js
          if (onFormSubmissionSuccess) {
            onFormSubmissionSuccess();
          }
          // Redirect to homepage
          navigate("/");
        })
        .catch((error) => {
          // Handle any errors if the request fails
          console.error(
            "Il y a eu une erreur lors de la soumission du formulaire :",
            error
          );
        });
    }
  };

  const handleOnClickClose = async (event) => {
    await handleSubmit(event);
  };

  return (
    <div className="FormWrapper">
      <div className="Form form-group">
        <h1>Formulaire fiche client particulier</h1>

        <div className="FormClient" method="POST">
          <h2>Informations générales</h2>

          <div className="row">
            <TextInput
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required={true}
              error={formErrors.nom}
            />
            <TextInput
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              required={true}
              error={formErrors.prenom}
            />
            <DOBInput
              label="Date de Naissance"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleInputChange}
            />
            <TextInput
              label="Adresse"
              name="adresse"
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
              label="Téléphone"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              required={true}
              error={formErrors.telephone}
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
              label="Profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
            />
            <TextArea
              label="Observations"
              name="observations"
              value={formData.observations}
              onChange={handleInputChange}
              height={formData.textareaHeight}
              handleResize={handleTextareaResize} // Pass handleResize function to TextArea
            />

            <h2
              className="contract"
              style={{ marginTop: 40, marginBottom: 0, paddingTop: 10 }}
            >
              Contrats
            </h2>
            <DropdownMenu newLine={newLine} setNewLine={setNewLine} />

            <ContractLineInput
              newLine={newLine}
              setNewLine={setNewLine}
              handleAddLine={handleAddLine}
            />

            <ContractLinesTable
              formLines={formData.formLines}
              handleDeleteLine={handleDeleteLine}
            />
          </div>

          <div className="btn-group ">
            <div>
              <Link role="button" to={`/`}>
                <button type="button" className="back btn btn-secondary">
                  Retour
                </button>
              </Link>
            </div>
            <div>
              <button
                onClick={(event) => handleOnClickClose(event)}
                className=" btn btn-primary "
                type="submit"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormClient;
