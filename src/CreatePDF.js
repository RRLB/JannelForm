import  ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';


//Create styles
const styles= StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
    
});

//Create Document Component

const CreatePDF = ({ formData }) => {
    
    console.log('formData:', formData);
    
    return (
    <div>
    {/* <PDFViewer > */}
        
        {/* <Document> */}
            {/* <Page size="A4" style={styles.page}> */}
                {/* <View style={styles.section}> */}
                
                    {/* <Text>{`FormEnterprise`}</Text> */}
                    {/* Access the formData prop here to use the form data */}
                    {/* <Text>{`Nom: ${formData.nom}`}</Text> */}
                    {/* <Text>{`Prénom: ${formData.prenom}`}</Text> */}
                    {/* <Text>{`Date de Naissance: ${formData.dateNaissance}`}</Text> */}
                    {/* <Text>{`Address: ${formData.address}`}</Text> */}
                    {/* <Text>{`Code Postal: ${formData.codePostal}`}</Text> */}
                    {/* <Text>{`Ville: ${formData.ville}`}</Text> */}
                    {/* <Text>{`Téléphone: ${formData.telephone}`}</Text> */}
                    {/* <Text>{`Contact Email: ${formData.contactEmail}`}</Text> */}
                    {/* <Text>{`Prophession: ${formData.prophession}`}</Text> */}
                    {/* <Text>{`Observation: ${formData.observation}`}</Text> */}
                    {/* <Text>{`Compagnie: ${formData.compagnie}`}</Text> */}
                    {/* <Text>{`Numéro de Contrat: ${formData.numeroContrat}`}</Text> */}
                    {/* <Text>{`Nom: ${formData.nomSociete}`}</Text> */}
                    {/* <Text>{`Gérant: ${formData.nomGerant}`}</Text> */}
                    {/* <Text>{`Address: ${formData.address}`}</Text> */}
                    {/* <Text>{`Contact Email: ${formData.contactEmail}`}</Text> */}
                    {/* <Text>{`Téléphone: ${formData.telephone}`}</Text> */}
                    {/* <Text>{`Numéro de Siret: ${formData.numeroSiret}`}</Text> */}
                    {/* <Text>{`Compagnie: ${formData.compagnie}`}</Text> */}
                    {/* <Text>{`Numéro de Contrat: ${formData.numeroContrat}`}</Text> */}
                    {/* <Text>{`Type de Contrat: ${formData.typeContrat}`}</Text> */}
                {/* </View> */}
                {/* <View style={styles.section}> */}
                    
                {/* </View> */}
            {/* </Page> */}
        {/* </Document> */}
    {/* </PDFViewer> */}
    </div>
)};

// const App = () => (
//     <div>
//       <PDFDownloadLink document={<CreatePDF />} fileName="somename.pdf">
//         {({ blob, url, loading, error }) =>
//           loading ? 'Loading document...' : 'Download now!'
//         }
//       </PDFDownloadLink>
//     </div>
//   );

export default CreatePDF;
