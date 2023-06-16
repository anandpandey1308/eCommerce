import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  Button,
} from "@material-ui/core";

const styles = {
  card: {
    width: 300,
    marginBottom: 20,
  },
  media: {
    height: 200,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
  },
  addButton: {
    marginTop: 10,
  },
};

function ProductCard({ product }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    // Add to cart logic goes here
    console.log("Product added to cart:", product);
  };

  return (
    <>
      <Card style={styles.card} onClick={handleOpen}>
        <CardMedia
          component="img"
          alt={product.name}
          height="200"
          image={product.photos[0].secure_url}
          style={styles.media}
        />
        <CardContent>
          <Typography variant="h5" component="h3">
            {product.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Price: {product.price}
          </Typography>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        style={styles.modal}
        aria-labelledby="product-modal"
        aria-describedby="product-modal-description"
      >
        <div style={styles.modalContent}>
          <Typography variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Price: {product.price}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Description: {product.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.addButton}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ProductCard;
