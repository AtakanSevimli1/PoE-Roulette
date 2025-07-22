// Accessibility testing utilities
(function() {
    'use strict';
    
    const AccessibilityTest = {
        // Color contrast testing
        colorContrast: {
            // Calculate relative luminance
            getLuminance: function(r, g, b) {
                const [rs, gs, bs] = [r, g, b].map(c => {
                    c = c / 255;
                    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
                });
                return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
            },
            
            // Calculate contrast ratio
            getContrastRatio: function(color1, color2) {
                const lum1 = this.getLuminance(...color1);
                const lum2 = this.getLuminance(...color2);
                const brightest = Math.max(lum1, lum2);
                const darkest = Math.min(lum1, lum2);
                return (brightest + 0.05) / (darkest + 0.05);
            },
            
            // Parse RGB color from string
            parseColor: function(colorStr) {
                if (colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') {
                    return null;
                }
                
                // Handle rgb() and rgba()
                const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (rgbMatch) {
                    return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
                }
                
                // Handle hex colors
                const hexMatch = colorStr.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
                if (hexMatch) {
                    return [
                        parseInt(hexMatch[1], 16),
                        parseInt(hexMatch[2], 16),
                        parseInt(hexMatch[3], 16)
                    ];
                }
                
                // Handle named colors (basic set)
                const namedColors = {
                    'black': [0, 0, 0],
                    'white': [255, 255, 255],
                    'red': [255, 0, 0],
                    'green': [0, 128, 0],
                    'blue': [0, 0, 255]
                };
                
                return namedColors[colorStr.toLowerCase()] || null;
            },
            
            // Test contrast for an element
            testElement: function(element) {
                const styles = window.getComputedStyle(element);
                const textColor = this.parseColor(styles.color);
                const bgColor = this.parseColor(styles.backgroundColor);
                
                if (!textColor || !bgColor) {
                    return null; // Can't test transparent backgrounds
                }
                
                const ratio = this.getContrastRatio(textColor, bgColor);
                const fontSize = parseFloat(styles.fontSize);
                const fontWeight = styles.fontWeight;
                
                // WCAG AA standards
                const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700));
                const minRatio = isLargeText ? 3 : 4.5;
                const aaaPassed = ratio >= (isLargeText ? 4.5 : 7);
                
                return {
                    ratio: ratio,
                    passed: ratio >= minRatio,
                    aaaPassed: aaaPassed,
                    isLargeText: isLargeText,
                    textColor: textColor,
                    bgColor: bgColor
                };
            }
        },
        
        // Keyboard navigation testing
        keyboardNavigation: {
            // Get all focusable elements
            getFocusableElements: function() {
                const selector = [
                    'a[href]',
                    'button:not([disabled])',
                    'input:not([disabled])',
                    'select:not([disabled])',
                    'textarea:not([disabled])',
                    '[tabindex]:not([tabindex="-1"])',
                    'details summary',
                    '[contenteditable="true"]'
                ].join(', ');
                
                return Array.from(document.querySelectorAll(selector))
                    .filter(el => {
                        // Filter out hidden elements
                        const styles = window.getComputedStyle(el);
                        return styles.display !== 'none' && 
                               styles.visibility !== 'hidden' && 
                               el.offsetParent !== null;
                    });
            },
            
            // Test tab order
            testTabOrder: function() {
                const focusableElements = this.getFocusableElements();
                const issues = [];
                
                focusableElements.forEach((el, index) => {
                    const tabIndex = el.tabIndex;
                    
                    // Check for positive tabindex (generally not recommended)
                    if (tabIndex > 0) {
                        issues.push({
                            element: el,
                            issue: `Positive tabindex (${tabIndex}) found`,
                            recommendation: 'Use natural tab order or tabindex="0"'
                        });
                    }
                    
                    // Check for missing focus indicators
                    const styles = window.getComputedStyle(el, ':focus');
                    if (styles.outline === 'none' && !styles.boxShadow.includes('rgba')) {
                        issues.push({
                            element: el,
                            issue: 'Missing focus indicator',
                            recommendation: 'Add visible focus styles'
                        });
                    }
                });
                
                return {
                    focusableCount: focusableElements.length,
                    issues: issues
                };
            },
            
            // Simulate keyboard navigation
            simulateKeyboardNavigation: function() {
                const focusableElements = this.getFocusableElements();
                let currentIndex = 0;
                
                console.log(`Found ${focusableElements.length} focusable elements`);
                
                const highlightElement = (element) => {
                    // Remove previous highlights
                    document.querySelectorAll('.a11y-highlight').forEach(el => {
                        el.classList.remove('a11y-highlight');
                    });
                    
                    // Add highlight to current element
                    element.classList.add('a11y-highlight');
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    console.log(`Focus on: ${element.tagName} - ${element.textContent?.slice(0, 50) || element.getAttribute('aria-label') || 'No text'}`);
                };
                
                // Add CSS for highlighting
                if (!document.getElementById('a11y-highlight-styles')) {
                    const style = document.createElement('style');
                    style.id = 'a11y-highlight-styles';
                    style.textContent = `
                        .a11y-highlight {
                            outline: 3px solid #ff6600 !important;
                            outline-offset: 2px !important;
                            box-shadow: 0 0 0 6px rgba(255, 102, 0, 0.3) !important;
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Start simulation
                if (focusableElements.length > 0) {
                    highlightElement(focusableElements[0]);
                    
                    // Auto-advance through elements
                    const interval = setInterval(() => {
                        currentIndex = (currentIndex + 1) % focusableElements.length;
                        highlightElement(focusableElements[currentIndex]);
                        
                        if (currentIndex === 0) {
                            clearInterval(interval);
                            // Clean up after demonstration
                            setTimeout(() => {
                                document.querySelectorAll('.a11y-highlight').forEach(el => {
                                    el.classList.remove('a11y-highlight');
                                });
                            }, 2000);
                        }
                    }, 1500);
                }
            }
        },
        
        // Screen reader compatibility testing
        screenReader: {
            // Check for proper heading structure
            testHeadingStructure: function() {
                const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
                const issues = [];
                
                if (headings.length === 0) {
                    issues.push({
                        issue: 'No headings found',
                        recommendation: 'Add proper heading structure for screen readers'
                    });
                    return { issues };
                }
                
                // Check for h1
                const h1Count = headings.filter(h => h.tagName === 'H1').length;
                if (h1Count === 0) {
                    issues.push({
                        issue: 'No H1 heading found',
                        recommendation: 'Add a main H1 heading to the page'
                    });
                } else if (h1Count > 1) {
                    issues.push({
                        issue: `Multiple H1 headings found (${h1Count})`,
                        recommendation: 'Use only one H1 per page'
                    });
                }
                
                // Check heading hierarchy
                let previousLevel = 0;
                headings.forEach(heading => {
                    const level = parseInt(heading.tagName.charAt(1));
                    
                    if (level > previousLevel + 1) {
                        issues.push({
                            element: heading,
                            issue: `Heading level skipped (H${previousLevel} to H${level})`,
                            recommendation: 'Use sequential heading levels'
                        });
                    }
                    
                    previousLevel = level;
                });
                
                return {
                    headingCount: headings.length,
                    structure: headings.map(h => ({ tag: h.tagName, text: h.textContent.slice(0, 50) })),
                    issues
                };
            },
            
            // Check for proper ARIA labels
            testAriaLabels: function() {
                const interactiveElements = document.querySelectorAll(
                    'button, [role="button"], input, select, textarea, a, [onclick], [tabindex]'
                );
                const issues = [];
                
                interactiveElements.forEach(el => {
                    const hasAccessibleName = 
                        el.getAttribute('aria-label') ||
                        el.getAttribute('aria-labelledby') ||
                        el.textContent.trim() ||
                        (el.tagName === 'INPUT' && el.getAttribute('placeholder')) ||
                        (el.tagName === 'IMG' && el.getAttribute('alt'));
                    
                    if (!hasAccessibleName) {
                        issues.push({
                            element: el,
                            issue: 'Missing accessible name',
                            recommendation: 'Add aria-label, aria-labelledby, or visible text'
                        });
                    }
                    
                    // Check for proper button roles
                    if (el.getAttribute('onclick') && !el.getAttribute('role') && el.tagName !== 'BUTTON') {
                        issues.push({
                            element: el,
                            issue: 'Clickable element without proper role',
                            recommendation: 'Add role="button" or use a proper button element'
                        });
                    }
                });
                
                return {
                    elementsChecked: interactiveElements.length,
                    issues
                };
            },
            
            // Check for proper landmarks
            testLandmarks: function() {
                const landmarks = {
                    main: document.querySelectorAll('main, [role="main"]'),
                    navigation: document.querySelectorAll('nav, [role="navigation"]'),
                    banner: document.querySelectorAll('header, [role="banner"]'),
                    contentinfo: document.querySelectorAll('footer, [role="contentinfo"]'),
                    complementary: document.querySelectorAll('aside, [role="complementary"]')
                };
                
                const issues = [];
                
                // Check for main landmark
                if (landmarks.main.length === 0) {
                    issues.push({
                        issue: 'No main landmark found',
                        recommendation: 'Add <main> element or role="main"'
                    });
                } else if (landmarks.main.length > 1) {
                    issues.push({
                        issue: `Multiple main landmarks found (${landmarks.main.length})`,
                        recommendation: 'Use only one main landmark per page'
                    });
                }
                
                return {
                    landmarks: Object.fromEntries(
                        Object.entries(landmarks).map(([key, elements]) => [key, elements.length])
                    ),
                    issues
                };
            }
        },
        
        // Generate comprehensive accessibility report
        generateReport: function() {
            console.group('♿ Accessibility Test Report');
            
            const report = {
                timestamp: new Date().toISOString(),
                colorContrast: this.testColorContrast(),
                keyboardNavigation: this.keyboardNavigation.testTabOrder(),
                headingStructure: this.screenReader.testHeadingStructure(),
                ariaLabels: this.screenReader.testAriaLabels(),
                landmarks: this.screenReader.testLandmarks()
            };
            
            // Count total issues
            const totalIssues = [
                report.colorContrast.issues,
                report.keyboardNavigation.issues,
                report.headingStructure.issues,
                report.ariaLabels.issues,
                report.landmarks.issues
            ].reduce((total, issues) => total + issues.length, 0);
            
            // Summary
            if (totalIssues === 0) {
                console.log('✅ All accessibility tests passed!');
            } else {
                console.warn(`⚠️ Found ${totalIssues} accessibility issues`);
            }
            
            console.log('Detailed Report:', report);
            console.groupEnd();
            
            return report;
        },
        
        // Test color contrast for all text elements
        testColorContrast: function() {
            const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, a, label, li');
            const issues = [];
            const results = [];
            
            textElements.forEach(el => {
                if (el.textContent.trim()) {
                    const result = this.colorContrast.testElement(el);
                    if (result) {
                        results.push({
                            element: el,
                            ...result
                        });
                        
                        if (!result.passed) {
                            issues.push({
                                element: el,
                                issue: `Poor color contrast (${result.ratio.toFixed(2)}:1)`,
                                recommendation: `Improve contrast to at least ${result.isLargeText ? '3:1' : '4.5:1'}`
                            });
                        }
                    }
                }
            });
            
            return {
                elementsChecked: results.length,
                passed: results.filter(r => r.passed).length,
                failed: results.filter(r => !r.passed).length,
                issues
            };
        },
        
        // Add accessibility debugging tools
        addDebugTools: function() {
            const debugPanel = document.createElement('div');
            debugPanel.id = 'a11y-debug';
            debugPanel.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                background: rgba(0, 0, 0, 0.9);
                color: #c7a758;
                padding: 15px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 12px;
                z-index: 10000;
                max-width: 300px;
                border: 2px solid #c7a758;
            `;
            
            debugPanel.innerHTML = `
                <strong>♿ Accessibility Tools</strong><br><br>
                <button onclick="AccessibilityTest.generateReport()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Full Report</button><br>
                <button onclick="AccessibilityTest.keyboardNavigation.simulateKeyboardNavigation()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Test Tab Order</button><br>
                <button onclick="AccessibilityTest.testColorContrast()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Test Contrast</button><br>
                <button onclick="document.getElementById('a11y-debug').remove()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Close</button>
            `;
            
            document.body.appendChild(debugPanel);
            
            // Auto-remove after 15 seconds
            setTimeout(() => {
                if (debugPanel.parentNode) {
                    debugPanel.parentNode.removeChild(debugPanel);
                }
            }, 15000);
        }
    };
    
    // Auto-run accessibility tests
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                AccessibilityTest.generateReport();
                AccessibilityTest.addDebugTools();
            }, 2000);
        });
    } else {
        setTimeout(() => {
            AccessibilityTest.generateReport();
            AccessibilityTest.addDebugTools();
        }, 2000);
    }
    
    // Export for manual testing
    window.AccessibilityTest = AccessibilityTest;
})();