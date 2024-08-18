import React, { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { useTemplateUpdater } from '../Utils/useTemplateUpdater';
import { useLanguage } from "../Contexts/LanguageContext";

function ImportConfigButton() {
  const { applyTemplateData } = useTemplateUpdater();
  const { translate } = useLanguage();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const dataDefault = JSON.parse(e.target.result);
          applyTemplateData(dataDefault, 0);
          setSnackbar({ open: true, message: translate("uploadconfig-alert-ok"), severity: 'success' });
        } catch (error) {
          setSnackbar({ open: true, message: translate("uploadconfig-alert-error"), severity: 'error' });
        }
      };
      reader.readAsText(file);
    } else {
      setSnackbar({ open: true, message: translate("uploadconfig-alert-instruct"), severity: 'warning' });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        component="label"
        sx={{ width: "50%" }}

      >
        {translate("uploadconfig-button")}
        <input
          type="file"
          accept=".json"
          hidden
          onChange={handleFileUpload}
        />
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ImportConfigButton;
