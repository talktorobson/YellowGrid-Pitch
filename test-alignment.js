const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Load the local file
  await page.goto('file:///Users/20015403/Documents/PROJECTS/personal/YellowGrid-Pitch/index.html');
  
  // Wait for the grid to be visible
  await page.waitForSelector('.grid-layout');
  
  // Get all sidebar items
  const sidebarItems = await page.locator('.grid-sidebar-item').all();
  
  console.log('\n=== SIDEBAR ITEMS ===');
  for (let i = 0; i < sidebarItems.length; i++) {
    const box = await sidebarItems[i].boundingBox();
    const text = await sidebarItems[i].textContent();
    console.log(`${i}. ${text.trim()}: y=${box.y}, height=${box.height}`);
  }
  
  // Get header row
  const headerRow = await page.locator('.grid-header-row').boundingBox();
  console.log('\n=== GRID HEADER ===');
  console.log(`Header Row: y=${headerRow.y}, height=${headerRow.height}`);
  
  // Get all grid rows
  const gridRows = await page.locator('.grid-row').all();
  
  console.log('\n=== GRID ROWS ===');
  for (let i = 0; i < gridRows.length; i++) {
    const box = await gridRows[i].boundingBox();
    console.log(`Row ${i}: y=${box.y}, height=${box.height}`);
  }
  
  console.log('\n=== ALIGNMENT CHECK ===');
  // Compare positions
  const headerSidebar = await sidebarItems[0].boundingBox();
  console.log(`Header alignment: sidebar=${headerSidebar.y}, grid=${headerRow.y}, diff=${Math.abs(headerSidebar.y - headerRow.y)}`);
  
  const unassignedSidebar = await sidebarItems[1].boundingBox();
  const unassignedGrid = await gridRows[0].boundingBox();
  console.log(`Unassigned alignment: sidebar=${unassignedSidebar.y}, grid=${unassignedGrid.y}, diff=${Math.abs(unassignedSidebar.y - unassignedGrid.y)}`);
  
  for (let i = 0; i < 3 && i + 2 < sidebarItems.length && i + 1 < gridRows.length; i++) {
    const crewSidebar = await sidebarItems[i + 2].boundingBox();
    const crewGrid = await gridRows[i + 1].boundingBox();
    console.log(`Crew ${i + 1} alignment: sidebar=${crewSidebar.y}, grid=${crewGrid.y}, diff=${Math.abs(crewSidebar.y - crewGrid.y)}`);
  }
  
  // Keep browser open for visual inspection
  console.log('\nBrowser will stay open for 10 seconds...');
  await page.waitForTimeout(10000);
  
  await browser.close();
})();
