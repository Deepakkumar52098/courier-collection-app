import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const FormField = ({ field, value, onChange }) => {
  const labelStyles = {
    textAlign: "left",
    fontWeight: 500,
    color: "#334155",
  };

  const inputStyles = {
    backgroundColor: "#fff",
    borderRadius: "10px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
      }}
    >
      <InputLabel sx={labelStyles}>{field.label}</InputLabel>

      {field.type === "select" ? (
        <Select
          size="small"
          fullWidth
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          displayEmpty
          sx={inputStyles}
        >
          <MenuItem value="">Select {field.label}</MenuItem>

          {field.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          size="small"
          fullWidth
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          sx={inputStyles}
        />
      )}
    </Box>
  );
};

export default FormField;
