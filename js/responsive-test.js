// Responsive design testing utilities
(function() {
    'use strict';
    
    const ResponsiveTest = {
        // Common breakpoints to test
        breakpoints: {
            mobile: 320,
            mobileLarge: 480,
            tablet: 768,
            desktop: 1024,
            desktopLarge: 1200
        },
        
        // Test responsive behavior at different screen sizes
        testBreakpoints: function() {
            console.group('Responsive Breakpoint Testing');
            
            const originalWidth = window.innerWidth;
            const originalHeight = window.innerHeight;
            
            Object.entries(this.breakpoints).forEach(([name, width]) => {
                console.log(`Testing ${name} (${width}px):`);
                
                // Simulate viewport size (note: this doesn't actually resize the browser)
                this.simulateViewport(width, 600);
                
                // Check layout issues
                this.checkLayoutIssues(name, width);
            });
            
            console.log(`Original viewport: ${originalWidth}x${originalHeight}`);
            console.groupEnd();
        },
        
        // Simulate viewport for testing (visual indication only)
        simulateViewport: function(width, height) {
            // Add visual indicator for testing
            const indicator = document.getElementById('viewport-indicator') || document.createElement('div');
            indicator.id = 'viewport-indicator';
            indicator.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(199, 167, 88, 0.9);
                color: #000;
                padding: 5px 10px;
                border-radius: 3px;
                font-size: 12px;
                z-index: 10000;
                font-family: monospace;
            `;
            indicator.textContent = `Testing: ${width}x${height}`;
            
            if (!document.getElementById('viewport-indicator')) {
                document.body.appendChild(indicator);
            }
            
            // Remove after 3 seconds
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 3000);
        },
        
        // Check for common layout issues at different screen sizes
        checkLayoutIssues: function(breakpointName, width) {
            const issues = [];
            
            // Check for horizontal overflow
            const body = document.body;
            const html = document.documentElement;
            const scrollWidth = Math.max(body.scrollWidth, html.scrollWidth);
            const clientWidth = Math.max(body.clientWidth, html.clientWidth);
            
            if (scrollWidth > clientWidth + 5) { // 5px tolerance
                issues.push('Horizontal overflow detected');
            }
            
            // Check button sizes for touch targets
            const buttons = document.querySelectorAll('button, .poe-button');
            buttons.forEach(button => {
                const rect = button.getBoundingClientRect();
                if (width <= 768 && (rect.width < 44 || rect.height < 44)) {
                    issues.push(`Button too small for touch: ${rect.width}x${rect.height}`);
                }
            });
            
            // Check text readability
            const textElements = document.querySelectorAll('p, span, div');
            textElements.forEach(el => {
                const styles = window.getComputedStyle(el);
                const fontSize = parseFloat(styles.fontSize);
                if (width <= 480 && fontSize < 14) {
                    issues.push(`Text too small on mobile: ${fontSize}px`);
                }
            });
            
            // Check for elements that might be cut off
            const importantElements = document.querySelectorAll('.generator-section, .skill-display, .poe-button');
            importantElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
                    issues.push(`Element extends beyond viewport: ${el.className}`);
                }
            });
            
            if (issues.length > 0) {
                console.warn(`Issues at ${breakpointName}:`, issues);
            } else {
                console.log(`✓ No issues detected at ${breakpointName}`);
            }
            
            return issues;
        },
        
        // Test orientation changes
        testOrientationChange: function() {
            console.log('Testing orientation change handling...');
            
            // Simulate orientation change event
            const orientationEvent = new Event('orientationchange');
            window.dispatchEvent(orientationEvent);
            
            // Check if layout adapts properly
            setTimeout(() => {
                this.checkLayoutIssues('orientation-change', window.innerWidth);
            }, 100);
        },
        
        // Test touch interactions
        testTouchInteractions: function() {
            console.log('Testing touch interactions...');
            
            const touchElements = document.querySelectorAll('button, a, [onclick]');
            const issues = [];
            
            touchElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const styles = window.getComputedStyle(el);
                
                // Check minimum touch target size (44x44px recommended)
                if (rect.width < 44 || rect.height < 44) {
                    issues.push({
                        element: el,
                        issue: `Touch target too small: ${rect.width}x${rect.height}`,
                        recommendation: 'Increase padding or min-width/height'
                    });
                }
                
                // Check spacing between touch targets
                const siblings = Array.from(el.parentNode.children).filter(child => 
                    child !== el && (child.tagName === 'BUTTON' || child.tagName === 'A')
                );
                
                siblings.forEach(sibling => {
                    const siblingRect = sibling.getBoundingClientRect();
                    const distance = Math.min(
                        Math.abs(rect.right - siblingRect.left),
                        Math.abs(rect.left - siblingRect.right),
                        Math.abs(rect.bottom - siblingRect.top),
                        Math.abs(rect.top - siblingRect.bottom)
                    );
                    
                    if (distance < 8) { // 8px minimum spacing recommended
                        issues.push({
                            element: el,
                            issue: `Touch targets too close: ${distance}px apart`,
                            recommendation: 'Increase margin between interactive elements'
                        });
                    }
                });
            });
            
            if (issues.length > 0) {
                console.warn('Touch interaction issues:', issues);
            } else {
                console.log('✓ Touch interactions look good');
            }
            
            return issues;
        },
        
        // Test font scaling
        testFontScaling: function() {
            console.log('Testing font scaling...');
            
            const textElements = document.querySelectorAll('h1, h2, h3, p, button, span');
            const issues = [];
            
            textElements.forEach(el => {
                const styles = window.getComputedStyle(el);
                const fontSize = parseFloat(styles.fontSize);
                const lineHeight = parseFloat(styles.lineHeight);
                
                // Check if font size is reasonable
                if (fontSize < 12) {
                    issues.push({
                        element: el,
                        issue: `Font size too small: ${fontSize}px`,
                        recommendation: 'Increase font size for better readability'
                    });
                }
                
                // Check line height
                if (lineHeight && lineHeight < fontSize * 1.2) {
                    issues.push({
                        element: el,
                        issue: `Line height too small: ${lineHeight}px`,
                        recommendation: 'Increase line height for better readability'
                    });
                }
            });
            
            if (issues.length > 0) {
                console.warn('Font scaling issues:', issues);
            } else {
                console.log('✓ Font scaling looks good');
            }
            
            return issues;
        },
        
        // Generate responsive test report
        generateReport: function() {
            console.group('📱 Responsive Design Test Report');
            
            const report = {
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    devicePixelRatio: window.devicePixelRatio || 1
                },
                breakpointIssues: [],
                touchIssues: this.testTouchInteractions(),
                fontIssues: this.testFontScaling(),
                timestamp: new Date().toISOString()
            };
            
            // Test each breakpoint
            Object.entries(this.breakpoints).forEach(([name, width]) => {
                const issues = this.checkLayoutIssues(name, width);
                if (issues.length > 0) {
                    report.breakpointIssues.push({ breakpoint: name, width, issues });
                }
            });
            
            // Summary
            const totalIssues = report.breakpointIssues.length + 
                              report.touchIssues.length + 
                              report.fontIssues.length;
            
            if (totalIssues === 0) {
                console.log('✅ All responsive tests passed!');
            } else {
                console.warn(`⚠️ Found ${totalIssues} responsive design issues`);
            }
            
            console.log('Full Report:', report);
            console.groupEnd();
            
            return report;
        },
        
        // Add responsive debugging tools
        addDebugTools: function() {
            const debugPanel = document.createElement('div');
            debugPanel.id = 'responsive-debug';
            debugPanel.style.cssText = `
                position: fixed;
                bottom: 10px;
                left: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: #c7a758;
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 12px;
                z-index: 10000;
                max-width: 200px;
            `;
            
            const updateDebugInfo = () => {
                debugPanel.innerHTML = `
                    <strong>Viewport:</strong> ${window.innerWidth}x${window.innerHeight}<br>
                    <strong>DPR:</strong> ${window.devicePixelRatio || 1}<br>
                    <strong>Orientation:</strong> ${window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait'}<br>
                    <button onclick="ResponsiveTest.generateReport()" style="margin-top: 5px; padding: 2px 5px; font-size: 10px;">Test</button>
                `;
            };
            
            updateDebugInfo();
            document.body.appendChild(debugPanel);
            
            // Update on resize
            window.addEventListener('resize', updateDebugInfo);
            window.addEventListener('orientationchange', () => {
                setTimeout(updateDebugInfo, 100);
            });
            
            // Remove after 10 seconds
            setTimeout(() => {
                if (debugPanel.parentNode) {
                    debugPanel.parentNode.removeChild(debugPanel);
                }
            }, 10000);
        }
    };
    
    // Auto-run responsive tests
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                ResponsiveTest.generateReport();
                ResponsiveTest.addDebugTools();
            }, 1000);
        });
    } else {
        setTimeout(() => {
            ResponsiveTest.generateReport();
            ResponsiveTest.addDebugTools();
        }, 1000);
    }
    
    // Export for manual testing
    window.ResponsiveTest = ResponsiveTest;
})();