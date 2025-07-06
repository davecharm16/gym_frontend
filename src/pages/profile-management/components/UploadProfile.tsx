"use client";

import React, { useState, useRef } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadProfile = ({ editable }: { editable: boolean }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box
      onClick={triggerFileSelect}
      sx={{
        width: "100%",
        height: 200,
        borderRadius: 2,
        border: `2px dashed ${theme.palette.divider}`,
        position: "relative",
        cursor: editable ? "pointer" : "default",
        transition: "border 0.3s",
        "&:hover": {
          borderColor: editable ? theme.palette.primary.main : theme.palette.divider,
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        mx: "auto",
        mb: 2,
      }}
    >
      {image ? (
        <Avatar
          src={image}
          variant="square"
          sx={{
            width: 180,
            height: 180,
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
      ) : (
        <Stack alignItems="center" spacing={1}>
          <CloudUploadIcon
            sx={{
              fontSize: 36,
              color: editable ? theme.palette.text.secondary : theme.palette.text.disabled,
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {editable ? "Click to upload" : "No Image"}
          </Typography>
        </Stack>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />
    </Box>
  );
};

export default UploadProfile;
