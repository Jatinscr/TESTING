import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Fab,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useScrollTrigger,
  Slide,
  Chip,
  useMediaQuery,
  Link,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Menu,
  Close,
  ArrowUpward,
  Email,
  Phone,
  LocationOn,
  Computer,
  Security,
  Cloud,
  Storage,
  Settings,
  People,
  Star,
  CheckCircle,
  Dashboard,
  Code,
  Devices,
  Send,
  ChevronRight,
  EmojiEvents,
  Business,
  History,
  Group,
  AttachMoney,
} from "@mui/icons-material";

// First define breakpoints separately
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// Light modern theme with professional color scheme
const theme = createTheme({
  breakpoints,
  palette: {
    mode: "light",
    primary: {
      main: "#1a3a6f",
      light: "#2a4a8f",
      dark: "#0a2a5f",
    },
    secondary: {
      main: "#4a7bff",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    h1: {
      fontWeight: 800,
      fontSize: "3.5rem",
      letterSpacing: "-0.02em",
      color: "#1a3a6f",
      [breakpoints.values.md]: {
        fontSize: "2.5rem",
      },
      [breakpoints.values.sm]: {
        fontSize: "2rem",
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: "-0.015em",
      color: "#1a3a6f",
      [breakpoints.values.md]: {
        fontSize: "2rem",
      },
      [breakpoints.values.sm]: {
        fontSize: "1.75rem",
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "-0.01em",
      color: "#1a3a6f",
      [breakpoints.values.sm]: {
        fontSize: "1.5rem",
      },
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.5rem",
      color: "#1a3a6f",
      [breakpoints.values.sm]: {
        fontSize: "1.25rem",
      },
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    body1: {
      color: "#4a5568",
      [breakpoints.values.sm]: {
        fontSize: "0.875rem",
      },
    },
    body2: {
      color: "#718096",
      [breakpoints.values.sm]: {
        fontSize: "0.875rem",
      },
    },
    h6: {
      [breakpoints.values.sm]: {
        fontSize: "1rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
          [breakpoints.values.sm]: {
            padding: "8px 16px",
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          background: "#ffffff",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 32px rgba(74, 123, 255, 0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            background: "#ffffff",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(74, 123, 255, 0.2)",
        },
      },
    },
  },
});

// Custom shape component for decorative elements
const Shape = ({ color, size, position, rotation }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const actualSize = isSmall ? size / 1.5 : size;

  return (
    <Box
      sx={{
        position: "absolute",
        width: actualSize,
        height: actualSize,
        borderRadius: "50%",
        background: color,
        opacity: 0.15,
        ...position,
        transform: `rotate(${rotation}deg)`,
        zIndex: -1,
        display: { xs: "none", sm: "block" }, // Hide on smallest screens
      }}
    />
  );
};

// Custom Logo component with modern look
const BrandLogo = ({ size = 40 }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      mr: 2,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
      },
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: 900,
        color: theme.palette.secondary.main, // Changed to secondary color
        lineHeight: 1,
        letterSpacing: "1px",
        fontSize: { xs: "1.1rem", sm: "1.25rem" },
        textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
    >
      SAINI
    </Typography>
    <Typography
      variant="body1"
      sx={{
        fontWeight: 600,
        color: theme.palette.primary.light, // Lighter primary color
        letterSpacing: "4px",
        textTransform: "uppercase",
        mt: "-2px",
        fontSize: { xs: "0.5rem", sm: "0.7rem" },
        transition: "all 0.3s ease",
        opacity: 0.8,
      }}
    >
      COLLECTION
    </Typography>
  </Box>
);

// Navigation bar component
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Services", id: "services" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 280,
        padding: "20px 0",
        background: "#ffffff",
        height: "100%",
        color: theme.palette.primary.main,
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            sx={{ py: 1.5 }}
          >
            <ChevronRight sx={{ mr: 1, color: theme.palette.secondary.main }} />
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{
                fontWeight: 500,
                color: theme.palette.primary.main,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "transparent",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          color: theme.palette.primary.main,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BrandLogo />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  color="inherit"
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    mx: 1,
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => scrollToSection("contact")}
                sx={{ ml: 2 }}
              >
                Join For Services
              </Button>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: { md: "none" },
                color: theme.palette.primary.main,
              }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: "none" } }}
        PaperProps={{
          sx: {
            width: isMobile ? "100%" : "280px",
            maxWidth: "100vw",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            background: "rgba(255, 255, 255, 0.9)",
            height: "auto",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: theme.palette.primary.main }}
          >
            <Close />
          </IconButton>
        </Box>
        {drawer}
      </Drawer>
    </>
  );
}

