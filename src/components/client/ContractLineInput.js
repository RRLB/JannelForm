import React from 'react';

const ContractLineInput = ({ newLine, setNewLine, handleAddLine }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLine((prev) => ({ ...prev, [name]: value}));
    };
    return (
        
        <div className="contract addNew">

            <button onClick={handleAddLine} className='btn btn-light' type='button'>
                Rajouté
            </button>
        </div>
    );
};
export default ContractLineInput;