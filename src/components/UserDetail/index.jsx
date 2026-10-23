import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`).then((response) => {
      setUser(response.data);
    });
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
        <strong>Description:</strong> {user.description}
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to={`/photos/${userId}`}
      >
        View Photos
      </Button>
    </Box>
  );
}

export default UserDetail;
