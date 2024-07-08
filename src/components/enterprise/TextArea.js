import React, { useRef } from 'react';

const TextArea = ({ label, name, value, onChange, height, handleResize }) => {
    const textareaRef = useRef(null);

    // Function to handle text area resizing
    const autoResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            handleResize(textarea.scrollHeight); // Pass the new height to the parent component
        }
        console.log(textarea);
    };

    // Ensure onChange and autoResize are correctly called on input change
    const handleChange = (e) => {
        onChange(name, e.target.value); // Ensure correct parameters are passed
        autoResize(); // Resize textarea as text input changes
    };
    
    return (
        <div className="form-group col-sm-12">
            <label className="col-form-control">{label}</label>
            <textarea
                placeholder="text..."
                rows="1" // Initial rows, will adjust dynamically
                className="mainInfo form-control"
                name={name}
                value={value}
                onChange={handleChange} // Handle change with custom function
                style={{ height }} // Allow height to be set externally
                ref={textareaRef} // Reference for auto resizing
            ></textarea>
        </div>
    );
};

export default TextArea;
