import React, { useRef } from 'react';

const TextArea = ({ label, name, value, onChange, height, handleResize }) => {
    const textareaRef = useRef(null);

    // Function to handle text area resizing
    const autoResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            handleResize(textarea.scrollHeight);
        }
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
                rows="4" // Initial rows, will adjust dynamically
                className="mainInfo form-control"
                name={name}
                value={value}
                onChange={handleChange} // Handle change with custom function
                style={{
                    overflow: 'auto', // Allow scrollbar when content exceeds height
                    height: height,   // Set height externally
                    resize: 'none'    // Prevent manual resizing
                  }}
                ref={textareaRef} // Reference for auto resizing
            ></textarea>
        </div>
    );
};

export default TextArea;
