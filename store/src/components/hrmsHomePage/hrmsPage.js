import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  CardContent,
  CardMedia,
  Card,
  Paper,
  Link,
  Container,
  Tabs,
  Tab,
} from "@mui/material";
import Hrms17 from "./assets/hrms17.jpg";
import Hrms13 from "./assets/hrms13.jpg";
import Hifi from "./assets/hifi.mp4";

const awardsContent = [
  {
    title: "Recognition and prestige",
    description:
      "Business awards shine a spotlight on your achievements, celebrating the hard work and innovation of your team. This public acknowledgment boosts morale and inspires continued excellence, creating a culture of success and motivation within your organization.",
    image: "assets/discoverImage/award.jpg",
    linkText: "Discover The CEO Awards ↗",
    link: "#",
  },
  {
    title: "Enhanced credibility",
    description:
      "Winning awards validates your business's value and expertise, building trust with clients and stakeholders. It's a stamp of quality that sets you apart from competitors.",
    image: "assets/discoverImage/credibility.jpg",
    linkText: "Learn More ↗",
    link: "#",
  },
  {
    title: "Networking opportunities",
    description:
      "Awards events bring together industry leaders, potential partners, and investors, offering unique opportunities to expand your network and gain insights.",
    image: "assets/discoverImage/networking.jpg",
    linkText: "Explore Events ↗",
    link: "#",
  },
  {
    title: "Marketing and publicity",
    description:
      "Awards provide free publicity and enhance your brand's visibility, creating a positive buzz and attracting more customers and clients.",
    image: "assets/discoverImage/marketing.jpg",
    linkText: "Boost Your Brand ↗",
    link: "#",
  },
  {
    title: "Benchmarking",
    description:
      "Competing for awards allows you to measure your performance against industry leaders, identifying strengths and areas for improvement.",
    image: "assets/discoverImage/benchmarking.jpg",
    linkText: "Set New Goals ↗",
    link: "#",
  },
];

