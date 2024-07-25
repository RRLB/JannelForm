import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "./components/enterprise/TextInput";
import TextArea from "./components/enterprise/TextArea";
import ContractLineInput from "./components/enterprise/ContractLineInput";
import ContractLinesTable from "./components/enterprise/ContractLinesTable";
import DropdownMenu from "./components/DropdownMenu";
import { isValidPhoneNumber } from "react-phone-number-input";
import EmailInput from "./components/enterprise/EmailInput";

const FormEnterprise = ({ onFormSubmissionSuccess }) => {
  const [formData, setFormData] = useState({
    nom_societe: "",
    nom_gerant: "",
    adresse: "",
    code_postal: "",
    ville: "",
    forme_juridique: "",
    email: "",
    telephone: "",
    numero_siret: "",
    observations: "",
    textareaHeight: "auto",
    formLines: [],
  });

  const [newLine, setNewLine] = useState({
    compagnie: "",
    numero_contrat: "",
    type_contrat: "",
  });

  const [formErrors, setFormErrors] = useState({
    nom_societe: false,
    email: false,
    telephone: false,
  });

  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search);
  let ResId = queryParameters.get("resId");
  // let docDbId = queryParameters.get("docDbId");
  
  
  // Get the contractLines parameter from the query parameters
  let encodecontractLinesString = queryParameters.get("contractLines") || "";
  // let encodecontractLines = {"id_increment":"2811","compagnie":"{\"3\":\"AXA\"}","numero_contrat":"{\"3\":\"2419941004\"}","type_contrat":"{\"3\":\"AUTO\"}"}
  console.log("Retrieved contractLines string:", encodecontractLinesString);

  // Initialize contractLines with a default empty object if parsing fails
  let contractLines = {};
  let docDbId = "";
  if (encodecontractLinesString) {
    try {
      // Parse the entire encodecontractLines string first
      const encodecontractLines = JSON.parse(encodecontractLinesString);
      console.log("Parsed encodecontractLines:", encodecontractLines);

      // Parse the nested JSON strings within the parsed object
      contractLines = {
        id_increment: encodecontractLines.id_increment,
        compagnie: JSON.parse(encodecontractLines.compagnie),
        numero_contrat: JSON.parse(encodecontractLines.numero_contrat),
        type_contrat: JSON.parse(encodecontractLines.type_contrat)
      };
      // Extract the id_increment value
      docDbId = contractLines.id_increment || "";
      console.log("docDbId:", docDbId);
    } catch (error) {
      console.error("Failed to parse contractLines:", error);
    }

  }
  
  // contractLines = {compagnie: '["afer","aig","swiss_life",["aig"]]', numero_contrat: '["rr5565","ezrzer","FR029956TT","TT51523EAX"]', type_contrat: '["flotte_auto","mri","pjpro",["flotte_auto"]]'}
  console.log("Parsed contractLines:", contractLines);