// Scroll to top button
function ScrollTop() {
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Slide in={trigger} direction="up">
      <Fab
        color="secondary"
        size="medium"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          boxShadow: `0 0 15px ${theme.palette.secondary.main}`,
          [theme.breakpoints.down("sm")]: {
            bottom: 16,
            right: 16,
            width: 40,
            height: 40,
          },
        }}
      >
        <ArrowUpward />
      </Fab>
    </Slide>
  );
}

// Hero Section
function Hero() {
  return (
    <Box
      id="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: `linear-gradient(135deg, #e6f0ff 0%, #ffffff 100%)`,
        color: theme.palette.primary.main,
        position: "relative",
        pt: { xs: 16, md: 24 },
        pb: { xs: 6, md: 12 },
        overflow: "hidden",
      }}
    >
      {/* Decorative shapes */}
      <Shape
        color={theme.palette.secondary.main}
        size={600}
        position={{ top: "-10%", right: "-5%" }}
        rotation={45}
      />
      <Shape
        color={theme.palette.secondary.main}
        size={400}
        position={{ bottom: "10%", left: "5%" }}
        rotation={120}
      />
      <Shape
        color="#a0aec0"
        size={300}
        position={{ top: "30%", left: "15%" }}
        rotation={0}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Shape
          color={theme.palette.secondary.main}
          size={500}
          position={{ left: "800px" }}
          rotation={0}
        />
        <Shape
          color={theme.palette.secondary.main}
          size={400}
          position={{ top: "20%", left: "700px" }}
          rotation={0}
        />

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
            <Chip
              label="IT Services & Solutions"
              color="secondary"
              sx={{
                px: 1.9,
                fontWeight: 800,
                boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
                color: "#ffffff",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            />
            <Typography variant="h1" gutterBottom sx={{ pt: 2 }}>
              We Build{" "}
              <Box
                component="span"
                sx={{ color: theme.palette.secondary.main }}
              >
                {" "}
                Websites & Digital Tools{" "}
              </Box>{" "}
              That Grow Your Business
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 300,
                color: theme.palette.primary.light,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              We are a young development startup helping individuals &
              businesses get online with modern websites, custom tools, and
              digital solutions
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", pt: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() =>
                  document
                    .getElementById("services")
                    .scrollIntoView({ behavior: "smooth" })
                }
                sx={{
                  px: { xs: 4, md: 6 },
                  fontWeight: 700,
                }}
              >
                Our Services
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                sx={{
                  px: { xs: 4, md: 7 },
                  fontWeight: 700,
                  borderWidth: 2,
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                  "&:hover": {
                    borderWidth: 2,
                    backgroundColor: "rgba(26, 58, 111, 0.05)",
                  },
                }}
              >
                Contact For Join Us
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            order={{ xs: 1, md: 2 }}
            sx={{
              display: { xs: "none", md: "flex" }, // Hide on mobile, show on desktop
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                border: `1px solid ${theme.palette.primary.light}`,
                width: "100%",
                height: "500px",
                maxHeight: "100%",
              }}
            >
              <CardMedia
                component="img"
                image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Modern web development and IT solutions by SAINI COLLECTION"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(to top, rgba(26,58,111,0.9) 0%, transparent 100%)",
                  color: "#fff",
                  p: 4,
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    color: "#ffffff",
                    fontSize: "2rem",
                  }}
                >
                  <Star sx={{ mr: 1 }} />
                  Why Choose Us?
                </Typography>
                <List>
                  {[
                    "Modern & Clean Design — Websites that look professional & fresh.",
                    "Full Stack Expertise — Frontend & Backend, everything covered.",
                    "Affordable & Transparent — No hidden costs, clear pricing.",
                    "Support & Growth — We grow with you, whenever you need us.",
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <CheckCircle
                        sx={{
                          fontSize: 18,
                          color: theme.palette.secondary.main,
                          mr: 1.5,
                        }}
                      />
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          variant: "body1",
                          fontWeight: 300,
                          color: "#ffffff",
                          fontSize: "1rem",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function AboutCompany() {
  return (
    <Box
      id="about"
      sx={{
        py: { xs: 6, md: 10 },
        background: "#f0f7ff",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            About{" "}
            <Box component="span" sx={{ color: theme.palette.secondary.main }}>
              SAINI COLLECTION
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.light,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            New beginnings, big ideas — we craft websites & digital tools that
            help you grow online with ease
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 6 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                background: "#ffffff",
                boxShadow: "0 15px 40px rgba(74, 123, 255, 0.15)",
                border: "1px solid rgba(74, 123, 255, 0.2)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: theme.palette.primary.main }}
                >
                  Our Journey
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    color: theme.palette.text.primary,
                    lineHeight: 1.8,
                  }}
                >
                  Saini Collection started with a simple idea — to make good
                  design & development accessible for everyone. From a small
                  team with big dreams, we're now on our way to help individuals
                  & businesses build their online presence with confidence.
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "rgba(26, 58, 111, 0.05)",
                    borderRadius: 3,
                    p: 3,
                    mt: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ mb: 2, color: theme.palette.primary.main }}
                  >
                    Our Mission
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.primary,
                      fontStyle: "italic",
                    }}
                  >
                    "Our mission is to deliver modern, clean, and reliable
                    digital solutions that help people grow. We believe in clear
                    communication, affordable service, and building trust with
                    every project we deliver.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                background: "#ffffff",
                boxShadow: "0 15px 40px rgba(74, 123, 255, 0.15)",
                border: "1px solid rgba(74, 123, 255, 0.2)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Grid container spacing={{ xs: 2, md: 8 }} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <History
                        sx={{
                          fontSize: { xs: 30, md: 40 },
                          color: theme.palette.secondary.main,
                          mr: 2,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                          }}
                        >
                          Fresh Start
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          Innovative approach
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Group
                        sx={{
                          fontSize: { xs: 30, md: 40 },
                          color: theme.palette.secondary.main,
                          mr: 2,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                          }}
                        >
                          Young Team
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          Passionate developers
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <EmojiEvents
                        sx={{
                          fontSize: { xs: 30, md: 40 },
                          color: theme.palette.secondary.main,
                          mr: 2,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                          }}
                        >
                          Quality First
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          Focused on results
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Business
                        sx={{
                          fontSize: { xs: 30, md: 40 },
                          color: theme.palette.secondary.main,
                          mr: 2,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                          }}
                        >
                          Customer Care
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          We grow with you
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 4, md: 10 }, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ mb: 4, color: theme.palette.primary.main }}
          >
            Why Choose SAINI COLLECTION?
          </Typography>

          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 3,
              py: 2,
              px: 1,
              scrollbarWidth: "none", // Hide scrollbar for Firefox
              "&::-webkit-scrollbar": {
                // Hide scrollbar for Chrome/Safari
                display: "none",
              },
            }}
          >
            {[
              {
                title: "Creative Minds",
                description:
                  "A young team with fresh ideas & clean, modern designs.",
                icon: (
                  <People
                    sx={{ fontSize: 40, color: theme.palette.secondary.main }}
                  />
                ),
              },
              {
                title: "Custom Solutions",
                description:
                  "We build websites & tools exactly how you need them",
                icon: (
                  <Settings
                    sx={{ fontSize: 40, color: theme.palette.secondary.main }}
                  />
                ),
              },
              {
                title: "Friendly Support",
                description: "Clear communication & help whenever you need us",
                icon: (
                  <Computer
                    sx={{ fontSize: 40, color: theme.palette.secondary.main }}
                  />
                ),
              },
              {
                title: "Modern Technology",
                description:
                  "We use the latest tech for smooth & secure websites.",
                icon: (
                  <Devices
                    sx={{ fontSize: 40, color: theme.palette.secondary.main }}
                  />
                ),
              },
              {
                title: "Affordable Pricing",
                description:
                  "Quality work at reasonable prices, perfect for growing businesses.",
                icon: (
                  <AttachMoney
                    sx={{ fontSize: 40, color: theme.palette.secondary.main }}
                  />
                ),
              },
            ].map((item, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: 280,
                  flexShrink: 0,
                  height: "100%",
                  background: "#ffffff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(74, 123, 255, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 30px rgba(74, 123, 255, 0.2)",
                  },
                }}
              >
                <CardContent sx={{ p: 3, textAlign: "center", height: "100%" }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      mx: "auto",
                      background: "rgba(74, 123, 255, 0.1)",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ mb: 2, color: theme.palette.primary.main }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() =>
              document
                .getElementById("services")
                .scrollIntoView({ behavior: "smooth" })
            }
            sx={{ mt: { xs: 4, md: 6 }, px: 6, fontWeight: 700 }}
          >
            Explore And Join Our Services
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// Services Section
function Services() {
  const services = [
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Website Design",
      description:
        "We design modern, clean & responsive websites that look great on any device.",
      features: [
        "Custom Designs",
        "Responsive Layouts",
        "User Experience Focused",
      ],
    },
    {
      icon: <Cloud sx={{ fontSize: 40 }} />,
      title: "Frontend & Backend Development",
      description:
        "We handle the full development process — frontend design & backend logic that works perfectly together.",
      features: [
        "Clean & maintainable code",
        "Secure databases & APIs",
        "Modern Optimization",
      ],
    },
    {
      icon: <Storage sx={{ fontSize: 40 }} />,
      title: "Maintenance & Support",
      description:
        "Comprehensive maintenance and support services to ensure your systems run smoothly.",
      features: [
        "Regular Updates",
        "Performance Monitoring",
        "Technical Support",
      ],
    },
    {
      icon: <Settings sx={{ fontSize: 40 }} />,
      title: "E-commerce Solutions",
      description:
        "We build easy-to-manage online stores to help you sell your products or services smoothly.",
      features: [
        "Secure payment integration  ",
        "Inventory Management",
        "User-friendly interfaces",
      ],
    },
    {
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      title: "Branding & UI Design",
      description:
        "We help you build a strong brand identity with clean UI designs & appealing visuals.",
      features: ["Brand Strategy", "Visual Identity", "User Experience Design"],
    },
    {
      icon: <Code sx={{ fontSize: 40 }} />,
      title: "Software Development",
      description:
        "Custom software solutions designed to solve your unique business challenges.",
      features: ["Web Applications", "Mobile Apps", "Enterprise Software"],
    },
  ];

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 6, md: 10 },
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Decorative shapes */}
      <Shape
        color={theme.palette.secondary.main}
        size={500}
        position={{ top: "10%", right: "-5%" }}
        rotation={0}
      />
      <Shape
        color={theme.palette.secondary.main}
        size={500}
        position={{ top: "20%", right: "-10%" }}
        rotation={0}
      />
      <Shape
        color={theme.palette.secondary.main}
        size={400}
        position={{ bottom: "20%", left: "-5%" }}
        rotation={60}
      />
      <Shape
        color={theme.palette.secondary.main}
        size={400}
        position={{ bottom: "30%", left: "-10%" }}
        rotation={60}
      />

      <Container maxWidth="xl">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 700,
            mx: "auto",
            mb: { xs: 4, md: 8 },
          }}
        >
          <Typography variant="h2" gutterBottom>
            Our{" "}
            <Box component="span" sx={{ color: theme.palette.secondary.main }}>
              IT Services
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.light }}>
            Comprehensive IT solutions designed to optimize your business
            operations and drive growth
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  maxWidth: "350px",
                  mx: "auto",
                  display: "flex",
                  flexDirection: "column",
                  background: "#ffffff",
                  border: `1px solid ${theme.palette.primary.light}`,
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      background: theme.palette.primary.light,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      flexGrow: 1,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {service.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {service.features.map((feature, i) => (
                      <Chip
                        key={i}
                        label={feature}
                        size="small"
                        sx={{
                          mr: 1,
                          mb: 1,
                          background: "rgba(74, 123, 255, 0.1)",
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "0.75rem", md: "0.875rem" },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      role: "Freelancer",
      content:
        "Working with SAINI COLLECTION was smooth and quick. They built my portfolio site exactly how I wanted. Great experience for a new freelancer like me.",
      rating: 5,
    },
    {
      name: "Priya Mehra",
      role: "Small Business Owner",
      content:
        "As a small business, we needed an affordable website. Their team delivered a beautiful site within budget and explained everything clearly.",
      rating: 5,
    },
    {
      name: "Ankit Verma",
      role: "Startup Founder",
      content:
        "Saini Collection helped us launch our startup website fast. Their design and support made it easy for us to get online and start growing.",
      rating: 5,
    },
  ];

  return (
    <Box
      id="testimonials"
      sx={{
        py: { xs: 6, md: 10 },
        background: "linear-gradient(to bottom, #f0f4f9, #e6f0ff)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 700,
            mx: "auto",
            mb: { xs: 4, md: 8 },
          }}
        >
          <Typography variant="h2" gutterBottom>
            Client{" "}
            <Box component="span" sx={{ color: theme.palette.secondary.main }}>
              Testimonials
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.light }}>
            Hear from people who trusted our work and saw results
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  background: "#ffffff",
                  color: theme.palette.primary.main,
                  display: "flex",
                  flexDirection: "column",
                  border: `1px solid ${theme.palette.primary.light}`,
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }}>
                  <Box sx={{ display: "flex", mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{ color: "#ffd700", fontSize: 20, mr: 0.5 }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontStyle: "italic",
                      color: theme.palette.text.primary,
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    }}
                  >
                    "{testimonial.content}"
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 3,
                    borderTop: `1px solid ${theme.palette.primary.light}`,
                    background: "rgba(26, 58, 111, 0.05)",
                  }}
                >
                  {/* Avatar removed */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        fontSize: { xs: "1rem", md: "1.25rem" },
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.primary.light }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Contact Section
// (Removed duplicate imports for Box, Container, Grid, Typography, TextField, Button, useMediaQuery, useTheme, Email, Phone, LocationOn)

