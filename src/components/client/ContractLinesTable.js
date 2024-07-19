import React from 'react';

const ContractLinesTable = ({ formLines, handleDeleteLine  }) => {
    return (
        <div className="formLines">
            {formLines.length > 0 && (
                <table className='table'>
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
                                <td>{line.compagnie ? (Array.isArray(line.compagnie) ? line.compagnie.join(', ').toUpperCase() : line.compagnie.toUpperCase()) : 'N/A'}</td>
                                <td>{line.numero_contrat ? (Array.isArray(line.numero_contrat) ? line.numero_contrat.join(', ').toUpperCase() : line.numero_contrat.toUpperCase()) : 'N/A'}</td>
                                <td>{line.type_contrat ? (Array.isArray(line.type_contrat) ? line.type_contrat.join(', ').toUpperCase() : line.type_contrat.toUpperCase()) : 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleDeleteLine(index)} className='btn btn-outline-secondary'>Supprimer</button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>  
            )}
        </div>
    );
};

export default ContractLinesTable;
