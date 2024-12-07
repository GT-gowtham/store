import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Grid, Card, Container } from "@mui/material"; // Import MUI components
import Printer from "../assets/itProduct/printer.png";
import Printer1 from "../assets/itProduct/printer1.png";
import Keyboard1 from "../assets/itProduct/keyboard1.png";
import Mouse from "../assets/itProduct/mouse.png";
import Laptop from "../assets/itProduct/laptop.png";
import Laptop1 from "../assets/itProduct/laptop1.png";
import Camera from "../assets/itProduct/camera.png";
import Mouse2 from "../assets/itProduct/mouse2.jpg";
import Speaker1 from "../assets/itProduct/speaker1.png";
import Speaker from "../assets/itProduct/speaker.png";
import lap1 from "../assets/itProduct/laptop/lap1.webp";
import lap3 from "../assets/itProduct/laptop/lap3.webp";
import lap4 from "../assets/itProduct/laptop/lap4.jpg";
import lap2 from "../assets/itProduct/laptop/lap5.jpg";
import sampleVideo from "../assets/itProduct/video.mp4";
import CameraVideo from "../assets/itProduct/camera/cameraVideo.mp4";
// import LaptopVideo from "../assets/itProduct/laptop/laptopVideo.mp4";
import MouseVideo from "../assets/itProduct/mouse/mouseVideo.mp4";
import KeyVideo from "../assets/itProduct/key/keyVideo.mp4";
import PrinterVideo from "../assets/itProduct/printer/printerVideo.mp4";
// import SpeakerVideo from "../assets/itProduct/speaker/speakerVideo.mp4";
import camera1 from "../assets/itProduct/camera/image1.webp";
import camera2 from "../assets/itProduct/camera/image2.webp";
import camera3 from "../assets/itProduct/camera/image3.webp";
import camera4 from "../assets/itProduct/camera/image4.jpg";
import mouse1 from "../assets/itProduct/mouse/mouse1.jpg";
import mouse2 from "../assets/itProduct/mouse/Mouse2.jpg";
import mouse3 from "../assets/itProduct/mouse/mouse3.jpg";
import mouse4 from "../assets/itProduct/mouse/mouse5.webp";
import key1 from "../assets/itProduct/key/keyboard1.webp";
import key2 from "../assets/itProduct/key/keyboard2.jpg";
import key3 from "../assets/itProduct/key/keybord3.jpg";
import key4 from "../assets/itProduct/key/keyboard4.jpg";
import printer1 from "../assets/itProduct/printer/printer1.1.png";
import printer2 from "../assets/itProduct/printer/printer5.webp";
import printer3 from "../assets/itProduct/printer/printer3.jpg";
import printer4 from "../assets/itProduct/printer/printer6.avif";
import speaker1 from "../assets/itProduct/speaker/speaker5.webp";
import speaker2 from "../assets/itProduct/speaker/speaker6.jpg";
import speaker3 from "../assets/itProduct/speaker/speaker7.jpg";
import speaker4 from "../assets/itProduct/speaker/speaker4.jpg";

const Image = [
  { image: lap1, name: "Laptop" },
  { image: mouse3, name: "Mouse" },
  { image: printer2, name: "Printer" },
  { image: speaker3, name: "Speaker" },
  { image: key3, name: "Mouse2" },
  { image: camera2, name: "Camera" },
  { image: lap2, name: "Laptop1" },
  { image: printer4, name: "Printer1" },
  { image: key1, name: "Keyboard1" },
  { image: speaker2, name: "Speaker" },
];

const SlideImage = [
  { image: Laptop, name: "Laptop" },
  { image: Mouse, name: "Mouse" },
  { image: Printer, name: "Printer" },
  { image: Speaker1, name: "Speaker" },
  { image: Mouse2, name: "Mouse2" },
  { image: Camera, name: "Camera" },
  { image: Laptop1, name: "Laptop1" },
  { image: Printer1, name: "Printer1" },
  { image: Keyboard1, name: "Keyboard1" },
  { image: Speaker, name: "Speaker" },
];

