import React from 'react';

const ContractLineInput = ({ newLine, handleAddLine }) => {
    
    const handleAdd = () => {
        //create a new line usingt the current state of the new line
        const lineToAdd = {
            compagnie: newLine.compagnie,
            numero_contrat: newLine.numero_contrat,
            type_contrat: newLine.type_contrat
        };
    

        //pass new line to parent component
        handleAddLine(lineToAdd);

    };

    return (
        
        <div className="contract addNew">

            <button onClick={handleAdd} className='btn btn-light' type='button'>
                Rajouter
            </button>
        </div>
    );
};
export default ContractLineInput;