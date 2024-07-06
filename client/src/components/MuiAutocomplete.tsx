import React, { useEffect, useState } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useFetch } from "../components/hooks/useFetch";

const MuiAutocomplete = ({ onSymptomsChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const { data: Symptoms, loading } = useFetch(
    "http://localhost:5000/Symptoms"
  );

  const handleChange = (event, values) => {
    const symptomNames = values.map((value) => value.SymptomsName);
    setSelectedValues(symptomNames);
    console.log(symptomNames);
    onSymptomsChange(symptomNames);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2} width="800px">
      <Autocomplete
        multiple
        id="tags-standard"
        options={Symptoms}
        getOptionLabel={(option) => option.SymptomsName}
        onChange={handleChange}
        noOptionsText="Нет доступных вариантов"
        isOptionEqualToValue={(option, value) =>
          option.SymptomsID === value.SymptomsID
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Симптомы"
            placeholder="Введите ваши симптомы"
          />
        )}
      />
    </Stack>
  );
};

export default MuiAutocomplete;
