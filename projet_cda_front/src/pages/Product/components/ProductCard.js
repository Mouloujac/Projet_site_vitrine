import Card from 'react-bootstrap/Card';


function ProductCard(produit) {

  return (
          <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                {produit.id}
              </Card.Text>
            </Card.Body>
          </Card>  
  );
}

export default ProductCard;