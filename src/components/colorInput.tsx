
import { useDebounce } from "rooks";

interface ColorInputProps {
    value: string;
    onChange: (newValue: string) => void
    label: string;
}

function ColorInput({value, onChange, label} : ColorInputProps) {
    const setValueChanged = useDebounce(onChange, 300);
    return(
        <div>
            <label>{label}</label>
            <input
                type="color"
                value={value}
                onChange={(e) => {
                    setValueChanged(e.target.value);
                }}
            />
        </div>
    );
}

export default ColorInput;