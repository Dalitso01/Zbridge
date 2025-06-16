// filepath: c:\Users\USER\zbridge\src\PrivacyPolicy.js
import React from "react";
import { Box, Typography } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Privacy Policy
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        At ZBRIDGE, we value your privacy. All user data is securely stored and only accessible to authorized personnel. We do not share your data with third parties without your consent.
      </Typography>
      <Typography variant="body1">
        For more details, contact us at privacy@zbridge.africa.
      </Typography>
    </Box>
  );
};

export default PrivacyPolicy;