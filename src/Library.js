import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Button, TextField, Chip, Stack } from "@mui/material";

const resources = [
  {
    title: "Financial Literacy",
    description: "Learn the basics of budgeting, saving, investing, and personal finance tailored for Zambians.",
    link: "https://www.boz.zm/financial-literacy-week.htm",
    category: "Finance"
  },
  {
    title: "Taxes in Zambia",
    description: "Understand PAYE, VAT, and business taxes. Learn how to stay compliant with the Zambia Revenue Authority.",
    link: "https://www.zra.org.zm/",
    category: "Tax"
  },
  {
    title: "Business Law",
    description: "Get an overview of business registration, contracts, and company law in Zambia.",
    link: "https://www.pacra.org.zm/",
    category: "Law"
  },
  {
    title: "Zambian Economic Laws",
    description: "Explore laws and regulations that shape Zambia’s economy, including investment and employment acts.",
    link: "https://www.zambialii.org/",
    category: "Law"
  },
  {
    title: "Bank of Zambia Resources",
    description: "Access official publications, statistics, and economic reports from the Bank of Zambia.",
    link: "https://www.boz.zm/",
    category: "Economy"
  }
];

const categories = ["All", ...Array.from(new Set(resources.map(r => r.category)))];

const Library = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = resources.filter(res =>
    (selectedCategory === "All" || res.category === selectedCategory) &&
    (res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Knowledge Library
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Curated resources for young Zambian professionals and entrepreneurs.
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {categories.map(cat => (
          <Chip
            key={cat}
            label={cat}
            color={selectedCategory === cat ? "primary" : "default"}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </Stack>
      <TextField
        label="Search resources"
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Grid container spacing={4}>
        {filtered.map((res) => (
          <Grid item xs={12} sm={6} md={4} key={res.title}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography variant="h6">{res.title}</Typography>
                <Typography variant="body2" sx={{ my: 1 }}>{res.description}</Typography>
                <Button
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Typography sx={{ m: 4 }}>No resources found.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Library;