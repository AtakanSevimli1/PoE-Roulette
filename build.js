// Simple build script for performance optimization
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    minify: true,
    optimize: true,
    outputDir: 'dist'
};

// Create optimized HTML for production
function createOptimizedHTML() {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Replace CSS and JS references with minified versions
    let optimizedHTML = htmlContent
        .replace('css/styles.css', 'css/styles.min.css')
        .replace('js/app.js', 'js/app.min.js')
        .replace('js/data-service.js', 'js/data-service.min.js');
    
    // Add performance optimizations
    optimizedHTML = optimizedHTML.replace(
        '<head>',
        `<head>
    <!-- Performance optimizations -->
    <link rel="preload" href="css/styles.min.css" as="style">
    <link rel="preload" href="js/skills-data.js" as="script">
    <link rel="preload" href="js/random-selector.js" as="script">
    <link rel="preload" href="js/data-service.min.js" as="script">
    <link rel="preload" href="js/app.min.js" as="script">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">`
    );
    
    return optimizedHTML;
}

// Performance analysis
function analyzePerformance() {
    const files = [
        'css/styles.css',
        'css/styles.min.css',
        'js/app.js',
        'js/app.min.js',
        'js/data-service.js',
        'js/data-service.min.js'
    ];
    
    console.log('Performance Analysis:');
    console.log('====================');
    
    files.forEach(file => {
        if (fs.existsSync(file)) {
            const stats = fs.statSync(file);
            const sizeKB = (stats.size / 1024).toFixed(2);
            console.log(`${file}: ${sizeKB} KB`);
        }
    });
    
    // Calculate compression ratios
    const cssOriginal = fs.statSync('css/styles.css').size;
    const cssMinified = fs.statSync('css/styles.min.css').size;
    const cssReduction = ((cssOriginal - cssMinified) / cssOriginal * 100).toFixed(1);
    
    const jsOriginal = fs.statSync('js/app.js').size;
    const jsMinified = fs.statSync('js/app.min.js').size;
    const jsReduction = ((jsOriginal - jsMinified) / jsOriginal * 100).toFixed(1);
    
    console.log(`\nCompression Results:`);
    console.log(`CSS: ${cssReduction}% reduction`);
    console.log(`JS: ${jsReduction}% reduction`);
}

// Main build function
function build() {
    console.log('Building optimized version...');
    
    try {
        // Create optimized HTML
        const optimizedHTML = createOptimizedHTML();
        fs.writeFileSync('index.optimized.html', optimizedHTML);
        
        // Analyze performance
        analyzePerformance();
        
        console.log('\nBuild completed successfully!');
        console.log('Use index.optimized.html for production deployment.');
        
    } catch (error) {
        console.error('Build failed:', error);
    }
}

// Run build if called directly
if (require.main === module) {
    build();
}

module.exports = { build, analyzePerformance };