async function fetchDataAndRenderChart(
  apiEndpoint,
  chartElementId,
  chartConfig
) {
  try {
    let response = await fetch(apiEndpoint);
    let data = await response.json();
    const ctx = document.getElementById(chartElementId).getContext("2d");
    new Chart(ctx, chartConfig(data));
  } catch (error) {
    console.error("Error fetching or rendering chart:", error);
  }
}

fetchDataAndRenderChart("/api/orders_over_time", "ordersChart", (data) => ({
  type: "line",
  data: {
    labels: data.dates,
    datasets: [
      {
        label: "Number of Orders",
        data: data.counts,
        // ... other configPython
      },
    ],
  },
  // ... other options
}));

fetchDataAndRenderChart("/api/low_stock_levels", "stockChart", (data) => ({
  type: "bar",
  data: {
    labels: data.products,
    datasets: [
      {
        label: "Low Stock",
        data: data.quantities,
        // ... other config
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: false, // This will hide the x-axis labels
      },
    },
  },
}));

fetchDataAndRenderChart(
  "/api/most_popular_products",
  "popularProductsChart",
  (data) => ({
    type: "bar",
    data: {
      labels: data.map((item) => item.product_name),
      datasets: [
        {
          label: "Quantity Sold",
          data: data.map((item) => item.total_quantity),
          // ... other config
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          display: false, // This will hide the x-axis labels
        },
      },
    },
  })
);

// Revenue Generation Chart
fetchDataAndRenderChart("/api/revenue_generation", "revenueChart", (data) => ({
  type: "line",
  data: {
    labels: data.dates,
    datasets: [
      {
        label: "Total Revenue",
        data: data.revenues,
        // ... other config
      },
    ],
  },
  // ... other options
}));

// Product Category Popularity Chart
fetchDataAndRenderChart(
  "/api/product_category_popularity",
  "categoryPopularityChart",
  (data) => ({
    type: "pie",
    data: {
      labels: data.categories,
      datasets: [
        {
          label: "Total Sales",
          data: data.sales,
          // ... other config
        },
      ],
    },
  })
);

// Payment Method Popularity Chart
fetchDataAndRenderChart(
  "/api/payment_method_popularity",
  "paymentMethodChart",
  (data) => ({
    type: "pie",
    data: {
      labels: data.methods,
      datasets: [
        {
          label: "Transaction Count",
          data: data.counts,
          // ... other config
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: false, // This will hide the x-axis labels
        },
      },
    },
  })
);

// Temperature Over Time Chart
fetchDataAndRenderChart(
  "/api/temperature_over_time",
  "temperatureChart",
  (data) => ({
    type: "line",
    data: {
      labels: data.daily.time,
      datasets: [
        {
          label: "Temperature (°C)",
          data: data.daily.temperature_2m_max,
          borderColor: "rgba(255, 0, 0, 1)",
          backgroundColor: "rgba(200, 0, 192, 0.2)",
          fill: false,
        },
      ],
    },
    // ... other options can be added as needed
  })
);


// Add custom tooltip and style options for charts
const customChartConfig = (data) => ({
  type: "line",
  data: {
    labels: data.dates,
    datasets: [
      {
        label: "Number of Orders",
        data: data.counts,
        borderColor: "#4CAF50", // Custom line color
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Gradient fill
        borderWidth: 2,
        tension: 0.4, // Smooth line
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: '#1a73e8',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
      legend: {
        position: "top",
        labels: {
          fontColor: '#333',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          fontColor: "#333",
        },
      },
      x: {
        ticks: {
          fontColor: "#333",
        },
      },
    },
  },
});

// Fetch data and render the Customer Retention Chart
fetch("/api/customer_retention")
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.date);
        const retentionData = data.map(item => item.retention_rate);

        const ctx = document.getElementById("customerRetentionChart").getContext("2d");
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Customer Retention Rate',
                    data: retentionData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category'
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

// Fetch data and render the Product Sales by Region Chart
fetch("/api/product_sales_by_region")
    .then(response => response.json())
    .then(data => {
        const regions = data.map(item => item.region);
        const sales = data.map(item => item.sales);

        const ctx = document.getElementById("productSalesChart").getContext("2d");
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: regions,
                datasets: [{
                    label: 'Sales by Region',
                    data: sales,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

// Fetch data and render the Shipping Time Over Time Chart
fetch("/api/shipping_time_over_time")
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.date);
        const shippingTimes = data.map(item => item.shipping_time);

        const ctx = document.getElementById("shippingTimeChart").getContext("2d");
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Shipping Time (days)',
                    data: shippingTimes,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category'
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

