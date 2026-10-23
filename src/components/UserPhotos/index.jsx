import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`).then((response) => {
      setPhotos(response.data);
    });
  }, [userId]);

  return (
    <Box sx={{ padding: 2 }}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ marginBottom: 3 }}>
          <CardMedia
            component="img"
            image={require(`../../images/${photo.file_name}`)}
            alt="User Post"
            sx={{ maxHeight: 500, objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary" display="block">
              {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: "bold" }}>
              Comments:
            </Typography>
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <Box key={comment._id} sx={{ mt: 1, mb: 1, pl: 1, borderLeft: "2px solid #ddd" }}>
                  <Typography variant="body2">
                    <Link
                      to={`/users/${comment.user._id}`}
                      style={{ fontWeight: "bold", textDecoration: "none", color: "#1976d2" }}
                    >
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                    {" - "}
                    <span style={{ color: "#666", fontSize: "0.85em" }}>
                      {new Date(comment.date_time).toLocaleString()}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {comment.comment}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
