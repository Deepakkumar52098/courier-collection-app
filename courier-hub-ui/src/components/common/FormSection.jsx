import { Box, Typography } from "@mui/material";
import FormField from "./FormField";

const FormSection = ({ title, fields, formData, onChange }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#1e293b",
          mb: 3,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        {fields.map((field) => (
          <FormField
            key={field.key}
            field={field}
            value={formData[field.key]}
            onChange={onChange}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FormSection;
