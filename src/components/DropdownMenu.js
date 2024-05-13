import React, { useState, useEffect } from 'react';

const DropdownMenu = ({ newLine, setNewLine, setFormLines, formType }) => {

    /* // Test data for contract types
    const testContractTypes = [
        { id: 1, value: 'mrh', label: 'MRH' },
        { id: 2, value: 'mri', label: 'MRI' },
        // Add more test data as needed
    ];

    // Test data for compagnie types
    const testCompagnieTypes = [
        { id: 1, value: 'axa', label: 'AXA' },
        { id: 2, value: 'sampo', label: 'SAMPO' },
        // Add more test data as needed
    ];

    const [contractTypes, setContractTypes] = useState(testContractTypes);
    const [compagnieTypes, setCompagnieTypes] = useState(testCompagnieTypes); */


    const [contractTypes, setContractTypes] = useState([]);
    const [compagnieTypes, setCompagnieTypes] = useState([]);

    useEffect(() => {
    // Function to load contract types and compagnie types
    const loadData = async () => {
      try {
        // Construct the API endpoint based on the formType
        const endpoint = formType === 'enterprise' ? 'contractTypesEnterprise.php' : 'contractTypes.php';

        // Simulating an API call to fetch contract types
        const contractResponse = await fetch(`https://armoires.zeendoc.com/jannel/_ClientSpecific/41543/dropdownMenu/${endpoint}`);
        const contractTypesData = await contractResponse.json();
        setContractTypes(contractTypesData);
        // console.log(contractTypesData);

        // Simulating an API call to fetch compagnie types
        const compagnieResponse = await fetch('https://armoires.zeendoc.com/jannel/_ClientSpecific/41543/dropdownMenu/compagnieTypes.php');
        const compagnieTypesData = await compagnieResponse.json();
        setCompagnieTypes(compagnieTypesData);
        // console.log(compagnieTypesData);
      } catch (error) {
        console.error('Error loading data: ', error);
      }
    }; 

    // Call the function to load data when the component mounts
    loadData();
  }, []); // The empty dependency array means it runs once after component mounting

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    // console.log('Selected Contract Types:', selectedOptions);
    setNewLine((prevLine) => ({ ...prevLine, type_contrat: selectedOptions }));
  };

  const handleSelectChangeCompagnie = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    // console.log('Selected Compagnie Types:', selectedOptions);
    setNewLine((prevLine) => ({ ...prevLine, compagnie: selectedOptions }));
  };

  const handleInputChangeNumeroContrat = (e) => {
    const { name, value } = e.target;
    console.log('value numero contrat:', value);
    setNewLine((prevLine) => ({ ...prevLine, [name]: value }));
  };

  return (
    <div className="contract">
    <div className="row">
        {/* Dropdown for contract types */}
      <div className=" form-group col-sm-12 col-md-6 col-lg-4">
        <label className="col-control-label">Type de contrat</label>
        <select
          name="type_contrat"
          type="text"
          value={newLine.type_contrat}
          onChange={handleSelectChange}
          className="form-select"
          id="exampleSelect2"
          // multiple  // Add this attribute for multi-select
        >
          <option value=""></option>
          {contractTypes.map((contractType) => (
            <option key={contractType.id} value={contractType.value}>
              {contractType.label}
            </option>
          ))}
        </select>
      </div>

    {/* Dropdown for compagnie */}
    <div className="form-group col-sm-12 col-md-6 col-lg-4">
        <label className="col-control-label">Compagnie</label>
        <select
          name="compagnie"
          type="text"
          value={newLine.compagnie}
          onChange={handleSelectChangeCompagnie}
          className="form-select"
          id="exampleSelect1"
        >
          <option value=""></option>
          {compagnieTypes.map((compagnieType) => (
            <option key={compagnieType.id} value={compagnieType.value}>
              {compagnieType.label}
            </option>
          ))}
        </select>
      </div>

     {/* Input for numéro de contrat */}
     <div className="form-group col-sm-12 col-md-6 col-lg-4">
        <label className="col-form-label">Numéro de contrat</label>
        <input
          className="form-control" placeholder="numéro de contrat" id="inputDefault"
          type="text"
          name="numero_contrat"
          value={newLine.numero_contrat}
          onChange={handleInputChangeNumeroContrat}
        />
      </div>
      
      </div>
    </div>
  );
};

export default DropdownMenu;
