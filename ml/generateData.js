const fs = require('fs');
const path = require('path');

// Generate realistic e-commerce data
function generateEcommerceData() {
  const categories = [
    'Electronics', 'Home Appliances', 'Sports', 'Books', 
    'Home Decor', 'Kitchen', 'Furniture', 'Clothing',
    'Beauty', 'Toys', 'Garden', 'Automotive'
  ];
  
  const suppliers = Array.from({length: 50}, (_, i) => `SP${String(i + 1).padStart(3, '0')}`);
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
  
  let csvContent = 'product_id,product_name,category,price,quantity_sold,rating,stock_level,supplier_id,season,sales\n';
  
  for (let i = 1; i <= 1000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const productName = `${category} Product ${i}`;
    const price = parseFloat((Math.random() * 1000 + 10).toFixed(2));
    const quantitySold = Math.floor(Math.random() * 500);
    const rating = parseFloat((Math.random() * 4 + 1).toFixed(1));
    const stockLevel = Math.floor(Math.random() * 100);
    const supplierId = suppliers[Math.floor(Math.random() * suppliers.length)];
    const season = seasons[Math.floor(Math.random() * seasons.length)];
    const sales = Math.floor(quantitySold * (price * 0.8)); // Sales value
    
    csvContent += `${i},${productName},${category},${price},${quantitySold},${rating},${stockLevel},${supplierId},${season},${sales}\n`;
  }
  
  return csvContent;
}

// Generate logistics data
function generateLogisticsData() {
  let csvContent = 'order_id,product_id,distance_km,delivery_time_hours,traffic_level,weather_condition,season\n';
  
  const trafficLevels = ['light', 'moderate', 'heavy'];
  const weatherConditions = ['clear', 'cloudy', 'rainy', 'stormy'];
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
  
  for (let i = 1; i <= 1000; i++) {
    const productId = Math.floor(Math.random() * 1000) + 1;
    const distanceKm = Math.floor(Math.random() * 100) + 5;
    const trafficLevel = trafficLevels[Math.floor(Math.random() * trafficLevels.length)];
    const weatherCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const season = seasons[Math.floor(Math.random() * seasons.length)];
    
    // Calculate delivery time based on distance, traffic, and weather
    let baseTime = distanceKm * 0.8;
    let trafficMultiplier = trafficLevel === 'light' ? 1 : trafficLevel === 'moderate' ? 1.5 : 2;
    let weatherMultiplier = weatherCondition === 'clear' ? 1 : 
                           weatherCondition === 'cloudy' ? 1.2 : 
                           weatherCondition === 'rainy' ? 1.5 : 2;
    
    const deliveryTimeHours = Math.round(baseTime * trafficMultiplier * weatherMultiplier);
    
    csvContent += `${1000 + i},${productId},${distanceKm},${deliveryTimeHours},${trafficLevel},${weatherCondition},${season}\n`;
  }
  
  return csvContent;
}

// Generate sales data
function generateSalesData() {
  let csvContent = 'date,product_id,units_sold,revenue,discount_applied,promotion_type,season\n';
  
  const promotionTypes = ['none', 'sale', 'bundle', 'clearance'];
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
  
  // Generate data for 30 days
  for (let day = 1; day <= 30; day++) {
    const date = `2025-01-${String(day).padStart(2, '0')}`;
    
    // Generate sales for 100 products each day
    for (let i = 1; i <= 100; i++) {
      const productId = Math.floor(Math.random() * 1000) + 1;
      const unitsSold = Math.floor(Math.random() * 100) + 1;
      const price = parseFloat((Math.random() * 1000 + 10).toFixed(2));
      const revenue = parseFloat((unitsSold * price).toFixed(2));
      const discountApplied = Math.random() > 0.8 ? parseFloat((Math.random() * 0.3).toFixed(2)) : 0.0;
      const promotionType = promotionTypes[Math.floor(Math.random() * promotionTypes.length)];
      const season = seasons[Math.floor(Math.random() * seasons.length)];
      
      csvContent += `${date},${productId},${unitsSold},${revenue},${discountApplied},${promotionType},${season}\n`;
    }
  }
  
  return csvContent;
}

// Generate datasets
function generateDatasets() {
  console.log('Generating e-commerce dataset...');
  const ecommerceData = generateEcommerceData();
  fs.writeFileSync(path.join(__dirname, 'data', 'ecommerce_large.csv'), ecommerceData);
  console.log('E-commerce dataset generated (1000 products)');
  
  console.log('Generating logistics dataset...');
  const logisticsData = generateLogisticsData();
  fs.writeFileSync(path.join(__dirname, 'data', 'logistics_large.csv'), logisticsData);
  console.log('Logistics dataset generated (1000 orders)');
  
  console.log('Generating sales dataset...');
  const salesData = generateSalesData();
  fs.writeFileSync(path.join(__dirname, 'data', 'sales_large.csv'), salesData);
  console.log('Sales dataset generated (3000 records)');
  
  console.log('All datasets generated successfully!');
}

generateDatasets();