/* Removed duplicate import of React and useState */

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });

  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", message: "", service: "" });
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 6, md: 10 },
        background: "#ffffff",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            color: theme.palette.primary.main,
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              width: 80,
              height: 4,
              background: theme.palette.secondary.main,
              margin: "16px auto 0",
              borderRadius: 2,
            },
          }}
        >
          Get in Touch
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" }, // Only stack on extra small screens
            gap: 4,
            alignItems: "stretch",
          }}
        >
          {/* Contact Information Box */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 4,
              background: "rgba(234, 241, 255, 0.5)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.palette.primary.light}`,
              minWidth: 0, // Prevent overflow
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: theme.palette.secondary.main,
                }}
              />
              Contact Information
            </Typography>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}
            >
              {[
                {
                  icon: (
                    <Email
                      sx={{ color: theme.palette.secondary.main, fontSize: 28 }}
                    />
                  ),
                  title: "Email",
                  content: "info@sainicollection.com",
                },
                {
                  icon: (
                    <Phone
                      sx={{ color: theme.palette.secondary.main, fontSize: 28 }}
                    />
                  ),
                  title: "Phone",
                  content: "+91-8700274294",
                },
                {
                  icon: (
                    <LocationOn
                      sx={{ color: theme.palette.secondary.main, fontSize: 28 }}
                    />
                  ),
                  title: "Location",
                  content:
                    "Saini Collection, Mahavir Pura , Gurgaon(Haryana), India",
                },
              ].map((item, index) => (
                <Box key={index} sx={{ display: "flex", gap: 3 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "rgba(74, 123, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {item.content}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(26, 58, 111, 0.03)",
                border: `1px solid ${theme.palette.primary.light}`,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: theme.palette.primary.main,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: theme.palette.secondary.main,
                  }}
                />
                Business Hours
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {[
                  "Monday - Friday: 9:00 AM - 6:00 PM",
                  "Saturday: Friday: 9:00 AM - 6:00 PM",
                  "Sunday: Closed",
                ].map((item, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: theme.palette.secondary.main,
                      }}
                    />
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Contact Form Box */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 4,
              background: "#ffffff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: `1px solid ${theme.palette.primary.light}`,
              minWidth: 0, // Prevent overflow
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: theme.palette.secondary.main,
                }}
              />
              Send us a message
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Box sx={{ width: "100%" }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Service Interested In"
                      variant="outlined"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      SelectProps={{ native: true }}
                    >
                      <option value=""></option>
                      <option value="web-design">Website Design</option>
                      <option value="frontend-backend">
                        Frontend & Backend Development
                      </option>
                      <option value="custom-tools">Custom Tools</option>
                      <option value="maintenance">Website Maintenance</option>
                      <option value="ecommerce">E-commerce Solutions</option>
                    </TextField>
                  </Grid>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      variant="outlined"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Box>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      mt: 1,
                    }}
                  >
                    Submit Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// export default Contact;

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a2e",
        color: "#e6f1ff",
        py: 4,
        borderTop: "1px solid rgba(100, 255, 218, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
          {/* Brand Column - Compact Design */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <BrandLogo
                sx={{
                  color: "#64ffda",
                  mb: 1.5,
                  fontSize: "1.8rem",
                  fontWeight: 700,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#8892b0",
                  lineHeight: 1.6,
                  mb: 2,
                  fontSize: "0.85rem",
                }}
              >
                Driving digital growth with creativity, technology, and care —
                since 2025.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  mt: "auto",
                  flexWrap: "wrap",
                }}
              >
                {["facebook", "twitter", "linkedin", "instagram"].map(
                  (network) => (
                    <IconButton
                      key={network}
                      aria-label={network}
                      sx={{
                        width: 36,
                        height: 36,
                        backgroundColor: "rgba(100, 255, 218, 0.1)",
                        color: "secondary.main",
                        "&:hover": {
                          backgroundColor: "rgba(100, 255, 218, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <span
                        className={`fab fa-${network}`}
                        style={{ fontSize: "1rem" }}
                      />
                    </IconButton>
                  )
                )}
              </Box>
            </Box>
          </Grid>

          {/* Compact Links Grid */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1.5,
                color: "#ccd6f6",
                fontSize: "0.9rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { label: "About Us", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact", href: "#contact" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  underline="none"
                  sx={{
                    color: "#8892b0",
                    fontSize: "0.85rem",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "secondary.main",
                      paddingLeft: "4px",
                    },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Compact Contact Info */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1.5,
                color: "#ccd6f6",
                fontSize: "0.9rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email sx={{ color: "secondary.main", fontSize: "1rem" }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#8892b0", fontSize: "0.85rem" }}
                >
                  info@sainicollection.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone sx={{ color: "secondary.main", fontSize: "1rem" }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#8892b0", fontSize: "0.85rem" }}
                >
                  +91 8700274294
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Compact Newsletter */}
          <Grid item xs={12} sm={12} md={4}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1.5,
                  color: "#ccd6f6",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Newsletter
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#8892b0",
                  fontSize: "0.85rem",
                  mb: 1.5,
                }}
              >
                Get the latest updates and offers.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  variant="outlined"
                  placeholder="Email"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#e6f1ff",
                      fontSize: "0.85rem",
                      height: 36,
                      backgroundColor: "rgba(100, 255, 218, 0.05)",
                      "& fieldset": {
                        borderColor: "rgba(100, 255, 218, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(100, 255, 218, 0.3)",
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    minWidth: "auto",
                    px: 2,
                    backgroundColor: "secondary.main",
                    color: "#1a1a2e",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                  }}
                >
                  <Send sx={{ fontSize: "1rem" }} />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Copyright Row - Compact */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            mt: 4,
            pt: 3,
            borderTop: "1px solid rgba(100, 255, 218, 0.1)",
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#495670",
              fontSize: "0.75rem",
            }}
          >
            {new Date().getFullYear()} Crafting ideas into reality — © 2025
            SAINI COLLECTION.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={{
                  color: "#495670",
                  fontSize: "0.75rem",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "secondary.main",
                  },
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// Main App Component
function SainicollectionIT() {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>SAINI COLLECTION | IT Services</title>
        <meta
          name="description"
          content="Professional IT services and web development solutions. We build modern websites, custom digital tools, and provide comprehensive IT services to grow your business."
        />
        <meta
          name="keywords"
          content="IT services, web development, website design, custom software, digital solutions, frontend development, backend development"
        />
        <meta
          property="og:title"
          content="SAINI COLLECTION | IT Services & Web Development Solutions"
        />
        <meta
          property="og:description"
          content="Professional IT services and web development solutions for businesses and individuals."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.sainicollection.com/" />
      </Helmet>
      <CssBaseline />
      <Navbar />
      <main>
        <Hero />
        <AboutCompany />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />

      {/* Font Awesome for social icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style jsx global>{`
        body {
          overflow-x: hidden;
          background-color: ${theme.palette.background.default};
          color: ${theme.palette.text.primary};
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme.palette.secondary.main};
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3a6eff;
        }
        .fab {
          font-size: 1.25rem;
        }
      `}</style>
    </ThemeProvider>
  );
}

export default SainicollectionIT;
