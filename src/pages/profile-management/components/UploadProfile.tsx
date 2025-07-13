"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Typography, useTheme, Stack } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface UploadProfileProps {
  editable: boolean;
  onFileSelected?: (file: File) => void;
  defaultImage?: string;
}

const UploadProfile: React.FC<UploadProfileProps> = ({
  editable,
  onFileSelected,
  defaultImage,
}) => {
  const [image, setImage] = useState<string | null>(defaultImage ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      if (onFileSelected) onFileSelected(file);
    }
  };

  const triggerFileSelect = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    console.log('Uploadddd', image)
  }, [image])

  return (
    <Box
      onClick={triggerFileSelect}
      sx={{
        width: 150,
        height: 150,
        borderRadius: "50%",
        border: `2px dashed ${theme.palette.divider}`,
        overflow: "hidden",
        cursor: editable ? "pointer" : "default",
        transition: "border 0.3s",
        "&:hover": {
          borderColor: editable
            ? theme.palette.primary.main
            : theme.palette.divider,
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto", // centers horizontally
        mb: 2,
      }}
    >
      {image ? (
        <Avatar
          src={image}
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <Stack alignItems="center" spacing={1}>
          <CloudUploadIcon
            sx={{
              fontSize: 36,
              color: editable
                ? theme.palette.text.secondary
                : theme.palette.text.disabled,
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
