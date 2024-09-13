import Carousel from "react-bootstrap/Carousel";

function ControlledCarousel({ places }) {
  const universityCategory = places.find(
    (place) => place.category === "university"
  );
  const enterpriseCategory = places.find(
    (place) => place.category === "enterprise"
  );
  const carrierCategory = places.find((place) => place.category === "carrier");

  return (
    <Carousel
      data-bs-theme="dark"
      className="mt-3 mb-3"
      style={{ maxHeight: "700px", paddingTop: "10px" }}
    >
      {universityCategory && (
        <Carousel.Item key={universityCategory._id}>
          <img
            className="d-block w-100"
            src={universityCategory.image}
            alt={universityCategory.title}
            height={500}
          />
          <Carousel.Caption>
            <h5>{universityCategory.title}</h5>
            <p>{universityCategory.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}

      {enterpriseCategory && (
        <Carousel.Item key={enterpriseCategory._id}>
          <img
            className="d-block w-100"
            height={500}
            width={500}
            src={enterpriseCategory.image}
            alt={enterpriseCategory.title}
          />
          <Carousel.Caption>
            <h5>{enterpriseCategory.title}</h5>
            <p>{enterpriseCategory.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {carrierCategory && (
        <Carousel.Item key={carrierCategory._id}>
          <img
            className="d-block w-100"
            height={500}
            width={500}
            src={carrierCategory.image}
            alt={carrierCategory.title}
          />
          <Carousel.Caption>
            <h5>{carrierCategory.title}</h5>
            <p>{carrierCategory.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
}

export default ControlledCarousel;

{
  /* <Carousel.Item>
<img
  className="d-block w-100"
  src="holder.js/800x400?text=Second slide&bg=eee"
  alt="Second slide"
/>
<Carousel.Caption>
  <h5>Second slide label</h5>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
<img
  className="d-block w-100"
  src="holder.js/800x400?text=Third slide&bg=e5e5e5"
  alt="Third slide"
/>
<Carousel.Caption>
  <h5>Third slide label</h5>
  <p>
    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
  </p>
</Carousel.Caption>
</Carousel.Item> */
}
