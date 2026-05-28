import {
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

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

  if (field.type === "checkbox") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: 1,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(value)}
              onChange={(e) => onChange(field.key, e.target.checked)}
            />
          }
          label={field.label}
        />
      </Box>
    );
  }

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
          type={field.type || "text"}
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          sx={inputStyles}
          disabled={field.disabled}
        />
      )}
    </Box>
  );
};

export default FormField;