//{compagnie: '["afer","aig","swiss_life",["aig"]]', numero_contrat: '["rr5565","ezrzer","FR029956TT","TT51523EAX"]', type_contrat: '["flotte_auto","mri","pjpro",["flotte_auto"]]'}
  
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
        let parsedData = lineData[key]; // Directly use the parsed object
        
        // Iterate over the keys in parsedData
        for (const subKey in parsedData) {
          if (parsedData.hasOwnProperty(subKey)) {
            let value = parsedData[subKey];
            if (key !== "numero_contrat") {
              nestedArray.push([value]);
            } else {
              nestedArray.push(value);
            }
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
    formLinesArray = nestedContractLines.compagnie.map((compagnieArray, index) => ({
      compagnie: compagnieArray[0],  // Each compagnie is nested in its own array
      numero_contrat: nestedContractLines.numero_contrat[index],  // This one doesn't need nesting
      type_contrat: nestedContractLines.type_contrat[index][0],  // Each type_contrat is nested in its own array
    }));
    console.log("Form Lines Array:", formLinesArray);
  }
  const setInitialInputValues = (queryParameters) => {
    setFormData((prevData) => ({
      ...prevData,
      nom_societe: queryParameters.get("custom_t15") || "",
      nom_gerant: queryParameters.get("custom_t1") || "",
      adresse: queryParameters.get("custom_t2") || "",
      code_postal: queryParameters.get("custom_t3") || "",
      ville: queryParameters.get("custom_t6") || "",
      forme_juridique: queryParameters.get("custom_t16") || "",
      email: queryParameters.get("custom_t8") || "",
      telephone: queryParameters.get("custom_t7") || "",
      numero_siret: queryParameters.get("custom_t14") || "",
      observations: queryParameters.get("custom_t10") || "",
      formLines: formLinesArray || "",
    }));
  };

  useEffect(() => {
    setInitialInputValues(queryParameters);
    queryParameters.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }, []);
//auto Resize Text Box to fit length of text
const autoResize = (event) => {
  const textarea = event.target;
  textarea.style.height = 'auto'; //reset the height
  textarea.style.height = `${textarea.scrollHeight}px`; //set the height to the scroll height
  setFormData({ ...formData, textareaHeight: `${textarea.scrollHeight}px`, observations: textarea.value });
};
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
      validateEmail(value);
    }
    validateField(name, value);
  };

  const handleTextareaResize = (newHeight) => {
    setFormData((prevData) => ({
      ...prevData,
      textareaHeight: `${newHeight}px`,
    }));
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case "nom_societe":
        errors.nom_societe = !value.trim() ? "Nom de société est requis" : "";
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

  const handleDeleteLine = (index) => {
    setFormData((prevData) => {
      const updatedFormLines = prevData.formLines.filter((_, i) => i !== index);
      console.log(updatedFormLines);
      return {
        ...prevData,
        formLines: updatedFormLines,
      };
    });
  };

  const handleAddLine = (line) => {
    setFormData((prevData) => {
      // Ensure prevData.formLines is an array
      const currentLines = Array.isArray(prevData.formLines) ? prevData.formLines : [];
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
 

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const fields = ["nom_societe", "email", "telephone"];
    let errors = { ...formErrors };

    fields.forEach((field) => {
      validateField(field, formData[field]);
    });

    setFormErrors(errors);

    const { nom_societe, email, telephone } = formData;
    if (!nom_societe || !email || !telephone) {
      setFormErrors({
        nom_societe: !nom_societe ? "Nom de société est requis" : "",
        email: !email ? "Adresse e-mail est requis" : "",
        telephone: !telephone ? "Numéro de téléphone est requis" : "",
      });
    } else {
      setFormErrors({
        nom_societe: !nom_societe,
        email: !email,
        telephone: !telephone,
      });
      axios
        .post(
          "https://armoires.zeendoc.com/jannel/_ClientSpecific/41543/index.php",
          formData,
          { crossdomain: true, headers: { Form: "Entreprise ", ResId: ResId, docDbId: docDbId } }
        )
        .then((res) => {
          if (onFormSubmissionSuccess) {
            onFormSubmissionSuccess();
          }
          navigate("/");
        })
        .catch((error) => {
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
    <div className="Form form-group">
      <h1>Formulaire fiche entreprise</h1>

      <div className="FormEnterprise">
        <div className="row">
          <TextInput
            label="Nom société"
            name="nom_societe"
            value={formData.nom_societe}
            onChange={handleInputChange}
            required={true}
            error={formErrors.nom_societe}
          />

          <TextInput
            label="Nom du gérant"
            name="nom_gerant"
            value={formData.nom_gerant}
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
            label="Forme Juridique"
            name="forme_juridique"
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
            error={formErrors.telephone}
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
            handleResize={handleTextareaResize} 
            // onResize={handleTextareaResize}
            // textareaHeight={formData.textareaHeight}
          />

          <DropdownMenu newLine={newLine} setNewLine={setNewLine} formType="enterprise"/>

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
              <button className="back btn btn-secondary">Retour</button>
            </Link>
          </div>

          <div>
            <button
              onClick={(event) => handleOnClickClose(event)}
              className="btn btn-primary"
              type="submit"
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEnterprise;
