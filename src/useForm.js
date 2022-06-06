import { useState } from "react";

export function useForm() {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return [value, onChange];
}