const productData = [
  {
    title: "Camera",
    video: CameraVideo,
    images: [camera1, camera2, camera3, camera4],
    subTittle: ["Camera1", "Camera2", "Camera3", "Camera4"],
    contant:
      "A high-resolution camera that captures stunning images with exceptional clarity",
  },
  {
    title: "Laptop",
    // video: LaptopVideo,
    images: [lap1, lap2, lap3, lap4],
    subTittle: ["Laptop1", "Laptop2", "Laptop3", "Laptop4"],
    contant:
      "A laptop is a portable computer designed for convenience and productivity on the go.",
  },
  {
    title: "Mouse",
    video: MouseVideo,
    images: [mouse1, mouse2, mouse3, mouse4],
    subTittle: ["Mouse1", "Mouse2", "Mouse3", "Mouse4"],
    contant: "If the mouse passes halfway, the content should appear.",
  },
  {
    title: "Printer",
    video: PrinterVideo,
    images: [printer1, printer2, printer3, printer4],
    subTittle: ["Printer1", "Printer2", "Printer3", "Printer4"],
    contant: "Efficient and high-quality printing device.",
  },
  {
    title: "Keyboard",
    video: KeyVideo,
    images: [key1, key2, key3, key4],
    subTittle: ["Keyboard1", "Keyboard2", "Keyboard3", "Keyboard4"],
    contant: "Keyboard is a device used for typing and inputting data.",
  },
  {
    title: "Speaker",
    // video: SpeakerVideo,
    subTittle: ["Speaker1", "Speaker2", "Speaker3", "Speaker4"],
    images: [speaker1, speaker2, speaker3, speaker4],
    contant: "Speaker is a device that converts electrical signals into sound.",
  },
];

function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true, // Ensures that the slider loops continuously
    slidesToShow: 4, // Display 4 images at a time
    autoplay: true, // Ensures the slider automatically moves
    autoplaySpeed: 0, // Adjust speed for autoplay (in milliseconds)
    speed: 700, // Transition speed (500ms)
    pauseOnHover: false, // Prevent slider from pausing when mouse hovers
    cssEase: "linear", // Make transition smooth and continuous
  };

  return (
    <div>
      <Container style={{ marginTop: "10px" }}>
        <Grid container justifyContent={"space-around"}>
          {Image.map((image) => (
            <Grid item key={image.name}>
              <img
                src={image.image}
                alt={image.name}
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "5px",
                  border: "5px solid #550a35",
                }}
              />
              <Typography style={{ textAlign: "center" }}>
                {image.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <video
          autoPlay
          muted
          loop
          style={{
            width: "100%", // Full width of the container
            height: "75vh", // 50% of the viewport height
            objectFit: "cover", // Ensures the video covers the container proportionally
          }}
        >
          <source src={sampleVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
      <Grid>
        <Typography
          style={{ fontWeight: "bold", fontSize: "30px", marginTop: 10 }}
        >
          Best deals curated from stores nearby
        </Typography>
      </Grid>
      <Box sx={{ textAlign: "center" }}>
        <Card elevation={5}>
          <Slider {...settings}>
            {SlideImage.map((image) => (
              <Box
                key={image.name}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={image.image}
                  alt={image.name}
                  style={{
                    width: "300px",
                    height: "300px",
                    padding: "50px",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Card>
      </Box>
      <div style={{ backgroundColor: "#e0e0e0", padding: "5vh" }}>
        {/* <Container style={{}}> */}
        <Grid container rowGap={8} columnSpacing={3}>
          {productData.map((product, index) => (
            <Grid item lg={4} md={6} sm={12} key={index}>
              <Card
                elevation={0}
                style={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: "16px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {product.title}
                </Typography>
                <Box
                  sx={{ textAlign: "center", marginBottom: 4, marginTop: 3 }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    style={{
                      width: "90%", // Full width of the container
                      height: "30vh", // 50% of the viewport height
                      objectFit: "cover", // Ensures the video covers the container proportionally
                      // opacity: 0.4,
                    }}
                  >
                    <source src={product.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>

                <Grid container spacing={2} justifyContent="center">
                  {product.images.map((image, imgIndex) => (
                    <>
                      <Grid item xs={6} key={imgIndex}>
                        <img
                          src={image}
                          alt={product.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                            marginBottom: "8px",
                          }}
                        />
                      </Grid>
                    </>
                  ))}
                </Grid>
                <Typography
                  style={{
                    color: "black",
                    textAlign: "center",
                    marginTop: "5px",
                  }}
                >
                  {product.contant}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* </Container> */}
      </div>
    </div>
  );
}

export default ImageSlider;