const benefits = [
  {
    title: "🌳 Personal Growth and Reflection",
    content:
      "The retreat provides a unique opportunity for leaders to step away from their daily routines and reflect on their journey. This dedicated time for introspection helps them reconnect with their core values and purpose.",
    image: "assets/benefitsImage/sitting.avif",
  },
  {
    title: "💡 Fresh Perspectives and Insights",
    content:
      "Gain new perspectives and fresh ideas through meaningful discussions and activities designed to inspire and challenge your thinking.",
    image: "assets/benefitsImage/insights.avif",
  },
  {
    title: "🌿 Holistic Wellbeing",
    content:
      "Focus on your physical, mental, and emotional wellbeing with carefully curated activities to rejuvenate your mind and body.",
    image: "assets/benefitsImage/wellbeing.avif",
  },
  {
    title: "📊 Leadership Skills Development",
    content:
      "Enhance your leadership skills with workshops and experiences that encourage growth, adaptability, and resilience.",
    image: "assets/benefitsImage/leadership.avif",
  },
];

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const images = [
    {
      src: "assets/primeImage/guestsEvent.jpg",
      alt: "Guests enjoying the event",
    },
    {
      src: "assets/primeImage/groupAttendees.jpeg",
      alt: "Group of attendees",
    },
    {
      src: "assets/primeImage/musician.jpg",
      alt: "Musician performing",
    },
    {
      src: "assets/primeImage/guestsEvent.jpg",
      alt: "Guests enjoying the event",
    },
    {
      src: "assets/primeImage/groupAttendees.jpeg",
      alt: "Group of attendees",
    },
    {
      src: "assets/primeImage/musician.jpg",
      alt: "Musician performing",
    },
  ];
  const galleryImages = [
    { src: "assets/galleryImage/Activity.jpg", alt: "Activity on the lawn" },
    { src: "assets/galleryImage/groupDining.jpg", alt: "Group dining" },
    { src: "assets/galleryImage/discussion.webp", alt: "Discussion session" },
    { src: "assets/galleryImage/Activity.jpg", alt: "Activity on the lawn" },
    { src: "assets/galleryImage/groupDining.jpg", alt: "Group dining" },
    { src: "assets/galleryImage/discussion.webp", alt: "Discussion session" },
  ];

  return (
    <div>
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
          <source src={Hifi} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
      <Box
        sx={{
          backgroundColor: "#800080",
        //   backgroundImage: url(`${Hrms17}`),
          backgroundPosition: "center",

          backgroundSize: "cover",
          color: "#fff",
          py: 6,
          px: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",

            gap: 4,
          }}
        >
          <Grid container item lg={6} style={{ opacity: 0.8 }}>
            <Box
              sx={{
                // flex: "1 1 500px",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Arial, sans-serif" }}
              >
                The CEO Excel
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                Celebrate and share <br /> your success
              </Typography>
              <Typography sx={{ fontSize: "1rem", mb: 3, lineHeight: 1.6 }}>
                Join our flagship Executive of the Year Awards in global cities
                such as New York and Sydney or participate in our exclusive
                retreat. The CEO Events are your chance to pause, reflect and
                celebrate your journey.
              </Typography>

              <Grid
                component="form"
                container
                style={{
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  borderRadius: "50px",
                  padding: "5px",
                }}
              >
                <Grid>
                  <TextField
                    // fullWidth
                    variant="standard"
                    placeholder="Enter your email address"
                    required
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input": {
                        borderRadius: "50px",
                        py: 1,
                        px: 2,
                        fontSize: "1rem",
                      },
                    }}
                  />
                </Grid>
                <Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFD700",
                      color: "#fff",
                      borderRadius: "50px",
                      //   px: 4,
                      "&:hover": { backgroundColor: "#FFC107" },
                    }}
                  >
                    Register your interest
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          marginTop: "5vh",
        }}
      >
        <Paper
          sx={{
            maxWidth: "80%",
            mx: "auto",
            p: 3,
            textAlign: "center",
            backgroundColor: "#c5cae9",
          }}
        >
          <Typography variant="h6" sx={{ color: "#43a047", mb: 1 }}>
            Recognizing Excellence in Leadership
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2, color: "#2e7d32" }}
          >
            Discover Talent, Honor Achievements, and Build Connections
          </Typography>
          <Typography
            sx={{ fontSize: 16, lineHeight: 1.6, color: "#555", mb: 4 }}
          >
            Celebrate the individuals who inspire us every day with their
            dedication and leadership. This event aims to recognize the
            remarkable efforts of professionals who have made an enduring impact
            on their industries and communities.
          </Typography>

          {/* Image and Message Section */}
          <Card
            elevation={0}
            sx={{
              maxWidth: "60%",
              mx: "auto",
              backgroundColor: "#e8f5e9",
              borderRadius: 2,
            }}
          >
            <Grid container alignItems="center">
              {/* Image */}
              <Grid item xs={12} sm={5} lg={6}>
                <CardMedia
                  component="img"
                  image="path_to_your_image"
                  alt="Spotlight on excellence"
                  sx={{ borderRadius: "0 0 2px 2px", height: 385 }}
                />
              </Grid>

              {/* Message */}
              <Grid item xs={12} sm={7} lg={6}>
                <CardContent
                  sx={{
                    backgroundColor: "#f1f8e9",
                    borderRadius: "2px 2px 0 0",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 16,
                      lineHeight: 1.5,
                      color: "#444",
                      mt: 1,
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "70px", color: "#2e7d32" }}>
                      “
                    </span>
                    <span>
                      Recognition is not just about accolades but about{" "}
                    </span>
                    <strong>valuing the journey and contribution</strong> of
                    every leader. Platforms like these foster connections,
                    inspire innovation, and celebrate achievements that drive
                    industries forward.
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mt: 2 }}
                  >
                    Jane Doe
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666" }}>
                    Leadership Expert & Author
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Paper>
      </Box>

      <Box sx={{ p: 4, maxWidth: "1200px", mx: "auto" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          Discover the exclusive benefits of our Awards
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            mb: 4,
          }}
        >
          {awardsContent.map((item, index) => (
            <Button
              key={index}
              variant={activeTab === index ? "contained" : "outlined"}
              onClick={() => setActiveTab(index)}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                px: 3,
                bgcolor: activeTab === index ? "purple" : "white",
                color: activeTab === index ? "white" : "purple",
                borderColor: "purple",
                "&:hover": {
                  bgcolor: activeTab === index ? "darkpurple" : "white",
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" gutterBottom>
              {awardsContent[activeTab].title}
            </Typography>
            <Typography variant="body1" paragraph>
              {awardsContent[activeTab].description}
            </Typography>
            <Link
              href={awardsContent[activeTab].link}
              sx={{ fontWeight: "bold", color: "purple" }}
            >
              {awardsContent[activeTab].linkText}
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={awardsContent[activeTab].image}
              alt={awardsContent[activeTab].title}
              sx={{ borderRadius: "10px", boxShadow: 3, maxHeight: 300 }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center", padding: "20px" }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="text.primary"
          >
            Located in Prime Global Cities
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "50px", lineHeight: 1.6 }}
          >
            Attend our events in the world’s most vibrant cities. Following the
            groundbreaking success of our Sydney event, we’re bringing the
            energy to the iconic streets of New York City.
          </Typography>
          <Grid container spacing={4}>
            {images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={image.src}
                    alt={image.alt}
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Discover the exclusive benefits of our retreat
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ mb: 3 }}
        >
          {benefits.map((benefit, index) => (
            <Tab
              key={index}
              label={benefit.title}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            />
          ))}
        </Tabs>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {benefits[selectedTab].title}
            </Typography>
            <Typography>{benefits[selectedTab].content}</Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={benefits[selectedTab].image}
            alt={benefits[selectedTab].title}
            sx={{ flex: 1, borderRadius: 2, maxHeight: 400 }}
          />
        </Card>
      </Box>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "left", color: "#333" }}
        >
          EB360 Retreat Gallery
        </Typography>
        <Grid container spacing={4}>
          {galleryImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  image={image.src}
                  alt={image.alt}
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(to right, #ba4d90, #7e2e94)",
            color: "#fff",
            p: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: { md: "50%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h3" gutterBottom>
              Celebrate and share your success.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Our mission is to tell the stories of the businesspeople shaping
              our future.
            </Typography>
            <Grid
              component="form"
              container
              style={{
                backgroundColor: "white",
                justifyContent: "space-between",
                borderRadius: "50px",
                padding: "5px",
              }}
            >
              <Grid>
                <TextField
                  // fullWidth
                  variant="standard"
                  placeholder="Enter your email address"
                  required
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      borderRadius: "50px",
                      py: 1,
                      px: 2,
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFD700",
                    color: "#fff",
                    borderRadius: "50px",
                    //   px: 4,
                    "&:hover": { backgroundColor: "#FFC107" },
                  }}
                >
                  Register your interest
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: { xs: 4, md: 0 } }}>
            <img
              src="assets/successImage/award.jpg"
              alt="Award Celebration"
              style={{
                maxWidth: "800px",
                height: "300px",
                borderRadius: "5px",
                width: "100%",
              }}
            />
          </Box>
        </Box>

        {/* Legacy Section */}
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Turn your success into legacy with <br /> our digital magazine &
            community
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ mt: 7, flexDirection: { xs: "column", sm: "row" } }}
          >
            <Grid item>
              <Link
                href="#"
                underline="none"
                sx={{
                  display: "block",
                  textAlign: "center",
                  p: 2,
                  width: "100%",
                  maxWidth: 300,
                  backgroundColor: "#fff",
                  color: "#333",
                  border: "1px solid #333",
                  borderRadius: 1,
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "#333",
                    color: "#fff",
                  },
                }}
              >
                The CEO Magazine
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                underline="none"
                sx={{
                  display: "block",
                  textAlign: "center",
                  p: 2,
                  width: "100%",
                  maxWidth: 300,
                  color: "#f0c13f",
                  border: "1px solid #f0c13f",
                  borderRadius: 1,
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "#d6a52e",
                    color: "#fff",
                  },
                }}
              >
                The CEO Community
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default HeroSection;