interface ColorInputProps {
    value: string;
    onChange: (newValue: string) => void
    label: string;
}

function ColorInput({value, onChange, label} : ColorInputProps) {
    
    return(
        <div>
            <label>{label}</label>
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default ColorInput;